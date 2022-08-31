import sequelize from "sequelize"
import { dboptions } from "../config"
import userModel from "./models/user.model"
export const seq = new sequelize(dboptions.database, dboptions.user, dboptions.password, {
    host: 'localhost',
    dialect: 'mysql'
})

seq.authenticate()
    .then(() => {
        console.log("estamos conectados")
    })
    .catch(() => {
        console.log("error")
    })

