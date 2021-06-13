let conf1;
let wait;

let poses = [0, 1, 2, 3];

let start = false;
let keer1 = true;

function setup() {

    //Materiaal voor omlijsting schilderij
    textureFrame = loadImage("images/frame.jpg");

    //Initialiseer en doe setup
    conf1 = new Configure();
    start = conf1.setup();

    //Als configure is uitgevoerd gaan we de andere klasses aanmaken
    if (start) {
        wait = new Waiting(conf1);
        wait.state = true;
        // Kijk of de gebruiker lang voor de installatie blijft staan
        setInterval(() => wait.checkForStart(), 1000);

        game = new Game(conf1);
        game.setup();
        //game.setAudio();
        game.setImages();
        setInterval(() => game.checkSpring(), 6000);
        setInterval(() => game.checkSummer(), 400);

        setInterval(() => this.checkStart(), 500);

        ending = new Ending();
    }
}

function draw() {

    // Zet het middelpunt terug naar linksboven
    push();
    translate(-width / 2 + 50, -height / 2 + 50, 0);
    background(0);
    cycle();
    pop();

    pointLight(250, 250, 250, 0, -300, 200);
    noStroke();

    frame();
}

// Maak de omlijsting van een schilderij
// Inspiratie gehaald uit https://editor.p5js.org/rw1693/sketches/fa7kC4PTP
function frame() {
    push();
    noStroke();
    translate(0, 0, 0);
    texture(textureFrame);

    push();
    translate(350, 0, 0);
    //rechtse balk
    box(50, 580, 25);
    pop();

    push();
    translate(-350, 0, 0);
    //linkse balk
    box(50, 580, 25);
    pop();

    push();
    translate(0, 270, 0);
    //onderste balk
    box(740, 50, 25);
    pop();

    push();
    translate(0, -270, 0);
    //bovenste balk
    box(740, 50, 25);
    pop();

    pop();
}


function checkStart() {
    
    // Na het wachtscherm gaan we naar de spelmodus
    // Start de achtergrondmuziek
    // Voer de volgende functies uit opeenvolgend en na een bepaalde tijd
    if (!wait.state && keer1) {
        var audio1 = new Audio('Audio/nature.wav');
        audio1.volume = 0.6;
        audio1.crossOrigin = 'anonymous';
        audio1.play();

        setTimeout(function () {
            var audio2 = new Audio('Audio/intro.mp4');
            audio2.crossOrigin = 'anonymous';
            audio2.play();
            game.beforeStart1 = true;
        }, 2000);
        setTimeout(function () {
            var audio = new Audio('Audio/lente.mp4');
            audio.crossOrigin = 'anonymous';
            audio.play();

            game.beforeStart1 = false;
            game.beforeStart2 = true;
        }, 23500);
        setTimeout(function () {
            game.beforeStart2 = false;
            game.spring = true;
            game.summer = false;
            game.autumn = false;
            game.springSun = true;
            directionalLight(198, 215, 185, 0.7, -0.6, -1);
            
        }, 38000);
        setTimeout(function () {
            game.spring = false;
            var audio = new Audio('Audio/zomer.mp4');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 57000);
        setTimeout(function () {
            game.img1 = get(40, 40, 640, 480);
            game.springSun = false;
            game.summerSun = true;
            game.summer = true;
        }, 66000);
        setTimeout(function () {
            game.summer = false;
            var audio = new Audio('Audio/herfst.mp4');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 98000);
        setTimeout(function () {
            game.img2 = get(40, 40, 640, 480);
            game.summerSun = false;
            game.autumnSun = true;
            game.autumn = true;
            game.checkAutumn();
        }, 107000);
        setTimeout(function () {
            game.img3 = get(40, 40, 640, 480);
            game.img4 = get(40, 40, 640, 480);
            game.springSun = false;
            game.state = false;
            ending.state = true;
            
            var audio = new Audio('Audio/einde.mp4');
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

// Kijk bij elke frame of er naar de volgende klasse kan worden doorgegaan.
function cycle() {
    if (start) {
        if (wait.state) {
            wait.draw(conf1.lastPoses);
        } else {
            if (game.state) { 
                    game.draw(conf1.video);    
            } else {
                if (ending.state) {
                    ending.draw()
                } else {
                    wait.state = false;
                    game.state = false;
                    ending.state = false;
                    location.reload();
                }
            }
        }
    }
}
