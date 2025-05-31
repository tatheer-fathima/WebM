import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Add user to request object
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(403).json({ message: 'Token is not valid' });
  }
};