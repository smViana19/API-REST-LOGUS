import dotenv from "dotenv";
import {resolve} from "path";

dotenv.config();
import "./database";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";

import taskRoutes from "./routes/taskRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import subjectMaterialRoutes from "./routes/subjectMaterialRoutes"
import submitActivityRoutes from "./routes/submitActivityRoutes";

import {
  API_BASE_URL,
  URL_EDUCATION_LEVEL_ROUTE,
  URL_GRADE_ROUTE, URL_SCHOOL_YEAR_GRADE_ROUTE,
  URL_SCHOOL_YEAR_ROUTE,
  URl_SUBJECTS_MATERIALS_ROUTE,
  URL_SUBJECTS_ROUTE,
  URL_TASKS_ROUTE,
  URL_TOKENS_ROUTE,
  URL_USERS_ROUTE,
  URl_SUBMIT_ACTIVITY_ROUTE
} from "./utils/RoutesUtils";
import schoolYearRoutes from "./routes/schoolYearRoutes";
import educationLevelRoutes from "./routes/educationLevelRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import schoolYearGradeRoutes from "./routes/schoolYearGradeRoutes";

//PARA UTILIZAR A API
const whiteList = [
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5175",
  "http://10.0.2.2:3000",
  "http://localhost:3001",
  "https://api-rest-logus.vercel.app/"
];

const corOptions = {
  origin: function (origin, callback) {
    //se a URI tiver nas opçoes de whiteList
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
    this.App.use(express.urlencoded({extended: true})); //configuracao do express
    this.App.use(express.json());
    this.App.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    //metodo das rotas
    this.App.use(API_BASE_URL, homeRoutes);
    this.App.use(URL_USERS_ROUTE, userRoutes);
    this.App.use(URL_TOKENS_ROUTE, tokenRoutes);
    // this.App.use(URL_ALUNO_ROUTE, alunoRoutes);
    this.App.use(URL_TASKS_ROUTE, taskRoutes);
    this.App.use(URL_SUBJECTS_ROUTE, subjectRoutes);
    this.App.use(URl_SUBJECTS_MATERIALS_ROUTE, subjectMaterialRoutes);
    this.App.use(URL_SCHOOL_YEAR_ROUTE, schoolYearRoutes)
    this.App.use(URL_EDUCATION_LEVEL_ROUTE, educationLevelRoutes)
    this.App.use(URL_GRADE_ROUTE, gradeRoutes)
    this.App.use(URL_SCHOOL_YEAR_GRADE_ROUTE, schoolYearGradeRoutes)
    this.App.use(URl_SUBMIT_ACTIVITY_ROUTE, submitActivityRoutes); 
  }
}

export default new App().App;
