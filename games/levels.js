class Levels {
    constructor(video, pg) {
        this.video = video;
        this.pg = pg;
        this.state;

        this.spring = true;
        this.summer = false;
        this.autumn = false;
        this.winter = false;
    }

    setup() {

    }

    draw(video) {
        //console.log(this.video.height);
        translate(this.video.width, 0);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        rect(200, 200, 300, 300);
        image(this.pg, 0, 0);
        this.makeSun();
        return this.summer;
    }

    getState() {
        return this.state;
    }

    makeSun() {
        push();
        strokeWeight(2);
        stroke(255, 120, 20);
        fill(250, 253, 15);
        translate(0, 0);
        ellipse(20, 20, 120, 120);
        pop();
    }

}