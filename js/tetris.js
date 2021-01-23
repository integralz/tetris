const game = document.getElementById("game");
var str = "";
var board = new Array(30);
var now_block = Math.floor(Math.random() * 7);
var next_block = Math.floor(Math.random() * 7);
var left_top_x = 4;
var left_top_y = 11;
var rotate = 0;
var order = 0;
var play_continue;

//keyup : end of press, keydown: start do press
document.addEventListener("keyup", function(e){   
    if(e.key == "ArrowDown"){
        order = 0;
        eventplay();
    }
    else if(e.key == "ArrowUp"){
        order = 1;
        eventplay();
    }
    else if(e.key == "ArrowLeft"){
        order = 2;
        eventplay();
    }
    else if(e.key == "ArrowRight"){
        order = 3;
        eventplay();
    }
    else if(e.key == " "){
        order = 4;
        eventplay();
    }
});

function make_board() {
    for (var i = 0; i < 30; ++i) {
        board[i] = new Array(30);
    }
    for (var i = 0; i < 30; ++i) {
        for (var j = 0; j < 30; ++j) {
            board[i][j] = 7;
        }
    }
    for (var i = 5; i < 25; ++i) {
        for (var j = 7; j < 17; ++j) {
            board[i][j] = 8;
        }
    }

    for (var i = 7; i < 11; ++i) {
        for (var j = 20; j < 24; ++j) {
            board[i][j] = 8;
        }
    }
}

function change_color() {
    str = "";
    for (var i = 0; i < 30; ++i) {
        str += "<tr>";
        for (var j = 0; j < 30; ++j) {
            //black surround
            if (board[i][j] == 7) {
                str += `<td class="background"></td>`
            }
            // 1~7 block color
            else if (board[i][j] == 0) {
                str += `<td class="block1"></td>`
            }
            else if (board[i][j] == 1) {
                str += `<td class="block2"></td>`
            }
            else if (board[i][j] == 2) {
                str += `<td class="block3"></td>`
            }
            else if (board[i][j] == 3) {
                str += `<td class="block4"></td>`
            }
            else if (board[i][j] == 4) {
                str += `<td class="block5"></td>`
            }
            else if (board[i][j] == 5) {
                str += `<td class="block6"></td>`
            }
            else if (board[i][j] == 6) {
                str += `<td class="block7"></td>`
            }
            //board + scoreboard
            else if (board[i][j] == 8) {
                str += `<td class="board"></td>`
            }
            //block that built else if(board[i][j] == 9)
            else {
                str += `<td class="block"></td>`
            }

        }
        str += "</tr>";
    }

    game.innerHTML = str;
}

function check_can() {
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (board[i + left_top_x][j + left_top_y] == 7 || board[i + left_top_x][j + left_top_y] == 9) {
                if (block[now_block][rotate][i][j] != 0) {
                    if (order == 0) {
                        --left_top_x;
                    }
                    //rotate
                    else if (order == 1) {
                        rotate = (3 + rotate) % 4;
                    }
                    //left
                    else if (order == 2) {
                        ++left_top_y;
                    }
                    //right else if(order == 3)
                    else {
                        --left_top_y;
                    }
                    return false;
                }
            }
        }
    }
    return true;
}

//drop next block;
function init_block() {
    now_block = next_block;
    next_block = Math.floor(Math.random() * 7);
    left_top_x = 4;
    left_top_y = 11;
    rotate = 0;
}

function block_change() {
    //down
    if(order == 0){
        --left_top_x;
    }
    //up
    else if(order == 1){
        rotate = (1 + rotate) % 4;
    }
    //left
    else if(order == 2){
        ++left_top_y;
    }
    //right
    else if(order == 3){
        --left_top_y;
    }
    
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (board[i + left_top_x][j + left_top_y] == now_block)
                board[i + left_top_x][j + left_top_y] = 8;
        }
    }

    //down
    if(order == 0){
        ++left_top_x;
    }
    //up
    else if(order == 1){
        rotate = (3 + rotate) % 4;
    }
    //left
    else if(order == 2){
        --left_top_y;
    }
    //right
    else if(order == 3){
        ++left_top_y;
    }

    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (block[now_block][rotate][i][j] != 0) {
                board[i + left_top_x][j + left_top_y] = now_block;
            }

        }
    }


}

function block_built() {
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (block[now_block][rotate][i][j] != 0) {
                board[i + left_top_x][j + left_top_y] = 9;
            }
        }
    }
}

function delete_line(){
    let cou = 0;
    let line_deleted = 0;
    for(var i = 3; i >= 0; --i){
        for(var j = 7; j < 17; ++j){
            if(board[i + left_top_x + line_deleted][j] != 9) break;
            ++cou;
        }
        if(cou == 10){
            //we have to do plus
            for(var j = i + left_top_x + line_deleted - 1; j >= 5; --j){
                for(var k = 7; k < 17; ++k){
                    board[j + 1][k] = board[j][k];
                }
            }
            for(var j = 7; j < 17; ++j)
                board[5][j] = 8;
            ++line_deleted;
        }
        cou = 0;
    }
}

function check_end(){
    for(var i = 0; i < 4; ++i){
        for(var j = 0; j < 4; ++j){
            if(block[now_block][rotate][i][j] == 1 && board[left_top_x + i][left_top_y + j] == 9)
                return true;
        }
    }
    return false;
}

function play() {
    if(check_end() == true) {
        for(var i = 7; i < 17; ++i)
            board[4][i] = 7;
        change_color();
        clearInterval(play_continue);
        alert("Game Over!");
        return;
    }
    ++left_top_x;
    order = 0;
    if (check_can() == true) {
        block_change();
    }
    else {
        block_built();
        delete_line();
        init_block();
        draw_nextblock();
    }
    change_color();
}

function eventplay(){
    //down
    if(order == 0){
        play();
    }
    //up
    else if(order == 1){
        rotate = (1 + rotate) % 4;
        if (check_can() == true) {
            block_change();
            change_color();
        }
    }
    //left
    else if(order == 2){
        --left_top_y;
        if (check_can() == true) {
            block_change();
            change_color();
        }
    }
    //right
    else if(order == 3){
        ++left_top_y;
        if (check_can() == true) {
            block_change();
            change_color();
        }
    }
    //space
    else if(order == 4){
        while(1){
            if(check_end() == true) {
                console.log("end");
                for(var i = 7; i < 17; ++i)
                    board[4][i] = 7;
                clearInterval(play_continue);
                return;
            }
            ++left_top_x;
            order = 0;
            if (check_can() == true) {
                block_change();
                change_color();
            }
            else {
                block_built();
                delete_line();
                init_block();
                draw_nextblock();
                change_color();
                return;
            }
        }
    }
}

function draw_nextblock(){
    for(var i = 7; i < 11; ++i){
        for(var j = 20; j < 24; ++j){
            board[i][j] = 8;
        }
    }

    for(var i = 0; i < 4; ++i){
        for(var j = 0; j < 4; ++j){
            if(block[next_block][0][i][j] != 0){
                board[i + 7][j + 20] = next_block;
            }
        }
    }
}

function init() {
    make_board();
    play();
    draw_nextblock();
    play_continue = setInterval(play, 1000);
}

init();

