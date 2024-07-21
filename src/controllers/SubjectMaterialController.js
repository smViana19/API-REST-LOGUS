
import SubjectMaterial from "../models/SubjectMaterial";


class SubjectMaterialController {
  async store(req, res) {
    try {
      console.log('Request Body:', req.body);
      const subjectMaterial = await SubjectMaterial.create(req.body);
      const subjectMaterialWithAssociations = await SubjectMaterial.findByPk(subjectMaterial.id, {
        include: ["user", "subject"]
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
    const subjectMaterial = await SubjectMaterial.findAll({
      attributes: ["id", "nome", "pontos", "categoria", "detalhes", "data_entrega"],
      order: [
        ["id", "DESC"]
      ]
    });
    res.json(subjectMaterial);
  }
//TODO SHOW

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