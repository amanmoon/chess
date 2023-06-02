import { Component, OnInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css'],
})
export class GamepageComponent implements OnInit {
  playercolour: string | null = 'white';
  opponentcolour: string | null = 'black';
  moveRow: number = 0;
  select: boolean = false;
  initialRow: number = 8;
  initialCol: number = 8;
  initialPiece: string = ' ';
  defaultcolour: boolean = true;
  hasKingMoved: boolean = false;
  hasKingSideRookMoved: boolean = false;
  hasQueenSideRookMoved: boolean = false;
  hasCatseled: boolean = false;
  ngOnInit() {
    if (this.playercolour === 'white') {
      this.opponentcolour = 'black';
    } else {
      this.opponentcolour = 'white';
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
    if (this.select === false || piece.split('_')[0] === this.playercolour) {
      this.initialRow = row;
      this.initialCol = col;
      this.initialPiece = piece;
      this.validmovebgcolourremover(this.moveValidator);
      this.pieceselected(this.initialRow, this.initialCol, piece);
    } else {
      this.validmovebgcolourremover(this.moveValidator);

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
    this.defaultcolour = false;
    if (piece.split('_')[0] != this.playercolour) {
      return;
    }
    switch (piece) {
      case this.playercolour + '_pawn':
        this.pawn(row, col);
        break;
      case this.playercolour + '_rook':
        this.rook(row, col);
        break;
      case this.playercolour + '_knight':
        this.knight(row, col);
        break;
      case this.playercolour + '_bishop':
        this.bishop(row, col);
        break;
      case this.playercolour + '_queen':
        this.queen(row, col);
        break;
      case this.playercolour + '_king':
        this.king(row, col);
        break;
    }
    this.validmovebgcolour(this.moveValidator);

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
    if (
      piece.split('_')[1] === 'king' &&
      this.hasKingSideRookMoved == false &&
      this.hasCatseled === false &&
      this.hasKingMoved === false &&
      ((row === 7 && col === 1) || (row === 7 && col === 2))
    ) {
      for (let i = 0; i < this.moveValidator.length; i++) {
        if (
          row === this.moveValidator[i][0] &&
          col === this.moveValidator[i][1]
        ) {
          this.chessboard[initialRow][initialCol] = ' ';
          this.chessboard[row][col] = piece;
          if (piece.split('_')[0] === 'white') {
            this.chessboard[7][0] = ' ';
            this.chessboard[7][3] = this.playercolour + '_rook';
          } else {
            this.chessboard[7][0] = ' ';
            this.chessboard[7][2] = this.playercolour + '_rook';
          }
          this.hasCatseled = true;

          this.select = false;
        } else {
          this.pieceselected;
        }
      }
    } else if (
      this.hasQueenSideRookMoved === false &&
      this.hasKingMoved === false &&
      this.hasCatseled === false &&
      piece.split('_')[1] === 'king' &&
      ((row === 7 && col === 6) || (row === 7 && col === 5))
    ) {
      for (let i = 0; i < this.moveValidator.length; i++) {
        if (
          row === this.moveValidator[i][0] &&
          col === this.moveValidator[i][1]
        ) {
          this.chessboard[initialRow][initialCol] = ' ';
          this.chessboard[row][col] = piece;
          if (piece.split('_')[0] === 'white') {
            this.chessboard[7][7] = ' ';
            this.chessboard[7][5] = this.playercolour + '_rook';
          } else {
            this.chessboard[7][7] = ' ';
            this.chessboard[7][4] = this.playercolour + '_rook';
          }
          this.hasCatseled = true;
          this.select = false;
        } else {
          this.pieceselected;
        }
      }
    } else {
      for (let i = 0; i < this.moveValidator.length; i++) {
        if (
          row === this.moveValidator[i][0] &&
          col === this.moveValidator[i][1]
        ) {
          this.chessboard[initialRow][initialCol] = ' ';
          this.chessboard[row][col] = piece;
          this.select = false;
          if (piece === this.playercolour + '_king') {
            this.hasCatseled = true;
          }
        } else {
          this.pieceselected;
        }
      }
    }
    if (
      piece === this.playercolour + '_rook' &&
      this.initialCol === 0 &&
      this.initialRow === 7
    ) {
      this.hasKingSideRookMoved = true;
      console.log('king');
    } else if (
      piece === this.playercolour + '_rook' &&
      this.initialCol === 7 &&
      this.initialRow === 7
    ) {
      console.log('queen');
      this.hasQueenSideRookMoved = true;
    }
  }
  constructor(private renderer: Renderer2) {}

  // changing colour of give square in chessboard
  validmovebgcolour(validmove: number[][]) {
    for (let i = 0; i < validmove.length; i++) {
      let divElement = document.getElementById(
        validmove[i][0].toString() + validmove[i][1].toString()
      );
      if (divElement) {
        let childElement = divElement.firstChild;
        if (childElement) {
          this.renderer.addClass(childElement, 'dot');
        }
      }
    }
  }
  validmovebgcolourremover(validmove: number[][]) {
    for (let i = 0; i < validmove.length; i++) {
      let divElement = document.getElementById(
        validmove[i][0].toString() + validmove[i][1].toString()
      );
      if (divElement) {
        let childElement = divElement.firstChild;
        if (childElement) {
          this.renderer.removeClass(childElement, 'dot');
        }
      }
    }
  }

  // moves of pieces and array validation
  moveValidator: number[][] = [];
  pawn(row: number, col: number) {
    this.moveValidator = [];

    // Check for capturing moves
    const captureMoves = [
      [row - 1, col - 1],
      [row - 1, col + 1],
    ];
    for (const move of captureMoves) {
      const [captureRow, captureCol] = move;
      if (
        captureRow >= 0 &&
        captureRow < this.chessboard.length &&
        captureCol >= 0 &&
        captureCol < this.chessboard[captureRow].length
      ) {
        if (
          this.chessboard[captureRow][captureCol] !== ' ' &&
          this.chessboard[captureRow][captureCol].split('_')[0] !==
            this.playercolour
        ) {
          this.moveValidator.push([captureRow, captureCol]);
        }
      }
    }

    // Check for regular pawn moves
    if (row === 6) {
      for (let a = row - 1; a >= row - 2; a--) {
        if (this.chessboard[a][col] !== ' ') {
          break;
        }
        this.moveValidator.push([a, col]);
      }
    } else {
      for (let a = row - 1; a >= row - 1; a--) {
        if (this.chessboard[a][col] !== ' ') {
          break;
        }
        this.moveValidator.push([a, col]);
      }
    }

    return this.moveValidator;
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
      if (this.chessboard[a][col].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the downward direction
    for (let a = row + 1; a <= 7; a++) {
      if (this.chessboard[a][col].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the left direction
    for (let a = col - 1; a >= 0; a--) {
      if (this.chessboard[row][a].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, a]);
      if (this.chessboard[row][a].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the right direction
    for (let a = col + 1; a <= 7; a++) {
      if (this.chessboard[row][a].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, a]);
      if (this.chessboard[row][a].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    return this.moveValidator;
  }

  bishop(row: number, col: number) {
    this.moveValidator = [];

    // Check valid moves in the upward-left direction
    for (let a = row - 1, b = col - 1; a >= 0 && b >= 0; a--, b--) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the upward-right direction
    for (let a = row - 1, b = col + 1; a >= 0 && b <= 7; a--, b++) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the downward-left direction
    for (let a = row + 1, b = col - 1; a <= 7 && b >= 0; a++, b--) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the downward-right direction
    for (let a = row + 1, b = col + 1; a <= 7 && b <= 7; a++, b++) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
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
        if (
          this.chessboard[newRow][newCol].split('_')[0] !== this.playercolour
        ) {
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
      if (this.chessboard[a][col].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the downward direction
    for (let a = row + 1; a <= 7; a++) {
      if (this.chessboard[a][col].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, col]);
      if (this.chessboard[a][col].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the left direction
    for (let b = col - 1; b >= 0; b--) {
      if (this.chessboard[row][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, b]);
      if (this.chessboard[row][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the right direction
    for (let b = col + 1; b <= 7; b++) {
      if (this.chessboard[row][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([row, b]);
      if (this.chessboard[row][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the upward-left direction
    for (let a = row - 1, b = col - 1; a >= 0 && b >= 0; a--, b--) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the upward-right direction
    for (let a = row - 1, b = col + 1; a >= 0 && b <= 7; a--, b++) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the downward-left direction
    for (let a = row + 1, b = col - 1; a <= 7 && b >= 0; a++, b--) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
        break;
      }
    }

    // Check valid moves in the downward-right direction
    for (let a = row + 1, b = col + 1; a <= 7 && b <= 7; a++, b++) {
      if (this.chessboard[a][b].split('_')[0] === this.playercolour) {
        break;
      }
      this.moveValidator.push([a, b]);
      if (this.chessboard[a][b].split('_')[0] === this.opponentcolour) {
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
        if (
          this.chessboard[newRow][newCol].split('_')[0] !== this.playercolour
        ) {
          this.moveValidator.push([newRow, newCol]);
        }
      }
    }

    // Check for castling moves
    if (
      this.hasCatseled === false &&
      this.hasQueenSideRookMoved === false &&
      this.chessboard[row][col + 2] === ' ' &&
      this.chessboard[row][col + 1] === ' ' &&
      (this.chessboard[row][col + 3] === this.playercolour + '_rook' ||
        this.chessboard[row][col + 3] === ' ')
    ) {
      this.moveValidator.push([row, col + 2]);
    }

    if (
      this.hasCatseled === false &&
      this.hasKingSideRookMoved === false &&
      this.chessboard[row][col - 2] === ' ' &&
      this.chessboard[row][col - 1] === ' ' &&
      (this.chessboard[row][col - 3] === this.playercolour + '_rook' ||
        this.chessboard[row][col - 3] === ' ')
    ) {
      this.moveValidator.push([row, col - 2]);
    }

    return this.moveValidator;
  }
}
