import Period from "../models/Period";

class PeriodController {
  async createPeriod(req, res) {
    try {
      const { name, start_date, end_date } = req.body;
      const period = await Period.create({
        name,
        start_date,
        end_date
      });
      res.status(201).json(period);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar periodo" });
    }
  }
  async getAllPeriods(req, res) {
    try {
      const periods = await Period.findAll();
      res.status(200).json(periods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar periodos" });
    }
  }
  async getPeriodById(req, res) {
    try {
      const period = await Period.findByPk(req.params.id);
      if (!period) {
        return res.status(404).json({ error: "Nivel não encontrado" })
      }
      res.status(200).json(period);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar os periodos, tente novamente" });
    }
  }
  async updatePeriod(req, res) {
    try {
      const period = await Period.findByPk(req.params.id);
      if (!period) {
        return res.status(404).json({ error: "Nivel não encontrado" })
      }
      const { name, start_date, end_date } = req.body;
      const newData = await period.update({ name, start_date, end_date });
      res.status(200).json({ newData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao editar o periodo, tente novamente" });
    }

  }
  async deletePeriod(req, res) {
    try {
      const period = await Period.findByPk(req.params.id);
      if (!period) {
        return res.status(404).json({ error: "Nivel não encontrado" })
      }
      await period.destroy();
      res.status(204)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar periodo" });
    }
  }
}

export default new PeriodController();