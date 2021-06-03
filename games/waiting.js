class Waiting {
    constructor(configure) {
        this.configure = configure;
        this.state = false;

        this.tijdNeus = 0;

        this.img1;
        this.img2;
        this.img3;
        this.img4;
        this.counter = 0;
    }

    setup() {
        this.img1 = createImage(640, 480);
        this.img2 = createImage(640, 480);
        this.img3 = createImage(640, 480);
        this.img4 = createImage(640, 480);
    }

    draw() {
        fill(0, 102, 153);
        background(0);
        text("Even wachten", 100, 30);

        var pose = this.configure.lastPose;
        var skeleton = this.configure.lastSkeleton;
        this.drawSkeleton(pose, skeleton);

        if (this.counter == 5) {
            image(this.img1, 0, 0, 320, 240);
            image(this.img2, 320, 0, 320, 240);
            image(this.img3, 0, 240, 320, 240);
            image(this.img4, 320, 240, 320, 240);
        }
        return true;
    }

    onClick() {
        if (this.counter == 1) {
            this.img1 = get(0, 0, 640, 480);
        } else if (this.counter == 2) {
            this.img2 = get(0, 0, 640, 480);
        } else if (this.counter == 3) {
            this.img3 = get(0, 0, 640, 480);
        } else if (this.counter == 4) {
            this.img4 = get(0, 0, 640, 480);
        }
        this.counter++;
    }

    checkForStart() {
        if(wacht.state){
            var pose = this.configure.lastPose;

            if (pose.keypoints[0].score > 0.8) {
                this.tijdNeus++;
            } else {
                this.tijdNeus = 0;
            }
            console.log(this.tijdNeus);
    
            if (this.tijdNeus == 2) {
                console.log("laten we beginnen");
                wacht.state = false;
                game.state = true;
            } else if (this.tijdNeus == 20) {
                //playing = true;
                //waitroom = false;
            }
        }    
    }


    drawSkeleton(pose, skeleton) {
        if (pose) {
            //console.log(skeleton);
            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                push();
                strokeWeight(20);
                stroke(255, 255, 0);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
                pop();
            }
        }
    }
}