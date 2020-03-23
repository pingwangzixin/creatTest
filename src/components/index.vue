<template>
	<div class="">
		<!--头部-->	
		<div class="g_header">
		    <div class="nav clearfix">
		        <div class="logo_group fl">
		            <!--<img src="../assets/img/jetsen_logo.png" alt="" srcset="">
		            <img src="../assets/img/jetsen_logo_platform.png" alt="" srcset="">-->
		        </div>
		        <p class="fl">考试中心</p>
		        <ul class="fl">
		            <li class="fl" v-for="(item,index) in globalParam.nav" :class="{'active': item.active}" :key="index"> <router-link :to="item.defaultUrl">{{item.name}}</router-link></li>
		           
		            <!--<router-link v-for="(item,index) in globalParam.nav" :to="{path:'/registrationForm', query: {}"><li :class="{'active': item.active}">{{item.name}}</li></router-link>-->
		        </ul>
		        <div class="user_info fr">
		            <span>示例教师</span>
		            <b>[已登录]</b>
		        </div>
		    </div>
		</div>
		
		<!--视图-->
		<router-view :class="{g_main : globalParam.mainWidth}"></router-view>
		
		<!--底部-->
		<div class="g_footer">
		    <ul class="foot">
		        <!--<li>
		            <span>主办：北京捷成世纪科技股份有限公司</span>
		            <span>承办：北京捷成世纪科技股份有限公司</span>
		            <span>技术支持：北京捷成世纪科技股份有限公司</span>
		        </li>
		        <li>Copyright©2013-2017jetsen.com.cn All Rights Reserved</li>
		        <li><img src="../assets/img/footer_logo.png" alt=""></li>-->
		    </ul>
		</div>
		
		<input type="hidden" v-model="extendsBizId">

		<div class="g_prompt prompt">
		    <!--
		        prompt_box public_box : 公共类名 禁止删除
		        j_ : js专用类名前缀，勿占用
		    -->
		    <!--等待遮罩-->
		    <div class="prompt_box public_box waiting_box" v-show="promptData.loadingBox.load">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="main_cont">
		                <img src="../assets/img/loading.gif"/>
		                <p>数据加载中...</p>
		            </div>
		        </div>
		    </div>
		    
		    
		    <!--确认删除框-->
		    <div class="prompt_box public_box confirm_box j_confirm_box" v-show="promptData.confirmBox.open">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="tit">
		                <span>提示</span>
		            </div>
		            <div class="main_cont">
		                <i class="iconfont iconjinggao1 warning"></i>
		                <!--<p>{{promptData.confirmBox.tipWord}}</p>-->
		                <p v-html="promptData.confirmBox.tipWord"></p>
		            </div>
		            <div class="btn_group">
		                <button class="sure">确认</button>
		                <button class="cancel">取消</button>
		            </div>
		        </div>
		    </div>
		    
		    <!--定时提示框-->
		    <div class="prompt_box public_box timing_box" v-show="promptData.timingBox.open">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="main_cont">
		                <i class="iconfont iconduihao2 success" v-show="promptData.timingBox.type == 'success'"></i>
		                <i class="iconfont iconjinggao1 warning" v-show="promptData.timingBox.type == 'warning'"></i>
		                <i class="iconfont iconcuowu fail" v-show="promptData.timingBox.type == 'fail'"></i>
		                <p>{{promptData.timingBox.tipWord}}</p>
		            </div>
		        </div>
		    </div>
		    
		    <!--进度提示框-->
		    <div class="prompt_box public_box speed_progress_box" v-show="promptData.speedProgressBox.open">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="speed">
		               <p ref="percent"></p>
		            </div>
		            <p>{{promptData.speedProgressBox.percent}}%</p>
		        </div>
		    </div>

			<!-- 习题栏 -->
			<div class="prompt_box public_box exercise_bar_box" v-show="promptData.exerciseBarBox.open">	
		        <div class="hide"></div>
		        <div class="con1">
					<div class="content">
						<h3 class="clearfix">
							<span class="fl">习题栏({{$store.state.arr.length}}题)</span>
							<i @click="exerciseBar"  class="iconfont iconguanbi1 fr"></i>
						</h3> 
						<ul>
							<li v-for="(item,index) in $store.state.arr" :key="index" class="clearfix">
								<span class="fl" v-if="promptData.exerciseBarBox.cecklistState">
									<input type="checkbox" name="" id="" value="" :checked="item.checked" @click="exercisesChecked(index)" />
								</span>
								<p class="fl">{{index+1}}、<span v-html="item.body"></span></p>
								<i @click="addTopic(item)" class="iconfont iconguanbi1 fr"></i>
							</li>
						</ul>
					</div>
					<div class="footer_all_check clearfix" v-if="promptData.exerciseBarBox.cecklistState">
						<label for="checkedAll fl">
							<input type="checkbox" name="" id="checkedAll" value="" v-model="promptData.exerciseBarBox.checkedAllBtn" @click="exercisesCheckedAll()" />
							全选
						</label>
						<div class="fr">
							已选：<span v-text="promptData.exerciseBarBox.checkedNum"></span> 题
							<button @click="addQuestion()">添加</button>
						</div>
					</div>
					<!--<div class="footer">
						<button>去组卷</button>
					</div>-->
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'

export default    {                                                                                                                                                                                                                        
	name : 'examPaperEdit',
	data() {
		return {
			extendsBizId:null,
			globalParam : {
				mainWidth : true,	//答题卡页面false
				nav : [
					{name:'组卷',url:'/index/testPaper',active:true,defaultUrl:'/index/testPaper/testList'},
					{name:'阅卷',url:'/index/readPaper',active:false,defaultUrl:'/index/readPaper/markingNav'},
					{name:'卷库',url:'/index/questionBank',active:false,defaultUrl:'/index/questionBank/questionlist'}
				],
			},
			//弹框类数据
    		promptData : {
    			//定时提示框
				timingBox : {
					open : false,
					type : '',
					tipWord : ''
				},
				//确认框
				confirmBox : {
					open : false,
					tipWord : '',
					callBack : null
				},
				//等待加载框
				loadingBox : {
					load : false,
					tipWord : ''
				},
				//进度提示框
				speedProgressBox : {
					open:false,
					percent:0
				},
				//习题栏
				exerciseBarBox:{
					open:false,
					exercisesArr : [],	//习题
					checkedAllBtn : false,	//全选按钮
					checkedNum : 0,		//已选数量
					cecklistState : false,	//checkbox
				}
            }
		}
	},
	//函数
  　　methods: {
		/*
	     * 提示框1.5ms
	     * @param  {string} type  提示图片  success/fail/warning
		 * @param  {string} tipWord 提示框文字
		 */
    	timingFn (type,tipWord){
			this.promptData.timingBox.open = true;
			this.promptData.timingBox.type = type;
			this.promptData.timingBox.tipWord = tipWord;
			let _this = this;
			setTimeout(function (){
				_this.promptData.timingBox.open = false;
			},1500);
		},
		/* 
	     * 确认框
	     * @param  {string} tipWord 提示框文字
	     * @param  {function}  callback  回调函数
	     */
	    confirmFn (tipWord,callback){
	    	console.log(tipWord)
	    	console.log(callback)
			this.promptData.confirmBox.open = true;
			this.promptData.confirmBox.tipWord = tipWord;
			let _this = this;
			$('.j_confirm_box .btn_group button').off('click').on('click',function(){
	            _this.promptData.confirmBox.open = false;
				callback($(this).attr('class'));
	        });
	    },
	   	/* 
	     * 加载框
	     * @param  {boolean}  load  成功/失败 true/false
	     * @param  {string}  tipWord  提示文字
	     */
	    loadingFn (load,tipWord){
			this.promptData.loadingBox.load = load;
		},
		/* 
	     * 进度框
	     * @percent  {number}  percent  进度(%)
	     * @speed  {number}  speed  速度/时间(ms)
	     */
		speedProgressFn(percent,speed){
			this.promptData.speedProgressBox.open = true;
			let period = speed ||  20;
			if(percent == 100){
				let progress  = setInterval(() => {
					this.promptData.speedProgressBox.percent += 1;
					this.$refs.percent.style.width = this.promptData.speedProgressBox.percent + "%";
					if(this.promptData.speedProgressBox.percent >= 99){
						clearInterval(progress);
						setTimeout(() => {
							this.promptData.speedProgressBox.open = false;
						}, 500);
					}
				}, period);
			}else{
				this.promptData.speedProgressBox.percent = percent;
				let progress  = setInterval(() => {
					this.promptData.speedProgressBox.percent += 1;
					this.$refs.percent.style.width = this.promptData.speedProgressBox.percent + "%";
					if(this.promptData.speedProgressBox.percent >= 99){
						clearInterval(progress)
					}
				}, period);
			}
			
		},
		// 习题栏展示
		exerciseBar(){
			this.promptData.exerciseBarBox.open = !this.promptData.exerciseBarBox.open;
			console.log(this.$store.state.arr);
		},
		// 习题栏删除题
		addTopic(item){
			console.log(item)
            this.$store.dispatch("requestAddObj",{userId:1,questionId:item.questionId,questionTypeId:item.type,levelId:item.levelId,subjectId:item.subjectId});
        },
        isChecked(arr){
        	console.log(arr)
//      	return arr.filter(arr.checked == true || arr.checked == 1).length;
        },
        // 习题栏全选反选反全选
        exercisesCheckedAll (){
//      	this.promptData.exerciseBarBox.checkedAllBtn = !this.promptData.exerciseBarBox.checkedAllBtn;
			this.$store.state.arr.forEach((e,i) => {
				e.checked = !this.promptData.exerciseBarBox.checkedAllBtn;
			});
			this.promptData.exerciseBarBox.checkedNum = this.promptData.exerciseBarBox.checkedAllBtn == false ? this.$store.state.arr.length : 0;
        },
        // 习题栏多选
        exercisesChecked (i){
        	this.$store.state.arr[i].checked = !this.$store.state.arr[i].checked;
        	this.promptData.exerciseBarBox.checkedAllBtn = this.$store.state.arr.every((e,i) => {
        		return e.checked == true || e.checked == 1;
        	});
			this.promptData.exerciseBarBox.checkedNum = this.$store.state.arr.filter((e,i) => {
				return (e.checked == true || e.checked == 1);
			}).length;
        },
        // 习题栏添加按钮
        addQuestion (){
//      	console.log(this.$refs)
//      	console.log(this.$children)
//      	this.$refs.gggg.zzz();
//			this.$root.$emit('message','aaa')
			//发送子级页面
			this.$root.$emit('addBigQues');
			this.promptData.exerciseBarBox.open = false;
			this.$store.state.arr.forEach((e,i) => {
				e.checked = false;
			});
        },
		//flash检测
		flashChecker() {
		    var hasFlash = 0;　　　　 //是否安装了flash
		    var flashVersion = 0;　　 //flash版本
		    if(document.all) {
		        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		        if(swf) {
		            hasFlash = 1;
		            VSwf = swf.GetVariable("$version");
		            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
		        }
		    } else {
		        if(navigator.plugins && navigator.plugins.length > 0) {
		            var swf = navigator.plugins["Shockwave Flash"];
		            if(swf) {
		                hasFlash = 1;
		                var words = swf.description.split(" ");
		                for(var i = 0; i < words.length; ++i) {
		                    if(isNaN(parseInt(words[i]))){
		                        continue;
		                    }
		                    flashVersion = parseInt(words[i]);
		                }
		            }
		        }
		    }
		    return {
		        f: hasFlash,
		        v: flashVersion
		    };
		}
	},
	//结构加载之后
	mounted() {
		// this.speedProgressFn();
		//flash检测
		let fls = this.flashChecker();
		let message = "Adobe Flash Player未安装、版本低或被屏蔽,点击<a href='https://www.flash.cn/help/index' target='_blank'>帮助</a>查询解决办法，如已安装且未屏蔽请点击<a href='http://www.adobe.com/go/getflashplayer' id='start_flash' rel='nofollow' target='_blank' title='升级Flash插件'>启用flash</a>";
		if(!fls.f){
//			alert()
			this.confirmFn(message, (state) => {
				/*if(state == 'sure'){	
					this.timingFn('success','3');
				}*/
			});
		};
	},
	watch : {
		//监听路由
		$route(to,from){
			let _this = this;
			this.globalParam.mainWidth = to.path == '/index/testPaper/process/answerCard' ? false : true;
			this.promptData.exerciseBarBox.cecklistState = this.$route.path == ('/index/questionBank/questionlist' || '/index/questionBank/examinationDetails') ? false : true;
			//导航
			this.globalParam.nav.forEach(function (e,i){
				e.active = false;
				if(_this.$route.path.indexOf(e.url) != -1){
					e.active = true;
				}
			});
			if(sessionStorage.examInfo){
				this.extendsBizId = JSON.parse(sessionStorage.examInfo).id;
			}
		},
		
	},
	//架构加载之前
	created() {
		//cecklistState
//		console.log(this.$router)
//		console.log(this.$route.path)
		if(sessionStorage.examInfo){
			this.extendsBizId = JSON.parse(sessionStorage.examInfo).id;
		}
		let _this = this;
		//答题卡页面宽度大于主架构宽度
		this.globalParam.mainWidth = this.$route.path == '/index/testPaper/process/answerCard' ? false : true;
		//导航
		this.globalParam.nav.forEach(function (e,i){
			e.active = false;
			if(_this.$route.path.indexOf(e.url) != -1){
				e.active = true;
			}
		});
//		this.$store.dispatch("requestViewTitle");
	},
	components: {
		
	}
}
</script>

<style>
	
</style>