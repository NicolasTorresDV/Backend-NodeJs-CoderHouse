import {dirname} from "path";
import {fileURLToPath} from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 8080;

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,__dirname+"/public/img")
    },

    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const uploader = multer({storage})

export  {__dirname, uploader, PORT }