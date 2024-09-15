import SubmitActivity from '../models/SubmitActivity';

class SubmitActivityController {
  async store(req, res) {
    try {
      const { file, data_entrega, user_id, subject_material_id } = req.body;
      const newSubmission = await SubmitActivity.create({
        file,
        data_entrega,
        user_id,
        subject_material_id,
      });
      return res.status(201).json(newSubmission);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Outras funções como read, update, delete podem ser adicionadas aqui
}

export default new SubmitActivityController();

