#pragma strict

public var enable:boolean;
private var freezes=new Array(RigidbodyConstraints.FreezePositionX,RigidbodyConstraints.FreezePositionY,RigidbodyConstraints.FreezePositionZ,
                              RigidbodyConstraints.FreezeRotationX,RigidbodyConstraints.FreezeRotationY,RigidbodyConstraints.FreezeRotationZ,RigidbodyConstraints.None);
function Start () {
	
}

function Update () {
	
}
function OnCollisionStay(obj:Collision){
       //Find("脚本所在物体名"). 找物体
       //GetComponent<脚本名>(). 找组件
       //GameObject.Find("脚本所在物体名").SendMessage("函数名");
       //GameObject.Find("脚本所在物体名").GetComponent<脚本名>().函数名()
      // move=GetComponent.<moveself>();
       //SendMessage("clearspeed");

       if(enable){
         if(obj.gameObject.tag=="terrain"){
        // GetComponent.<Rigidbody>().constraints =freezes[6];//进入之后,允许按照重力调整机身
        // print("1");
         }else{
          SendMessage("speedreverse");
          }
       }
       //print("asd");
}
function OnCollisionEnter(obj:Collision){
       //Find("脚本所在物体名"). 找物体
       //GetComponent<脚本名>(). 找组件
       //GameObject.Find("脚本所在物体名").SendMessage("函数名");
       //GameObject.Find("脚本所在物体名").GetComponent<脚本名>().函数名()
      // move=GetComponent.<moveself>();
       //SendMessage("clearspeed");
        if(obj.gameObject.tag=="terrain"){
          GetComponent.<Rigidbody>().constraints =freezes[6];//进入之后,允许按照重力调整机身
          SendMessage("run");//进入地面物理体系
        // print("1");
         }

       //print("asd");
}
function OnCollisionExit(obj:Collision){
       //Find("脚本所在物体名"). 找物体
       //GetComponent<脚本名>(). 找组件
       //GameObject.Find("脚本所在物体名").SendMessage("函数名");
       //GameObject.Find("脚本所在物体名").GetComponent<脚本名>().函数名()
      // move=GetComponent.<moveself>();
       //SendMessage("clearspeed");
       if(obj.gameObject.tag=="terrain"){
       GetComponent.<Rigidbody>().constraints = RigidbodyConstraints.FreezeRotationX|RigidbodyConstraints.FreezeRotationY|RigidbodyConstraints.FreezeRotationZ;//飞起之后不受重力调整形态
       //姿态还原
        transform.localEulerAngles.z = 0;//设置侧转还原 ransform.localEulerAngles为Vector3，即可以分别设置任一个属性
          transform.localEulerAngles.x = 0;  //前倾后倾还原
          //transform.position.y = 0;
        //print("0");
        //SendMessage("fly");//进入地面物理体系
      }
       //print("asd");
}
