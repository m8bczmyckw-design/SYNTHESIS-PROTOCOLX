const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const chars = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ";
const size = 18;

let columns = Math.floor(window.innerWidth / size);
let drops = [];

function resetDrops() {
    columns = Math.floor(window.innerWidth / size);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}

resetDrops();

window.addEventListener("resize", resetDrops);

function draw() {

    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#39ff14";
    ctx.font = size + "px Share Tech Mono";

    for(let i=0;i<drops.length;i++){

        const text = chars[Math.floor(Math.random()*chars.length)];

        ctx.fillText(
            text,
            i*size,
            drops[i]*size
        );

        if(drops[i]*size>canvas.height && Math.random()>0.975){

            drops[i]=0;

        }

        drops[i]++;

    }

}

setInterval(draw,35);
