class Configure {
    constructor(x, y, color, poses) {
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
        this.state;
        this.results;

        this.Engine = Matter.Engine,
            this.Runner = Matter.Runner,
            this.Bodies = Matter.Bodies,
            this.Composite = Matter.Composite,
            this.Composites = Matter.Composites,
            this.Common = Matter.Common,
            this.Vertices = Matter.Vertices,
            this.Mouse = Matter.Mouse,
            this.MouseConstraint = Matter.MouseConstraint,
            this.Body = Matter.Body;
    }

    setup() {
        // P5 JS
        var canvas = createCanvas(640,480);
        canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
        frameRate(40);
        rectMode(CENTER);
        this.pg = createGraphics(640, 480);
        this.pj = createGraphics(640, 480);

        // For Posenet
        this.video = createCapture(VIDEO);
        this.video.size(width, height);
        this.video.hide();
        this.poseNet = ml5.poseNet(this.video, this.optionsForPoseNet);
        
        this.poseNet.on('pose', this.gotPoses);

        // Matter JS
        this.engine = this.Engine.create();
        this.world = this.engine.world;
        this.composite = this.Engine.composite;
        Matter.Runner.run(this.engine);

        return true;
    }

    draw() {
        rectMode(CENTER);
        fill(this.color);
        rect(this.x, this.y, 50, 50);
        console.log(this.results);
        return true;
    }

    gotPoses(results) {
        var pos;
        if (results.length > 0) {
            pos = results[0].pose;
            //console.log(results);
            //console.log(this.results);
        }
        this.pose = pos;
    }


    getState(conf1, wacht, levels, ending) {   
        return 2;
    }

    cycle(){
        wacht.draw();
    }
}