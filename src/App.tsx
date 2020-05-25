import * as React from "react";
import './index.css';
import  './App.css'

type AppProp = { value: string, onClick: () => void };
type AppState = { value: string | null };
class Square extends React.Component<AppProp, AppState> {

  render() {

    return (
      <button className="square"
        onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }

  //#region Private 


  //#endregion

}

type BoardProp = { squares: string[] };
type Boarddtate = { squares: string[], xIsNext: boolean };
class Board extends React.Component<BoardProp, Boarddtate> {

  constructor(props: Readonly<BoardProp>) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    console.log('Boom')
  }

  renderSquare(i: number) {
    return <Square value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />;
  }

  render() {
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <h3 className="header">Tic-Tac-Toe</h3>  
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  private calculateWinner(squares: string[]) {

    const possibleCombinationLines = this.getPossbileCombinationLines();

    for (let i = 0; i < possibleCombinationLines.length; i++) {
      if (this.isWinnerLineFormed(squares, possibleCombinationLines[i]) === true) {
        return squares[possibleCombinationLines[i][0]];
      }
    }

    return null;

  }

  private isWinnerLineFormed(squares: string[], currentLine: number[]) {
    const [a, b, c] = currentLine;

    return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
  }

  private getPossbileCombinationLines() {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

}

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={[]} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

