
class HomeController {
  async index(req, res) {
    res.json('Voce entrou na api com sucesso! Para acessar as demais rotas consulte a documentação.');
  }
}

export default new HomeController();
