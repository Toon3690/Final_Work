let conf1;
let wacht;
let level1;
let poses = [0, 1, 2, 3];
let wait = false;
let play = false;
let start = false;

let state = 0;

let keer1 = true;

let klassen = [];

function setup() {
    wood = loadImage("wood.jpg");
    gold = loadImage("gold.jpg");

    klassen.push(conf1 = new Configure());
    start = conf1.setup();

    if (start) {
        klassen.push(wacht = new Waiting(conf1));
        //wacht.setup();
        wacht.state = true;
        setInterval(() => wacht.checkForStart(), 1000);

        klassen.push(game = new Game(conf1));
        game.setImages();
        setInterval(() => game.checkSpring(), 4000);
        setInterval(() => game.checkSummer(), 400);

        //setInterval(() => this.checkStart(), 500);
       
        klassen.push(ending = new Ending());
    }
}

function draw() {
    
    push();
    translate(-width/2+50,-height/2+50,0);
    background(0);
    cycle();
    pop();

    pointLight(250, 250, 250, 0, -300, 200);
    pointLight(250, 250, 250, 0, -300, 200);
    noStroke();

   
    

    //pointLight(255,255,255,0,-200,200);
    //pointLight(255,255,255,0,-200,200);
   // ambientLight(255);

   frame();


     
   // Set the perspective to the fov
   //perspective(PI / 2.8, float(width)/float(height),cZ/10.0, cZ*5.0);
   //ortho(-width, width, height, -height/2, 0.1, 100);
   
   
    
}

function frame(){
    push();
    noStroke();
    translate(0,0,0);
    texture(gold);
    push();
    translate(0,270,0);
    //onderste
    box(740,50,25);
    pop();
    push();
    translate(0,-270,0);
    //bovenste
    box(740,50,25);
    pop();
    push();
    translate(350,0,0);
    //rechts
    box(50,580,25);
    pop();
    push();
    translate(-350,0,0);
    //links
    box(50,580,25);
    pop();
    pop();
}

function checkStart() {
    if (!wacht.state && keer1) {
        setTimeout(function () {
            game.spring = true;
            game.summer = false;
            game.autumn = false;

        }, 100);
        setTimeout(function () {
            game.img1 = get(50, 50, 640, 480);
            game.spring = false;
            game.summer = true;
            game.autumn = false;
        }, 15000);
        setTimeout(function () {
            game.img2 = get(50, 50, 640, 480);
            game.spring = false;
            game.summer = false;
            game.autumn = true;
            game.checkAutumn();
        }, 30000);
        setTimeout(function () {
            game.img3 = get(50, 50, 640, 480);
            game.img4 = get(50, 50, 640, 480);
            game.state = false;
            ending.state = true;

        }, 37500);
        setTimeout(function () {
            game.state = false;
            ending.state = false;
        }, 42500);
        keer1 = false;
    }
}

function cycle() {

    if (start) {
        if (wacht.state) {
            console.log("nog even wachten");
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
        game.doSpring();
        console.log("ok");
    } else if (keyCode == 83) {
        //game.updateTrees();
        game.summer = true;
        game.doSummer();
        //console.log("jajajajaja");
    } else if (keyCode == 65) {
        game.doAutumn();
        game.autumn = true;
        game.summer = false;
        //console.log("jajajajaja");
    }
    console.log(keyCode);
}