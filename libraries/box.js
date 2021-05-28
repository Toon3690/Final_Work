function Rectangle(a, b, c, d) {
    var options = {
        friction: 0.1,
        restitution: 0.6
    }
    this.body = Bodies.rectangle(a, b, c, d);

    // add all of the bodies to the world
    Composite.add(engine.world, this.body);



    this.isOffScreen = function () {
        var pos = this.body.position;
        return (pos.y > height + 100);
    }

    this.removeFromWorld = function () {
        Composite.remove(engine.world, this.body);

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
        rect(a, b, c, d);

        pop();
    }
}