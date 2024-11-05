"use client";
import { useCallback, useEffect, useState } from "react"

export default function Game () {

const [matrix, setMatrix] = useState(Array(9).fill(null));
const [isXTurn, setIsXTurn] = useState(true);
const [won, setWon] = useState(null);

const handleUserClick = (e:any) => {
  const pos = e.target.getAttribute("data-id");
    // Agar koi player jeet chuka hai ya cell pehle se bhara hua hai, to click ignore karein
    if (won || matrix[pos]) return;
  // X, O, X, O, X
  const copyMatrix = [...matrix];
  copyMatrix[pos] = isXTurn ? `X` : `O`;
  setMatrix(copyMatrix);
  setIsXTurn((prevTurn) => !prevTurn)
}
const decideWinner = useCallback(() => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
      setWon(matrix[a]);
      return;
    }
  }
},[matrix]);

useEffect(() => {
  decideWinner();
}, [matrix, decideWinner]);

const hanleReset = () => {
  setMatrix(Array(9).fill(null));
  setWon(null);
  setIsXTurn(true);
}
  return (
    <div className="flex flex-col justify-center items-center bg-sky-300 w-screen h-screen">
      <h1 className="md:text-4xl text-3xl font-bold mb-10 font-serif text-blue-950">Tic Toc Toe</h1>
      <div className="grid grid-cols-3 grid-rows-3 text-center justify-center items-center cursor-pointer	text-white"
      onClick={handleUserClick}
      >
      {
        matrix.map((item, index) => (
          <div
          data-id={index}
          className="h-20 w-20 flex justify-center items-center text-3xl bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white border-solid border-white border"
          key={index}
          >{item}</div>
        ))
      }
      </div>

      <div className="flex flex-col justify-center items-center text-lg pt-5 space-y-2 font-semibold">
        <button
        onClick={hanleReset}
        className="bg-blue-950 text-white px-6 py-2 rounded-xl border-solid border-white border-2">Reset</button>
        <div>Next Player  :  <span className="text-red-500 bg-white text-center px-2 py-1 rounded-xl "> {isXTurn ? `X` : `O`} </span></div>
        {won && <div className="text-blue-800 bg-white px-3 py-2 text-xl rounded-full">Player <span className="text-green-600"> {won} </span> the Game</div>}
      </div>
    </div>
  )
}