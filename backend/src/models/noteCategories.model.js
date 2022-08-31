
import { Sequelize, DataTypes } from 'sequelize';
import { dboptions } from '../../config';
const sequelize = new Sequelize(dboptions.database, dboptions.user, dboptions.password, {
    host: 'localhost',
    dialect: 'mysql'
})

const noteCategoriesModel = sequelize.define('noteCategory', {
    'idNoteCategory': { type: DataTypes.INTEGER, primaryKey: true },
    'note': { type: DataTypes.INTEGER },
    'categoryId': { type: DataTypes.INTEGER }
}, {
    tableName: 'notecategory',
    timestamps: false
})

export default noteCategoriesModel