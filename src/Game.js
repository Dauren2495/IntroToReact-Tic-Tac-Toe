import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      moves: [[]],
    };
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    
    if(this.calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const move = [[(i / 3) >> 0, i % 3]];

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      moves: moves.concat(move),
      reverse: false,
    });
  }
  
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner = {};
    for(let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        winner.type = squares[a];
        winner.line = lines[i];
        return winner;
      }
    }
    return null;
  }
  
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });    
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves_ = this.state.moves;

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move (' + moves_[move][0] + ',' + moves_[move][1] + ') => ' + (move % 2 ? 'X' : 'O')
        :'Go to game start';
      return (
        <li key={move} >
           <button className={move === this.state.stepNumber ? 'line' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>   
        </li>
      );     
    });
    if(this.state.reverse){
      console.log("trueeeeee");
      moves.reverse();
    }
    else{
      console.log("falseeeee");
    }

    let status;
    if(winner){
      status = 'Winner: ' + winner.type;
    }
    else if(this.state.stepNumber === 9){
      status = 'End of the game. Draw';
    }
    else{
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
           />
           <button onClick={() => this.setState({reverse: !this.state.reverse})}> Toggle </button>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
