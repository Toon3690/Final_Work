class Level1 extends Game {
    constructor() {
        super();
        this.bomen = game.bomen;
        this.teller = game.teller;
        this.bladeren = game.bladeren;
    }

    // initialiseer nieuwe boom en steek deze in de array
    setTrees() {
        var pose = conf1.lastPose;

        if (pose) {
            var name = "boom" + this.teller;
            var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2;
            var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y) / 2;

            name = new Trees(shoulderMiddleX, shoulderMiddleY, pose.keypoints[9].position.x, pose.keypoints[9].position.y, pose.keypoints[10].position.x, pose.keypoints[10].position.y);
            this.bomen.push(name);

            game.teller++;
        }
    }

    // Teken de bomen
    drawTrees() {
        for (var i = 0; i < this.bomen.length; i++) {
            this.bomen[i].makeTrees();
        }
    }

    // Teken cirkels op borst en polsen
    setEllipses() {
        var pose = conf1.lastPose;

        if (pose) {
            var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2;
            var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y) / 2;

            noStroke();
            fill(255);
            ellipse(shoulderMiddleX, shoulderMiddleY, 25);

             if (pose.leftWrist.confidence > 0.35) {
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 25);
            } 
            if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 25);
            } 
        }
    }
}