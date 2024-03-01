const jwt = require("jsonwebtoken");
const SECRET = "iLoveYou";
import fs from 'fs';
import path from 'path';

const generateToken = (u_id : number | undefined, u_email : string | undefined) => {
    const token = jwt.sign(
        {
            u_id,
            u_email,
        },
        SECRET,
        { 
            expiresIn: "365d" 
        }
    );
    return token;
}

const uploadFile = function (chemin:string, fichier:any) {
    return new Promise((resolve, reject) => {
        let uploadPath, current_time = new Date().getTime(), nom_img:any;

        if (!fichier) {
          reject("No files were uploaded.");
        }
    
        let fichier_name = fichier.name.split(".");
        let ext = fichier_name[fichier_name.length - 1];
        nom_img = current_time+ String(Math.random()) + "." + ext;
        uploadPath = chemin + nom_img;
    
        fichier.mv(uploadPath, function (err:any) {
          if (err) reject(err);
          resolve(nom_img)
        });
    })
}

export {
    generateToken,
    uploadFile
}