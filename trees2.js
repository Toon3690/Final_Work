var angle = 0;

var slider;


let maxLevel = 7;
let split = 2;
let angleBetween;

let tak = 5;
let tak2 = 5;

let teller = 0;

let v5;

let executed = false;
let executed2 = false;
let executed3 = false;
let executed4 = false;

function setup() {
    createCanvas(600, 600);
    //noLoop();
    pg = createGraphics(600, 600);
    pj = createGraphics(600, 600);
    //rotate(PI);
}

function draw() {
    background(51);
    stroke(255);
    line(300, height, 300, height - 100);
    //rotate(PI);
    //console.log("drawing");
    if (!executed2) {
        push();

        let v0 = createVector(300, 500);
        let v1 = createVector(200, -200);
        let v2 = createVector(0, 200);
        pg.translate(v0.x, v0.y)

        pg.strokeWeight(20);
        //line(0, 0, v1.x, v1.y);
        pg.line(0, 0, v2.x, v2.y);

        angleBetween = v2.angleBetween(v1);
        //console.log(angleBetween);

        pop();
        executed2 = true;
    }

    push();
    if (!executed3) {
        pj.resetMatrix();
        pj.stroke(255, 0, 0);
        pj.translate(300, height - 100);
        pj.rotate(random(0, PI/2));
        branch(50, 8, pj);

        executed3 = true;
        pj.stroke(255, 0, 0);
        setInterval(growTrees2, 1000);
    }
    pop();

    push();
    if (!executed) {
        console.log("2de");
        pg.resetMatrix();
        pg.stroke(255, 0, 255);
        pg.translate(300, height - 100);
        pg.rotate(random(PI + 1.5, TWO_PI));
        branch(70, 8, pg);
        executed = true;
        pg.stroke(0, 100, 0);
        setInterval(growTrees, 1000);
    }

    pop();


    image(pg, 0, 0);
    image(pj, 0, 0);
}

function mouseClicked() {

    if (!executed4) {
        push();
        pg.resetMatrix();
        let v0 = createVector(200, 500);
        let v1 = createVector(200, -200);
        let v2 = createVector(0, 200);
        pg.translate(v0.x, v0.y);
        pg.strokeWeight(20);
        pg.line(0, 0, v2.x, v2.y);

        angleBetween = v2.angleBetween(v1);
        pop();
        executed4 = true;
    }
    executed3 = false;
    executed = false;
    tak = 5;
    tak2 = 5;

}



function growTrees() {
    if (tak > 0) {
        branch(tak * 3, 5, pg);
        if (tak % 2 == 0) {
            pg.rotate(0.1 * tak);
        } else {
            pg.rotate(-0.1 * tak);
        }

        console.log(tak);
        tak--;
    }
}

function branch(len, str, gp) {

    push();

    gp.strokeWeight(str);
    gp.line(0, 0, 0, -len);
    gp.translate(0, -len);


    gp.strokeWeight(str * 0.8);
    gp.rotate(0.2);
    gp.line(0, 0, 0, -len * 0.8);
    gp.rotate(-0.3);
    gp.line(0, 0, 0, -len * 0.8);
    gp.translate(0, -len * 0.8);

    gp.strokeWeight(str * 0.8);
    gp.rotate(0.8);
    gp.line(0, 0, 0, -len * 0.8);
    gp.rotate(-0.4);
    gp.line(0, 0, 0, -len * 0.8);
    gp.translate(0, -len * 0.8);
    pop();
}

function growTrees2() {
    if (tak2 > 0) {
        branch(tak2 * 3, 5, pj);
        if (tak2 % 2 == 0) {
            pj.rotate(0.1 * tak2);
        } else {
            pj.rotate(-0.1 * tak2);
        }

        console.log(tak2);
        tak2--;
    }
}