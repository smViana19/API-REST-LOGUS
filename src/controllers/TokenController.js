import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if(email === "" || password === "") {
      return res.status(400).json({
        status: 400,
        errors: ["Preencha os campos."]
      })
    }
    if (!email || !password) {
      return res.status(401).json({
        status: 401,
        errors: ["Credenciais inválidas."],
      });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: 401,
        errors: ["Usuario não encontrado."],
      });
    }

    if (!(await user.passwordValida(password))) {
      return res.status(401).json({
        status: 401,
        errors: ["Credenciais inválidas."],
      });
    }

    const { id, role } = user;
    const token = jwt.sign({ id, email, role }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({
      status: 200,
      msg: "Logado com sucesso.",
      token,
      user: { nome: user.nome, id, email, role },
    });
  }
}

export default new TokenController();
