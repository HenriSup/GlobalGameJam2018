class GroundBehavior extends Sup.Behavior {
  
  private groundBody:p2.Body;
  
  awake() {
    
    Sup.getActor("GameManager").getBehavior(GameManager).addGround(this.actor);
    this.groundBody = this.actor.p2Body.body;
    
  }

  update() {
    
  }
}
Sup.registerBehavior(GroundBehavior);
