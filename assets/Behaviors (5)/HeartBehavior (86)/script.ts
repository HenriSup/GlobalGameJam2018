class HeartBehavior extends Sup.Behavior {
  
  life = 100;
  shields:Sup.Actor[];
  rotationSpeed:number = 0;
  lerp = 0;
  timeAbove = 0;
  timeBeforeChange = 300;
  randomLerp = 0.005;
  sens=1;
  speed=2;
  private GameManager:Sup.Actor = null;
  
  awake() {
    this.actor.p2Body.body.collisionResponse=false;
    this.shields = this.actor.getChildren();
    this.GameManager=Sup.getActor("GameManager");
    this.GameManager.getBehavior(GameManager).setBoss(this.actor);
  }

  update() {
    
    //faire augmenter un angle de manière random
    //grace au lerp vitesse max : PI/20
    let rotateValue =(Math.PI/20);
    this.lerp += 0.005*this.sens*this.speed;
    
    if (this.lerp >=0.5||this.lerp <=-0.5){
      this.timeAbove += 1;
      if (this.timeAbove > this.timeBeforeChange){
        this.sens = -this.sens;
        this.timeAbove = 0;
        this.timeBeforeChange=this.getRandomArbitrary(60,180);
        this.randomLerp=this.getRandomArbitrary(0.001,0.05);
      }
    }
    
    this.lerp = Math.max(this.lerp,-1);
    this.lerp = Math.min(this.lerp,1);
   
    
    this.shields[0].setEulerZ(Sup.Math.lerp(this.shields[0].getEulerZ(),(this.shields[0].getEulerZ()+rotateValue),this.lerp));
    
    this.shields[1].setEulerZ(Sup.Math.lerp(this.shields[1].getEulerZ(),(this.shields[1].getEulerZ()-rotateValue),this.lerp));
    
    
  }
  
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  public getHit(damages:number){
    this.life = this.life-damages;
    Sup.log("Oups je l'ai touché dans l'coeur -",damages,"PV");
    if (this.life<=0){
      this.die();
    }
  }
  
  private die(){
    Sup.log("Hearth is deaaaaaaaad OMG it's so sad mameeeeen")
  }
  
  public getP2Body():p2.Body{
    return this.actor.p2Body.body;
  }
}
Sup.registerBehavior(HeartBehavior);
