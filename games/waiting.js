class Waiting {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state;
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
        //console.log(levels.draw());
        return this.state;
    }
}