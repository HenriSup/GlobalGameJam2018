class CharacterBehavior extends Sup.Behavior {
  
  private GameManager:GameManager = Sup.getActor("GameManager").getBehavior(GameManager);
  private characterBody:p2.Body;
  
  private moveSpeed = 4;
  private jumpSpeed = 10*1000;
  private canJump = false;
  private gunActor:Sup.Actor;
  private ballSpeed:number = 1000;
  
  awake() {
    Sup.getActor("GameManager").getBehavior(GameManager).addCharacter(this.actor);
    this.characterBody = this.actor.p2Body.body;
    this.gunActor = this.actor.getChild("Weapon");
  }

  update() {
    let velocity:Sup.Math.Vector2 = new Sup.Math.Vector2(this.characterBody.velocity[0],this.characterBody.velocity[1]);
    this.canJump = this.GameManager.isTouchingGround(this.characterBody);

    let leftStickX = Sup.Input.getGamepadAxisValue(0,0);
    let leftStickY = -Sup.Input.getGamepadAxisValue(0,1);
    
    let rightStickX = Sup.Input.getGamepadAxisValue(0,2);
    let rightStickY = -Sup.Input.getGamepadAxisValue(0,3);
    let rightStickIdle = (Math.abs(rightStickX) < 0.1) && (Math.abs(rightStickY) < 0.1);
    
    let jumpButton = Sup.Input.wasGamepadButtonJustPressed(0,0);
    let fireButtonPressed = Sup.Input.wasGamepadButtonJustPressed(0,5);
    let fireButtonDown= Sup.Input.isGamepadButtonDown(0,5);
    
    let actualAngle = this.gunActor.getEulerZ();
    let anglePad = Math.atan2(rightStickY,rightStickX);
    let anglePadDegre = anglePad * 180.0 / Math.PI;
    if( anglePadDegre < 0 ) anglePadDegre += 360.0;
    let lerpedAngle = Sup.Math.lerpAngle(actualAngle,anglePad,0.2)
    //TODO faire un lerp angle pour pas que l'arme bouge si vite ?
    if (!rightStickIdle){
      this.gunActor.setEulerZ(lerpedAngle);
    }
    
    if(fireButtonPressed) {
      //TODO envoyer l'info au putain d'enfant et le laisser gerer son fireRate et l'instanciation
      let muzzlePosition = this.actor.getChild("Weapon").getChild("Muzzle").getPosition();
      let ball = Sup.appendScene("Prefabs/Ball")[0];
      
      ball.p2Body.body.position = [muzzlePosition.x,muzzlePosition.y,muzzlePosition.z];
      
      let x = Math.cos(anglePad)*this.ballSpeed;
      let y = Math.sin(anglePad)*this.ballSpeed;
      
      ball.p2Body.body.applyForce([x,y],[0,0]);
      
      // ball.p2Body.
    }
    
    if(jumpButton && this.canJump){
      Sup.log("jump et canjump");
      this.characterBody.applyForce([0,this.jumpSpeed],[0,0])
    }
    
    this.characterBody.velocity = [leftStickX*this.moveSpeed,velocity.y];

    
  }
  
  
  
}
Sup.registerBehavior(CharacterBehavior);
