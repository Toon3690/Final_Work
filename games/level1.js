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
            name = new Trees(this.configure, pose.keypoints[0].position.x, pose.keypoints[0].position.y, pose.keypoints[9].position.x, pose.keypoints[9].position.y, pose.keypoints[10].position.x, pose.keypoints[10].position.y, random(0.1, 0.4), random(0.1, 0.4));
            this.bomen.push(name);
            this.bomen[this.teller].makeTree();  
            this.bomen[this.teller].makeTree2();
            game.teller++;
        } 
    }
}