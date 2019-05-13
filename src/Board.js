import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (<Square 
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}
              winner={this.props.winner && (this.props.winner.line.includes(i)) ? true : false}
            />);
  }
  
  renderBoard(rows, coloumns){
    let key = 0;
    let board = []
    for(let i = 0; i < rows; i++){
      let row = [];
      for(let j = 0; j < coloumns; j++){
        row.push(this.renderSquare(coloumns*i + j));
      }
      key++;
      board.push(<div key={key} className="board-row">{row}</div>);       
    }
    return board;
  }

  render() {
    return (
      <div> {this.renderBoard(3, 3)} </div>
    );
  }
}

export default Board;