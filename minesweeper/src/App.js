import React from 'react';
import './App.css';
import Board from "./components/Board";

const style = {
  display : 'flex',
  flexDirection : 'row',
  width : 'fit-content',
  color : 'white',
}

export default function App() {
  return (
    <div style = {style}>
      <h1>MINESWEEPER</h1>
      <div>
        <Board />
      </div>
    </div>
  );
}

