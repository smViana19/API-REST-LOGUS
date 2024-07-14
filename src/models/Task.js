import Sequelize, { Model } from "sequelize";

export default class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 255],
              msg: "Titulo precisa ter de 4 a 255 caracteres",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: "No description",
          validate: {
            len: {
              args: [1, 255],
              msg: "Descrição de 1 a 255 caracteres",
            },
          },
        },
        urgency: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo nao pode ficar vazio",
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
        timestamps: true, // Esta opção habilita os campos createdAt e updatedAt
        createdAt: 'created_at', // Definindo explicitamente o nome das colunas (opcional)
        updatedAt: 'updated_at', // Definindo explicitamente o nome das colunas (opcional)
      },
    );
    return this;
  }
}
