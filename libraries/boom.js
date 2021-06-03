class Trees {
    constructor(configure, posZeroX, posZeroY, posWrist1X, posWrist1Y, posWrist2X, posWrist2Y, ran1, ran2, dist) {

        //push();
        this.configure = configure;
        this.graph = configure.graph;
        this.graph.resetMatrix();
        this.graph.translate(posZeroX, posZeroY);
        this.Bodies = configure.Bodies;

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
        //console.log(ran1);
        //console.log(this.angleBetween1);
        //console.log(this.angleBetween2);

        this.tests = [];

        this.rot1 = this.angleBetween1;
        this.rot2 = this.angleBetween2;
        
        this.dist = dist;
        //pop();
    }

    get testsss() {
        return this._tests;
    }

    // Maak de linkertak
    makeTree() {
        this.graph.resetMatrix();
        this.graph.translate(this.posZeroX, this.posZeroY);
        this.graph.strokeWeight(16);

        this.graph.line(0, 0, 0, 500);
    
        this.graph.rotate(this.rot1 + PI / 2);
        this.branch(80, 10,this.graph, this.ran1);
    }

    // Maak de rechtertak
    makeTree2() {
        this.graph.resetMatrix();
        this.graph.translate(this.posZeroX, this.posZeroY);
        this.graph.rotate(this.rot2 + PI / 2);
        this.branch(80, 10, this.graph, this.ran2);
    }

    // Maak de linker zijtakken
    makeBranches() {
        this.branch(30, 8, this.graph, 0.7);
    }

    // Maak de rechter zijtakken
    makeBranches2() {
        this.branch(40, 8, this.graph, 0.4);
    }


    branch(len, str, gp, rota, ran1, ran2) {
        //console.log(ran1);
        push();
        //gp.scale(dist/50);

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



    // Maak de bladeren aan in de array "tests"
    makeLeaves(a, tests) {
        for (var i = 0; i < a; i++) {
            tests.push(new Test2(this.posZeroX + random(-70, 70) + sin(i) * 100, this.posZeroY + random(-170, -50) + cos(i) * 100, 20, 20, true, 1));
        }

        for (var i = 0; i < tests.length; i++) {
            //console.log(this.Bodies);
            tests[i].add(true, this.Bodies);
        }
    }
}