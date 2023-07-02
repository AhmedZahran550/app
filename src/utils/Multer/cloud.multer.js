import multer from "multer";

export function cloudUpload(CustomDataType =[]) {
const storage = multer.diskStorage({});
function fileFilter (req,file,cb){
        if (CustomDataType.includes(file.mimetype)) {
             cb(null , true)
        }
        else{
            cb('in-valid Datatype',false)
        }
}

  const upload = multer({ fileFilter , storage  }) ;

    return upload ;

}