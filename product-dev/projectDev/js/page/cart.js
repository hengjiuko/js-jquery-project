/************
 * 日期：2018/12/10
 * 名称：购物车的js
 * 作者：杜佳维
 * 备注：null
 */
//购物车列表
function cartListFn( _configObj ){
    for( var i in _configObj ){
        this[i] = _configObj[i];
    }
    this.init();
}

cartListFn.prototype = {
    init : function(){
        var _self = this;
        _self.getData();
    },

    getData : function(){
        var _self = this;
        getAjax( API_LIST.cartList,function( _data ){
           //console.log( _data );
           //生成购物车列表
           _self.createDom( _data.cartList );

           //顶部，全部商品
           _self.allGoodsNumId.html( _data.total.num );

           /*//底部，选择商品数量
           _self.selectGoodsNumId.html( _data.total.num );

           //商品总价
           _self.goodsTotalMoneyId.html( _data.total.totalMoney );*/

           //初始化全选按钮
           _self.initCheckboxAll( _data.cartList );

        } )
    },

    //生成购物车列表
    createDom : function( _data ){
        var _self = this;
        _self.cartWrapId.html(cartTplFn( _data ));

        //增加商品的数量，按钮事件
        _self.eventAddGoodsNum();

        //减少商品的数量，按钮事件
        _self.eventMinusGoodsNum();

        //商品数量输入框
        _self.eventInputGoodsNum();

        //每个商品的checkbox事件
        _self.eventCheckboxGoods();

        //所有已选中的商品数量和总价
        _self.allTotalMoney();

        //全选按钮事件
        _self.eventCheckBtnAll();

        //删除商品按钮
        _self.delGoodsBtn();

    },

    //初始化全选按钮
    initCheckboxAll : function( _data ){
        var _self = this;
        for( var i=0; i<_data.length; i++ ){
            // console.log( _data[i].ischeck !=0 );
            if( _data[i].ischeck !=0 ){
                //有任何一个不等于0，就意味着商品未被选中
                //全选按钮就处于未被选中的状态
                _self.checkBtnAll.removeAttr( 'checked' );
                break;
            }
             _self.checkBtnAll.prop( 'checked',true );
        }
    },
    //增加商品的数量，按钮事件
    eventAddGoodsNum : function(){
        var _self =this;
        var _addGoodsBtn = _self.cartWrapId.find( 'input.addGoodsBtn' );
        //console.log(_addGoodsBtn);
        _addGoodsBtn.on( 'click',function(){
            //console.log( 'acc' );
            //获得你所点击那个商品的单价、数量、小计
            var obj=_self.eventGetGoodsInfo( $(this) );
            
            //计算并更新单项商品的数量、小计
            _self.goodsSingleTotal( API_LIST._add,obj,$(this) );
            $(this).attr( 'disabled','disabled' );
            //console.log( obj );
        } )
    },

    //减少商品的数量，按钮事件
    eventMinusGoodsNum : function(){
        var _self = this;
        var _minsGoodsBtn = _self.cartWrapId.find( 'input.minsGoodsBtn' );
        _minsGoodsBtn.on( 'click',function(){
            //获得你所点击那个商品的单价、数量、小计
            var obj=_self.eventGetGoodsInfo( $(this) );

            //计算并更新单项商品的数量、小计
            _self.goodsSingleTotal( API_LIST._minus,obj,$(this) );
            $(this).attr( 'disabled','disabled' );
        } )
    },

    //商品数量输入框
    eventInputGoodsNum : function(){
        var _self = this;
        var _inputGoodsNum = _self.cartWrapId.find( 'input.inputGoodsNum' );
        _inputGoodsNum.on( 'blur',function(){
            var obj = _self.eventGetGoodsInfo( $(this) );
            // console.log( obj );
            //获取在输入框输入的数量
            obj.goods.num = $(this).val();
            console.log( obj );
            //计算并更新单项商品的数量、小计
            _self.goodsSingleTotal( API_LIST._entry,obj,$(this) );
            $(this).attr( 'disabled','disabled' );
        } )
    },

    //获得你所点击那个商品的单价、数量、小计
    eventGetGoodsInfo : function( _this ){
        var _self = this;
        //console.log( _this );
        var _goodsWrap = _this.parents('.goodsWrap');
        var _checkData = _goodsWrap.find( 'input.checkData' );

        //获取你所点加减号商品的数量、小计
        var _num = _checkData.attr( 'data-num' ); 
        var _unit = _checkData.attr( 'data-unit' );

        //获取你所点击商品的数量、总价dom节点
        var _inputGoodsNum = _goodsWrap.find( 'input.inputGoodsNum' );
        var _singleTotal = _goodsWrap.find( 'li.singleTotal' );

        var _tempObj = {
            goods : {
                num : _num,
                unit : _unit
            },
            inputGoodsNum : _inputGoodsNum,
            singleTotal : _singleTotal,
            checkData : _checkData
        };
        

        return _tempObj;
    },

    //计算并更新单项商品的数量、小计
    goodsSingleTotal : function( _cartApi, _objData, _that ){
        var _self = this;
        getAjaxParam( _cartApi, _objData.goods, function( _d ){
            // console.log( _d );
             _objData.inputGoodsNum.attr( 'value',_d.num );
             _objData.singleTotal.html( _d.total );

             //更新你所点击商品的check,保存数据
             _objData.checkData.attr( 'data-num',_d.num );
             _objData.checkData.attr( 'data-unit',_d.unit );

             _that.removeAttr( 'disabled' );

             //所有已选中的商品和总价
             _self.allTotalMoney();
             
             //全部商品的数量，不管checkbox是否被选中
             _self.allGoodsNumFn();
        } );

    },

    //计算所有已选中的商品数量和总价
    allTotalMoney : function(){
        var _self = this;
        var _checkData = _self.cartWrapId.find( 'input.checkData' ); //_cheacData是一个jq对象

        //统计，所有“被选中”的商品信息，未被选中的商品 ，不参与统计
        var _data = _self.filterCheckGoodsInfo( _checkData );
        // console.log( _data );

        //请求接口，所有"被选中"商品的数量、总价
        getAjaxParam( API_LIST._allTotalMoney,{ info:_data },function(_d){
            // console.log( _d );
            //底部，选择商品数量
           _self.selectGoodsNumId.html( _d.allNum );

           //底部，商品总价
           _self.goodsTotalMoneyId.html( _d.allMoney );
        })
    },

    //筛选，所有的商品中哪些处于“被选中” 的状态
    filterCheckGoodsInfo : function( _checkData ){
        var _self = this;
        var _tempArr = [];

        for( var i=0; i<_checkData.length; i++ ){
            // attr('data-check')==0  商品被选中
            if( _checkData.eq(i).attr('data-ischeck')==0 ){
                var _temp = {
                    _n : _checkData.eq(i).attr( 'data-num' ),
                    _u : _checkData.eq(i).attr( 'data-unit' )
                }
                _tempArr.push( _temp );
            }
        }

        //如果购物车中没有商品时
        if( _tempArr.length == 0 ){
            var _temp = {
                _n : 0,
                _u : 0
            }
            _tempArr.push( _temp );
        }
    
        // console.log( _tempArr );
        return _tempArr;
    },

    //全部商品的数量，不管checkbox是否被选中
    allGoodsNumFn : function(){
        var _self = this;
        var _checkData = _self.cartWrapId.find( 'input.checkData' ); //_cheacData是一个jq对象.
        var _arr = [];

        for( var i=0; i<_checkData.length; i++ ){
            var _temp = {
                _n : _checkData.eq(i).attr( 'data-num' )
            };
            _arr.push( _temp );
        }

        //购物车中没有商品的时候
        if( _arr.length == 0 ){
            var _temp = {
                _n : 0
            };
            _arr.push( _temp );
        }
        // console.log( _arr );
        getAjaxParam( API_LIST._allGoodsNum,{ info:_arr },function(_d){
             console.log( _d );
             //顶部，全部商品
             _self.allGoodsNumId.html( _d.allNum );
        })
    },

    //每个商品的checkbox事件
    eventCheckboxGoods : function(){
        var _self = this;
        var _checkData = _self.cartWrapId.find( 'input.checkData' ); //_cheacData是一个jq对象.
        _checkData.on( 'click',function(){
            //console.log( 'aaa' );
            //使用三元运算符判断
            $(this).attr( 'data-ischeck' )==0
                ?$(this).attr( 'data-ischeck',1 )
                :$(this).attr( 'data-ischeck',0 );

            //所有已选中的商品数量和总价
            _self.allTotalMoney();

            _self.updataCheckBoxAll();
        } )
    },

    //全选按钮事件
    eventCheckBtnAll : function(){
        var _self = this;
        _self.checkBtnAll.on( 'click',function(){
            var _is = $(this).is( ':checked' );
            if( _is ){
                console.log( '选中' );
                /*
                    attr操作的是某个属性的值
                    prop操作的是，某个属性有没有
                 */
                _self.checkBtnAll.prop( 'checked',true );
                _self.cartWrapId
                    .find( 'input.checkData' )
                    .attr( 'data-ischeck',0 )  //设置属性
                    .prop( 'checked',true );   //表示属性的状态
                _self.allTotalMoney();
            }else{
                console.log( '未选中' );
                _self.checkBtnAll.removeAttr( 'checked' );
                _self.cartWrapId
                    .find( 'input.checkData' )
                    .attr( 'data-ischeck',1 )
                    .removeAttr( 'checked' );
                _self.allTotalMoney();
            }
        } )
    },

    //更新全选按钮的状态
    updataCheckBoxAll : function(){
        var _self = this;
        var _checkData = _self.cartWrapId.find( 'input.checkData' );
        if( _checkData.length>0 ){
            //购物车中有商品
            for( var i=0; i<_checkData.length; i++ ){
                console.log( _checkData.length );
                 if( _checkData.eq(i).attr( 'data-ischeck' )==1 ){
                        _self.checkBtnAll.removeAttr( 'checked' );
                        break;
                 }

                 _self.checkBtnAll.prop( 'checked',true );   
            }   
        }else{
            //购物车中没有商品
             _self.checkBtnAll.removeAttr( 'checked' );
             _self.cartWrapId.html( '购物车中没有商品，请添加商品' );
        }
    },

    //删除商品按钮
    delGoodsBtn : function(){
        var _self = this;
        var _delBtn = _self.cartWrapId.find( 'li.delBtn' );

        _delBtn.on( 'click',function(){
            // console.log( 123 );
            var _goodsWrap = $(this).parents( 'div.goodsWrap' );
            //删除商品上面的横线
            _goodsWrap.prev().remove();
            _goodsWrap.remove();

            //计算所有已选中的商品数量和总价
            _self.allTotalMoney();

            //全部商品的数量，不管checkbox是否被选中
            _self.allGoodsNumFn();

            //更新全选按钮的状态
            _self.updataCheckBoxAll();
        } )
    }
}

;
(function( callback ){
    callback();
    //console.log( callback() );
})(function(){
    new cartListFn({
        cartWrapId : $('#cartWrapId'),
        allGoodsNumId : $('#allGoodsNumId'),
        selectGoodsNumId : $('#selectGoodsNumId'),
        goodsTotalMoneyId : $('#goodsTotalMoneyId'),
        checkBtnAll : $('input.checkBtnAll')

    })
});