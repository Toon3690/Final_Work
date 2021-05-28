let video;
let poseNet;
let pose;
let skeleton;

let poses = [];
let angle = 0;

var slider;

let bomen = [];

let spring = true;
let summer = false;
let autumn = false;
let winter = false;

let angleBetween;

let tak = 5;
let tak2 = 5;

let teller = 0;
let teller2 = 0;

let v5;
let rot;

let dist;


//  Matter.js
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body;


var engine;
var composite;
var circles = [];
var boundaries = [];
var tests = [];
let mConstraint;
var ground;
var circies = [];
let testen;


function setup() {

    // Canvas + framerate
    createCanvas(640, 480);
    frameRate(40);

    // creëer de engine + begin te runnen
    engine = Engine.create();
    world = engine.world;
    composite = Engine.composite;
    Matter.Runner.run(engine);

    // Rendert aparte sheet voor graphics
    pg = createGraphics(640, 480);
    pj = createGraphics(640, 480);
    drawFlowers();

    pixelDensity(1);
/*     graphics = createGraphics(640, 480);
    graphics.clear(); */

    // Setup webcam
    video = createCapture(VIDEO);
    video.size(width, height);
    console.log(VIDEO);
    video.hide();

    rectMode(CENTER);

    // Setup voor Posenet
    const optionsForPoseNet = {
        flipHorizontal: true,
        detectionType: 'single'
    };
    poseNet = ml5.poseNet(video, optionsForPoseNet);
    poseNet.on('pose', gotPoses);

Matter.Events.on(Runner, "beforeUpdate", function(e) {
	// random force to the left (from right edge center, affects torque?)
	let from = Matter.Vector.create(render.options.width, render.options.height/2)
	let force = Matter.Vector.create(Matter.Common.random(-2e-4, 0), 0)

	// all bodies affected by the wind
	myComposite.bodies.forEach(function(body) {
		Matter.Body.applyForce(body, from, force)
	})
})
   

}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;

        //circ = Bodies.circle(pose.leftWrist.x, pose.leftWrist.y, 20);
        //Composite.add(engine.world, circ);
    }
}


function draw() {
    Engine.update(engine);

    // Display video in the background
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);
    pop();

    // Als posenet gestart is Teken dan herkenningspunten voor de neus en polsen, Kijk ook hoever de persoon zich van de camera bevindt
    if (pose) {
        //var d1 = int(dist(pose.keypoints[0].position.x, pose.keypoints[0].position.y, pose.keypoints[1].position.x, pose.keypoints[1].position.y));
        let nose1 = createVector(pose.keypoints[0].position.x, pose.keypoints[0].position.y);
        let eye1 = createVector(pose.keypoints[1].position.x, pose.keypoints[1].position.y);

        dist = nose1.dist(eye1);
        //console.log(dist);
        //console.log(pose);
        ellipse(pose.keypoints[0].position.x, pose.keypoints[0].position.y, 20);
        stroke(255, 0, 0);
        if (pose.leftWrist.confidence > 0.35) {
            //console.log(pose.leftWrist.confidence);
            ellipse(pose.keypoints[9].position.x, pose.keypoints[9].position.y, 20);
        } else if (pose.rightWrist.confidence > 0.35) {
            ellipse(pose.keypoints[10].position.x, pose.keypoints[10].position.y, 20);
        }

    }

    image(pg, 0, 0);
    printSeason();

    //  Teken de bladeren, verwijder de bladeren als ze zich telaag bevinden
    for (var i = 0; i < tests.length; i++) {
        tests[i].show();
        //tests.drawSprite();
        if (tests[i].isOffScreen()) {
            console.log("offff");
            tests[i].removeFromWorld();
            tests.splice(i, 1);
            i--;
        }
    }

}





    // Maak bij een klik een boom aan en push deze op de eerstvolgende plaats in de array met zijn waarden
function mouseClicked() {
    if (pose) {
        var name = "boom" + teller;
        //name = new Trees(pose.keypoints[0].position.x, pose.keypoints[0].position.y, pose.keypoints[9].position.x, pose.keypoints[9].position.y, pose.keypoints[10].position.x, pose.keypoints[10].position.y, round(random(5, 10)), round(random(5, 10)));
        name = new Trees(pose.keypoints[0].position.x, pose.keypoints[0].position.y, 200, 200, 900, 200, random(0.1, 0.4), random(0.1, 0.4));
        //name = new Trees(300,300, 200, 200, 900, 200);
        bomen.push(name);
        //console.log(name);

        bomen[teller].makeTree();

        bomen[teller].makeTree2();

        //setInterval(growTrees, 1000);
        teller++;
    }
}

/* setInterval(function(){
    if(spring){
        if (pose) {

            var name = "boom" + teller;
            name = new Trees(pose.keypoints[0].position.x, pose.keypoints[0].position.y, pose.keypoints[9].position.x, pose.keypoints[9].position.y, pose.keypoints[10].position.x, pose.keypoints[10].position.y);
            //name = new Trees(pose.keypoints[0].position.x, pose.keypoints[0].position.y, 200, 200, 900, 200);
            bomen.push(name);
            //console.log(name);
    
            bomen[teller].makeTree();
            
            bomen[teller].makeTree2();
    
            //setInterval(growTrees, 1000);
            teller++;
        }
    }
}, 6000); */

function keyPressed() {

    // Bij drukken op "L" overschakelen naar lente
    if (keyCode === 76) {
        summer = false;
        spring = true;
        autumn = false;
        for (var i = 0; i < bomen.length; i++) {
            //console.log(bomen[i]);
            bomen[i].makeLeaves(50);
        }

    // Bij drukken op "S" overschakelen naar zomer
    } else if (keyCode === 83) {
        summer = true;
        spring = false;
        autumn = false;
        for (var i = 0; i < bomen.length; i++) {
            console.log(bomen[i]);

            bomen[i].makeTree();
            bomen[i].makeBranches();
            bomen[i].makeTree2();
            bomen[i].makeBranches2();
            bomen[i].makeLeaves(70);
        }

    // Bij drukken op "A" overschakelen naar Herfst
    } else if (keyCode === 65) {
        summer = false;
        spring = false
        autumn = true;
    /*  for (var i = 0; i < tests.length; i++) {
            tests[i].removeFromWorld();
        } */
        for (var i = 0; i < tests.length; i++) {
            var b = tests[i].add(false);
            Composite.add(engine.world, b);
        }
    } 
}

// Functie om verschillende soorten takken aan te maken
function branch(len, str, gp, rota, ran1, ran2) {
    //console.log(ran1);
    push();

    //gp.stroke(255, 0, 0);
    /*     gp.strokeWeight(str);
        gp.line(0, 0, 0, -len);
        gp.translate(0, -len);

        //gp.stroke(25, 0, 100);
        gp.strokeWeight(str * 0.8);
        gp.rotate(rota);
        gp.line(0, 0, 0, -len * 0.8);
        gp.rotate(-rota * 4);
        gp.line(0, 0, 0, -len * 0.8);
        gp.translate(0, -len * 0.8); */

    //gp.stroke(100, 255, 0);

    gp.strokeWeight(str);
    gp.line(0, 0, 0, -len);
    gp.translate(0, -len);

    gp.strokeWeight(str * 0.8);
    gp.rotate(rota);
    gp.line(0, 0, 0, -len * 0.8);
    gp.rotate(-rota * 4);
    gp.line(0, 0, 0, -len * 0.8);
    gp.translate(0, -len * 0.8);

    gp.strokeWeight(str * 0.8);
    gp.rotate(rota);
    gp.line(0, 0, 0, -len * 0.8);
    gp.rotate(-rota * 4);
    gp.line(0, 0, 0, -len * 0.8);
    gp.translate(0, -len * 0.8);

    gp.strokeWeight(str * 0.6);
    gp.rotate(rota);
    gp.line(0, 0, 0, -len * 0.6);
    gp.rotate(-rota * 2);
    gp.line(0, 0, 0, -len * 0.6);
    gp.translate(0, -len * 0.6);

    gp.strokeWeight(str * 0.4);
    gp.rotate(rota);
    gp.line(0, 0, 0, -len * 0.4);
    gp.rotate(-rota);
    gp.line(0, 0, 0, -len * 0.4);
    gp.translate(0, -len * 0.4);

    rota += 0.2;

    pop();

}

// Wanneer seizoen veranderd, ook kleur, tint, bladeren, zon, bloemen aanpassen
function printSeason() {
    textSize(32);
    var season;
    if (spring) {
        season = "Lente";
        pg.stroke(83, 100, 10);
        tint(158, 231, 245);
        image(pj, 0, 0);
    } else if (summer) {
        season = "Zomer"
        pg.stroke(83, 53, 10);
        updateTree();
        tint(255, 255, 237);
        makeSun();

    } else if (autumn) {
        season = "Herfst"
        pg.stroke(150, 53, 10);
        tint(199, 165, 138);
        updateTree();
    } else {
        season = "Winter"
    }
    //text(season, 10, 30);
}

// Voor als er iets wordt aangepast aan de boom, terug de juiste te displayen
function updateTree() {
    for (var i = 0; i < bomen.length; i++) {
        //console.log(bomen[i]);
        bomen[i].makeTree();
        bomen[i].makeBranches();
        bomen[i].makeTree2();
        bomen[i].makeBranches2();
    }
}

// Maak in de zomer een zon
function makeSun() {
    push();
    strokeWeight(2);
    stroke(255, 120, 20);
    fill(250, 253, 15);
    translate(0, 0);
    /*     rotate(PI/2);
        ellipse(0,0,20);
        var x = 200 * cos(angle);
    	var y = 100 + 350 * sin(angle); */
    ellipse(20, 20, 120, 120);
    pop();

    push();
    //rotate(frameCount / 2);
    translate(300, 200);


    pop();
    angle += 0.01;

}

// Maak in de lente bloemen
function drawFlowers() {

    for (let a = 0; a < 40; a++) {

        push();

        pj.resetMatrix();
        pj.translate(random(30, 610), height - random(30, 60));

        pj.stroke(0, 100, 0);
        pj.strokeWeight(0.5);
        pj.line(0, 0, 0, 200);

        var r = random(10, 30);
        var r2 = random(10, 15);


        var r3 = round(random(2, 7));

        //pj.fill(200, 200, 50, 150);
        pj.fill(random(0, 255), random(0, 255), random(0, 255), 150);
        for (let i = 0; i < (6 * r3); i++) {
            pj.noStroke();
            pj.ellipse(0, r2, 10, r);
            pj.rotate(PI / (3 * r3));
            pj.stroke(150, 255, 12);

        }
        pj.noStroke();
        pj.fill(random(0, 255), random(0, 255), random(0, 255));
        pj.ellipse(0, 0, 15);
        pop();
    }
}

