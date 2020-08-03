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
ctx.lineWidth = 1;
for(let i = ww*0.1; i <= 660+ww*0.1; i+= 30){
    if(i == 114.80000000000001 || i == 414.8 ||  i == 444.8 || i == 474.8 || i == 774.8){
        continue;
    }
    ctx.moveTo(i, wh*0.1-30);
    ctx.lineTo(i, 300+wh*0.1);
}
for(let i = wh*0.1; i <= 300+wh*0.1; i+= 30){
    if (i == 96.60000000000001 || i == 396.6) {
        continue;
    }
    ctx.moveTo(ww*0.1-30, i);
    ctx.lineTo(660+ww*0.1, i);
}
ctx.font = 'italic 25pt Arial';
let j = 0;
for(let i = ww*0.1-90; i <= 300; i+=30){
    if(j == 9) {
        ctx.fillText(arrayNumb[j], ww*0.1-45, wh*0.1+i);
        ctx.fillText(arrayNumb[j], ww*0.1+315, wh*0.1+i);
        ctx.fillText(arrayLetter[j],ww*0.1+i-20, wh*0.1);
        ctx.fillText(arrayLetter[j],ww*0.1+i+340, wh*0.1);
        break;
    }
    ctx.fillText(arrayNumb[j], ww*0.1-30, wh*0.1+i);
    ctx.fillText(arrayNumb[j], ww*0.1+330, wh*0.1+i);
    ctx.fillText(arrayLetter[j],ww*0.1+i-20, wh*0.1);
    ctx.fillText(arrayLetter[j],ww*0.1+i+340, wh*0.1);
    j++;
}
ctx.strokeStyle = '#888';
ctx.stroke();