//#pragma strict

public var a:float=30;///动力
public var backa:float=10;

private var fa1:float=2;//动摩擦因素为0.2 g*0.2;
private var fa2:float;//侧摩擦因素为0.2 g*0.2;
public var fa:float;
public var winda:float=5;

public var ra:float=50;//平转速度

public var speed:Vector3=new Vector3(0,0,0);//速度
public var speedl:float=0;
//public var dir:Quaternion=transform.rotation;
public var maxspeed:float=80;//限速
public var minspeed:float=-30;
public var ds:float=0;
public var g:float=-30;
public var fallspeed:float=0;
private var headupspeed:float=50;//抬头速度
private var turnspeed:float=60;//侧转速度

private var freezes:Array=new Array(RigidbodyConstraints.FreezePositionX,RigidbodyConstraints.FreezePositionY,RigidbodyConstraints.FreezePositionZ,
                              RigidbodyConstraints.FreezeRotationX,RigidbodyConstraints.FreezeRotationY,RigidbodyConstraints.FreezeRotationZ,RigidbodyConstraints.None);

private var propeller1:Transform;
private var propeller2:Transform;
private var rollspeed:float=2160;

public var state:String;
function Start () {
     //GetComponent.<Rigidbody>().centerOfMass=new Vector3(0,0,200);//设置质心
     state="run";
     fa2=a;
     propeller1=transform.Find("propeller1");
	 propeller2=transform.Find("propeller2");
}

function FixedUpdate () {
    GetComponent.<Rigidbody>().velocity=new Vector3(0,0,0);
	//transform.Translate(new Vector3(0,dx,0));
	//Translate(0,3*Time.deltaTime,0)
	//transform.up transform.right transform.forward 物体自身的x，y，z轴的世界坐标向量
	var newspeed:Vector3=speed;
	var moveDirection:Vector3 = getdirection();//获取自身的z轴的方向,即当前油门方向

	if(Input.GetKey("w")){//油门向前
	   //if(Vector3.Dot(newspeed,moveDirection)>=0){//朝前跑，摩擦沿运动方向向后
	       roll();

	      if(state=="run"){//朝前跑
	        if(checkangle(newspeed,moveDirection)){
	           fa=fa1;   
	         }else{
	           fa=fa2; 
	         }
	         newspeed-=fa*newspeed.normalized*Time.fixedDeltaTime;
	         newspeed+=moveDirection*a*Time.fixedDeltaTime;
	      }else{//往前飞
	         newspeed+=moveDirection*a*Time.fixedDeltaTime;//Vector3.Project(newspeed,moveDirection) 动力不应该控制形态,只应该控制速度，而由速度控制形态或者手动控制
	         //transform.Rotate((newspeed.normalized-moveDirection.normalized)*ra*Time.fixedDeltaTime,Space.World);
	      }
	   //}else if(speed<0){//向后跑，摩擦力向前
          //newspeed-=fa*newspeed.normalized*Time.fixedDeltaTime;
	      //newspeed+=moveDirection*a*Time.fixedDeltaTime;
	     //newspeed+=moveDirection*(a+fa)*Time.fixedDeltaTime;//*Time.deltaTime;
	   //}
	   ds=a;
	}else if(Input.GetKey("s")){//油门向后
	   //if(newspeed<=0&&backa>fa){//向后跑，摩擦向前，动力大于摩擦力
	     // newspeed-=(backa-fa)*Time.fixedDeltaTime;
	 //  }else if(newspeed>0){//向前跑，摩擦力向后
	     //  newspeed-=(backa+fa)*Time.fixedDeltaTime;
	   // }
	   if(state=="run"){
	     if(checkangle(newspeed,moveDirection)){
	         fa=fa1;   
	      }else{
	         fa=fa2; 
	      }
	      newspeed-=fa*newspeed.normalized*Time.fixedDeltaTime;
	      newspeed-=moveDirection*a*Time.fixedDeltaTime;
	    }else{
	       newspeed-=moveDirection*a*Time.fixedDeltaTime;//受到不直接改变形态的力，需要向速度方向靠，来改变形态
	       //transform.Rotate((newspeed.normalized-moveDirection.normalized)*ra*Time.fixedDeltaTime,Space.World);
	    }
	   ds=backa;
	}else{//无动力
	    //if(newspeed<0){
	     // newspeed+=fa*Time.fixedDeltaTime;
	   // }else if(newspeed>0){
	     // newspeed-=fa*Time.fixedDeltaTime;
	   // }
	    if(state=="run"){
	     if(checkangle(newspeed,moveDirection)){
	         fa=fa1;   
	      }else{
	         fa=fa2; 
	      }
	      newspeed-=fa*newspeed.normalized*Time.fixedDeltaTime;
	   }else{
	      newspeed-=moveDirection*winda*Time.fixedDeltaTime;//风阻
	      //newspeed=Vector3.Project(newspeed,moveDirection);
	      //transform.Rotate((newspeed.normalized-moveDirection.normalized)*ra*Time.fixedDeltaTime,Space.World);//不受力之后,物体会向速度方向靠
	   }
	}

	if(Input.GetKey("d")){//平转
      transform.Rotate(new Vector3(0,ra,0)*Time.fixedDeltaTime);//转向应该直接调整速度，而不是等以后调整，即速度和形态是绑定的
      if(state=="fly"){//手动控制形态时，应该使用
         moveDirection=getdirection();       
         newspeed=Vector3.Project(newspeed,moveDirection);
      }
      //newspeed*=0.995;
    }
    if(Input.GetKey("a")){//平转
      transform.Rotate(new Vector3(0,(-1)*ra,0)*Time.fixedDeltaTime);
      if(state=="fly"){
        moveDirection=getdirection();
        newspeed=Vector3.Project(newspeed,moveDirection);
      }
      //newspeed*=0.995;
    }

	//headup();
  if(Input.GetKey("u")&&(state=="fly"||(speedl>30&&state=="run"))){ 
      transform.Rotate(new Vector3(headupspeed*(-1),0,0)*Time.fixedDeltaTime);
      if(state=="fly"){
         moveDirection=getdirection();
         newspeed=Vector3.Project(newspeed,moveDirection);
      }
   }
   if(Input.GetKey("j")){ 
      transform.Rotate(new Vector3(headupspeed,0,0)*Time.fixedDeltaTime);
      if(state=="fly"){
        moveDirection=getdirection();
        newspeed=Vector3.Project(newspeed,moveDirection);
      }
   }
	//turn();
	 if(Input.GetKey("h")){ 
	
      transform.Rotate(new Vector3(0,0,turnspeed)*Time.fixedDeltaTime);
     
   }
    if(Input.GetKey("k")){ 
      transform.Rotate(new Vector3(0,0,turnspeed*(-1))*Time.fixedDeltaTime);
    }

	if(state=="fly"){//在飞行体系中会计算重力
	    newspeed+=new Vector3(0,g,0)*Time.fixedDeltaTime;
	}
	if(newspeed.magnitude>maxspeed){
	   newspeed=newspeed.normalized*maxspeed; 
	}else if(newspeed.magnitude<minspeed){
	   newspeed=newspeed.normalized*minspeed;
	}
	checkfly();

	speed=newspeed;
	speedl=speed.magnitude;
    transform.Translate(speed*Time.fixedDeltaTime,Space.World);//0,0,speed*Time.deltaTime);//向速度方向移动,并旋转
    if(state=="fly"){
        //transform.eulerAngles.x = speed.x;
        //transform.eulerAngles.y = speed.y;
       //moveDirection=getdirection();
       var newRotation:Quaternion  = Quaternion.LookRotation(speed);
      var tempz=transform.localEulerAngles.z;
      var tempy=transform.localEulerAngles.y;

       transform.rotation= Quaternion.Slerp(transform.rotation, newRotation, 1);//形态变了之后，继续保持速度与形态方向一致
       transform.localEulerAngles.z=tempz;
       transform.localEulerAngles.y=tempy;
      // transform.Rotate((speed.normalized-moveDirection.normalized)*5,Space.World);//旋转一个欧拉度数
       //speed=Vector3.Project(speed,moveDirection);
    }

    //transform.Translate(moveDirection*speed*Time.fixedDeltaTime,Space.World);//0,0,speed*Time.deltaTime);
	
    //V.normalized 单位化向量
    //if(Quaternion.Angle (dir,transform.rotation)>10){
     //  dir=dir+(transform.rotation.normalized-dir)/2;
   // }
    //transform.Translate(0,0,speed*Time.fixedDeltaTime);//0,0,speed*Time.deltaTime);//z方向为机头方向，transform适合静态物体运动
     //gameObject.GetComponent.<Rigidbody>().velocity = Vector3.forward * speed*Time.fixedDeltaTime;
      //GetComponent.<Rigidbody>().MovePosition(GetComponent.<Rigidbody>().position + Vector3.forward*speed*Time.deltaTime); //基于世界坐标

      //print(moveDirection);
}

 function clearspeed(){
   speed=new Vector3(0,0,1);
 }
 function speedreverse(){
   speed*=-0.5;
 }
 //function headup(){//抬头
  
 //}
 //function turn(){
   
 //}
 function checkfly(){
    if(transform.position.y>3&&state=="run"){
       fly();
    }
 }
 function run(){
    state="run";
    fallspeed=0;//停止下落
 }
 function fly(){
    state="fly";
 }
 function checkangle(from:Vector3,to:Vector3){
    if(Vector3.Angle(from,to)<10&&Vector3.Angle(from,to)>=0){
       return true;
    }
    if(Vector3.Angle(from,to)>170&&Vector3.Angle(from,to)<=180){
       return true;
    }
    return false;
 }
 function getdirection(){
   return transform.forward;
 }

function roll(){
   propeller1.Rotate(new Vector3(rollspeed*Time.fixedDeltaTime,0,0));
   propeller2.Rotate(new Vector3(rollspeed*Time.fixedDeltaTime,0,0));
}