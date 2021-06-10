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

let skel = false;
let el = false;
let vid = false;

function setup() {

    // Canvas + framerate
     canv = createCanvas(640, 480);
    frameRate(60);

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
    if (vid) {
        push();
        translate(video.width, 0);
        scale(-1, 1);
        image(video, 0, 0, video.width, video.height);
        pop();
    }

    // Als posenet gestart is Teken dan herkenningspunten voor de neus en polsen, Kijk ook hoever de persoon zich van de camera bevindt
    if(skel){
        drawSkeleton();
    }
    
    if(el){
        drawEllipses();
    }

}

function keyPressed(){
    if(keyCode == 97){
        skel = false;
        el = true;
    }else if (keyCode == 98){
        skel = true;
        el = false;
    } 
    if(keyCode == 99){
        vid = true;
    }else if(keyCode == 100){
        vid = false;
    }
}


function drawEllipses(){
    if (pose) {
        //console.log(poses);
        for (let i = 0; i < pose.keypoints.length; i++) {
            let key = pose.keypoints[i];
            //console.log(key.position.y);
            if (key.score > 0.4) {
                fill(255, 255, 0);
                ellipse(key.position.x, key.position.y, 20);
            }
        }
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





