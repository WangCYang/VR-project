using UnityEngine;  
using System.Collections;  

public class FollowTarget : MonoBehaviour {  

	public Transform playerTransform;  //把运动物体拖放到此处  
	private Vector3 offset;  

	//初始代码
	void Start () {  

		offset =  transform.position - playerTransform.position;  //计算初始物体与相机的偏移距离  

	}  

    //每帧调用
	void Update () {  
		transform.position =  playerTransform.position + offset;   //运动物体当前位置 加上 原始偏移  
	}  
}  

