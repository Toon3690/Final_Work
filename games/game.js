class Game {
    constructor() {

        this.video = conf1.video;

        this.spring = false;
        this.summer = false;
        this.autumn = false;
        this.winter = false;

        this.springSun = false;
        this.summerSun = false;
        this.autumnSun = false;

        this.beforeStart1 = false;
        this.beforeStart2 = false;

        this.lvl1;
        this.lvl2;
        this.lvl3;

        this.img1;
        this.img2;
        this.img3;
        this.img4;

        this.trees = [];
        this.leaves = [];

        this.leafCounter = 0;
        this.counter = 0;

        this.body;

        this.configure = conf1;
        this.state;

        this.audioState;
    }

    // zet de audioState op true voor het ritselen van de bladeren in het 3de seizoen
    // Ik doe dit hier omdat anders deze op true blijft gezet worden
    setAudio() {
        this.audioState = true;
    }

    // Initialiseer de levels
    setup() {
        this.lvl1 = new Level1();
        this.lvl2 = new Level2();
        this.lvl3 = new Level3();
        this.audioState = true;
        return true;
    }

    // Maak imagecontainers aan om de screenshots van de canvassen in op te slaan
    setImages() {
        this.img1 = createImage(640, 480);
        this.img2 = createImage(640, 480);
        this.img3 = createImage(640, 480);
        this.img4 = createImage(640, 480);
    }

    draw() {

        // Teken het camerabeeld
        push();
        translate(this.video.width, 0, -20);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        pop();

        // Kijk welk seizoen het is
        if (this.spring) {
            this.lvl1.setEllipses();
        } else if (this.summer) {
            this.lvl2.setEllipses();
        } else if (this.autumn) {
            this.lvl3.setEllipses();
            this.lvl3.setNose(this.body);
        }

        // Licht aangepast aan het seizoen
        if(this.springSun){
            directionalLight(198, 215, 185, 0.7, -0.6, -1);
        }else if(this.summerSun){
            directionalLight(173, 255, 47, -1, 0.3, -1);
        }else if(this.autumnSun){
            directionalLight(102, 102, 0, -0.6, -0.6, -1);
            directionalLight(102, 102, 0, -0.6, -0.6, -1);
        }

        // Teken alle cirkels tijdens de begin uitleg
        // Teken alleen de 3 benodigde cirkels bij de uitleg van het 1ste seizoen
        if (this.beforeStart1) {
            this.setEllipses();
        }else if(this.beforeStart2){
            this.setEllipses2();
        }

        // Teken de bomen
        this.lvl1.drawTrees();

        // Kijk of er bladeren zijn die getekend/verwijdert moeten worden
        this.lvl2.setLeaves();
    }

    // Check of de seizoenen true zijn
    checkSpring() {
        if (this.spring) {
            this.lvl1.setTrees();
        }
    }

    checkSummer() {
        if (this.summer) {
            this.lvl2.makeLeaves();
        }
    }

    checkAutumn() {
        if (this.autumn) {
            var bodies = this.lvl3.setAutumn();
            this.body = bodies;
        }
    }

    // Teken cirkel op alle punten (17)
    setEllipses() {
        var pose = conf1.lastPose;
        if (pose) {
            for (var i = 0; i < pose.keypoints.length; i++) {
                noStroke();
                fill(255);
                 if (pose.keypoints[i].score > 0.35) { 
                    ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 20);
                } 
            }
        }

    }

    // Teken cirkel op borst en polsen
    setEllipses2() {
        var pose = conf1.lastPose;

        if (pose) {
            var shoulderMiddleX = (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2;
            var shoulderMiddleY = (pose.keypoints[5].position.y + pose.keypoints[6].position.y) / 2;

            noStroke();
            fill(255);
            ellipse(shoulderMiddleX, shoulderMiddleY, 20);

             if (pose.leftWrist.confidence > 0.35) {
                ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
            }
            if (pose.rightWrist.confidence > 0.35) {
                ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
            } 
        }
    }

}