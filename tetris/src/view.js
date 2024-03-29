export default class View{
    static colors = {
        '1': 'green',
        '2': 'red',
        '3': 'yellow',
        '4': 'orange',
        '5': 'blue',
        '6': 'gray',
        '7': 'purple'
    }
constructor(element, width, height, rows, columns){
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');

    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeight= this.playfieldHeight - this.playfieldBorderWidth * 2;

    this.blockWidth = this.playfieldInnerWidth /columns;
    this.blockHaight = this.playfieldInnerHeight / rows;

    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.height;

    this.element.appendChild(this.canvas);
}
renderMainScreen(state){
    this.clearScrin();
    this.renderPlayfield(state);
    this.renderPanel(state);
}
clearScrin(){
    this.context.clearRect(0, 0, this.width, this.height);
}

renderStartScreen() {
this.context.fillStyle = 'white';arguments
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
}
renderPauseScreen() {
    this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = 'white';
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Press ENTER to Pause', this.width / 2, this.height / 2);
}
renderEndScreen({score}) {
    this.clearScrin();

    this.context.fillStyle = 'white';
    this.context.font = '18px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);
    console.log("zcget");
    setTimeout(() => { console.log("World!"); }, 2000);
    // this.printRecordTable(this.height / 2 + 48, 20);
}
renderPlayfield({playfield, color}){
    for(let y = 0; y < playfield.length; y++){
        const line = playfield[y];
        for(let x = 0; x < line.length; x++){
            const block = line[x];

            if(block){
                this.renderBlock(
                    this.playfieldX + (x * this.blockWidth),
                    this.playfieldY + (y * this.blockHaight),
                    this.blockWidth,
                    this.blockHaight,
                    View.colors[block]
                    );
            }
        }
    }

    this.context.strokeStyle = 'white';
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
}
renderPanel({level, score, lines, nextPiece}){
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'white';
    this.context.font = '14px "Press Start 2P"';

    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
    this.context.fillText(`Next: `, this.panelX, this.panelY + 96);

    for(let y = 0; y < nextPiece.blocks.length; y++){
        for(let x =0; x< nextPiece.blocks[y].length; x++){
            const block = nextPiece.blocks[y][x];

            if (block){
                this.renderBlock(
                    this.panelX + (x * this.blockWidth * 0.5),
                    this.panelY + 130 + (y * this.blockHaight * 0.5),
                    this.blockWidth * 0.5,
                    this.blockHaight * 0.5,
                    View.colors[block]
                )
            }
        }
    }
}


    printRecordTable(stepPX, n){
        this.context.fillStyle = 'white';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        let records = [];

        for(let i = 0; i < localStorage.length % 10; i++){
            let name = localStorage.key(i);
            if(name === 'null')
                continue;
            let score = localStorage.getItem(name);
            records.push({name, score});
        }
        console.log("aaaa");
        records.sort((a, b) =>{
            return parseInt(b.score) - parseInt(a.score);
        });
        records.forEach((record) => {
            this.context.fillText(record.name, this.width / 2, stepPX * ++n);
            this.context.fillText(record.score, this.width / 2, stepPX * n);
            console.log("bbb");
        })

    }

renderBlock(x, y, width, height, color){
    this.context.fillStyle = color;
        this.context.lineWidth = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);

}

}