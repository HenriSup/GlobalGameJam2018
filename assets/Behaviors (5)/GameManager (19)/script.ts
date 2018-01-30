class GameManager extends Sup.Behavior {
  
  public characters:Sup.Actor[] = new Array<Sup.Actor>();
  public grounds:Sup.Actor[] = new Array<Sup.Actor>();
  
  awake() {
    let sound = new Sup.Audio.SoundPlayer("Sons/Music/Heartbeat",0.8,{loop:true});
    sound.play();
    
  }

  update() {
    
  }
  
  addCharacter(character:Sup.Actor){
    this.characters.push(character);
    //Sup.log("Character has been added to the gameManager:"); 
  }
  
  addGround(ground:Sup.Actor){
    this.grounds.push(ground);
    //Sup.log("Ground has been added to the gameManager:"); 
  }
  
  public isTouchingGround(testBody:p2.Body):boolean{
    //TODO changer le nom de variable testBody nan?
    //TODO ça lag ou pas ? peut etre changer le foreach qu'il loop pas partout
    var isTouchingGround = false;
    this.grounds.forEach(function(ground) {
      if(Sup.P2.getWorld().narrowphase.collidedLastStep(testBody,ground.p2Body.body)){
        isTouchingGround = true;
      }
    });
    return isTouchingGround;
  }
}
Sup.registerBehavior(GameManager);
