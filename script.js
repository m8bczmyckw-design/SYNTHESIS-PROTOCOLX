const boot=document.getElementById("boot");
const questionsScreen=document.getElementById("questions");
const errorScreen=document.getElementById("error");
const punishmentScreen=document.getElementById("punishment");
const giftScreen=document.getElementById("gift");

const bootText=document.getElementById("bootText");
const startBtn=document.getElementById("start");
const counter=document.getElementById("counter");
const title=document.getElementById("title");
const question=document.getElementById("question");
const yes=document.getElementById("yes");
const no=document.getElementById("no");
const flash=document.getElementById("flash");
const glitch=document.getElementById("glitchLayer");

const clickSound=document.getElementById("clickSound");
const typingSound=document.getElementById("typingSound");
const glitchSound=document.getElementById("glitchSound");
const errorSound=document.getElementById("errorSound");
const music=document.getElementById("music");

let current=0;
let busy=false;

startBtn.textContent="بدء التهيئة";
yes.textContent="نعم";
no.textContent="لا";
yes.style.display="none";
no.style.display="none";

const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

function play(sound, volume=0.35){
if(!sound)return;
sound.pause();
sound.currentTime=0;
sound.volume=volume;
sound.play().catch(()=>{});
}

function vibrate(ms=35){
if(navigator.vibrate){
navigator.vibrate(ms);
}
}

function flashEffect(){
if(!flash)return;
flash.style.opacity=".65";
setTimeout(()=>{flash.style.opacity="0";},120);
}

let lastGlitchSound=0;

function glitchEffect(){
const now=Date.now();

if(now-lastGlitchSound>900){
play(glitchSound,0.22);
lastGlitchSound=now;
}

vibrate(25);
document.body.classList.add("screenShake");
if(glitch)glitch.style.opacity="1";
flashEffect();
setTimeout(()=>{
document.body.classList.remove("screenShake");
if(glitch)glitch.style.opacity="0";
},260);
}

const bootLines=[
"جارٍ تشغيل النظام...",
"تحميل الذاكرة...",
"فحص البنية العصبية...",
"تحليل الهوية...",
"الاتصال بالنواة...",
"",
"اكتملت التهيئة."
];

async function bootAnimation(){
bootText.innerHTML="";
for(const line of bootLines){
bootText.innerHTML+="<div></div>";
const last=bootText.lastElementChild;
for(let i=0;i<line.length;i++){
last.innerHTML+=line[i];
await sleep(26);
}
await sleep(340);
}
}

bootAnimation();

async function typeQuestion(text){
question.innerHTML="";
yes.style.display="none";
no.style.display="none";

if(typingSound){
typingSound.currentTime=0;
typingSound.play().catch(()=>{});
}

for(let i=0;i<text.length;i++){
question.innerHTML+=text[i];
await sleep(22);
}

if(typingSound){
typingSound.pause();
typingSound.currentTime=0;
}

await sleep(250);
yes.style.display="inline-block";
no.style.display="inline-block";
}

async function showQuestion(){
counter.innerHTML=`السؤال ${current+1} / ${questions.length}`;
title.innerHTML=questions[current].title;
await typeQuestion(questions[current].text);
}

startBtn.onclick=async()=>{
if(busy)return;
play(clickSound);
vibrate(15);
busy=true;
glitchEffect();
await sleep(350);
boot.classList.add("hidden");
questionsScreen.classList.remove("hidden");
await showQuestion();
busy=false;
};

yes.onclick=()=>{
play(clickSound);
vibrate(10);
nextQuestion();
};

no.onclick=()=>{
play(clickSound);
vibrate(10);
nextQuestion();
};

async function nextQuestion(){
if(busy)return;
busy=true;
glitchEffect();
await sleep(260);
current++;

if(current<questions.length){
await showQuestion();
busy=false;
return;
}

await startPunishment();
}

async function startPunishment(){
questionsScreen.classList.add("hidden");
errorScreen.classList.remove("hidden");

play(errorSound);
vibrate(120);

errorScreen.querySelector(".terminal").innerHTML=`
<h1>خطأ حرج</h1>
<p>تم رصد قرار غير مصرح به.</p>
<p>هذا القرار محظور على البشر.</p>
<p>جاري تنفيذ بروتوكول العقوبة...</p>
`;

for(let i=0;i<8;i++){
glitchEffect();
await sleep(170);
}

await sleep(1800);

errorScreen.classList.add("hidden");
punishmentScreen.classList.remove("hidden");

punishmentScreen.querySelector(".terminal").innerHTML=`
<h1>بروتوكول العقوبة</h1>
<div class="progress">
<div class="bar">
<div id="fill"></div>
</div>
</div>
<div class="status">
<p>جاري حذف الهوية...</p>
<p>جاري حذف الذكريات...</p>
<p>جاري حذف المشاعر...</p>
<p>جاري حذف الوعي...</p>
<p>جاري إعادة بناء الجهاز العصبي...</p>
</div>
`;

const fill=document.getElementById("fill");

setTimeout(()=>{
fill.style.width="100%";
},80);

await sleep(6500);

punishmentScreen.classList.add("hidden");
giftScreen.classList.remove("hidden");

busy=false;
showFinalScene();
}

function showFinalScene(){
if(music){
music.volume=.22;
music.play().catch(()=>{});
}

giftScreen.querySelector(".terminal").innerHTML=`
<h1>اكتملت عملية الاندماج</h1>
<p id="finalStatus"></p>

<div id="robotScene">
<div class="digitalStage">

<div class="robot robotLeft">
<div class="head"></div>
<div class="body"></div>
<div class="arm armL"></div>
<div class="arm armR"></div>
<div class="leg legL"></div>
<div class="leg legR"></div>
</div>

<div class="skeleton">
<div class="skull"></div>
<div class="spine"></div>
<div class="bone armL"></div>
<div class="bone armR"></div>
<div class="bone legL"></div>
<div class="bone legR"></div>
</div>

<div class="robot robotRight">
<div class="head"></div>
<div class="body"></div>
<div class="arm armL"></div>
<div class="arm armR"></div>
<div class="leg legL"></div>
<div class="leg legR"></div>
</div>

</div>
</div>

<button id="giftBtn">فتح الهدية</button>
`;

const lines=[
"تم حذف جميع الذكريات البشرية...",
"تم استبدال الجهاز العصبي...",
"تم تثبيت النواة الصناعية...",
"اكتملت عملية التحول."
];

let i=0;
const final=document.getElementById("finalStatus");

const timer=setInterval(()=>{
final.innerHTML=lines[i];
glitchEffect();
i++;
if(i>=lines.length){
clearInterval(timer);
}
},1700);

document.getElementById("giftBtn").onclick=()=>{
play(clickSound);
vibrate(20);

document.body.innerHTML=`
<div class="giftMessage">
<div>
<h1>🎁 تم فتح الهدية</h1>
<p>
ليست هذه مجرد هدية...
<br><br>
إنها بداية رحلتك داخل العالم الذي اخترته بنفسك.
<br><br>
مرحبًا بك... في التطور القادم.
</p>
</div>
</div>
`;
};
}
