/*
*功能是分页
*
*@陈建芳
*@qq:1737752975
*
*/

function ChangeDiv(num){
	this.num=num;
	this.nowValue=0;   //这个是当前页面
	this.showCount = 5;//控制页面要显示多少项
	this.fun = 0; // 当前项的个数,页码显示当前多少页的
	this.lock = true; //当点击项目的时候设置锁
	this.nextLock = true;
	this.init();
}
ChangeDiv.prototype={
	init: function(){     //初始化
		var _this = this;

		this.showNum();
		$(".right").click(function(){		//当没有移出最右边
			if(_this.nowValue<(_this.num-1)){    
				_this.moveDiv(1);
			}
		});
		$(".left").click(function(){        ////当没有移出最左边
			if(_this.nowValue>0){
				if(_this.fun - _this.nowValue == 5 ){
					_this.lock = true;
				}
				_this.moveDiv(-1);
			}
		});
		$(".container ul").click(function(e){     //点击li项
			_this.nowValue = $(e.target).html() - 1; //获得点击标签的index
			$(".showNum span:first-child").html(_this.nowValue+1); //显示页码
			$(".container ul li").removeClass("checkState");
			$(e.target).addClass("checkState");
			if(_this.fun-_this.nowValue > 1 ){
				_this.lock = false;
				_this.nextLock = false;
			};
			if(_this.fun-_this.nowValue <=1 ){
				_this.lock = true;
				_this.fun++;
			}
			
		});
	},
	showNum: function(){        //标签项数生成
		var item ,
			itemCount = "",
			_this = this;

		for(var i=0;i<_this.num;i++){   //页面刚开始显示的项数
			if(i<_this.showCount){
				this.fun++;
				itemCount += '<li>'+this.fun+'</li>';
			}else{



			}
		};
		if(this.num>0){
			$(".showNum span:first-child").html(1); //显示页码
		}else{
			$(".showNum span:first-child").html(0);
		}
		$(".showNum span:last-child").html("/"+this.num);
		$(".container ul").append(itemCount);
		$(".container ul li").eq(_this.nowValue).addClass("checkState");
	},
	moveDiv: function(clickMove){          //标签数字移动
		this.nowValue += clickMove;
		var itemCount = "", _this = this;
		$(".container ul li").removeClass("checkState");

		if(this.nowValue >= (this.showCount) && clickMove>0 && this.lock){  //点击右按钮还不是最后一项的时候的操作
			$(".container ul li").eq(0).remove();
			this.fun++;
			itemCount += '<li>'+this.fun+'</li>';
			$(".container ul").append(itemCount);
			
		}
		if(this.nowValue > this.showCount-2 && clickMove<0 && this.lock){  //点击左按钮还不是第一项的时候的操作
			$(".container ul li").eq(this.showCount-1).remove();
			var backItem = '<li>'+(this.fun-this.showCount)+'</li>';
			$(".container ul").prepend(backItem);
			this.fun--;
		}

		if(this.fun-this.nowValue <=1 ){
			this.lock = true;
		}
		
		if(this.nowValue<this.showCount || !this.nextLock){   // 当天选中的状态颜色
			
			if(this.nowValue == 0){
				$(".container ul li").eq(0).addClass("checkState");
			}else{
				$(".container ul li").each(function(index,ele){
					if($(ele).html() == _this.nowValue+1){
						$(".container ul li").eq(index).addClass("checkState");
					}
				});
			};
			
		}else{
			$(".container ul li").eq(this.showCount-1).addClass("checkState");
		}
		
		$(".showNum span:first-child").html(this.nowValue+1); //显示页码
		
	}
}

new ChangeDiv(12);