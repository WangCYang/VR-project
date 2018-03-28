#pragma strict

public var g:float=10;
public var a:float=10;///动力
public var backa:float=5;
public var fa:float=2;//动摩擦因素为0.2 g*0.2;

public var ra:float=90;//角速度

public var speed:float=0;//速度大小
//public var dir:Quaternion=transform.rotation;


function Start () {
	
}

function FixedUpdate () {
	//transform.Translate(new Vector3(0,dx,0));
	//Translate(0,3*Time.deltaTime,0)
	//transform.up transform.right transform.forward 物体自身的x，y，z轴的世界坐标向量
	if(Input.GetKey("w")){//油门向前
	   if(speed>=0&&a>fa){//朝前跑，摩擦向后,且动力大于摩擦力
	     speed+=(a-fa)*Time.fixedDeltaTime;
	   }else if(speed<0){//向后跑，摩擦力向前
	     speed+=(a+fa)*Time.fixedDeltaTime;//*Time.deltaTime;
	   }
	}else if(Input.GetKey("s")){//油门向后
	   if(speed<=0&&backa>fa){//向后跑，摩擦向前，动力大于摩擦力
	      speed-=(backa-fa)*Time.fixedDeltaTime;
	   }else if(speed>0){//向前跑，摩擦力向后
	       speed-=(backa+fa)*Time.fixedDeltaTime;
	   }
	}else{//无动力
	    if(speed<0){
	      speed+=fa*Time.fixedDeltaTime;
	    }else if(speed>0){
	      speed-=fa*Time.fixedDeltaTime;
	    }
	}

	if(Input.GetKey("d")){//平转
      transform.Rotate(new Vector3(0,ra,0)*Time.fixedDeltaTime);
    }
    if(Input.GetKey("a")){//平转
      transform.Rotate(new Vector3(0,(-1)*ra,0)*Time.fixedDeltaTime);
    }
    //V.normalized 单位化向量
    //if(Quaternion.Angle (dir,transform.rotation)>10){
     //  dir=dir+(transform.rotation.normalized-dir)/2;
   // }
    transform.Translate(0,0,speed*Time.fixedDeltaTime);//0,0,speed*Time.deltaTime);//z方向为机头方向
}
