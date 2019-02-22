/************
 * 日期：2018/12月06日
 * 名称：商品详情页的配送地址
 * 作者：杜佳维
 * 备注：null
 */
function addressMenuFn( _configObj ){
    for( var i in _configObj ){
        this[i] = _configObj[i];
    }
    this.isShow = 0;
    this.arr = [];
    this.init();  
}

addressMenuFn.prototype = {
    init : function(){
        var _self = this;
        // 地址容器的显示、隐藏的切换
        _self.addressTitleEvent();
        _self.getData();
        //省市的tab按钮事件
        _self.eventTabA();
        _self.eventTabB();
    },
    // 地址容器的显示、隐藏的切换
    addressTitleEvent : function(){
        var _self = this;

        _self.titleLabelId.on( 'click',function(){
            if( _self.isShow ==0 ){
                _self.addressListId.show();
                _self.isShow = 1;
            }else{
                _self.addressListId.hide();
                _self.isShow = 0;
            }
        } )
    },
    getData : function(){
        var _self = this;

        //获取省
        getAjax(API_LIST.province ,function( _d ){
            _self.createDom( _d.province,_self.provinceId );
            _self.provinceEvent();
        } );

        //获取市
         getAjax(API_LIST.city ,function(_d){
            _self.createDom( _d.city,_self.cityId );
            _self.cityEvent();
        } );
        
        //获取区
         getAjax(API_LIST.area ,function(_d){
            _self.createDom( _d.area,_self.areaId);
            _self.areaEvent();
        } );
       

        //_self.createDom();
    },
    // 公共方法，生成省、市、区的列表
    createDom : function( _data,_wrap ){
        var _self = this;
        for( var i=0; i<_data.length; i++ ){
            $('<p/>')
                .html( _data[i].name )
                .appendTo( _wrap );
        }
    },
    //省的tab菜单
    provinceEvent : function(){
        var _self = this;

        _self.provinceId.find('p').on( 'click',function(){
            //console.log( $(this).html() );
            var _html = $(this).html();
            _self.tabA
                .removeClass('selectLi')
                .html( _html );

            //把省存入数组
            _self.titleArrFn( _html );

            // 选完了省，省的菜单要隐藏。市要显示出来
            _self.provinceId.hide();
            _self.cityId.show();

            _self.tabB
                .show()
                .html('请选择市')
                .addClass( 'selectLi' );
        } )
    },
    //市的tab菜单
    cityEvent : function(){
        var _self = this;

        _self.cityId.find('p').on( 'click',function(){
            //console.log( $(this).html() );
            var _html = $(this).html();
            _self.tabB
                .removeClass('selectLi')
                .html( _html );

            //把市存入数组
            _self.titleArrFn( _html );

            // 选完了市，市的菜单要隐藏。区要显示出来
            _self.cityId.hide();
            _self.areaId.show();

            _self.tabC
                .show()
                .html( '请选择区' )
                .addClass( 'selectLi' );
        } )
    },
    //区的tab菜单
    areaEvent : function(){
        var _self = this;

        _self.areaId.find('p').on( 'click',function(){
            //console.log( $(this).html() );
            var _html = $(this).html();
            _self.tabC
                .removeClass('selectLi')
                .html( _html );

            //把区存入数组
            _self.titleArrFn( _html );  
            // 选完了区，所有的都要隐藏。
            _self.addressListId.hide();
            _self.isShow = 0;

            //每次重新选择区的时候，都是操作数组
            _self.arr.splice( 2,1 );     
        } )
    },
    //操作省、市、区的数组
    titleArrFn : function( _n ){
        var _self = this;
        if( _self.arr.length<3 ){
            _self.arr.push( _n );
        }
        console.log( _self.arr ); 
         _self.titleLableDivId.html('');

        for( var i=0; i<_self.arr.length; i++ ){
            $('<p/>')
                .html( _self.arr[i] )
                .appendTo( _self.titleLableDivId );
        }
    },
    //省的tab按钮被点击，市、区的列表要隐藏
    eventTabA : function(){
        var _self = this;

        _self.tabA.on( 'click',function(){
            $(this).addClass( 'selectLi' );
            _self.tabB.removeClass('selectLi').hide();
            _self.tabC.removeClass('selectLi').hide();

            _self.provinceId.show();
            _self.cityId.hide();
            _self.areaId.hide();

            // 修改省时，就是重新生成省、市、区，就是清空数组
            // _self.arr.splice(0 , 3);
            // 还可以使用下面的方法
            _self.arr = [];
            
        } )
    },
    //市的tab按钮被点击，区的列表要隐藏
    eventTabB : function(){
        var _self = this;
        _self.tabB.on( 'click',function(){
            _self.tabA.removeClass('selectLi');
             $(this).addClass( 'selectLi' );
            _self.tabC.removeClass('selectLi').hide();

            _self.provinceId.hide();
            _self.cityId.show();
            _self.areaId.hide();

            _self.arr.splice( 1,2 );
        } )
    }  
}

new addressMenuFn({
    titleLabelId : $('#titleLabelId'),
    titleLableDivId : $('#titleLableDivId'),
    addressListId : $('#addressListId'),

    tabA : $('#tabA'),
    tabB : $('#tabB'),
    tabC : $('#tabC'),

    provinceId: $('#provinceId'),
    cityId : $('#cityId'),
    areaId : $('#areaId')
});