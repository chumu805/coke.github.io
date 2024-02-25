const answerLength=5;
const maxGuessTime=6;
let random=Math.floor(Math.random()*(words.length-1));
let answer=words[random];
console.log(answer);
let currentGuessTime=1;
let index=0;
let tiles=[];
let got=false;
function Letter(event){
    if(got||currentGuessTime>maxGuessTime||index==answerLength)return;
    const letter=event.target.innerText;
    console.log(letter);
    tiles[currentGuessTime-1]=tiles[currentGuessTime-1]||[];
    tiles[currentGuessTime-1][index]=letter;
    document.getElementById(currentGuessTime.toString()+index.toString()).innerText=letter;
    index+=1;
}
function Backspace(event){
    if(got||currentGuessTime>maxGuessTime||index==0)return;
    index-=1;
    document.getElementById(currentGuessTime.toString()+index.toString()).innerText="";
}; 
function Enter(event){
    if(got||currentGuessTime>maxGuessTime||index!=answerLength)return;
    const word=tiles[currentGuessTime-1].join("");
    console.log(word);
    if(words.indexOf(word.toLowerCase())==-1){
        alert("请输入正确的单词！");
        return;
    }
    if(answer==word.toLowerCase()){
        got=true;
        alert("猜对了！(*^▽^*)！");
    }
    let green=answer;
    tiles[currentGuessTime-1].forEach((letter,i)=>{
        if(answer[i]==letter.toLowerCase()){
            document.getElementById(currentGuessTime.toString()+i.toString()).style.backgroundColor="#6aaa64";
            document.getElementById(currentGuessTime.toString()+i.toString()).style.color="#fff";
            green=green.substring(0,i)+" "+green.substring(i+1);
        }
    });
    let yellow=green;
    tiles[currentGuessTime-1].forEach((letter,i)=>{
        if (green[i]!=" "){
            const j=yellow.indexOf(letter.toLowerCase());
            if(j==-1){
                document.getElementById(currentGuessTime.toString()+i.toString()).style.backgroundColor="#787c7e";
                document.getElementById(currentGuessTime.toString()+i.toString()).style.color="#fff";
                document.getElementById(letter).style.backgroundColor="#787c7e";
                document.getElementById(letter).style.color="#fff";
            }
            else{
                document.getElementById(currentGuessTime.toString()+i.toString()).style.backgroundColor="#c9b458";
                document.getElementById(currentGuessTime.toString()+i.toString()).style.color="#fff";
                yellow=yellow.substring(0,j)+" "+yellow.substring(j+1);
            }
        }
    });
    if(currentGuessTime==maxGuessTime){
        alert("猜错了，answerLength是"+answer+"");
        return;
    }
    currentGuessTime+=1;
    index=0;
    }
function Answer(event){
    alert("answerLength是 "+answer+"")
}
document.onkeydown=function(event){
    if(event.keyCode>=65&&event.keyCode<=90){
        const letter=event.key.toUpperCase();
        window.Letter({
            target:{
                innerText:letter
            }
        });
    }else if(event.keyCode==13){
        window.Enter();
    }else if(event.keyCode==8){
        window.Backspace();
    }
}
