/************
 * 日期：2018/11/20
 * 名称：公共方法
 * 作者：杜佳维
 * 备注：公共方法要面对很多情况、条件，所以真正写起来很考验经验的。
 */
/*
    加载全站公共的页面head头文件
 */
;
(function( callback ){
    $.ajax( {
            url : 'js/public/head.html',    //get请求url地址
            type : "get", 
            dataType : "html",
            success : function( _data ){         //成功后回调函数
                //console.log( _data );
                $('<div/>',{
                    'class': 'header'
                })
                    .html( _data )
                    .prependTo( $('body') );

                callback();
            }
        } );
})(function(){
        //搜索框
        new headerSearchFn( $("#searchInput") );

                    //栏目导航栏
        new createColumnFn( $("#ulColumnId") );
});
//header的搜索框
function headerSearchFn( _searchInput ){
    //添加属性
    this.searchInput = _searchInput;
    this.searchInput.attr("value",HeaderSearchVal);
    this.init();
}

/*
因为,构造器和prototype中的属性、方法，都指向了新生成的空对象，
所以，构造器和prototype中的this，是同一个this；
*/
// 用原型模式就应该这么写，就是一种方法
headerSearchFn.prototype = {
    //初始化各个方法，等于是构造器的入口
    init : function(){
        this.onFocusEvent();
        this.onBlurEvent();
    },

    //获得焦点
    onFocusEvent : function(){
        this.searchInput.on("focus",function(){
            $(this).attr("value","");
        });
    },

    //失去焦点
    onBlurEvent : function(){
        this.searchInput.on("blur",function(){
            $(this).attr("value",HeaderSearchVal);
        });
    }
}

//首页生成栏目导航栏 
function createColumnFn( ulColumnId ){
    this.ulColumnId = ulColumnId;
    this.init();
}
createColumnFn.prototype = {
    init : function(){
    this.getData();   
    },
    getData : function(){
        var _self =  this;

        /*$.ajax( {
            url : "http://localhost:2346/index/column",
            type : "get",
            dataType : "json",
            success : function( _data ){
                //console.log( _data );
                _self.createDOM( _data.lis );
            }
        } );*/

        /*getData( "http://localhost:2346/index/column",function( _data ){
            _self.createDOM( _data.lis );
        });*/

        getAjax( API_LIST.column, function( _data ){
            _self.createDOM( _data.lis );
        });

        //this.createDOM( _lisObj );
    },
    createDOM : function( _lisObj ){
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
                      $('<em/>').appendTo(this.ulColumnId);
                    }
                  })
                 .appendTo(this.ulColumnId);           
              }
        }
}

//ajax 公共方法
function getAjax( url,callback ){
    $.ajax( {
            url : url,
            type : "get",
            dataType : "json",
            success : function( _data ){
                callback( _data );
            }
        } );
}

//ajax 公共方法,带参数
function getAjaxParam( url,param,callback ){
    $.ajax( {
            url : url,    //get请求url地址
            type : "get", 
            dataType : "json",
            data : param,   //请求参数
            success : function( _data ){         //成功后回调函数
                callback( _data );
            }
        } );
}



function gId(_n){
	return document.getElementById(_n);
}

function creatDOM(_n){
	return document.createElement(_n);
}
