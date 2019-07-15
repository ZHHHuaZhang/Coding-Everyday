const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */
for(var i=0;i<5;i++){
    const newImage= document.createElement('img');
    newImage.setAttribute('src','images/pic'+[i+1]+'.jpg');
    thumbBar.appendChild(newImage);
    
    newImage.onclick=function(e){
        var imageSrc=e.target.getAttribute('src');
        putImage(imageSrc);
    }

};

function putImage(imageSrc){
    displayedImage.setAttribute('src',imageSrc);
};

/* 编写 变亮/变暗 按钮 */

btn.onclick=function(e){
    var btnClass=btn.getAttribute('class');
    if(btnClass==='dark'){
        btn.setAttribute('class','light');
        btn.textContent='变亮';
        overlay.style.backgroundColor='rgba(0,0,0,0.5)';
    }
    else if(btnClass==='light'){
        btn.setAttribute('class','dark');
        btn.textContent='变暗';
        overlay.style.backgroundColor ='rgba(0,0,0,0)';
    }

}
