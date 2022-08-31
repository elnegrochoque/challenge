
import { Sequelize, DataTypes } from 'sequelize';
import { dboptions } from '../../config';
const sequelize = new Sequelize(dboptions.database, dboptions.user, dboptions.password, {
    host: 'localhost',
    dialect: 'mysql'
})

const noteModel = sequelize.define('note', {
    'idnotes': { type: DataTypes.INTEGER, primaryKey: true },
    'title': { type: DataTypes.STRING },
    'content': { type: DataTypes.STRING },
    'edited': { type: DataTypes.DATE },
    'archived': { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: false
})

export default noteModel