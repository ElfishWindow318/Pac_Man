document.addEventListener("DOMContentLoaded", ()=>{

    const scoreDisplay = document.getElementById("score");
    const width = 28;
    var score = 0;
    const grid = document.querySelector(".grid");
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    //0-PacDots, 1-Paredes, 2-CuevaDeFantasmas, 3-PowerPellet(Comer Fantasmas), 4-Vacio
    const squares = [];

    function createBoard(){
        for(var i=0; i<layout.length; i++){
            //crear tablero
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);

            if(layout[i]==0){
                squares[i].classList.add("pacDot");
            }
            if(layout[i]==1){
                squares[i].classList.add("wall");
            }
            if(layout[i]==2){
                squares[i].classList.add("ghostCave");
            }
            if(layout[i]==3){
                squares[i].classList.add("powerPellet");
            }
        }
    }
    createBoard();

    //crear personajes
    var pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add("pacman");
    //mover pacman
    function move(e){
        squares[pacmanCurrentIndex].classList.remove("pacman");
        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !==0 && 
                    !squares[pacmanCurrentIndex-1].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex-1].classList.contains("ghostCave")){
                        pacmanCurrentIndex -= 1;
                }
                if(squares[pacmanCurrentIndex-1]== squares[363]){
                    pacmanCurrentIndex = 391;
                }
                break;
            case 38:
                 if(pacmanCurrentIndex - width >=0 && 
                    !squares[pacmanCurrentIndex-width].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex-width].classList.contains("ghostCave")){
                        pacmanCurrentIndex -= width;
                }
                break;
            case 39:
                if(pacmanCurrentIndex % width < width-1 && 
                    !squares[pacmanCurrentIndex+1].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex+1].classList.contains("ghostCave")){
                        pacmanCurrentIndex += 1;
                }
                if(squares[pacmanCurrentIndex+1]== squares[392]){
                    pacmanCurrentIndex = 364;
                }
                break;
            case 40:
                 if(pacmanCurrentIndex + width < width*width && 
                    !squares[pacmanCurrentIndex+width].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex+width].classList.contains("ghostCave")){
                        pacmanCurrentIndex += width;
                }
                break;
        }
        squares[pacmanCurrentIndex].classList.add("pacman");
        pacDotEaten();
        powerPelletEaten();
        win();
        gameOver();
    }

    document.addEventListener("keyup", move);
    //comer dots
    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains("pacDot")){
            squares[pacmanCurrentIndex].classList.remove("pacDot");
            score += 1;
            scoreDisplay.innerHTML = score;
        }
    }
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains("powerPellet")){
            squares[pacmanCurrentIndex].classList.remove("powerPellet");
            score += 10;
            scoreDisplay.innerHTML = score;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unscaredGhost, 10000);
            squares[pacmanCurrentIndex].classList.remove("powerPellet")
        } 
    }

    function unscaredGhost(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    class Ghost {
        constructor(className, startIndex, speed){
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }
    ghosts = [
        new Ghost("ghost1", 348, 250),
        new Ghost("ghost2", 376, 400),
        new Ghost("ghost3", 351, 300),
        new Ghost("ghost4", 379, 500),
    ]
    ghosts.forEach(ghost=>{
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    })
    ghosts.forEach(ghost=>moveGhost(ghost))

    function moveGhost(ghost){
        const directions = [-1,+1, width, -width];
        var direction = directions[Math.floor(Math.random()*directions.length)];

        ghost.timerId = setInterval(function(){
            if(!squares[ghost.currentIndex+direction].classList.contains("ghost") && 
            !squares[ghost.currentIndex+direction].classList.contains("wall")){
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove("ghost", "scared");
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            }
            else(direction = directions[Math.floor(Math.random()*directions.length)]);

            if(ghost.isScared){
                squares[ghost.currentIndex].classList.add("scared");
            }

            if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")){
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared");
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            }

            gameOver();
        }, ghost.speed);
    }
    function gameOver(){
        if(squares[pacmanCurrentIndex].classList.contains("ghost") && 
        !squares[pacmanCurrentIndex].classList.contains("scared")){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener("keyup", move);
            setTimeout(function(){
                alert("Game Over");
            }, 1000);
        }
    }

    function win(){
        if(score > 274){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener("keyup", move);
            setTimeout(function(){
                alert("You Win");
            }, 1000);
        }
    }
})