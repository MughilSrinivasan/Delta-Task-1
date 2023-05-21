        const foodSound = new Audio('food.mp3');
        var board = document.getElementById("board");
        var snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
        var foodArray = [];
        var direction = {x : 0 , y : 0};
        var scoreData = document.getElementById("Score");
        var score = 0;
        var timeLeft = document.getElementById("Timer");
        var timer = 60;
        var flag = 0;
        var snakeImage1 = document.getElementById("lives-1");
        var snakeImage2 = document.getElementById("lives-2");
        var snakeImage3 = document.getElementById("lives-3");
        var lives = 3;
        var prevTime = 0;
        var speed = 7;
        var frames = 0;
        var foods = 0;
        var tasks = ["interrupt","audience","predator","articulate","productive","disability","addicted","ambiguity","beneficiary","sculpture","potential","character","construct","twilight","mastermind","constituency","concentration","biography","evaluate","secretary","attention","judgment","violation","explosion","operational","producer","chemistry","recession","location","excitement","cylinder","conclusion","economics","omission","handicap","complete","obstacle","supplementary","bloodshed","convince","privilege","judicial","mathematics","forecast","transfer","celebration","underline","movement","staircase","massachusetts"];
        var text;
        var check = "";
        var initialText;
        var w;
        var index;
        var obj;
        var f;
        var obs;
        var obt;
        var obe;
        var powerArray = [];
        var obstacleArray = [];
        var isPause = false;
        var foodElement;
        var snakeElement;
        var powerElement;
        var obstacleElement;
        var snakeElementHead;
        var size;
        var portalArray = [];
        var portalElement;
        var saveObj;
        var isSave = 0;
        var interval;
        var name;
        var table;
        var rankCount = 1;
        var sno;
        var rankElement;
        var rankArray = [];
        var dat;
        var rankSno;
        var rankName;
        var rankScore;
        var saveElement;
        var line;
        var butto;
        var normal;
        var data;
        var el;
        var storageArray =[];
        var candidate;
        var isFound;
        var elo;
        var parameter;
        var scoreValue;
        var res;

        window.onload = begin();

        function begin()
        {
            document.getElementById("model").style.display = "block";
            document.getElementById("modelHeading").innerHTML = "SEQUENCE SAFARI";
            document.getElementById("modelContent").innerHTML = "Welcome to Sequence Safari.\nYour task is to move the snake in order to sequentially collect the letters of the given word.\nThere are brown blocks which are obstacles.\nThere are 2 power-ups : \nPink boxes will shrink the snake size.\nGreen box will reduce your speed.\nYellow boxes are portals.\nYou have 3 lives and 60 seconds of time.\nGood Luck!";
            
            //alert("WELCOME TO SEQUENCE SAFARI.\nYour task is to move the snake in order to sequentially collect the letters of the given word.\nThere are brown blocks which are obstacles.\nThere are 2 power-ups : \nPink boxes will shrink the snake size.\nGreen box will reduce your speed.\nYellow boxes are portals.\nYou have 3 lives and 60 seconds of time.\nGood Luck!");
            text = tasks[Math.floor(Math.random()*49)];
            initialText = text;
            document.getElementById("text").innerHTML = "TASK : " + initialText;
            document.getElementById("textUser").innerHTML = "Word : " + check; 
            tot = 2*text.length + 10;
            game();
        }

        function func()
        {
            document.getElementById("modelName").style.display = "block";
            dat = document.getElementById("nameValue").value;
            if(dat != "")
            {
                name = dat;
                document.getElementById("modelName").style.display = "none";
            }
            else
            {
                document.getElementById("modelName").style.display = "none";
                game();
            }
        }

        function game()
        {
            document.getElementById("modelName").style.display = "block";
            if(dat != "")
            startGame();
        }

        function genFood(text,foodArray,snakeArray)
        {   
            var res = text.length;
            for(var k = 0; k < res ; k++)
            {
                obj = {x : Math.floor(20*Math.random())+1 , y : Math.floor(20*Math.random())+1 , data : text[k]};
                if((foodArray.indexOf(obj.x) === -1 && foodArray.indexOf(obj.y) === -1) && (snakeArray.indexOf(obj.x) === -1 && snakeArray.indexOf(obj.y) === -1))
                { 
                    foodArray.push(obj);
                }
            }
        }

        function genPow(powerArray,foodArray,snakeArray)
        {
            var cou = 2;
            while(cou--)
            {
                if(cou == 2)
                obt = {x : Math.floor(20*Math.random())+1, y : Math.floor(20*Math.random())+1, data : "shrink"};
                else
                obt = {x : Math.floor(20*Math.random())+1, y : Math.floor(20*Math.random())+1, data : "slow"};
                if((foodArray.indexOf(obt.x) === -1 && foodArray.indexOf(obt.y) === -1) && (powerArray.indexOf(obt.x) === -1 && powerArray.indexOf(obt.y) === -1) && (snakeArray.indexOf(obt.x) === -1 && snakeArray.indexOf(obt.y) === -1))
                powerArray.push(obt);
                else
                cou++;
            }
        }

        function genObs(powerArray,foodArray,snakeArray,obstacleArray)
        {   
            var c = 3;
            while(c--)
            {
                obs = {x : Math.floor(20*Math.random())+1, y : Math.floor(20*Math.random())+1};
                if((foodArray.indexOf(obs.x) === -1 && foodArray.indexOf(obs.y) === -1) && (powerArray.indexOf(obs.x) === -1 && powerArray.indexOf(obs.y) === -1) && (snakeArray.indexOf(obs.x) === -1 && snakeArray.indexOf(obs.y) === -1) && (obstacleArray.indexOf(obs.x) === -1 && obstacleArray.indexOf(obs.y) === -1))
                obstacleArray.push(obs);
                else
                c++;
            }
        }

        function genPortal(powerArray,foodArray,snakeArray,portalArray,obstacleArray)
        {
            var coun = 2;
            while(coun--)
            {
                obe = {x : Math.floor(15*Math.random())+5, y : Math.floor(15*Math.random())+5};
                if((foodArray.indexOf(obe.x) === -1 || foodArray.indexOf(obe.y) === -1) && (powerArray.indexOf(obe.x) === -1 || powerArray.indexOf(obe.y) === -1) && (snakeArray.indexOf(obe.x) === -1 || snakeArray.indexOf(obe.y) === -1) && (portalArray.indexOf(obe.x) === -1 || portalArray.indexOf(obe.y) === -1) && (obstacleArray.indexOf(obe.x) === -1 || obstacleArray.indexOf(obe.y) === -1))
                portalArray.push(obe);
                else
                coun++;
            }
        }
        
        function main(currtime) 
        {
            window.requestAnimationFrame(main);
            if((currtime - prevTime)/1000 < 1/speedValue())
            {
                return;
            }
            prevTime = currtime;
            start();
        }
        
        function speedValue()
        {
            if(foods % 1 == 0 && foods != 0) 
            {
                speed += 1;
                foods = 0;
            }
            return speed;
        }
        
        function start()
        {
            if(!crash(snakeArray,obstacleArray))
            {
                clearBoard();
                displayFood(text,foodArray);
                displaySnake(snakeArray);
                displayPower(powerArray);
                displayObstacle(obstacleArray);
                displayPortal(portalArray);
                updateSnake(snakeArray);
            }
            else
            {
                if(lives > 0)
                {
                    //alert("You Lost A Life! Press any key to continue.");
                    flag = 0;
                    document.getElementById("model").style.display = "block";
                    document.getElementById("modelHeading").innerHTML = "ALERT! LIFE DOWN."
                    document.getElementById("modelContent").innerHTML = "You Lost A Life! Press ok to continue."
                    snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
                    direction = {x : 0 , y : 0};
                    flag = 0;
                    if(lives == 2)
                    {
                        snakeImage3.style.visibility = "hidden";
                    }
                    else 
                    {
                        snakeImage2.style.visibility = "hidden";
                    }
                    startGame();
                    //window.addEventListener("keypress",startGame());
                }
                else
                {
                    snakeImage1.style.visibility = "hidden";
                    flag = 0;
                    document.getElementById("modelHeading").innerHTML = "GAME TERMINATED!"
                    document.getElementById("modelContent").innerHTML = "Game Over! Press OK to Restart."
                    console.log(name + " " + score);
                    rankArray.push({player : name , value : score});
                    rankArray.sort(function(a,b){return b.value - a.value});
                    document.getElementById("lists").innerHTML = "";
                    rankCount = 1;
                    for( var y = 0 ; y < rankArray.length ; y++)
                    {
                        rankElement = document.createElement("div");
                        rankSno = document.createElement("div");
                        rankName = document.createElement("div");
                        rankScore = document.createElement("div");
                        rankSno.innerHTML = rankCount;
                        rankSno.classList.add("sno");
                        rankName.innerHTML = rankArray[y].player;
                        rankName.classList.add("playerName");
                        rankScore.innerHTML = rankArray[y].value;
                        rankScore.classList.add("playerScore");
                        rankElement.classList.add("rank");
                        rankElement.appendChild(rankSno);
                        rankElement.appendChild(rankName);
                        rankElement.appendChild(rankScore);
                        document.getElementById("lists").appendChild(rankElement);
                        rankCount += 1;
                    }
                    snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
                    foodArray = [];
                    direction = {x : 0 , y : 0};
                    lives = 3;
                    score = 0;
                    timer  = 60;
                    flag = 0;
                    obstacleArray = [];
                    powerArray = [];
                    portalArray = [];
                    speed = 7;
                    frames  = 0;
                    foods  = 0;
                    isPause = false;
                    check = "";
                    document.getElementById("")
                    scoreData.innerHTML = "Score : " + score;
                    document.getElementById("textUser").innerHTML = "Word : " + check;
                    snakeImage1.style.visibility = "visible";
                    snakeImage2.style.visibility = "visible";
                    snakeImage3.style.visibility = "visible";
                    text = tasks[Math.floor(Math.random()*49)];
                    initialText = text;
                    document.getElementById("text").innerHTML = "TASK : " + initialText;
                    document.getElementById("textUser").innerHTML = "Word : " + check;
                    setTimeout(game,1000);
                    //window.addEventListener("keypress",game());
                }
            }
        }

        function clearBoard()
        {
            board.innerHTML = "";
        }

        function displayFood(text,foodArray)
        {
            for(var z = 0 ; z < foodArray.length ; z++)
            {
                foodElement = document.createElement('div');
                foodElement.style.gridRowStart = foodArray[z].y;
                foodElement.style.gridColumnStart = foodArray[z].x;
                foodElement.classList.add("food");
                foodElement.innerHTML = text[z];
                board.appendChild(foodElement);
            }
        }

        function displaySnake(snakeArray)
        {
            for(var z = 0 ; z < snakeArray.length ; z++)
            {
                if(z == 0)
                {
                    snakeElementHead = document.createElement('div');
                    snakeElementHead.style.gridRowStart = snakeArray[z].y;
                    snakeElementHead.style.gridColumnStart = snakeArray[z].x;
                    snakeElementHead.classList.add("head");
                    snakeElementHead.setAttribute("id","head");
                    board.appendChild(snakeElementHead);
                }
                else
                {
                    snakeElement = document.createElement('div');
                    snakeElement.style.gridRowStart = snakeArray[z].y;
                    snakeElement.style.gridColumnStart = snakeArray[z].x;
                    snakeElement.classList.add("body");
                    snakeElement.setAttribute("id","body")
                    board.appendChild(snakeElement);
                }
            }
        }

        function updateSnake(snakeArray)
        {
            frames++;
            timeLeft.innerHTML = "Time Left : " + timer;

            if(check.length == initialText.length)
            restart();

            if(flag)
            {
                checkTime(frames);
            }            

            if(!ateFood(snakeArray,foodArray))
            {
                if(portal(snakeArray,portalArray) == -1 && flag && !isPause)
                {
                    for( var e = snakeArray.length - 2 ; e >= 0 ; e-- )
                    {
                        snakeArray[e+1] = {...snakeArray[e]};
                    }
                    snakeArray[0].x += direction.x;
                    snakeArray[0].y += direction.y;
                }
                else if(portal(snakeArray,portalArray) == 1 && flag && !isPause)
                {
                    snakeArray[0].x = portalArray[1].x + direction.x;
                    snakeArray[0].y = portalArray[1].y + direction.y;
                }
                else if(portal(snakeArray,portalArray) == 2 && flag && !isPause)
                {
                    snakeArray[0].x = portalArray[0].x + direction.x;
                    snakeArray[0].y = portalArray[0].y + direction.y;
                }
            }
            else 
            {
                if(flag && !isPause)
                {
                    snakeArray.unshift({x : snakeArray[0].x + direction.x , y : snakeArray[0].y + direction.y});
                }
            }


            if(powerUp(snakeArray,powerArray) == 1)
            {
                if(snakeArray.length > 1)
                {
                    snakeArray.pop();
                }
                powerArray = [];
                setInterval(updatePower,5000);
                function updatePower()
                {
                    genPow(powerArray,foodArray,snakeArray);
                    displayPower(powerArray);
                }
            }
            else if(powerUp(snakeArray,powerArray) == 2)
            {
                speed -= 1;
                powerArray = [];
                setInterval(updatePower,5000);
                function updatePower()
                {
                    genPow(powerArray,foodArray,snakeArray);
                    displayPower(powerArray);
                }
            }

            function portal(snakeArray,portalArray)
            {
                if((snakeArray[0].x == portalArray[0].x ) && (snakeArray[0].y == portalArray[0].y))
                {
                    return 1;
                }
                else if((snakeArray[0].x == portalArray[1].x ) && (snakeArray[0].y == portalArray[1].y))
                {
                    return 2;
                }
                return -1;
            }

            function powerUp(snakeArray,powerArray)
            {
                if(snakeArray[0].x == powerArray[0].x && snakeArray[0].y == powerArray[0].y)
                return 1;
                else if (snakeArray[0].x == powerArray[1].x && snakeArray[0].y == powerArray[1].y)
                return 2;
            }

            function ateFood(snakeArray,foodArray)
            {
                for(var s = 0 ; s < foodArray.length ; s++)
                {
                    if(snakeArray[0].x == foodArray[s].x && snakeArray[0].y == foodArray[s].y)
                    {                      
                        check += foodArray[s].data;
                        if(match(initialText,check))
                        {
                            foodSound.play();
                            document.getElementById("textUser").innerHTML = "Word : " + check;
                            score = check.length;
                            scoreData.innerHTML = "Score : " + score;
                            timer += 3;
                            foods = check.length;
                            for(f = 0 ; f < foodArray.length ; f++)
                            {
                                if(foodArray[f].data === check.slice(check.length - 1))
                                break;
                            }
                            foodArray.splice(f,1);
                            if(foodArray.length == 0)
                            {
                                //alert("Hurray! You completed the task.");
                                flag = 0;
                                document.getElementById("model").style.display = "block";
                                document.getElementById("modelHeading").innerHTML = "MISSON SUCCESS!"
                                document.getElementById("modelContent").innerHTML = "Hurray! You completed the task."
                                startGame();
                            }
                            text = text.slice(1,text.length);
                            return true;
                        }
                        else
                        {
                            check = check.slice(0,check.length - 1);
                            return false;
                        }
                    }
                }
                return false;
            }
        }

        function checkTime(frames)
        {
            if (timer == 0)
                {  
                    //alert("Time Over! Press any key to Restart.")
                    flag = 0;
                    document.getElementById("model").style.display = "block";
                    document.getElementById("modelHeading").innerHTML = "CLOCK HAS RUN OUT!"
                    document.getElementById("modelContent").innerHTML = "Time Over! Press OK to Restart."
                    snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
                    foodArray = [];
                    direction = {x : 0 , y : 0};
                    score = 0;
                    timer = 60;
                    flag = 0;
                    lives = 3;
                    speed = 7;
                    obstacleArray = [];
                    powerArray = [];
                    portalArray = [];
                    check = "";
                    score.innerHTML = "Score : " + check.length;
                    document.getElementById("textUser").innerHTML = "Word : " + check;
                    snakeImage1.style.visibility = "visible";
                    snakeImage2.style.visibility = "visible";
                    snakeImage3.style.visibility = "visible";
                    text = tasks[Math.floor(Math.random()*49)];
                    initialText = text;
                    document.getElementById("text").innerHTML = "TASK : " + initialText;
                    document.getElementById("textUser").innerHTML = "Word : " + check; 
                    setTimeout(game,1000);
                    //window.addEventListener("keypress",game());
                }

                else if(frames % speed == 0)
                {
                    if(!isPause)
                    {
                        timer--;
                        timeLeft.innerHTML = "Time Left : " + timer;
                    }
                }
        }

        function match(initialText,check)
        {
            var count = 0;
            for(var x = 0 ; x < check.length ; x++)
            {
                if(initialText[x] == check[x])
                count++;
                else
                break;
            }
            if(count == check.length)
            return true;
            else
            return false;
        }

        function crash(snakeArray,obstacleArray)
        {
            if(snakeArray[0].x <= 0 || snakeArray[0].x >= 21 || snakeArray[0].y <= 0 || snakeArray[0].y >= 21)
            {
                scoreData.innerHTML = "Score : " + score; 
                timeLeft.innerHTML = "Time Left : " + timer;
                lives -= 1;
                return true;
            }
            else if((snakeArray[0].x == obstacleArray[0].x && snakeArray[0].y == obstacleArray[0].y) || (snakeArray[0].x == obstacleArray[1].x && snakeArray[0].y == obstacleArray[1].y) || (snakeArray[0].x == obstacleArray[2].x && snakeArray[0].y == obstacleArray[2].y))
            {
                scoreData.innerHTML = "Score : " + score; 
                timeLeft.innerHTML = "Time Left : " + timer;
                lives -= 1;
                return true;
            }
            else 
            {
                for(var i = 1 ; i < snakeArray.length ; i++)
                {
                    if(snakeArray[0].x == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y)
                    {
                        scoreData.innerHTML = "Score : " + score; 
                        timeLeft.innerHTML = "Time Left : " + timer;
                        lives -= 1 ;
                        return true;
                    }
                }
            }
            return false;
        }

        function displayPower(powerArray)
        {
            for(var l = 0 ; l < powerArray.length ; l++)
            {
                if(l == 0)
                {   
                    powerElement = document.createElement('div');
                    powerElement.style.gridRowStart = powerArray[l].y;
                    powerElement.style.gridColumnStart = powerArray[l].x;
                    powerElement.classList.add("shrink");
                    board.appendChild(powerElement);
                }
                else if(l == 1)
                {
                    powerElement = document.createElement('div');
                    powerElement.style.gridRowStart = powerArray[l].y;
                    powerElement.style.gridColumnStart = powerArray[l].x;
                    powerElement.classList.add("slow");
                    board.appendChild(powerElement);
                }
            }
        }

        function displayObstacle(obstacleArray)
        {
            for( var r = 0 ; r < obstacleArray.length ; r++)
            {
                obstacleElement = document.createElement('div');
                obstacleElement.style.gridRowStart = obstacleArray[r].y;
                obstacleElement.style.gridColumnStart = obstacleArray[r].x;
                obstacleElement.classList.add("obstacle");
                board.appendChild(obstacleElement);
            }
        }

        function displayPortal(portalArray)
        {
            for( var s = 0 ; s < portalArray.length ; s++)
            {
                portalElement = document.createElement('div');
                portalElement.style.gridRowStart = portalArray[s].y;
                portalElement.style.gridColumnStart = portalArray[s].x;
                portalElement.classList.add("portal");
                board.appendChild(portalElement);
            }
        }

        function startGame()
        {
            if(!isPause)
            {
                window.requestAnimationFrame(main);
                //board.style.grid = "repeat(size,auto) / repeat(size,auto)";
                if(isSave)
                {
                    document.getElementById("text").innerHTML = "TASK : " + initialText;
                    document.getElementById("textUser").innerHTML = "Word : " + check; 
                    genFood(text,foodArray,snakeArray);
                    genPow(powerArray,foodArray,snakeArray);
                    genObs(powerArray,foodArray,snakeArray,obstacleArray);
                    genPortal(powerArray,foodArray,snakeArray,portalArray,obstacleArray);
                    isSave = 0;
                }                  
                else if(lives == 3 || lives == 0)
                {
                    document.getElementById("text").innerHTML = "TASK : " + initialText;
                    document.getElementById("textUser").innerHTML = "Word : " + check; 
                    genFood(text,foodArray,snakeArray);
                    genPow(powerArray,foodArray,snakeArray);
                    genObs(powerArray,foodArray,snakeArray,obstacleArray);
                    genPortal(powerArray,foodArray,snakeArray,portalArray,obstacleArray);
                }
            }
        }

        function moveUp()
        {
            direction.x = 0;
            direction.y = -1;
            flag = 1;
        }
        function moveDown()
        {
            direction.x = 0;
            direction.y = 1;
            flag = 1;
        }
        function moveLeft()
        {
            direction.x = -1;
            direction.y = 0;
            flag = 1;
        }
        function moveRight()
        {
            direction.x = 1;
            direction.y = 0;
            flag = 1;
        }

        window.addEventListener("keyup", e =>
        {
            direction = {x : 0 , y : 0}
            if(isPause == true)
            {
                isPause = false;
            }
            switch(e.keyCode)
            {
                case 38:
                    direction.x = 0;
                    direction.y = -1;
                    flag = 1;
                    //document.getElementById("head").style.animation = "animateUp 0.5s linear 0s 1 normal forwards";
                    //document.getElementById("body").style.animation = "animateUp 0.5s linear 0s 1 normal forwards";
                    break;
                case 40:
                    direction.x = 0;
                    direction.y = 1;
                    flag = 1;
                    //document.getElementById("head").style.animation = "animateDown 0.5s linear 0s 1 normal forwards";
                    //document.getElementById("body").style.animation = "animateDown 0.5s linear 0s 1 normal forwards";
                    break;
                case 37:
                    direction.x = -1;
                    direction.y = 0;
                    flag = 1;
                    //document.getElementById("head").style.animation = "animateLeft 0.5s linear 0s 1 normal forwards";
                    //document.getElementById("body").style.animation = "animateLeft 0.5s linear 0s 1 normal forwards";
                    break;
                case 39:
                    direction.x = 1
                    direction.y = 0;
                    flag = 1;
                    //document.getElementById("head").style.animation = "animateRight 0.5s linear 0s 1 normal forwards";
                    //document.getElementById("body").style.animation = "animateRight 0.5s linear 0s 1 normal forwards";
                    break;
                default:
                    break;
            };
        })

        function pause()
        {
            isPause = true;
        }

        function play()
        {
            isPause = false;
        }

        function restart()
        {
            snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
            foodArray = [];
            direction = {x : 0 , y : 0};
            lives = 3;
            score = 0;
            timer  = 60;
            flag = 0;
            speed = 7;
            frames  = 0;
            foods  = 0;
            check = "";
            obstacleArray = [];
            powerArray = [];
            portalArray = [];
            snakeImage1.style.visibility = "visible";
            snakeImage2.style.visibility = "visible";
            snakeImage3.style.visibility = "visible";
            scoreData.innerHTML = "Score : " + score;
            document.getElementById("textUser").innerHTML = "Word : " + check;
            text = tasks[Math.floor(Math.random()*49)];
            initialText = text;
            document.getElementById("text").innerHTML = "TASK : " + initialText;
            document.getElementById("textUser").innerHTML = "Word : " + check; 
            setTimeout(game,1000);
            //window.addEventListener("keypress",game());
        }

        function save()
        {
            saveObj = {candidate : name , data : check , life : lives , time : timer, normal : initialText , scoreValue : score};
            storageArray.push(saveObj);
            text = tasks[Math.floor(Math.random()*49)];
            initialText = text;
            check = "";
            document.getElementById("text").innerHTML = "TASK : " + initialText;
            document.getElementById("textUser").innerHTML = "Word : " + check;
            genFood(text,foodArray,snakeArray);
            flag = 0;
            document.getElementById("model").style.display = "block";
            //alert("Your gameplay has been Saved!. Press new to start another game.");
            document.getElementById("modelHeading").innerHTML = "SUCCESSFULLY SAVED!"
            document.getElementById("modelContent").innerHTML = "Your gameplay has been Saved!. Press new to start another game."
            direction = {x : 0 , y : 0};
            frames = 0;
            score = 0;
            timer = 60;
            flag = 0;
            lives = 3;
            speed = 7;
            snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
            foodArray = [];
            obstacleArray = [];
            powerArray = [];
            portalArray = [];
            scoreData.innerHTML = "Score : " + score;
            snakeImage1.style.visibility = "visible";
            snakeImage2.style.visibility = "visible";
            snakeImage3.style.visibility = "visible";
            setTimeout(game,1000);
        }

        function savedGames()
        {
            document.getElementById("saveContent").innerHTML = "";

            document.getElementsByTagName("span").onclick = function() 
            {
                document.getElementById(saveModel).style.display = "none";
            }

            isFound = false;
            
            for (el = 0 ; el < storageArray.length ; el++)
            {
                if(storageArray[el].candidate == name)
                {
                    saveElement = document.createElement("div");
                    line = document.createElement("div");
                    butto = document.createElement("button");
                    line.innerHTML = storageArray[el].normal + " : " + storageArray[el].data;
                    line.classList.add("line");
                    butto.innerHTML = "PLAY";
                    butto.classList.add("butto");
                    saveElement.appendChild(line);
                    saveElement.appendChild(butto);
                    saveElement.classList.add("saveList");
                    butto.addEventListener("click",savePlay);
                    butto.parameter = el;
                    document.getElementById("saveContent").appendChild(saveElement);
                    isFound = true;

                    function savePlay(e)
                    {
                        clearBoard();
                        text = "";
                        initialText = "";
                        check = "";
                        snakeArray = [{x : 5 , y : 5},{x : 4 , y : 5},{x : 3 , y : 5}];
                        foodArray = [];
                        obstacleArray = [];
                        powerArray = [];
                        portalArray = [];
                        elo = e.currentTarget.parameter;
                        check = storageArray[elo].data;
                        text = storageArray[elo].normal;
                        text = text.slice(check.length);
                        document.getElementById("text").innerHTML = "TASK : " + storageArray[elo].normal;
                        initialText = storageArray[elo].normal;
                        document.getElementById("textUser").innerHTML = "Word : " + check;
                        scoreData.innerHTML = "Score : " + storageArray[elo].scoreValue;
                        lives = storageArray[elo].life;
                        timer = storageArray[elo].time;
                        if(lives == 2)
                        {
                            snakeImage3.style.visibility = "hidden";
                        }
                        else if(lives = 1)
                        {
                            snakeImage3.style.visibility = "hidden";
                            snakeImage2.style.visibility = "hidden";
                        }
                        timeLeft.innerHTML = "Time Left : " + timer;
                        isSave = 1;
                        storageArray.splice(elo,1);
                        document.getElementById("saveModel").style.display = "none";
                        startGame();
                    }
                }
            }
            
            if(!isFound || storageArray.length == 0)
            {
                saveElement = document.createElement("div");
                saveElement.innerHTML =  "No Saved Games.";
                saveElement.classList.add("line");
                document.getElementById("saveContent").appendChild(saveElement);
            }
            
            document.getElementById("saveModel").style.display = "block";
        }