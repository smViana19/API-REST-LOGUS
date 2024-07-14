import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";
import Foto from "../models/Foto";
import Task from "../models/Task";

//se caso tiver mais model importa e colocar no array
const models = [Aluno, User, Foto, Task];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
