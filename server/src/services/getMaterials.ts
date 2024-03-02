import compromise from "fr-compromise";
import { materialPerso } from "../utils/materialPerso";

export const getMaterials = (prompt: string)=>{
    console.log(prompt);
    
    var entities: Array<any> = [],
        prompt_compromise = compromise(prompt),
        frigidaire = materialPerso.frigidaire.descWord,
        chauffage = materialPerso.chauffage.descWord,
        voiture = materialPerso.voiture.descWord,
        laveLinge = materialPerso["lave-linge"].descWord,
        secheLinge = materialPerso["sèche-linge"].descWord,
        ordinateur = materialPerso.ordinateur.descWord,
        television = materialPerso.télévision.descWord,
        systemeAudio = materialPerso["système audio"].descWord

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
    if(prompt_compromise.lookup(laveLinge).length !== 0){
        entities.push({
            materiel: "Lave-linge",
            description: materialPerso["lave-linge"].description
        })
    }if(prompt_compromise.lookup(ordinateur).length !== 0){
        entities.push({
            materiel: "Ordinateur",
            description: materialPerso.ordinateur.description
        })
    }
    if(prompt_compromise.lookup(voiture).length !== 0){
        entities.push({
            materiel: "Voiture",
            description: materialPerso.voiture.description
        })
    }
    if(prompt_compromise.lookup(secheLinge).length !== 0){
        entities.push({
            materiel: "Sèche-linge",
            description: materialPerso["sèche-linge"].description
        })
    }if(prompt_compromise.lookup(television).length !== 0){
        entities.push({
            materiel: "Télévision",
            description: materialPerso.télévision.description
        })
    }
    if(prompt_compromise.lookup(systemeAudio).length !== 0){
        entities.push({
            materiel: "Système audio",
            description: materialPerso["système audio"].description
        })
    }
    console.log(entities);
    
    return entities
}