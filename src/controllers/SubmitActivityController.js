import SubmitActivity from '../models/SubmitActivity';

class SubmitActivityController {
  async store(req, res) {
    try {
      const {user_id, subject_material_id, data_entrega} = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({error: 'Arquivos são obrigatórios para a submissão.'});
      }

      const submissions = await Promise.all(
        req.files.map((file) => {
          return SubmitActivity.create({
            file: file.filename,  // O nome do arquivo
            data_entrega,
            user_id,
            subject_material_id,
          });
        })
      );

      return res.status(201).json(submissions);
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  }

}

export default new SubmitActivityController();