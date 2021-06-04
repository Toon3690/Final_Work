class Game {
    constructor(configure) {

        this.video = configure.video;
        this.graph = configure.graph;

        this.spring = false;
        this.summer = false;
        this.autumn = false;
        this.winter = false;

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

        this.configure = configure;
        this.state;
    }

   
    setup() {
        this.lvl1 = new Level1(this.configure);
        this.lvl2 = new Level2(this.configure);
        this.lvl3 = new Level3(this.configure);
    }

    setImages(){
        this.img1 = createImage(640, 480);
        this.img2 = createImage(640, 480);
        this.img3 = createImage(640, 480);
        this.img4 = createImage(640, 480);
    }

    draw() {

        push();
        translate(this.video.width, 0);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        pop();

        this.setEllipses();
        //this.makeSun();

        image(this.graph, 0, 0);

        this.lvl2.setLeaves();
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
            this.lvl3.setAutumn();
        }
    }

    setEllipses() {
        var pose = this.configure.lastPose;
        if (pose) {
            ellipse(pose.keypoints[0].position.x, pose.keypoints[0].position.y, 20);
            stroke(255, 0, 0);

            if (pose.leftWrist.confidence > 0.35) {
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
            } else if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
            }
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

    makeSun() {
        push();
        strokeWeight(2);
        stroke(255, 120, 20);
        fill(250, 253, 15);
        translate(0, 0);
        ellipse(20, 20, 120, 120);
        pop();
    }


    doSpring() { 
            this.lvl1.setTrees();     
    }

    doSummer() { 
            this.lvl2.makeLeaves();
    }

    doAutumn() {    
            this.lvl3.setAutumn();   
    }

}