class LaserBehavior extends Sup.Behavior {
  
  private moveSpeed = 10;
  private angle = 0;
  
  awake() {
    
  }

  update() {
    let velocity = this.actor.p2Body.body.velocity;
    
    //COS SIN ANGLE CONNARD
    let entryX = Math.cos(this.angle);
    let entryY = Math.sin(this.angle);
    
    let xMove = entryX*this.moveSpeed;
    let yMove = entryY*this.moveSpeed;
    this.actor.p2Body.body.velocity = [xMove,yMove];
    
    let angle = Math.atan2(xMove,yMove);
    let laserSprite = this.actor.getChild("Sprite");
    laserSprite.setEulerZ(this.angle);
    
    this.animate(velocity);
  }
  
  animate(velocity){

    let x = velocity[0];
    let y = velocity[1];
    
    let laserSpriteRenderer:Sup.SpriteRenderer = this.actor.getChild("Sprite").spriteRenderer;
    let actualAnimation:string = laserSpriteRenderer.getAnimation();
    
    let frameCount:number = laserSpriteRenderer.getAnimationFrameCount();
    let frameIndex:number = laserSpriteRenderer.getAnimationFrameIndex();
    let lastFrameOfActualAnimation:boolean = frameIndex == (frameCount - 1);
    
    if(actualAnimation == "Start" && lastFrameOfActualAnimation){
      laserSpriteRenderer.setAnimation("Run");
    }
  }
  
  public setAngle(angle){
    this.angle = angle;
  }
}
Sup.registerBehavior(LaserBehavior);
