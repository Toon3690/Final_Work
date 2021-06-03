class Configure {
    constructor() {

        this.graph;
        this.video;
        this.posenet;
        this.optionsForPoseNet = {
            flipHorizontal: true,
            detectionType: 'single'
        };

        this.engine;

        this._lastPose = null;
        this._lastSkeleton = null;

        this.state;


    }

    setup() {

        // P5 JS
        var canvas = createCanvas(640, 480);
        canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
        frameRate(40);
        rectMode(CENTER);
        this.graph = createGraphics(640, 480);

        // For Posenet
        this.video = createCapture(VIDEO);
        this.video.size(width, height);
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, this.optionsForPoseNet);
        this.poseNet.on('pose', (p) => this.gotPoses(p));

        // Matter JS
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.composite = Matter.Engine.composite;
        Matter.Runner.run(this.engine);

        return true;
    }

    draw() {
        rectMode(CENTER);
        rect(0, 0, 50, 50);
        if (this.lastPose) {
            //console.log(this.lastPose.keypoints[0].position.x);
        }
        return true;
    }

    get lastPose() {
        return this._lastPose;
    }

    get lastSkeleton(){
        return this._lastSkeleton;
    }

    gotPoses(results) {
        if (results.length > 0) {
            this._lastPose = results[0].pose;
            this._lastSkeleton = results[0].skeleton;
        }
    }


    getState(conf1, wacht, levels, ending) {
        return 2;
    }

    cycle() {
        wacht.draw();
    }
}