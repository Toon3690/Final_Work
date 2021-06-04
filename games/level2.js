class Level2 extends Game {
    constructor(configure) {
        super(configure);
        this.bomen = game.bomen;
        this.leafTeller = game.leafTeller;
        this.bladeren = game.bladeren;
    }

    setLeaves() {

         for (var i = 0; i < game.bladeren.length; i++) {
            game.bladeren[i].show();
             if (game.bladeren[i].isOffScreen()) {
                game.bladeren[i].removeFromWorld(this.configure.engine.world);
                game.bladeren.splice(i, 1);
                i--;
            } 
        } 
    }

     makeLeaves() {

        var pose = this.configure.lastPose;
        if(pose){
            game.bladeren.push(new Test2(pose.keypoints[0].position.x, pose.keypoints[0].position.y, 20, 20, true, 1));
            game.bladeren[this.leafTeller].add(true);
            game.leafTeller++;
        }
    } 
}