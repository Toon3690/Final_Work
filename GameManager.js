let conf1;
let wacht;
let level1;
let poses = [0, 1, 2, 3];
let wait = false;
let play = false;
let start = false;

let state = 0;

let keer1 = true;


function setup() {
    wood = loadImage("wood.jpg");
    gold = loadImage("gold.jpg");

    conf1 = new Configure();
    start = conf1.setup();
    /* var audio = new Audio('nature.wav');
    audio.crossOrigin = 'anonymous'; */


    /* audio.muted = true;
    audio.play();
    audio.muted = false;
    audio.play(); */

    if (start) {
        wacht = new Waiting(conf1);
        //wacht.setup();
        wacht.state = true;
        setInterval(() => wacht.checkForStart(), 1000);

        game = new Game(conf1);
        game.setAudio();
        game.setImages();
        setInterval(() => game.checkSpring(), 6000);
        setInterval(() => game.checkSummer(), 400);

        setInterval(() => this.checkStart(), 500);

        ending = new Ending();
    }
}

function draw() {
    //console.log(frameRate());
    push();
    translate(-width / 2 + 50, -height / 2 + 50, 0);
    background(0);
    cycle();
    pop();
    //Matter.Engine.update(conf1.engine);

    pointLight(250, 250, 250, 0, -300, 200);
    //pointLight(250, 250, 250, 0, -300, 200);
    noStroke();

    /* if (game.state) {
        var pose = conf1.lastPose;

        if (pose) {
            var x = map(pose.nose.x, 0, width, 20, -20);
            //var y = map(mouseY, 0, height, -200, 200);
            
            camera(0, 0, 600, x, 0, 0, 0, 1, 0);
            console.log("hallow");
        }
    }  */
    /* var x = map(mouseX, 0, height, 20, -20);
    camera(0, 0, 600, x, 0, 0, 0, 1, 0); */

    //pointLight(255,255,255,0,-200,200);
    //pointLight(255,255,255,0,-200,200);
    // ambientLight(255);

    frame();



    // Set the perspective to the fov
    //perspective(PI / 2.8, float(width)/float(height),cZ/10.0, cZ*5.0);
    //ortho(-width, width, height, -height/2, 0.1, 100);



}

function frame() {
    push();
    noStroke();
    translate(0, 0, 0);
    texture(gold);
    push();
    translate(0, 270, 0);
    //onderste
    box(740, 50, 25);
    pop();
    push();
    translate(0, -270, 0);
    //bovenste
    box(740, 50, 25);
    pop();
    push();
    translate(350, 0, 0);
    //rechts
    box(50, 580, 25);
    pop();
    push();
    translate(-350, 0, 0);
    //links
    box(50, 580, 25);
    pop();
    pop();
}

function checkStart() {



    if (!wacht.state && keer1) {

        var audio1 = new Audio('Audio/nature.wav');
        audio1.volume = 0.6;
        audio1.crossOrigin = 'anonymous';
        audio1.play();

        setTimeout(function () {
            var audio2 = new Audio('Audio/intro.m4a');
            audio2.crossOrigin = 'anonymous';
            audio2.play();
            game.beforeStart1 = true;
        }, 2000);
        setTimeout(function () {
            var audio = new Audio('Audio/lente.m4a');
            audio.crossOrigin = 'anonymous';
            audio.play();

            game.beforeStart1 = false;
            game.beforeStart2 = true;
        }, 22500);
        setTimeout(function () {
            game.beforeStart2 = false;
            game.spring = true;
            game.summer = false;
            game.autumn = false;
            
            directionalLight(198,215,185, 0.7, -0.6, -1);
        }, 38000);
        setTimeout(function () {
            game.spring = false;
            var audio = new Audio('Audio/zomer.m4a');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 57000);
        setTimeout(function () {
            game.img1 = get(50, 50, 640, 480);
            game.spring = false;
            game.summer = true;
            game.autumn = false;
            directionalLight(173,255,47, -1, 0.3, -1);
        }, 66000);
        setTimeout(function () {
            game.summer = false;
            var audio = new Audio('Audio/herfst.m4a');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 98000);
        setTimeout(function () {
            game.img2 = get(50, 50, 640, 480);
            game.spring = false;
            game.summer = false;
            game.autumn = true;
            directionalLight(102,102,0, -0.6, -0.6, -1);
            directionalLight(102,102,0, -0.6, -0.6, -1); 
            game.checkAutumn();
        }, 109000);
        setTimeout(function () {
            game.img3 = get(50, 50, 640, 480);
            game.img4 = get(50, 50, 640, 480);
            game.state = false;
            ending.state = true;
            var audio = new Audio('Audio/einde.m4a');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 135000);
        setTimeout(function () {
            game.state = false;
            ending.state = false;
        }, 150000);
        keer1 = false;
    }
}

function cycle() {

    if (start) {
        if (wacht.state) {
            //console.log("nog even wachten");
            wacht.draw();
        } else {
            if (game.state) {
                game.setup();
                game.draw(conf1.video);
            } else {
                if (ending.state) {
                    console.log("good job");
                    ending.draw()
                } else {
                    wacht.state = false;
                    game.state = false;
                    ending.state = false;
                    location.reload();
                }
            }
            // TODO teken een andere state error
        }
    }
}

function mouseClicked() {
    game.onClick();
}

function keyPressed() {
    if (keyCode == 97) {
        wacht.state = true;
        game.state = false;
        ending.state = false;
    } else if (keyCode == 98) {
        wacht.state = false;
        game.state = true;
        ending.state = false;
    } else if (keyCode == 99) {
        wacht.state = false;
        game.state = false;
        ending.state = true;
    } else if (keyCode == 76) {
        game.spring = true;
        game.summer = false;
        game.autumn = false;
        game.doSpring();
    } else if (keyCode == 83) {
        game.spring = false;
        game.summer = true;
        game.autumn = false;
        game.doSummer();
    } else if (keyCode == 65) {
        game.spring = false;
        game.summer = false;
        game.autumn = true;
        game.doAutumn();
    }
    console.log(keyCode);
}