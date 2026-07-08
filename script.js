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

startBtn.innerHTML="بدء التهيئة";
yes.innerHTML="نعم";
no.innerHTML="لا";
document.getElementById("giftBtn").innerHTML="فتح الهدية";

let current=0;

const bootLines=[
"جارٍ تشغيل النظام...",
"تحميل الذاكرة...",
"تحليل الهوية...",
"فحص الوعي...",
"الاتصال بالنواة...",
"",
"اكتملت التهيئة."
];

let line=0;

function typeBoot(){

if(line>=bootLines.length)return;

bootText.innerHTML+=bootLines[line]+"<br>";

line++;

setTimeout(typeBoot,550);

}

typeBoot();

startBtn.onclick=()=>{

boot.classList.add("hidden");

questionsScreen.classList.remove("hidden");

showQuestion();

};

function showQuestion(){

counter.innerHTML=`السؤال ${current+1} / ${questions.length}`;

title.innerHTML=questions[current].title;

question.innerHTML=questions[current].text;

}

function nextQuestion(){

current++;

if(current>=questions.length){

startError();

return;

}

showQuestion();

}

yes.onclick=nextQuestion;
no.onclick=nextQuestion;

function startError(){

questionsScreen.classList.add("hidden");

errorScreen.classList.remove("hidden");

errorScreen.querySelector("h1").innerHTML="خطأ حرج";

errorScreen.querySelectorAll("p")[0].innerHTML="تم رصد قرار غير مصرح به";

errorScreen.querySelectorAll("p")[1].innerHTML="لا يحق للبشر اتخاذ هذا القرار.";

errorScreen.querySelectorAll("p")[2].innerHTML="جاري تفعيل بروتوكول العقوبة...";

setTimeout(()=>{

errorScreen.classList.add("hidden");

punishmentScreen.classList.remove("hidden");

fill.style.width="100%";

},3500);

setTimeout(()=>{

punishmentScreen.classList.add("hidden");

giftScreen.classList.remove("hidden");

},10500);

}

document.getElementById("giftBtn").onclick=()=>{

alert(`

تم فتح الهدية بنجاح

مرحبًا بك في التطور القادم.

`);

};
