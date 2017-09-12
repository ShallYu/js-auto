// ==UserScript==
// @name         GoogleAuto
// @namespace    https://github.com/ShallYu
// @version      0.1
// @description  The script is used to open and filte the searching result faster.
// @author       Yu.X
// @match        https://www.google.fr/*
// @match        https://www.google.com/*
// @match        https://www.google.com.hk/*
// @grant        none
// ==/UserScript==
down_index = 40;
up_index = 38;
cursor_src="<h1 id='cursor_c' style='float:left'>→_→</h1>";
var onGo = function(){
w_list = document.getElementsByClassName('rc');
c_r=document.getElementById('content_right');
cursor = 0;
w_list[cursor].innerHTML =cursor_src+w_list[cursor].innerHTML; 

head = document.getElementsByClassName('nojsv logocont')[0];
btn = document.createElement('button');
btn.textContent='OpenAll';
btn.width=100;
btn.height=80;
btn.style="float:left";
f_open=function(){
	for(i=0;i<w_list.length;i++){
		window.open(w_list[i].getElementsByClassName('r')[0].getElementsByTagName('a')[0].href);
    }
	cursor=0;
    next_btn = document.getElementById('pnnext');
    next_btn.click();
};
btn.onclick=f_open;

lg = document.getElementById('logocont');
lg.href="";
lg.onmousedown=null;
lg.onclick=f_open;
lg.children[0].src="https://ssl.gstatic.com/gb/images/a/3a1e625196.png";

document.onkeydown = function(event) { 
	var e=event.srcElement; 
	console.log(cursor);
	if(event.keyCode == 37 || event.keyCode == 39){
		if(cursor<=w_list.length-1){
			w_list[cursor].remove();
		}
		if(cursor==w_list.length){
			cursor-=1;
		}
		if(w_list.length===0){
			next_btn = document.getElementById('pnnext');
			next_btn.click();
			cursor=0;
		}
	}
	else if(event.keyCode == down_index){
		if(cursor<w_list.length-1){
			cursor+=1;
		}
	}
	else if(event.keyCode == up_index){
		if(cursor>0){
			cursor-=1;
		}
	}
	else if(event.keyCode==113){
		f_open();
	}

		it=document.getElementById('cursor_c');
		if(it!==null){
			it.remove();
			w_list[cursor].innerHTML = cursor_src+w_list[cursor].innerHTML; 
		}
		else{
			w_list[cursor].innerHTML = cursor_src+w_list[cursor].innerHTML; 
		}
	if(cursor){
		w_list[cursor-1].scrollIntoView({block: 'start',  behaviour: 'smooth'});
	}
} ;
};
var checkLink = function(){
    if(document.getElementsByClassName('rc').length)
    {
        onGo();
        clearInterval(intervalCheck);
        console.log('done');
    }
    else{
        console.log('waiting');
    }
};
intervalCheck=setInterval(checkLink,1000);