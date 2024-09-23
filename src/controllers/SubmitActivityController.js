import SubmitActivity from '../models/SubmitActivity';

class SubmitActivityController {
  async store(req, res) {
    try {
      const {user_id, subject_material_id} = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          errors: "Selecione um ou mais arquivos para a entrega"
        });
      }

      const submissions = await Promise.all(
        req.files.map((file) => {
          return SubmitActivity.create({
            file: file.filename,
            data_entrega: new Date(),
            user_id,
            subject_material_id,
          });
        })
      );

      return res.status(201).json({
        status: 201,
        message: "Entregue com sucesso.",
        submissions
      });
    } catch (error) {
      console.error(error)
      return res.status(400).json({errors: "Erro ao entregar"});
    }
  }

  async index(req, res) {
  }

  async show(req, res) {

  }

  async update(req, res) {
  }

  async delete(req, res) {

  }


}

export default new SubmitActivityController();