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
        this.state;
    }

    setup() {

        // P5 JS
        var canvas = createCanvas(740, 580, WEBGL);
        canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
        frameRate(40);
        rectMode(CENTER);

        // For Posenet
        this.video = createCapture(VIDEO);
        this.video.size(640, 480);
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

    get lastPose() {
        return this._lastPose;
    }

    gotPoses(results) {
        if (results.length > 0) {
            this._lastPose = results[0].pose;
        }
    }
}