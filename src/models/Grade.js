import Sequelize, {Model} from "sequelize";

export default class Grade extends Model {
  static init(sequelize) {
    super.init({
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Deve ter mais de 1 caractere.",
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
        modelName: "Grade",
        tableName: "series",
        timestamps: false
      },
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.EducationLevel, { foreignKey: 'nivel_educacional_id', as: 'niveis_escolares' });
    this.hasMany(models.SubjectMaterial, { foreignKey: "serie_id", as: "serie" });
  }
}