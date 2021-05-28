let conf1;
let wacht;
let level1;
let poses = [0, 1, 2, 3];
let wait = false;
let play = false;

function setup() {
    conf1 = new Configure(50, 50, 255, poses);
    conf1.setup();
    //wait = conf1.getState();
    //console.log(wait);
}


function draw() {
    background(255);
    //console.log(conf1.getPose());
    cycle();

}


function cycle() {
    wait = conf1.wait;
    //conf1.draw();
    console.log("wachten " + wait);
    do{
        wacht = new Waiting();
        wacht.draw();
        wacht.changeState();
        console.log("jaja");
        play = wacht.play;
        wait = wacht.wait;
        console.log(" wachten " + wait);

    }while(wait)

    if (play) {
        level1 = new Levels();
        level1.draw(conf1.video);
        console.log("lvl");
    }
    //console.log(conf1.wait);

}