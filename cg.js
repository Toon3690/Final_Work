let pg;
function setup() {
  createCanvas(640, 480);
  pg = createGraphics(640, 480);
}

function draw() {
  background(200);

  pg.background(0);
  pg.noStroke();
  pg.ellipse(pg.width/2, pg.height/2, 50, 50);

  image(pg, 50, 50);
  //image(pg, 0, 0);
}