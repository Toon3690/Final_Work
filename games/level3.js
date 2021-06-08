class Level3 extends Game {
    constructor(configure, state) {
        super(configure);
        this.bomen = game.bomen;
        this.teller = game.teller;
        this.bladeren = game.bladeren;
        this.circ = [];
        this.bodies = [];

        this.audioState = state;
        
    }

    setAutumn() {
        for (var i = 0; i < this.bladeren.length; i++) {
            var b = this.bladeren[i].add(false);
            this.bodies.push(b);
            //console.log(this.bodies.length);
            Matter.Composite.add(this.configure.engine.world, b);

        }

        return this.bodies;
    }


    setNose(bodei) {
        var pose = this.configure.lastPose;
        if (pose) {
            Matter.Composite.remove(this.configure.engine.world, this.circ);
            this.circ = Matter.Bodies.circle(pose.nose.x, pose.nose.y, 15);
            Matter.Composite.add(this.configure.engine.world, this.circ);

            //Stackoverflow/github
            //console.log(bodei.length);
            for (var i = 0; i < bodei.length; i++) {
                var collision = Matter.SAT.collides(bodei[i], this.circ);
                //sconsole.log("jaja");
                if (collision.collided) {
                    //console.log("botsing");
                    console.log(game.audioState);

                    this.audio = new Audio('Audio/blad.mp3');
                    this.audio.crossOrigin = 'anonymous';
                    
                    if (game.audioState) {
                        this.audio.play();
                        game.audioState = false;
                        this.audio.onended = function () {
                            game.audioState = true;
                            console.log("tis vanda");
                        };
                    }

                    }
                }

            }
        }

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