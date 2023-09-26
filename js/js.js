// game constant and variable
let inputDir ={x:0,y:0};
let speed = 10;
let score = 0;
let highScore=0;
let lastPaintTime =0;
let snakeArr=[
    {x:13,y:15}
];

food= {x:3, y: 10};

// game function
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    // console.log(ctime);
        lastPaintTime = ctime;
        gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 50 || snake[0].x <=0 || snake[0].y >= 50 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            console.log("up")
            inputDir.y=-1;
            break;

        case "ArrowDown":
            inputDir.x=0;
            console.log("down")
            inputDir.y=1;
            break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;

            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;

            break;

        default:
            break;
    }
});
function gameEngine(){
    //if snake collide
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        alert("game over. press enter to restart");
        snakeArr =[{x:13,y:6}];
        score=0;
    }

    //if snake has eaten food
    if(snakeArr[0].x=== food.x && snakeArr[0].y=== food.y){
        score+=1;
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b =48;
        food ={x:Math.round(a+(b-a)* Math.random()), y:Math.round(a+(b-a)* Math.random())}
    }
    //moving snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y; 
    // displaying snake plus food
    board.innerHTML ="";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        });

        // displaying the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
        
    }

