/************
 * 日期：2018/12月08日
 * 名称：商品详情页的购物车
 * 作者：杜佳维
 * 备注：null
 */
;
(function(){
    function GotoShoppingCarFn( _configObj ){
    for( var i in _configObj ){
        this[i] = _configObj[i];
    }

    this.init();
}

    GotoShoppingCarFn.prototype = {
        init : function(){
            var _self = this;
            _self.getData();
        },
        getData : function(){
            var _self = this;
            //console.log( 'aaa' );
            getAjax( API_LIST.goto_shopping,function( _d ){
                // console.log( _d.num );
                _self.inputAId.attr( 'value',_d.num );

                _self.addEventBtn();

                _self.minsEventBtn();

                _self.enterNum();

                _self.gotoPayBtn();
            } )
        },
        //加号
        addEventBtn : function(){
            var _self = this;
            _self.inputBId.on( 'click',function(){
                getAjaxParam( API_LIST.goto_shopping,{action:'add'},function( _d ){
                    //console.log(_d.num);
                    _self.inputAId.attr( 'value',_d.num );

                } )
            } )
        },
        //减号
        minsEventBtn : function(){
            var _self = this;
            _self.inputCId.on( 'click',function(){
                getAjaxParam( API_LIST.goto_shopping,{action:'mins'},function( _d ){
                    //console.log(_d.num);
                    _self.inputAId.attr( 'value',_d.num );

                } )
            } )
        },
        //输入数字
        enterNum : function(){
            var _self = this;
            _self.inputAId.on( 'blur',function(){
                var _val = $(this).val();

                var _obj = {
                    action : 'blurs',
                    num : _val
                }
                getAjaxParam( API_LIST.goto_shopping,_obj,function( _d ){
                    //console.log(_d.num);
                    _self.inputAId.attr( 'value',_d.num );

                } )
            } )
        },
        //添加购物车
        gotoPayBtn : function(){
            var _self = this;
            _self.addShopCarBtnId.on( 'click',function(){
                location.href = "http://localhost:2345/cart.html"
            } )
        }
    };

    new GotoShoppingCarFn({
        inputAId : $('#inputAId'),
        inputBId : $('#inputBId'),
        inputCId : $('#inputCId'),

        addShopCarBtnId : $('#addShopCarBtnId')
    })
})();