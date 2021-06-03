class Level1 extends Game {
    constructor(configure) {
        super(configure);
        this.bomen = game.bomen;
        this.teller = game.teller;
        this.bladeren = game.bladeren;
    }

    setTrees() {
        console.log("praprapra");

       // console.log(this.configure.lastPose);

        console.log(this.bomen);
         var pose = this.configure.lastPose;
         //console.log(pose.keypoints[0].position.x);
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
}