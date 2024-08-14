"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Grades extends _sequelize.Model {
  static init(sequelize) {
    super.init({
        materia: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 255],
              msg: "Nome da materia precisa ter mais de 4 caracteres"
            }
          }
        },
      },
      {
        sequelize,
        timestamps: false
      },
    );
    return this;
  }
} exports.default = Grades;