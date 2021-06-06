class Trees {
    constructor(configure, posZeroX, posZeroY, posWrist1X, posWrist1Y, posWrist2X, posWrist2Y, ran1, ran2, dist) {

        //push();
        this.configure = configure;
        this.graph = configure.graph;
        this.graph.resetMatrix();
        this.graph.translate(posZeroX, posZeroY);
        this.Bodies = Matter.Bodies;

        this.tree = loadImage("tree.jpg");

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

        this.tests = [];

        this.rot1 = this.angleBetween1;
        this.rot2 = this.angleBetween2;
        
        console.log(this.rot1);

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

     makeTrees3(){
       // console.log("3d shit");
        //this.graph.resetMatrix();
        
        push();
        noStroke();
        texture(this.tree)
        //translate(this.posZeroX, this.posZeroY+225, -25);
        translate(this.posZeroX, 300+225, -25);
        box(20, 450, 30);
        
        this.branch2(150);
        pop();
    }

    branch2(len){

        texture(this.tree)

        push();
        var rota = this.rot1 + PI / 2;
        var X = sin(rota) * len/2;
        var Y = cos(rota) * len/2;
        translate(0, -200);
        translate(X, -Y);
        rotate(rota);
        box(20, len, 30);
        
        push();
        var rota2 = 0.6;
        var X2 = sin(rota2) * len/4;
        var Y2 = cos(rota2) * len/4;
        translate(0, -len/2+25);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/1.5, 30);

        push();
        var rota2 = 0.3;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();

        push();
        var rota2 = -0.7;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();

        pop();

        push();
        var rota3 = -0.6;
        var X3 = sin(rota3) * len/4;
        var Y3 = cos(rota3) * len/4;

        translate(0, -len/2+25);
        translate(X3, -Y3);
        rotate(rota3);
        box(20, len/1.5, 30);
        push();
        var rota2 = 0.3;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();

        push();
        var rota2 = -0.7;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();
        pop();
        pop();




        push();
        var rota = this.rot2 + PI / 2;
        var X = sin(rota) * len/2;
        var Y = cos(rota) * len/2;
        translate(0, -200);
        translate(X, -Y);
        rotate(rota);
        box(20, len, 30);
        
        push();
        var rota2 = 0.6;
        var X2 = sin(rota2) * len/4;
        var Y2 = cos(rota2) * len/4;
        translate(0, -len/2+25);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/1.5, 30);

        push();
        var rota2 = 0.3;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();

        push();
        var rota2 = -0.7;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();

        pop();

        push();
        var rota3 = -0.6;
        var X3 = sin(rota3) * len/4;
        var Y3 = cos(rota3) * len/4;

        translate(0, -len/2+25);
        translate(X3, -Y3);
        rotate(rota3);
        box(20, len/1.5, 30);
        push();
        var rota2 = 0.3;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();

        push();
        var rota2 = -0.7;
        var X2 = sin(rota2) * len/6;
        var Y2 = cos(rota2) * len/6;
        translate(0, -len/4);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/2, 30);
        pop();
        pop();
        pop();

        


        // Rechtse
/*          push();
        var rota = this.rot2 + PI / 2;
        var X = sin(rota) * len/2;
        var Y = cos(rota) * len/2;
        //console.log(X);
        //console.log(Y);
        translate(0, -200);
        translate(X, -Y);
        rotate(rota);
        box(20, len, 30);
        
        push();
        var rota2 = 0.3;
        var X2 = sin(rota2) * len/4;
        var Y2 = cos(rota2) * len/4;
        //console.log(X);
        //console.log(Y);
        translate(0, -len/2+25);
        translate(X2, -Y2);
        rotate(rota2);
        box(20, len/1.5, 30);
        pop();

        var rota3 = -0.6;
        var X3 = sin(rota3) * len/4;
        var Y3 = cos(rota3) * len/4;

        translate(0, -len/2+25);
        translate(X3, -Y3);
        rotate(rota3);
        box(20, len/1.5, 30);

        pop();  */

        

        /* push();
        translate(-70.7, -len/2 - 70.7);
        rotate(-45);
        angleMode(DEGREES);
        box(20, len, 30);
        pop(); */


        
    } 


    // Maak de bladeren aan in de array "tests"
    /* makeLeaves(a, tests) {
        for (var i = 0; i < a; i++) {
            tests.push(new Test2(this.posZeroX + random(-70, 70) + sin(i) * 100, this.posZeroY + random(-170, -50) + cos(i) * 100, 20, 20, true, 1));
        }

        /* for (var i = 0; i < tests.length; i++) {
            //console.log(this.Bodies);
            tests[i].add(true, this.Bodies);
        } */
    
}