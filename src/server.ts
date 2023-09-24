import express from 'express';
import path from 'path';
import router from './router'; 
import morgan from 'morgan'; 
import cors from 'cors';
import * as dotenv from 'dotenv';
import {protect} from './modules/auth';
import {createNewUser, signin } from './handlers/user';
//import protect from './src/modules/auth';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {//any call to the root route runs this response, the './' does not require a favicon,  '/' does
//res.json({message: 'hello'});
console.log('Hello from express!');
res.sendFile(path.resolve("pages/index.html"));//
//test error
//throw new Error('hello');
})

//we can put arguments before and after other arguments and they will run first. We put protect before router, if protect returns, it returns out of the app.use method
//app.use('/api', router);
app.use('/api', protect, router);//protect the entire router. If anyone wants to access this app, they have to be authenticated.

app.use('/user', createNewUser);
app.use('/signin', signin);

app.use((err,req,res,next) => {

if (err.type === 'auth'){
res.status(401).json({message: 'unauthorized'});
} else if (err.type === 'input'){
res.status(400).json({message:'invalid input'});
} else {
res.status(500).json({message:'oops, that is on us'});
}

});//end error handling

//app.use(express.static("static"));
app.use(express.static('./public'));
// app.use((req,res, next) => {
// req.shhh_secret = 'doggy';//adds something to the request object
// next();
// })

//module.exports = app;
export {app, port};
