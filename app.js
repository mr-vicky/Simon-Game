let h2 = document.querySelector('h2');
let body = document.querySelector('body');
let redBtn = document.querySelector('.red');
let greenBtn = document.querySelector('.green');
let blueBtn = document.querySelector('.blue');
let yellowBtn = document.querySelector('.yellow');

let flag = false;
let level = 0;
let count = 0;
let gameSeq = [];
let playerSeq = [];

// Take input color from the user ----------------------------
function getSequence(color){
    if(flag === false){
        gameSeq.push(color);
        flag = true;
    }
    playerSeq.push(color);
        if(sequenceChecker() === true){
            if(count === gameSeq.length){
                setTimeout(function(){}, 2000);
                generateRandomColor();
                displayGameSequence();
                updateLevel(); 
                
                count = 0;
                while(playerSeq.length > 0){
                    playerSeq.pop();
                }
            }
        }
        else{
           gameOver();
        }
}

// add random color to gameSeq[] ---------------------------
function addRandomColor(color){
    gameSeq.push(color);
}

// Generate Random Color --------------------------------
function generateRandomColor(){
    let num = Math.floor(Math.random()*4) + 1;
    
    if(num === 1){
        addRandomColor('red');
    }else if(num === 2){
        addRandomColor('green');
    }else if(num === 3){
        addRandomColor('yellow');
    }else if(num === 4){
        addRandomColor('blue');
    }
}

// Display Game sequence --------------------------------
function displayGameSequence(){
    let time = 1000;
    for(let seq of gameSeq){
        setTimeout(function(){
            if(seq === 'red'){
                blinkColor('red');
            }
            else if(seq === 'yellow'){
                blinkColor('yellow');
            }
            else if(seq === 'green'){
                blinkColor('green');
            }
            else if(seq === 'blue'){
                blinkColor('blue');
            }
        }, time);
        time += 1000;
    }
}

// Sequence Checker --------------------------------
function sequenceChecker(){
    for(let i = 0; i < playerSeq.length; i++){
        console.log("i: ", i, " ", playerSeq[i], " === ", gameSeq[i]);
        if(playerSeq[i] !== gameSeq[i]){
            return false;
        }
    }
    return true;
}

// GAME OVER --------------------------------
function gameOver(){
    h2.textContent = `GAME OVER! You reached up to level ${level}`;
    body.style.backgroundColor = 'rgba(160, 1, 1, 0.84)';
    setTimeout(function(){
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.864)';
    }, 1000);

    disableButtons();

    // Check if restart button already exists
    if (!document.querySelector(".resetBtn")) {
        let restartBtn = document.createElement('button');
        restartBtn.classList.add('resetBtn');
        restartBtn.innerHTML = `<i class="fa-solid fa-arrow-rotate-left"></i> Play again`;
        body.appendChild(restartBtn);
        
        restartBtn.addEventListener("click", restartGame);
    }
}

// Restart Game  --------------------------------
function restartGame(){
    flag = false;
    count = 0;
    level = 0;

    while(playerSeq.length > 0){
        playerSeq.pop();
    }
    while(gameSeq.length > 0){
        gameSeq.pop();
    }
    h2.textContent = "Level 0";
    enableButtons();

    // Remove the restart button if it exists
    let restartBtn = document.querySelector(".resetBtn");
    if (restartBtn) {
        restartBtn.remove();
    }
}

// Update Level --------------------------------
function updateLevel(){
    level++;
    console.log("level: ", level);
    h2.innerText = `Level ${level}`;
}

// disable all buttons  --------------------------------
function disableButtons(){
    redBtn.disabled = true;
    greenBtn.disabled = true;
    blueBtn.disabled = true;
    yellowBtn.disabled = true;
}

// Enable all buttons --------------------------------
function enableButtons(){
    redBtn.disabled = false;
    greenBtn.disabled = false;
    blueBtn.disabled = false;
    yellowBtn.disabled = false;
}

// BLINK LIGHT --------------------------------
function blinkColor(color){
    if(color === 'red'){
        redBtn.style.backgroundColor = 'white';
        setTimeout(function(){
            redBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.578)';
        }, 220);
    }
    else if(color === 'blue'){
        blueBtn.style.backgroundColor = 'white';
        setTimeout(function(){
            blueBtn.style.backgroundColor = 'rgba(0, 0, 255, 0.412)';
        }, 220);
    }
    else if(color === 'yellow'){
        yellowBtn.style.backgroundColor = 'white';
        setTimeout(function(){
            yellowBtn.style.backgroundColor = 'rgba(238, 158, 8, 0.57)';
        }, 220);
    }else{
        greenBtn.style.backgroundColor = 'white';
        setTimeout(function(){
            greenBtn.style.backgroundColor = 'rgba(2, 239, 2, 0.36)';
        }, 220);
    }
}

// Button Events --------------------------------
redBtn.addEventListener('click', function(){
    count++;
    blinkColor('red');
    getSequence('red');

});

blueBtn.addEventListener('click', function(){
    count++;
    blinkColor('blue');
    getSequence('blue');

});

greenBtn.addEventListener('click', function(){
    count++;
    blinkColor('green');
    getSequence('green');

});

yellowBtn.addEventListener('click', function(){
    count++;
    blinkColor('yellow');
    getSequence('yellow');
});