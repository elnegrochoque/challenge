
import { Sequelize, DataTypes } from 'sequelize';
import { dboptions } from '../../config';
const sequelize = new Sequelize(dboptions.database, dboptions.user, dboptions.password, {
    host: 'localhost',
    dialect: 'mysql'
})

const categoryModel = sequelize.define('categorie', {
    "idCategory": { type: DataTypes.INTEGER, primaryKey: true },
    'category': { type: DataTypes.STRING }
}, {
    tableName: "categories",
    timestamps: false
})

export default categoryModel