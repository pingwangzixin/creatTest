<template>
	<div class="">
		<!--<div id="editor" style="width: 200px; height: 200px;"></div>-->
		<!--<vue-ueditor-wrap :config="myConfig"  v-model="item"></vue-ueditor-wrap>-->
		<input type="file" @change="selectFile($event)" ref="myupload">
		<br />
		<button @click="submitData()">提交提交提交</button>
		<div class="g_border">
            <div class="zy_paper_main">
                <div class="tit clearfix">
                    <span class="fl baocun">试题内容</span>
                    <ul class="fr">
                        <li class="add_question_btn j_add_big_question">添加大题</li>
                        <li>补录题干/解析</li>
                        <li @click="titleSwitching(allData.pageRelated.titleNaturalOrder = !allData.pageRelated.titleNaturalOrder)">题号模式</li>
                        <li class="open_analysis j_open_analysis">展开解析</li>
                    </ul>
                </div>
                <ul class="task_list j_task_list">
                    <li class="big_question_list" v-for="(bigI,index) in allData.analysisData" :key="index">
                        <div class="head j_head clearfix" @mouseover="headlineIn(bigI)" @mouseout="headlineOut(bigI)">
                            <b class="tit_num fl" v-text="bigI.headlineTitNo + '、'"></b> 
                            <div class="tit_cont fl" v-text="bigI.topicNumber" v-show="!bigI.headlineState"></div>
                            <div class="edit_big_tit fl clearfix" v-show="bigI.headlineState">
                                <textarea name="" id="" class="fl" v-model="bigI.topicNumberCopy"></textarea>
                                <div class="btn_group fl">
                                    <button class="sure j_sure" @click="headlineSure(bigI)">确认</button>
                                    <button class="cancel j_cancel" @click="headlineCancel(bigI)">取消</button>
                                </div>
                            </div>
                            <span class="btn" v-show="bigI.headlineOperation">
                                <b class="btn_">取消选择</b>
                                <b class="btn_edit j_btn_edit" @click="headlineEdit(bigI)">编辑名称</b>
                                <b class="btn_add">添加小题</b>
                                <b class="btn_sort">设置起始题号</b>
                                <b class="btn_move">移动</b>
                                <b class="btn_split">拆分</b>
                                <b class="btn_delete">删除</b>
                            </span> 
                        </div>
                        <ul class="cont">
                            <li class="clearfix group j_group" :class="{active : groupI.groupBorder}" v-for="(groupI,groupIndex) in bigI.SmallTitle" @mouseover="groupIn(groupI)" @mouseout="groupOut(groupI)" :key="groupIndex">
                                <div class="group_head j_group_head" v-if="groupI.group != ''" @mouseover="groupTitIn(groupI)" @mouseout="groupTitOut(groupI)">
                                    <span class="btn" v-show="groupI.groupbtnOperation">
                                        <b class="btn_edit j_btn_edit" @click="groupTitEdit(groupI)">编辑</b>
                                        <b class="btn_split j_btn_split">拆分</b>
                                        <b class="btn_delete j_btn_delete" @click="groupTitDelete(groupI,index,groupIndex,)">删除</b>
                                    </span> 
                                    <span class="btn fr" v-show="groupI.groupbtnConfirm">
                                        <b class="btn_sure j_btn_sure" ref="dataNum" @click="groupTitSure(groupI)">确认</b>
                                        <b class="btn_cancel j_btn_cancel"  @click="groupTitCancel(groupI)">取消</b>
                                    </span>
                                    <div class="tit_cont" v-html="groupI.group" v-show="!groupI.groupState"></div>
                                     <vue-ueditor-wrap class="editor_unified" :config="myConfig" v-model="groupI.groupCopy" v-show="groupI.groupState"></vue-ueditor-wrap>
                                </div>
                                <div class="question j_question" v-for="(quesI,quesIndex) in groupI.content" @mouseover="smallIn(quesI)" @mouseout="smallOut(quesI)" :key="quesIndex">
                                    <span class="btn fr" v-show="quesI.btnOperation">
                                        <b class="btn_edit j_btn_edit" @click="smallEdit(quesI)">编辑</b>
                                        <b class="btn_move j_btn_move">移动</b>
                                        <b class="btn_merge_group j_btn_merge_group" v-if="groupI.group == '' && groupIndex > 0">与上题合并为题目组</b>
                                        <b class="btn_merge j_btn_merge" v-if="groupI.group != ''">移出题目组</b>
                                        <b class="btn_merge j_btn_merge" v-if="index > 0">与上题合并</b>
                                        <b class="btn_split j_btn_split" @click="smallSplit(quesI,quesIndex)">拆分</b>
                                        <b class="btn_delete j_btn_delete" @click="smallDelete(quesI,index,groupIndex,quesIndex)">删除</b>
                                    </span>
                                    <span class="btn fr" v-show="quesI.btnConfirm">
                                        <b class="btn_sure j_btn_sure" @click="smallSure(quesI)">确认</b>
                                        <b class="btn_cancel j_btn_cancel" @click="smallCancel(quesI)">取消</b>
                                    </span>
                                    <div class="question_option">
                                        <div class="question_type clearfix">
	                                            <b class="fl tit_num" v-text="quesI.titNo">1</b> 
                                            <select class="fl" name="" v-model="quesI.quzType" @change="smallType(quesI,quesI.quzType)">
                                                <option value="">请选择题型</option>
                                                <option v-for="(i,typeIndex) in questionType.type" v-bind:value="i.value" v-text="i.name" :key="typeIndex"></option>
                                            </select> 
                                            <div class="question_template fl">
                                            	<!--单选-->
                                                <div class="all_tem single clearfix" v-if="quesI.quzType == 2">
                                                	<span class="fl">答案</span>
                                                    <ul class="fl">
                                                        <li :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" :key="optionIndex" @click="smallSingleChoose(quesI.quzSection,i)"></li>
                                                        <li class="option_btn fl">
                                                            <i class="iconfont iconjia" @click="smallAddOption(quesI.quzSection)"></i>
                                            				<i class="iconfont iconjianshao" @click="smallReduceOption(quesI.quzSection)"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!--复选-->
                                                <div class="all_tem multiple clearfix" v-if="quesI.quzType == 4">
                                                	<span class="fl">答案</span>
                                                    <ul class="fl">
                                                        <li :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" :key="optionIndex" @click="smallcheckChoose(i)">A</li>
                                                        <li class="option_btn fl">
                                                            <i class="iconfont iconjia" @click="smallAddOption(quesI.quzSection)"></i>
                                            				<i class="iconfont iconjianshao" @click="smallReduceOption(quesI.quzSection)"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!--判断-->
                                                <div class="all_tem judge clearfix" v-if="quesI.quzType == 1">
                                                	<span class="fl">答案</span>
                                                    <ul class="fl">           
                                                        <li :class="{active : quesI.questionContent[0][2] == '正确'}" @click="smallJudge(quesI.questionContent[0],'正确')">对</li>
                                                        <li :class="{active : quesI.questionContent[0][2] == '错误'}" @click="smallJudge(quesI.questionContent[0],'错误')">错</li>
                                                    </ul>
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="qusetion_main">
                                        <div class="normal_state" v-show="!quesI.state">
                                        	<!--{{quesI}}-->
                                            <!--<div class="echo_content stem_cont"></div>-->
                                            <div class="echo_content stem_cont" v-html="quesI.questionContent[0][0]"></div>
                                            <!--判断1 单选2 多选4-->
                                            <div class="analysis_answer answer_cont clearfix" v-if="quesI.quzType != 1 && quesI.quzType != 2 && quesI.quzType != 4">
                                            	<span class="fl">答案：</span>
                                                <div class="echo_content fl" v-html="quesI.questionContent[0][2]"></div>
                                            </div>
                                            <div class="analysis_answer analysis_cont clearfix">
                                                <span class="fl">解析：</span>
                                                <div class="echo_content fl" v-html="quesI.questionContent[0][1]"></div>
                                            </div>
                                        </div>
                                        <div class="edit_state" v-show="quesI.state" :class="{'active': quesI.split}">
                                            <div class="stem_cont">
                                                <!--<div class="editor_unified" id=""></div>-->
                                                <vue-ueditor-wrap class="editor_unified" :config="myConfig" v-model="quesI.questionContentCopy[0][0]"></vue-ueditor-wrap>
                                            </div>
                                            <div class="analysis_cont" v-show="!quesI.split">
                                                <span>解析：</span>
                                                <!--<div class="editor_unified" id=""></div>-->
                                                <vue-ueditor-wrap class="editor_unified" :config="myConfig" v-model="quesI.questionContentCopy[0][1]"></vue-ueditor-wrap>
                                            </div>
                                            <div class="answer_cont" v-if="quesI.quzType != 1 && quesI.quzType != 2 && quesI.quzType != 4" v-show="!quesI.split">
                                                <span>答案：</span>
                                                <!--<div class="editor_unified" id=""></div>-->
                                                <vue-ueditor-wrap class="editor_unified" :config="myConfig" v-model="quesI.questionContentCopy[0][2]"></vue-ueditor-wrap>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="img_zoom">
                                        <div class="img_zoom_btn clearfix">
                                            <b class="narrow fl">－</b>
                                            <b class="enlarge fl">＋</b>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li> 
                </ul>
            </div>

        </div>
		
	</div>
</template>

<script>
//import $ from 'jquery';
//文本编辑
import '../../../static/ueditor/ueditor.config.js';
import '../../../static/ueditor/ueditor.all.js';
//语言
import '../../../static/ueditor/lang/zh-cn/zh-cn.js';
//数学公式
import '../../../static/ueditor/kityformula-plugin/addKityFormulaDialog.js';
import '../../../static/ueditor/kityformula-plugin/getKfContent.js';
import '../../../static/ueditor/kityformula-plugin/defaultFilterFix.js';
//import {record} from '@/api'

//ueditor数据绑定
import VueUeditorWrap from "vue-ueditor-wrap";

//试卷静态数据
import questionTypeJson from '../../assets/json/data.json';
//import {dataObj} from '../../assets/json/dataObj.js';


import {wordRelevant} from '@/api'

export default {
	name : 'examPaperEdit',
	data() {
		return {
			//word格式文件
//			dataObj : dataObj,
			//所有数据提交用
			allData : {
				//头部筛选相关
				headInfo : {
					name : '今天语文',
					grade : '',
					subject : '',
					exam : ''
				},
				//页面相关
				pageRelated : {
					//题号模式：是否孜然顺序 true/false
					titleNaturalOrder : true,
					pageState : 'edit'
				},
				//word卷面相关
				//word解析之后数据
				analysisData : null
			},
			//大题序号
			questionOrder : ['一','二','三','四','五','六','七','八','九','十'],
			//题类型
			questionType : {
				type : [
						{'name' : '单选', 'value' : '2'},
						{'name' : '多选', 'value' : '4'},
						{'name' : '判断', 'value' : '1'},
						{'name' : '填空', 'value' : '3'},
						{'name' : '阅读理解', 'value' : '5'},
						{'name' : '简答', 'value' : '6'},
						{'name' : '完形填空', 'value' : '7'},
						{'name' : '材料', 'value' : '8'},
						{'name' : '综合', 'value' : '9'},
						{'name' : '证明', 'value' : '10'},
						{'name' : '画图', 'value' : '11'},
						{'name' : '自答', 'value' : '12'},
						{'name' : '解答', 'value' : '13'}
					],
				option : ['A','B','C','D','E','F','G','H','I','J']
			},
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
	            initialFrameHeight: 100,
	            // 初始容器宽度
//	            initialFrameWidth: 500,
	            // 关闭自动保存
	            enableAutoSave: true
	        }
		}
	},
	//函数
　　methods: {
		//上传
		selectFile (){
			let file = this.$refs.myupload.files[0];
			let formData = new window.FormData();
	        formData.append('file', file);
	        
			wordRelevant.wordData(formData).then( res =>{
				this.dataObj = res.data.data.content;
//				//console.log(res.data.data.content)
				res.data.data.content = '<div id="dd">' + res.data.data.content + '</div>';
				this.allData.analysisData = this.parsingDocuments(res.data.data.content);
			}).catch( e => {
				
			});
		},
		//解析word数据
		parsingDocuments (dataObj){
			//解析word数据
			function getJson(selectType, quzTypeTitle, callback) {
			    var typeName;
			    var type;
			    var capitalLetterArr = [];
				var lowercaseLetterArr = [];
			    $.ajax({
			        type: "get", //请求方式
			        url: "../../static/json/data.json", //地址，就是json文件的请求路径
			        async: false, //同步请求
			        dataType: "json", //数据类型可以为 text xml json  script  jsonp
			        success: function(data) { //返回的参数就是 action里面所有的有get和set方法的参数
			            if(selectType == "largeTitle") {
			                for(var i = 0; i < data.largeTitle.length; i++) {
			                    if(quzTypeTitle.indexOf(data.largeTitle[i].name) != -1) {
			                        typeName = data.largeTitle[i].name;
			                        type = data.largeTitle[i].type;
			                    }
			                }
			            } else if(selectType == "quzType") {
			                for(var i = 0; i < data.quzType.length; i++) {
			                    if(quzTypeTitle.indexOf(data.quzType[i].name) != -1) {
			                        type = data.quzType[i].type;
			                        typeName = data.quzType[i].name;
			                    }
			                }
			            }else if(selectType == "capitalLetter"){
			            	capitalLetterArr = data.capitalLetter;
			            }else if(selectType == "lowercaseLetters"){
			            	lowercaseLetterArr = data.lowercaseLetters;
			            }else if(selectType == "letter"){
			            	capitalLetterArr = data.capitalLetter;
			            	lowercaseLetterArr = data.lowercaseLetters;
			            }
			        }
			    });
			//  if(type != undefined) {
			        return {
			            typeName,
			            type,
			            capitalLetterArr,
			            lowercaseLetterArr
			        };
			//  }
			}
//			//console.log(dataObj)
			var v_this = this;
//			console.log(v_this.getJson)
			//用来匹配每道题开始的各种点
			var reg1 = /(<[^>]*>)(\d*\.?．?)(.*)/
			//匹配每道题开始的各种点，但是保留img标签，为了防止有的两位数题号之间有图片，保留下来,并去掉点之前的题号
			var reg2 = /(<[^>]*>)(<img[^>]*>)(\d*\.?．?)(.*)/
			//匹配到原定义的题有给的分数，将分数，括号，匹配
			var reg3 = /(<[^>]*>)([（(]\d*分[)）])(.*)/
			//匹配到原定义的题有给的分数，将分数，括号，匹配，保留img标签，防止中间有img标签
			var reg4 = /(<[^>]*>)(<img[^>]*>)([（(]\d*分[)）])(.*)/
			//用来匹配题号中间有空格，去掉空格
			var reg_null = /<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig;
			// 用来去大题题号
			var importSection = /(^\s*<p(?:\s+[^>]*)?>(?:<[^>]+>)*)\s*([〇一二三四五六七八九十]+)((?:<\/[^>]+>)*\s*(?:<[^>]+>)*)[，。；,\.．;、]/i;
			//删除ol和li标签，后台没有去除的原因因为ol自动排序题号，后台删除以后就没有题号进行区分
			var filter_p = /<p[^>]*>[^<]*<\/p>/g;
			var filter_li = /<li[^>]*>/g;
			var filter_li_end = /<\/li>/g;
			var filter_ol = /<\/?ol[^>]*>/g;
			//去掉特殊字符,过滤两个，一种是p标签里只有特殊字符，那么过滤掉标签和特殊字符，如果内容中有部分特殊字符，那么只过滤特殊字符
			var filter_special_font1 = /<p>&#xa0;<\/p>/g;
			var filter_special_font2 = /&#xa0;/g;
			//去空格
			var filter_space = /\s*/g;
			//数字正则
			var filter_number = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
			//字母正则
			var filter_letter= /^[A-Za-z]+$/;
			//	匹配img标签，给该标签加样式
			var regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", "gmi");
			var regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)", "gmi");
			//答案正则
			var answerSelect = /(?:^\s*<p(?:\s+[^>]*)?>(?:<[^>]+>)*\s*【\s*答案\s*】\s*)(?:(?:<\/[^>]+>)*\s*(?:<[^>]+>)*)([ＡＢＣＤＥＦａｂｃｄｅｆｇabcdefgABCDEFG])\s*(?:<\/[^>]+>)*<\/p>/i;
			var answerSelect2 = /(?:^\s*<p(?:\s+[^>]*)?>(?:<[^>]+>)*\s*【\s*答案\s*】\s*)/i;
			//解析正则
			var analysisSelect = /(?:^\s*<p(?:\s+[^>]*)?>(?:<[^>]+>)*\s*【\s*解析\s*】\s*)/i;
			//筛选选项
			var tilter_select = /([A-Z][:|：|、|.]+)*?(?!\1)(?=[A-Z]|)*/ig
			var htmlArr = [];
			// 最终集合
			var quzList = new Array(); //创建list集合
			
			//识别试题
			function clickMethod() {
				//获取选定区域的内容
//				var objF = $(v_this.dataObj);
				var objF = $(dataObj);
//				//console.log(objF)
				//查找是否有ol标签
				var myObj = objF.children();
//				var myObj = $(dataObj);
//				//console.log(myObj)
				var contentArr = [];
				//每一行的内容
				var lineContent;
				//li标签对象
				var li_Obj;
				//li标签内容
				var liContent;
				//技术规则
				var num = 0;
				//正文内容
				var textContent;
				//截取部分内容
				var strContent;
				//大题题号集合
				var largeArr = [];
				//小题号
				var subtitleArr = [];
				//ol标签类型
				var ol_type;
				//下标		
				var thisIndex;
				//字母数组
		 		var letterObj = [];
				//循环ol标签
				for (var i = 0; i < myObj.length; i++) {
					lineContent = myObj[i].outerHTML;
					//如果包含ol标签，那么进行循环去标签
					if(lineContent.indexOf("<ol") != -1){
						//获取ol标签下的li标签
						li_Obj = $(myObj[i]).children();
						//查看ol标签的type值，如果没有，默认是数字1
						if(myObj[i].type == "" || myObj[i].type == null ){
							ol_type = 1;
						}else{
							ol_type = myObj[i].type;
						}
						//查看类型是否是数字
						if(filter_number.test(ol_type)){
							num = ol_type-1;
							//循环li标签，将li标签替换为p标签并添加索引
							for (var j = 0; j < li_Obj.length; j++) {
								//因为存在一个ol标签下有多个题，所有，每个li进行+1进行题号赋值
								num = num + 1;
								liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+num+'.'+'').replace(filter_li_end,'</p>');
								contentArr.push(liContent)
							}		
						}else if(filter_letter.test(ol_type)){
		//					capitalLetterArr,lowercaseLetterArr
							letterObj = getJson("letter", null);
//							console.log(letterObj)
							if(letterObj.capitalLetterArr.indexOf(ol_type) != -1){//capitalLetterArr-大写
								thisIndex = letterObj.capitalLetterArr.indexOf(ol_type);
								//循环li标签，将li标签替换为p标签并添加索引
								for (var j = 0; j < li_Obj.length; j++) {
									//根据下标获取当前的排序类型
									num = thisIndex + j;
									liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+letterObj.capitalLetterArr[num]+'.'+'').replace(filter_li_end,'</p>');
									contentArr.push(liContent)
								}
							}else{//lowercaseLetterArr-小写
								thisIndex = letterObj.lowercaseLetterArr.indexOf(ol_type);
								//循环li标签，将li标签替换为p标签并添加索引
								for (var j = 0; j < li_Obj.length; j++) {
									//根据下标获取当前的排序类型
									num = thisIndex + j;
									liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+letterObj.lowercaseLetterArr[num]+'.'+'').replace(filter_li_end,'</p>');
									contentArr.push(liContent)
								}
							}
						}else{
							alert("发现新的排序类型，当前未支持……")
						}
					}else{
						contentArr.push(myObj[i].outerHTML)
					}
				}
				//最终的要处理的集合
				//		console.log(contentArr)
				//处理正文内容
				for(var i = 0; i < contentArr.length; i++) {
					//正文内容
					textContent = contentArr[i];
					//如果长度大于5，截取前五位正文内容
					if(textContent.length > 6) {
						strContent = textContent.substring(0, 6);
						strContent = strContent.replace(filter_space, "");
					}
					//扫描出大题题号
					var largeObj = getJson("largeTitle", strContent);
					//大题题号
					if(largeObj != undefined) {
						var largeNum = largeObj.type;
						if(largeNum != null && largeNum != "") {
							largeArr.push(i);
						}
					}
					//循环小题题号
					var nums = sux(strContent);
					if(nums != undefined) {
						subtitleArr.push(i);
					}
				}
				console.log("大题开始下标" + largeArr)
				console.log("小题号开始下包集合：" + subtitleArr)
//				debugger;
		
				//根据大题号循环，将数据进行重组，map方式存储展示
				for(var r = 0; r < largeArr.length; r++) {
					//获取题目类型
					var largeCont = document.createElement('div');
					largeCont.innerHTML = contentArr[largeArr[r]];
					var title = largeCont.innerText;
					//console.log(title)
					if(title.length > 6) {
						var str = title.substring(0, 6);
					}
					//根据大题识别题目类型
					var quzObj = getJson("quzType", str)
//					console.log(quzObj)
					if(quzObj != undefined) {
		//				//console.log("题目类型描述" + quzObj.typeName + "---题型类别识别码:" + quzObj.type );
					}
		
					var quz_map = {};
					var smallContent = new Array();
					var smallSubscript = new Array();
					var quzGroupArr = new Array();
					var ss = "";
					var strHtml = "";
					var bigTitle = "";
					//根据大题下标集合，获取大题内容
					bigTitle = contentArr[largeArr[r]];
					bigTitle = bigTitle.replace(importSection, '$1$3')
		
					//大题
					quz_map["topicNumber"] = bigTitle.replace(/<[^>]*>/gi,'');
					quz_map["topicNumberCopy"] = bigTitle.replace(/<[^>]*>/gi,'');
					//编辑/非编辑状态
					quz_map["headlineState"] = false;
					//一系列操作按钮
					quz_map["headlineOperation"] = false;
					//确认/取消按钮
//					quz_map["headlineConfirm"] = false;
					
					ss = contentArr.slice(largeArr[r] + 1, largeArr[r + 1]);
					//循环每种试题的大集合
					for(var j = 0; j < ss.length; j++) {
						strHtml += ss[j];
					}
					//循环每道大题下的小题进行区分，保存坐标
					for(var f = 0; f < subtitleArr.length; f++) {
						if(largeArr[r + 1] == undefined) {
							if(subtitleArr[f] > largeArr[r]) {
								smallSubscript.push(subtitleArr[f]);
							}
						} else {
							if(subtitleArr[f] > largeArr[r] && subtitleArr[f] < largeArr[r + 1]) {
								smallSubscript.push(subtitleArr[f]);
							}
						}
					}
					//循环每道大题下的小题坐标，获取内容
					var rr = "";
					for(var g = 0; g < smallSubscript.length; g++) {
						// //console.log(largeArr[r])
						var quzGroupAndContent = {};
						if(!isNaN(smallSubscript[g + 1])) {
							rr = contentArr.slice(smallSubscript[g], smallSubscript[g + 1]);
						} else {
							if(!isNaN(subtitleArr[g + 1])) {
								rr = contentArr.slice(smallSubscript[g], largeArr[r + 1]);
							} else {
								rr = contentArr.slice(smallSubscript[g], smallSubscript[g + 1]);
							}
						}
						//去题号操作
						var str2 = rr[0].replace(reg1, '$1$3').replace(reg2, '$1$2$4').replace(reg3, '$1$3').replace(reg4, '$1$2$4');
						for(var y = 0; y < rr.length; y++) {
							ss[y] = ss[y].replace(regex1, "$2 style=\"\"$3");
							ss[y] = ss[y].replace(regex2, "$2width:auto;$3");
							ss[y] = ss[y];
						}
						str2 = str2.replace(regex1, "$2 style=\"\"$3");
						str2 = str2.replace(regex2, "$2width:auto;$3");
						rr[0] = str2;
						rr = rr.join('');
						rr = rr.replace(reg_null, "");
		
						//进行处理解析和答案的集合
						var gg = $(rr);
						//答案下标位置
						var answerInt;
						//解析下标位置
						var analysisInt;
		
						var rr_content = "";
						var rr_analysis = "";
						var rr_answer = "";
//						var rr_answer2 = new Array();
						var filterAnalysis = '';
						var filterAnswer = '';
						for(var f = 0; f < gg.length; f++) {
							var cc = gg[f].outerHTML;
							if(cc.match(analysisSelect)) {
								analysisInt = f
							}
							if(cc.match(answerSelect2)) {
								answerInt = f;
							}
						}
						//获取处理过解析和答案的集合；
						var filterContent = gg.slice(0, analysisInt)
						if(analysisInt != undefined || answerInt != undefined ){
							filterAnalysis = gg.slice(analysisInt, answerInt)
							filterAnswer = gg.slice(answerInt)
						}
						//循环过滤解析的内容
						for(var i = 0; i < filterContent.length; i++) {
							rr_content += filterContent[i].outerHTML;
						}
						//循环解析内容
						for(var i = 0; i < filterAnalysis.length; i++) {
							rr_analysis += filterAnalysis[i].outerHTML;
						}
						//循环答案内容
						for(var i = 0; i < filterAnswer.length; i++) {
							rr_answer += filterAnswer[i].outerHTML;
								
						}
						rr_analysis = rr_analysis.replace(analysisSelect, "<p>");
						rr_answer = rr_answer.replace(answerSelect2, "<p>");
//						//console.log(rr_answer)
						//将答案的标志去掉
						var op = document.createElement('div');
						op.innerHTML = rr_answer;
						rr_answer = op.innerText.replace(filter_space,"");
						/*if(quzObj.type == 1 || quzObj.type == 2 || quzObj.type == 4){
							rr_answer2 = op.innerText.split(',');
						}*/
						var questionContent = [];
						var questionContentCopy = [];
						var contMap = {};
						var contArr = new Array();
						var quzGroup = {};
//						var quzRange = "";
						var quzRange = new Array();
						
						//查看是否是选择题，如果是选择题那么将查看选项范围
						if(quzObj.type == 2 || quzObj.type == 4){
							var quzRangeArr = rr_content.match(tilter_select);
							for (var i = 0; i < quzRangeArr.length; i++) {
								/*if(i == quzRangeArr.length-1){
									quzRange += quzRangeArr[i][0]
								}else{
									quzRange += quzRangeArr[i][0] +','
								}*/
								quzRange.push({'name':quzRangeArr[i][0],'state':false});
							}
							for(var ii=0;ii<rr_answer.length;ii++){
								for(var jj=0;jj<quzRange.length;jj++){
									if(rr_answer[ii] == quzRange[jj].name){
										quzRange[jj].state = true;
									}
								}
							}	
						}
						
						
						questionContent.push([rr_content, rr_analysis, rr_answer]);
						questionContentCopy.push([rr_content, rr_analysis, rr_answer]);
//						questionContent[0][3] = new Array();
//						questionContent[0][3].push(rr_answer2)
//						questionContent.push(['<div>' + rr_content + '</div>', '<div>' + rr_analysis + '</div>' ,'<div>' + rr_answer + '</div>']);
//
						console.log(quzRange)
						
						contMap["questionContent"] = questionContent;
						contMap["questionContentCopy"] = questionContentCopy;
						contMap["quzType"] = quzObj.type;
						contMap["quzSection"] = quzRange;
						//编辑/非编辑状态
						contMap["state"] = false;
						//拆分状态
						contMap["split"] = false;
						//一系列操作按钮
						contMap["btnOperation"] = false;
						//确认/取消按钮
						contMap["btnConfirm"] = false;
		
						contArr.push(contMap);
						quzGroup["content"] = contArr;
						quzGroup["group"] = "";
						quzGroup["groupCopy"] = "";
						//题组高亮状态
						quzGroup["groupBorder"] = false;
						//题组标题编辑/非编辑状态
						quzGroup["groupState"] = false;
						//一系列操作按钮
						quzGroup["groupbtnOperation"] = false;
						//确认/取消按钮
						quzGroup["groupbtnConfirm"] = false;
						quzGroupArr.push(quzGroup)
					}
					//小题
					quz_map["SmallTitle"] = quzGroupArr;
					quzList.push(quz_map);
					console.log(quz_map)
				}
				
				var f = {};
				var a = new Array();
				var a1 = new Array();
				a.push(['<p>11111111111题目组111里面的小题222222</p><p>不重复计算）</p>','题目组111里面的小题2222223答案不知道答案不知道','结结结222222']);
				a1.push(['<p>11111111111题目组111里面的小题222222</p><p>不重复计算）</p>','题目组111里面的小题2222223答案不知道答案不知道','结结结222222']);
				f.questionContent = a;
				f.questionContentCopy = a1;
				f.quzType = 3;
				f.quzSection = [];
				
				var ff = {};
				var aa = new Array();
				var aa1 = new Array();
				aa.push(['<p>题目组111里面的小题33333</p><p>不重复计算）</p>','题目组111里面的小题33333答案不知道答案不知道','结结结333333']);
				aa1.push(['<p>题目组111里面的小题33333</p><p>不重复计算）</p>','题目组111里面的小题33333答案不知道答案不知道','结结结333333']);
				ff.questionContent = aa;
				ff.questionContentCopy = aa1;
				ff.quzType = 3;
				ff.quzSection = [];
				
				var ffff = {};
				var aaaa = new Array();
				var aaaa1 = new Array();
				aaaa.push(['<p>题目组111里面的小题444</p><p>不重复计算）</p>','题目组111里面的小题444答案不知道答案不知道',['A','B','C']]);
				aaaa1.push(['<p>题目组111里面的小题444</p><p>不重复计算）</p>','题目组111里面的小题444答案不知道答案不知道',['A','B','C']]);
				ffff.questionContent = aaaa;
				ffff.questionContentCopy = aaaa1;
				ffff.quzType = 2;
				ffff.quzSection = [];
				
				var fff = {};
				var aaa = new Array();
				var aaa1 = new Array();
				aaa.push(['<p>题目组22222222里面的小题2222222</p><p>不重复计算）</p>','题目组2222222里面的小题22222222答案不知道答案不知道','结结结22222222']);
				aaa1.push(['<p>题目组22222222里面的小题2222222</p><p>不重复计算）</p>','题目组2222222里面的小题22222222答案不知道答案不知道','结结结22222222']);
				fff.questionContent = aaa;
				fff.questionContentCopy = aaa1;
				fff.quzType = 3;
				fff.quzSection = [];
				
				var g = {};
				var p = new Array();
				var p1 = new Array();
				p.push(['<p>ceshizu</p>','测试组','测试']);
				p1.push(['<p>ceshizu</p>','测试组','测试']);
				g.questionContent = p;
				g.questionContentCopy = p1;
				g.quzType = 3;
				g.quzSection = [];
				
				var gg = {};
				var pp = new Array();
				var pp1 = new Array();
				pp.push(['<p>ceshizu</p>','测试组','测试']);
				pp1.push(['<p>ceshizu</p>','测试组','测试']);
				gg.questionContent = pp;
				gg.questionContentCopy = pp1;
				gg.quzType = 3;
				gg.quzSection = [];
				
				var ggg = {};
				var ppp = new Array();
				var ppp1 = new Array();
				ppp.push(['<p>是肯定就发货时刻就发货时看到积分很快就收到回复的时间老师的风景</p>','测试组','测试']);
				ppp1.push(['<p>是肯定就发货时刻就发货时看到积分很快就收到回复的时间老师的风景</p>','测试组','测试']);
				ggg.questionContent = ppp;
				ggg.questionContentCopy = ppp1;
				ggg.quzType = 3;
				ggg.quzSection = [];
				
//				
//				quzList[0].SmallTitle[0].group = '<p>临时测试组标题上</p>';
//				quzList[0].SmallTitle[0].groupCopy = '<p>临时测试组标题上</p>';
//				quzList[0].SmallTitle[0].content.push(gg);
//				
//				quzList[0].SmallTitle[1].group = '<p>临时测试组标题下</p>';
//				quzList[0].SmallTitle[1].groupCopy = '<p>临时测试组标题下</p>';
//				quzList[0].SmallTitle[1].content.push(ggg);
//				
//				quzList[1].SmallTitle[1].group = '<p>临时测试组标题</p>';
//				quzList[1].SmallTitle[1].groupCopy = '<p>临时测试组标题</p>';
//				quzList[1].SmallTitle[1].content.push(g);
//				
//				quzList[1].SmallTitle[2].group = '<p>我是解析出来的题目组111</p>';
//				quzList[1].SmallTitle[2].groupCopy = '<p>我是解析出来的题目组111</p>';
//				quzList[1].SmallTitle[2].content.push(f);
//				quzList[1].SmallTitle[2].content.push(ff);
//				quzList[1].SmallTitle[2].content.push(ffff);
//		//		quzList[1].SmallTitle[2].content.push({'questionContent':['<div><p>题目组111里面的小题33333</p><p>不重复计算）</p></div>','<div>题目组111里面的小题33333答案不知道答案不知道</div>'],'quzSection':'','quzType':3});
//				quzList[2].SmallTitle[1].group = '<p>我是解析出来的题目组222</p>';
//				quzList[2].SmallTitle[1].groupCopy = '<p>我是解析出来的题目组222</p>';
//				quzList[2].SmallTitle[1].content.push(fff); 
//				
				//题号排序调用
				v_this.titlePatternSort(v_this.allData.pageRelated.titleNaturalOrder,quzList);
				console.log(quzList)
				return quzList;
			}
			return clickMethod();
			
			//截取指定字符或得题号
			function sux(strr) {
				var numbers;
				var numArr = [0,1,2,3,4,5,6,7,8,9];
				if(strr.indexOf(".") != -1) {
					numbers = strr.split(".")[0];
				} else if(strr.indexOf("．") != -1) {
					numbers = strr.split("．")[0];
				} else if(strr.indexOf("．") != -1) {
					numbers = strr.split("．")[0];
				} else if(strr.indexOf("、") != -1) {
					numbers = strr.split("、")[0];
				} else {
					//console.log("识别异常---sux");
				}
				if(numbers != undefined) {
					numbers = numbers.replace(filter_space, "");
					var lastNum = parseInt(numbers.charAt(numbers.length-1));
					if(numArr.indexOf(lastNum) != -1){
						return lastNum;
					}else{
						return undefined;
					}
				}else{
					return undefined;
				}
			}
	
			function judgeTitle(strr) {
				var content;
				if(strr.indexOf(".") != -1) {
					content = strr.split(".");
				} else if(strr.indexOf("．") != -1) {
					content = strr.split("．");
				} else if(strr.indexOf("．") != -1) {
					content = strr.split("．");
				} else if(strr.indexOf("、") != -1) {
					content = strr.split("、");
				} else {
					//console.log("识别异常---judgeTitle");
				}
				content.shift();
				return content.toString();
			}
		},
		//题号模式按钮
		titleSwitching (state){
			console.log(state)
			//true：自然模式 false：大题下小题排序模式
			this.allData.pageRelated.titleNaturalOrder = state;
			this.titlePatternSort(state);
		},
		//题号排序
		//state:状态	 true：所有小题号排序 false：大题下小题排序模式
		//data：列表数据，可不传
		titlePatternSort (state,data){
			let quzList = data == null ? this.allData.analysisData : data;
			console.log(quzList);
			if(state){
				//所有小题号排序
				for(var i = 0; i < quzList.length; i++){
					//小题所在大题前面所有的题
					var currentQuesNum = 0;
					//全部大题下前面所有的题
					var allQuesNum = 0;
					//大题序号
					quzList[i].headlineTitNo = this.questionOrder[i];
					for(var j = 0; j < quzList[i].SmallTitle.length; j++){
						//console.log('kaishi')
						if(i == 0){
							if(j > 0){
								allQuesNum += quzList[i].SmallTitle[j - 1].content.length;
							}
						}if(i > 0){
							//小题前面所有小题数量
							var num = 0;
							for(var ii = i - 1; ii > -1; ii--){
								for(var jj = 0; jj < quzList[ii].SmallTitle.length; jj++){
									num += quzList[ii].SmallTitle[jj].content.length;
								}
							}
							if(j == 0){
								allQuesNum = num;
							}else if(j > 0){
								currentQuesNum += quzList[i].SmallTitle[j - 1].content.length;
								allQuesNum = currentQuesNum + num;
							}
						}
						for(var k = 0; k < quzList[i].SmallTitle[j].content.length; k++){
							//小题序号
							if(i == 0){
								quzList[i].SmallTitle[j].content[k].titNo = k + 1 + allQuesNum;
							}else if(i > 0){
								quzList[i].SmallTitle[j].content[k].titNo = k + 1 + allQuesNum;
							}
						}
					}
				}
			}else{
				//大题下小题排序模式
				for(var i = 0; i < quzList.length; i++){
					//大题序号
					quzList[i].headlineTitNo = this.questionOrder[i];
					var prevAllLength = 0;
					for(var j = 0; j < quzList[i].SmallTitle.length; j++){
						if(j > 0){
							prevAllLength += quzList[i].SmallTitle[j-1].content.length;
						}
						for(var k = 0; k < quzList[i].SmallTitle[j].content.length; k++){
							//小题序号
							if(j == 0){
								quzList[i].SmallTitle[j].content[k].titNo = k + 1;
							}
							if(j > 0){
								quzList[i].SmallTitle[j].content[k].titNo = k + 1 + prevAllLength;
							}
						}
					}
				}
			}
		},
		//大题标题鼠标移入
		headlineIn (bigI){
			if(!bigI.headlineState){
				bigI.headlineOperation = true;
			}
		},
		//大题标题鼠标移出
		headlineOut (bigI){
			bigI.headlineOperation = false;
		},
		//大题标题编辑按钮
		headlineEdit (bigI){
			bigI.headlineState = true;
			bigI.headlineOperation = false;
		},
		//大题标题取消按钮
		headlineCancel (bigI){
			bigI.topicNumberCopy = bigI.topicNumber;
			bigI.headlineState = false;
			bigI.headlineOperation = true;
		},
		//大题标题确认按钮
		headlineSure (bigI){
			bigI.topicNumber = bigI.topicNumberCopy;
			bigI.headlineState = false;
			bigI.headlineOperation = true;
		},
		//题组鼠标移入
		groupIn (groupI){
			if(groupI.content.length > 1){
				groupI.groupBorder = true;
			}
		},
		//题组鼠标移出
		groupOut (groupI){
			groupI.groupBorder = false;
		},
		//题组标题移入
		groupTitIn (groupI){
			if(!groupI.groupbtnConfirm){
				groupI.groupbtnOperation = true;
			}
		},
		//题组标题移出
		groupTitOut (groupI){
			groupI.groupbtnOperation = false;
		},
		//题组标题编辑按钮
		groupTitEdit (groupI){
			groupI.groupState = true;
			groupI.groupbtnOperation = false;
			groupI.groupbtnConfirm = true;
		},
		//题组标题取消按钮
		groupTitCancel (groupI){
			groupI.groupCopy = groupI.group;
			groupI.groupState = false;
			groupI.groupbtnConfirm = false;
			groupI.groupbtnOperation = true;
		},
		//题组标题确认按钮
		groupTitSure (groupI){
			groupI.group = groupI.groupCopy;
			groupI.groupState = false;
			groupI.groupbtnConfirm = false;
			groupI.groupbtnOperation = true;
		},
		//题组标题删除按钮
		groupTitDelete (groupI,index,groupIndex){
			//index：父级循环层  groupIndex：当前循环层
//			this.allData.analysisData[index].SmallTitle[groupIndex].content.splice(quesIndex,1);
			alert('删除公共题目后将解散该题组');
			let _this = this;
			this.allData.analysisData[index].SmallTitle[groupIndex].content.forEach(function (ele,i){
//				let temporaryStorage = _this.allData.analysisData[index].SmallTitle[groupIndex];
//				temporaryStorage.content.splice(i,temporaryStorage.length - 2);
//				_this.allData.analysisData[index].SmallTitle.splice(temporaryStorage);
			});
		},
 		//小题鼠标移入
 		smallIn (quesI){
			if(!quesI.state){
				quesI.btnOperation = true;
			}
 		},
 		//小题鼠标移出
 		smallOut (quesI){
 			quesI.btnOperation = false;
 		},
 		//小题编辑按钮
 		smallEdit (quesI){
 			quesI.split = false;
			quesI.state = true;
			quesI.btnConfirm = true;
			quesI.btnOperation = false;
 		},
 		//小题取消按钮
 		smallCancel (quesI){
 			quesI.questionContentCopy[0][0] = quesI.questionContent[0][0];
 			quesI.questionContentCopy[0][1] = quesI.questionContent[0][1];
 			quesI.questionContentCopy[0][2] = quesI.questionContent[0][2];
 			quesI.state = false;
			quesI.btnConfirm = false;
			quesI.btnOperation = true;
 		},
 		//小题确认按钮
 		smallSure (quesI){
 			quesI.questionContent[0][0] = quesI.questionContentCopy[0][0];
 			quesI.questionContent[0][1] = quesI.questionContentCopy[0][1];
 			quesI.questionContent[0][2] = quesI.questionContentCopy[0][2];
 			quesI.state = false;
			quesI.btnConfirm = false;
			quesI.btnOperation = true;
 		},
 		//小题拆分按钮
 		smallSplit (quesI,index){
 			console.log(quesI)
 			quesI.split = true;
 			quesI.state = true;
			quesI.btnConfirm = true;
			quesI.btnOperation = false;
 		},
 		//小题删除按钮
 		smallDelete (quesI,index,groupIndex,quesIndex){
 			//index：循环最外层	groupIndex：父级循环层  quesIndex：当前循环层
			this.allData.analysisData[index].SmallTitle[groupIndex].content.splice(quesIndex,1);
			if(this.allData.analysisData[index].SmallTitle[groupIndex].content.length <= 1){
				alert('题组小题小于2道，讲解散题组');
				this.allData.analysisData[index].SmallTitle[groupIndex].group = '';
			}
			this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
 		},
 		//小题题型下拉框
 		smallType (allObj,selected){
 			//console.log(allObj)
 			//console.log(selected)
 			//单选2 多选4有答案区间
 			if(selected == 2 || selected == 4){
				if(allObj.quzSection.length < 1){
					this.questionType.option.forEach((ele,i) =>{
						if(i < 4){
							allObj.quzSection.push({'name': ele,'state':false});
						}
					});
				}
 			}else{
 				allObj.quzSection = [];
 			}
// 			//console.log(this.allData.analysisData);
 		},
 		//小题单选按钮
 		smallSingleChoose (allObj,currentObj){
   			allObj.forEach((ele,i) => {
   				ele.state = false;
   			});
   			currentObj.state = true;
 		},
 		//小题多选按钮
 		smallcheckChoose (currentObj){
   			currentObj.state = !currentObj.state;
 		},
 		//小题增加选项按钮
 		smallAddOption (allObj){
   			if(allObj.length < this.questionType.option.length){
   				allObj.push({'name': this.questionType.option[allObj.length],'state':false});
   			}else{
   				alert('最多10选项');
   			}
 		},
 		//小题减少选项按钮
 		smallReduceOption (allObj){
   			if(allObj.length > 4){
   				allObj.splice(allObj.length - 1,1);
   			}else{
   				alert('最少4选项');
   			}
// 			//console.log(this.allData.analysisData);
 		},
 		//小题判断对错按钮
 		smallJudge (previous,current){
   			previous[2] = current;
 		},
 		//提交数据
 		submitData (){
   			console.log(this.allData);
   			wordRelevant.submitAllData(this.allData).then(res => {
   				
   			}).catch(e => {
   				
   			});
   			/*wordRelevant.submitAllData(this.allData).then(function (res){
   				
   			}).catch(function(error){
   				
   			});*/
 		},
		gettext() {
　　　　　　 // 获取editor中的文本
//			//console.log(this.editor.getContent())
		}
	},
	//结构加载之后
	mounted() {
　　　　 // 实例化editor编辑器
//		this.editor = UE.getEditor('editor');
　　　　 // //console.log(this.editor.setContent("1223"))
//		//console.log(VueUeditorWrap)
	},
	//架构加载之前
	created() {
//		this.allData.analysisData = this.parsingDocuments();
//		//console.log(this.allData.analysisData)
//		this.wordData()
	},
	components: {
　　		VueUeditorWrap 	
　　}
}
</script>

<style>
</style>