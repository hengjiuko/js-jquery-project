/************
 * 日期：2018/11/19
 * 名称：首页的js
 * 作者：杜佳维
 * 备注：第一次写的烂代码
 */
//header的搜索框

var searchInput=document.getElementById("searchInput");
   //设置首页搜索框的默认值
    searchInput.setAttribute('value',HeaderSearchVal);
    //获取焦点
    searchInput.onfocus=function(){
    	searchInput.setAttribute('value','');
    }
    //失去焦点
    searchInput.onblur=function(){
        searchInput.setAttribute('value',HeaderSearchVal);
    }
 /*  方法不可取 //判断标识
    var _is=false;
    searchInput.onclick=function(){
        if(_is){
        	 searchInput.setAttribute('value',HeaderSearchVal);
        }
        else{
        	 searchInput.setAttribute('value','');
        	 _is=true;
        }
    */
   
   //首页生成栏目导航栏
   
   
   var ulColumnId=document.getElementById("ulColumnId");
   //console.log(ulColumnId);
   //第一种方法,最后只显示了最后一个数据
 /*  for(var i=0;i<_dataColumn.length;i++){
   	ulColumnId.innerHTML='<li>'+_dataColumn[i]+'</li>';
   }
   */
   //第二种方法，添加DOM节点
   for(var i=0;i<_dataColumn.length;i++){
   	var _li=document.createElement("li");
   	_li.innerHTML=_dataColumn[i];
   	ulColumnId.appendChild(_li);
   }
   
   
// 首页，生成subNav导航菜单
var _subNavId = document.getElementById('subNavId');
var _subNavTitleData = SubNavData[0];
var _arrLis = SubNavData[1];
// console.log( SubNavData );


// 生成第一层的菜单，并生成整个菜单的dom节点
for(var i=0; i<_subNavTitleData.length; i++){
  var _p = document.createElement('p');
  _p.innerHTML = _subNavTitleData[i];

  var _div = document.createElement('div');
  _div.setAttribute('class', 'pupUpDiv');

  var _li = document.createElement('li');
  _li.appendChild( _p );
  _li.appendChild( _div );

  _subNavId.appendChild( _li )
}

// 获得li里的div
// console.log( _subNavId )
console.log( _subNavId.children )

// 获取ul中的第一个子节点，是li
// console.log( _subNavId.children[0] )

// 第一个li中的子节点，结果 是一个集合
// console.log( _subNavId.children[0].children )
// 第一个li中的子节点的集合中的，第一个子节点，是p
// console.log( _subNavId.children[0].children[0] )

// 第一个li中的子节点的集合中的，第二个子节点，是div
 // console.log(_subNavId.children[0].children[1])

// 要明确点，数据驱动视图，
// 就是data要和dom，结构上一致

var _liDiv = _subNavId.children;

// 第二层数组嵌套，获取已经生成的dom节点，添加内容
for(var j=0; j<_arrLis.length; j++){
  //这是li里面的div
  // console.log( _liDiv[j].children[1] )
  for(var k=0; k<_arrLis[j].length; k++){
    // console.log( _arrLis[j][k] )
    var _divP = document.createElement('p');
    _divP.innerHTML = _arrLis[j][k];
    _liDiv[j].children[1].appendChild( _divP );

    _liDiv[j].onmouseover = function(){
      this.children[1].style.display = 'block';
      // console.log( '移入-' )
    }

    _liDiv[j].onmouseout = function(){
      this.children[1].style.display = 'none';
      // console.log( '移出-------' )
    }
  }
}











   








