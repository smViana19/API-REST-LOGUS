import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { resolve } from "path";
import "./database";
import {
  API_BASE_URL,
  URL_CLASSES_ROUTE,
  URL_CLASSES_STUDENTS_ROUTE,
  URL_GRADE_ROUTE,
  URl_SUBJECTS_MATERIALS_ROUTE,
  URL_SUBJECTS_ROUTE,
  URl_SUBMIT_ACTIVITY_ROUTE,
  URL_TASKS_ROUTE,
  URL_TOKENS_ROUTE,
  URL_USERS_ROUTE
} from "./utils/RoutesUtils";

dotenv.config();

import classesRoutes from './routes/classesRoutes';
import homeRoutes from "./routes/homeRoutes";
import subjectMaterialRoutes from "./routes/subjectMaterialRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import submitActivityRoutes from "./routes/submitActivityRoutes";
import taskRoutes from "./routes/taskRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import userRoutes from "./routes/userRoutes";
import classStudentRoutes from './routes/classStudentRoutes';
import gradeRoutes from './routes/gradeRoutes';

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
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  constructor() {
    this.App = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.App.use(cors(corOptions));
    this.App.use(helmet());

    this.App.use(express.urlencoded({ extended: true }));
    this.App.use(express.json());
    this.App.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {

    this.App.use(API_BASE_URL, homeRoutes);
    this.App.use(URL_USERS_ROUTE, userRoutes);
    this.App.use(URL_TOKENS_ROUTE, tokenRoutes);
    this.App.use(URL_TASKS_ROUTE, taskRoutes);
    this.App.use(URL_SUBJECTS_ROUTE, subjectRoutes);
    this.App.use(URl_SUBJECTS_MATERIALS_ROUTE, subjectMaterialRoutes);
    this.App.use(URl_SUBMIT_ACTIVITY_ROUTE, submitActivityRoutes);
    this.App.use(URL_CLASSES_ROUTE, classesRoutes);
    this.App.use(URL_CLASSES_STUDENTS_ROUTE, classStudentRoutes);
    this.App.use(URL_GRADE_ROUTE, gradeRoutes);
  }
}

export default new App().App;
