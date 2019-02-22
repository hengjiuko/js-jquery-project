/************
 * 日期：2018/12月04日
 * 名称：商品详情页的商品信息
 * 作者：杜佳维
 * 备注：null
 * 备注2：使用prototype原型模式写代码
 */
;

function goodsInfoFn( _configObj ){
    for(var i in _configObj){
        this[i] = _configObj[i];
    }
    this.init();
}

goodsInfoFn.prototype = {
    init : function(){
        var _self = this;
        _self.getGoodsId();
        //_self.getData();
    },

    getGoodsId : function(){
        var _self = this;
         //console.log( location.href );
        // console.log( location.href.indexOf("?") );
        var _str = location.href.indexOf("?");
        //console.log( location.href.substring( _str+9 ) );
        var _goodsId = location.href.substring( _str+9 );
        _self.getData( _goodsId );

    },

    getData : function( _goodsId ){
        var _self = this;

        getAjaxParam( API_LIST.goodsInfo,{ids:_goodsId},function( _data ){
            _self.createDom( _data.arrObj );
            //console.log( _data );
        } )
    },

    createDom : function( _arrObj ){
        var _self = this;
        $('<h1/>')
            .html(_arrObj[0].goodsTitle)
            .appendTo( _self.goodsTitleId );

        //减少数据查找的层级
        var _lis = _arrObj[0].info;
        for( var i=0; i<_lis.length; i++ ){
            $('<li/>')
                .html( _lis[i] )
                .appendTo( _self.goodsTitleId );
        }
    }
}

new goodsInfoFn({
    goodsTitleId : $('#goodsTitleId')
});