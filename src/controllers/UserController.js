/* eslint-disable no-unused-vars */
import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const {id, nome, email, role} = novoUser;

      return res.json({id, nome, email, role}); //adicionado role
    } catch (e) {
      console.log("error: ", e)
      return res.status(400).json({
        errors: ["Erro ao criar usuario"],
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "nome", "email", "role"],
      });
      return res.json(users);
    } catch (e) {
      console.error("Erro ao listar usuários:", e);
      return res.status(500).json({
        errors: ["Erro ao listar usuários."],
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const {id, nome, email, role} = user;
      return res.json({id, nome, email, role});
    } catch (e) {
      console.error(e)
      return res.status(500).json("Erro ao tentar mostrar o usuario.");
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuario não encontrado"],
        });
      }

      const novosDados = await user.update(req.body);
      const {id, nome, email, role} = novosDados;
      return res.json({id, nome, email, role});
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuario não existe."],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}


export default new UserController();
