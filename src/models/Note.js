import Sequelize, {Model} from "sequelize";

export default class Note extends Model {
  static init(sequelize) {
    super.init({
        value: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        trimester: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 3
          }
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
    this.belongsTo(models.SchoolYearGrade, {foreignKey: 'anos_series_id', as: 'turma'});
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
    this.belongsTo(models.Subject, {foreignKey: 'subject_id', as: 'subject'});
  }
}