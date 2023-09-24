import jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";

export const createJWT = (user) =>  {
const token = jwt.sign({id: user.id,username: user.name},process.env.JWT_SECRET);
return token;
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;//if there are authorization headers on request object

  if (!bearer) {
    res.status(401);
    res.send("Not authorized Moron");
    return;
  }//guard, returns out of function if no authorization
//protect is denying anything that doesn't have a bearer token on it

const [, token] = bearer.split(" ");//destructure into token the second position of split on bearer, must be a space before the secret?
  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not valid token");
    return;
  }//if destructuring fails, get lost  


//is it a jwt signed 

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);//relies on jwt.veryify method to match token from header with secret_token
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized Stupid");
    return;
  }

};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
