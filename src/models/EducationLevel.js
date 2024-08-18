import Sequelize, {Model} from "sequelize";

export default class EducationLevel extends Model {
  static init(sequelize) {
    super.init({
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 255],
              msg: "Nome do nivel educacional deve ser maior que 3",
            },
          },
        },
        descricao: {
          type: Sequelize.STRING,
          defaultValue: ""
        },
      },
      {
        sequelize,
        modelName: "EducationLevel",
        tableName: "niveis_escolares",
        timestamps: false
      },
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Grade, { foreignKey: 'nivel_educacional_id', as: 'niveis_escolares' });
  }
}