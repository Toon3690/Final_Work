let video;
let poseNet;
let pose;
let skeleton;

let poses = [];
let angle = 0;

var slider;

let angleBetween;

let teller = 0;
let teller2 = 0;

let dist;


var engine;
var composite;
var circles = [];
var boundaries = [];
var tests = [];
let mConstraint;
var ground;
var circies = [];
let testen;

var tijdNeus = 0;
let waitRoom = false;
let timer = 5

let play = false;

let canv;
let img;
let snapshot;
let to_save;
let counter = 1;

const voice1 = new Audio('voice1.m4a');

function setup() {

    // Canvas + framerate
     canv = createCanvas(640, 480);
    frameRate(40);

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
    
    img1 = createImage(640, 480);
    img2 = createImage(640, 480);
    img3 = createImage(640, 480);
    img4 = createImage(640, 480);

}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
        //circ = Bodies.circle(pose.leftWrist.x, pose.leftWrist.y, 20);
        //Composite.add(engine.world, circ);
    }
}


function draw() {

    background(0);
    // Display video in the background
    if (waitRoom) {
        push();
        translate(video.width, 0);
        scale(-1, 1);
        image(video, 0, 0, video.width, video.height);
        pop();
    }

    // Als posenet gestart is Teken dan herkenningspunten voor de neus en polsen, Kijk ook hoever de persoon zich van de camera bevindt
    if (pose) {
        //console.log(poses);
        for (let i = 0; i < pose.keypoints.length; i++) {
            let key = pose.keypoints[i];
            //console.log(key.position.y);
            if (key.score > 0.6) {
                fill(255, 255, 0);
                //ellipse(key.position.x, key.position.y, 8);
            }
        }
    }
    drawSkeleton();
    if(waitRoom){
        textSize(32);
        fill(255,0,0);
        textAlign(CENTER, CENTER);
        text("Blijf even staan, we beginnen zo", 320, 240);
        //voice1.play();
    }

   if(counter == 5){
    image(img1, 0,0,320,240);
    image(img2, 320,0,320,240);
    image(img3, 0,240,320,240);
    image(img4, 320,240,320,240);
   }
}

function drawSkeleton() {
    if (pose) {
        //console.log(skeleton);
        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            //console.log(pose);
            push();
            strokeWeight(20);
            stroke(255,255,0);
            line(a.position.x, a.position.y,b.position.x,b.position.y);   
            pop();   
          }
    }
}



setInterval(function checkForStart() {
    if (pose.keypoints[0].score > 0.8) {
        //console.log("hey jij daar, ik zie je neus");
        tijdNeus++;
    } else {
        //console.log("neus?");
        tijdNeus = 0;
    }

    console.log(tijdNeus);
    if (tijdNeus == 8) {
        console.log("laten we beginnen");
        waitRoom = true;
    }else if(tijdNeus == 20) {
        playing = true;
        waitroom = false;
    }
}, 1000);


// Maak bij een klik een boom aan en push deze op de eerstvolgende plaats in de array met zijn waarden
function mouseClicked() {
    //img.loadPixels();
    if(counter == 1){
        img1 = get( 0, 0, 640, 480 );
    }else if(counter == 2){
        img2 = get( 0, 0, 640, 480 );
    }else if(counter == 3){
        img3 = get( 0, 0, 640, 480 );
    }else if(counter == 4){
        img4 = get( 0, 0, 640, 480 );
    }
   counter++;
}

function keyPressed(){
    //console.log(snapshot);
    //noLoop();
    
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