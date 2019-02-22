/************
 * 日期：2018/11/19
 * 名称：全局的配置文件
 * 作者：杜佳维
 * 备注：null
 */
var SIZE_URL = "http://localhost:";

var port = 2346;
var cart_port = 2347;

// 这个东西，叫数据字典。按数据结构来讲，它叫散列
var API_LIST = {
    //首页==============
    //栏目
    column : SIZE_URL + port + "/index/column",

    //子导航条
    subNav : SIZE_URL + port + "/index/subNav",

    //轮播图
    sliderImg : SIZE_URL + port + "/index/sliderImg",

    //享受品质
    goodsList : SIZE_URL + port + "/index/goodsList",

    //商品详情页===========
    //大小图列表
    productImgList : SIZE_URL + port + "/product/productImgList",

    //商品信息
    goodsInfo : SIZE_URL + port + '/product/goodsInfo',

    //配送地址:省
    province : SIZE_URL + port + '/product/province',

    //配送地址:市
    city : SIZE_URL + port + '/product/city',

    //配送地址:区
    area : SIZE_URL + port + '/product/area',

    //购物车
    goto_shopping : SIZE_URL + port + '/product/goto_shopping',

    //购物车页面=========
    //商品列表
    cartList : SIZE_URL + cart_port + '/cart/cartList',

    //增加商品数量
    _add : SIZE_URL + cart_port + '/cart/_add',

    //减少商品数量
    _minus : SIZE_URL + cart_port + '/cart/_minus',

    //商品输入框
    _entry : SIZE_URL + cart_port + '/cart/_entry',

    //被选中 商品的数量、总价
    _allTotalMoney : SIZE_URL + cart_port + '/cart/_allTotalMoney',
    
    //全部商品的数量，无论checkbox是否被选中
    _allGoodsNum : SIZE_URL + cart_port + '/cart/_allGoodsNum'
};
