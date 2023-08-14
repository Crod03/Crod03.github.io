let soccerSpeedX = 5;
let soccerSpeedY = 5;
let playerScore = 0;
let oppositionScore = 0;

    let gameContainer = document.querySelector('.game-container');
    let playerPaddle = document.querySelector('.goalie-player');
    let oppositionPaddle = document.querySelector('.goalie-opposition');
    let soccer = document.querySelector('.soccer');


    // Start the game loop
function update() {
    let soccerRect = soccer.getBoundingClientRect();
    let soccerX = soccerRect.left + soccerSpeedX;
    let soccerY = soccerRect.top + soccerSpeedY;
    
    console.log(`soccerX: ${soccerX}, soccerY: ${soccerY}`); // Debug line
    
    // Ball hits top or bottom walls
    if (soccerY < 0 || soccerY > gameContainer.clientHeight - soccerRect.height) {
        soccerSpeedY = -soccerSpeedY;
    }
    console.log(playerPaddle);
    let playerRect = playerPaddle.getBoundingClientRect();
    let oppositionRect = oppositionPaddle.getBoundingClientRect();
    
    // Ball hits paddles
    if (soccerX < playerRect.right && soccerY + soccerRect.height > playerRect.top && soccerY < playerRect.bottom) {
        soccerSpeedX = -soccerSpeedX;
    } else if (soccerX + soccerRect.width > oppositionRect.left && soccerY + soccerRect.height > oppositionRect.top && soccerY < oppositionRect.bottom) {
        soccerSpeedX = -soccerSpeedX;
    }
    
    // Ball crosses left or right boundaries
    if (soccerX < 0) {
        oppositionPaddle++;
        resetSoccer();
    } else if (soccerX + soccerRect.width > gameContainer.clientWidth) {
        playerPaddle++;
        resetSoccer();
    }
    
    // Player's paddle movement
    document.addEventListener('keydown', (event) => {
        if (event.key === 'w' && playerPaddle.offsetTop > 0) {
            playerPaddle.style.top = `${playerPaddle.offsetTop - 10}px`;
        } else if (event.key === 's' && playerPaddle.offsetTop + playerPaddle.offsetHeight < gameContainer.clientHeight) {
            playerPaddle.style.top = `${playerPaddle.offsetTop + 10}px`;
        }
    });
    
    // AI opponent's movement
    let oppositionSpeed = 5;
    if (soccerSpeedX > 0 && soccerX > gameContainer.clientWidth / 2) {
        if (soccerY + soccerRect.height / 2 > oppositionRect.top + oppositionRect.height / 2) {
            oppositionPaddle.style.top = `${oppositionRect.top + oppositionSpeed}px`;
        } else {
            oppositionPaddle.style.top = `${oppositionRect.top - oppositionSpeed}px`;
        }
    }
    
    // Update scores
    document.querySelector('.player-score').textContent = playerScore;
    document.querySelector('.opposition-score').textContent = oppositionScore;
    
    // Move the ball
    soccer.style.left = `${soccerX}px`;
    soccer.style.top = `${soccerY}px`;
    
    console.log(`Ball position: left=${soccer.style.left}, top=${soccer.style.top}`); // Debug line
    
    // Continue the game loop
    requestAnimationFrame(update);
}

function resetSoccer() {
    soccerSpeedX = -soccerSpeedX;
    soccer.style.left = `${gameContainer.clientWidth / 2 - soccer.clientWidth / 2}px`;
    soccer.style.top = `${gameContainer.clientHeight / 2 - soccer.clientHeight / 2}px`;
}

update();
