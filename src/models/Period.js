import { Sequelize, Model } from "sequelize";

export default class Period extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: "Period",
      tableName: "periods",
      timestamps: false
    });
    return this
  }
  static associate(models) {
    this.hasMany(models.Note, { foreignKey: 'period_id', as: 'notes' });
  }
}