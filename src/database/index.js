import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import Class from "../models/Class";
import ClassStudents from "../models/ClassStudents";
import Foto from "../models/Foto";
import Note from "../models/Note";
import Period from "../models/Period";
import Post from "../models/Post";
import Subject from "../models/Subject";
import SubjectMaterial from "../models/SubjectMaterial";
import SubmitActivity from '../models/SubmitActivity';
import Task from "../models/Task";
import User from "../models/User";
import Grade from "../models/Grade";



//se caso tiver mais model importa e colocar nessa lista
const models = [Aluno, User, Foto, Task, Subject, SubjectMaterial, SubmitActivity, Post, Note, Period, Class, ClassStudents, Grade];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
