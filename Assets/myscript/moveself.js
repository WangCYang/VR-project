#pragma strict

public var g:float=10;
public var a:float=10;
public var fa:float=2;//动摩擦因素为0.2 g*0.2;

public var ra:float=90;//角速度

public var speed:float=0;//速度大小
public var dir:Quaternion=transform.rotation;


function Start () {
	
}

function Update () {
	//transform.Translate(new Vector3(0,dx,0));
	//Translate(0,3*Time.deltaTime,0)
	//transform.up transform.right transform.forward 物体自身的x，y，z轴的世界坐标向量
	if(Input.GetKey("m")){//油门
	   speed+=a;//*Time.deltaTime;
	}else{
	   if(speed>0){
	     speed-=fa;//*Time.deltaTime;
	   }

	}

	if(Input.GetKey("r")){//平转
      transform.Rotate(new Vector3(0,ra,0)*Time.deltaTime);
    }
    //V.normalized 单位化向量
    //if(Quaternion.Angle (dir,transform.rotation)>10){
     //  dir=dir+(transform.rotation.normalized-dir)/2;
   // }
    transform.Translate(0,0,speed*Time.deltaTime);//0,0,speed*Time.deltaTime);//z方向为机头方向
}
