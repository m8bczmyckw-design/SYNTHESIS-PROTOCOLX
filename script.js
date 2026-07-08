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

const fill=document.getElementById("fill");

startBtn.innerHTML="بدء التهيئة";
yes.innerHTML="نعم";
no.innerHTML="لا";
document.getElementById("giftBtn").innerHTML="فتح الهدية";

let current=0;
let busy=false;

const bootLines=[
"جارٍ تشغيل النظام...",
"تحميل الذاكرة...",
"تحليل الهوية...",
"فحص الوعي...",
"الاتصال بالنواة...",
"",
"اكتملت التهيئة."
];

function wait(ms){
return new Promise(r=>setTimeout(r,ms));
}

async function bootAnimation(){

bootText.innerHTML="";

for(const line of bootLines){

bootText.innerHTML+=line+"<br>";

await wait(520);

}

}

bootAnimation();

startBtn.onclick=async()=>{

if(busy)return;

busy=true;

boot.classList.add("hidden");

questionsScreen.classList.remove("hidden");

await showQuestion();

busy=false;

};

async function typeWriter(text){

question.innerHTML="";

for(let i=0;i<text.length;i++){

question.innerHTML+=text[i];

await wait(18);

}

}

async function showQuestion(){

counter.innerHTML=`السؤال ${current+1} / ${questions.length}`;

title.innerHTML=questions[current].title;

await typeWriter(questions[current].text);

}

yes.onclick=nextQuestion;
no.onclick=nextQuestion;

async function nextQuestion(){

if(busy) return;

busy=true;

current++;

if(current<questions.length){

await showQuestion();

busy=false;

return;

}

startError();

}

async function startError(){

questionsScreen.classList.add("hidden");

errorScreen.classList.remove("hidden");

errorScreen.querySelector(".terminal").innerHTML=`

<h1>خطأ حرج</h1>

<p>تم رصد قرار غير مصرح به.</p>

<p>لا يحق للبشر اتخاذ هذا القرار.</p>

<p>جاري تفعيل بروتوكول العقوبة...</p>

`;

await wait(3500);

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

<p>جاري تثبيت النواة الصناعية...</p>

</div>

`;

const bar=document.getElementById("fill");

setTimeout(()=>{

bar.style.width="100%";

},100);

await wait(6500);

punishmentScreen.classList.add("hidden");

giftScreen.classList.remove("hidden");

giftScreen.querySelector(".terminal").innerHTML=`

<h1>اكتملت عملية الاندماج</h1>

<p>

تم حذف جميع الآثار البشرية.

</p>

<div id="robotScene">

<div class="finalText">

TRANSMISSION OPEN

<br><br>

GIFT UNLOCKED

</div>

</div>

<button id="giftBtn">

فتح الهدية

</button>

`;

document.getElementById("giftBtn").onclick=()=>{

document.body.innerHTML=`

<div class="giftMessage">

<div>

<h1>

🎁 تم فتح الهدية بنجاح

</h1>

<p>

كل ما ستراه داخل هذه الهدية...

ليس مجرد أدوات أو مقتنيات.

إنها بداية رحلة نحو عالم

لا يعود منه أحد كما كان.

</p>

</div>

</div>

`;

};

}
