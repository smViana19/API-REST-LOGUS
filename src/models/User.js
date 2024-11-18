import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "O nome deve ter entre 3 a 255 caracteres",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
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
          type: Sequelize.ENUM("diretor", "estudante", "professor"),
          defaultValue: "estudante",
        },
      },
      {
        sequelize,
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    this.hasMany(models.Subject, { foreignKey: 'user_id', as: 'subjects' });
    this.hasMany(models.SubjectMaterial, { foreignKey: "user_id", as: "materials" });
    this.hasMany(models.SubmitActivity, { foreignKey: 'user_id', as: 'submittedActivities' });
    this.belongsToMany(models.Class, {
      through: models.ClassStudents,
      foreignKey: "user_id",
      otherKey: "class_id",
      as: "classes",
    });
  }

  passwordValida(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
