class Level1 extends Game {
    constructor(configure) {
        super(configure);
        this.bomen = game.bomen;
        this.teller = game.teller;
        this.bladeren = game.bladeren;
    }

    setTrees() {
        var pose = this.configure.lastPose;

        if (pose) {
            var name = "boom" + this.teller;

            var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2;
            var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y) / 2;

            //name = new Trees(this.configure, pose.keypoints[0].position.x, pose.keypoints[0].position.y, 200, 200, 450, 200, random(0.1, 0.4), random(0.1, 0.4));
            //name = new Trees(this.configure, shoulderMiddleX, shoulderMiddleY, 200, 200, 450, 200, random(0.1, 0.4), random(0.1, 0.4));
           name = new Trees(this.configure, shoulderMiddleX, shoulderMiddleY, pose.keypoints[9].position.x, pose.keypoints[9].position.y, pose.keypoints[10].position.x, pose.keypoints[10].position.y, random(0.1, 0.4), random(0.1, 0.4));
            this.bomen.push(name);
            //this.bomen[this.teller].makeTree();  
            //this.bomen[this.teller].makeTree2();
            //this.bomen[this.teller].makeTrees3();

            game.teller++;
        }
    }

    drawTrees() {
        for (var i = 0; i < this.bomen.length; i++) {
            this.bomen[i].makeTrees3();
        }
    }

    setEllipses() {
        console.log("jajajajjaja");
        var pose = this.configure.lastPose;
        if (pose) {

            var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2;
            var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y) / 2;

            //strokeWeight(5);
            noStroke();
            fill(255);
            ellipse(shoulderMiddleX, shoulderMiddleY, 25);  
            ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 25);
            ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 25);
            /* if (pose.leftWrist.confidence > 0.35) {
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
            } 
            if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
            } */
        }
    }
}