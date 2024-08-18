import Sequelize, {Model} from "sequelize";

export default class SchoolYearGrade extends Model {
  static init(sequelize) {
    super.init({
        turma: {
          type: Sequelize.STRING,
          allowNull: false
        } //se caso tiver por exemplo mais de uma turma exemplo A,B,C
      },
      {
        sequelize,
        modelName: "SchoolYearGrade",
        tableName: "anos_series",
        timestamps: false
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Grade, { foreignKey: 'serie_id', as: 'serie' });
    this.belongsTo(models.SchoolYear, { foreignKey: 'ano_escolar_id', as: 'ano_escolar' });
  }
}