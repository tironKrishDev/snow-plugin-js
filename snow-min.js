     /*!
     * jQuery Snowfall Plugin v2.0 - Protected Edition
     * Developed by: Tiron Krishantha
     * Copyright © 2025 Tiron Krishantha. All Rights Reserved.
     */
    (function($, window, document) {
        'use strict';

        // Protection Layer
        const _0x5a8f=['VGlyb24gS3Jpc2hhbnRoYQ==','ZGV2ZWxvcGVy','Y29weXJpZ2h0','MjAyNQ==','dGlyb25rcmlzaGFudGhh','c25vd2ZhbGw=','cHJvdGVjdGVk'];
        const _0x2b4c=['YXRvYg==','YnRvYQ==','Y2hhckNvZGVBdA=='];

        const _int=function(a){const b=_0x5a8f[a];if(!b)return null;try{return atob(b);}catch(e){return null;}};
        const _dev=_int(0);const _yr=_int(3);const _tag=_int(4);

        const _v1=function(){return typeof $!=='undefined'&&typeof $.fn==='object';};
        const _v2=function(){return _dev==='Tiron Krishantha';};
        const _v3=function(){const a=atob(_0x2b4c[0]);return a==='atob';};
        const _v4=function(){try{return btoa('test')==='dGVzdA==';}catch(e){return false;}};

        if(!_v1()||!_v2()||!_v3()||!_v4()){
            console.error('[SNOWFALL] Critical integrity check failed');
            return;
        }

        const _cs=(function(){
            const str=_dev+_yr+_tag;
            let hash=0;
            for(let i=0;i<str.length;i++){
                const char=str.charCodeAt(i);
                hash=((hash<<5)-hash)+char;
                hash=hash&hash;
            }
            return Math.abs(hash).toString(36);
        })();

        let _rc=0;
        const _rv=function(){
            _rc++;
            if(_rc%100===0){if(!_v2())return false;}
            return true;
        };

        const pluginName='snowfall';
        const version='2.0.0';

        $.fn[pluginName]=function(options){
            if(!_rv())return this;

            const defaults={densityFactor:100,speedAdjust:5,minSize:2,maxSize:12,drift:30,useOpacityLevels:true,minOpacity:0.5,maxOpacity:1.0,color:'rgba(255, 255, 255, {opacity})',zIndex:9999,autoStart:true,showCredit:true};
            const settings=$.extend({},defaults,options);

            return this.each(function(){
                const $container=$(this);
                const canvas=$('<canvas></canvas>').css({position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:settings.zIndex}).attr({'id':'snowfall-canvas-'+Date.now(),'data-author':btoa(_dev),'data-version':version,'data-checksum':_cs});
                $container.append(canvas);

                const ctx=canvas[0].getContext('2d');
                let snowflakes=[];
                let ww=window.innerWidth;
                let wh=window.innerHeight;
                let animationId=null;
                let isRunning=false;

                class Snowflake{
                    constructor(){
                        if(!_rv())return;
                        this.size=Math.random()*(settings.maxSize-settings.minSize)+settings.minSize;
                        this.x=Math.random()*ww;
                        this.y=-this.size-Math.random()*wh*0.3;
                        if(this.size<5){this.baseSpeed=(Math.random()*3000+2100)*settings.speedAdjust;}
                        else if(this.size<9){this.baseSpeed=(Math.random()*2100+1700)*settings.speedAdjust;}
                        else{this.baseSpeed=(Math.random()*1700+1000)*settings.speedAdjust;}
                        this.speed=wh/(this.baseSpeed/1000*60);
                        this.driftRange=settings.drift;
                        this.driftSpeed=(Math.random()-0.5)*0.3;
                        this.driftOffset=0;
                        if(settings.useOpacityLevels){
                            const opacityLevel=Math.floor(Math.random()*3);
                            this.opacity=opacityLevel===0?1.0:(opacityLevel===1?0.8:0.7);
                        }else{this.opacity=Math.random()*(settings.maxOpacity-settings.minOpacity)+settings.minOpacity;}
                        this.initialX=this.x;
                        this._p=_cs;
                    }
                    update(){
                        if(!_rv())return;
                        this.y+=this.speed;
                        this.driftOffset+=this.driftSpeed;
                        const driftAmount=Math.sin(this.driftOffset)*this.driftRange;
                        this.x=this.initialX+driftAmount;
                        if(this.y>wh+this.size){this.y=-this.size;this.initialX=Math.random()*ww;this.x=this.initialX;this.driftOffset=0;}
                        if(this.x>ww+this.size){this.initialX-=ww+this.size*2;this.x=this.initialX+driftAmount;}
                        else if(this.x<-this.size){this.initialX+=ww+this.size*2;this.x=this.initialX+driftAmount;}
                    }
                    draw(){
                        ctx.beginPath();
                        ctx.arc(this.x,this.y,this.size/2,0,Math.PI*2);
                        ctx.fillStyle=settings.color.replace('{opacity}',this.opacity);
                        ctx.fill();
                        ctx.closePath();
                    }
                }

                function resizeCanvas(){ww=window.innerWidth;wh=window.innerHeight;canvas[0].width=ww;canvas[0].height=wh;}
                function calculateNumFlakes(){const t=parseInt(ww/settings.densityFactor);const r=(Math.round(t/10)*10)/2;return Math.floor(Math.random()*(t-9))+(r+11);}
                function animate(){if(!isRunning||!_rv())return;ctx.clearRect(0,0,ww,wh);snowflakes.forEach(f=>{f.update();f.draw();});animationId=requestAnimationFrame(animate);}
                function start(){if(isRunning)return;if(!_rv())return;isRunning=true;if(snowflakes.length===0){const n=calculateNumFlakes();for(let i=0;i<n;i++)snowflakes.push(new Snowflake());}animate();}
                function stop(){isRunning=false;if(animationId){cancelAnimationFrame(animationId);animationId=null;}}
                function clear(){stop();ctx.clearRect(0,0,ww,wh);snowflakes=[];}
                function destroy(){clear();canvas.remove();$(window).off('resize.'+pluginName);if(_creditEl)_creditEl.remove();}

                $(window).on('resize.'+pluginName,function(){if(!_rv())return;resizeCanvas();const n=calculateNumFlakes();while(snowflakes.length<n)snowflakes.push(new Snowflake());while(snowflakes.length>n)snowflakes.pop();});

                resizeCanvas();

                let _creditEl=null;
                const _wm=(function(){
                    const _enc1=btoa(_dev);
                    const _enc2=btoa(version);
                    const _enc3=_cs;
                    return function(){
                        if(!settings.showCredit)return;
                        const el=document.createElement('div');
                        el.setAttribute('data-snowfall-author',_enc1);
                        el.setAttribute('data-snowfall-version',_enc2);
                        el.setAttribute('data-snowfall-checksum',_enc3);
                        el.style.cssText='position:fixed;bottom:5px;right:5px;font-size:9px;color:rgba(255,255,255,0.25);z-index:99999;pointer-events:none;font-family:monospace;user-select:none;opacity:0;transition:opacity 0.3s;';
                        el.textContent='❄️ '+atob(_enc1);
                        el.className='snowfall-credit-'+_enc3;
                        document.body.appendChild(el);
                        _creditEl=el;
                        setTimeout(()=>{el.style.opacity='0.3';},500);
                        setTimeout(()=>{el.style.opacity='0.1';},3500);
                        setInterval(()=>{if(!document.body.contains(el)&&settings.showCredit)document.body.appendChild(el);if(el.getAttribute('data-snowfall-author')!==_enc1)el.setAttribute('data-snowfall-author',_enc1);},5000);
                    };
                })();

                setTimeout(_wm,1000);

                if(settings.showCredit){
                    console.log('%c❄️ Snowfall Plugin v'+version+' %c| Developed by '+_dev+' %c| © '+_yr,'color:#00d2ff;font-weight:bold;','color:#999;','color:#666;');
                }

                const api={start,stop,clear,destroy,isRunning:()=>isRunning,getAuthor:()=>atob(canvas.attr('data-author')),getVersion:()=>version,getChecksum:()=>_cs};
                $container.data(pluginName,api);
                if(settings.autoStart)start();
            });
        };

        Object.defineProperty($.fn[pluginName],'author',{value:_dev,writable:false,configurable:false});
        Object.defineProperty($.fn[pluginName],'version',{value:version,writable:false,configurable:false});

    })(jQuery,window,document);
