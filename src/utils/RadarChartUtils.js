
const ty3 = [-1.0,0,1.0];
const tz3 = [-.5,0,-.5];

const cats = ["Potencial", "Preco", "Canais"];

export const Unpack = (row, catNumber) => {
    const arrx = [];
    const arry = [];
    const arrz = [];

    arrx = [...Object.keys(row[0][cats[catNumber]].Dados)];
    
    arrx.forEach(element => {
        console.log(element)
        arry.push(row[0][cats[catNumber]].Dados[element])
        arrz.push(row[0][cats[catNumber]].Dados[element] * tz3[catNumber])
    });

    return {
        "x": arrx,
        "y": arry,
        "z": arrz
    }

}
