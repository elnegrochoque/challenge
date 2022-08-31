import categoryModel from "../models/categorie.model";
const categoryCtrl = {};
categoryCtrl.getCategories = async (req, res) => {
    try {
        const resultado = await categoryModel.findAll()
        res.status(201).json(resultado)
    } catch (error) {
        console.log(error)
    }
};
categoryCtrl.getCategory = async (req, res) => {
    try {
        const resultado = await categoryModel.findAll({ where: { idCategory: req.params.id } })
        res.status(201).json(resultado)
    } catch (error) {
        console.log(error)
    }
};



export default categoryCtrl