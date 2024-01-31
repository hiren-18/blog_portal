const jwt = require('jsonwebtoken');
const User = require('../models/users');


const getAccessToken = (req) => {
    const authHeader = req.headers.authorization;
    let accessToken = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.substring(7);
    }
   
    return accessToken;
  };

const authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    const  accessToken  = getAccessToken(req);

    if (!accessToken) {
      const error = {
        status: 401,
        message: 'Unauthorized',
      };
      return next(error);
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET); // Replace process.env.JWT_SECRET with your actual JWT secret
    } catch (error) {
      const err = {
        status: 401,
        message: 'Invalid token',
      };
      return next(err);
    }
const _id=decodedToken.user._id;
res.locals.user = {
  id: _id,
};
const role=decodedToken.user.role;


    // const { _id, role } = decodedToken;
console.log(_id);
    try {
      const user = await User.findById(_id);

      if (!user) {
        const err = {
          status: 401,
          message: 'User not found',
        };
        return next(err);
      }

 
      if (!requiredRoles.includes(role) && !role.includes('admin')) {
        const err = {
          status: 403,
          message: 'Forbidden',
        };
        return next(err);
      }

      next();
    } catch (error) {
      const err = {
        status: 500,
        message: 'Internal Server Error',
      };
      return next(err);
    }
  };
};

module.exports = authMiddleware;
