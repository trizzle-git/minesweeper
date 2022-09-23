export default function GenBoard(row, col, mines) {
    let board = [];
    let mineLoc = [];

    function random(min=0, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    //random bomb location (x,y) @ board[x][y]
    for(let x=0; x<row; x++) {
        let subCol = [];
        for (let y=0; y<col; y++) {
            subCol.push({
                value: 0,
                reveal: false,
                x: x,
                y: y,
                flag: false,
            });
        }
        board.push(subCol);
    }

    let mineCount = 0;
    while (mineCount < mines) {
        let x = random(0, row - 1);
        let y = random(0, col - 1);

        if(board[x][y].value === 0) {
            board[x][y].value = 'X';
            mineLoc.push([x, y]);
            mineCount++;
        }
    }
    //mapping cell #'s
    for (let i=0; i<row; i++) {
        for(let j=0; j<col; j++) {
            if(board[i][j].value === 'X') {
                continue;
            }
            //Top
            if(i>0 && board[i-1][j].value === 'X') {
                board[i][j].value++;
            }
            //Top Right
            if(i>0 && j<col-1 && board[i-1][j+1].value === 'X') {
                board[i][j].value++;
            }
            //Right
            if(j<col-1 && board[i][j+1].value === 'X') {
                board[i][j].value++;
            }
            //Bottom Right
            if(i<row-1 && j<col-1 && board[i+1][j+1].value === 'X') {
                board[i][j].value++;
            }
            //Bottom
            if(i<row-1 && board[i+1][j].value === 'X') {
                board[i][j].value++;
            }
            //Bottom Left
            if(i<row-1 && j>0 && board[i+1][j-1].value === 'X') {
                board[i][j].value++;
            }
            //Left
            if(j>0 && board[i][j-1].value === 'X') {
                board[i][j].value++;
            }
            //Top Left
            if(i>0 && j>0 && board[i-1][j-1].value === 'X') {
                board[i][j].value++;
            }
        }
    }
    return { board, mineLoc };
};

            // switch(true) {
            //     case i>0 && board[i-1][j].value === 'X':
            //     case i>0 && j<col-1 && board[i-1][j+1].value === 'X':
            //     case j<col-1 && board[i][j+1].value === 'X':
            //     case i<row-1 && j<col-1 && board[i+1][j+1].value === 'X':
            //     case i<row-1 && board[i+1][j].value === 'X':
            //     case i<row-1 && j>0 && board[i+1][j-1].value === 'X':
            //     case j>0 && board[i][j-1].value === 'X':
            //     case i>0 && j>0 && board[i-1][j-1].value === 'X':
            //         board[i][j].value++;
            //         break;
            //     default:
            //         break;
            // }