import express from "express";
import morgan from "morgan";
import cors from "cors";
import { dboptions } from "../config";
import sequelize from "sequelize"
import categoryRoutes from '../src/routes/categories.routes.js'
import noteRoutes from '../src/routes/note.routes.js'
import noteCategoryRoutes from '../src/routes/noteCategories.routes.js'
import path from 'path';


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


const app = express();
app.set("port", process.env.port || 4000);
app.listen(app.get("port"), () => {
    console.log("estoy en el puerto " + app.get("port"));
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../public')));


app.use('/api', categoryRoutes);
app.use('/api', noteRoutes);
app.use('/api', noteCategoryRoutes);
