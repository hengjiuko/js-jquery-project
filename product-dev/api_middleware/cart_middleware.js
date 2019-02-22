//购物车的中间件
var express = require( 'express' );
var app = express();

//解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//购物车商品列表
app.get ( '/cart/cartList',function( req,res ){
    var _data = {
        "cartList": [{
                      "name": "商品1111",
                      "introduce": "商品1111就是好",
                      "pid":"goods_111",
                      "unit": 3698,
                      "num": 1,
                      "ischeck": 0,
                      "IsTrue" : true,
                      "total": 3698,
                      "goodsimg":"http://tse4.mm.bing.net/th?id=OIP.TMaiKEzF0YwYkmTUXGzGKAHaEN&w=300&h=300&p=0&o=5&pid=1.7"

                    },
                    {
                      "name": "商品222",
                      "introduce": "商品222就是好",
                      "pid":"goods_222",
                      "unit": 368,
                      "num": 2,
                      "ischeck": 0,
                      "IsTrue" : false,
                      "total": 736,
                      "goodsimg":"http://pic22.nipic.com/20120625/5712845_174700668167_2.jpg"
                    },
                    {
                      "name": "商品333",
                      "introduce": "商品333就是好",
                      "pid":"goods_333",
                      "unit": 222,
                      "num": 10,
                      "ischeck": 0,
                      "IsTrue" : true,
                      "total": 2220,
                      "goodsimg":"http://tse1.mm.bing.net/th?id=OIP.7JDza8l1z3AtQ0cSLwKnIgHaF7&pid=15.1"
                    }],
        "error":{
            "code":0,
            "msg":"1,有错误，具体报错信息在这里。0，没有错误。"
          },
        "total": {
            "num": 13,
            "totalMoney":6654
          }
                
    };
    res.send( _data );
    res.end();
} );

//增加商品数量
app.get( '/cart/_add',function( req,res ){
    // console.log( _n );
    var _n = req.query.num;
    var _u = req.query.unit;
    _n++;
    var _data = {
        "num" : _n,
        "total" : _u * _n
    };

    res.send( _data );
    res.end();
} )

//减少商品数量
app.get( '/cart/_minus',function( req,res ){
    // console.log( _n );
    var _n = req.query.num;
    var _u = req.query.unit;
    if( _n>1 ){
        _n--;
    }else if( _n<1 ){
        _n = 1;
    }
    var _data = {
        "num" : _n,
        "total" : _u * _n
    };

    res.send( _data );
    res.end();
} );

// 单向商品的小计
app.get( '/cart/singleGoods',function( req,res ){
    var _n = req.query.num;
    var _u = req.query.unit;
    if( _n<0 ){
        _n = 1;
    }
    var _data = {
        "num" : _n,
        "total" : _u * _n
    };

    res.send( _data );
    res.end();
} )

//商品输入框
app.get( '/cart/_entry',function( req,res ){
    // console.log( _n );
    var _n = req.query.num;
    var _u = req.query.unit;
    if( _n<0 ){
        _n = 1;
    }
    var _data = {
        "num" : _n,
        "total" : _u * _n
    };

    res.send( _data );
    res.end();
} );

//被选中 商品的数量、总价
app.get( '/cart/_allTotalMoney',function( req,res ){
    // console.log( _n );
    var _info = req.query.info;
    var _aN=0;
    var _aM=0;
    // console.log( _n );
    for( var i=0; i<_info.length; i++  ){
         _aN += Number(_info[i]._n);
         _aM += Number(_info[i]._u) * Number(_info[i]._n) ;
    }
    var _data = {
        'allNum': _aN,
        'allMoney': _aM
    };

    res.send( _data );
    res.end();
} );

// 统计vue被选中商品的总数、总价
app.get( '/cart/vue_allGoodsFn',function( req,res ){
    var _arr = req.query ;
    var _aN=0;
    var _aM=0;
    // console.log( _n );
    for( var i in _arr ){
        console.log( JSON.parse(_arr[i]) )
        _aN += JSON.parse(_arr[i]).num;
        _aM += JSON.parse(_arr[i]).num * JSON.parse(_arr[i]).unit;
    }
    var _data = {
        "allNum": _aN,
        "allMoney": _aM
    };
    
    res.send(_data);
    res.end();
} );

//全部商品的数量，无论checkbox是否被选中
app.get( '/cart/_allGoodsNum',function( req,res ){
    // console.log( _n );
    var _info = req.query.info;
    var _aN=0;
     console.log( _info );
    for( var i=0; i<_info.length; i++  ){
         _aN += Number(_info[i]._n);
    }
    var _data = {
        'allNum': _aN,
    };

    res.send( _data );
    res.end();
} );
app.listen( 2347,function(){
    console.log( '购物车中间件 2347  已经启动' );
} )
