import compromise from "fr-compromise";
import { materialPerso } from "../utils/materialPerso";

export const getMaterials = (prompt: string)=>{
    console.log(prompt);
    
    var entities: Array<any> = [],
        prompt_compromise = compromise(prompt),
        frigidaire = materialPerso.frigidaire.descWord,
        chauffage = materialPerso.chauffage.descWord
    
    if(prompt_compromise.lookup(frigidaire).length !== 0){
        entities.push({
            materiel: "Réfrigérateur",
            description: materialPerso.frigidaire.description
        })
    }
    if(prompt_compromise.lookup(chauffage).length !== 0){
        entities.push({
            materiel: "Chauffage",
            description: materialPerso.chauffage.description
        })
    }
    console.log(entities);
    
    return entities
}