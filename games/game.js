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

        this.bodei;

        this.configure = configure;
        this.state;
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
        translate(this.video.width, 0,-20);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        pop();

        //this.drawTrees3D();

        this.setEllipses();
        //this.makeSun();
        push();
        //this.lvl1.drawTrees();
        pop();

        for (var i = 0; i < this.bomen.length; i++) {
            this.bomen[i].makeTrees3();
        }

        image(this.graph, 0, 0);



        this.lvl2.setLeaves();

         if(this.autumn){
            this.lvl3.setNose(this.bodei);
        } 

        var pose = this.configure.lastPose;

        /* if (pose) {
            var x = map(pose.keypoints[0].position.x, 0, width, 50, -50);
            var y = map(mouseY, 0, height, -200, 200);
            camera(0, 0, 600, x, 0, 0, 0, 1, 0);

        } */

        }

        onClick() {
            //this.lvl1.setTrees();
            this.lvl3.setNose();

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
                this.lvl3.setAutumn();
            }
        }

        setEllipses() {
            var pose = this.configure.lastPose;
            if (pose) {

                var lShoulderY = pose.keypoints[5].position.y;
                var rShoulderY = pose.keypoints[6].position.y;

                var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x)/2;
                var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y)/2;

                ellipse(shoulderMiddleX, shoulderMiddleY, 20);

                stroke(255, 0, 0);
                //console.log(pose);
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
           var bodies = this.lvl3.setAutumn();
           this.bodei = bodies;
            console.log("hs");
        }

    }