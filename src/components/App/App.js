import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Square from "./Square";

const BoardContainer = styled.div`
  display: flex;
  margin: 20px 50px;
`;

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

const Title = styled.h1``;
const GameStatus = styled.div``;

const GameResult = styled.div`
  margin-left: 20px;
  border: 1px solid;
  padding: 8px;
  border-radius: 8px;
`;

const BoardField = styled.div`
  margin-left: 20px;
`;

const RestartButton = styled.button`
  margin-left: 20px;
  margin-top: 20px;
  padding: 8px;
  cursor: pointer;
`;

const BoardSize = 19;

function Board() {
  const [grid, setGrid] = useState(
    Array(BoardSize).fill(Array(BoardSize).fill(null))
  );
  const [winner, setWinner] = useState(null);
  const blackIsNext = useRef(false);
  const currentX = useRef();
  const currentY = useRef();

  function handlePieceClick(x, y) {
    currentX.current = x;
    currentY.current = y;
    updateBoard();
  }

  function updateBoard() {
    setGrid((grid) => {
      return grid.map((row, y) => {
        if (y !== currentY.current) return row;
        return row.map((col, x) => {
          if (x !== currentX.current) return col;
          return (x = blackIsNext.current ? "black" : "white");
        });
      });
    });
  }

  useEffect(() => {
    if (!currentX.current && !currentY.current) return;
    calWinner(grid, currentX.current, currentY.current);

    function calWinner(grid, x, y) {
      if (
        countPiece(grid, x, y, -1, 0) + countPiece(grid, x, y, 1, 0) >= 4 ||
        countPiece(grid, x, y, 0, -1) + countPiece(grid, x, y, 0, 1) >= 4 ||
        countPiece(grid, x, y, 1, 1) + countPiece(grid, x, y, -1, -1) >= 4 ||
        countPiece(grid, x, y, -1, 1) + countPiece(grid, x, y, 1, -1) >= 4
      ) {
        return setWinner(grid[y][x]);
      }
    }
  }, [grid]);

  function countPiece(grid, x, y, directionX, directionY) {
    let totalPieces = 0;
    let findX = x + directionX;
    let findY = y + directionY;

    while (grid[findY] && grid[findY][findX] === grid[y][x]) {
      findX = findX + directionX;
      findY = findY + directionY;
      totalPieces++;
    }
    return totalPieces;
  }

  function handleRestartClick() {
    window.location.reload();
  }

  return (
    <BoardContainer>
      <Title>五子棋</Title>
      <BoardField>
        {grid.map((row, y) => {
          return (
            <BoardRow key={y}>
              {row.map((col, x) => {
                return (
                  <Square
                    key={x}
                    x={x}
                    y={y}
                    blackIsNext={blackIsNext}
                    handlePieceClick={handlePieceClick}
                    winner={winner}
                  />
                );
              })}
            </BoardRow>
          );
        })}
      </BoardField>
      <GameStatus>
        {(winner && <GameResult>贏家: {winner}</GameResult>) ||
          (!winner && (
            <GameResult>
              Next Player: {blackIsNext.current ? "White" : "Black"}
            </GameResult>
          ))}
        <RestartButton onClick={handleRestartClick}>重新開始遊戲</RestartButton>
      </GameStatus>
    </BoardContainer>
  );
}

export default Board;
