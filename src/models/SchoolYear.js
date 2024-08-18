import Sequelize, {Model} from "sequelize";

export default class SchoolYear extends Model {
  static init(sequelize) {
    super.init({
        ano: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: true,
            len: [4, 4],

          },
        },
        data_inicio: {
          type: Sequelize.DATE,
          validate: {
            allowNull: true,
          },

        },
        data_fim: {
          type: Sequelize.DATE,
          validate: {
            allowNull: true,
          },
        },
      },
      {
        sequelize,
        modelName: "SchoolYear",
        tableName: "anos_escolares",
        timestamps: false
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.SchoolYearGrade, { foreignKey: "ano_escolar_id"})
  }
}