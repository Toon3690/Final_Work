class Level3 extends Game {
    constructor(configure) {
        super(configure);
        this.bomen = game.bomen;
        this.teller = game.teller;
        this.bladeren = game.bladeren;
        this.circ = [];
        this.bodies = [];
        this.audio = new Audio('blad.mp3');
        this.audio.crossOrigin = 'anonymous';

        this.audiostate = true;
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
            this.circ = Matter.Bodies.circle(pose.nose.x, pose.nose.y, 20);
            Matter.Composite.add(this.configure.engine.world, this.circ);


            //Stackoverflow/github
            console.log(bodei.length);
            for (var i = 0; i < bodei.length; i++) {
                var collision = Matter.SAT.collides(bodei[i], this.circ);
                //sconsole.log("jaja");
                if (collision.collided) {
                    console.log("botsing");

                    if(this.audiostate){
                        this.audio.play();
                        this.audioState = false;
                        if(this.audio.ended){
                            this.audioState = true;
                        }
                    }
                    
                    
                }
            }

        }
    }

}