import compromise from "fr-compromise";
import { materials, materials_index } from "../utils/material";

export const getEntities = (prompt: string) => {
    var entities: Array<any> = [],
        prompt_compromise = compromise(prompt),
        petrole = materials.petrole.descWord,
        bois = materials.bois.descWord,
        verre = materials.verre.descWord,
        pierre = materials.pierre.descWord,
        organique = materials.organique.descWord,
        plastique = materials.plastique.descWord,
        metal = materials.metal.descWord;

    if (prompt_compromise.lookup(petrole).length !== 0)
        entities.push({ petrole: materials_index["petrole"] });
    if (prompt_compromise.lookup(bois).length !== 0)
        entities.push({ bois: materials_index["bois"] });
    if (prompt_compromise.lookup(verre).length !== 0)
        entities.push({ verre: materials_index["verre"] });
    if (prompt_compromise.lookup(pierre).length !== 0)
        entities.push({ pierre: materials_index["pierre"] });
    if (prompt_compromise.lookup(organique).length !== 0)
        entities.push({ organique: materials_index["organique"] });
    if (prompt_compromise.lookup(plastique).length !== 0)
        entities.push({ plastique: materials_index["plastique"] });
    if (prompt_compromise.lookup(metal).length !== 0)
        entities.push({ metal: materials_index["metal"] });

    return entities;
};
