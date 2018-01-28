class BackGroundBehavior extends Sup.Behavior {
  
  private circles:Sup.Actor[]= new Array<Sup.Actor>();
  private initialPosition:Sup.Math.Vector3[] = new Array<Sup.Math.Vector3>(); 
  private maxMove = 0.25;
  private minMove = -this.maxMove;
  
  awake() {
    this.circles.push(this.actor.getChild('Cercle1'));
    this.circles.push(this.actor.getChild('Cercle2'));
    this.circles.push(this.actor.getChild('Cercle3'));
    
    this.initialPosition[0] = this.circles[0].getPosition();
    this.initialPosition[1] = this.circles[1].getPosition();
    this.initialPosition[2] = this.circles[2].getPosition();
  }

  update() {
    let cercle1 = this.circles[0];
    let cercle2 = this.circles[1];
    let cercle3 = this.circles[2];
    
    let positionCercle1 = cercle1.getPosition();
    let positionCercle2 = cercle2.getPosition();
    let positionCercle3 = cercle3.getPosition();
    let lerp = 0.05;
    
    
    cercle3.setPosition(Sup.Math.lerp(positionCercle3.x,positionCercle2.x,lerp),Sup.Math.lerp(positionCercle3.y,positionCercle2.y,lerp));
    cercle2.setPosition(Sup.Math.lerp(positionCercle2.x,positionCercle1.x,lerp),Sup.Math.lerp(positionCercle2.y,positionCercle1.y,lerp));
    
    
    let min = -0.05;
    let max = 0.05;
    
    Math.floor(Math.random()*(max-min+1)+min);
    let randomMoveX = Math.floor(Math.random()*(max-min+1)+min)
    let randomMoveY = Math.floor(Math.random()*(max-min+1)+min)
    
    lerp = 0.05;
    
    let newPositionX = Sup.Math.lerp(positionCercle1.x, positionCercle1.x + randomMoveX,lerp);
    let newPositionY = Sup.Math.lerp(positionCercle1.y, positionCercle1.y + randomMoveY,lerp);
    
    if (newPositionX > this.maxMove) newPositionX = this.maxMove;
    if (newPositionY > this.maxMove) newPositionY = this.maxMove;
    if (newPositionX < this.minMove) newPositionX = this.minMove;
    if (newPositionY < this.minMove) newPositionY = this.minMove;
    
    
    cercle1.setPosition(newPositionX,newPositionY,positionCercle1.z)
  }
}
Sup.registerBehavior(BackGroundBehavior);
