import dotenv from 'dotenv';
import { resolve } from 'path';


dotenv.config();
import './database'
import express from "express";


import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import fotoRoutes from "./routes/fotoRoutes";


class App {
  constructor() {
    //atributos
    this.App = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //metodo das middlewares
    this.App.use(express.urlencoded({ extended: true })); //configuracao do express
    this.App.use(express.json());
    this.App.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    //metodo das rotas
    this.App.use('/', homeRoutes);
    this.App.use('/users/', userRoutes);
    this.App.use('/tokens/', tokenRoutes);
    this.App.use('/alunos/', alunoRoutes);
    this.App.use('/fotos/', fotoRoutes);

  }
}

export default new App().App;
