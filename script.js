let numPanel = document.getElementsByClassName('numKey');
let onoff = document.getElementsByClassName('button');
const calcScreen = document.getElementById('lowScreen');
const topScreen = document.getElementById('topScreen');
//_All elements that are defined
//________________________________
let operations=[];
let num = '';
let result = undefined;
let doDaMath = {
    '+': function (x, y) { return parseFloat(x) + parseFloat(y) },
    '-': function (x, y) { return parseFloat(x) - parseFloat(y) },
    '*': function (x, y) { return parseFloat(x) * parseFloat(y) },
    '\/': function (x, y) { return parseFloat(x) / parseFloat(y) },
}
//_All variables that are defined
//________________________________
calcScreen.textContent = '';
numPanel = [...numPanel];
onoff = [...onoff]
//_All variables/Elements that are modified
//________________________________
numPanel.forEach(element => {
    let simbols = /^[+\-*\/]/;
    if(element.textContent.match(simbols)){
        element.addEventListener('click',symbolshandler);

    } else if(element.textContent == '='){ 
        element.addEventListener('click', equalHandler)
    } else {
        element.addEventListener('click', numKeyHandler);
    }   
});

onoff.forEach(e =>{
    if(e.textContent=='Delete'){
        e.addEventListener('click',delCalc);
    } else if (e.textContent=='Clear'){
        e.addEventListener('click', clearCalc)
    }
});

document.addEventListener('keypress',function(elem){
    let simbols = /^[+\-*\/]/;
    let numbers = /[0-9]/;
    let dot = /\,/
    if(elem.key.match(simbols)){
        symbolshandler(elem);
    } else if(elem.key == '=' || elem.key==='Enter'){ 
        elem.preventDefault();
        equalHandler();
    } else if(elem.key.match(numbers) || elem.key.match(dot)){
        numKeyHandler(elem);
        console.log(elem.key);
    }  
})

//_All the events to target the elements
//________________________________
let calculatef = function(arr){
    //console.log(arr);
    for(let i =0;i<arr.length-1;i++){
        if(arr[i]=='*' || arr[i] =='/'){
            let operator = arr[i];
            let first = arr[i-1];
            let second = arr[i+1];
            result = doDaMath[operator](first,second);
            arr[i+1] = result;
            arr.splice(i-1,2)
            i=0;
            console.log(arr);

        }
    }
    for(let i =0;i<arr.length-1;i++){
        if(arr[i]=='+' || arr[i] =='-'){
            let operator = arr[i];
            let first = arr[i-1];
            let second = arr[i+1];
            result = doDaMath[operator](first,second);
            arr[i+1] = result;
            arr.splice(i-1,2)
            i=0;
            console.log(arr);
        }
    }
    if(arr[0].toString().indexOf(',')!=-1&&(arr[0].toString().length-arr[0].toString().indexOf(','))>3){    
        return arr[0].toFixed(3);
    } else {
        return arr[0];
    }
    
}
//_All the functions designed to work inside the code
//________________________________
function clearCalc(){
    num = '';
    operations = [];
    calcScreen.textContent = '';
    topScreen.textContent = '';
    result = undefined;
}

function delCalc(){
    num = '';
    calcScreen.textContent = '';
}

function symbolshandler(elem){
    if(this.textContent && num){
            commacheck(num);
            operations.push(this.textContent);
            num = '';
            calcScreen.textContent = '';
            topScreen.textContent = operations.join(' ');
    } else if(elem.key && num){
            commacheck(num);
            operations.push(elem.key);
            num = '';
            calcScreen.textContent = '';
            topScreen.textContent = operations.join(' ');
    } 
};

function equalHandler(){
    if(num){
        commacheck(num);
        num = '';
        calcScreen.textContent = '';
        topScreen.textContent = operations.join(' ');
        result = calculatef(operations);
        console.log(result)
        if(result == 'Infinity'){
            calcScreen.textContent = 'Error';
        } else {
            calcScreen.textContent = result;
        }
        
    };
}

function numKeyHandler(elem){
    let digit;
    if(elem.key){
        digit = elem.key;
    } else {
        digit = this.textContent;
    }
    if(result!=undefined){
        clearCalc();
    }
    if(num.length<13){
        if(digit ==','){
            if(!num.includes(',')){
                if(num.toString().length==0){
                    num = '0';
                }
                num += digit;
                calcScreen.textContent = num;
                dotNotation()                     
            }
        } else {
            if(num.includes(',') && (num.length-num.indexOf(','))<6){
                num += digit;
                calcScreen.textContent = num;
                dotNotation()
            } else if (!num.includes(',')){
                num += digit;
                calcScreen.textContent = num;
                dotNotation()
            }
            
        }
    }
};
function dotNotation(){
    console.log(calcScreen.textContent);
    if(calcScreen.textContent.includes(',')){
        var n = calcScreen.textContent.length - calcScreen.textContent.indexOf(',');
    } else {
        var n = calcScreen.textContent.length;
    }
    let digit = 0
    for(let i = n;i<0;i--){
        if(digit==3){
            digit = 0;
            digit++;
            let firstpart = calcScreen.textContent.splice(i);
            let secondpart = calcScreen.textContent
            calcScreen.textContent = firstpart + '.' + secondpart;
        }
    }

}

function commacheck(num){
    console.log(num);
    if(num.includes(',')){
        num = num.replace(/\,/gm,'.')
    }
    console.log(num)
    operations.push(num);
    console.log(operations);
}
//_All the functions created to target elements
//________________________________