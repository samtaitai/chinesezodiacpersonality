// querySelector html 문서에서 css 선택자에 대응하는 것을 찾아준다
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
//const select = [];
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
/*
    let pointArray = [
        {name: 'mouse', key: 0, value: 0},
        {name: 'cow', key: 1, value: 0},
        {name: 'tiger', key: 2, value: 0},
        {name: 'rabbit', key: 3, value: 0},
        {name: 'dragon', key: 4, value: 0},
        {name: 'snake', key: 5, value: 0},
        {name: 'horse', key: 6, value: 0},
        {name: 'sheep', key: 7, value: 0},
        {name: 'monkey', key: 8, value: 0},
        {name: 'chick', key: 9, value: 0},
        {name: 'dog', key: 10, value: 0},
        {name: 'pig', key: 11, value: 0}
    ]
    for(let i = 0; i < endPoint; ++i){
        let target = qnaList[i].a[select[i]];
        //iterate inside type
        for(let j = 0; j < target.type.length; ++j){
            //iterate inside pointArray
            for(let k = 0; k < pointArray.length; ++k){
                //if animal in 'type' === animal in 'pointArray', the animal's value increase 1
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }
    }
    //function (a, b) part is sort rule
    let resultArray = pointArray.sort(function (a, b){
        //if comparison result > 0, 'a' comes before 'b'
        if(a.value > b.value){
            return -1;
        }
        //if comparison result > 0, 'b' comes before 'a'
        if(a.value < b.value){
            return 1;
        }
        return 0;
    }); */
    let result = select.indexOf(Math.max(...select));
    return result;
    //console.log(resultArray);
    //let resultword = resultArray[0].key;
    //return resultword;
}

function setResult(){
    //point = maximum number
    let point = calResult();
    //replace by innerHTML
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    let resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    let imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.webkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=> {
        qna.style.display = "none";
        result.style.display = "block";
});
console.log(select);
setResult();
calResult();
}

//parameter 'answerText' is qnaList[qIdx].a[i].answer
function addAnswer(answerText, qIdx, idx) {
    let a = document.querySelector('.answerBox')
    let answer = document.createElement('button')
    //give each 'answer's a class name 'answerList'; add .answerList to css? which css?
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeOut');
    //set (answer=)button inside tag whose class is answerBox
    a.appendChild(answer);
    //answerText is button text = qnaList[qIdx].a[i].answer
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        //queryselect all 'answer's
        let children = document.querySelectorAll('.answerList')
        for(let i = 0; i < children.length; i++){
            //buttons being unavailable and disappear
            children[i].disabled = true;
            children[i].style.webkitAnimation = "fadeOut 0.5s";
            children[i].animation = "fadeOut 0.5s";
            //disabled->animation->after 950ms, disappear
        }
        setTimeout(()=>{
            //qIdx = question number, idx = chosen answer number
            let target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){
                //the chosen element(based on index number) in select array increase 1
                select[target[i]] += 1;
            }
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
        }
        //after animation effeect, call the next set of buttons
        goNext(++qIdx);
    }, 450)

    }, false);
}
function goNext(qIdx) {
//++qIdx 했더니 짝수 문항만 동작함. qIdx+1로 변경
//qIdx+1 했더니 11번에서 12번 문항 대신 결과 섹션으로 바로 감. qIdx로 변경.
//그 결과 select 어레이는 11개 값밖에 없는데 pointArray는 12개 동물을 갖고 있어서 오류 발생함.
    if(qIdx === endPoint){
        goResult()
        //if조건이 맞으면 함수는 여기서 break
        return;
    }
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    //create 3 buttons because key'a' has three objects
    for(let i in qnaList[qIdx].a) {
        //addAnswer parameter 'idx' = i
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    let status = document.querySelector('.statusBar');
    //width change = progress bar effect
    //qIdx = button set number, start from 0, qIdx+1 range is from 1 to 12
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}
function begin() {
    //start fadeOut animation(disappear for 1s)
    //object.style.animation = "name duration timingFunction delay iterationCount direction fillMode playState"
    main.style.webkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    //arrow function expression
    //after 450millisec, fadeIn(appear for 1s) animation runs
    //not setTimeOut
    setTimeout(()=> {
        //qna.style.webkitAnimation = "fadeIn 1s";
        //qna.style.animation = "fadeIn 1s";
        //after 450millisec, display changes
        //setTimeout(()=> {
            main.style.display = "none";
            qna.style.display = "block";
        //}, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}
