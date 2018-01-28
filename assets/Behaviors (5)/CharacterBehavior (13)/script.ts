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
    this.gunActor.setEulerZ(0.1);
  }

  update() {
    let velocity:Sup.Math.Vector2 = new Sup.Math.Vector2(this.characterBody.velocity[0],this.characterBody.velocity[1]);
    let isTouchingGround = this.GameManager.isTouchingGround(this.characterBody);
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
    
    let jumped = jumpButton && this.canJump;
    
    if(jumped){
      this.characterBody.applyForce([0,this.jumpSpeed],[0,0])
    }
    
    this.characterBody.velocity = [leftStickX*this.moveSpeed,velocity.y];
    this.animate(this.characterBody.velocity,jumped,isTouchingGround);
    this.animateGun();
    
  }
  
  animate(velocity,jumped,isTouchingGround){
    let x = velocity[0];
    let y = velocity[1];
    
    let characterSpriteRenderer:Sup.SpriteRenderer = this.actor.getChild("Sprite").spriteRenderer;
    let actualAnimation:string = characterSpriteRenderer.getAnimation();
    
    let frameCount:number = characterSpriteRenderer.getAnimationFrameCount();
    let frameIndex:number = characterSpriteRenderer.getAnimationFrameIndex();
    let lastFrameOfActualAnimation:boolean = frameIndex == (frameCount - 1);
    
    characterSpriteRenderer.setPlaybackSpeed(1);
    
    //-Retourne le sprite du perso en fonction de sa velocité en X
    //-On check avant si c'est pas juste des mouvements de zoulettes pour pas qu'il se retourne
    // au moindre recentrage de joystick
    if (Math.abs(x) > 0.1){
      x>0 ? characterSpriteRenderer.setHorizontalFlip(false) : characterSpriteRenderer.setHorizontalFlip(true)
    }
    
    //Si le perso tombe ou saute les animations de saut/envol/chute sont prioritaires
    //Personne veut voir ton putain de perso marcher ou etre en idle dans les airs
    if(jumped){
      characterSpriteRenderer.setAnimation("Jump",false);
    } else {
      if (!isTouchingGround){
        //si c'est la fin d'anim de saut enchaine sur l'anim going up
        if(actualAnimation == "Jump" && lastFrameOfActualAnimation) {
          characterSpriteRenderer.setAnimation("GoingUp",true);
        } else {
          if (y>0){
            characterSpriteRenderer.setAnimation("GoingUp",true);
          } else {
            characterSpriteRenderer.setAnimation("GoingDown",true);
          }
        }
      } else {
        //il saute pas, il vole/tombe pas? mets toi à l'aise anime sa course poto
        if ((Math.abs(x) > 0.1) && isTouchingGround) {
          characterSpriteRenderer.setAnimation("Run",true);
          
          let leftStickX = Sup.Input.getGamepadAxisValue(0,0);
          characterSpriteRenderer.setPlaybackSpeed(Math.abs(leftStickX));
          
        } else {
          characterSpriteRenderer.setAnimation("Idle",true);
        }
      }

    }
   
    
    
  }
  
  animateGun(){
    let angle = this.gunActor.getEulerZ();
    let gunSpriteRenderer = this.gunActor.spriteRenderer;
    let angleDegre = angle * 180.0 / Math.PI;
    if( angleDegre < 0 ) angleDegre += 360.0;
    
    Sup.log(angleDegre);
    
    if ( ((angleDegre > 0) && (angleDegre < 90)) || ((angleDegre > 270) && (angleDegre < 360)) ) {
      gunSpriteRenderer.setVerticalFlip(false);
    } else {
      gunSpriteRenderer.setVerticalFlip(true);
    }
    
    if (((angleDegre > 150) && ((angleDegre < 360))) || (angleDegre < 30 && angleDegre > 0)){
      this.gunActor.setLocalZ(0.1);
    } else {
      this.gunActor.setLocalZ(-0.1);
    }
    
  }
  
  
  
}
Sup.registerBehavior(CharacterBehavior);
