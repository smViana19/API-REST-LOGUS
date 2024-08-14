"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "O nome deve ter entre 3 a 255 caracteres",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "Email ja existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "A senha deve ter mais de 6 a 50 caracteres",
            },
          },
        },
        role: {
          //adicionado campo role para os tipos de perfis
          type: _sequelize2.default.ENUM("diretor", "estudante", "professor"),
          defaultValue: "estudante",
        },
      },
      {
        sequelize,
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8); //preenchendo o hash da senha pelo campo password
      }
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    this.hasMany(models.Subject, { foreignKey: 'user_id', as: 'subjects' });
    this.hasMany(models.SubjectMaterial, { foreignKey: "user_id", as: "materials" });
  }

  passwordValida(password) {
    return _bcryptjs2.default.compare(password, this.password_hash); //retornar uma promisse
  }
} exports.default = User;
