let conf1;
let wait;

let poses = [0, 1, 2, 3];

let isStart = false;
let isKeer1 = true;

function setup() {

    //Materiaal voor omlijsting schilderij
    textureFrame = loadImage("images/frame.jpg");

    //Initialiseer en doe setup
    conf1 = new Configure();
    isStart = conf1.setup();

    //Als configure is uitgevoerd gaan we de andere klasses aanmaken
    if (isStart) {
        wait = new Waiting(conf1);
        wait.hasState = true;

        // Kijk of de gebruiker lang voor de installatie blijft staan
        setInterval(() => wait.checkForStart(), 1000);

        game = new Game(conf1);
        game.setup();
        game.setImages();

        // Plant een boom om de 6 seconden als spring true is
        // Hang een blad om de 0,4 seconden als summer true is
        // Kijk om de 0,5 seconden of er kan begonnen worden aan het spel
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
    if (!wait.hasState && isKeer1) {
        let audio1 = new Audio('Audio/nature.wav');
        audio1.volume = 0.6;
        audio1.crossOrigin = 'anonymous';
        audio1.play();

        setTimeout(function () {
            let audio2 = new Audio('Audio/intro.mp4');
            audio2.crossOrigin = 'anonymous';
            audio2.play();
            game.beforeStart1 = true;
        }, 2000);
        setTimeout(function () {
            let audio = new Audio('Audio/lente.mp4');
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
            let audio = new Audio('Audio/zomer.mp4');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 57000);
        setTimeout(function () {
            game.img1 = get(57, 50, 610, 470);
            game.springSun = false;
            game.summerSun = true;
            game.summer = true;
        }, 66000);
        setTimeout(function () {
            game.summer = false;
            let audio = new Audio('Audio/herfst.mp4');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 98000);
        setTimeout(function () {
            game.img2 = get(57, 50, 610, 470);
            game.summerSun = false;
            game.autumnSun = true;
            game.autumn = true;
            game.checkAutumn();
        }, 107000);
        setTimeout(function () {
            game.img3 = get(57, 50, 610, 470);
            game.img4 = get(57, 50, 610, 470);
            game.springSun = false;
            game.hasState = false;
            ending.hasState = true;
            
            let audio = new Audio('Audio/einde.mp4');
            audio.crossOrigin = 'anonymous';
            audio.play();
        }, 135000);
        setTimeout(function () {
            game.hasState = false;
            ending.hasState = false;
        }, 160000);
        isKeer1 = false;
    }
}

// Kijk bij elke frame of er naar de volgende klasse kan worden doorgegaan.
function cycle() {
    if (isStart) {
        if (wait.hasState) {
            wait.draw(conf1.lastPoses);
        } else {
            if (game.hasState) { 
                    game.draw(conf1.video);    
            } else {
                if (ending.hasState) {
                    ending.draw()
                } else {
                    wait.hasState = false;
                    game.hasState = false;
                    ending.hasState = false;
                    location.reload();
                }
            }
        }
    }
}
