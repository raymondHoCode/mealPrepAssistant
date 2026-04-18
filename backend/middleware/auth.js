import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) {
        return res.status(401).json({success: false, message: 'Unauthorized'});
              
            };
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req,user = {
            id: decoded.id,
            email: decoded.email,
        };
        
        
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({success: false, message: 'Token not Valid'});
    }
};

export default authMiddleware;