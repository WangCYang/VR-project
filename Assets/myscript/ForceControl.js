#pragma strict

private var propeller1:Transform;//发动机受力点1
private var propeller2:Transform;
private var tail:Transform;//尾翼受力点
private var sub1:Transform;//侧翼1
private var sub2:Transform;//侧翼2
private var body:Transform;//侧翼2
private var wheel:Transform;
private var head:Transform;

public var oilforce:float=150;
public var turnforce:float=50;
public var upforce:float=100;
public var subforce:float=50;

private var thecenterofmass:Transform;

function Start () {
	propeller1=transform.Find("propeller1");
	propeller2=transform.Find("propeller2");
	sub1=transform.Find("sub1");
	sub2=transform.Find("sub2");
	tail=transform.Find("tail");
	body=transform.Find("body");
	wheel=transform.Find("wheel1");
	head=transform.Find("head");

	thecenterofmass=transform.Find("centerofmass");
	GetComponent.<Rigidbody>().centerOfMass=thecenterofmass.position;

}

function FixedUpdate () {
	if(Input.GetKey("w")){
	    GetComponent.<Rigidbody>().AddForceAtPosition(transform.forward*oilforce,propeller1.position);
	    GetComponent.<Rigidbody>().AddForceAtPosition(transform.forward*oilforce,propeller2.position);
	}
	if(Input.GetKey("s")){
	    GetComponent.<Rigidbody>().AddForceAtPosition(transform.forward*oilforce*(-1),propeller1.position);
	    GetComponent.<Rigidbody>().AddForceAtPosition(transform.forward*oilforce*(-1),propeller2.position);
	}
	if(Input.GetKey("d")){
	    GetComponent.<Rigidbody>().AddForceAtPosition(transform.right*turnforce,wheel.position);//ForceMode.Force 力的两种作用方式
	    //GetComponent.<Rigidbody>().AddForceAtPosition(transform.right*turnforce,propeller2.position);
	}
	if(Input.GetKey("a")){
	    GetComponent.<Rigidbody>().AddForceAtPosition(transform.right*((-1)*turnforce),wheel.position);
	    //GetComponent.<Rigidbody>().AddForceAtPosition(transform.right*((-1)*turnforce),propeller2.position);
	}

	if(Input.GetKey("u")){
	  GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*(upforce),head.position);
	   //GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*(upforce),sub1.position);
	}
	if(Input.GetKey("j")){
	GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*((-1)*upforce),head.position);
	  // GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*((-1)*upforce),sub1.position);
	}
	if(Input.GetKey("h")){
	 GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*(subforce),sub2.position);
 //GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*((-1)*subforce),sub1.position);
     // GetComponent.<Rigidbody>().AddRelativeTorque (Vector3.forward * subforce);
	}
	if(Input.GetKey("k")){
	//GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*(subforce),sub1.position);
    GetComponent.<Rigidbody>().AddForceAtPosition(transform.up*((-1)*subforce),sub2.position);
       //GetComponent.<Rigidbody>().AddRelativeTorque (Vector3.forward * (-1)*subforce);
	}

}
