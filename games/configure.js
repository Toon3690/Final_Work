class Configure {
    constructor(x, y, color, poses) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.pg;
        this.pj;
        this.video;
        this.posenet;
        this.optionsForPoseNet = {
            flipHorizontal: true,
            detectionType: 'single'
        };
        this.pose;
        this.poses = poses;
        //console.log(this.poses);
        this.wait;
        this.play;
    }

    setup(){
        createCanvas(400, 400);
        rectMode(CENTER);
        this.pg = createGraphics(640, 480);
        this.pj = createGraphics(640, 480);
        this.video = createCapture(VIDEO);
        this.video.size(width, height);
        //console.log(VIDEO);
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, this.optionsForPoseNet);
        //console.log(this.poses.length);
        this.poseNet.on('pose', this.gotPoses);
        this.wait = true;
    }

    draw(){
        rectMode(CENTER);
        fill(this.color);
        rect(this.x, this.y, 50,50);
        return true;
    }

    gotPoses(results) {
        if (results.length > 0) {
            this.pose = results[0].pose;
            //console.log(this.pose);
            return this.pose;
        }
    }

    getPose(){
        //console.log(this.pose);
        return this.pose;
    }
    
    makeWaiting(){
        var w1 = new Waiting(5,5);
        return w1;
    }

    getState(){
        return this.state;
    }

    changeState(){
        this.play = false;
    }
}