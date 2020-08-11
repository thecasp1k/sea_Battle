let clog = console.log;
gebi = function (id) {return document.getElementById(id)};
gebcl = function (className) {return document.getElementsByClassName(className)[0]};
let ww = window.innerWidth;
let wh = window.innerHeight;
let arrayNumb = ['1','2','3','4','5','6','7','8','9','10'];
let arrayLetter = ['A','B','C','D','E','F','G','H','J','K'];


let canvas = gebi('canvas');
canvas.width = ww*0.99;
canvas.height = wh*0.99;
let ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.strokeStyle = '#0703ff';
ctx.lineWidth = 4;
ctx.strokeRect(ww*0.1, wh*0.1, 300, 300);
ctx.strokeRect(ww*0.1+360, wh*0.1, 300, 300);
for(let i = ww*0.1+30; i <= 630+ww*0.1; i+= 30){
    if(i == ww*0.1+300 ||  i ==  ww*0.1+330 || i == ww*0.1+360 ){
        continue;
    }
    ctx.moveTo(i, wh*0.1-30);
    ctx.lineTo(i, 300+wh*0.1);
}
for(let i = wh*0.1+30; i <= 270+wh*0.1; i+= 30){
    ctx.moveTo(ww*0.1-30, i);
    ctx.lineTo(660+ww*0.1, i);
}
ctx.font = 'italic 25pt Arial';
let j = 0;
for(let i = 30; i <= 300; i+=30){
    if(j == 9) {
        ctx.fillText(arrayNumb[j], ww*0.1-45, wh*0.1+i);
        ctx.fillText(arrayNumb[j], ww*0.1+315, wh*0.1+i);
        ctx.fillText(arrayLetter[j],ww*0.1+i-30, wh*0.1);
        ctx.fillText(arrayLetter[j],ww*0.1+i+330, wh*0.1);
        break;
    }
    ctx.fillText(arrayNumb[j], ww*0.1-30, wh*0.1+i);
    ctx.fillText(arrayNumb[j], ww*0.1+330, wh*0.1+i);
    ctx.fillText(arrayLetter[j],ww*0.1+i-30, wh*0.1);
    ctx.fillText(arrayLetter[j],ww*0.1+i+330, wh*0.1);
    j++;
}
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.stroke();

let arrayShips = [4,3,3,2,2,2,1,1,1,1];

// ctx.strokeStyle = '#0703ff';
// ctx.lineWidth = 3;
// ctx.strokeRect(ww*0.1, wh*0.1+350, 30, 30);
// ctx.strokeRect(ww*0.1+30, wh*0.1+350, 30, 30);
// ctx.strokeRect(ww*0.1+60, wh*0.1+350, 30, 30);
// ctx.strokeRect(ww*0.1+90, wh*0.1+350, 30, 30);

// ctx.strokeRect(ww*0.1, wh*0.1+385, 30, 30);
// ctx.strokeRect(ww*0.1+30, wh*0.1+385, 30, 30);
// ctx.strokeRect(ww*0.1+60, wh*0.1+385, 30, 30);
// ctx.strokeRect(ww*0.1, wh*0.1+420, 30, 30);
// ctx.strokeRect(ww*0.1+30, wh*0.1+420, 30, 30);
// ctx.strokeRect(ww*0.1+60, wh*0.1+420, 30, 30);

// ctx.strokeRect(ww*0.1, wh*0.1+455, 30, 30);
// ctx.strokeRect(ww*0.1+30, wh*0.1+455, 30, 30);
// ctx.strokeRect(ww*0.1, wh*0.1+490, 30, 30);
// ctx.strokeRect(ww*0.1+30, wh*0.1+490, 30, 30);
// ctx.strokeRect(ww*0.1, wh*0.1+525, 30, 30);
// ctx.strokeRect(ww*0.1+30, wh*0.1+525, 30, 30);

// ctx.strokeRect(ww*0.1, wh*0.1+560, 30, 30);
// ctx.strokeRect(ww*0.1, wh*0.1+595, 30, 30);
// ctx.strokeRect(ww*0.1, wh*0.1+630, 30, 30);
// ctx.strokeRect(ww*0.1, wh*0.1+665, 30, 30);

let testObjPositionShips = {
    11: {A1: 0, lengthShip: 1, hit: 0, orintation: 'v'},
    12: {A3: 0, lengthShip: 1, hit: 0, orintation: 'v'},
    13: {A5: 0, lengthShip: 1, hit: 0, orintation: 'v'},
    14: {A7: 0, lengthShip: 1, hit: 0 ,orintation: 'v'},
    21: {A9: 0, A10: 0, lengthShip: 2, hit: 0, orintation: 'v'},
    22: {C9: 0, C10: 0, lengthShip: 2, hit: 0, orintation: 'v'},
    23: {C6: 0, C7: 0, lengthShip: 2, hit: 0, orintation: 'v'},
    31: {C2:0, C3: 0, C4: 0, lengthShip: 3, hit: 0, orintation: 'v'},
    32: {E1: 0, E2: 0, E3: 0, lengthShip: 3, hit: 0, orintation: 'v'},
    41: {E5: 0, F5: 0, G5:0, H5: 0, lengthShip: 4, hit: 0, orintation: 'h'},
};

canvas.addEventListener('click', (e) => {
    let x = Math.floor((e.x-ww*0.1)/30);
    let y = Math.floor((e.y-wh*0.1)/30);
    let xB = ww*0.1+(x*30);
    let yB = wh*0.1+(y*30);
    if(x >= 12 && x <= 21 && y >= 0 && y <= 9) {
        let objProp = arrayLetter[x-12]+(y+1);
        for(let key in testObjPositionShips) {
            if(testObjPositionShips[key][objProp] == 1) {
                return;
            }
            if(testObjPositionShips[key][objProp] == 0){
                ctx.beginPath();
                ctx.strokeStyle = 'Red';
                ctx.lineWidth = 2;
                ctx.arc(xB+15,yB+15,8,0,Math.PI * 2, false);
                ctx.fillStyle = 'red'
                ctx.fill();
                ctx.stroke();
                testObjPositionShips[key].hit++;
                testObjPositionShips[key][objProp] = 1;
                if(testObjPositionShips[key].lengthShip === testObjPositionShips[key].hit) {
                    crossForShips(testObjPositionShips[key]);                    
                    return;
                }
                return;
            }
        }
        ctx.beginPath();
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.moveTo(xB, yB);
        ctx.lineTo(xB+30, yB+30);
        ctx.moveTo(xB+30, yB);
        ctx.lineTo(xB, yB+30);
        ctx.stroke();
    }

});

function crossForShips (shipsObj) {
    let massX = [];
    let massY = [];
    for(let key in shipsObj) {
        let t = key.split('');
        let x = arrayLetter.indexOf(t[0])+12;
        let y = t[1]-1;
        if(shipsObj.orintation == 'v'){
            massX.push(x-1, x, x+1);
            massY.push(y-1,y-1,y-1);
            for( let i = 0; i < shipsObj.lengthShip; i++ ){
                    massX.push(x-1,x+1);
                    massY.push(y+i,y+i);
            }
            massX.push(x-1, x, x+1);
            massY.push(y+shipsObj.lengthShip, y+shipsObj.lengthShip, y+shipsObj.lengthShip);
        }
        else if (shipsObj.orintation == 'h'){
            massX.push(x-1,x-1,x-1);
            massY.push(y-1,y,y+1);
            for( let i = 0; i < shipsObj.lengthShip; i++ ){
                massX.push(x+i,x+i);
                massY.push(y-1,y+1);
            }
            massX.push(x+shipsObj.lengthShip,x+shipsObj.lengthShip,x+shipsObj.lengthShip);
            massY.push(y-1,y,y+1);
        }
        break;
    }
    for(let i = 0; i < massY.length; i++) {
        if(massX[i] >= 12 && massX[i] <= 21 && massY[i] >= 0 && massY[i] <= 9) {
            let xB = ww*0.1+(massX[i]*30);
            let yB = wh*0.1+(massY[i]*30);
            ctx.beginPath();
            ctx.strokeStyle = '#888';
            ctx.lineWidth = 2;
            ctx.moveTo(xB, yB);
            ctx.lineTo(xB+30, yB+30);
            ctx.moveTo(xB+30, yB);
            ctx.lineTo(xB, yB+30);
            ctx.stroke();
        }
    }
}