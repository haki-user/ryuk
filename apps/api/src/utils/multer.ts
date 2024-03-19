import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".webm");
  },
});

const upload = multer({ storage });

export const saveAudioFile = (audioBlob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const req = {} as any; // Mock Express request object
    const res = {} as any; // Mock Express response object

    upload.single("audio")(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(req.file.filename);
      }
    });
  });
};
