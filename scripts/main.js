
/*
* 関数名 　　　　   ： winnerTicTacToe
* 内容   　　　　   : Tic Tac Toeの勝敗を決める
* 引数(1次元配列)   : table
* 戻り値(str型)    : "X's Wins!!!" or "O's Wins!!!" or "Draw!" or "game continue"
*/

function winnerTicTacToe(table){
    let indexArr_O = [];
    let indexArr_X = [];
    let count = 0;

    for(let i=0; i<table.length; i++){
        if(table[i] === "O"){
            indexArr_O.push(i);    //配列の末尾に要素を追加
            count++;
        }
        else if(table[i] === "X"){
            indexArr_X.push(i);     //配列の末尾に要素を追加
            count++;
        }
    }

    if(isWin(indexArr_O)) return "O's Wins!!!";
    else if(isWin(indexArr_X)) return "X's Wins!!!";
    else if(count === 9) return "Draw!";    // どちらも勝たずに9マス埋まったため引き分け
    else return "game continue";

}


/*
* 関数名 　　　　       ： isWin
* 内容   　　　　       : 勝者かどうか判定する
* 引数(1次元配列)       : playerTable
* 戻り値(boolean型)    : True or False
*/
function isWin(playerTable){
    const winnerTable = [
        [0,1,2], // 1行目の3つが揃った場合
        [3,4,5], // 2行目の3つ
        [6,7,8], // 3行目の3つ
        [0,3,6], // 1列目の3つ
        [1,4,7], // 2列目の3つ
        [2,5,8], // 3列目の3つ
        [0,4,8], // 右下がりの斜め3つ
        [2,4,6]  // 右上がりの斜め3つ
    ];

    // winnerTableの要素分繰り返す(8回)
    for(element of winnerTable){

        /* 例. playerTableが[0,1,2,3]の場合、winnerTableの[0,1,2]の3つの値が含まれるので、true
               playerTableが[0,3,5,2]の場合、winnerTableの各配列の値と比較して3つ揃うものはないので、false */
        if(playerTable.filter(value => element.includes(value)).length >= 3){
            return true;
        }
    }
    return false;
}

/*
* 関数名 　　　　      : gridClickStart
* 内容   　　　　      : マス目をクリックした時の処理
* 引数      		   : e(イベントオブジェクト)
* 戻り値(void)    :
*/
function gridClickStart(e){
    game.setGameBoard(this.num, game.currentPlayer);
    console.log(game.gameBoard);
    if(e.target.classList.contains("unset"))game.togglePlayer();   // unsetがクラス情報に含まれているか確認
    e.target.classList.remove("unset");     // unsetをオブジェクトのクラス情報から除去

    /* 勝敗がついたかを確認する */
    const clickedState = winnerTicTacToe(game.gameBoard);
    console.log(clickedState);

    if(clickedState === "game continue"){
        /* プレイヤーの変更 */
        const gameboard = document.querySelectorAll(".cell");
                /* classがunsetのものをtogglePlayerの値に変える */
            gameboard.forEach((cell) => {
            if(cell.classList.contains("unset")){
                cell.innerHTML = game.currentPlayer;
            }
        })
    }
    else {
        /* ゲーム終了画面の表示 */
        let gameSetElement = document.querySelector(".popup.hide");
        gameSetElement.classList.remove("hide");
        document.getElementById("message").innerHTML = clickedState;
    }


}

/*
* 関数名 　　　　       ： initGameBoard
* 内容   　　　　       : gameの初期設定
* 引数(void)           : 
* 戻り値(undefined)     :
*/
function initGameBoard(){
    game.init(); 

    document.querySelector(".popup").classList.add("hide");     // classにpopupを含む要素を取得、取得した要素のclassにhideを追加する
    const gameboard = document.querySelectorAll(".cell");
    gameboard.forEach((cell) => {
        cell.classList.add("unset");
        cell.innerHTML = game.currentPlayer;
    });
}

// Game class
class Game{
    #currentPlayer;
    #gameBoard;

    // コンストラクタ
    constructor(){
        this.init();
    }

    // 現在のプレイヤー情報の取得
    get currentPlayer(){
        return this.#currentPlayer;
    }

    // 盤面情報の取得
    get gameBoard(){
        return this.#gameBoard;
    }

    // 次のプレイヤーへの切り替え
    togglePlayer(){
        if(this.#currentPlayer === "O") this.#currentPlayer = "X";
        else this.#currentPlayer = "O";

        document.querySelector(".turn").innerHTML = this.#currentPlayer + "'s Turn";
    }

    // 盤面情報の設定
    setGameBoard(index,sign){
        if(index > 8 || index < 0) throw new Error("index out of range"); // マス目の数が特定の条件になるとエラー
        if(sign !== "O" && sign !== "X") throw new Error("bad value"); // プレイヤーの記号がOとX以外だとエラー
        this.#gameBoard[index] = sign;
    }

    // 初期化
    init(){
        this.#currentPlayer = "X";
        document.querySelector(".turn").innerHTML = this.#currentPlayer + "'s Turn"; // 現在のプレイヤーの順番表示を初期化(X's Turn)
        this.#gameBoard = [null,null,null,null,null,null,null,null,null];     // 盤面情報を配列として初期化
    }
}


// ゲームの初期化
function initGame(){
    const gameboard = document.querySelectorAll(".cell"); // classにcellを含む要素を全て取得
    gameboard.forEach((cell,index) => {  // gameboardにある要素1つ1つをcellとして、クリックされたときの処理を追加
        cell.addEventListener("click", {num:index, handleEvent: gridClickStart});   // gridClickStartという関数を呼び出す。その際にgridClickStartでnumという変数を作成し、そこにindexの値を代入する
    });
    document.getElementById("restart").addEventListener("click", initGameBoard);    //idがrestartの要素をクリックした時に、initGameBoard関数の処理を呼び出す
    document.getElementById("new-game").addEventListener("click",initGameBoard);    //idがnew-gameの要素をクリックした時に、initGameBoard関数の処理を呼び出す
    initGameBoard();
}

const game = new Game();    // Gameクラスをインスタンス化して、gameオブジェクトの作成
initGame();