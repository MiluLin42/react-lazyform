import React, { useState } from "react";
import styled from "styled-components";

const SquareField = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;

  &:focus {
    outline: none;
  }
`;

const PiecePlayer = styled.div`
  box-sizeing: border-box;
  z-index: 1;
  width: 85%;
  height: 85%;
  transform: scale(0.95);
  border-radius: 50%;
  cursor: pointer;

  ${(props) =>
    props.$color === "black" &&
    `
    background : black;
    border: 2px solid black;
  `}
  ${(props) =>
    props.$color === "white" &&
    `
    background : white;
    border: 2px solid black;
  `};
`;

export default function Square({
  x,
  y,
  blackIsNext,
  winner,
  handlePieceClick,
}) {
  const [color, setColor] = useState(null);

  function handleClick() {
    if (color) return;
    if (winner) return;
    blackIsNext.current ? setColor("white") : setColor("black");
    blackIsNext.current = !blackIsNext.current;
    handlePieceClick(x, y);
  }
  return (
    <SquareField onClick={handleClick}>
      <PiecePlayer $color={color} />
    </SquareField>
  );
}
