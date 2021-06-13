class Level2 extends Game {
    constructor() {
        super();
        this.bomen = game.bomen;
        this.leafCounter = game.leafCounter;
        this.leaves = game.leaves;
    }

    // Teken bladeren en update
    setLeaves() {
        
            for (var i = 0; i < game.leaves.length; i++) {
                game.leaves[i].show();
                if (game.leaves[i].isOffScreen()) {
                    game.leaves[i].removeFromWorld(conf1.engine.world);
                    game.leaves.splice(i, 1);
                    i--;
                }
            }
        

    }

    // Maak een blad aan bij de linkse en rechtse pols
    makeLeaves() {

        var pose = conf1.lastPose;
        if (pose) {
            game.leaves.push(new Leaf(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20, 20, true, 1));
            game.leaves[this.leafCounter].add(true);
            game.leafCounter++;
            game.leaves.push(new Leaf(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20, 20, true, 1));
            game.leaves[game.leafCounter].add(true);
            game.leafCounter++;
        }
    }

    // Teken cirkel op de polsen
    setEllipses() {
        var pose = conf1.lastPose;
        if (pose) {

            stroke(0);
            fill(255);
            if (pose.leftWrist.confidence > 0.35) {
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 25);
            }
            if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 25);
            }
        }
    }
}