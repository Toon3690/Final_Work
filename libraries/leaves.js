// Geïnspireerd door video's van the coding train https://youtube.com/playlist?list=PLRqwX-V7Uu6bLh3T_4wtrmVHOrOEM1ig_
class Leaf {
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
        this.texture = loadImage("images/leafTexture.jpg");
    }

    add(stati) {
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
        try {
            var pos = this.body.position;
            return (pos.y > height + 100);
        } catch (error) {
            console.log(error);
        }
    }

    removeFromWorld(world) {
        Matter.Composite.remove(world, this.body);
    }

    show() {
        try {
            var pos = this.body.position;
            var angle = this.body.angle;

            push();
            translate(pos.x, pos.y, 50);
            rectMode(CENTER);
            rotate(angle);
            strokeWeight(1);
            stroke(34, 139, 34);
            noStroke();
            fill(58, 95, 11);
            rect(0, 0, this.c, this.d);
            texture(this.texture);
            plane(20, 20);
            pop();

        } catch (error) {
            console.log(error);
        }
    }

}