import path from "path";
import multer from "multer";
const maxSize =1 * 1000 * 40000;//40mb
const publicFolder = path.resolve(__dirname, "..", "..", "public");
export default {
  directory: publicFolder,

  storage: multer.diskStorage({
    destination: publicFolder,
    filename(req, file, cb) {
      // const fileName = new Date().getTime() + path.extname(file.originalname);
      const fileName=file.originalname;

      return cb(null, fileName);
    },
  
  }),limits: { fileSize: maxSize }
};
