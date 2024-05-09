import dotenv from 'dotenv';
import { resolve } from 'path';


dotenv.config();
import './database'
import express from "express";
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import fotoRoutes from "./routes/fotoRoutes";

//PARA UTILIZAR A API
const whiteList = [
  'http://localhost:3000'
];

const corOptions = {
  origin: function (origin, callback) {
    //se a URI tiver nas opçoes de whiteList
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
class App {
  constructor() {
    //atributos
    this.App = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.App.use(cors(corOptions));
    this.App.use(helmet());
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
