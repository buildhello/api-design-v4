import prisma from "../db";
import { createJWT, comparePasswords, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {//database queries are always async
try {

const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password)
    },
  });//apparently 
  
const token = createJWT(user);
res.json({ token });
} catch (e) {
//you should inspect e, get the error message and write logic to respond, we will just assume user error for speed
e.type = 'input';     
next(e);
}
};

export const signin = async (req, res) => {
const user = await prisma.user.findUnique({
where: { username: req.body.username },
});

const isValid = await comparePasswords(req.body.password, user.password);

if (!isValid) {
    res.status(401);
    res.send("Invalid username or password NOPE");
    return;
}

const token = createJWT(user);
res.json({ token });
};
