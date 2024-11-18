import Sequelize, { Model } from "sequelize";

export default class ClassStudents extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        class_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "classes",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "ClassStudents",
        tableName: "class_students",
        timestamps: false,
      }
    );
    return this;
  }
}
