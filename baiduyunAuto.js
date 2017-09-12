// ==UserScript==
// @name         BaiduyunAuto
// @namespace    https://github.com/ShallYu
// @version      0.1
// @description  This script is used to make the automatic offline download.  
// @author       Yu.X
// @match        http*://pan.baidu.com/*
// @grant        none
// ==/UserScript==

//创建和插入文本框和按钮
txtbox = document.querySelector('#layoutMain .bar').children[1];

txta = document.createElement('textarea');
txta.width="40%";
btna = document.createElement('button');
btna.textContent="GoGoGo";
btna.class="g-button";
btnb = document.createElement('button');
btnb.textContent="Clear";
btnb.class="g-button";
txtbox.appendChild(txta);
txtbox.appendChild(btna);
txtbox.appendChild(btnb);
//初始化点击，保证所有对话框被动态创建
//不用查了，那个磁力链是葫芦娃全集
document.querySelector(".g-button[data-button-id='b13']").click();
setTimeout(function() {document.querySelector("#_disk_id_2").click();
	 setTimeout(function() {document.querySelector('#share-offline-link').value='magnet:?xt=urn:btih:5A88784C397842093D63BEF6D7E00B30E3F2A926';
		document.querySelector('.g-button-blue[data-button-id="b65"]').click();
			setTimeout(function() {
    			document.querySelector('.g-button[data-button-id="b67"]').click();
    		}, 500);
	},500);
}, 3000);

//初始化磁力链列表
magnet_list=[];
//该函数检查对话框是否显示
var isDisplay = function(class_name){
	box_list= document.querySelectorAll(class_name);
	if(box_list.length!=0 && box_list[0].style.display!="none"){
		return true;
	}
	else{
		return false;
	}
};

var magnetDone= false;
var magnetInterval=null
var magnet_temp_string="";
var magnet_index = 0;

var offlineInterval = null;
//延时500ms按流程点击按钮
var offlineTaskLoop= function(str) {
        document.querySelector('#share-offline-link').value=str;
        //离线确认按钮
        document.querySelector('.g-button-blue[data-button-id="b65"]').click();
        setTimeout(function() {
        	//文件选择确认
          document.querySelector('.g-button-blue-large[data-button-id="b69"]').click();
        }, 500)
        offlineInterval = setInterval(
        	function(){
        		if(isDisplay(".dialog-dialog1")){
        			//验证码
        			document.querySelectorAll('.dialog-dialog1 .input-code')[0].focus();
        			console.log('wait input');
        		}
        		if(isDisplay(".dialog-newoffline-dialog") || isDisplay(".dialog-offlinelist-dialog")){
        			//该链接可离线
        			clearInterval(offlineInterval);
        			//此链接完成flag，用于主循环确定是否开始下一个，后同
        			magnetDone=true;
        			document.querySelectorAll('.dialog-offlinelist-dialog .dialog-close')[0].click();
        			document.querySelectorAll('.dialog-newoffline-dialog .dialog-close')[0].click();
        		}
        		if(isDisplay(".module-tip")){
        			//违规，下一个
        			if(document.querySelectorAll(".module-tip .tip-msg")[0].innerText=="离线文件因含有违规内容被系统屏蔽无法下载"){
        				clearInterval(offlineInterval);
        				magnetDone=true;
        				console.log('tick!!!!!');
        			}
        			if(document.querySelectorAll(".module-tip .tip-msg")[0].innerText=="网络错误，请稍候重试"){
        				clearInterval(offlineInterval);
        				magnetDone=true;
        				console.log('net broken');
        			}
        		}
        	},500)
}

//主循环，管理所有链接
var magnetTaskLoop = function(){
	if(magnet_index>magnet_list.length-1){
		clearInterval(magnetInterval)
		magnet_index=0;
		console.log("list done!");
	}
	else{
		//如果flag为true，进行下一个
		if(magnetDone){
			
			magnet_temp_string=magnet_list[magnet_index];
			console.log(magnet_index.toString()+" offline");
			magnet_index+=1;
			magnetDone=false;
			offlineTaskLoop(magnet_temp_string);
			
		}
	}
}
//开始按钮
btna.onclick=function(){
	magnetDone=true;
	magnet_list=txta.value.split("\n");
	magnetInterval= setInterval(function(){magnetTaskLoop();},1000);
}
//清空按钮
btnb.onclick=function(){
	clearInterval(offlineInterval);
	clearInterval(magnetInterval);
	magnetDone=false;

	magnet_index=0;
	txta.value="";
}