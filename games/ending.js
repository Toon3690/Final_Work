class Ending {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state;
    }

    draw(){
        fill(0, 102, 153);
        text("het is gedaan", 100,30);
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