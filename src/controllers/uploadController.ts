import multer from "multer";
import path from "path";
import { Request, Response } from "express";

// Configuração do multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage });

export async function uploadFoto(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).json({ error: "Nenhum arquivo enviado." });
    return;
  }

  const fileUrl = `http://localhost:3333/uploads/${req.file.filename}`;

  res.status(200).json({ url: fileUrl });
  return;
}
