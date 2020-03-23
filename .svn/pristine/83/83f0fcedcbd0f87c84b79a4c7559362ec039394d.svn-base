<template>
	<div class="" style="">
		<input type="file" @change="selectFile($event)" ref="myupload">
		<!--<input type="file" @change="selectFile($event)">-->
		<p ref="mm">{{}}</p>
		
	</div>
</template>

<script>
	/*import axios from 'axios';
	console.log(axios)*/
	/*import axios from 'axios';
	Vue.prototype.$axios = axios;*/
//	var uploadAxios = axios.create({}),
//	Vue.prototype.$uploadAxios = uploadAxios;  
//console.log(Vue.$http)
import {wordRelevant} from '@/api'
	
export default {
	name : 'upload2',
	//变量
	data() {
		return {
			//文件
			file : '',
		}
	},
	//函数
	methods: {
		fn (){
//			console.log(Vue)
//			console.log(this.$http('http://198.9.3.137:8080/examPaper/upload'))
			
		},
		//选择文件
		selectFile (e){
//			console.log(e);
			let file = this.$refs.myupload.files[0];
			let formData = new window.FormData();
	        formData.append('file', file);
	        
			/*this.$http({
				method : 'post',
//				url : 'http://198.9.3.137:8080/examPaper/upload',
				url : 'http://198.9.6.137:8080/examPaper/paper/upload',
	//			data : data
//				params : formData,
				data : formData,
				headers:{'Content-Type':'multipart/form-data'}
			}).then(function (d){
				console.log(d.data.data.content)
			}).catch(function (e){
				console.log(e)
				
			});*/
			wordRelevant.wordData(formData).then( res =>{
				console.log(res.data.data)
			}).catch( e => {
				
			})
			
			/*let formData = new FormData();
	        formData.append('file', e.target.files[0]);
	        let url = this.$store.state.path + "api/tools/handle_upload_file";
	        let config = {
	          headers:{'Content-Type':'multipart/form-data'}
	        };
	        this.$http.post(url,formData, config).then(function (response) {
	          console.log(response.data)
	
	        })*/
		},
		//提交
		submitFile (event){
			console.log(event)
			event.preventDefault();
	    	var formData = new FormData(); 
	       	formData.append("file", this.file);   // 添加键值对到formData, 用append()方法添加方式;
	       	formData.append('myname', 'rmy');
	
	      // 上传文件不用设置请求头, 浏览器会自动设置请求头和boundary
	       	this.$uploadAxios.post('url', formData).then(res=>{ 
	            console.log(res)
	       	}).catch(err => {
	           console.log(err);
	       	})
		}
	},
	//结构加载之后
	mounted() {
　　　
	},
	//架构加载之前
	created() {
		this.fn();
	},
	components: {
//　　		VueUeditorWrap 	
　　}
}
</script>

<style>
</style>