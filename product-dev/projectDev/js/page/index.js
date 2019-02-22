/************
 * 日期：2018/11/26
 * 名称：首页的js
 * 作者：杜佳维
 * 备注：最后一次修改代码
 * 备注2：使用prototype原型模式，再次重构代码
 */


//子导航条
function subNavFn( subNavId ){
    this.subNavId = subNavId; 
    this.init();
}
subNavFn.prototype = {
    init : function(){
        this.getData();
    },
    getData : function(){
        var _self = this;
        //data数据
        /*$.ajax( {
            url : "http://localhost:2346/index/subNav",
            type : "get",
            dataType : "json",
            success : function( _data ){
                console.log( _data );
                _self.createDOM( _data.arrs );
            }
        } );*/

        /*getData( "http://localhost:2346/index/subNav",function( _data ){
            _self.createDOM( _data.arrs );
        });*/

        getAjax( API_LIST.subNav, function( _data ){
            _self.createDOM( _data.arrs );
        });

        //this.createDOM( _subNavData );
    },
    createDOM : function( _subNavData ){
        for(var i=0;i<_subNavData.length;i++){
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
              .appendTo(this.subNavId);
        }
    }
}

//轮播图生成
function sliderFn( _configObj ){

    for( var i in _configObj ){
          this[i] = _configObj[i];
    }
    /*this.sliderWrapId = $('#sliderWrapId');

    //获取小白点容器
    this.pointerId=$('#pointerId');

    //获取小白点半透明容器
    this.pointerBgId=$('#pointerBgId');

    //左右按钮
    this.leftBtnId = $('#leftBtnId');
    this.rightBtnId = $('#rightBtnId');
    this.imgInx = 0;*/
    this.init();
}
sliderFn.prototype = {
    init : function(){
        this.getData();
    },
    getData : function(){
        var _self = this;
        /*var _sliderImgUrl = SliderImgUrl.urls;
        var _sliderImgLength = _sliderImgUrl.length;*/
        getAjax( API_LIST.sliderImg,function( _data ){

            //生成li大图片列表
            _self.createDOM( _data.urls );

            //生成小白点
            _self.createPointer( _data.urls.length );

            //小白点点击事件
            _self.pointerEvent();

            //左按钮
            _self.leftBtnEvent();
            
            //右按钮
            _self.rightBtnEvent( _data.urls.length );
        } )

        /*//生成li大图片列表
        //this.createDOM( _sliderImgUrl );

        //生成小白点
        this.createPointer( _sliderImgLength );

        //小白点点击事件
        this.pointerEvent();

        //左按钮
        this.leftBtnEvent();

        //右按钮
        this.rightBtnEvent( _sliderImgLength );*/
    },
    //生成li大图片列表
    createDOM : function( _sliderImgUrl ){
        for (var i=0;i<_sliderImgUrl.length;i++){
            $('<li/>')
              .html(function(){
                  $('<img/>')
                    .attr({
                        'src':_sliderImgUrl[i].imgUrl,
                        'title':_sliderImgUrl[i].imgTxt
                    })
                    .appendTo($(this));
              })
              .appendTo(this.sliderWrapId);
        }
    },
    //生成小白点
    createPointer : function( _sliderImgLength ){
        for (var i=0;i<_sliderImgLength;i++){
            $('<p/>').appendTo(this.pointerId);

            // 计算小白点容器的宽度/2，并赋值给它的margin-left
            this.pointerId.css({
                width : _sliderImgLength*25,
                marginLeft : -(_sliderImgLength*25)/2 
            });

            this.pointerBgId.css({
                width : _sliderImgLength*25,
                marginLeft : -(_sliderImgLength*25)/2 
            });

            //设置第一个小白点为红色选中状态
            this.pointerId.children().eq(0).addClass('redLi');
            
        }
    },

    //生成小白点的点击事件
    pointerEvent : function(){
        // 在这里，要把构造器的this保存起来，
        var _self=this;

        this.pointerId.children().on('click',function(){
            $(this).addClass('redLi').siblings().removeClass();
            _self.imgInx=$(this).index();

            _self.imgInx = $(this).index();
            _self.sliderWrapId.stop().animate({
                 'left' : -995 * _self.imgInx
            }, 200);
        })
    },

    //左按钮
    leftBtnEvent : function(){
        var _self=this;
        this.leftBtnId.on('click',function(){
             if(_self.imgInx>0){
                _self.imgInx--; 
            }else{
                _self.imgInx=3;
            }
           //移动左按钮时，修改小圆点的class
            _self.pointerId.children().eq(  _self.imgInx ).addClass('redLi').siblings().removeClass(); 
            _self.sliderWrapId.stop().animate({
                  'left' : -995 * _self.imgInx
                }, 200);
        });
    },

    //右按钮
    rightBtnEvent : function( _sliderImgLength ){
        var _self=this;
        this.rightBtnId.on('click',function(){
             if(_self.imgInx<_sliderImgLength-1){
                _self.imgInx++; 
            }else{
                _self.imgInx=0;
            }

           //移动右按钮时，修改小圆点的class
           _self.pointerId.children().eq(  _self.imgInx ).addClass('redLi').siblings().removeClass(); 

           _self.sliderWrapId.stop().animate({
              'left' : -995 * _self.imgInx
            }, 200);
        }); 
    }
}

//享受品质
function goodsListFn( productListId ){
    this.productListId = productListId;
    this.init();
}
goodsListFn.prototype = {
    init : function(){
        this.getData();
    },
    getData : function(){
        var _self = this;
        //数据
        /*var _arrs = GoodListData.arrs;
        this.createDOM( _arrs );*/
        getAjax( API_LIST.goodsList,function( _data ){
            _self.createDOM( _data.arrs );
        } )
    },
    createDOM : function( _arrs ){
        for(var i=0;i<_arrs.length;i++){
            var _mr10 = ' mr10';

            if( i>_arrs.length-2 ){
                _mr10='';
            }

            $('<a/>',{
                'class' : 'productWrap pho_' +(i+1) + _mr10,
                'href' : 'product.html?goodsId='+_arrs[i].goodsId,
                'target' : '_blank'
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
                    .appendTo( this.productListId );               
            }
    }
}












   








