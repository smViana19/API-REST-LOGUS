/* eslint-disable no-unused-vars */
import { where } from "sequelize";
import User from "../models/User";
import { sendEmail } from "../utils/mailUtils";

class UserController {

  async store(req, res) {
    try {
      let { password } = req.body;
      let passGenerated = true;
      if (!password) {
        password = generatePassword();
        req.body.password = password;
        passGenerated = true;
      }

      const novoUser = await User.create(req.body);
      const { id, nome, email, role } = novoUser;
      if (passGenerated) {
        console.log("Enviando email para: ", email)
        await sendEmail(email, 'Sua nova conta', `Sua senha é: ${password}`)
      }


      return res.json({ message: `Novo ${role} criado com sucesso!`, id, nome, email, role });
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
      const { id, nome, email, role } = user;
      return res.json({ id, nome, email, role });
    } catch (e) {
      console.error(e)
      return res.status(500).json("Erro ao tentar mostrar o usuario.");
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await User.findAll({
        where: { role: 'estudante' }
      })
      res.status(200).json(students)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Erro ao listar os estudantes" });
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
      const { id, nome, email, role } = novosDados;
      return res.json({ id, nome, email, role });
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
      return res.json({ message: "Usuario deletado com sucesso." });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async countStudents(req, res) {
    try {
      const count = await User.count({ where: { role: 'estudante' } });
      return res.status(200).json({ count })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao contar usuarios." })
    }
  }
  async countTeachers(req, res) {
    try {
      const count = await User.count({ where: { role: 'professor' } });
      return res.status(200).json({ count })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao contar usuarios." })
    }
  }

}

export const generatePassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};




export default new UserController();
