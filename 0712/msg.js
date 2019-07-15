(function(window,document){
    let Msg=function(options){
        this._init(options);//自动执行init函数
        console.log(this);//msg
    }

    Msg.prototype._init=function({content='',cancel=null,confirm=null,useHTML=false,contentStyle={},contentFontSize='1.5em'}){
        this.content=content;
        this.cancel=cancel;
        this.confirm=confirm;
        this.useHTML=useHTML;
        this.contentStyle=contentStyle;
        this.contentFontSize=contentFontSize;
        //初始化各项options 对象模式写参数

        this._createElemnet();
        this._bind([this._el,this._overlay]);
        this._show([this._el,this._overlay]);
        //执行msg的各项函数

    }//原型链方法

    Msg.prototype._createElemnet=function(){
        let wrap=document.createElement('div');//创建一个div元素
        wrap.className='msg__wrap';//class名
        wrap.innerHTML=// '\'特殊字符
        '\
        <div class="msg-header">\
          <span>确认删除</span>\
          <span class="msg-header-close-button">×</span>\
        </div>\
        <div class="msg-body">\
          <div class="msg-body-icon">\
            <div class="msg-body-icon-info"></div>\
          </div>\
          <div class="msg-body-content">'+this.content+'</div>\
        </div>\
        <div class="msg-footer">\
          <button class="msg-footer-btn msg-footer-cancel-button">算了吧</button>\
          <button class="msg-footer-btn msg-footer-confirm-button">好的</button>\
        </div>'

        let contentDom=wrap.querySelector('.msg-body .msg-body-content');
        const contentStyle={
            fontSize:this.contentFontSize,
            ...this.contentStyle// 扩展运算符 合并对象
        }
        
        console.log(contentStyle);

        for(let i in contentStyle){
            if(contentStyle.hasOwnProperty(i)){
                contentDom.style[i]=contentStyle[i];
            }
        }//遍历传入style

        let overlay=document.createElement('div');//创建遮罩层
        overlay.className='msg__overlay';//类名样式

        this._el=wrap;
        this._overlay=overlay;
        //传出参数
    }
    Msg.prototype._bind=function([el,overlay]){
        const _this=this; //指向msg对象
        const hidMsg=function(){
            el.style.transform='translate(-50%, -50%) scale(0, 0)';//动画消失
            overlay.style.opacity='0';//透明度为0 不可见但是仍然存在
            setTimeout(function(){
                document.body.removeChild(el);
                document.body.removeChild(overlay);
            },300);//动画为0.3妙 一出弹窗和遮罩层
        }
        const cancel=function(e){
            console.log('全局',this);//这里的this指向button按钮
            console.log('部分',_this);//_this指向Msg实例
            _this.cancel && _this.cancel.call(_this,e);//存在cancel函数，然后回调执行传入的cancel函数
            hidMsg();
        }
        const confirm=function(e){
            _this.confirm && _this.confirm.call(_this,e);
            hidMsg();
        }
        overlay.addEventListener('click',cancel);
        
        el.querySelector('.msg-header .msg-header-close-button').addEventListener('click',cancel);
        el.querySelector('.msg-footer .msg-footer-cancel-button').addEventListener('click',cancel);
        el.querySelector('.msg-footer .msg-footer-confirm-button').addEventListener('click',confirm);
        //绑定点击事件
    }

    Msg.prototype._show=function([el,overlay]){
        document.body.appendChild(el);
        document.body.appendChild(overlay);
        setTimeout(function(){
            el.style.transform='translate(-50%, -50%) scale(1, 1)';
            overlay.style.opacity='1';
        })

    }//显示弹窗函数

    window.$Msg=Msg;//挂载到实例
})(window,document);

// <!--
// <div class="msg__wrap">
// <div class="msg-header">
//   <span>确认删除</span>
//   <span class="msg-header-close-button">×</span>
// </div>
// <div class="msg-body">
//   <div class="msg-body-icon">
//     <div class="msg-body-icon-wrong"></div>
//   </div>
//   <div class="msg-body-content">是否删除</div>
// </div>
// <div class="msg-footer">
//   <button class="msg-footer-btn msg-footer-cancel-button">算了吧</button>
//   <button class="msg-footer-btn msg-footer-confirm-button">好的</button>
// </div>
// </div>
// -->