import { Router } from "express";
import noteCategoriesCtrl from "../controllers/noteCategories.controllers";
const router = Router();

router.route("/notecategories/:note")
    .get(noteCategoriesCtrl.getNoteCategories)
router.route("/notecategories")
    .post(noteCategoriesCtrl.postNoteWhitCategories)

export default router;
