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

let objPositionShips = {11: {}, 12: {}, 13: {}, 14: {}, 21: {}, 22: {}, 23: {}, 31: {}, 32: {}, 41: {}};

canvas.addEventListener('click', (e) => {
    let x = Math.floor((e.x-ww*0.1)/30);
    let y = Math.floor((e.y-wh*0.1)/30);
    let xB = ww*0.1+(x*30);
    let yB = wh*0.1+(y*30);
    if(x >= 12 && x <= 21 && y >= 0 && y <= 9) {
        let objProp = arrayLetter[x-12]+(y+1);
        for(let key in objPositionShips) {
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
                objPositionShips[key].hit++;
                objPositionShips[key][objProp] = 1;
                if(testObjPositionShips[key].lengthShip === objPositionShips[key].hit) {
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

let arrayShips = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
let arrayShipsClassName = [11, 12, 13, 14, 21, 22, 23, 31, 32, 41];
const orintation = undefined;


for(let i = 0; i < arrayShips.length; i++) {
    createShips(i,orintation);
}

function createShips (i,orintation,leftP, topP) { // function create Ships
    let canvasS;
    if(orintation == undefined) {
        orintation = 'v';
        canvasS = document.createElement('canvas');
        gebcl('wrapper').appendChild(canvasS);
    } else {
        canvasS = gebcl(arrayShipsClassName[i]);
    }
    orintation = (orintation == undefined) ? 'v' : orintation;
    canvasS.dataset.shipsNumb = arrayShipsClassName[i];
    objPositionShips[arrayShipsClassName[i]]['orintation'] = orintation;
    canvasS.dataset.orintation = orintation;
    canvasS.className = arrayShipsClassName[i];
    canvasS.style.position = 'absolute';
    let ctxS = canvasS.getContext('2d');

    ctxS.beginPath();
    ctxS.strokeStyle = '#0703ff';
    ctxS.lineWidth = 5;
    ctxS.moveTo(0,0);
    if(orintation == 'v') { //vertical orintation

        canvasS.style.left = (leftP == undefined) ? `${ww*0.1+(35*i)}px` : `${leftP}px`;
        canvasS.style.top =  (topP == undefined) ? `${wh*0.1+350}px` : `${topP}px`;

        canvasS.width = 30;
        canvasS.height = arrayShips[i] * 30;

        ctxS.strokeStyle = '#0703ff';
        ctxS.lineWidth = 5;
        ctxS.moveTo(0,0);
        ctxS.lineTo(30,0);
        ctxS.lineTo(30,arrayShips[i]*30);
        ctxS.lineTo(0,arrayShips[i]*30);
        ctxS.lineTo(0,0);

        for(let j = 0; j < arrayShips[i]; j++) {
            ctxS.moveTo(0, j*30);
            ctxS.lineTo(j*30,j*30)
            ctxS.stroke();
        }
    } else if ( orintation == 'h') { // horizontal orintation

        canvasS.style.left = (leftP == undefined) ? `${ww*0.1+35}px` : `${leftP}px`;
        canvasS.style.top =  (topP == undefined) ? `${wh*0.1+350+(35*i)}px` : `${topP}px`;

        canvasS.width = arrayShips[i] * 30;
        canvasS.height = 30; 

        ctxS.strokeStyle = '#0703ff';
        ctxS.lineWidth = 5;
        ctxS.moveTo(0,0);
        ctxS.lineTo(0, 30);
        ctxS.lineTo(arrayShips[i]*30, 30);
        ctxS.lineTo(arrayShips[i]*30, 0);
        ctxS.lineTo(0,0);

        for(let j = 0; j < arrayShips[i]; j++) {
            ctxS.moveTo(j*30, 0);
            ctxS.lineTo(j*30,j*30)
            ctxS.stroke();
        }
    }

    
    canvasS.onmousedown = (e) => {
        if(e.target.id !== 'canvas' && e.target.localName == 'canvas'){
            moveShips(e.target);
        }
    }
}


function moveShips (ships) {
    ships.onmousedown = (e) => {
    moveAt(e);
    ships.style.zIndex = 1000;
    function moveAt (e) {
        ships.style.left = e.pageX - ships.offsetWidth / 2 + 'px';
        ships.style.top = e.pageY - ships.offsetHeight / 2 + 'px'; 
    }
    
    document.onmousemove = (e) => {
        moveAt(e);
    }
    
    ships.onwheel = testF;
 
    ships.onmouseup = (e) => {
        addShipsObj (e.target);
        ships.onwheel = null;
        document.onmousemove = null;
        ships.onmouseup = null;
    }
    function testF (e) {
        if(e.deltaY > 0 ) {
            createShips(arrayShipsClassName.indexOf(+this.className),'h', e.clientY-e.target.height/2, e.clientX-e.target.width/2);
            // moveShips(e.target);
        }
        else if (e.deltaY < 0) {
            createShips(arrayShipsClassName.indexOf(+this.className),'v', e.clientY-e.target.height/2, e.clientX-e.target.width/2);
            // moveShips(e.target);
        }
    }
}
}
document.ondragstart = function() {
    return false;
  };

  function addShipsObj (targetShips) {
    let xS = Math.round((targetShips.offsetLeft - (ww*0.1))/30);
    let yS = Math.round((targetShips.offsetTop - (wh*0.1))/30);
    if(targetShips.dataset.orintation == 'h'){
        targetShips.style.left = `${ww*0.1+(xS*30)}px`;
        targetShips.style.top = `${wh*0.1+(yS*30)}px`;
    } else if (targetShips.dataset.orintation == 'v') {
        targetShips.style.left = `${ww*0.1+(xS*30)}px`;
        targetShips.style.top = `${wh*0.1+(yS*30)}px`;
    }
    let fieldCoordinatsStart = arrayLetter[xS] + arrayNumb[yS];
    clog(fieldCoordinatsStart)

    objPositionShips[targetShips.dataset.shipsNumb] = {};
    objPositionShips[targetShips.dataset.shipsNumb][fieldCoordinatsStart] = 0;
    if(targetShips.dataset.orintation == 'h') {
        objPositionShips[targetShips.dataset.shipsNumb]['lengthShip'] = targetShips.height/30;
        objPositionShips[targetShips.dataset.shipsNumb]['hit'] = 0;
        for(let i = 0; i < (targetShips.height/30); i++) {
            let coordinatDeck = arrayLetter[xS] + arrayNumb[yS+i];
            objPositionShips[targetShips.dataset.shipsNumb][coordinatDeck] = 0;
        }
    } else if (targetShips.dataset.orintation == 'v') {
        objPositionShips[targetShips.dataset.shipsNumb]['lengthShip'] = targetShips.height/30;
        objPositionShips[targetShips.dataset.shipsNumb]['hit'] = 0;
        for(let i = 0; i < (targetShips.height/30); i++) {
            let coordinatDeck = arrayLetter[xS+i] + arrayNumb[xS];
            objPositionShips[targetShips.dataset.shipsNumb][coordinatDeck] = 0;
        }
       }
    objPositionShips[targetShips.dataset.shipsNumb]['orintation'] = targetShips.dataset.orintation;    
  }