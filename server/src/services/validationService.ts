/**
 * Validate if the materials doesn't exceed the index of environmental damage
 * @param materials
 */
export function isValidate(materials: Array<any>) {
    var response = {
            message: "",
            validation: false,
        },
        index_sum = 0;

    for (let value of materials) {
        let entries = Object.entries(value);
        for (let [key, value] of entries) {
            index_sum += value as number;
        }
    }

    if(index_sum>=1){
        response.validation=false
        response.message="L'index de dommage environnemental excède de 1"
    }
    else {
        response.validation=true
    }

    return response
}
