class Waiting {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.wait;
        this.play;
    }

    draw(){
        fill(0, 102, 153);
        text("Even wachten", 100,30);
        //console.log("oei");
    }

    changeState(){
        this.wait = false;
        this.play = true;
    }

    getState(){
        return this.state;
    }
}