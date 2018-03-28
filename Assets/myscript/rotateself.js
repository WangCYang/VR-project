#pragma strict

public var dy:float=5;  //旋转角度
function Start () {
	
}

function Update () {
    if(Input.GetKey("r")){
      transform.Rotate(new Vector3(0,dy,0));
    }
}
