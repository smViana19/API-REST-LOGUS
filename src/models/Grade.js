import Sequelize, { Model } from "sequelize"

export default class Grade extends Model {
  static init(sequelize) {
    super.init({
      grade: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: "Grade",
      tableName: "grades",
      timestamps: false
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "student" });
    this.belongsTo(models.Subject, { foreignKey: "subject_id", as: "subject" });
  }
}