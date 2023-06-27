
import fs from "fs";

export default {
    SECRET : "inventario-api"
}

export const imageToDelete = (image)=>{
    fs.unlink(image, error => {
        if(error){
            console.error(error);
        };
        console.log("image uploads deleted");
        
    });
}