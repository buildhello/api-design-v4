import { Router } from "express";
import {body} from "express-validator";
import {handleInputErrors} from "./middleware";
import {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct} from "./handlers/products";
import {getUpdates, getOneUpdate, createUpdate, updateUpdate, deleteUpdate} from "./handlers/update";

const router = Router();

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product", body("name").isString(), handleInputErrors, createProduct);

router.put("/product/:id", 
body("name").isString(), 
handleInputErrors, 
(req, res) => {
});

router.delete("/product/:id", deleteProduct);

router.get("/update", getUpdates );

router.get("/update/:id", getOneUpdate);

router.post("/update", createUpdate );

router.put("/update/:id", 
body('title').optional(),
body('body').optional(),
body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
body('version').optional(),
updateUpdate);

router.delete("/update/:id", deleteUpdate);

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", 
body('name').isString(),
body('description').isString(),
body('updateId').exists().isString(),
(req, res) => {});

router.put("/updatepoint/:id", 
body('name').optional().isString(),
body('description').optional().isString(),
(req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {
console.log(err);
res.json({message: 'in router handler'});
});

export default router;
