let conf1;
let wacht;
let level1;
let poses = [0, 1, 2, 3];
let wait = false;
let play = false;
let start = false;

let state = 0;

let klassen = [];

function setup() {
    klassen.push(conf1 = new Configure());
    start = conf1.setup();
    klassen.push(wacht = new Waiting(conf1));

    if(start){
        wacht.setup();
        wacht.state = true;
        setInterval(() => wacht.checkForStart(), 1000);
    }
    
    klassen.push(game = new Game(conf1));
    klassen.push(ending = new Ending());

}

function draw() {
    background(255);
    //checkState();
    conf1.draw();
    cycle();
}

function cycle() {

    if (start) {
        //console.log(conf1._lastPose);
        if (wacht.state) {
            console.log("nog even wachten");
            //wacht.setup();
            wacht.draw();
        } else {
            if (game.state){
            //console.log("we kunnen er aan beginnen");
            game.setup();
            game.draw(conf1.video);
            } else  {
                if (ending.state) {
                    console.log("good job");
                    ending.draw()
                }  else {
                    wacht.state = false;
                    game.state = false;
                    ending.state = false;
                    // TODO wacht op true
                    // TODO game reset
                    // TODO ending reset
                    // TODO reset van spel

                }
            }
            // TODO teken een andere state error
        }
    }
}

function checkState() {
    for (let i = 0; i < klassen.length; i++) {
        klassen[i].getState(conf1, wacht, game, ending);
    }
}

function mouseClicked(){
    //console.log("nuuu");
    //game.setTrees();
    //game.changePol();
    game.doSpring();
    if(wacht.state){
        wacht.onClick();
    }
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
    }else if (keyCode == 83) {
        game.updateTrees();
        console.log("jajajajaja");
    }else if (keyCode == 65) {
        game.setAutumn();
        console.log("jajajajaja");
        
    }
    console.log(keyCode);
}