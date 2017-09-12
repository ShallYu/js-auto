// ==UserScript==
// @name         BaiduAuto
// @namespace    https://github.com/ShallYu
// @version      0.1
// @description  The script is used to open and filte the searching result faster.
// @author       Yu.X
// @match        http://www.baidu.com*
// @match        https://www.baidu.com*
// @grant        none
// ==/UserScript==

//键盘编码定义
down_index = 40; 
up_index = 38;
intervalCheck = 0;

//初始化函数，循环检测，处理百度动态搜索问题
var onGo = function(){
    //结果栏 node 选择器
    w_list = document.getElementsByClassName('c-container');
    c_r=document.getElementById('content_right');
    cursor = 0;
    //自定义指示光标→_→
    w_list[cursor].innerHTML = "<h1 id='cursor_c' style='float:left'>→_→</h1>"+w_list[cursor].innerHTML; 

    //创建新LOGO按钮，点击LOGO打开所有页面
    head = document.getElementsByClassName('head_wrapper')[0];
    btn = document.createElement('button');
    btn.textContent='OpenAll';
    btn.width=100;
    btn.height=80;
    btn.style="float:left";
    f_open=function(){
        //LOGO点击函数，循环打开所有页面
        for(i=0;i<w_list.length;i++){
            w_list[i].getElementsByClassName('t')[0].children[0].click();
        }
        box_page = document.getElementById('page');
        next_btn = box_page.getElementsByClassName('n')[0];
        next_btn.click();
        cursor=0;
    };
    btn.onclick=f_open;
    //将LOGO加入DOM
    lg = document.getElementById('result_logo');
    lg.href="";
    lg.onmousedown=null;
    lg.onclick=f_open;
    lg.children[0].src="http://img4.imgtn.bdimg.com/it/u=1283800716,1224909250&fm=116&gp=0.jpg";
    //键盘事件处理函数
    document.onkeydown = function(event) { 
        var e=event.srcElement; 
        console.log(cursor);
        if(event.keyCode == 37 || event.keyCode == 39){
            //左键右键删除条目
            if(cursor<=w_list.length-1){
                w_list[cursor].remove();
            }
            if(cursor==w_list.length){
                cursor-=1;
            }
            if(w_list.length===0){
                //已删除所有条目，打开下一页
                box_page = document.getElementById('page');
                next_btn = box_page.getElementsByClassName('n')[0];
                next_btn.click();
                cursor=0;
            }
        }
        else if(event.keyCode == down_index){
            //下键光标下移
            if(cursor<w_list.length-1){
                cursor+=1;
            }
        }
        else if(event.keyCode == up_index){
            if(cursor>0){
            //上键光标上移
                cursor-=1;
            }
        }
        else if(event.keyCode==113){
            //F2打开所有链接
            f_open();
        }

        it=document.getElementById('cursor_c');
        //光标位置处理
        if(it!==null){
            it.remove();
            w_list[cursor].innerHTML = "<h1 id='cursor_c' style='float:left'>→_→</h1>"+w_list[cursor].innerHTML; 
        }
        else{
            w_list[cursor].innerHTML = "<h1 id='cursor_c' style='float:left'>→_→</h1>"+w_list[cursor].innerHTML; 
        }
        w_list[cursor].scrollIntoView();
        window.scroll(0,window.scrollY-150);
    };
};
var checkLink = function(){
    //定时检查结果页，防止主页动态搜索下插件不刷新现象出现
    if(document.getElementsByClassName('c-container').length)
    {
        onGo();
        clearInterval(intervalCheck);
    }
};
intervalCheck=setInterval(checkLink,2000);