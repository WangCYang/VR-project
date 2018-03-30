#pragma strict


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
       SendMessage("speedreverse");
       //print("asd");
}
