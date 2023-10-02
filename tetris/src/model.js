export default class Game{
    static points ={
        '1': 50,
        '2': 100,
        '3': 500,
        '4': 3200
    }

    sizeX = 10;
    sizeY = 20;
    constructor(){
        this.score = 0;
        this.lines = 0;
        this.level = 0;
        this.end = false;
        this.playfield = this.createPlayfield();
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();
    }

   getState() {
    const playfield = this.createPlayfield();
    this.copyPlayfield(playfield);
    this.copyActivePiece(playfield);
    return{
        score: this.score,
        level: this.level,
        lines: this.lines,
        nextPiece: this.nextPiece,
        color : this.activePiece.color,
        playfield,
        isGameOver: this.end
    }
   }
   clearGame(){
       this.score = 0;
       this.lines = 0;
       this.level = 0;
       this.end = false;
       this.playfield = this.createPlayfield();
       this.activePiece = this.createPiece();
       this.nextPiece = this.createPiece();
   }
   createPlayfield(){
    const playfield = [];
    for(let y =0; y < this.sizeY ; y++){
        playfield[y] = [];
        for(let x = 0; x < this.sizeX; x++){
            playfield[y][x] = 0;
        }

    }
    return playfield;
   }
   copyPlayfield(playfield){
    for(let y = 0; y < this.playfield.length; y++){
        for(let x = 0; x < this.playfield[y].length; x++){
            playfield[y][x] = this.playfield[y][x];
        }
    }

   }
   copyActivePiece(playfield){
    for(let y = 0; y < this.activePiece.blocks.length; y++){
        for(let x = 0; x < this.activePiece.blocks[y].length; x++){
            if(this.activePiece.blocks[y][x]){
                playfield[y + this.activePiece.y][x + this.activePiece.x] = this.activePiece.blocks[y][x];
            }
        }
    }
   }
   movePieceLeft(){
    this.activePiece.x -= 1;
    if (this.checkException()){
        this.activePiece.x += 1;
    }
   }

   movePieceRidht(){
    this.activePiece.x += 1;
    if (this.checkException()){
        this.activePiece.x -= 1;
    }
   }

   movePieceDown(){
    if(this.end) return;
    this.activePiece.y +=1;
    if (this.checkException()){
        this.activePiece.y -= 1;
        this.DrawPiece();
        const clearedLines = this.clearLines();
        this.updatePoints(clearedLines);
        this.updatePieces();
    }
    if(this.checkException()){
        this.end = true;
    }
   }

   movePieceUp(){
    this.activePiece.y -=1;
    if (this.checkException()){
        this.activePiece.y += 1;
    }
   }

   checkException(){
    for(let y = 0; y < this.activePiece.blocks.length; y++){
        for(let x = 0; x < this.activePiece.blocks[y].length;x++){
            if(
                this.activePiece.blocks[y][x] &&
                (((this.activePiece.y + y) < 0 || (this.activePiece.y + y)>= this.sizeY ||
                (this.activePiece.x + x) < 0 || (this.activePiece.x + x)>= this.sizeX )||
                this.playfield[this.activePiece.y + y][this.activePiece.x + x])
                ){
                return true;
            }
        }
    }
    return false;
   }
   turnPiece(){
    const blocks = this.activePiece.blocks;
    const temp = [];
    for(let i = 0; i< blocks.length ;i++){
        temp[i] = new Array(blocks.length).fill(0);
    }

    for (let y =0; y < blocks.length; y++){
        for (let x =0; x < blocks.length; x++){
            temp[x][y] = blocks[blocks.length - 1 -y][x];
        }
    }
    this.activePiece.blocks = temp;

    if(this.checkException()){
        this.activePiece.blocks = blocks;
    }
   }
   DrawPiece(){
    for(let y = 0; y < this.activePiece.blocks.length; y++){
        for(let x = 0; x < this.activePiece.blocks[y].length;x++){
            if(this.activePiece.blocks[y][x]){
                this.playfield[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks[y][x];
            }
        }
    }
   }

   clearLines(){
    let lines = [];
    for (let y = this.sizeY - 1; y >= 0; y--){
        let numberCell = 0;

        for (let x = 0; x < this.sizeX; x++){
            if(this.playfield[y][x]){
                numberCell +=1 ;
            }
        }
        if(numberCell === 0){
            break;
        }else if(numberCell<this.sizeX){
            continue;
        }else {
            lines.unshift(y);
        }
    }

    for(let index of lines){
        this.playfield.splice(index, 1);
        this.playfield.unshift(new Array(this.sizeX).fill(0));
    }
    return lines.length;
   }
   
   updatePoints(clearLines){
    if(clearLines > 0){
        this.score += Game.points[clearLines] * (this.level + 1);
        this.lines += clearLines;
        this.level = Math.round(this.lines/10);
    }
   }

   createPiece(){
    const index = Math.floor(Math.random() * 7);
    const piece = {x: 0, y: 0};
    switch (index){
        case 0:
            piece.color = 'green';
            piece.blocks =  [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ];
            break;
        case 1:
            piece.color = 'red';
            piece.blocks =  [
                [0, 0, 2],
                [0, 0, 2],
                [0, 2, 2]
            ]; 
            break;
        case 2:
            piece.color = 'yellow';
            piece.blocks =  [
                [3,3],
                [3,3]
            ]; 
            break;
        case 3:
            piece.color = 'orange';
            piece.blocks =  [
                [4, 0, 0],
                [4, 0, 0],
                [4, 4, 0]
            ]; 
            break;
        case 4:
            piece.color = 'blue';
            piece.blocks = [
                [0, 0, 0, 0],
                [5, 5, 5, 5],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            break;
        case 5:
            piece.color = 'gray'
            piece.blocks =  [
                [0, 0, 0],
                [6, 6, 0],
                [0, 6, 6]
            ];
            break;
        case 6:
            piece.color = 'purple';
            piece.blocks =  [
                [7, 0, 0],
                [7, 7, 0],
                [7, 0, 0]
            ];
            break;
        default :
            throw new Error('Нет такой фигуры');
    }
    piece.x = Math.floor((this.sizeX - piece.blocks[0].length)/2);
    return piece;
  }
   updatePieces(){
    this.activePiece =this.nextPiece;
    this.nextPiece =this.createPiece();
   }

}