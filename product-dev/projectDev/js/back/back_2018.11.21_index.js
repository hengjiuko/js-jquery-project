/************
 * 日期：2018/11/19
 * 名称：首页的js
 * 作者：杜佳维
 * 备注：稍微好一点的代码
 * 备注2：原生JavaScript的代码
 */
//header的搜索框
function headerSearchFn(){
  var searchInput=gId("searchInput");
   //设置首页搜索框的默认值
    searchInput.setAttribute('value',HeaderSearchVal);
    //获取焦点
    searchInput.onfocus=function(){
        this.setAttribute('value','');
    }
    //失去焦点
    searchInput.onblur=function(){
        this.setAttribute('value',HeaderSearchVal);
    }
}

   //首页生成栏目导航栏

function createColumnFn(){
  var _lisObj = _dataColumnObj.lis;
  var ulColumnId=gId("ulColumnId");

  for(var i=0;i<_lisObj.length;i++){

  var _li=creatDOM("li");
  _li.innerHTML=_lisObj[i].txt;

//筛选item标签
  if(_lisObj[i].item==1){

    var _i=creatDOM("i");
    _i.setAttribute("class","item_1");

    _li.appendChild(_i);
    _li.setAttribute("class","pr");

 }

//筛选em标签
  if(_lisObj[i].icon==1){

    var _em=creatDOM("em");
    ulColumnId.appendChild(_em);

    }

    ulColumnId.appendChild(_li);
  }  
}   



   
//子导航条
function subNavFn(){
  var _subNavData=subNavData.arrs
  var _subNavId=gId("subNavId");

    for(var i=0;i<_subNavData.length;i++){
      var _li=creatDOM("li");
      var _p=creatDOM("p");
      var _div=creatDOM("div");

      _div.setAttribute("class","pupUpDiv");

      //title
      _p.innerHTML=_subNavData[i].title;
      _li.appendChild(_p);

      //popUp
      for(var j=0;j<_subNavData[i].popUp.length;j++){
        var p2=creatDOM("p");
        p2.innerHTML=_subNavData[i].popUp[j];

        _div.appendChild(p2);

      }
      _li.appendChild(_div);

      //鼠标事件
      _li.onmouseover=function(){
        this.children[1].style.display="block";
      }

      _li.onmouseout=function(){
        this.children[1].style.display="none";
      }

      _subNavId.appendChild(_li);
      
    }
}



  //轮播图生成
function sliderFn(){
  var _SliderImgUrl=SliderImgUrl.urls;
  var _SliderImgLength=_SliderImgUrl.length;
  var _sliderWrapId=gId("sliderWrapId");


  for (var i=0;i<_SliderImgLength;i++){
    var _li=creatDOM("li");
    var _img=creatDOM("img");

    _img.setAttribute("src",_SliderImgUrl[i].imgUrl);
    _img.setAttribute("title",_SliderImgUrl[i].imgTxt);
    
    _li.appendChild(_img);

    _sliderWrapId.appendChild(_li);

  }
    
    //轮播左右按钮
  var _leftBtnId = gId('leftBtnId');
  var _rightBtnId = gId('rightBtnId');
  var _imgInx = 0;
  _leftBtnId.onclick=function(){
      // 要有一张图片保持显示
      if( _imgInx < (_SliderImgLength-1) ){
        _imgInx++;
      } else {
        _imgInx = 0;
      }
      _sliderWrapId.style.left = -995 * _imgInx +'px';
  }


  _rightBtnId.onclick = function(){
      if( _imgInx > 0 ){
        _imgInx--;
      } else {
        _imgInx = (_SliderImgLength-1);
      }
        _sliderWrapId.style.left = -995 * _imgInx +'px';
    }
}


















   








