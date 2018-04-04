//#pragma strict

public var a:float=10;///动力
public var backa:float=10;
public var fa:float=2;//动摩擦因素为0.2 g*0.2;

public var ra:float=90;//平转速度

public var speed:float=0;//速度
//public var dir:Quaternion=transform.rotation;
public var maxspeed:float=80;//限速
public var minspeed:float=-30;
public var ds:float=0;
public var g:float=-9.8;
public var fallspeed:float=0;
private var headupspeed:float=60;//抬头速度
private var turnspeed:float=60;//侧转速度

private var freezes:Array=new Array(RigidbodyConstraints.FreezePositionX,RigidbodyConstraints.FreezePositionY,RigidbodyConstraints.FreezePositionZ,
                              RigidbodyConstraints.FreezeRotationX,RigidbodyConstraints.FreezeRotationY,RigidbodyConstraints.FreezeRotationZ,RigidbodyConstraints.None);

public var state:String;
function Start () {
     //GetComponent.<Rigidbody>().centerOfMass=new Vector3(0,0,200);//设置质心
     state="run";
}

function FixedUpdate () {
    GetComponent.<Rigidbody>().velocity=new Vector3(0,0,0);
	//transform.Translate(new Vector3(0,dx,0));
	//Translate(0,3*Time.deltaTime,0)
	//transform.up transform.right transform.forward 物体自身的x，y，z轴的世界坐标向量
	var newspeed:float=speed;

	if(Input.GetKey("w")){//油门向前
	   if(newspeed>=0&&a>fa){//朝前跑，摩擦向后,且动力大于摩擦力
	     newspeed+=(a-fa)*Time.fixedDeltaTime;
	   }else if(speed<0){//向后跑，摩擦力向前
	     newspeed+=(a+fa)*Time.fixedDeltaTime;//*Time.deltaTime;
	   }
	   ds=a;
	}else if(Input.GetKey("s")){//油门向后
	   if(newspeed<=0&&backa>fa){//向后跑，摩擦向前，动力大于摩擦力
	      newspeed-=(backa-fa)*Time.fixedDeltaTime;
	   }else if(newspeed>0){//向前跑，摩擦力向后
	       newspeed-=(backa+fa)*Time.fixedDeltaTime;
	   }
	   ds=backa;
	}else{//无动力
	    if(newspeed<0){
	      newspeed+=fa*Time.fixedDeltaTime;
	    }else if(newspeed>0){
	      newspeed-=fa*Time.fixedDeltaTime;
	    }
	}

	if(Input.GetKey("d")){//平转
      transform.Rotate(new Vector3(0,ra,0)*Time.fixedDeltaTime);
      newspeed*=0.995;
    }
    if(Input.GetKey("a")){//平转
      transform.Rotate(new Vector3(0,(-1)*ra,0)*Time.fixedDeltaTime);
      newspeed*=0.995;
    }

	if(newspeed>maxspeed){
	   newspeed=maxspeed; 
	}else if(newspeed<minspeed){
	   newspeed=minspeed;
	}

	speed=newspeed;
	headup();
	turn();
	checkfly();

	var moveDirection = transform.forward;//获取自身的z轴的方向
    //transform.Translate(moveDirection*speed*Time.fixedDeltaTime,Space.World);//0,0,speed*Time.deltaTime);
    //transform.Translate(moveDirection*speed*Time.fixedDeltaTime,Space.World);//0,0,speed*Time.deltaTime);
	if(state=="fly"){//在飞行体系中会计算重力
	    //fallspeed+=g*Time.fixedDeltaTime;
	    //transform.Translate(0,fallspeed*Time.fixedDeltaTime,0,Space.World);
	}
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
   speed=0;
 }
 function speedreverse(){
   speed*=-0.5;
 }
 function headup(){//抬头
   if(Input.GetKey("u")&&speed>30){ 
      transform.Rotate(new Vector3(headupspeed*(-1),0,0)*Time.fixedDeltaTime);
   }
   if(Input.GetKey("j")){ 
      transform.Rotate(new Vector3(headupspeed,0,0)*Time.fixedDeltaTime);
   }
 }
 function turn(){
    if(Input.GetKey("h")){ 
      transform.Rotate(new Vector3(0,0,turnspeed)*Time.fixedDeltaTime);
   }
   if(Input.GetKey("k")){ 
      transform.Rotate(new Vector3(0,0,turnspeed*(-1))*Time.fixedDeltaTime);
   }
 }
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