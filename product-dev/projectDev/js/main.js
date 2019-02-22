/************
 * 日期：2018/11/20
 * 名称：项目的入口文件
 * 作者：杜佳维
 * 备注：修改后更好的代码
 */
//用匿名自执行函数是为了不污染全局变量，不把变量、函数放到全局变量中
//这是一种很好的开发环境
//加分号原因是防止上面的代码错误，影响到下面代码的执行
//下面的写法，更专业，_win这里现在是用不上,只是按格式应该这么
;
(
  function (win,_fn){
  	_fn();
  }
)( window,function(){

		//子导航条
		new subNavFn( $('#subNavId') );

	    //轮播图
		new sliderFn({

            sliderWrapId : $('#sliderWrapId'),
            //获取小白点容器
            pointerId : $('#pointerId'),

            //获取小白点半透明容器
            pointerBgId : $('#pointerBgId'),
            
            //左右按钮
            leftBtnId : $('#leftBtnId'),
            rightBtnId : $('#rightBtnId'),
            
            imgInx : 0
        });

		//享受品质
		new goodsListFn( $('#productListId') );
});
