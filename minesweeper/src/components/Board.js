import React, { useEffect, useState } from "react";
import GenBoard from '../util/GenBoard';
import Cell from './Cell';
import { revealed } from '../util/Reveal';

export default function Board() {
    const [grid, setGrid] = useState([]);
    const [mineLoc, setMineLoc] = useState([]);
    const [emptyCount, setEmptyCount] = useState(0);
    const [message, setMessage] = useState('');
    const style = {
        display : 'flex',
        flexDirection : 'row',
        width : 'fit-content',
        color : 'white',
    }
    useEffect(() => {
        createBoard()
    }, []);

    const createBoard = () => {
        const newBoard = GenBoard(10,10,20);
        setEmptyCount(10*10-20);
        setMineLoc(newBoard.mineLoc);
        setGrid(newBoard.board);
    }

    const updateFlag=(e,x,y)=>{
        e.preventDefault();
        // deep copy of the object
        let newGrid=JSON.parse(JSON.stringify(grid));
        newGrid[x][y].flagged=true;
        console.log(newGrid[x][y]);
        setGrid(newGrid);
    }
    const newBoard=()=>{
        createBoard();
    }
    const revealCell=(x,y)=>{
        let newGrid=JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value==="X"){
            setMessage(' Clicked on Mine ,Try Again');
            for(let i=0;i<mineLoc.length;i++){
                newGrid[mineLoc[i][0]][mineLoc[i][1]].revealed=true;
            }
            setGrid(newGrid);
            setTimeout(newBoard,500);
        }
        if(emptyCount===0){
            setMessage('Wohoo!!,You won');
            setTimeout(newBoard,500);
        }
        else{
            let revealedBoard=revealed(newGrid,x,y,emptyCount);
            setGrid(revealedBoard.arr);
            setEmptyCount(revealedBoard.newNonMines);
        }
        
    }
    
    return (
        <div className="parent">
            <div>
                <h3 style={{color:'black',textAlign:'center',fontSize:'30px',margin:'0px'}}>Empty Cells - {emptyCount}</h3>
                {/* <ToastContainer></ToastContainer> */}
                {grid.map((singlerow,index1)=>{
                    return (
                        <div style={style} key={index1}>
                            {singlerow.map((singlecol,index2)=>{
                            return  <Cell details={singlecol} key={index2} updateFlag={updateFlag} revealCell={revealCell}/>
                            })}
                        </div>
                    )
                })}
                <h3 style={{color:'black',textAlign:'center',fontSize:'30px',margin:'0px'}}>{message}</h3>
            </div>
        </div>
    ) 
};


