//第一个中间件
var express = require('express');
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

//首页============== 
//商品栏目
app.get( '/index/column',function( req,res ){
    var _data = {
        lis : [{
                  txt:'秒杀',
                  item:0,
                  icon:0
                 },{
                  txt:'优惠券',
                  item:0,
                  icon:1
                 },{
                  txt:'闪购',
                  item:0,
                  icon:0  
                 },{
                  txt:'京东超市',
                  item:1,
                  icon:1
                 },{
                  txt:'服装城',
                  item:0,
                  icon:0
                 },{
                  txt:'拍卖',
                  item:0,
                  icon:0
              }]
    }

    res.send( _data );
    res.end();
} );


//子导航条
app.get( '/index/subNav',function( req,res ){
    var _data = {
        arrs : [{
            title : "家用电器",
            popUp : ["冰箱","电视","洗衣机"]
           },{
            title : "手机",
            popUp : ["华为","小米","苹果"]
           },{
            title : "电脑",
            popUp : ["联想","华为","戴尔"]
           }]
    };

    res.send( _data );
    res.end();
} );

//轮播图
app.get( '/index/sliderImg',function( req,res ){
    var _data = {
        urls:[{
                 imgUrl: 'images/temp/1.jpg',
                 imgTxt:'第1张图'
               },{
                 imgUrl: 'images/temp/2.jpg',
                 imgTxt:'第2张图'
               },{
                 imgUrl: 'images/temp/3.jpg',
                 imgTxt:'第3张图'
               },{
                 imgUrl: 'images/temp/4.jpg',
                 imgTxt:'第4张图'
               }]
    };

    res.send( _data );
    res.end();
} );

//享受品质
app.get( "/index/goodsList",function( req,res ){
  var _data = {
            arrs : [{
                  title:'京东超市',
                  infoTxt : '天天打折，特别便宜',
                  goodsId : 'id_1'
          
            },{
                  title:'智能生活',
                  infoTxt : '特别智能，全自动化',
                  goodsId : 'id_2'
         
            },{
                  title:'奢侈大牌',
                  infoTxt : '特别有钱，买买买',
                  goodsId : 'id_3' 
          }]
    };

    res.send( _data );
    res.end();
} );


//商品详情页
//商品详情页 ==大小图列表
app.get( '/product/productImgList',function( req,res ){
    var _data = {
            "bigImg": "images/temp2/1.png",
            "smallImg": [{
                    "small_url": "images/temp2/1.png",
                    "bigImgUrl" : "images/temp2/1.png"
                },{
                    "small_url": "images/temp2/2.png",
                    "bigImgUrl" : "images/temp2/2.png"
                },{
                    "small_url": "images/temp2/3.png",
                    "bigImgUrl" : "images/temp2/3.png"
                },{
                    "small_url": "images/temp2/4.png",
                    "bigImgUrl" : "images/temp2/4.png"
                },{
                    "small_url": "images/temp2/5.png",
                    "bigImgUrl" : "images/temp2/5.png"
                },{
                    "small_url": "images/temp2/6.png",
                    "bigImgUrl" : "images/temp2/6.png"
                }]
    }

    res.send( _data );
    res.end();
} );

//商品详情页==商品信息
app.get( '/product/goodsInfo',function( req,res ){
  //req.query是一个对象 ，常称为get请求参数
   var _ids = req.query.ids;

   var _data = null;

   if( _ids=='id_1' ){
      var _data = {
          arrObj : [{
            goodsTitle:'【返场券后价89】aaaaaaaaaaa',
            info:[
              '产品描述1111',
              '产品描述1222',
              '产品描述1333'
            ]
         }]
      };      
   }

   if( _ids=='id_2' ){
      var _data = {
          arrObj : [{
            goodsTitle:'【返场券后价89】bbbbbbbbbbb',
            info:[
              '产品描述1111',
              '产品描述1222',
              '产品描述1333'
            ]
         }]
      };      
   }

   if( _ids=='id_3' ){
      var _data = {
          arrObj : [{
            goodsTitle:'【返场券后价89】cccccccccc',
            info:[
              '产品描述1111',
              '产品描述1222',
              '产品描述1333'
            ]
         }]
      };      
   }

    res.send( _data );
    res.end();
} );

//商品详情页==配送地址 :省
app.get( '/product/province',function( req,res ){
    var _data = {
        "province" : [
              {
                  "name":"北京",
                  "_id" : 1
              },{
                  "name":"上海",
                  "_id" : 2
              },{
                  "name":"辽宁",
                  "_id" : 3
              },{
                  "name":"四川",
                  "_id" : 4
              },{
                  "name":"湖南",
                  "_id" : 5
              },{
                  "name":"广东",
                  "_id" : 6
              },
          ]
    };

    res.send( _data );
    res.end();
} );

//商品详情页==配送地址 :市
app.get( '/product/city',function( req,res ){
    var _data = {
        "city": [
                    {
                        "name": "沈阳",
                        "id": 1
                    },
                    {
                        "name": "大连",
                        "id": 2
                    },
                    {
                        "name": "营口",
                        "id": 3
                    },
                    {
                        "name": "大铁岭",
                        "id": 4
                    },
                    {
                        "name": "辽阳",
                        "id": 5
                    },
                    {
                        "name": "本溪",
                        "id": 6
                    }
                ]
    };

    res.send( _data );
    res.end();
} );

//商品详情页==配送地址 :区
app.get( '/product/area',function( req,res ){
    var _data = {
        "area": [
                    {
                        "name": "苏家屯区",
                        "id": 1
                    },
                    {
                        "name": "新民市",
                        "id": 2
                    },
                    {
                        "name": "皇姑区",
                        "id": 3
                    },
                    {
                        "name": "大铁沈河区",
                        "id": 4
                    },
                    {
                        "name": "东陵区",
                        "id": 5
                    },
                    {
                        "name": "浑南新区",
                        "id": 6
                    }
                ]
    };

    res.send( _data );
    res.end();
} );

//商品详情页==购物车
app.get( '/product/goto_shopping',function( req,res ){
    var _action = req.query;
    console.log( _action );
    var _data = {
        num : 9
    };

    if( _action.action == 'add' ){
        _data.num++;
    }else if( _action.action == 'mins' ){
        _data.num--;
    }else if( _action.action == 'blurs' ){
        _data.num = _action.action.num;
    }
    res.send( _data );
    //结束本次请求
    res.end();
} );



app.listen( 2346,function(){
    console.log( "中间件 2346, 已经启动" );
} );