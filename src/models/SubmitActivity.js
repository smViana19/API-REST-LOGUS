import Sequelize, { Model } from 'sequelize';

export default class SubmitActivity extends Model {
  static init(sequelize) {
    super.init(
      {
        file: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Arquivo não pode estar vazio",
            },
          },
        },
        data_entrega: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'SubmitActivity',
        tableName: 'submit_activity',
        timestamps: true,
        underscored: true, 
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.SubjectMaterial, { foreignKey: 'subject_material_id', as: 'subjectMaterial' });
  }
}
