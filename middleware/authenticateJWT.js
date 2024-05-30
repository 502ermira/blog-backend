const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const User = require('../models/User');

const client = jwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      callback(err);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) {
        console.error('Failed to decode token.');
        return res.status(403).send('Forbidden: Invalid token');
      }

      jwt.verify(token, getKey, { algorithms: ['RS256'] }, async (err, payload) => {
        if (err) {
          console.error('JWT Verification Error:', err);
          return res.status(403).send('Forbidden: Invalid token');
        }

        let user = await User.findOne({ googleId: payload.sub });
        if (!user) {
          user = new User({
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            givenName: payload.given_name,
            familyName: payload.family_name,
            picture: payload.picture,
            hd: payload.hd,
          });

          try {
            await user.save();
            console.log(`New user created: ${JSON.stringify(user, null, 2)}`);
          } catch (saveError) {
            console.error('Error saving new user:', saveError);
            return res.status(500).json({ message: 'Internal server error' });
          }
        }

        req.user = {
          _id: user._id,
          name: user.name,
          email: user.email
        };
        next();
      });
    } catch (err) {
      console.error('Error decoding or verifying token:', err);
      return res.status(403).send('Forbidden: Token error');
    }
  } else {
    console.error('Authorization header missing.');
    res.status(401).send('Unauthorized: No token provided');
  }
};

module.exports = authenticateJWT;
