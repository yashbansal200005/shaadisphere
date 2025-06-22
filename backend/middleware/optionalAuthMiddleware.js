import jwt from 'jsonwebtoken';

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log('JWT_SECRET from env during optionalAuth:',process.env.JWT_SECRET)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
    } catch (err) {
      console.warn('Invalid token in optionalAuthMiddleware'); 
    }
  }

  next(); 
};

export default optionalAuthMiddleware;
