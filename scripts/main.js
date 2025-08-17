/*
* 関数名 　　　　       ： isWin
* 内容   　　　　       : 勝者かどうか判定する
* 引数(1次元配列)       : playerTable
* 戻り値(boolean型)    : True or False
*/
function isWin(playerTable){
    const winnerTable = [
        [0,1,2], // 1行目の3つ
        [3,4,5], // 2行目の3つ
        [6,7,8], // 3行目の3つ
        [0,3,6], // 1列目の3つ
        [1,4,7], // 2列目の3つ
        [2,5,8], // 3列目の3つ
        [0,4,8], // 右下がりの斜め3つ
        [2,4,6]  // 右上がりの斜め3つ
    ];
}

/*
* 関数名 　　　　      : gridClickStart
* 内容   　　　　      : マス目をクリックした時の処理
* 引数      		   : e(イベントオブジェクト)
* 戻り値(void)    :
*/
function gridClickStart(e){
    console.log("Hello JavaScript"); // 後で変更する(debug)
}

/*
* 関数名 　　　　       ： initGameBoard
* 内容   　　　　       : gameの初期設定
* 引数(void)           : 
* 戻り値(undefined)     :
*/
function initGameBoard(){
    game.init(); 
    
    const gameboard = document.querySelectorAll(".cell");
    gameboard.forEach((cell) => {
        cell.classList.add("unset");
        cell.innerHTML = game.currentPlayer;
    });
}


class Game{
    #currentPlayer;
    #gameBoard;

    constructor(){
        this.init();
    }

    // 次のプレイヤーへの切り替え
    togglePlayer(){
        if(this.#currentPlayer === "O") this.#currentPlayer = "O";
        else this.#currentPlayer = "X"; 
    }

    // 初期化
    init(){
        this.#currentPlayer = "X";
        this.#gameBoard = [null,null,null,null,null,null,null,null,null];
    }
}


// ゲームの初期化
function initGame(){
    const gameboard = document.querySelectorAll(".cell"); // classにcellを含む要素を全て取得
    gameboard.forEach((cell,index) => {
        cell.addEventListener("click", gridClickStart);
    });
    document.getElementById("restart").addEventListener("click", initGameBoard);
}

const game = new Game();
initGame();