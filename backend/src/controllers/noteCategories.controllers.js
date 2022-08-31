
import noteCategoriesModel from "../models/noteCategories.model";
import noteModel from "../models/note.model";
import categoryModel from "../models/categorie.model";
const noteCategoriesCtrl = {};
noteCategoriesCtrl.getNoteCategories = async (req, res) => {
    try {
        const resultado = await noteCategoriesModel.findAll({ where: { note: req.params.note } })
        res.status(201).json(resultado)
    } catch (error) {
        console.log(error)
    }
};
noteCategoriesCtrl.postNotecategories = async (req, res) => {
    try {
        const resultado = await noteCategoriesModel.create({ "note": req.body.note, "categoryId": req.body.categoryId })
        res.status(201).json({ "created": true })
    } catch (error) {
        console.log(error)
    }

};
noteCategoriesCtrl.postNoteWhitCategories = async (req, res) => {
    try {
        const resultado = await noteModel.create({ "title": req.body.title, "content": req.body.content, "edited": req.body.edited })
        for (let i = 0; i < req.body.categories.length; i++) {
            const categoryId = await categoryModel.findOne({ where: { category: req.body.categories[i] } })
            const postCategories = await noteCategoriesModel.create({ "note": resultado.null, "categoryId": categoryId.dataValues.idCategory })
        }
        res.status(201).json({ "created": true })
    } catch (error) {
        console.log(error)
    }

};
export default noteCategoriesCtrl