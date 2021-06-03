class Test2 {
    constructor(a, b, c, d, stat, air, ran) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.stat = stat;
        this.air = air;
        this.options = {
            isStatic: this.stat,
            frictionAir: this.air
        }

    }

    add(stati, Bodies) {
        this.body = Matter.Bodies.rectangle(this.a, this.b, this.c, this.d, {
            isStatic: stati,
            frictionAir: this.air
        });
        Matter.Body.rotate(this.body, random(0, 200));
        return this.body;
    }

    change() {
        this.stat = false;
    }

    isOffScreen() {
        var pos = this.body.position;
        return (pos.y > height + 100);
    }

    removeFromWorld(world) {
        Matter.Composite.remove(world, this.body);
    }

    show() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rotate(angle);
        strokeWeight(1);
        stroke(34, 139, 34);
        fill(58, 95, 11);
        //console.log(this.a);
        rect(0, 0, this.c, this.d);

        pop();
    }

}