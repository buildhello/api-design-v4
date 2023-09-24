import prisma from '../db';

export const getOneUpdate = async (req,res) => {
const update = await prisma.update.findUnique({
where: {
id: req.params.id
}
});

res.json({data: update});
};

export const getUpdates = async (req,res) => {
const products = await prisma.product.findMany({
where: {//this is how you find it
belongsToId: req.user.id
},
include: {
updates:true
} 
});

const updates = products.reduce((allUpdates, product) => {
return [...allUpdates, ...product.updates];
}, []);//I don't envision this line, it's a nested object containing all products belonging to a user, and for each product that has updates, an array of those updates
//every product belonging to a user that was updated
res.json({data: updates});
};

export const createUpdate = async (req,res) => {

const product = await prisma.product.findUnique({
where: {
id: req.body.productId
}
});

if(!product){
//product does not belong to user
return res.json({message:'nope'});
}

const update = await prisma.update.create({
data: {
title: req.body.title,
body: req.body.body,
product: {connect: {id:product.id}}
}});
 
res.json({data: update});
};

export const updateUpdate = async (req,res) => {
const products = await prisma.product.findMany({
where: {
belongsToId: req.user.id
}, 
include: {
updates: true
}
});

const updates = products.reduce((allUpdates, product) => {
return [...allUpdates, ...product.updates];
}, []);

const match = updates.find(update => update.id === req.params.id);

if (!match){
//handle this 
return res.json({message:"nope"});
} //guard, returns out of the function if there is not match

const updatedUpdate = await prisma.update.update({
where: {
id: req.params.id
},  
data: req.body
});

res.json({data: updatedUpdate});
};

export const deleteUpdate = async (req,res) => {

const products = await prisma.product.findMany({
where: {
belongsToId: req.user.id
}, 
include: {
updates: true
}
});

const updates = products.reduce((allUpdates, product) => {
return [...allUpdates, ...product.updates];
}, []);

const match = updates.find(update => update.id === req.params.id);

if (!match){
//handle this 
return res.json({message:"nope"});
} //guard, returns out of the function if there is not match

const deleted = await prisma.update.delete({
where: {
id: req.params.id
}

});

res.json({data: deleted});

};
