const MIN_VALUE = 0;
const MAX_VALUE = 10;
const DEFAULT_MONEY = 1000;
const WIN_CONDITION = 1000000;
const numberText1 = document.getElementById('text1');
const numberText2 = document.getElementById('text2');
const numberText3 = document.getElementById('text3');
const numberText4 = document.getElementById('text4');
const numberText5 = document.getElementById('text5');
const answerNumberText1 = document.getElementById('answertext1');
const answerNumberText2 = document.getElementById('answertext2');
const answerNumberText3 = document.getElementById('answertext3');
const answerNumberText4 = document.getElementById('answertext4');
const answerNumberText5 = document.getElementById('answertext5');
const numberTextContainer = [numberText1, numberText2, numberText3, numberText4, numberText5];
const answerNumberContainer = [answerNumberText1, answerNumberText2, answerNumberText3, answerNumberText4, answerNumberText5];
const betValue = document.getElementById('inputNumber');
const balanceDisplay = document.getElementById('displayBalanceNum');
const errorDisplay = document.getElementById('errorText');
const changeAmount = document.getElementById('changesAmount');
const submitButton = document.getElementById('submitBtn');

for(texts in numberTextContainer){
    numberTextContainer[texts].addEventListener('click', changeNumbers);
}

function changeNumbers(){
    const indexText = event.currentTarget;
    let numbers = Number(indexText.textContent);
    numbers++;
    if(numbers > MAX_VALUE){
        numbers = MIN_VALUE;
    }

    indexText.classList.add('changeNumAnimation');
    indexText.removeEventListener('click', changeNumbers);
    setTimeout(function(){
        indexText.textContent = String(numbers);
    }, 150);

    setTimeout(function(){
        indexText.classList.remove('changeNumAnimation')
        indexText.addEventListener('click', changeNumbers);
    }, 900);
}

function randomizeFunc(){
    for(index in numberTextContainer){
        if(!numberTextContainer[index].classList.contains('changeNumAnimation')){
            const indexText = numberTextContainer[index];
            let value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
            let timeValue = Math.floor(Math.random() * 200) + 1;
            while(value > MAX_VALUE || value < MIN_VALUE){
                value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
            }
            indexText.removeEventListener('click', changeNumbers);
            setTimeout(function(){
                indexText.classList.add('changeNumAnimation');
            }, timeValue);
            setTimeout(function(){
                indexText.textContent = String(value);
            }, timeValue + 150);
        
            setTimeout(function(){
                indexText.classList.remove('changeNumAnimation');
                indexText.addEventListener('click', changeNumbers);
            }, timeValue + 950);
        }
    }
}

function submitFunc(){
    let theBet = betValue.value;
    let theMaxBet = (balanceDisplay.textContent);
    let numberBetted = Number(theBet);
    let repeat = 0;
    for(repeat; repeat <= 5; repeat++){
        theMaxBet = theMaxBet.replace(',', '', -1);
        theMaxBet = theMaxBet.replace('.', '', -1);
    }
    let symbolIndex = theMaxBet.indexOf('$');
    theMaxBet = Number(theMaxBet.slice(0, symbolIndex));
    try{
        theBet = Number(theBet);
    }
    catch(error){
        errorDisplay.textContent = '*Need Correct Input';
    }
    if(theBet === 0){
        errorDisplay.textContent = '*Need Correct Input';
    }
    else{
        errorDisplay.textContent = '';
    }

    if(theBet > 0 && theBet <= theMaxBet){
        let repeat = 0;

        function decrease(){
            let execute = true;
            if(numberBetted - repeat > 10000000){
                theBet -= 1000000;
                repeat += 1000000;
                execute = false;
            }
            else if(numberBetted - repeat > 1000000){
                theBet -= 100000;
                repeat += 100000;
                execute = false;
            }
            else if(numberBetted - repeat > 100000){
                theBet -= 10000;
                repeat += 10000;
                execute = false;
            }
            else if(numberBetted - repeat > 10000){
                theBet -= 1000;
                repeat += 1000;
                execute = false;
            }
            else if(numberBetted - repeat > 1000){
                theBet -= 100;
                repeat += 100;
                execute = false;
            }
            else if(numberBetted - repeat > 100){
                theBet -= 50;
                repeat += 50;
                execute = false;
            }
            else if(numberBetted - repeat > 10){
                theBet -= 5;
                repeat += 5;
                execute = false;
            }
            else{
                execute = true;
            }
            if(execute){
                theBet--;
                repeat++;
            }
            let theDisplay = theMaxBet - repeat;
            balanceDisplay.textContent = String(theDisplay.toLocaleString()) + "$";
            changeAmount.textContent = `-${repeat.toLocaleString()}$`;
            changeAmount.style.color = 'red';

            if(repeat < numberBetted){
                setTimeout(decrease, 20);
            }
        }
        setTimeout(decrease, 50);

        rollTheBall(theBet);
        disableAll();
    }
    else{
        errorDisplay.textContent = '*Your Bet Is Too Much';
    }
    setMaxValue();
}

function rollTheBall(betValues){
    let theCorrectBall = 0;
    let indexBall = 0;

    function resetBall(){
        for(index in answerNumberContainer){
            if(!answerNumberContainer[index].classList.contains('changeNumAnimation')){
                const indexText = answerNumberContainer[index];
                setTimeout(function(){
                    indexText.classList.add('changeNumAnimation');
                }, 10);
                setTimeout(function(){
                    indexText.textContent = '';
                }, 150);
            
                setTimeout(function(){
                    indexText.classList.remove('changeNumAnimation');
                }, 950);
            }
        }
        setTimeout(rollOneBall, 1200);
    }
    resetBall();
    
    function rollOneBall(){
        let answerBall = answerNumberContainer[indexBall];
        let choiceBall = numberTextContainer[indexBall];
        indexBall++;
        let repeatAnimation = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        let repeat = 1;
    
        let value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
        while(value > MAX_VALUE || value < MIN_VALUE){
            value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
        }
        function rollOneTime(){
            value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
            answerBall.classList.add('changeNumAnimation');
            setTimeout(function(){
                answerBall.textContent = String(value);
            }, 180);
            setTimeout(function(){
                answerBall.classList.remove('changeNumAnimation');
            }, 850);
            if(repeat <= repeatAnimation){
                repeat++;
                setTimeout(rollOneTime, 1000);
            }
            else{
                repeat = 1;
                isCorrect();
            }
        }
        if(repeat <= repeatAnimation){
            rollOneTime();
        }

        function isCorrect(){
            if(value == Number(choiceBall.textContent)){
                theCorrectBall++;
            }

            if(indexBall < answerNumberContainer.length){
                setTimeout(rollOneBall, 1000);
            }
            else{
                setTimeout(calculateWins(theCorrectBall), 2500);
            }
        }
    }
}

function calculateWins(correct){
    let numbers = 0;
    let theBets = Number(betValue.value);
    let winsPoint;
    let balanceNow = balanceDisplay.textContent;
    for(repeat; repeat <= 5; repeat++){
        balanceNow = balanceNow.replace(',', '', -1);
        balanceNow = balanceNow.replace('.', '', -1);
    }
    balanceNow = Number(balanceNow.slice(0, balanceNow.indexOf('$')));
    function increase(){
        let updateBalance = Number(balanceNow) + numbers;
        balanceDisplay.textContent = String(updateBalance.toLocaleString()) + "$";
        changeAmount.textContent = `+${numbers.toLocaleString()}$`;
        changeAmount.style.color = 'green';

        if(numbers < winsPoint){
            let execute = true;
            if(winsPoint - numbers > 10000000){
                numbers += 1000000;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 1000000;
                    execute = true;
                }
            }
            else if(winsPoint - numbers > 1000000){
                numbers += 100000;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 100000;
                    execute = true;
                }
            }
            else if(winsPoint - numbers > 100000){
                numbers += 10000;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 10000;
                    execute = true;
                }
            }
            else if(winsPoint - numbers > 10000){
                numbers += 1000;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 1000;
                    execute = true;
                }
            }
            else if(winsPoint - numbers > 1000){
                numbers += 100;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 100;
                    execute = true;
                }
            }
            else if(winsPoint - numbers > 100){
                numbers += 50;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 50;
                    execute = true;
                }
            }
            else if(winsPoint - numbers > 10){
                numbers += 5;
                execute = false;
                if(numbers > winsPoint){
                    numbers -= 5;
                    execute = true;
                }
            }
            else{
                execute = true;
            }
            if(execute){
                numbers++;
            }
            setTimeout(increase, 50);
        }
        else{
            if(correct != 0){
                setTimeout(activateAll, 100);
            }
            else{
                if(balanceNow > 0){
                    setTimeout(activateAll, 100);
                }
            }
            checkCondition();
        }
    }
    if(correct == 0){
        setTimeout(event =>{
            winsPoint = 0;
            balanceDisplay.textContent = `${balanceNow.toLocaleString()}$`;
            changeAmount.textContent = `+0$`;
            changeAmount.style.color = 'green';
            checkCondition();
        }, 1500)
    }
    else{
        winsPoint = Math.floor((theBets * correct)/2);
        if(correct === 2){
            winsPoint *= 75;
        }
        else if(correct === 3){
            winsPoint *= 150;
        }
        else if(correct === 4){
            winsPoint *= 350;
        }
        else if(correct === 5){
            winsPoint *= 500;
        }
        else{
            winsPoint *= 5;
        }
        setTimeout(increase, 1500);
    }
}

function checkCondition(){
    let balance = balanceDisplay.textContent;
    let repeat = 0;
    for(repeat; repeat <= 5; repeat++){
        balance = balance.replace(',', '', -1);
        balance = balance.replace('.', '', -1);
    }

    balance = Number(balance.slice(0, balance.indexOf('$')));
    if(balance === 0){
        changeAmount.style.color = 'red';        
        changeAmount.textContent = 'BANKRUPT!';
        disableAll();
        document.getElementById('retryButton').disabled = false;
    }
    else if(balance >= WIN_CONDITION){
        changeAmount.style.color = 'green';
        changeAmount.textContent = 'YOU WINS!';
        disableAll();
        document.getElementById('retryButton').disabled = false;
    }
    else{
        activateAll();
    }
}

function setMaxValue(){
    let maxNumber = displayBalanceNum.textContent;
    let symbolIndex = maxNumber.indexOf('$');
    maxNumber = maxNumber.slice(0, symbolIndex);
    betValue.setAttribute('max', maxNumber);
}

function disableAll(){
    submitButton.disabled = true;
    for(index in numberTextContainer){
        numberTextContainer[index].removeEventListener('click', changeNumbers);
    }
    document.getElementById('randomizeBtn').disabled = true;
    document.getElementById('retryButton').disabled = true;
    betValue.disabled = true;
}

function activateAll(){
    submitButton.disabled = false;
    for(index in numberTextContainer){
        numberTextContainer[index].addEventListener('click', changeNumbers);
    }
    document.getElementById('randomizeBtn').disabled = false;
    document.getElementById('retryButton').disabled = false;
    betValue.disabled = false;
}

function reset(){
    let balance = balanceDisplay.textContent;
    for(repeat; repeat <= 5; repeat++){
        balance = balance.replace(',', '', -1);
        balance = balance.replace('.', '', -1);
    }
    balance = Number(balance.slice(0, balance.indexOf('$')));
    function resetBall(){
        for(index in answerNumberContainer){
            if(!answerNumberContainer[index].classList.contains('changeNumAnimation')){
                const indexText = answerNumberContainer[index];
                setTimeout(function(){
                    indexText.classList.add('changeNumAnimation');
                }, 10);
                setTimeout(function(){
                    indexText.textContent = '';
                }, 150);
            
                setTimeout(function(){
                    indexText.classList.remove('changeNumAnimation');
                }, 950);
            }
        }
    }
    resetBall();
    function resetToDefaultMoney(){
        if(DEFAULT_MONEY - balance > 0){
            if(DEFAULT_MONEY - balance > 25){
                balance += 25;
            }
            else{
                balance++;
            }
            setTimeout(resetToDefaultMoney, 30);
        }
        else if(DEFAULT_MONEY - balance == 0){
            activateAll();
        }
        else if(DEFAULT_MONEY - balance < 0){
            balance = DEFAULT_MONEY;
        }
        balanceDisplay.textContent = balance.toLocaleString() + '$';
    }
    document.getElementById('WinCondition').textContent = WIN_CONDITION.toLocaleString() + "$";
    changeAmount.textContent = '';
    resetToDefaultMoney();
    activateAll();
    setMaxValue();
}

setMaxValue();
randomizeFunc();
reset();
disableAll();
