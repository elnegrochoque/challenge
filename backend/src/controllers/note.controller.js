import categoryModel from "../models/categorie.model";
import noteModel from "../models/note.model";
import noteCategoriesModel from "../models/noteCategories.model";
const noteCtrl = {};
noteCtrl.getNotes = async (req, res) => {
    try {
        const resultado = await noteModel.findAll()
        res.status(201).json(resultado)
    } catch (error) {
        console.log(error)
    }
};

noteCtrl.postNote = async (req, res) => {
    try {
        const resultado = await noteModel.create(req.body)

        res.status(201).json({ "id note created": resultado.null })
    } catch (error) {
        console.log(error)
    }
};

noteCtrl.deleteNote = async (req, res) => {
    try {
        const resultado = await noteModel.destroy({
            where: {
                idnotes: req.body.id
            }
        });
        res.status(201).json({ "deleted": true })
    } catch (error) {
        console.log(error)
    }
};
noteCtrl.getNoteWhitCategories = async (req, res) => {
    let resp = []
    try {
        const resultado = await noteModel.findAll({ where: { archived: false } })
        for (let i = 0; i < resultado.length; i++) {
            const categories = await noteCategoriesModel.findAll({ where: { note: resultado[i].dataValues.idnotes } })
            let categoriesArray = []
            for (let j = 0; j < categories.length; j++) {
                const categoryName = await categoryModel.findOne({ where: { idCategory: categories[j].dataValues.categoryId } })
                categoriesArray.push(categoryName.dataValues.category)
            }
            resp.push({
                idnotes: resultado[i].idnotes,
                title: resultado[i].title,
                content: resultado[i].content,
                edited: resultado[i].edited,
                archived: resultado[i].archived,
                "categories": (categoriesArray)
            })
        }
        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
    }
}
noteCtrl.getNoteWhitCategoriesArchived = async (req, res) => {
    let resp = []
    try {
        const resultado = await noteModel.findAll({ where: { archived: true } })
        for (let i = 0; i < resultado.length; i++) {
            const categories = await noteCategoriesModel.findAll({ where: { note: resultado[i].dataValues.idnotes } })
            let categoriesArray = []
            for (let j = 0; j < categories.length; j++) {
                const categoryName = await categoryModel.findOne({ where: { idCategory: categories[j].dataValues.categoryId } })
                categoriesArray.push(categoryName.dataValues.category)
            }
            resp.push({
                idnotes: resultado[i].idnotes,
                title: resultado[i].title,
                content: resultado[i].content,
                edited: resultado[i].edited,
                archived: resultado[i].archived,
                "categories": (categoriesArray)
            })
        }
        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
    }
}

noteCtrl.putNote = async (req, res) => {
    try {
        const note = await noteModel.findOne({ where: { idnotes: req.body.idnotes } })
        note.update({ "title": req.body.title, "content": req.body.content, "edited": req.body.edited })
        await noteCategoriesModel.destroy({
            where: {
                note: req.body.idnotes
            }
        });
        for (let i = 0; i < req.body.categories.length; i++) {
            const categoryId = await categoryModel.findOne({ where: { category: req.body.categories[i] } })
            const postCategories = await noteCategoriesModel.create({ "note": req.body.idnotes, "categoryId": categoryId.dataValues.idCategory })
        }
        res.status(201).json({ "edited": true })
    } catch (error) {
        console.log(error)
    }
}
noteCtrl.delNoteWhitCategories = async (req, res) => {
    try {
        await noteModel.destroy({ where: { idnotes: req.body.idnotes } })
        await noteCategoriesModel.destroy({
            where: {
                note: req.body.idnotes
            }
        });
        res.status(201).json({ "deleted": true })
    } catch (error) {
        console.log(error)
    }
}
noteCtrl.putNoteArchived = async (req, res) => {
    try {
        const note = await noteModel.findOne({ where: { idnotes: req.body.idnotes } })

        if (note.dataValues.archived == true) {
            note.update({ "archived": false })
        } else {
            note.update({ "archived": true })
        }
        res.status(201).json({ "edited": true })
    } catch (error) {
        console.log(error)
    }
}

noteCtrl.getNoteFiltered = async (req, res) => {
    let resp = []
    try {
        const idFilter = await categoryModel.findOne({ where: { category: req.params.filter } })

        const filter = await noteCategoriesModel.findAll({ where: { categoryId: idFilter.dataValues.idCategory } })

        for (let h = 0; h < filter.length; h++) {
            const resultado = await noteModel.findOne({ where: { archived: false, idnotes: filter[h].dataValues.note } })
            if (resultado) {
                const categories = await noteCategoriesModel.findAll({ where: { note: resultado.dataValues.idnotes } })
                let categoriesArray = []
                for (let j = 0; j < categories.length; j++) {
                    const categoryName = await categoryModel.findOne({ where: { idCategory: categories[j].dataValues.categoryId } })
                    categoriesArray.push(categoryName.dataValues.category)
                }
                resp.push({
                    idnotes: resultado.idnotes,
                    title: resultado.title,
                    content: resultado.content,
                    edited: resultado.edited,
                    archived: resultado.archived,
                    "categories": (categoriesArray)
                })
            }
        }

        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
    }
}
noteCtrl.getNoteArchivedFiltered = async (req, res) => {
    let resp = []
    try {
        const idFilter = await categoryModel.findOne({ where: { category: req.params.filter } })

        const filter = await noteCategoriesModel.findAll({ where: { categoryId: idFilter.dataValues.idCategory } })

        for (let h = 0; h < filter.length; h++) {
            const resultado = await noteModel.findOne({ where: { archived: true, idnotes: filter[h].dataValues.note } })
            if (resultado) {
                const categories = await noteCategoriesModel.findAll({ where: { note: resultado.dataValues.idnotes } })
                let categoriesArray = []
                for (let j = 0; j < categories.length; j++) {
                    const categoryName = await categoryModel.findOne({ where: { idCategory: categories[j].dataValues.categoryId } })
                    categoriesArray.push(categoryName.dataValues.category)
                }
                resp.push({
                    idnotes: resultado.idnotes,
                    title: resultado.title,
                    content: resultado.content,
                    edited: resultado.edited,
                    archived: resultado.archived,
                    "categories": (categoriesArray)
                })
            }
        }

        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
    }
}


export default noteCtrl