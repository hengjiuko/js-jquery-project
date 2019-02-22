/************
 * 日期：2018/12/10
 * 名称：购物车的商品列表的模板
 * 作者：杜佳维
 * 备注：null
 */
function cartTplFn( _data ){
    var _html = '';

    for(var i=0; i<_data.length; i++){
        _html+= '<div class="line"></div><div class="goodsWrap">';
            _html+= '<ul>';
                if( _data[i].ischeck==0 ){
                    _html+= '<li class="w_1"><input class="checkData" type="checkbox" data-unit='
                            + _data[i].unit +' data-num='
                            + _data[i].num +' data-ischeck='+ _data[i].ischeck +' checked /></li>';
                }else if( _data[i].ischeck==1 ){
                    _html+= '<li class="w_1"><input class="checkData" type="checkbox" data-unit='
                        + _data[i].unit +' data-num='
                        + _data[i].num +' data-ischeck='+ _data[i].ischeck +'  /></li>';
                }
                _html+= '<li class="w_2">';
                    _html+= '<img src='+ _data[i].goodsimg +' />';
                _html+= '</li>';
                _html+= '<li class="w_3">'+ _data[i].introduce +'</li>';
                _html+= '<li class="w_4">￥'+ _data[i].unit +'</li>';
                _html+= '<li class="w_5">';
                    _html+= '<div class="enterGoodsNum">';
                        _html+= '<input class="minsBtn minsGoodsBtn" type="button" value="-" />';
                        _html+= '<input class="inputGoodsNum enterNum" type="text" value='+ _data[i].num +' />';
                        _html+= '<input class="addBtn addGoodsBtn" type="button" value="+" />';
                    _html+= '</div>';
                _html+= '</li>';
                _html+= '<li class="w_6 singleTotal">￥'+ _data[i].total +'</li>';
                _html+= '<li class="delBtn">删除</li>';
            _html+= '</ul>';
        _html+= '</div>';
    }

    return _html;
}
