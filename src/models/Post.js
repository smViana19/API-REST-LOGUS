import Sequelize, {Model} from "sequelize";

export default class Post extends Model  {
  static init(sequelize) {
    super.init({
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 255],
              msg: "Nome da materia precisa ter mais de 4 caracteres",
            },
          },
        }
      },
      {
        sequelize,
        timestamps: false,
      },
    );
    return this;
  }
}