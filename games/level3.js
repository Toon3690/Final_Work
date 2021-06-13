class Level3 extends Game {
    constructor(state) {
        super();
        this.bomen = game.bomen;
        this.counter = game.counter;
        this.leaves = game.leaves;
        this.circ = [];
        this.bodies = [];

        this.audioState = state;

    }

    // Voeg alle bladeren toe aan de wereld en laat ze vallen
    setAutumn() {
        for (var i = 0; i < this.leaves.length; i++) {
            var b = this.leaves[i].add(false);
            this.bodies.push(b);
            Matter.Composite.add(conf1.engine.world, b);
        }
        return this.bodies;
    }

    // update de cirkel van de neus, ga daarna kijken of deze botst met één van de bladeren
    // Als deze botst speel dan het ritsel geluid af, zorg ervoor dat het geluid pas terug kan starten als het vorige afgelopen is
    setNose(bodei) {
        var pose = conf1.lastPose;
        if (pose) {
            Matter.Composite.remove(conf1.engine.world, this.circ);
            this.circ = Matter.Bodies.circle(pose.nose.x, pose.nose.y, 15);
            Matter.Composite.add(conf1.engine.world, this.circ);

            for (var i = 0; i < bodei.length; i++) {
                var collision = Matter.SAT.collides(bodei[i], this.circ);

                if (collision.collided) {

                    if (game.audioState) {
                        this.audio = new Audio('Audio/blad.mp3');
                        this.audio.crossOrigin = 'anonymous';
                        this.audio.play();
                        game.audioState = false;
                        this.audio.onended = function () {
                            game.audioState = true;
                        };
                    }

                }
            }
        }

    }

    // Teken cirkel op de neus
    setEllipses() {
        var pose = this.configure.lastPose;
        if (pose) {
            stroke(0);
            fill(255);
            ellipseMode(CENTER);
            ellipse(pose.nose.x, pose.nose.y, 30);
        }
    }

}