const isStrOnly = false;

let typedField;
let untypedField;

if(!isStrOnly){
    typedField = document.getElementById("typed");
    untypedField = document.getElementById("untyped");
}

const strField = document.getElementById("str");
const indexField = document.getElementById("index");
const timeField = document.getElementById("time");
const scoreField = document.getElementById("score");
const levelField = document.getElementById("level");


let allQ_len = 0

const init = () => {
    strs = fisherYatesShuffle(strs);
    console.log(strs);

    let num = 0;

    for(let i = 0; i < strs.length; i++){
        num += strs[i][1].length;
    }

    allQ_len = num*40;
};

const update = () =>{
    typedField.textContent = typed;
    untypedField.textContent = untyped;
};

let strs = 都道府県_strs;
init();

let typed = "";
let untyped = strs[0][1];

if(!isStrOnly){
    update();
}

timeField.textContent = "0秒";

let time = 0;

function timeUpdate() {
    time++;
    timeField.textContent = time + "秒";
}


let timerid = setInterval(timeUpdate,1000)


indexField.textContent = strs.length + "問目/" + "1問目";

strField.textContent = strs[0][0] + " > " + strs[1][0];

let str_index = 0;

let score = 0;

let batu = new Audio();
batu.src = "batu.mp3";

let maru = new Audio();
maru.src = "maru.mp3";


document.addEventListener("keydown",(e) => {
    if(str_index == strs.length)
    {
        return;
    }
    if(e.key !== untyped.substring(0,1)){
        if(e.key === "Shift") return;
        if(e.key === "Escape") return;

        score -= 10;
        scoreField.textContent = score + "点";

        batu.play();
        return;
    }
    score += 40;
    scoreField.textContent = score + "点";

    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);

    maru.pause();
    maru.currentTime = 0;

    maru.play();

    if(untyped.length === 0)
    {
        str_index++;

        if(str_index == strs.length){
            strField.textContent = "おわり！";
            indexField.textContent = "全部で問題は" + strs.length + "個";

            timeField.textContent =  timeField.textContent + "でクリア";

            score -= time * 80;

            if(score <= 0)
            {
                levelField.textContent = "レベル0でした もっと頑張って";
                levelField.innerHTML += "<br>あと" + (allQ_len/10 - score) + "でレベル1です";
            }
            else if(score <= allQ_len/10)
            {
                levelField.textContent = "レベル1でした もう少し頑張って";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*2 - score) + "でレベル2です";
            }
            else if(score <= allQ_len/10*2)
            {
                levelField.textContent = "レベル2でした ちょっとすごい";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*3 - score) + "でレベル3です";
            }
            else if(score <= allQ_len/10*3)
            {
                levelField.textContent = "レベル3でした すごい";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*4 - score) + "でレベル4です";
            }
            else if(score <= allQ_len/10*4)
            {
                levelField.textContent = "レベル4でした すごい";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*5 - score) + "でレベル5です";
            }
            else if(score <= allQ_len/10*5)
            {
                levelField.textContent = "レベル5でした 最強";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*6 - score) + "でレベル6です";
            }
            else if(score <= allQ_len/10*6)
            {
                levelField.textContent = "レベル6でした 最強";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*7 - score) + "でレベル7です";
            }
            else if(score <= allQ_len/10*7)
            {
                levelField.textContent = "レベル7でした 最強";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*8 - score) + "でレベル8です";
            }
            else if(score <= allQ_len/10*8)
            {
                levelField.textContent = "レベル8でした 最強";
                levelField.innerHTML += "<br>あと" + (allQ_len/10*9 - score) + "でレベル9です";
            }
            else
            {
                levelField.textContent = "レベル9でした 最強";
                levelField.innerHTML += "<br>このレベルは最高です";
            }

            typed = "";
            untyped = "";

            if(!isStrOnly){
                update();
            }

            clearInterval(timerid)
            return;
        }

        typed = "";
        untyped = strs[str_index][1];
    }

    if(!isStrOnly){
        update();
    }

    indexField.textContent = strs.length + "問目/" + (str_index + 1) + "問目";

    if(strs.length == str_index+1){
        strField.textContent = strs[str_index][0] + " > " + "終わり";
    }else{
        strField.textContent = strs[str_index][0] + " > " + strs    [str_index+1][0];
    }
});