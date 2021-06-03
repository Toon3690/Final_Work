class Game {
    constructor(configure) {

        this.video = configure.video;
        this.graph = configure.graph;
        this.state;

        //this.pose = configure.lastPose;

        this.spring = false;
        this.summer = false;
        this.autumn = false;
        this.winter = false;

        this.lvl1;

        this.bomen = [];
        this.bladeren = [];

        this.teller = 0;

        this.configure = configure;
        //console.log(this.configure.lastPose)
    }

    

    setup() {
        this.lvl1 = new Level1(this.configure);

    }

    draw() {
        
        //console.log(this.configure.lastPose)

        push();
        translate(this.video.width, 0);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        pop();

        //this.lvl1.setTrees();
        this.setEllipses();
        this.setLeaves();
        this.makeSun();

        image(this.graph, 0, 0);

        // TODO zet state op false eens het game is afgerond

        
    }

    doSpring(){
        this.lvl1.setTrees();
    }

    setAutumn() {
       for (var i = 0; i < this.bladeren.length; i++) {
            var b = this.bladeren[i].add(false);
            Matter.Composite.add(this.configure.engine.world, b);
        }       
    }

    setEllipses() {
        var pose = this.configure.lastPose;
        if (pose) {
            ellipse(pose.keypoints[0].position.x, pose.keypoints[0].position.y, 20);
            stroke(255, 0, 0);

            if (pose.leftWrist.confidence > 0.35) {
                //console.log(pose.leftWrist.confidence);
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
            } else if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
            }
        }
    }

    setLeaves() {
        for (var i = 0; i < this.bladeren.length; i++) {
            this.bladeren[i].show();
            //tests.drawSprite();
            if (this.bladeren[i].isOffScreen()) {
                //console.log("offff");
                this.bladeren[i].removeFromWorld(this.configure.engine.world);
                this.bladeren.splice(i, 1);
                i--;
            }
        }
    }

     setTrees() {
        console.log(this.bomen);
        var pose = this.configure.lastPose;
        if (pose) {
            var name = "boom" + this.teller;
            name = new Trees(this.configure, pose.keypoints[0].position.x, pose.keypoints[0].position.y, 200, 200, 900, 200, random(0.1, 0.4), random(0.1, 0.4));
            this.bomen.push(name);
            this.bomen[this.teller].makeTree();
            this.bomen[this.teller].makeTree2();
            this.bomen[this.teller].makeLeaves(5, this.bladeren);
            //console.log(this.bladeren);
            this.teller++;
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

    