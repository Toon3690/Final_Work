class Waiting {
    constructor(configure) {
        this.configure = configure;
        this.state = false;

        this.tijdNeus = 0;
    }


    draw() {

        push();
        fill(0);
        rectMode(CORNER);
        rect(2, 0, 637, 480);
        pop();

        fill(0, 102, 153);
        var pose = this.configure.lastPose;
        var skeleton = this.configure.lastSkeleton;
        //this.drawSkeleton(pose, skeleton);
        this.setEllipses(pose);
        return true;
    }

    setEllipses(pose) {
        if (pose) {
            for (var i = 0; i < pose.keypoints.length; i++) {
                //console.log(pose);
                if (pose.keypoints[i].score > 0.40) {
                    noStroke();
                    fill(255);
                    ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 20);
                }
            }
        }

    }

    checkForStart() {
        if (wacht.state) {
            var pose = this.configure.lastPose;

            if (pose) {
                if (pose.keypoints[0].score > 0.8) {
                    this.tijdNeus++;
                } else {
                    this.tijdNeus = 0;
                }
                console.log(this.tijdNeus);

                if (this.tijdNeus == 15) {
                    console.log("laten we beginnen");
                    wacht.state = false;
                    game.state = true;
                } else if (this.tijdNeus == 20) {
                    //playing = true;
                    //waitroom = false;
                }
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