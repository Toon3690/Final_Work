function Circle(x, y, r) {
    var options = {
        friction: 0.1,
        restitution: 0.6
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;

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
        ellipseMode(CENTER);
        rotate(angle);
        strokeWeight(1);
        stroke(255);
        fill(127);
        ellipse(0, 0, this.r * 2);

        pop();
    }
}