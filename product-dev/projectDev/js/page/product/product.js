/************
 * 日期：2018/12月03日
 * 名称：商品详情页的js
 * 作者：杜佳维
 * 备注：null
 * 备注2：使用prototype原型模式写代码
 */

//产品大图
function productBigImgWrap( _configObj ){
    for( var i in _configObj ){
        this[i] = _configObj[i];
    }
    this.inx = 0;
    this.init();
}

productBigImgWrap.prototype = {

    init : function(){
        var _self = this;
        _self.getData();
    },

    getData : function(){
        var _self = this;
        getAjax( API_LIST.productImgList,function( _data ){
            // 加载到数据之后，大图加载中，文字隐藏
            _self.loadingTxtId.hide();

            //生成大图
            _self.bigImg( _data.bigImg );
            //生成小图列表
            _self.smallImg( _data.smallImg );
            //小图列表事件
            _self.smallImgBtn();

            _self.leftBtnFn();
            _self.rightBtnFn( _data.smallImg );
            //遮罩
            _self.maskDivFn();
        } );
    },

    //大图
    bigImg : function( _bigImg ){
        var _self = this;
        _self.bigImgId.attr( 'src',_bigImg );

        //局部显示的图片 
        _self.localImgWrapId
                .children('img')
                .attr( 'src',_bigImg );
    },

    //生成小图列表
    smallImg : function( _smallImg ){
        var _self = this;
        //console.log( _smallImg );
        for( var i=0;i<_smallImg.length;i++ ){
            $('<li/>',{
                'data-bigImg' : _smallImg[i].bigImgUrl
            })
                .html( '<img src=' + _smallImg[i].small_url  +' />' )
                .appendTo( _self.smallListId );
        } 
    },

    //生成小图列表事件
    smallImgBtn : function(){
        var _self = this;
        _self.smallListId.children('li').on( 'click',function(){
            var _data_bigimg = $(this).attr( 'data-bigImg' );
            
            //大图
            _self.bigImgId.attr( 'src',_data_bigimg );

            //局部显示的图片
            _self.localImgWrapId
                .children('img')
                .attr( 'src',_data_bigimg );
        } )
    },

    //左按钮
    leftBtnFn : function(){
        var _self = this;

        _self.leftBtnId.on( "click",function(){
            /*_self.inx++;
            _self.smallListId.css( "left",70*_self.inx );*/
        } )
    },

    //右按钮
    rightBtnFn : function( _smallImg ){
        var _self = this;

        _self.rightBtnId.on( "click",function(){
            /*if(_self.inx<_smallImg.length-6){
                _self.inx--;
            }else{
                _self.inx=0;
            }*/
            _self.smallListId.css( "left",70*_self.inx );
        } )
    },

    //mask遮罩层
    maskDivFn : function(){
        var _self = this;

        _self.bigImgWrapId.on({
            mouseover : function(){
                _self.maskDivId.css( 'display','block' );
                _self.localImgWrapId.css( 'display','block' );
            },
            mouseout : function(){
                _self.maskDivId.css( 'display','none' );
                _self.localImgWrapId.css( 'display','none' );
            },
            mousemove : function( _event ){
                _eL = _event.clientX;
                _eT = _event.clientY;

                // 获取父容器相对于整个网站的坐标
                _bigImgWrapId = _self.bigImgWrapId.offset();

                _eL = _eL - _bigImgWrapId.left - 75;
                _eT = _eT - _bigImgWrapId.top - 75;

                if(_eL<0){
                    //向左移动
                    _eL = 0;
                }else if( _eL > _self.bigImgWrapId.width() - 150 ){
                    _eL = _self.bigImgWrapId.width() - 150;
                }

                if(_eT<0){
                    //向顶移动
                    _eT = 0;
                }else if( _eT > _self.bigImgWrapId.height() - 150 ){
                    _eT = _self.bigImgWrapId.height() - 150;
                }

                //半透明的遮罩
                _self.maskDivId.css({
                    'left' : _eL,
                    'top' : _eT
                })
                    //.html( _eL + ':' + _eT );       

                var _bigImg = _self.localImgWrapId.children('img');
                _bigImg.css({
                    'left' : -(_eL * 2.90 ),
                    'top' : -(_eT * 2.90 )
                });                  
            }
        })
    }
}

new productBigImgWrap({
    bigImgId : $( '#bigImgId' ),
    smallListId : $( '#smallListId' ),
    loadingTxtId : $('#loadingTxtId'),

    leftBtnId : $('#leftBtnId'),
    rightBtnId : $('#rightBtnId'),

    bigImgWrapId : $('#bigImgWrapId'),
    maskDivId : $('#maskDivId'),

    localImgWrapId : $('#localImgWrapId')

});
