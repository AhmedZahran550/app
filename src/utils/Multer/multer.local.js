import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs' ;
import path from "path";
import {fileURLToPath} from 'url'


const __dirname = path.dirname(fileURLToPath(import.meta.url)) ;

export const DataTypes ={
    Image:['image/png' , 'image/jpeg'],
    file:['text/plain']
}

export function uploadFile({customPath ='general' ,CustomDataType =[]}) {
    const fulPath = path.join(__dirname , `../../uploads/${customPath}`)

    if (!fs.existsSync(fulPath)) {
        fs.mkdirSync(fulPath ,{recursive:true})
    }
 
    
const storage = multer.diskStorage({        
    destination:(req,file,cb)=>{ 
            cb(null , fulPath)
    },
    filename:(req,file,cb)=>{
        const uniqueName =nanoid()+file.originalname ;
        file.url = `uploads/${customPath}/${uniqueName}` ;
        cb(null , uniqueName)
    }}
    );
       
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