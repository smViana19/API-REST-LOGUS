import Sequelize, { Model } from "sequelize";

export default class Class extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
      {
        sequelize,
        modelName: "Class",
        tableName: "classes",
        timestamps: false
      },
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.ClassStudents,
      foreignKey: "class_id",
      otherKey: "user_id",
      as: "students",
    });
  }
}