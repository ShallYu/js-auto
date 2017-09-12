// ==UserScript==
// @name         BaiduyunAuto
// @namespace    https://github.com/ShallYu
// @version      0.1
// @description  This script is used to make the automatic offline download.  
// @author       Yu.X
// @match        http*://pan.baidu.com/*
// @grant        none
// ==/UserScript==


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
//init the boxes
document.querySelector(".g-button[data-button-id='b13']").click();
setTimeout(function() {document.querySelector("#_disk_id_2").click();
	 setTimeout(function() {document.querySelector('#share-offline-link').value='magnet:?xt=urn:btih:00335d9f25025edf14b4de048d16285fe7539109&dn=%E5%B0%84%E9%9B%95%E8%8B%B1%E9%9B%84%40RHJ-201-AVI';
		document.querySelector('.g-button-blue[data-button-id="b65"]').click();
			setTimeout(function() {
    			document.querySelector('.g-button[data-button-id="b67"]').click();
    		}, 500);
	},500);
}, 3000);


magnet_list=[];

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
var offlineTaskLoop= function(str) {
        document.querySelector('#share-offline-link').value=str;
        document.querySelector('.g-button-blue[data-button-id="b65"]').click();
        setTimeout(function() {
          document.querySelector('.g-button-blue-large[data-button-id="b69"]').click();
        }, 500)
        offlineInterval = setInterval(
        	function(){
        		if(isDisplay(".dialog-dialog1")){
        			document.querySelectorAll('.dialog-dialog1 .input-code')[0].focus();
        			console.log('wait input');
        		}
        		if(isDisplay(".dialog-newoffline-dialog") || isDisplay(".dialog-offlinelist-dialog")){
        			clearInterval(offlineInterval);
        			magnetDone=true;
        			document.querySelectorAll('.dialog-offlinelist-dialog .dialog-close')[0].click();
        			document.querySelectorAll('.dialog-newoffline-dialog .dialog-close')[0].click();
        		}
        		if(isDisplay(".module-tip")){
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
var magnetTaskLoop = function(){
	if(magnet_index>magnet_list.length-1){
		clearInterval(magnetInterval)
		magnet_index=0;
		console.log("list done!");
	}
	else{
		if(magnetDone){
			
			magnet_temp_string=magnet_list[magnet_index];
			console.log(magnet_index.toString()+" offline");
			magnet_index+=1;
			magnetDone=false;
			offlineTaskLoop(magnet_temp_string);
			
		}
	}
}

btna.onclick=function(){
	magnetDone=true;
	magnet_list=txta.value.split("\n");
	magnetInterval= setInterval(function(){magnetTaskLoop();},1000);
}
btnb.onclick=function(){
	clearInterval(offlineInterval);
	clearInterval(magnetInterval);
	magnetDone=false;

	magnet_index=0;
	txta.value="";
}