class Game {
    constructor(configure) {

        this.video = configure.video;
        this.graph = configure.graph;

        this.spring = false;
        this.summer = false;
        this.autumn = false;
        this.winter = false;

        this.lvl1;
        this.lvl2;
        this.lvl3;

        this.img1;
        this.img2;
        this.img3;
        this.img4;

        this.bomen = [];
        this.bladeren = [];

        this.leafTeller = 0;
        this.teller = 0;

        this.bodei;

        this.configure = configure;
        this.state;
    }


    setup() {
        this.lvl1 = new Level1(this.configure);
        this.lvl2 = new Level2(this.configure);
        this.lvl3 = new Level3(this.configure);
    }

    setImages() {
        this.img1 = createImage(640, 480);
        this.img2 = createImage(640, 480);
        this.img3 = createImage(640, 480);
        this.img4 = createImage(640, 480);
    }

    draw() {

        push();
        translate(this.video.width, 0, -20);
        scale(-1, 1);
        image(this.video, 0, 0, this.video.width, this.video.height);
        pop();
        console.log(frameRate());
        let digit= mouseX

        if(this.spring){

            this.lvl1.setEllipses();
           directionalLight(198,215,185, 0.7, -0.6, -1);
            //directionalLight(198,215,185, 0.7, -0.6, -1); 
        }else if(this.summer){

            this.lvl2.setEllipses();
            directionalLight(173,255,47, -1, 0.3, -1);
            //directionalLight(173,255,47, -1, 0.3, -1); 
        }else if(this.autumn){

            this.lvl3.setEllipses();
            this.lvl3.setNose(this.bodei);
           directionalLight(102,102,0, -0.6, -0.6, -1);
            directionalLight(102,102,0, -0.6, -0.6, -1); 
        }

        this.lvl1.drawTrees();

        image(this.graph, 0, 0);

        this.lvl2.setLeaves();
    }

    onClick() {
        //this.lvl1.setTrees();
        //this.lvl3.setNose();

    }

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
            console.log("hier");
            var bodies = this.lvl3.setAutumn();
            this.bodei = bodies;
        }
    }

    

    updateTrees() {
        console.log(this.bomen.length);
        for (var i = 0; i < this.bomen.length; i++) {

            this.bomen[i].makeTree();
            this.bomen[i].makeBranches();
            this.bomen[i].makeTree2();
            this.bomen[i].makeBranches2();
        }
    }

    doSpring() {
        this.lvl1.setTrees();
    }

    doSummer() {
        this.lvl2.makeLeaves();
    }

    doAutumn() {
        var bodies = this.lvl3.setAutumn();
        this.bodei = bodies;
        console.log("hs");
    }

}