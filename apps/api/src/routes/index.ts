import { Router } from "express";
import multer from "multer";
import { uploadAudioController } from "../controllers/storage";
import { transcribeAudioController } from "../controllers/stt";
import { responseController } from "../controllers/llm";
import { summarizeController } from "../controllers/summarize";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".webm");
  },
});

export const router = Router();

router.get("/", (req, res) => {
  res.send(`
  `);
});
router.get("/message/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});
router.get("/healthz", (req, res) => {
  return res.json({ ok: true });
});

router.post(
  "/audio/upload",
  multer({ storage }).single("audio"),
  uploadAudioController
);
router.post(
  "/audio/transcribe",
  multer({ storage }).single("audio"),
  transcribeAudioController
);
router.post(
  "/response",
  multer({ storage }).single("audio"),
  responseController
);
router.post(
  "/summarize",
  multer({ storage }).single("audio"),
  summarizeController
);
