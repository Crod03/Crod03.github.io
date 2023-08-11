document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const playerPaddle = document.querySelector('.player');
    const oppositionPaddle = document.querySelector('.opposition'); // Corrected variable name
    const soccer = document.querySelector('.soccer');

    let soccerSpeedX = 5;
    let soccerSpeedY = 5;
    let playerScore = 0;
    let oppositionScore = 0;

    function update() {
        // Move the ball
        const soccerRect = soccer.getBoundingClientRect();
        const soccerX = soccerRect.left + soccerSpeedX;
        const soccerY = soccerRect.top + soccerSpeedY;

        // Check if it hits the walls
        if (soccerY < 0 || soccerY > gameContainer.clientHeight - soccerRect.height) {
            soccerSpeedY = -soccerSpeedY;
        }

        // Check if it hits paddles
        const playerRect = playerPaddle.getBoundingClientRect();
        const oppositionRect = oppositionPaddle.getBoundingClientRect(); // Corrected variable name

        if (soccerX < playerRect.right && soccerY + soccerRect.height > playerRect.top && soccerY < playerRect.bottom) {
            soccerSpeedX = -soccerSpeedX;
        } else if (soccerX + soccerRect.width > oppositionRect.left && soccerY + soccerRect.height > oppositionRect.top && soccerY < oppositionRect.bottom) {
            soccerSpeedX = -soccerSpeedX;
        }

        // Check scores
        if (soccerX < 0) {
            oppositionScore++;
            resetSoccer();
        } else if (soccerX + soccerRect.width > gameContainer.clientWidth) {
            playerScore++;
            resetSoccer();
        }

        // Move paddles
        document.addEventListener('keydown', (event) => {
            if (event.key === 'w' && playerPaddle.offsetTop > 0) {
                playerPaddle.style.top = `${playerPaddle.offsetTop - 10}px`;
            } else if (event.key === 's' && playerPaddle.offsetTop + playerPaddle.offsetHeight < gameContainer.clientHeight) {
                playerPaddle.style.top = `${playerPaddle.offsetTop + 10}px`;
            }
        });

        // AI 
        const oppositionSpeed = 5;
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

        // Move ball
        soccer.style.left = `${soccerX}px`;
        soccer.style.top = `${soccerY}px`;

        // Continue the game loop
        requestAnimationFrame(update);
    }

    function resetSoccer() {
        soccerSpeedX = -soccerSpeedX;
        soccer.style.left = `${gameContainer.clientWidth / 2 - soccer.clientWidth / 2}px`;
        soccer.style.top = `${gameContainer.clientHeight / 2 - soccer.clientHeight / 2}px`;
    }

    // game loop
    update();
});


