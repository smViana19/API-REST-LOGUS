"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class SubjectMaterial extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 255],
              msg: "Nome precisa ter de 4 a 255 caracteres",
            },
          },
        },
        pontos: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 0,
          validate: {
            len: {
              args: [0, 100],
              msg: "Pontos podem ser apenas de 0 a 100",
            },
          },
        },
        categoria: {
          type: _sequelize2.default.ENUM("ATIVIDADE", "RESUMOS", "APRESENTACAO", "OUTROS"),
          defaultValue: "OUTROS",
          validate: {
            notEmpty: {
              msg: "Campo nao pode ficar vazio",
            },
          },
        },
        detalhes: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [1, 255],
              msg: "Tamanho do texto invalido"
            },
          },
        },
        //TODO ARQUIVOS
        data_entrega: {
          type: _sequelize2.default.DATE,
          allowNull: true,
        }
      },
      {
        sequelize,
        modelName: "SubjectMaterial",
        tableName: "subjects_material",
        timestamps: true, // Esta opção habilita os campos createdAt e updatedAt
      },
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Subject, { foreignKey: "subject_id", as: "subject" });
  }
} exports.default = SubjectMaterial;
