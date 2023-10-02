export default class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.intervaiId = null;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.view.renderStartScreen();
    }

    update(){
        this.game.movePieceDown();
        this.updateView();
    }

    play(){
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause(){
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    reset(){
        this.stopTimer();
        this.game.clearGame();
        this.play();
    }

    updateView(){
        const state = this.game.getState();
        if(state.isGameOver){
            this.stopTimer();
            name = localStorage.getItem("username");
            localStorage.removeItem('username');
            localStorage.setItem(name, game.score + '');
            console.log("renderEndScreen");
            this.view.renderEndScreen(state);
            //return;
        }
        if(!this.isPlaying){
            this.view.renderPauseScreen();
        }
        else{
            this.view.renderMainScreen(state);
        }
    }
    startTimer(){
        const speed = 1000 - this.game.getState().level * 10;
        if(!this.intervaiId){
            this.intervaiId = setInterval(() =>{
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }
    stopTimer(){
        if(this.intervaiId){
            clearInterval(this.intervaiId);
            this.intervaiId = null;
        }
    }
    handleKeyDown(event){
        const state = this.game.getState();
        if(state.isGameOver && event.keyCode !== 13)
            return;
        switch(event.keyCode){
            case 13: //Enter
                if(state.isGameOver){
                    this.reset();
                } else if(this.isPlaying){
                    this.pause();
                }
                else{
                    this.play();
                }
                break;
            case 37: // LEFT
                this.game.movePieceLeft();
                this.updateView();
            break;
            case 38: // UP
                this.game.turnPiece();
                this.updateView();
            break;
            case 39: // RIGHT
                this.game.movePieceRidht();
                this.updateView();
            break;
            case 40: // DOWN
                this.stopTimer();
                this.game.movePieceDown();
                this.updateView();
            break;
        }
    }

    handleKeyUp(){
        switch(event.keyCode){
            case 40: // DOWN
                this.startTimer();
            break;
        }
    }
}