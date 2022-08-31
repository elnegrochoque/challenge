import { Router } from "express";
import categoryCtrl from "../controllers/categories.controller";


const router = Router();

router.route("/category")
    .get(categoryCtrl.getCategories)

router.route("/category/:id")
    .get(categoryCtrl.getCategory)
export default router;
