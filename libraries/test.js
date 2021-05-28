function Test(a, b, c, d) {

    var options = {
        isStatic: false,
        frictionAir: 1
    }
    this.body = Bodies.rectangle(a, b, c, d, options);

    // add all of the bodies to the world
    Composite.add(engine.world, this.body);

    console.log("twerkt");

    this.isOffScreen = function () {
        var pos = this.body.position;
        return (pos.y > height + 100);
    }

    this.removeFromWorld = function () {
        Composite.remove(engine.world, this.body);

    }

    this.drawSprite = function () {

        for (var i = 0; i < body.length; i++) {
            //console.log(body);
            let img = loadImage('../Untitled-2.png');
            const pos = body[i].position;
            const angle = body[i].angle;
            push();
            translate(pos.x, pos.y);
            rotate(angle);
            imageMode(CENTER);
            image(img, 0, 0);
            pop();
        }
    }

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rotate(angle);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, c, d);

        pop();
    }
}