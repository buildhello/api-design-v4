import prisma from '../db';

export const getProducts = async (req,res) => {
const user = await prisma.user.findUnique({
where: {
    id: req.user.id
},
    include: {
    products: true
}
});
//res.json(user.products);//if you send this line back w/o prefixing the data, whenever the clients gets the data, it's always going to be a different shape. This time an array, next time an object
res.json({data: user.products});//in this case it is always an object
};

export const getOneProduct = async (req,res) => {
const id = req.params.id;//params is the route parameter (anything with a :), urlencoded turns parameters into an object 'params' for us
//query the product table (collection in mongo), get product scoped to the user and has the id 

const product = await prisma.product.findFirst({
where: {
    id,
    belongsToId: req.user.id
}
});
//res.json(user.products);//if you send this line back w/o prefixing the data, whenever the clients gets the data, it's always going to be a different shape. This time an array, next time an object
res.json({data: product});//in this case it is always an object
};

export const createProduct = async (req,res) => {
const product = await prisma.product.create({
data: {//what data are we giving prisma to create something
name: req.body.name,
belongsToId: req.user.id
}
});
res.json({data: product});
};

export const updateProduct = async (req,res) => {
const updated = await prisma.product.update({
where: {//this is how you find it
id_belongsToId: {
id: req.params.id,
belongsToId: req.user.id
} 
},
data: {//this is the data you need to update it with
name: req.body.name
}
});
res.json({data: updated});//send back the things you updated with the updates on it, otherwise the client is probably just going to make another request back to the server to get the data 
};

export const deleteProduct = async (req,res) => {
const deleted = await prisma.product.delete({
where: {
id_belongsToId: {
id: req.params.id,
belongsToId: req.user.id
} 
}
});
res.json({data: deleted});//send back the things you updated with the updates on it, otherwise the client is probably just going to make another request back to the server to get the data
};
