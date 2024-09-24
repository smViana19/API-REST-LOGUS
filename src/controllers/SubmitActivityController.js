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
            status: 'ENTREGUE'
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
      return res.status(500).json({errors: "Erro no servidor ao entregar"});
    }
  }

  async index(req, res) {
    try {
      const submissions = await SubmitActivity.findAll();
      if (!submissions || submissions.length === 0) {
        return res.status(404).json({ message: 'Nenhuma submissão encontrada.' });
      }
      return res.json({
        status: 200,
        submissions
      });
    } catch (error) {
      console.error("Erro no servidor ao listar: ", error);
      return res.status(500).json({ error: "Erro ao listar." });
    }
  }

  async show(req, res) {
    try {
      const submissionId = parseInt(req.params.id)
      const submission = await SubmitActivity.findByPk(submissionId);
      if (!submission) {
        return res.status(404).json({error: 'Entrega não encontrada'});
      }
      return res.json(submission)
    } catch (error) {
      console.error("Erro ao buscar entrega: ", error)
      return res.status(500).json({error: "Erro ao buscar entrega."})
    }
  }

  async update(req, res) {
    try {
      const submission = await SubmitActivity.findByPk(req.params.id);
      if (!submission) {
        return res.status(404).json({error: "Entrega não encontrada"})
      }
      const newSubmission = await submission.update(req.body);
      return res.json(newSubmission);
    } catch (error) {
      console.error("Erro ao atualizar a entrega: ", error)
      return res.status(500).json({error: "Erro ao atualizar a entrega."})
    }
  }

  async delete(req, res) {
    try {
      const submission = await SubmitActivity.findByPk(req.params.id);
      if (!submission) {
        return res.status(404).json({error: 'Entrega não encontrada'});
      }
      await submission.destroy();
      return res.json({message: 'Entrega removida com sucesso'});
    } catch (error) {
      console.error("Erro ao excluir a entrega", error)
      return res.status(500).json({error: 'Erro ao excluir a entrega'});
    }
  }


}

export default new SubmitActivityController();