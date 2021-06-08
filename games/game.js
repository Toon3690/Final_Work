class Game {
    constructor(configure) {

        this.video = configure.video;
        this.graph = configure.graph;

        this.spring = false;
        this.summer = false;
        this.autumn = false;
        this.winter = false;

        this.beforeStart1 = false;
        this.beforeStart2 = false;

        this.lvl1;
        this.lvl2;
        this.lvl3;

        this.img1;
        this.img2;
        this.img3;
        this.img4;

        this.bomen = [];
        this.bladeren = [];

        this.leafTeller = 0;
        this.teller = 0;

        this.bodei;

        this.configure = configure;
        this.state;

        this.audioState;

    }


    setAudio() {
        this.audioState = true;
    }

    setup() {
        this.lvl1 = new Level1(this.configure);
        this.lvl2 = new Level2(this.configure);
        this.lvl3 = new Level3(this.configure);
    }

    setImages() {
        this.img1 = createImage(640, 480);
        this.img2 = createImage(640, 480);
        this.img3 = createImage(640, 480);
        this.img4 = createImage(640, 480);
    }

    draw() {

        push();
        translate(this.video.width, 0, -20);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        pop();
        //console.log(frameRate());

        if (this.spring) {

            this.lvl1.setEllipses();

            //directionalLight(198,215,185, 0.7, -0.6, -1); 
        } else if (this.summer) {

            this.lvl2.setEllipses();

            //directionalLight(173,255,47, -1, 0.3, -1); 
        } else if (this.autumn) {

            this.lvl3.setEllipses();
            this.lvl3.setNose(this.bodei);

        }

        if (this.beforeStart1) {
            this.setEllipses();
        }else if(this.beforeStart2){
            this.setEllipses2();
        }

        this.lvl1.drawTrees();

        image(this.graph, 0, 0);

        this.lvl2.setLeaves();
    }

    onClick() {
        //this.lvl1.setTrees();
        //this.lvl3.setNose();

    }

    checkSpring() {
        if (this.spring) {
            this.lvl1.setTrees();
        }
    }

    checkSummer() {
        if (this.summer) {
            this.lvl2.makeLeaves();
        }
    }

    checkAutumn() {
        if (this.autumn) {
            console.log("hier");
            var bodies = this.lvl3.setAutumn();
            this.bodei = bodies;
        }
    }



    updateTrees() {
        console.log(this.bomen.length);
        for (var i = 0; i < this.bomen.length; i++) {

            this.bomen[i].makeTree();
            this.bomen[i].makeBranches();
            this.bomen[i].makeTree2();
            this.bomen[i].makeBranches2();
        }
    }

    doSpring() {
        this.lvl1.setTrees();
    }

    doSummer() {
        this.lvl2.makeLeaves();
    }

    doAutumn() {
        var bodies = this.lvl3.setAutumn();
        this.bodei = bodies;
        console.log("hs");
    }

    setEllipses() {
        var pose = conf1.lastPose;
        if (pose) {
            for (var i = 0; i < pose.keypoints.length; i++) {
                //console.log(pose);
                noStroke();
                    fill(255);
                    ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 20);
                /* if (pose.keypoints[i].score > 0.35) {
                    noStroke();
                    fill(255);
                    ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 20);
                } */
            }
        }

    }

    setEllipses2() {
        var pose = conf1.lastPose;
        //console.log("we zijn ter");
        if (pose) {

            var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2;
            var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y) / 2;

            //strokeWeight(5);
            stroke(0);
            fill(255);
            ellipse(shoulderMiddleX, shoulderMiddleY, 20);
            ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
            ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
            /* if (pose.leftWrist.confidence > 0.35) {
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
            }
            if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
            } */
        }
    }

}