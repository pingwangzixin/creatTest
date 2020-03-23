<template>
	<div class="">
		<!--进度条-->
		<div class="g_process">
		    <ul class="clearfix">
		        <li :class="{active : nav >= 1}">
		            <span >
		                <strong>1</strong>
		            </span>
		            <b>录入题目</b>
		        </li>
		        <li :class="{active : nav >= 2}">
		            <span >
		                <strong>2</strong>
		            </span>
		            <b>完善卷面</b>
		        </li>
		        <li :class="{active : nav >= 3}">
		            <span >
		                <strong>3</strong>
		            </span >
		            <b>设置答案</b>
		        </li>
		        <!--<li :class="{active : nav >= 4}">
		            <span >
		                <strong>4</strong>
		            </span >
		            <b>添加知识点</b>
		        </li>-->
		        <!-- <li :class="{active : nav >= 4}">
		            <span >
		                <strong>4</strong>
		            </span>
		            <b>设置答题卡</b>
		        </li> -->
		        <!-- <li :class="{active : nav >= 5}">
		            <span>
		                <strong>5</strong>
		            </span>
		            <b>完成设置</b>
		        </li> -->
		    </ul>
		</div>
		
		<!--视图-->
		<router-view></router-view>
	</div>
	
	
</template>
<script>
export default {
	name:"process",
	data () {
		return {
			nav:null
		}
	},
	methods: {
		// 根据路径判断进度条位置
		judge(url,state){
			if(url == "/index/testPaper/process/uploadFile"){
				this.nav = 1;
				//
			}else if(url == "/index/testPaper/process/examPaperEdit" && state == 'editVolume'){
				this.nav = 2;
			}else if(url == "/index/testPaper/process/setAnswer" || (url == "/index/testPaper/process/examPaperEdit" && state == 'knowledgePoint')){
				this.nav = 3;
			}/*else if(url == "/index/testPaper/process/examPaperEdit" && state == 'knowledgePoint'){
				this.nav = 4;
			}*/
		},
	},
	watch: {
		$route(nval,oval){
			//
			this.judge(nval.path,nval.query.pageOperation);
		}
	},
	created () {
//		/
		console.log(this.$route.query.pageOperation)
		this.judge(this.$route.path,this.$route.query.pageOperation);
	}
}
</script>

<style >
	
</style>