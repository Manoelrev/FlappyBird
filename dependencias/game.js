// Canvas 
var screen = document.querySelector("canvas");
var pencil = screen.getContext("2d");

// Sprites 
var background  = document.getElementById("background")
var terrain     = document.getElementById("terrain")
var pipe_up     = document.getElementById("pipe_up")
var pipe_down   = document.getElementById("pipe_down")
var player      = document.getElementById("player")
var player_jump = document.getElementById("player2")
var player_fall = document.getElementById("player1")

// Variables
var random_pipe = numbergenerator(0,4);
var game = true;
var background_speed = 4;
var background_pos   = 0;
var world_pos        = 0;

var pipe_position = 600;
var player_x      = 100 ;
var player_y      = 400;
var player_rotate = 0.1;

var jump_player      = true;
var point_player     = 0;
var animation_player = 0;

// Function
function endgame(result){
    if(result){
        game = false; 
        point.style.top = "310px";
        point.style.fontSize = "90px";
        engine.style.display = "none";
        restart.style.display = "block";
        gameover.style.display = "block";
    }
}

function startGame(){
    point.style.top = "90px";
    point.style.fontSize = "40px";
    restart.style.display = "none";
    gameover.style.display = "none";
    engine.style.display = "block";

    point_player  = 0;
    player_y      = 400;
    pipe_position = 600;
    game = true;

    document.getElementById("point").innerHTML = "0";
}

function numbergenerator(min,max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function colission(Object_one_x_start, Object_one_x_end, Object_two_x_start, Object_two_x_end, Object_one_y_start, Object_one_y_end, Object_two_y_start, Object_two_y_end){
    if ((Object_one_x_start <= Object_two_x_end) && (Object_one_x_end >= Object_two_x_start) && (Object_one_y_start <= Object_two_y_end) && (Object_one_y_end >= Object_two_y_start)){return true;}
    else {return false;}
}

function timer(){
    jump_player=false;
    animation_player++;

        
    if (player_rotate < 30)
    {
        player_rotate = player_rotate + 20
    }

    //Gravity
    player_y = player_y +20
}

function pipe_move(){
    pipe_position = pipe_position - 5;
    if(pipe_position<-115){pipe_position = 650;  random_pipe = numbergenerator(0,4);}
    
}

function worldPos(){
    world_pos = world_pos - background_speed * 1.5;
    if(world_pos < -600){world_pos = 0}
    background_pos = background_pos - (background_speed);
    if(background_pos < -600){background_pos = 0};
}

// Game Engine
function Engine(size, spaceBetweenPipes){
    var pipe_height = size * random_pipe * 4;
    var pipes_size  = size * 3;

    worldPos();

    // Drawn elements
    pencil.clearRect(0,0,600,800);
    pencil.drawImage(background, background_pos, 0    , 1200,800);
    pencil.drawImage(pipe_down , pipe_position , -560 + pipe_height, pipes_size,600);
    pencil.drawImage(pipe_up   , pipe_position ,  760 - (spaceBetweenPipes -pipe_height), pipes_size,600);
    pencil.drawImage(terrain   , world_pos,750 , 1200 ,100);

    // Collision test
    endgame(colission(player_x, player_x + 70, pipe_position, pipe_position + pipes_size, player_y, player_y + 50, -1000 , pipe_height + 45));                   // colisão cano superior
    endgame(colission(player_x, player_x + 70, pipe_position, pipe_position + pipes_size, player_y, player_y + 50, 790 - (spaceBetweenPipes -pipe_height),800)); // colisão cano inferior
    endgame(colission(0,0,0,0,player_y,player_y + 50,770,800));                                                                                                  // colisão chão

    //Gain Point
    if(game &&( player_x + 45 == (pipe_position + 50)) && ((size) <= player_x) && (player_y <= (800 - (spaceBetweenPipes -pipe_height)))){point_player++; document.getElementById("point").innerHTML = point_player;}
    
}

function player_bird(){
    //Animation
    pencil.save();
    pencil.translate((player_x + 70/2),(player_y+50/2));
    pencil.rotate(player_rotate*Math.PI/180);
    pencil.translate(-(player_x + 70/2),-(player_y+50/2));
    if(animation_player < 1){pencil.drawImage(player_jump,player_x ,player_y - 25,70,50);}
    else if(animation_player >= 1 && animation_player <2){pencil.drawImage(player,player_x  ,player_y - 25,70,50);}
    else{pencil.drawImage(player_fall,player_x ,player_y - 25,70,50);animation_player=0}
    pencil.restore();
    
}

function game_loop(){
    Engine(40,540);
    pipe_move();
    player_bird();
}
if(game){
setInterval(game_loop, 41.7);
setInterval(timer,120.7)
}

document.onkeydown = function(event){
    if(jump_player == false){
        if(event.keyCode == 32){player_y = player_y - 100;jump_player = true; animation_player=0; player_rotate = -60  }
        else if(event.keyCode == 65){player_y = player_y - 100;jump_player = true; animation_player=0; player_rotate = -60  }}
    if(game == false){if(event.keyCode == 32){startGame();}}
}
document.getElementById("engine").onclick = function(event){
    player_y = player_y - 100;jump_player = true; animation_player=0; player_rotate = -60  
}