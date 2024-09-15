import SubmitActivity from '../models/SubmitActivity';
import User from '../models/User'; // Certifique-se de importar o modelo User

class SubmitActivityController {
  async store(req, res) {
    try {
      const { user_id, subject_material_id, data_entrega } = req.body;

      // Verificar se o usuário tem a role "estudante"
      //const user = await User.findByPk(user_id);
      //if (!user || user.role !== 'estudante') {
      //  return res.status(403).json({ error: 'Apenas estudantes podem enviar atividades.' });
      //}

      // Verificar se os arquivos foram enviados através do Multer
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'Arquivos são obrigatórios para a submissão.' });
      }

      // Iterar sobre os arquivos e criar uma submissão para cada um
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

      return res.status(201).json(submissions);  // Retorna todas as submissões criadas
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Outras funções como read, update, delete podem ser adicionadas aqui
}

export default new SubmitActivityController();