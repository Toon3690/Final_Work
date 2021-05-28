class Levels {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setup(){

    }

    draw(video){
        
        translate(video.width, 0);
        scale(-1, 1);
        image(video, 0, 0, video.width, video.height);
        rect(200,200,300,300);
    }

}