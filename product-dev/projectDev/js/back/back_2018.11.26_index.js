/************
 * 日期：2018/11/21
 * 名称：首页的js
 * 作者：杜佳维
 * 备注：又好了一些代码，但其实还是很烂
 * 备注2：使用了jq框架
 */
//header的搜索框
function headerSearchFn(){
    //原生js查找DOM节点
    //var searchInput=gId("searchInput");
    var _searchInput=$("#searchInput");
     //设置首页搜索框的默认值
    //searchInput.setAttribute('value',HeaderSearchVal);
    _searchInput.attr("value",HeaderSearchVal);


    //获得焦点,当focus被触发时，执行后面的匿名函数
    _searchInput.on("focus",function(){
        $(this).attr("value","");
    });


    //失去焦点
    _searchInput.on("blur",function(){
        $(this).attr("value",HeaderSearchVal);
    });






     //获取焦点
    // searchInput.onfocus=function(){
    //     this.setAttribute('value','');
    // }
    // //失去焦点
    // searchInput.onblur=function(){
    //     this.setAttribute('value',HeaderSearchVal);
    // }
}

   //首页生成栏目导航栏

function createColumnFn(){
  var _lisObj = _dataColumnObj.lis;
  /*var ulColumnId = gId("ulColumnId");

  for(var i = 0;i<_lisObj.length;i++){

    var _li = creatDOM("li");
    _li.innerHTML = _lisObj[i].txt;

  //筛选item标签
    if(_lisObj[i].item == 1){

      var _i = creatDOM("i");
      _i.setAttribute("class","item_1");

      _li.appendChild(_i);
      _li.setAttribute("class","pr");

   }

  //筛选em标签
    if(_lisObj[i].icon == 1){

      var _em = creatDOM("em");
      ulColumnId.appendChild(_em);

      }

    ulColumnId.appendChild(_li);
 1 }  */
  var _ulColumnId = $("#ulColumnId");

  for(var i=0;i<_lisObj.length;i++){
      $('<li/>')
          .html(function(){
            var _this = $(this);

            //筛选item标签
          if(_lisObj[i].item == 1 ){
              $('<i/>',{
                'class':'item_1'
              })
              .appendTo(_this);

              $('<p/>')
              .html(_lisObj[i].txt)
              .appendTo(_this);

              _this.attr('class','pr');
            }

            else{
              $('<p/>')
              .html(_lisObj[i].txt)
              .appendTo(_this);
            }

            //筛选em标签
            if(_lisObj[i].icon == 1){
              $('<em/>').appendTo(_ulColumnId);
            }
          })
          .appendTo(_ulColumnId);           
  }
}   


  
//子导航条
function subNavFn(){
    var _subNavData = subNavData.arrs
    //var _subNavId = gId("subNavId");

      /*for(var i=0;i<_subNavData.length;i++){
          var _li = creatDOM("li");
          var _p = creatDOM("p");
          var _div = creatDOM("div");

          _div.setAttribute("class","pupUpDiv");

          //title
          _p.innerHTML = _subNavData[i].title;
          _li.appendChild(_p);

          //popUp
          for(var j=0;j<_subNavData[i].popUp.length;j++){
              var p2 = creatDOM("p");
              p2.innerHTML = _subNavData[i].popUp[j];

              _div.appendChild(p2);

          }
          _li.appendChild(_div);

          //鼠标事件
          _li.onmouseover = function(){
              this.children[1].style.display = "block";
          } 

          _li.onmouseout=function(){
            this.children[1].style.display = "none";
          }

          _subNavId.appendChild(_li);
        
   }*/
    var _subNavId = $('#subNavId');
    for(var i=0;i<_subNavData.length;i++){

        //$('<li/>')是一个jq对象，可以调用.html， .on， .appendTo等jq方法
        $('<li/>')
          .html(function(){
             $('<p/>')
                .html(_subNavData[i].title)
                .appendTo($(this));
             $('<div/>',{
              'class':'pupUpDiv'
             })
                .html(function(){
                   for(var j=0;j<_subNavData[i].popUp.length;j++){
                       $('<p/>')
                          .html(_subNavData[i].popUp[j])
                          .appendTo($(this));
                   }
                })
                .appendTo($(this));
          })
          .on({
            mouseover : function(){
                $(this).children('div').css('display','block');
            },

            mouseout : function(){
                $(this).children('div').css('display','none');
            },
          })
          .appendTo(_subNavId);
    }
}



  //轮播图生成
function sliderFn(){

    var _sliderImgUrl = SliderImgUrl.urls;
    var _sliderImgLength = _sliderImgUrl.length;
    //var _sliderWrapId=gId("sliderWrapId");
    var _sliderWrapId = $('#sliderWrapId');


    //获取小白点容器
    var _pointerId=$('#pointerId');

    //获取小白点半透明容器
    var _pointerBgId=$('#pointerBgId');

    //左右按钮
    var _leftBtnId = $('#leftBtnId');
    var _rightBtnId = $('#rightBtnId');
    var _imgInx = 0;



    //生成li大图片列表
    for (var i=0;i<_sliderImgLength;i++){
        $('<li/>')
          .html(function(){
              $('<img/>')
                .attr({
                    'src':_sliderImgUrl[i].imgUrl,
                    'title':_sliderImgUrl[i].imgTxt
                })
                .appendTo($(this));
          })
          .appendTo(_sliderWrapId);
    }

    //生成小白点
    for (var i=0;i<_sliderImgLength;i++){
        $('<p/>').appendTo(_pointerId);

        //计算小白点容器宽度/2,并把它赋值给margin-left
        _pointerId.css({
            width : _sliderImgLength*25,
            marginLeft : -(_sliderImgLength*25)/2 
        });

        _pointerBgId.css({
            width : _sliderImgLength*25,
            marginLeft : -(_sliderImgLength*25)/2 
        });

        //设置第一个小白点为红色选中状态
        _pointerId.children().eq(0).addClass('redLi');

        //小白点的点击事件
        _pointerId.children().on('click',function(){
          /*
            1.$(this)是当前的小白点
            2.addClass('redLi')是添加class属性
            3.siblings()是反选，就是选中了除它之外的所有小白点
            4.removeClass()然后移除除它之外所有小白点的class属性
           */
            $(this).addClass('redLi').siblings().removeClass();
            _imgInx=$(this).index();

            _imgInx = $(this).index();
            _sliderWrapId.stop().animate({
                 'left' : -995 * _imgInx
            }, 200);
        })
        
    }
    
    
    //左右按钮
    _leftBtnId.on('click',function(){
         if(_imgInx>0){
           _imgInx--; 
        }else{
          _imgInx=3;
        } 
      /*
      1、选中小白点的父容器中的子节点，也就是p标签；
      2、.eq()，这些p标签中的第几个， _imgInx；
      3、把第 _imgInx 个p标签添加class，其余的删除样式
      */

       //移动左按钮时，修改小圆点的class
       _pointerId.children().eq(  _imgInx ).addClass('redLi').siblings().removeClass(); 
       _sliderWrapId.stop().animate({
          'left' : -995 * _imgInx
        }, 200);
    });

    _rightBtnId.on('click',function(){
         if(_imgInx<_sliderImgLength-1){
           _imgInx++; 
        }else{
          _imgInx=0;
        }


       //移动右按钮时，修改小圆点的class
       _pointerId.children().eq(  _imgInx ).addClass('redLi').siblings().removeClass(); 

       _sliderWrapId.stop().animate({
          'left' : -995 * _imgInx
        }, 200);
    });
       
    

    
       /*for (var i=0;i<_sliderImgLength;i++){
        var _li=creatDOM("li");
        var _img=creatDOM("img");

        _img.setAttribute("src",_sliderImgUrl[i].imgUrl);
        _img.setAttribute("title",_sliderImgUrl[i].imgTxt);
        
        _li.appendChild(_img);

        _sliderWrapId.appendChild(_li);

    }
        
        //轮播左右按钮
    var _leftBtnId = gId('leftBtnId');
    var _rightBtnId = gId('rightBtnId');
    var _imgInx = 0;


    leftBtnId.onclick = function(){
        if(_imgInx>0){
           _imgInx--; 
        }else{
          _imgInx=3;
        }
        _sliderWrapId.style.left = -995*_imgInx+'px';
    }

    rightBtnId.onclick = function(){
        if(_imgInx<_sliderImgLength-1){
           _imgInx++; 
        }else{
          _imgInx=0;
        }
        _sliderWrapId.style.left = -995*_imgInx+'px';
    }*/
}

//享受品质

function goodsListFn(){
    var _productListId = $('#productListId');
    var _arrs = GoodListData.arrs;
    for(var i=0;i<_arrs.length;i++){
        var _mr10 = ' mr10';
        //第一种方式,这种写法不太美观、优雅，但好调用
        
        /*if( i>1 ){
            _mr10 = '';
        }*/

        //方式二
        if( i>_arrs.length-2 ){
            _mr10='';
        }



        $('<div/>',{
            'class' : 'productWrap pho_' +(i+1) + _mr10
        })
          .html(function(){
              $('<dl/>',{
                  'class' : 'bg_' +(i+1) 
              })
                .html(function(){
                    $('<dt/>')
                      .html( _arrs[i].title )
                      .appendTo( $(this) );
                    $('<dd/>')
                      .html( _arrs[i].infoTxt )
                      .appendTo( $(this) );
                })
                .appendTo( $(this) );
          })
          .appendTo( _productListId );
        
    }
}















   








