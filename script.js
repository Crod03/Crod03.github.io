document.addEventListener ('DOMContentLoaded'), () => {
    const gameContainer = documennt.querySelector('.game-container');
    const playerPaddle = document.querySelector('.player');
    const opposition = document.querySelector('opposition');
    const soccer = document.querySelector('.soccer');

    let soccerSpeedX = 5;
    let soccerSpeedY = 5;
    let playerScore = 0;
    let oppositionScore = 0;

    function update() {
        //move the ball
        const soccerRect = soccer.getBoundingClientRect();
        const soccerX = ballRect.left + ballSpeedX;
        const ballY =ballRect.top = ballSpeedY;

        // Check if it hits with walls
        if (ballY <0 || ballY > gameContainer.clientHeight - ballRect.height) {ballSpeedY = -ballSpeedY;
        }
    }

    //Hit Goalies?
    const playerRect = playerPaddle.getBoundingClientRect();
    const oppositionRect = oppositionPaddle.getBoundingClientRect();

    if (ballX < playerRect.right && ballY + ballRect.height > playerRect.top && ballY < oppositionRect.bottom) {
        ballSpeedX = -ballSpeedX;

    } else if (ballSpeedX + ballRect.width > oppositionRect.left && ballY + ballRect.height > oppositionRect.top && ballY < oppositionRect.bottom) {
        ballSpeedX = -ballSpeedX;
    }

    //Check Scores
    if (ballX < 0) {
        oppositionScore++;
        resetBall();
    } else if (ballX + ballRect.width > gameContainer.clientWidth) {
        playerScore++;
        resetBall();
    } 
}

