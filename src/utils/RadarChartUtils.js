
const ty3 = [-1.0,0,1.0];
const tz3 = [-.5,0,-.5];

const cats = ["Potencial", "Preco", "Canais"];

export const Unpack = (row, catNumber) => {
    const arrx = [];
    const arry = [];
    const arrz = [];

    arrx = [...Object.keys(row[0][cats[catNumber]].Dados)];
    
    for(a in arrx){
        arry.push(row[0][cats[catNumber]].Dados[a] * ty3[catNumber])
        arrz.push(row[0][cats[catNumber]].Dados[a] * tz3[catNumber])
    }

    return {
        "x": arrx,
        "y": arry,
        "z": arrz
    }

}