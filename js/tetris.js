const game = document.getElementById("game");
var str = "";
var board = new Array(30);
var now_block = Math.floor(Math.random() * 7);
var next_block = Math.floor(Math.random() * 7);
var left_top_x = 5;
var left_top_y = 11;
var rotate = 0;
var order = 0;

//keyup : end of press, keydown: start do press
document.addEventListener("keyup", function(e){
    console.log(e);    
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
    left_top_x = 5;
    left_top_y = 11;
    rotate = 0;
}

function block_down() {
    --left_top_x;
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (board[i + left_top_x][j + left_top_y] == now_block)
                board[i + left_top_x][j + left_top_y] = 8;
        }
    }
    ++left_top_x;

    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (block[now_block][0][i][j] != 0) {
                board[i + left_top_x][j + left_top_y] = now_block;
            }

        }
    }


}

function block_built() {
    for (var i = 0; i < 3; ++i) {
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
            if(board[i + left_top_x + line_deleted][j] != 9) continue;
            ++cou;
        }
        if(cou == 10){
            //we have to do plus
            ++line_deleted;
        }
        console.log(cou);
        cou = 0;
    }
}

function play() {
    console.log("1");
    ++left_top_x;
    order = 0;
    if (check_can() == true) {
        block_down();
    }
    else {
        block_built();
        delete_line();
        init_block();

    }
    change_color();
}

function init() {
    make_board();
    play();
    setInterval(play, 1000);
}

init();

