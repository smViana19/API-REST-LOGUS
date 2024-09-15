import express from 'express';
import multer from 'multer';
import multerConfig from './config/multerConfig'; // Caminho do arquivo multerConfig.js
import SubmitActivity from './models/SubmitActivity'; // Importa o modelo para salvar a entrega

const router = express.Router();
const upload = multer(multerConfig);

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { user_id, subject_material_id, data_entrega } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }

    const submitActivity = await SubmitActivity.create({
      file: req.file.filename,
      data_entrega: new Date(data_entrega),
      user_id,
      subject_material_id
    });

    res.status(201).json(submitActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar o upload' });
  }
});

export default router;