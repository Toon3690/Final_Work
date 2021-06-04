class Level3 extends Game {
    constructor(configure) {
        super(configure);
        this.bomen = game.bomen;
        this.teller = game.teller;
        this.bladeren = game.bladeren;
    }
    
    setAutumn(){
        for (var i = 0; i < this.bladeren.length; i++) {
            var b = this.bladeren[i].add(false);
            Matter.Composite.add(this.configure.engine.world, b);
        }    
    }
      
}