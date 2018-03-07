class GameManager extends Sup.Behavior {
  
  public characters:Sup.Actor[] = new Array<Sup.Actor>();
  public grounds:Sup.Actor[] = new Array<Sup.Actor>();
  public boss:Sup.Actor = null;
  public bullets:Sup.Actor[] = new Array<Sup.Actor>();
  
  awake() {
    let sound = new Sup.Audio.SoundPlayer("Sons/Music/Heartbeat",0.8,{loop:true});
    sound.play();
  }

  update() {
    this.checkForBulletCollisions();
  }
  
  addCharacter(character:Sup.Actor){
    this.characters.push(character);
    //Sup.log("Character has been added to the gameManager:"); 
  }
  
  addBullet(bullet:Sup.Actor){
    this.bullets.push(bullet);
  }
  
  removeBullet(bullet:Sup.Actor){
    let index = this.bullets.indexOf(bullet);
    if(index !== -1) {
      this.bullets.splice(index, 1);
      Sup.log("Bullet Has been deleted");
    }
  }
  
  addGround(ground:Sup.Actor){
    this.grounds.push(ground);
    //Sup.log("Ground has been added to the gameManager:"); 
  }
  
  setBoss(boss:Sup.Actor){
    this.boss = boss;
    Sup.log("Boss has been set");
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
  
  private checkForBulletCollisions(){
    this.bullets.forEach((bullet)=>{
      let bulletBody:p2.Body = bullet.getBehavior(LaserBehavior).getP2Body();
      let heartBody:p2.Body = this.boss.getBehavior(HeartBehavior).getP2Body();
      let collide = Sup.P2.getWorld().narrowphase.collidedLastStep(bulletBody,heartBody);
      if (collide) {
        bullet.getBehavior(LaserBehavior).hit(this.boss);
        this.boss.getBehavior(HeartBehavior).getHit(bullet.getBehavior(LaserBehavior).getDamages());
      }
    })
  }
}
Sup.registerBehavior(GameManager);
