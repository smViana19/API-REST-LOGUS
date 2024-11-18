import Sequelize, { Model } from "sequelize";

export default class Note extends Model {
  static init(sequelize) {
    super.init({
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: "Note",
      tableName: "notas",
      timestamps: false
    },
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
    this.belongsTo(models.Period, { foreignKey: 'period_id', as: 'period' });
  }
}