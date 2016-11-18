'use strict';
(function(){
    document.addEventListener('DOMContentLoaded',function(){
        var oBox=document.getElementById('box');
        var oUl=oBox.children[0];
        var aLi=oUl.children;
        var aBtn=document.querySelectorAll('#box ol li');
        
        oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
        
        var translateX=-aLi[0].offsetWidth;
        oUl.style.WebkitTransform='translateX('+translateX+'px)';
        
        var iNow=1;
        var bOK = false;
        oUl.addEventListener('touchstart',function(ev){
            if(bOK) return;
            bOK=true;
            
            var downX=ev.targetTouches[0].pageX;
            var disX=downX-translateX;
            oUl.style.WebkitTransition = 'none';
            function fnMove(ev){
                translateX=ev.targetTouches[0].pageX-disX;
                oUl.style.WebkitTransform='translateX('+translateX+'px)';
                
            }
            
            function fnEnd(ev){
                oUl.removeEventListener('touchmove',fnMove,false);
                oUl.removeEventListener('touchend',fnEnd,false);
                oUl.style.WebkitTransition = '.4s all ease';
                if(Math.abs(ev.changedTouches[0].pageX-downX)>10){
                    if(downX>ev.changedTouches[0].pageX){
                        iNow++; 
                        translateX= -iNow*aLi[0].offsetWidth;
                        oUl.style.WebkitTransform='translateX('+translateX+'px)';
                        tab();
                    }else{
                        iNow--; 
                        translateX= -iNow*aLi[0].offsetWidth;
                        oUl.style.WebkitTransform='translateX('+translateX+'px)';
                        tab();
                    }
                }else{
                    translateX= -iNow*aLi[0].offsetWidth;
                    oUl.style.WebkitTransform='translateX('+translateX+'px)';
                }

                function tranEnd(){
                    oUl.removeEventListener('transitionend',tranEnd,false);
                    oUl.style.WebkitTransition = 'none';
                    
                    if(iNow==0){
                        iNow = aLi.length-2;
                        translateX = -iNow*aLi[0].offsetWidth;
                        oUl.style.WebkitTransform='translateX('+translateX+'px)';
                    }
                    if(iNow==aLi.length-1){
                        iNow = 1;
                        translateX = -iNow*aLi[0].offsetWidth;
                        oUl.style.WebkitTransform='translateX('+translateX+'px)';
                    }
                    bOK = false;
                };
                oUl.addEventListener('transitionend',tranEnd,false);
            }
            oUl.addEventListener('touchmove',fnMove,false);
            
            oUl.addEventListener('touchend',fnEnd,false);
            ev.preventDefault();
        },false);
        
        function tab(){
            for(var i=0; i<aBtn.length; i++){
                aBtn[i].className='';
            }
            var index=iNow-1;
            if(index==-1){
                index = aLi.length-3;
            }
            if(index==aLi.length-2){
                index = 0;
            }
            aBtn[index].className='on';
        }
    },false);
})();