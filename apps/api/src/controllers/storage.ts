import type { RequestHandler, Request, Response } from "express";
import { uploadAudio, getAudio } from "../services/storage";

export const uploadAudioController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file || !req.file.path)
      return res.status(400).json({ error: "No audio file provided" });
    const { path } = req.file;
    const { audioUrl } = await uploadAudio(path);
    return res.json({ audioUrl });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to upload audio file" });
  }
};

export const getAudioController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { fileId } = req.params;
  try {
    const { fileData, file } = await getAudio({ fileId });
    res.setHeader("Content-Disposition", `attachment; filename=${file.name}`);
    res.setHeader("Content-Type", file.mimeType);
    return res.send(fileData);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to get audio file" });
  }
};
