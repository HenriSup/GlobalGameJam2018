class CharacterBehavior extends Sup.Behavior {
  
  private GameManager:GameManager = Sup.getActor("GameManager").getBehavior(GameManager);
  private characterBody:p2.Body;
  
  private speed = 5;
  private jumpSpeed = 2;
  private canJump = false;
  
  awake() {
    Sup.getActor("GameManager").getBehavior(GameManager).addCharacter(this.actor);
    this.characterBody = this.actor.p2Body.body;
  }

  update() {
    let velocity:Sup.Math.Vector2 = new Sup.Math.Vector2(this.characterBody.velocity[0],this.characterBody.velocity[1]);
    this.canJump = this.GameManager.isTouchingGround(this.characterBody);
    
    let left = Sup.Input.isKeyDown('Q');
    let right = Sup.Input.isKeyDown('D');
    let jump = Sup.Input.isKeyDown('SPACE');
    let down = Sup.Input.isKeyDown('S');
    
    let xInput = 0;
    let yInput = 0;
    
    if (left) {
      xInput -= this.speed;
    }
    if (right) {
      xInput += this.speed;
    }
    if(jump && this.canJump){
      yInput += this.jumpSpeed;
    }
    
    this.characterBody.velocity = [xInput,velocity.y+yInput];
    
  }
  
  
  
}
Sup.registerBehavior(CharacterBehavior);
