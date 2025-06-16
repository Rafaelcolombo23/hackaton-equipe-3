import express from 'express';
import { upload, uploadFoto } from '../controllers/UploadController';

const router = express.Router();

router.post('/upload', upload.single('foto'), uploadFoto);

export default router;