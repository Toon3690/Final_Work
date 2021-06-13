class Trees {
    constructor(posZeroX, posZeroY, posWristLX, posWristLY, posWristRX, posWristRY) {

        this.tree = loadImage("images/tree.jpg");

        this.posZeroX = posZeroX;
        this.posZeroY = posZeroY;
        this.posWristLX = posWristLX;
        this.posWristLY = posWristLY;
        this.posWristRX = posWristRX;
        this.posWristRY = posWristRY;

        // Maak vectors van deze hoeken en ga kijken wat de hoek hiertussen is
        this.v0 = createVector(0, 0);
        this.v1 = createVector(500, 0);
        this.v2 = createVector(posWristLX - posZeroX, posWristLY - posZeroY);
        this.v3 = createVector(posWristRX - posZeroX, posWristRY - posZeroY);
        this.angleBetween1 = this.v1.angleBetween(this.v2);
        this.angleBetween2 = this.v1.angleBetween(this.v3);

        this.rot1 = this.angleBetween1;
        this.rot2 = this.angleBetween2;
    }

    // Teken de stam van de boom
     makeTrees(){
        push();
        noStroke();
        texture(this.tree)
        translate(this.posZeroX, this.posZeroY+225, -25);
        box(20, 450, 30);
        this.branch(150);
        pop();
    }

    // Teken de takken
    branch(len){

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
    } 
}