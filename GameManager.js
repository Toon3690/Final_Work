let conf1;
let wacht;
let level1;
let poses = [0, 1, 2, 3];
let wait = false;
let play = false;
let start = false;

let state = 0;

let classes = [];

function setup() {
    classes.push(conf1 = new Configure(50, 50, 255, poses));
    start = conf1.setup();
    classes.push(wacht = new Waiting());
    classes.push(game = new Game(conf1.video, conf1.pg));
    classes.push(ending = new Ending());

}

function draw() {
    background(255);
    checkState();
    cycle();
}

function cycle() {
     wacht.getState();
    if (start) {
        //console.log(conf1.gotPoses());
        if (wacht.state) {
            console.log("nog even wachten");
            console.log(conf1.pose);
            wacht.draw();
        } else if (game.state) {
            //console.log("we kunnen er aan beginnen");
            game.draw(conf1.video);
            //conf1.gotPoses();
            //console.log(conf1.color);
        } else if (ending.state) {
            console.log("good job");
            ending.draw();
        }
    }

    /*switch (state) {
        case 1:
            console.log("nog even wachten");
            wacht.draw();
            break;

    } */


}

function checkState() {
    for (let i = 0; i < classes.length; i++) {
        classes[i].getState(conf1, wacht, game, ending);
    }
}

function keyPressed() {

    if (keyCode == 97) {
        wacht.state = true;
    } else if (keyCode == 98) {
        wacht.state = false;
        game.state = true;
    } else if (keyCode == 99) {
        wacht.state = false;
        game.state = false;
        ending.state = true;
    }
}