import SubjectMaterial from "../models/SubjectMaterial";
import User from "../models/User";
import Subject from "../models/Subject";


class SubjectMaterialController {
  async store(req, res) {
    try {
      const {subject_id, ...rest} = req.body;
      console.log('id materia: ', subject_id)
      if (!subject_id) {
        return res.status(400).json({
          errors: ["Subject ID é necessário."],
        });
      }

      console.log('Request Body:', req.body);
      const subjectMaterial = await SubjectMaterial.create({
        ...rest,
        user_id: req.userId,
        subject_id: subject_id || req.body.subject_id
      });
      const subjectMaterialWithAssociations = await SubjectMaterial.findByPk(subjectMaterial.id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ["id", "email", "role"]
          },
          {
            model: Subject,
            as: "subject",
            attributes: ["id", "nome", "user_id"]
          },
        ]
      });
      return res.json(subjectMaterialWithAssociations);
    } catch (e) {
      console.error("Erro ao criar material: ", e);
      return res.status(400).json({
        errors: ["Erro ao criar material"],
      });
    }
  }

  async update(req, res) {
    try {
      const subject = await SubjectMaterial.findByPk(req.params.id);
      if (!subject) {
        return res.status(400).json({
          errors: ["Material nao existe"],
        });
      }
      const newSubject = await SubjectMaterial.update(req.body);
      const {id, nome, pontos, categoria, detalhes, data_entrega} = newSubject;
      return res.json({id, nome, pontos, categoria, detalhes, data_entrega});

    } catch (e) {
      console.error("Erro ao editar material:", e);
      return res.status(400).json({
        errors: ["Erro ao editar material"]
      })
    }
  }

  async index(req, res) {
    try {
      const {subject_id} = req.params;

      if (!subject_id) {
        return res.status(400).json({
          errors: ["Subject ID é necessário para listar as atividades."],
        })
      }
      const subjectMaterials = await SubjectMaterial.findAll({
        attributes: ["subject_id", "id", "nome", "pontos", "categoria", "detalhes", "data_entrega"],
        where: {subject_id},
        order: [["id", "DESC"]]
      })
      return res.json(subjectMaterials)
    } catch (e) {
      console.error("Erro ao listar atividades: ", e)
      return res.status(400).json({
        erros: ["Erro ao listar atividades"],
      })
    }
  }

  async show(req, res) {
  }

  async delete(req, res) {
    try {
      const subject = await SubjectMaterial.findByPk(req.params.id);
      if (!subject) {
        return res.status(400).json({
          errors: ["Materia nao existe."],
        });
      }
      await subject.destroy();
      return res.json({
        message: ["Deletada com sucesso"],
      });
    } catch (e) {
      console.error("Error excluir a materia:", e);
      return res.status(400).json({
        errors: ["Error ao excluir materia"],
      });
    }
  }
}

export default new SubjectMaterialController()