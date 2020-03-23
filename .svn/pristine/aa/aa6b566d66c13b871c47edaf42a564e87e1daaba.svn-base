<template>
	<div class="">
		<div class="g_border zy_cover">
            <div class="zy_paper_main zy_paper_title" v-if="!isShow">
            	<div class="tit clearfix" >
                    <span class="fl baocun">试题内容</span>
                    <ul class="fr">
                        <li class="open_analysis j_open_analysis" @click="analysis">
                        	<i class="iconfont iconjinggao1"></i>
                        	解析说明
                        </li>
                    </ul>
                </div>
                <div class="upload_box" >
                	<div class="upload">
                		<p v-show="fileName != ''">{{fileName}}</p>
						<p v-show="fileName == ''">
							<label for="upload_file" >上传文件</label>
							<input type="file" name="" id="upload_file" value="" ref="myupload"  v-show="fileName == ''" @change="selectFile($event)" />
							或
							<span class="WordPaste" @click="WordPaste">Word粘贴</span>
						</p>
                	</div>
                </div>
        	</div>
			<div v-if="isShow">
				<p class="fanhui" @click="WordPaste">返回上传文件</p>
				<vue-ueditor-wrap :config="myConfig" v-model="Wordfile"></vue-ueditor-wrap>
			</div>
            <div class="zy_paper_title_btn">
            	<div class="btn_group">
	                <button class="cancle" @click="returnList()">取消并返回列表</button>
	                <button class="middle" @click="manualAddition()">跳过，手动添加</button>
	                <button class="sure" @click="startParsing()">开始解析</button>
	            </div>
            </div>
    	</div>
		<div class="prompt_box" v-if="isAnalysis">	
			<div class="hide"></div>
			<div class="con explain">
					<div class="header clearfix">
						<span class="fl">解析说明</span>
						<i class="iconfont iconguanbi1 fr" @click="analysis"></i>
					</div>
					<div class="main">
					<div class="structure">
					<p><span>系统会将录入的内容解析成大题、题目、题目组、答案、解析等试题结构</span></p>
					<p><span>大题</span>:以中文数字加标点符号（如：一、选择题）开头的，将会被解析成大题；</p>
					<p><span>题目</span>：以阿拉伯数字加标点符号（如：1、）开头的，将被解析成题目；</p>
					<p><span>完形填空、阅读理解</span>：以阿拉伯数字加符号（如：1、）开头的，之后小题为由阿拉伯数字加右括号
	（如：1））开头的，将被解析成完形填空或阅读理解内小题；</p>
					<p><span>题目组</span>：若干单题使用同一个公共的题干形成一个题目的组合，称之为题目组。</p>
					<p><span>答案</span>：以【答案】（如：【答案】AB）开头的，将会被解析成答案；</p>
					<p><span>解析</span>：以【解析】（如：【解析】根据公式XXX，该题选C）开头的，将会被解析成解析；</p>
					</div>
					<div class="example">
						<p>示例</p>
						<div class="content">
							<p><span>二、阅读与赏析(共42分)</span></p>
							<h3>(一)12分</h3>
							<h3>我是题目组的公共题干内容</h3>
							<p><span>8、</span>我是第8题的题干内容</p>
							<p>【答案】对</p>
							<p><span>8、</span>我是第8题的题干内容</p>
							<p>我是第8题内的小题</p>
							<p><span>9、</span>我是第9题的题干内容</p>
							<p>【答案】F</p>
							<p><span>10、</span>我是第10题的题干内容</p>
							<p>【解析】我是第10题的解析内容 </p>
						</div>
					</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
//接口汇总
import {wordRelevant} from '@/api'
import VueUeditorWrap from "vue-ueditor-wrap";
import '../../../../static/ueditor/ueditor.config.js';
import '../../../../static/ueditor/ueditor.all.js';
export default {
	name : 'uploadFile',
	data() {
		return {
			isAnalysis:false,
			//试卷id
			paperResId : JSON.parse(sessionStorage.getItem('examInfo')).id,
			//选择文件名
			fileName : '',
			//上传的文件
			formData : null,
			//编辑器隐藏显示
			isShow:false,
			Wordfile:"",
			//编辑器
			myConfig: {
	            // 如果需要上传功能,找后端小伙伴要服务器接口地址
	            // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
	            // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
	            // 你的UEditor资源存放的路径,相对于打包后的index.html
	            UEDITOR_HOME_URL: "/static/ueditor/",
	            // 编辑器不自动被内容撑高
	            autoHeightEnabled: true,
	            // 工具栏是否可以浮动
	            autoFloatEnabled: false,
	            // 初始容器高度
	            initialFrameHeight: 250,
	            // 初始容器宽度
//	            initialFrameWidth: 500,
	            // 关闭自动保存
	            enableAutoSave: true
	        }
		}
	},
	//函数
　　methods : {
		// 展开解析说明
		analysis(){
			this.isAnalysis = !this.isAnalysis;
		},
		//开始解析
		/*startParsing (){
			this.$router.push({
                path : '/index/process/examPaperEdit',
                query : {
					pageState : "new"	//新建页面
                }
           	});
		}*/
		WordPaste(){
			this.isShow = !this.isShow;
		},
		//上传文件
		selectFile (){
			let file = this.$refs.myupload.files[0];
			let formData = new window.FormData();
	        formData.append('file', file);
//	        formData.append('id', '259368646f414f15826a4325306da70b');
	        formData.append('id', this.paperResId);
	        this.formData = formData;
			console.log(this.paperResId)
			console.log(this.formData)
			this.fileName = file.name;
		},
		//判断是否有未上传图片
		findWordImg (){
//			console.log(this.$children[0].editor.body.innerHTML)
//	    	var arg = UE.getEditor('editor').getContent();
	    	var arg = this.$children[0].editor.body.innerHTML;
	    	var objE = document.createElement("div");
	    	objE.innerHTML = arg;
	    	var imgs = objE.getElementsByTagName('img');
	    	for(var i=0; i < imgs.length; i++){
	   			if(imgs[i].getAttribute('word_img')){
	   				return true;
	   			}
	    	}
	    	return false;
	   },
		//开始解析
		startParsing (){
			// 粘贴的时候
			if(this.isShow){
				// this.$parent.$parent.speedProgressFn(0,100)
//				console.log(this.Wordfile)
				if(this.Wordfile == ""){
					this.$parent.$parent.timingFn("warning","请粘贴");
				}else{
					console.log(this.findWordImg ())
					if(this.findWordImg ()){
						this.$parent.$parent.timingFn("warning","请上传图片");
					}else{
						this.$parent.$parent.speedProgressFn(0,100);
						let params = new URLSearchParams();
						params.append("uid",this.paperResId);
						params.append("arr",this.Wordfile);
						//{"uid": this.paperResId,"arr":this.Wordfile}
						wordRelevant.pasteData(params).then( res =>{
							console.log(res)
							this.$parent.$parent.speedProgressFn(100,5);
							sessionStorage.setItem("newPaperMsg",res.data.data.content);
							setTimeout(() => {
								this.$router.push({
									path : '/index/testPaper/process/examPaperEdit',
									query : {
										pageState : "new",	//新建页面
										step : 1,	
										pageOperation : "editVolume"  //编辑卷面editVolume  添加知识点knowledgePoint
									}
								});
							}, 1000);
						}).catch( e => {
								
						});
					}
				}
			}else{
				if(this.fileName == ""){
					this.$parent.$parent.timingFn("warning","请选择上传文件");
				}else{
					this.$parent.$parent.speedProgressFn(0,100);
					wordRelevant.wordData(this.formData).then( res =>{
						console.log(res)
						this.$parent.$parent.speedProgressFn(100,5);
		//				this.dataObj = res.data.data.content;
		//				//console.log(res.data.data.content)
		//				res.data.data.content = '<div id="dd">' + res.data.data.content + '</div>';
		//				this.allData.analysisData = this.parsingDocuments(res.data.data.content);
						sessionStorage.setItem("newPaperMsg",res.data.data.content);
						setTimeout(() => {
							this.$router.push({
								path : '/index/testPaper/process/examPaperEdit',
								query : {
									pageState : "new",	//新建页面
									step : 1,			
									pageOperation : "editVolume"	//编辑卷面editVolume  添加知识点knowledgePoint
			//						paperResId : this.paperResId,	//页面id	
			//						headInfo : this.$route.query.headInfo  //考试信息相关
								}
							});
						}, 1000);
					}).catch( e => {
						
					});
				}
				
			}
			
		},
		//取消并返回列表
		returnList (){
			this.$router.push({
                path : '/index/testPaper/testList',
                query : {}
           	});
		},
		//跳过/手动添加
		manualAddition (){
			this.$router.push({
                path : '/index/testPaper/process/examPaperEdit',
                query : {
                	pageState : "new",	//新建页面
					step : 1,			
					pageOperation : "editVolume"	//编辑卷面editVolume  添加知识点knowledgePoint
                }
           	});
		}
	},
	//结构加载之后
	mounted() {
		
	},
	//架构加载之前
	created() {
//		console.log(this.$route.query.paperResId)
	},
	components: {
		VueUeditorWrap
　　}

}
</script>

<style scoped>
	.fanhui{
		padding: 10px 0 ;
		cursor: pointer;
	}
	.WordPaste{
		cursor: pointer;
	}
	.prompt_box .explain{
		width: 800px;
		height: 600px;
	}
	.prompt_box .explain .header{
		width: 800px;
		height: 46px;
		background-color: #f4fbff;
		border-radius: 4px 4px 0px 0px;
		padding: 0 16px 0;
		box-sizing: border-box;
		text-align: left;
		line-height: 46px;
		border-bottom: 1px solid  #dddddd; 
	}
	.prompt_box .explain .header span{
		font-size: 16px;
		letter-spacing: 3px;
		color: #5093e1;
	}
	.prompt_box .explain .header .iconfont{
		cursor: pointer;
	}
	.prompt_box .explain .main{
		width: 800px;
		height: 554px;
		overflow: auto;
	}
	.prompt_box .explain .main .structure{
		width: 713px;
		margin: 20px auto;
		text-align: left;
		line-height: 30px;
	}
	.prompt_box .explain .main .structure p{
		font-size: 14px;
		font-weight: normal;
		letter-spacing: 2px;
		color: #333333;
	}
	.prompt_box .explain .main .structure p span{
		font-weight:700;
	}
	.prompt_box .explain .main .example>p:nth-child(1){
		width: 713px;
		margin: 20px auto;
		font-size: 14px;
		letter-spacing: 2px;
		color: #5093e1;
		text-align: left;
	}
	.prompt_box .explain .main .example .content{
		width: 742px;
		height: 406px;
		box-sizing: border-box;
		padding: 10px  20px;
		background-color: #f1f1f1;
		margin: 20px auto;	
		text-align: left;
		font-size: 14px;
		line-height: 30px;
		letter-spacing: 2px;
		color: #333333;
	}
	.prompt_box .explain .main .example .content h3{
		text-align: center;
		font-weight: 700;
	}
	.prompt_box .explain .main .example .content span{
		font-weight: 700;
	}
</style>