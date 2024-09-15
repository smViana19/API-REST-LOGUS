import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";
import Foto from "../models/Foto";
import Task from "../models/Task";
import Subject from "../models/Subject";
import SubjectMaterial from "../models/SubjectMaterial";
import SchoolYear from "../models/SchoolYear";
import EducationLevel from "../models/EducationLevel";
import Post from "../models/Post";
import Grade from "../models/Grade";
import SchoolYearGrade from "../models/SchoolYearGrade";
import SubmitActivity from '../models/SubmitActivity';


//se caso tiver mais model importa e colocar nessa lista
const models = [Aluno, User, Foto, Task, Subject, SubjectMaterial, SubmitActivity, SchoolYear, EducationLevel, Post, Grade, SchoolYearGrade];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
