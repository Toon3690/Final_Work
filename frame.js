function setup(){
    canvas = createCanvas(2000, 1500, WEBGL);
    wood = loadImage("wood.jpg");
    material=wood;
}

function draw(){
    background(0);
    translate(0,0,0);
    texture(material);
    push();
    translate(0,76,0);
    box(200,20,20);
    pop();
    push();
    translate(0,-76,0);
    box(200,20,20);
    pop();
    push();
    translate(100,0,0);
    box(20,172,20);
    pop();
    push();
    translate(-100,0,0);
    box(20,172,20);
    pop();
    
}