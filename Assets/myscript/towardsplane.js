#pragma strict
public var plane:GameObject;
public var RotateSpeed:float=1;

function Start () {
	
}

function Update () {

    var rotateVector:Vector3 = plane.transform.position - transform.position;//飞机到观察点的向量;
    var newRotation:Quaternion  = Quaternion.LookRotation(rotateVector); //创建一个制定方向的四元组
    transform.rotation = Quaternion.RotateTowards(transform.rotation, newRotation,RotateSpeed * Time.deltaTime);//物体转向
}
