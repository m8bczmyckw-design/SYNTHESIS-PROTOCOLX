const boot = document.getElementById("boot");
const questionsScreen = document.getElementById("questions");
const errorScreen = document.getElementById("error");
const punishmentScreen = document.getElementById("punishment");
const giftScreen = document.getElementById("gift");

const bootText = document.getElementById("bootText");
const startBtn = document.getElementById("start");
const counter = document.getElementById("counter");
const title = document.getElementById("title");
const question = document.getElementById("question");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const fill = document.getElementById("fill");
const flash = document.getElementById("flash");
const glitchLayer = document.getElementById("glitchLayer");

startBtn.innerHTML = "بدء التهيئة";
yes.innerHTML = "نعم";
no.innerHTML = "لا";
document.getElementById("giftBtn").innerHTML = "فتح الهدية";

let current = 0;
let locked = false;

const bootLines = [
"جارٍ تشغيل النظام...",
"تحميل الذاكرة...",
"فحص البنية العصبية...",
"تحليل الهوية...",
"الاتصال بالنواة...",
"فتح القناة السوداء...",
"",
"اكتملت التهيئة."
];

function sleep(ms){
return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(element, text, speed = 45){
element.innerHTML = "";
for(let i = 0; i < text.length; i++){
element.innerHTML += text[i];
await sleep(speed);
}
}

async function typeBoot(){
bootText.innerHTML = "";
for(const line of bootLines){
bootText.innerHTML += line + "<br>";
await sleep(520);
}
}

typeBoot();

function flashScreen(){
flash.style.opacity = "0.55";
setTimeout(()=>{ flash.style.opacity = "0"; },120);
}

function glitchPulse(){
glitchLayer.style.opacity = "1";
document.body.classList.add("screenShake");
flashScreen();
setTimeout(()=>{
glitchLayer.style.opacity = "0";
document.body.classList.remove("screenShake");
},420);
}

startBtn.onclick = async () => {
if(locked) return;
locked = true;
glitchPulse();
await sleep(450);
boot.classList.add("hidden");
questionsScreen.classList.remove("hidden");
locked = false;
showQuestion();
};

async function showQuestion(){
counter.innerHTML = `السؤال ${current + 1} / ${questions.length}`;
title.innerHTML = questions[current].title;
await typeText(question, questions[current].text, 38);
}

async function nextQuestion(){
if(locked) return;
locked = true;
glitchPulse();
await sleep(520);
current++;

if(current >= questions.length){
startError();
return;
}

await showQuestion();
locked = false;
}

yes.onclick = nextQuestion;
no.onclick = nextQuestion;

async function startError(){
questionsScreen.classList.add("hidden");
errorScreen.classList.remove("hidden");

errorScreen.querySelector("h1").innerHTML = "خطأ حرج";
errorScreen.querySelector(".terminal").innerHTML = `
<h1>خطأ حرج</h1>
<p>تم رصد قرار غير مصرح به</p>
<p>لا يحق للبشر اتخاذ هذا القرار.</p>
<p>جاري تفعيل بروتوكول العقوبة...</p>
`;
for(let i = 0; i < 8; i++){
glitchPulse();
await sleep(300);
}

await sleep(900);

errorScreen.classList.add("hidden");
punishmentScreen.classList.remove("hidden");

punishmentScreen.querySelector("h1").innerHTML = "بروتوكول العقوبة";

const status = punishmentScreen.querySelector(".status");
status.innerHTML = `
<p>جاري حذف الهوية...</p>
<p>جاري حذف الذكريات...</p>
<p>جاري حذف المشاعر...</p>
<p>جاري إزالة الوعي...</p>
<p>جاري تثبيت النواة الصناعية...</p>
`;

fill.style.width = "100%";

await sleep(7000);

glitchPulse();
await sleep(650);

punishmentScreen.classList.add("hidden");
giftScreen.classList.remove("hidden");

giftScreen.querySelector("h1").innerHTML = "اكتملت عملية الاندماج";
giftScreen.querySelector("p").innerHTML = `
لم تعد كما كنت.<br>
تم فتح الهدية بنجاح.<br>
مرحبًا بك في التطور القادم.
`;

document.getElementById("robotScene").innerHTML = `
<div class="finalText">
TRANSMISSION OPEN<br>
GIFT UNLOCKED
</div>
`;
}

document.getElementById("giftBtn").onclick = () => {
document.body.innerHTML += `
<div class="giftMessage">
<div>
<h1>تم فتح الهدية بنجاح</h1>
<p>ما بداخلها ليس مجرد هدية... بل أثر من مستقبل مظلم.</p>
</div>
</div>
`;
};
