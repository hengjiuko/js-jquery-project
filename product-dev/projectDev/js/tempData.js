/************
 * 日期：2018/11/20
 * 名称：本地数据，临时的
 * 作者：杜佳维
 * 备注：null
 */
//全局变量，首字母大写
var HeaderSearchVal="请输入一些内容";
//首页栏目导航条作废，时间2018年11月19日
//var  _DataColumn =['秒杀','优惠券','闪购','京东超市','服装城','拍卖'];


//代码不好，优化方案在下面
/*var _dataColumnObj = {
 	lis: ['秒杀','优惠券','闪购','京东超市','服装城','拍卖']
 }*/
var _dataColumnObj={
	lis:[{
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

//子导航条的数据subNav
var subNavData={
	arrs:[
       {
       	title:"家用电器",
       	popUp:["冰箱","电视","洗衣机"]
       },
       {
       	title:"手机",
       	popUp:["华为","小米","苹果"]
       },
       {
       	title:"电脑",
       	popUp:["联想","华为","戴尔"]
       }
	]
}

//轮播图....数据
var SliderImgUrl={
  urls:[
     {
       imgUrl: 'images/temp/1.jpg',
       imgTxt:'第1张图'
     },
     {
       imgUrl: 'images/temp/2.jpg',
       imgTxt:'第2张图'
     },
     {
       imgUrl: 'images/temp/3.jpg',
       imgTxt:'第3张图'
     },
     {
       imgUrl: 'images/temp/4.jpg',
       imgTxt:'第4张图'
     }
  ]
}

//享受品质数据
var GoodListData={
    arrs : [{
         title:'京东超市',
         infoTxt : '天天打折，特别便宜',
      // bgImg : 'url'...
    },
    {
      title:'智能生活',
      infoTxt : '特别智能，全自动化',
      // bgImg : 'url'...
    },
    {
      title:'奢侈大牌',
      infoTxt : '特别有钱，买买买',
      }]
};
