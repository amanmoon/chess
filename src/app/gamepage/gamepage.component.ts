import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css'],
})
export class GamepageComponent implements OnInit {
  playercolour: string | null = 'black';
  opponentcolour: string | null = 'black';  
  moveRow: number = 0;
  select: boolean = false;
  initialRow: number = 0;
  initialCol: number = 0;
  initialPiece: string = ' ';
  defaultcolour: boolean = true;
  ngOnInit() {
    if (this.playercolour === "white") {
      this.opponentcolour="black"
    } else {
      this.opponentcolour="white"
    }
    if (this.playercolour === 'black') {
      this.reverse2DArrayInPlace(this.chessboard);
    }
  }
  reverse2DArrayInPlace<T>(array: T[][]) {
    array.forEach((row) => row.reverse());
    array.reverse();
  }
  chessboard = [
    [
      'black_rook',
      'black_knight',
      'black_bishop',
      'black_queen',
      'black_king',
      'black_bishop',
      'black_knight',
      'black_rook',
    ],
    [
      'black_pawn',
      'black_pawn',
      'black_pawn',
      'black_pawn',
      'black_pawn',
      'black_pawn',
      'black_pawn',
      'black_pawn',
    ],

    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [
      'white_pawn',
      'white_pawn',
      'white_pawn',
      'white_pawn',
      'white_pawn',
      'white_pawn',
      'white_pawn',
      'white_pawn',
    ],
    [
      'white_rook',
      'white_knight',
      'white_bishop',
      'white_queen',
      'white_king',
      'white_bishop',
      'white_knight',
      'white_rook',
    ],
  ];

  assemblePieces(row: number, col: number) {
    if (this.chessboard[row][col] == ' ') {
      let imagepath = '../../assets/HD_transparent_picture.png';
      return imagepath;
    } else {
      let imagepath = '../../assets/' + this.chessboard[row][col] + '.png';
      return imagepath;
    }
  }
  moveOrPieceSelect(row: number, col: number, piece: string) {
    if (this.select === false) {
      this.initialRow = row;
      this.initialCol = col;
      this.initialPiece = piece;
      this.pieceselected(this.initialRow, this.initialCol, piece);
    } else {
      this.movePieces(
        row,
        col,
        this.initialRow,
        this.initialCol,
        this.initialPiece
      );
    }
  }
  pieceselected(row: number, col: number, piece: string) {
    this.defaultcolour=false
    // if the selected piece is not players piece return 0
    if (piece.split('_')[0] != this.playercolour) {
      return;
    }
    switch (piece) {
      case this.playercolour + '_pawn':
        this.pawn(row, col);
        break;
      case this.playercolour + '_rook':
        this.rook(row, col)
        break;
      case this.playercolour + '_knight':
        this.knight(row, col)
        break;
      case this.playercolour + '_bishop':
        this.bishop(row, col)
        break;
      case this.playercolour + '_queen':
        this.queen(row, col)
        break;
      case this.playercolour + '_king':
        this.king(row, col)
        break;
    }
    this.select = true;
  }

  // move pieces
  movePieces(
    row: number,
    col: number,
    initialRow: number,
    initialCol: number,
    piece: string
  ) {
    for (let i = 0; i < this.moveValidator.length; i++) {
      if (row === this.moveValidator[i][0] && col===this.moveValidator[i][1]) {
        this.chessboard[initialRow][initialCol] = ' ';
        this.chessboard[row][col] = piece;
        this.select = false;
      } else {
        this.pieceselected
      }
    }
  }
  
  // changing colour of give square in chessboard
  bGColour(row: number, col: number,) {

  }

  moveValidator: number[][] = [];
  // moves of pieces and array validation
  pawn(row: number, col: number) {
  this.moveValidator=[]
    if (row === 6) {
      for (let a = row-1; a >= row - 2; a--) {
        if (this.chessboard[a][col] != ' ') {
          break;
        }
        this.moveValidator.push([a, col]);
      }
    } else {
      for (let a = row-1; a >= row - 1; a--) {
        if (this.chessboard[a][col] != ' ') {
          break;
        }
        this.moveValidator.push([a, col]);
      }
    }
    return this.moveValidator
  }


  oddeven(row: number, col: number) {
    if ((row + col) % 2 == 1) {
      return true;
    } else {
      return false;
    }
  }

  rook(row: number, col: number) {
    this.moveValidator = [];
  
    // Check valid moves in the upward direction
    for (let a = row - 1; a >= 0; a--) {
      if (this.chessboard[a][col].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the downward direction
    for (let a = row + 1; a <= 7; a++) {
      if (this.chessboard[a][col].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the left direction
    for (let a = col - 1; a >= 0; a--) {
      if (this.chessboard[row][a].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, a]);
      if (this.chessboard[row][a].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the right direction
    for (let a = col + 1; a <= 7; a++) {
      if (this.chessboard[row][a].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, a]);
      if (this.chessboard[row][a].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    return this.moveValidator;
  }
  
  bishop(row: number, col: number) {
    this.moveValidator = [];
  
    // Check valid moves in the upward-left direction
    for (let a = row - 1, b = col - 1; a >= 0 && b >= 0; a--, b--) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the upward-right direction
    for (let a = row - 1, b = col + 1; a >= 0 && b <= 7; a--, b++) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the downward-left direction
    for (let a = row + 1, b = col - 1; a <= 7 && b >= 0; a++, b--) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the downward-right direction
    for (let a = row + 1, b = col + 1; a <= 7 && b <= 7; a++, b++) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    return this.moveValidator;
  }
  
  knight(row: number, col: number) {
    this.moveValidator = [];
  
    const moves = [
      [-2, -1], // Two squares up, one square left
      [-2, 1], // Two squares up, one square right
      [-1, -2], // One square up, two squares left
      [-1, 2], // One square up, two squares right
      [1, -2], // One square down, two squares left
      [1, 2], // One square down, two squares right
      [2, -1], // Two squares down, one square left
      [2, 1], // Two squares down, one square right
    ];
  
    for (const [dx, dy] of moves) {
      const newRow = row + dx;
      const newCol = col + dy;
  
      if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
        if (this.chessboard[newRow][newCol].split("_")[0] !== this.playercolour) {
          this.moveValidator.push([newRow, newCol]);
        }
      }
    }
  
    return this.moveValidator;
  }
  
  queen(row: number, col: number) {
    this.moveValidator = [];
  
    // Check valid moves in the upward direction
    for (let a = row - 1; a >= 0; a--) {
      if (this.chessboard[a][col].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the downward direction
    for (let a = row + 1; a <= 7; a++) {
      if (this.chessboard[a][col].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the left direction
    for (let b = col - 1; b >= 0; b--) {
      if (this.chessboard[row][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, b]);
      if (this.chessboard[row][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the right direction
    for (let b = col + 1; b <= 7; b++) {
      if (this.chessboard[row][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, b]);
      if (this.chessboard[row][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the upward-left direction
    for (let a = row - 1, b = col - 1; a >= 0 && b >= 0; a--, b--) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the upward-right direction
    for (let a = row - 1, b = col + 1; a >= 0 && b <= 7; a--, b++) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the downward-left direction
    for (let a = row + 1, b = col - 1; a <= 7 && b >= 0; a++, b--) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    // Check valid moves in the downward-right direction
    for (let a = row + 1, b = col + 1; a <= 7 && b <= 7; a++, b++) {
      if (this.chessboard[a][b].split("_")[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split("_")[0] === this.opponentcolour) {
        break;
      }
    }
  
    return this.moveValidator;
  }
  
  king(row: number, col: number) {
    this.moveValidator = [];
  
    const directions = [
      [-1, -1], // Up-Left
      [-1, 0], // Up
      [-1, 1], // Up-Right
      [0, -1], // Left
      [0, 1], // Right
      [1, -1], // Down-Left
      [1, 0], // Down
      [1, 1], // Down-Right
    ];
  
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
  
      if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
        if (this.chessboard[newRow][newCol].split("_")[0] !== this.playercolour) {
          this.moveValidator.push([newRow, newCol]);
        }
      }
    }
  
    return this.moveValidator;
  }
  
}
