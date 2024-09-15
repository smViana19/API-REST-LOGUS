import Sequelize, { Model } from 'sequelize';

export default class SubjectMaterial extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 255],
              msg: "Nome precisa ter de 4 a 255 caracteres",
            },
          },
        },
        pontos: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            len: {
              args: [0, 100],
              msg: "Pontos podem ser apenas de 0 a 100",
            },
          },
        },
        categoria: {
          type: Sequelize.ENUM("ATIVIDADE", "RESUMOS", "APRESENTACAO", "OUTROS"),
          defaultValue: "OUTROS",
          validate: {
            notEmpty: {
              msg: "Campo nao pode ficar vazio",
            },
          },
        },
        detalhes: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [0, 255],
              msg: "Tamanho do texto invalido"
            },
          },
        },
        data_entrega: {
          type: Sequelize.DATE,
          allowNull: true,
        }
      },
      {
        sequelize,
        modelName: 'SubjectMaterial',
        tableName: 'subjects_material',
        timestamps: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' });
    this.hasMany(models.SubmitActivity, { foreignKey: 'subject_material_id', as: 'submits' });
  }
}
