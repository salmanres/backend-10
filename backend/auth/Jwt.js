const jwt = require('jsonwebtoken');

const seckey = process.env.SEC_KEY;

	const verifyToken = (req, res, next) => {
   		const token = req.headers.authorization?.split(' ')[1];

   		if (!token) {
        		return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    		}
    		try {
       		const decoded = jwt.verify(token, seckey);
        		req.user = decoded; 
        		next(); 
    		} catch (error) {
        		return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
   		}
	};

	module.exports = verifyToken;