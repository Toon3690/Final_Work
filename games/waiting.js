class Waiting {
    constructor(configure) {
        this.configure = configure;
        this.hasState = false;
        this.timeNose = 0;
        this.img;
        this.images = [loadImage('images/test1.png'), loadImage('images/test2.png'), loadImage('images/test3.png'), loadImage('images/test4.png')];
        this.counter = 0;
    }


    draw(pose) {
        this.setEllipses(pose);
        this.slideShow();
        return true;
    }

    // Als er zich niemand voor het spel bevindt speel dan de kunstwerken van vorige bezoekers af
    slideShow() {

        if (this.counter == this.images.length) {
            this.counter = 0;
        }
        image(this.images[this.counter], 0, 0, 640, 480);

        if (frameCount % 200 == 0) {
            this.counter++;
        }

    }

    // Teken op elk punt (17 punten) van de gebruiker een cirkel
    setEllipses(pose) {

        if (pose) {
            for (var i = 0; i < pose.keypoints.length; i++) {
                noStroke();
                if (pose.keypoints[i].confidence > 0.6) {
                    fill(255);
                    ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 20);
                }

            }
        }

    }

    // Kijkt of de gebruiker 15 seconden voor de installatie blijft staan
    // Als de neus wordt waargenomen telt er 1 seconden bij, als deze niet wordt waargenomen gaat de teller terug naar 0
    // Als 15 wordt gehaald is het wachtscherm over en gaan we over naar de spelmodus
    checkForStart() {
        if (wait.hasState) {
            var pose = this.configure.lastPose;
            if (pose) {
                if (pose.keypoints[0].score > 0.65) {
                    this.timeNose++;
                } else {
                    this.timeNose = 0;
                }
                console.log(this.timeNose);
                if (this.timeNose == 15) {
                    console.log("laten we beginnen");
                    wait.hasState = false;
                    game.hasState = true;
                }
            }

        }
    }
}