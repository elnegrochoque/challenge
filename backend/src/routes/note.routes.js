import { Router } from "express";
import noteCtrl from "../controllers/note.controller";


const router = Router();

router.route("/note")
    .get(noteCtrl.getNotes)
    .post(noteCtrl.postNote)
    .delete(noteCtrl.delNoteWhitCategories)
router.route("/notewhitcategories")
    .get(noteCtrl.getNoteWhitCategories)
    .put(noteCtrl.putNote)
router.route("/notearchived")
    .put(noteCtrl.putNoteArchived)
    .get(noteCtrl.getNoteWhitCategoriesArchived)

router.route("/notefiltered/:filter")
    .get(noteCtrl.getNoteFiltered)
router.route("/notearchivedfiltered/:filter")
    .get(noteCtrl.getNoteArchivedFiltered)
export default router;
