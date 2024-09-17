import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
    const token = req.headers.authorization || req.headers['Authorization'];

    if(!token) {
      res.status(401).send({ message: 'Empty token'});
    }

     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       console.log(err);
        if(err) {
          return res.status(401).send({ message: 'Invalid token'});
        }

        req.userId = decoded.userId;
        next();
    })
}
