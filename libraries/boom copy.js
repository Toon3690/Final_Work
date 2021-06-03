class Trees2 {
    constructor(posZeroX, posZeroY, posWrist1X, posWrist1Y, posWrist2X, posWrist2Y, ran1, ran2, dist) {

        //push();
        pg.resetMatrix();
        pg.translate(posZeroX, posZeroY);

        this.posZeroX = posZeroX;
        this.posZeroY = posZeroY;
        this.posWrist1X = posWrist1X;
        this.posWrist1Y = posWrist1Y;
        this.posWrist2X = posWrist2X;
        this.posWrist2Y = posWrist2Y;
        this.v0 = createVector(0, 0);
        this.v1 = createVector(500, 0);
        this.v2 = createVector(posWrist1X - posZeroX, posWrist1Y - posZeroY);
        this.v3 = createVector(posWrist2X - posZeroX, posWrist2Y - posZeroY);
        this.angleBetween1 = this.v1.angleBetween(this.v2);
        this.angleBetween2 = this.v1.angleBetween(this.v3);
        this.ran1 = ran1;
        this.ran2 = ran2;
        console.log(ran1);
        console.log(this.angleBetween1);
        console.log(this.angleBetween2);

        this.rot1 = this.angleBetween1;
        this.rot2 = this.angleBetween2;
        
        this.dist = dist;
        //pop();
    }

    // Maak de linkertak
    makeTree() {
        pg.resetMatrix();
        pg.translate(this.posZeroX, this.posZeroY);
        pg.strokeWeight(16);

        pg.line(0, 0, 0, 500);
    
        pg.rotate(this.rot1 + PI / 2);
        branch(80, 10, pg, this.ran1);
    }

    // Maak de rechtertak
    makeTree2() {
        pg.resetMatrix();
        pg.translate(this.posZeroX, this.posZeroY);
        pg.rotate(this.rot2 + PI / 2);
        branch(80, 10, pg, this.ran2);
    }

    // Maak de linker zijtakken
    makeBranches() {
        branch(30, 8, pg, 0.7);
    }

    // Maak de rechter zijtakken
    makeBranches2() {
        branch(40, 8, pg, 0.4);
    }

    // Maak de bladeren aan in de array "tests"
    makeLeaves(a) {
        for (var i = 0; i < a; i++) {
            tests.push(new Test2(this.posZeroX + random(-70, 70) + sin(i) * 100, this.posZeroY + random(-170, -50) + cos(i) * 100, 20, 20, true, 1));
        }

        for (var i = 0; i < tests.length; i++) {
            tests[i].add(true);
        }
    }
}