import multer from "multer";
import moment from "moment";
import path from "path";

class CustomUploader {
  constructor(directory) {
    this.directory = directory;
    this.storage = multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, this.directory);
      },
      filename(_req, file, cb) {

        const date = moment().format("DDMMYYYY-HHmmss");
        const fileExtension = path.extname(file.originalname);
        const fileName = file.originalname.split('.').slice(0, -1).join('.')

        cb(null, `${fileName}-${date}${fileExtension}`);
      },
    });
    this.upload = multer({ storage: this.storage });
  }

  getMiddleware() {
    return this.upload;
  }
}


export default CustomUploader;