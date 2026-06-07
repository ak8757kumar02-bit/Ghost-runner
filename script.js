const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const jumpBtn = document.getElementById("jumpBtn");

let jumping = false;

const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const game = document.querySelector(".game");

let lane = 1;
let score = 0;
let gameOver = false;

const positions = [25, 125, 225];

// Left-Right Movement
document.addEventListener("keydown", (e) => {

    if (gameOver) return;

    if (e.key === "ArrowLeft" && lane > 0) {
        lane--;
    }

    if (e.key === "ArrowRight" && lane < 2) {
        lane++;
    }

    player.style.left = positions[lane] + "px";
});

function createObstacle() {

    if (gameOver) return;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    let obstacleLane = Math.floor(Math.random() * 3);

    obstacle.style.left = positions[obstacleLane] + "px";
    obstacle.style.top = "-80px";

    let randomHeight = Math.floor(Math.random() * 100) + 80;
    obstacle.style.height = randomHeight + "px";

    game.appendChild(obstacle);

    let move = setInterval(() => {

        let top = parseInt(obstacle.style.top);
        obstacle.style.top = top + 5 + "px";


        if (
            !jumping &&
            obstacleLane === lane &&
            top > 450 &&
            top < 560
        ) {
            gameOver = true;
            clearInterval(move);
            alert("Game Over!\nScore: " + score);
            location.reload();
        }

        // remove obstacle + score
        if (top > 600) {
            clearInterval(move);
            obstacle.remove();

            score++;
            scoreText.innerHTML = "Score: " + score;
        }

    }, 20);

}

setInterval(createObstacle, 1500);

leftBtn.onclick = () => {
    if (lane > 0) {
        lane--;
        player.style.left = positions[lane] + "px";
    }
};

rightBtn.onclick = () => {
    if (lane < 2) {
        lane++;
        player.style.left = positions[lane] + "px";
    }
};

function jump(){

    if(jumping) return;

    jumping = true;

    player.style.transition = "bottom 0.3s ease";

    playerHeight = 150;
    player.style.bottom = playerHeight + "px";

    setTimeout(()=>{

        playerHeight = 80;
        player.style.bottom = "20px";

        setTimeout(()=>{
            jumping = false;
        },300);

    },300);

}

jumpBtn.onclick = jump;

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowUp"){
        jump();
    }
});
function createCoinLine(){

    if(gameOver) return;

    let coinLane = Math.floor(Math.random() * 3);

    for(let i = 0; i < 8; i++){

        const coin = document.createElement("div");

        coin.classList.add("coin");

        coin.style.left = positions[coinLane] + "px";

        coin.style.top = (-i * 80) + "px";

        game.appendChild(coin);

        let move = setInterval(() => {

            let top = parseInt(coin.style.top);

            coin.style.top = top + 5 + "px";

            if(
                top > 500 &&
                top < 560 &&
                coinLane === lane
            ){
                score += 5;
                scoreText.innerHTML = "Score: " + score;

                clearInterval(move);
                coin.remove();
            }

            if(top > 600){
                clearInterval(move);
                coin.remove();
            }

        },20);

    }

}

setInterval(createCoinLine,3500);

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {

    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let diffX = endX - startX;
    let diffY = endY - startY;

    // Swipe Right
    if (diffX > 50) {
        if (lane < 2) {
            lane++;
            player.style.left = positions[lane] + "px";
        }
    }

    // Swipe Left
    if (diffX < -50) {
        if (lane > 0) {
            lane--;
            player.style.left = positions[lane] + "px";
        }
    }

    // Swipe Up (Jump)
    if (diffY < -50) {
        jump();
    }

});
const GROUND = 600;
const PLAYER_BOTTOM = 80;

const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

startBtn.onclick = () => {

    startScreen.style.display = "none";

    setInterval(createCoinLine, 2000);

};