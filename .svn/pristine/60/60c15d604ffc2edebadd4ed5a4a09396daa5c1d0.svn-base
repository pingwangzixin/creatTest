
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
//import questionTypeJson from '../../assets/json/data.json';
//import {dataObj} from '../../assets/json/dataObj.js';
//import {dataObj} from '../../assets/json/dataObjWX.js';

//接口汇总
import {wordRelevant} from '@/api'

export default {
	name : 'examPaperEdit',
	data() {
		return {
			//word格式文件
//			dataObj : dataObj,
			pageStatic : {//页面数据无需提交后台
				fastMergeGroup : {	//快速合并题目组弹框
					display : false,	//隐藏显示
					start : "",			//开始
					end : "",			//结束
					tipStart : "",		//提示开始
					tipEnd : "",		//提示结束
					bigI : 0,			//大题下标
					groupI : 0			//题组下标
				},	
				moveQuestion : {	//移动大题/小题弹框
					display : false,		//隐藏显示
					bigTitSection : [],		//可移动大题区间
					targetBigTitNo : "",			//目标大题题号
					targetSmallTitNo : "",		//目标小题题号
					tipStart : "",			//提示小题开始
					tipEnd : "",			//提示小题结束
					moveType : "",			//移动类型（大题：big/  小题：small）
					currentBigIndex : 0,	//当前大题下标
					currentGroupIndex : 0,	//当前题组下标
					currentSmallIndex : 0,	//当前小题下标
				},
				addQuestion : {		//添加大题/小题弹框
					display : false,			//隐藏显示
					bigTitSection : [],		//可选择大题区间
					targetBigTitNo : "",	//新建大题题号
					targetSmallTitNo : "",	//新建小题题号
					tipSmallStart : "",		//提示小题开始
					tipSmallEnd : "",		//提示小题结束
					tipInput : true,	    //小题目标题号隐藏（用于大题下无小题）
					addType : "",			//添加类型（大题：big/  小题：small）
					addNum : "",			//增加数量
					currentBigIndex : 0,	//当前大题下标（添加小题用）
					currentGroupIndex : 0,	//当前题组下标（添加小题用）
				},
				/*startQuestionNum : {	//设置起始题号弹框
					display : false,				//隐藏显示
					startNum : "",		//开始题号
				},*/
				splitBigQuestion : {	//拆分大题弹框
					display : false,	//隐藏显示
					tipStart : "",		//提示开始
					tipEnd : "",		//提示结束
					targetNo : "",		//目标题号
					currentBigIndex : 0,	//当前大题下标（拆分大题用）
				}
			},
			questionTypeJson : {},		//大题小题类型	
			//所有数据提交用
			allData : {
				userId : 'system',
				paperResId : '',
				//头部筛选相关
				headInfo : {
					name : '',
					termName : '',
					gradeNo : '',
					gradeName : '',
					levelId : '',
					levelName : '',
					subjectId : '',
					subjectName : '',
					type : 0
				},
				//页面相关
				pageRelated : {
					//题号模式：是否自然顺序 true/false
					titleNaturalOrder : true,
					analysis : false,	//解析展开/收起状态
					pageState : 'edit',
					step : '2'			//步骤 2卷面 3答案
				},
				//word卷面相关
				//word解析之后数据
				analysisData : null
			},
			//大题序号
			questionOrder : ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","二十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十","三十一","三十二","三十三","三十四","三十五","三十六","三十七","三十八","三十九","四十","四十一","四十二","四十三","四十四","四十五","四十六","四十七","四十八","四十九","五十"],
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
						{'name' : '解答', 'value' : '13'},
						{'name' : '作文', 'value' : '14'}
					],
				option : ['A','B','C','D','E','F','G','H','I','J']
			},
			//大题拆分（大题/题组/小题）
			bigSplit : '',
			//大题格式
			bigDataFormat : {
				"smallTitle" : [],				//存放题组
				"headlineConfirm": false,		//大题确认/取消按钮状态
				"headlineOperation" : false, 	//大题标题所有操作按钮
				"headlineState" : false,		//大题题干编辑状态
				'headlineSplit' : false,		//大题标题拆分状态
				"headlineTitNo" : false,		//大题序号
				"topicNumber" : "",				//大题标题
				"topicNumberCopy" : "",			//
				"sectionSeq" : "1",   			//大题数据库序号 
			    "sectionType" : "5",  			//大题类型
			    "sectionScore" : "30", 			//大题总分 
			    "sectionCount" : "10"  			//大题下小题数量
			},
			//题组格式
			groupDataFormat : {	
				"content": [],					//存放小题
				"group": "",					//题组题干
				"groupCopy": "",				//
				"groupBorder": false,			//题组高亮border
				"groupState": false,			//题组题干编辑状态
				"groupTitState": false,			//题组题干展示状态
				'groupSplit' :	false,			//题组标题拆分状态
				"groupbtnConfirm": false,		//题组确认/取消按钮状态
				"groupbtnOperation": false,		//题组所有操作按钮状态
				"groupId" : "", 				//题组id
				"groupSeq" : "",				//题组数据库序号
				"groupType" : "",				//题组类型（设置分值）
				"groupScore" : "",				//题组总分
				"groupCount" : "", 				//题组下小题数量
				"groupSeqLable" : "",			//题组序号
				"groupSeqTitle" : ""			//题组标题
			},
			//小题格式
			smallDataFormat : {
				"btnConfirm" : "",				//小题确认/取消按钮状态
				"btnOperation" : "",			//小题所有操作按钮状态
				"questionContent" : [],			//小题内容 题干/解析/答案
				"questionContentCopy" : [],		//
				"quzSection" : [],				//小题选择题选择区间
				"quzType" : "",					//小题类型
				"split" : "",					//小题拆分状态
				"state" : "",					//小题编辑状态
				"titNo" : "",					//小题序号
				"quzId" : "",					//小题id
				"quzSeq" : "",					//小题数据库序号
				"quzScore" : {				
				    "score" : "10",				//小题总分值
				    "quzblank" : []				//小题每空得分
				},
				"fillNum" : 0,					//填空题空数
				"missedScore" : 0,				//多选题漏选得分
				"wordCount" : 0				    //作文字数
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
	        formData.append('id', '259368646f414f15826a4325306da70b');
	        
			wordRelevant.wordData(formData).then( res =>{
				this.dataObj = res.data.data.content;
//				//console.log(res.data.data.content)
				res.data.data.content = '<div id="dd">' + res.data.data.content + '</div>';
				this.allData.analysisData = this.parsingDocuments(res.data.data.content);
				console.log(this.allData.analysisData)
				this.$nextTick(function () {
                    // 此时已经渲染完成
                    console.log(this.allData.analysisData.length)
                    console.log(this.allData.analysisData[this.allData.analysisData.length-1].smallTitle)
//                  alert('wanc')
                });
			}).catch( e => {
				
			});
		},
		//题类型静态文件
		questionTypeData (){
			let _this = this;
			$.ajax({
		        type: "get", //请求方式
		        url: "../../static/json/data.json", //地址，就是json文件的请求路径
		        async: false, //同步请求
		        dataType: "json", //数据类型可以为 text xml json  script  jsonp
		        success: function(data) { //返回的参数就是 action里面所有的有get和set方法的参数
		        	console.log('题类型')
		        	_this.questionTypeJson = data;
		        }
		    });
		},
		//解析word数据
		parsingDocuments (dataObj){
			console.log(55555555)
//		parsingDocuments (){
			let v_this = this;
			//解析word数据
			function getJson(selectType, quzTypeTitle, callback) {
			    var typeName;
			    var type;
			    var capitalLetterArr = [];
				var lowercaseLetterArr = [];
			   	if(selectType == "largeTitle") {
	                for(var i = 0; i < v_this.questionTypeJson.largeTitle.length; i++) {
	                    if(quzTypeTitle.indexOf(v_this.questionTypeJson.largeTitle[i].name) != -1) {
	                        typeName = v_this.questionTypeJson.largeTitle[i].name;
	                        type = v_this.questionTypeJson.largeTitle[i].type;
	                    }
	                }
	            } else if(selectType == "quzType") {
	                for(var i = 0; i < v_this.questionTypeJson.quzType.length; i++) {
	                    if(quzTypeTitle.indexOf(v_this.questionTypeJson.quzType[i].name) != -1) {
	                        type = v_this.questionTypeJson.quzType[i].type;
	                        typeName = v_this.questionTypeJson.quzType[i].name;
	                    }
	                }
	            }else if(selectType == "capitalLetter"){
	            	capitalLetterArr = v_this.questionTypeJson.capitalLetter;
	            }else if(selectType == "lowercaseLetters"){
	            	lowercaseLetterArr = v_this.questionTypeJson.lowercaseLetters;
	            }else if(selectType == "letter"){
	            	capitalLetterArr = v_this.questionTypeJson.capitalLetter;
	            	lowercaseLetterArr = v_this.questionTypeJson.lowercaseLetters;
	            }
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
			var filter_special_font3 = /&nbsp;/g;
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
			var tilter_select = /([A-Z][:|：|、|.|）|\))]+)*?(?!\1)(?=[A-Z]|)*/g;
//			var tilter_select = /([A-Z][:|：|、|.]+)*?(?!\1)(?=[A-Z]|)*/g;
			var htmlArr = [];
			// 最终集合
			var quzList = new Array(); //创建list集合
			
			//识别试题
			function clickMethod() {
				//获取选定区域的内容
//				var objF = $(v_this.dataObj);
				var objF = $(dataObj);
				console.log(objF)
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
					lineContent = lineContent.replace(filter_special_font1,'');
					lineContent = lineContent.replace(filter_special_font2,'');
					lineContent = lineContent.replace(filter_special_font3,'');
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
						contentArr.push(lineContent)
					}
				}
				//最终的要处理的集合
//						console.log(contentArr)
				//处理正文内容
				for(var i = 0; i < contentArr.length; i++) {
					//正文内容
					textContent = contentArr[i];
					textContent = textContent.replace(filter_space, "");
					
					//如果长度大于5，截取前五位正文内容
					if(textContent.length > 6) {
						strContent = textContent.substring(0, 10);
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
					title = title.replace(filter_space,'');
					//console.log(title)
//					if(title.length > 10) {
//						var str = title.substring(0, 10);
//					}
					//根据大题识别题目类型
					var quzObj = getJson("quzType", title)
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
					
					var smallNumIndex;
					for (var i = 0; i < subtitleArr.length; i++) {
						if(subtitleArr[i] > largeArr[r]){
							smallNumIndex = i;
							break;
						}
					}
					//根据大题下标集合，获取大题内容
					bigTitle = contentArr.slice(largeArr[r],subtitleArr[smallNumIndex]);
					bigTitle = bigTitle.toString();
					//根据大题下标集合，获取大题内容
//					bigTitle = contentArr[largeArr[r]];
					bigTitle = bigTitle.replace(importSection, '$1$3')
		
					//大题
					quz_map["topicNumber"] = bigTitle.replace(/<[^>]*>/gi,'');
					quz_map["topicNumberCopy"] = bigTitle.replace(/<[^>]*>/gi,'');
					//编辑/非编辑状态
					quz_map["headlineState"] = false;
					//大题标题拆分状态
					quz_map["headlineSplit"] = false;
					//一系列操作按钮
					quz_map["headlineOperation"] = false;
					//确认/取消按钮
					quz_map["headlineConfirm"] = false;
					
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
//							console.log(quzObj.type)
//							console.log(rr_content)
							var quzRangeArr = rr_content.match(tilter_select);
//							console.log(quzRangeArr)
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
						
						questionContent.push(rr_content, rr_analysis, rr_answer);
						questionContentCopy.push(rr_content, rr_analysis, rr_answer);
//						console.log(questionContent)
//						questionContent[0][3] = new Array();
//						questionContent[0][3].push(rr_answer2)
//						questionContent.push(['<div>' + rr_content + '</div>', '<div>' + rr_analysis + '</div>' ,'<div>' + rr_answer + '</div>']);
//
//						console.log(quzRange)
						
						contMap["questionContent"] = questionContent;
						contMap["questionContentCopy"] = questionContentCopy;
						contMap["quzType"] = quzObj.type;
						contMap["quzSection"] = quzRange;
//						console.log(contMap)
						//编辑/非编辑状态
						contMap["state"] = false;
						//拆分状态
						contMap["split"] = false;
						//一系列操作按钮
						contMap["btnOperation"] = false;
						//确认/取消按钮
						contMap["btnConfirm"] = false;
						//小题id
						contMap["quzId"] = '';
						//小题序号
						contMap["quzSeq"] = '';
						//小题分值
						contMap["quzScore"] = {
							"score" : 0,
							"quzblank" : []
						};
						//填空题空数
						contMap["fillNum"] = 0;
						//多选题漏选得分
						contMap["missedScore"] = 0;
						//作文字数
						contMap["wordCount"] = 0;
		
						contArr.push(contMap);
						quzGroup["content"] = contArr;
						quzGroup["group"] = "";
						quzGroup["groupCopy"] = "";
						//题组高亮状态
						quzGroup["groupBorder"] = false;
						//题组标题编辑/非编辑状态
						quzGroup["groupState"] = false;
						//题组标题展示状态
						quzGroup["groupTitState"] = false;
						//题组标题拆分状态
						quzGroup["groupSplit"] = false;
						//一系列操作按钮
						quzGroup["groupbtnOperation"] = false;
						//确认/取消按钮
						quzGroup["groupbtnConfirm"] = false;
						//题组id
						quzGroup["groupId"] = '';
						//题组序号
						quzGroup["groupSeq"] = '';
						//题组序号
						quzGroup["groupSeq"] = '';
						//题组类型
						quzGroup["groupType"] = '';
						//题组分值
						quzGroup["groupScore"] = 0;
						//题组下小题数量
						quzGroup["groupCount"] = 0;
						//题组序号（暂时没用）
						quzGroup["groupSeqLable"] = '';
						//题组序号（暂时没用）
						quzGroup["groupSeqTitle"] = '';
						
						quzGroupArr.push(quzGroup)
					}
					//小题
					quz_map["smallTitle"] = quzGroupArr;
					
					//大题id
					quz_map["sectionId"] = '';
					//大题数据库序号
					quz_map["sectionSeq"] = '';
					//大题类型
					quz_map["sectionType"] = '';
					//大题总分
					quz_map["sectionScore"] = 0;
					//大题下小题数量（非题组）
					quz_map["sectionCount"] = 0;
					
					quzList.push(quz_map);
					console.log(quz_map)
				}
				
				var f = {};
				var a = new Array();
				var a1 = new Array();
				a.push('<p>11111111111题目组111里面的小题222222</p><p>不重复计算）</p>','题目组111里面的小题2222223答案不知道答案不知道','结结结222222');
				a1.push('<p>11111111111题目组111里面的小题222222</p><p>不重复计算）</p>','题目组111里面的小题2222223答案不知道答案不知道','结结结222222');
				f.questionContent = a;
				f.questionContentCopy = a1;
				f.quzType = 3;
				f.quzSection = [];
				
				var ff = {};
				var aa = new Array();
				var aa1 = new Array();
				aa.push('<p>题目组111里面的小题33333</p><p>不重复计算）</p>','题目组111里面的小题33333答案不知道答案不知道','结结结333333');
				aa1.push('<p>题目组111里面的小题33333</p><p>不重复计算）</p>','题目组111里面的小题33333答案不知道答案不知道','结结结333333');
				ff.questionContent = aa;
				ff.questionContentCopy = aa1;
				ff.quzType = 3;
				ff.quzSection = [];
				
				var ffff = {};
				var aaaa = new Array();
				var aaaa1 = new Array();
				aaaa.push('<p>题目组111里面的小题444</p><p>不重复计算）</p>','题目组111里面的小题444答案不知道答案不知道','sadsadas ');
				aaaa1.push('<p>题目组111里面的小题444</p><p>不重复计算）</p>','题目组111里面的小题444答案不知道答案不知道','sadasdasd');
				ffff.questionContent = aaaa;
				ffff.questionContentCopy = aaaa1;
				ffff.quzType = 2;
				ffff.quzSection = [];
				
				var fff = {};
				var aaa = new Array();
				var aaa1 = new Array();
				aaa.push('<p>题目组22222222里面的小题2222222</p><p>不重复计算）</p>','题目组2222222里面的小题22222222答案不知道答案不知道');
				aaa1.push('<p>题目组22222222里面的小题2222222</p><p>不重复计算）</p>','题目组2222222里面的小题22222222答案不知道答案不知道');
				fff.questionContent = aaa;
				fff.questionContentCopy = aaa1;
				fff.quzType = 3;
				fff.quzSection = [];
				
				var g = {};
				var p = new Array();
				var p1 = new Array();
				p.push('<p>ceshizu</p>','测试组','测试');
				p1.push('<p>ceshizu</p>','测试组','测试');
				g.questionContent = p;
				g.questionContentCopy = p1;
				g.quzType = 3;
				g.quzSection = [];
				
				var gg = {};
				var pp = new Array();
				var pp1 = new Array();
				pp.push('<p>ceshizu</p>','测试组','测试');
				pp1.push('<p>ceshizu</p>','测试组','测试');
				gg.questionContent = pp;
				gg.questionContentCopy = pp1;
				gg.quzType = 3;
				gg.quzSection = [];
				
				var ggg = {};
				var ppp = new Array();
				var ppp1 = new Array();
				ppp.push('<p>是肯定就发货时刻就发货时看到积分很快就收到回复的时间老师的风景</p>','测试组','测试');
				ppp1.push('<p>是肯定就发货时刻就发货时看到积分很快就收到回复的时间老师的风景</p>','测试组','测试');
				ggg.questionContent = ppp;
				ggg.questionContentCopy = ppp1;
				ggg.quzType = 3;
				ggg.quzSection = [];
				
				
				/*quzList[0].smallTitle[0].group = '<p>临时测试组标题上</p>';
				quzList[0].smallTitle[0].groupCopy = '<p>临时测试组标题上</p>';
				quzList[0].smallTitle[0].content.push(gg);
				
				quzList[0].smallTitle[1].group = '<p>临时测试组标题下</p>';
				quzList[0].smallTitle[1].groupCopy = '<p>临时测试组标题下</p>';
				quzList[0].smallTitle[1].content.push(ggg);
				
				quzList[1].smallTitle[1].group = '<p>临时测试组标题</p>';
				quzList[1].smallTitle[1].groupCopy = '<p>临时测试组标题</p>';
				quzList[1].smallTitle[1].content.push(g);
				
				quzList[1].smallTitle[2].group = '<p>我是解析出来的题目组111</p>';
				quzList[1].smallTitle[2].groupCopy = '<p>我是解析出来的题目组111</p>';
				quzList[1].smallTitle[2].content.push(f);
				quzList[1].smallTitle[2].content.push(ff);
				quzList[1].smallTitle[2].content.push(ffff);
		//		quzList[1].smallTitle[2].content.push({'questionContent':['<div><p>题目组111里面的小题33333</p><p>不重复计算）</p></div>','<div>题目组111里面的小题33333答案不知道答案不知道</div>'],'quzSection':'','quzType':3});
				quzList[2].smallTitle[1].group = '<p>我是解析出来的题目组222</p>';
				quzList[2].smallTitle[1].groupCopy = '<p>我是解析出来的题目组222</p>';
				quzList[2].smallTitle[1].content.push(fff); */
				
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
		//小题号排序
		//state:状态	 true：所有小题号排序 false：大题下小题排序模式
		//data：列表数据，可不传
		titlePatternSort (state,data){
			console.log(state)
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
					for(var j = 0; j < quzList[i].smallTitle.length; j++){
						//console.log('kaishi')
						if(i == 0){
							if(j > 0){
								allQuesNum += quzList[i].smallTitle[j - 1].content.length;
							}
						}if(i > 0){
							//小题前面所有小题数量
							var num = 0;
							for(var ii = i - 1; ii > -1; ii--){
								for(var jj = 0; jj < quzList[ii].smallTitle.length; jj++){
									num += quzList[ii].smallTitle[jj].content.length;
								}
							}
							if(j == 0){
								allQuesNum = num;
							}else if(j > 0){
								currentQuesNum += quzList[i].smallTitle[j - 1].content.length;
								allQuesNum = currentQuesNum + num;
							}
						}
						for(var k = 0; k < quzList[i].smallTitle[j].content.length; k++){
							//小题序号
							if(i == 0){
								quzList[i].smallTitle[j].content[k].titNo = k + 1 + allQuesNum;
							}else if(i > 0){
								quzList[i].smallTitle[j].content[k].titNo = k + 1 + allQuesNum;
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
					for(var j = 0; j < quzList[i].smallTitle.length; j++){
						if(j > 0){
							prevAllLength += quzList[i].smallTitle[j-1].content.length;
						}
						for(var k = 0; k < quzList[i].smallTitle[j].content.length; k++){
							//小题序号
							if(j == 0){
								quzList[i].smallTitle[j].content[k].titNo = k + 1;
							}
							if(j > 0){
								quzList[i].smallTitle[j].content[k].titNo = k + 1 + prevAllLength;
							}
						}
					}
				}
			}
		},
		//大题号排序
		bigTitSort (){
			let _this = this;
			console.log(this.allData.analysisData)
			this.allData.analysisData.forEach(function (ele,i){
				ele.headlineTitNo = _this.questionOrder[i];
			});
		},
		//定时提示框
		time (state,tipWord){
			//状态（success/fail/warning）  提示
			this.$parent.$parent.timingFn(state,tipWord);
		},
		//确认/取消框
		confirm (){
			let _this = this;
			this.$parent.$parent.confirmFn('按时肯德基刻录机',function (state){
				if(state == 'sure'){	
					_this.$parent.$parent.timingFn('success','3');
				}
			});
		},
		//加载框
		load (){
			this.$parent.$parent.loadingFn(true,'jjjjj');	
		},
		//题号模式按钮
		titleSwitching (state){
			console.log(state)
			//true：自然模式 false：大题下小题排序模式
			this.allData.pageRelated.titleNaturalOrder = state;
			this.titlePatternSort(state);
			if(state){
				this.$parent.$parent.timingFn('success','已切换至自然模式');
			}else{
				this.$parent.$parent.timingFn('success','已切换至大题下小题排序模式');
			}
		},
		//展开/收起解析
		analysisFn (){
			this.allData.pageRelated.analysis = !this.allData.pageRelated.analysis;
		},
		//添加大题
		addBig (addType){
			//添加类型（大题/小题）
			let _this = this;
			this.pageStatic.addQuestion.addType = addType;
			this.pageStatic.addQuestion.display = true;
			this.pageStatic.addQuestion.bigTitSection.length = 0;
			this.pageStatic.addQuestion.addNum = "";
			this.allData.analysisData.forEach(function (e,i){
				_this.pageStatic.addQuestion.bigTitSection.push(_this.questionOrder[i]);
			});
			this.pageStatic.addQuestion.bigTitSection.push(this.questionOrder[this.allData.analysisData.length]);
			this.pageStatic.addQuestion.targetBigTitNo = this.pageStatic.addQuestion.bigTitSection[0];
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
			bigI.headlineConfirm = true;
		},
		//大题标题取消（编辑/拆分）按钮
		headlineCancel (bigI){
			bigI.headlineState = false;
			bigI.headlineOperation = true;
			bigI.headlineConfirm = false;
			bigI.topicNumberCopy = bigI.topicNumber;
			/*bigI.topicNumberCopy = bigI.topicNumber;
			bigI.headlineState = false;
			bigI.headlineOperation = true;*/
		},
		//大题添加小题按钮
		headlineAddSmall (addType,currentBig){
			//添加类型（大题big/小题small） 当前大题下标
			//当前大题
			console.log(addType)
			console.log(currentBig)
			this.pageStatic.addQuestion.currentBigIndex = currentBig;
			let currentObj = this.allData.analysisData[currentBig];
			if(currentObj.smallTitle.length > 0){
				this.pageStatic.addQuestion.tipInput = true;
				this.pageStatic.addQuestion.tipSmallStart = currentObj.smallTitle[0].content[0].titNo;		
				this.pageStatic.addQuestion.tipSmallEnd = currentObj.smallTitle[currentObj.smallTitle.length - 1].content[currentObj.smallTitle[currentObj.smallTitle.length - 1].content.length - 1].titNo;
			}else{
				this.pageStatic.addQuestion.tipInput = false;
			}
			this.pageStatic.addQuestion.addType = addType;
			this.pageStatic.addQuestion.targetSmallTitNo = "";
			this.pageStatic.addQuestion.addNum = "";
			this.pageStatic.addQuestion.display = true;
		},
		//添加大题/小题弹框确认按钮
		addSure (){
			let _this = this;
			if(this.pageStatic.addQuestion.addType == 'big'){	//添加大题
				this.pageStatic.addQuestion.bigTitSection.forEach(function (e,i){
					if(_this.pageStatic.addQuestion.targetBigTitNo == e){	//插入
						if(_this.pageStatic.addQuestion.addNum != ""){
							for(let j = 0; j < _this.pageStatic.addQuestion.addNum; j++){
								let bigObj = JSON.parse(JSON.stringify(_this.bigDataFormat));
								_this.allData.analysisData.splice(i,0,bigObj);
							}
						}else{
							let bigObj = JSON.parse(JSON.stringify(_this.bigDataFormat));
							_this.allData.analysisData.splice(i,0,bigObj);
						}
						//排序
						_this.bigTitSort();
					}
				});
			}else{	//添加小题
				console.log(this.pageStatic.addQuestion.currentBigIndex)
				if(!this.pageStatic.addQuestion.tipInput){//当前大题下无小题
					for(let j = 0; j < this.pageStatic.addQuestion.addNum; j++){
						let groupObj = JSON.parse(JSON.stringify(this.groupDataFormat));
						let smallObj = JSON.parse(JSON.stringify(this.smallDataFormat));
						groupObj.content.push(smallObj);
						this.allData.analysisData[_this.pageStatic.addQuestion.currentBigIndex].smallTitle.push(groupObj);
					}
					//排序
					this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
				}else{//当前大题下有小题
					this.allData.analysisData[this.pageStatic.addQuestion.currentBigIndex].smallTitle.forEach(function (e,i){
						if(_this.pageStatic.addQuestion.targetSmallTitNo != ""){
							e.content.forEach(function (qE,qI){
								if(_this.pageStatic.addQuestion.targetSmallTitNo == qE.titNo){
									if(e.groupTitState){//题组
										for(let j = 0; j < _this.pageStatic.addQuestion.addNum; j++){
											let smallObj = JSON.parse(JSON.stringify(_this.smallDataFormat));
											e.content.splice(qI,0,smallObj);
										}
									}else{//非题组
										for(let j = 0; j < _this.pageStatic.addQuestion.addNum; j++){
											let groupObj = JSON.parse(JSON.stringify(_this.groupDataFormat));
											let smallObj = JSON.parse(JSON.stringify(_this.smallDataFormat));
											groupObj.content.push(smallObj);
											_this.allData.analysisData[_this.pageStatic.addQuestion.currentBigIndex].smallTitle.splice(i,0,groupObj);
										}
									}
									//排序
									_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
								}
							});
						}
						
					});
				}
			}
			this.pageStatic.addQuestion.display = false;
		},
		//添加大题/小题弹框取消按钮
		addCancel (){
			this.pageStatic.addQuestion.display = false;
		},
		//大标题移动按钮
		headlineMove (moveType,currentBig){
			//移动题型（大题/小题） 当前大题下标
			let _this = this;
			this.pageStatic.moveQuestion.moveType = moveType;
			this.pageStatic.moveQuestion.display = true;
			this.pageStatic.moveQuestion.bigTitSection.length = 0;
			this.allData.analysisData.forEach(function (e,i){
				_this.pageStatic.moveQuestion.bigTitSection.push(_this.questionOrder[i]);
			});
			this.pageStatic.moveQuestion.targetBigTitNo = this.pageStatic.moveQuestion.bigTitSection[0];
			this.pageStatic.moveQuestion.currentBigIndex = currentBig;
		},
		//大题标题确认按钮（编辑/拆分题组、小题）
		headlineSure (bigI,index){
			//当前大题，当前下标
			bigI.headlineState = false;
			bigI.headlineOperation = true;
			bigI.headlineConfirm = false;
			
			if(bigI.headlineSplit){//拆分状态
				let ue = this.$refs[(index - 0 + 1)][0].editor;
				let splitlabel = "<split-text></split-text>";
				ue.execCommand("inserthtml", splitlabel, true);
				//拆分后上部分
				let text = ue.body.innerHTML.substring(0,ue.body.innerHTML.indexOf(splitlabel));
				let regSplitlabel = /<split-text><\/split-text>/g;
				//拆分后下部分
				let splitText = ue.body.innerHTML
					.substring(ue.body.innerHTML.indexOf(splitlabel))
					.replace(regSplitlabel, "");
				bigI.topicNumber = text;
				bigI.topicNumberCopy = text;
				console.log(bigI)
				switch (this.bigSplit){
					case 'big'://拆大题
//						let bigObj = JSON.parse(JSON.stringify(bigI));
						
						break;
					case 'group'://拆题组
						let groupObj = JSON.parse(JSON.stringify(bigI.smallTitle[0]));
						groupObj.group = splitText;
						groupObj.groupCopy = splitText;
						groupObj.groupTitState = true;
						groupObj.content.length = 0;
						bigI.smallTitle.splice(0,0,groupObj);
						let firstT = JSON.parse(JSON.stringify(bigI.smallTitle[1].content[0]))
						groupObj.content.push(firstT);
						bigI.smallTitle.splice(1,1);
//						this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
						console.log(bigI.smallTitle)
						break;
					case 'small'://拆小题
						let obj = JSON.parse(JSON.stringify(this.groupDataFormat));
						let objChild = JSON.parse(JSON.stringify(this.smallDataFormat));
						obj.group = '';
						obj.groupCopy = '';
						obj.content.push(objChild);
						obj.content[0].questionContent[0] = splitText;
						obj.content[0].questionContent[1] = "";
						obj.content[0].questionContent[2] = "";
						obj.content[0].questionContentCopy[0] = splitText;
						obj.content[0].questionContentCopy[1] = "";
						obj.content[0].questionContentCopy[2] = "";
						bigI.smallTitle.splice(0,0,obj);
						console.log(bigI.smallTitle)
						break;
					default:
						break;
				}
				
				//排序
				this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
				bigI.headlineSplit = false;
			}else{//编辑状态
				bigI.topicNumber = bigI.topicNumberCopy;
			}
			//未改编辑器之前
			/*bigI.topicNumber = bigI.topicNumberCopy;
			bigI.headlineState = false;
			bigI.headlineOperation = true;*/
		},
		//大题标题拆分/题组/小题按钮
		headlineSplit (bigI,target){
			//当前大题  拆题类型
			bigI.headlineState = true;
			bigI.headlineOperation = false;
			bigI.headlineConfirm = true;
			bigI.headlineSplit = true;
			//切换类型
			this.bigSplit = target;
		},
		//大题标题拆分大题
		headlineSplitBig (bigI,target,index){
			//当前大题  拆题类型  大题下标
			this.bigSplit = target;
			if(bigI.smallTitle.length > 1){
//			if(bigI.smallTitle.length > 1 || bigI.smallTitle[0].content.length > 1){
				this.pageStatic.splitBigQuestion.tipStart = bigI.smallTitle[0].content[0].titNo;
				this.pageStatic.splitBigQuestion.tipEnd = bigI.smallTitle[bigI.smallTitle.length - 1].content[bigI.smallTitle[bigI.smallTitle.length - 1].content.length - 1].titNo;
				this.pageStatic.splitBigQuestion.currentBigIndex = index;
			}else{
				this.time('warning','需要至少包含两道小题');
			}
			this.pageStatic.splitBigQuestion.display = true;
		},
		//大题标题拆分大题确认按钮
		splitBigSure (){
			let _this = this;
			let currentBig = this.allData.analysisData[this.pageStatic.splitBigQuestion.currentBigIndex];
			let newObj = JSON.parse(JSON.stringify(_this.bigDataFormat));
			let newBig = null;
			currentBig.smallTitle.forEach(function (e,i){
				e.content.forEach(function (groupE,groupI){
					if(_this.pageStatic.splitBigQuestion.targetNo == groupE.titNo){
						if(e.content.length > 1){
							alert('小题包含在题目组中无法拆分');
						}else{
							newBig = JSON.parse(JSON.stringify(currentBig.smallTitle.splice(i)));
							newObj.smallTitle = newBig;
							console.log(newBig);
							_this.allData.analysisData.splice(_this.pageStatic.splitBigQuestion.currentBigIndex + 1,0,newObj);
							//排序
							_this.bigTitSort();
							_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
							_this.pageStatic.splitBigQuestion.targetNo = "";
							_this.pageStatic.splitBigQuestion.display = false;
						}
					}
				});
			});
		},
		//大题标题拆分大题取消按钮
		splitBigCancel (){
			this.pageStatic.splitBigQuestion.display = false;
		},
		//大标题设置起始题号
		/*headlineSetStartQue (bigI){
			//当前大题
			this.pageStatic.startQuestionNum.display = true;
		},
		//大标题设置起始题号确认按钮
		startQuesCancel (){
			this.pageStatic.startQuestionNum.display = false;
		},
		//大标题设置起始题号取消按钮
		startQuesSure (){
			this.pageStatic.startQuestionNum.display = false;
		},*/
		//大题标题删除按钮
		headlineDelete (bigI,index){
			//bigI:当前大题， index：大题下标
			this.allData.analysisData.splice(index,1);
			//排序
			this.bigTitSort();
			this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
			console.log(this.allData.analysisData)
		},
		//题组鼠标移入
		groupIn (groupI){
			if(groupI.groupTitState){
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
			groupI.groupSplit = false;
		},
		//题组标题确认按钮（编辑/拆分）
		groupTitSure (groupI,index,groupIndex){
					//大题下标，当前题组下标
			groupI.groupState = false;
			groupI.groupbtnConfirm = false;
			groupI.groupbtnOperation = true;
			if(groupI.groupSplit){//拆分状态
				let ue = this.$refs[(index - 0 + 1) + "-" + (groupIndex - 0 + 1)][0].editor;
				let splitlabel = "<split-text></split-text>";
				ue.execCommand("inserthtml", splitlabel, true);
				//拆分后上部分
				let text = ue.body.innerHTML.substring(0,ue.body.innerHTML.indexOf(splitlabel));
				let regSplitlabel = /<split-text><\/split-text>/g;
				//拆分后下部分
				let splitText = ue.body.innerHTML
					.substring(ue.body.innerHTML.indexOf(splitlabel))
					.replace(regSplitlabel, "");
					
				groupI.group = text;
				groupI.groupCopy = text;
				let obj = JSON.parse(JSON.stringify(this.smallDataFormat));
				obj.questionContent[0] = splitText;
				obj.questionContent[1] = "";
				obj.questionContent[2] = "";
				obj.questionContentCopy[0] = splitText;
				obj.questionContentCopy[1] = "";
				obj.questionContentCopy[2] = "";
				groupI.content.splice(0,0,obj);
				//排序
				this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
				console.log(groupI.content)
			}else{//编辑状态
				groupI.group = groupI.groupCopy;
			}
		},
		//题组标题拆分按钮
		groupSplit (groupI){
			groupI.groupState = true;
			groupI.groupbtnConfirm = true;
			groupI.groupbtnOperation = false;
			groupI.groupSplit = true;
		},
		//题组快速合并题目组按钮
		groupFastMerge(groupI,groupIndex,index){
			//当前题组  当前题组下标  当前题组的大题下标
			let _this = this;
			//当前大题
			let currentT = this.allData.analysisData[index].smallTitle;
			this.pageStatic.fastMergeGroup.bigI = index;
			this.pageStatic.fastMergeGroup.groupI = groupIndex;
			this.pageStatic.fastMergeGroup.tipStart = groupI.content[groupI.content.length - 1].titNo + 1;
			let end;
			currentT.forEach(function (e,i){
				if(i > groupIndex){
					if(e.groupTitState){//下面是题组
						end = currentT[i - 1].content[currentT[i - 1].content.length - 1].titNo;
						return;
					}
				}
			});
			if(end){
				this.pageStatic.fastMergeGroup.tipEnd = end;
			}else{
				this.pageStatic.fastMergeGroup.tipEnd = currentT[currentT.length - 1].content[currentT[currentT.length - 1].content.length - 1].titNo;;
			}
			if(this.pageStatic.fastMergeGroup.tipStart - 0 > this.pageStatic.fastMergeGroup.tipEnd - 0){
				alert('题组下无可合并小题');	
			}else{
				this.pageStatic.fastMergeGroup.display = true;
			}
			
		},
		//题组快速合并题目组弹框确认按钮
		groupFastMergeSure (){
			let _this = this;
			let bigT = this.allData.analysisData[this.pageStatic.fastMergeGroup.bigI];
			let insert = [];
			let start = this.pageStatic.fastMergeGroup.start;
			let end = this.pageStatic.fastMergeGroup.end;
			bigT.smallTitle.forEach(function (e,i){
				if(start == e.content[0].titNo){
					start = i;
				}
				if(end == e.content[0].titNo){
					end = i;
				}
			});
//			console.log(start,end)
			for(let i = start; i < end + 1; i++){
				insert.push(JSON.parse(JSON.stringify(bigT.smallTitle[i].content[0])));
			}
			bigT.smallTitle.splice(start,end - start + 1);
//			console.log(insert)
			insert.forEach(function (e,i){
				bigT.smallTitle[_this.pageStatic.fastMergeGroup.groupI].content.push(e);
			});
			//排序
			this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
			this.pageStatic.fastMergeGroup.display = false;
			this.pageStatic.fastMergeGroup.start = "";
			this.pageStatic.fastMergeGroup.end = "";
		},
		//题组快速合并题目组弹框取消按钮
		groupFastMergeCancel (){
			this.pageStatic.fastMergeGroup.display = false;
			this.pageStatic.fastMergeGroup.bigI = 0;
			this.pageStatic.fastMergeGroup.groupI = 0;
			this.pageStatic.fastMergeGroup.start = "";
			this.pageStatic.fastMergeGroup.end = "";
		},
		//题组快速合并题目组弹框开始/结束验证
		groupFastTest (input,num,section){
			//输入内容  提示内容  开始 start 结束 end
			 let verifi  = /^[1-9]\d*$/;
            if(!verifi.test(input)){
				section == 'start' ? this.pageStatic.fastMergeGroup.start = "" : this.pageStatic.fastMergeGroup.end = "";
            }else{
				if(input - 0 > this.pageStatic.fastMergeGroup.tipEnd - 0){
					alert('超过可合并区间');
					this.pageStatic.fastMergeGroup.end = "";
//					this.pageStatic.fastMergeGroup.end = this.pageStatic.fastMergeGroup.tipEnd;
				}
				if(input - 0 < this.pageStatic.fastMergeGroup.tipStart - 0){
					alert('不可选择题目组内小题');
					this.pageStatic.fastMergeGroup.start = "";
//					this.pageStatic.fastMergeGroup.start = this.pageStatic.fastMergeGroup.tipStart;
				}
			}
		},
		//题组标题删除按钮
		groupTitDelete (groupI,index,groupIndex){
			//index：大题下标  groupIndex：题组下标
//			this.allData.analysisData[index].smallTitle[groupIndex].content.splice(quesIndex,1);
			alert('删除公共题目后将解散该题组');
			let _this = this;
			let littleQuestionArr = [];
			groupI.content.forEach(function (ele,i){
				if(i > 0){
					littleQuestionArr.push(ele);
				}
			});
			groupI.group = '';
			groupI.groupCopy = '';
			groupI.groupTitState = false;
			groupI.content.splice(1,groupI.content.length-1);
			littleQuestionArr.forEach(function (ele,i){
				let format = JSON.parse(JSON.stringify(_this.groupDataFormat));
				format.content.push(ele);
				groupIndex ++;
				_this.allData.analysisData[index].smallTitle.splice(groupIndex,0,format);
			});
			console.log(this.allData.analysisData);
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
 		//小题取消（编辑/拆分）按钮
 		smallCancel (quesI){
 			quesI.questionContentCopy[0] = quesI.questionContent[0];
 			quesI.questionContentCopy[1] = quesI.questionContent[1];
 			quesI.questionContentCopy[2] = quesI.questionContent[2];
 			quesI.state = false;
			quesI.btnConfirm = false;
			quesI.btnOperation = true;
 		},
 		//小题移动按钮
		smallMove (moveType,currentBig,currentGroup,currentSmall){
			//移动题型（大题/小题）当前大题下标  当前题组下标  当前小题下标
			let _this = this;
			this.pageStatic.moveQuestion.moveType = moveType;
			this.pageStatic.moveQuestion.bigTitSection.length = 0;
			this.pageStatic.moveQuestion.targetSmallTitNo = "";
			this.pageStatic.moveQuestion.display = true;
			//默认结束小题下标
			let endSmallIndex = this.allData.analysisData[0].smallTitle.length - 1;
			let endSmall = this.allData.analysisData[0].smallTitle[endSmallIndex].content[this.allData.analysisData[0].smallTitle[endSmallIndex].content.length - 1].titNo;
			this.allData.analysisData.forEach(function (e,i){
				_this.pageStatic.moveQuestion.bigTitSection.push(_this.questionOrder[i]);
			});
			this.pageStatic.moveQuestion.targetBigTitNo = this.pageStatic.moveQuestion.bigTitSection[0];
			this.pageStatic.moveQuestion.tipStart = this.allData.analysisData[0].smallTitle[0].content[0].titNo;
			this.pageStatic.moveQuestion.tipEnd = endSmall;
			this.pageStatic.moveQuestion.currentBigIndex = currentBig;
			this.pageStatic.moveQuestion.currentGroupIndex = currentGroup;
			this.pageStatic.moveQuestion.currentSmallIndex = currentSmall;
		},
		//移动弹框大题change事件
		moveBigTitSection (){
			let _this = this;
			this.allData.analysisData.forEach(function (e,i){
				if(_this.pageStatic.moveQuestion.targetBigTitNo == e.headlineTitNo){
					_this.pageStatic.moveQuestion.tipStart = e.smallTitle[0].content[0].titNo;
					_this.pageStatic.moveQuestion.tipEnd = e.smallTitle[e.smallTitle.length - 1].content[e.smallTitle[e.smallTitle.length - 1].content.length - 1].titNo;
				}
			});
		},
		//移动弹框确认按钮
		moveSure (){
			let _this = this;
			//移动大题
			if(this.pageStatic.moveQuestion.moveType == 'big'){
				let storageBig = JSON.parse(JSON.stringify(this.allData.analysisData[this.pageStatic.moveQuestion.currentBigIndex]));
				this.allData.analysisData.forEach(function (e,i){
					if(_this.pageStatic.moveQuestion.targetBigTitNo == e.headlineTitNo){
						if(_this.pageStatic.moveQuestion.currentBigIndex < i){
							_this.allData.analysisData.splice(i + 1,0,storageBig);
							_this.allData.analysisData.splice(_this.pageStatic.moveQuestion.currentBigIndex,1);
						}else if(_this.pageStatic.moveQuestion.currentBigIndex > i){
							_this.allData.analysisData.splice(i,0,storageBig);
							_this.allData.analysisData.splice(_this.pageStatic.moveQuestion.currentBigIndex + 1,1);
						}
						//排序
						_this.bigTitSort();
						_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
						console.log(_this.allData.analysisData)
					}
				});
			}else{//移动小题
				let groupFormat = JSON.parse(JSON.stringify(this.groupDataFormat));
				let moveBigObj = this.allData.analysisData[this.pageStatic.moveQuestion.currentBigIndex];
				let moveGroupObj = moveBigObj.smallTitle[this.pageStatic.moveQuestion.currentGroupIndex];
				let moveSmallObj = moveGroupObj.content[this.pageStatic.moveQuestion.currentSmallIndex];
				let storageSmall = JSON.parse(JSON.stringify(moveSmallObj));

				let currentBigIndex;
				let currentGroupIndex;
				let currentSmallIndex;
				console.log(this.allData.analysisData)
				this.allData.analysisData.forEach(function (e,i){
					if(_this.pageStatic.moveQuestion.targetBigTitNo == e.headlineTitNo){
						e.smallTitle.forEach(function (gE,gI){
							gE.content.forEach(function (qE,qI){
								if(_this.pageStatic.moveQuestion.targetSmallTitNo == qE.titNo){
									currentBigIndex = i;
									currentGroupIndex = gI;
									currentSmallIndex = qI;
								}
							});
						});
					}
				});
				
				if(this.allData.analysisData[currentBigIndex].smallTitle[currentGroupIndex].groupTitState &&  this.allData.analysisData[currentBigIndex].smallTitle[currentGroupIndex].content.length>1){//移入题组
					if(this.pageStatic.moveQuestion.targetSmallTitNo > storageSmall.titNo){
						currentSmallIndex = currentSmallIndex+1
					}
					this.allData.analysisData[currentBigIndex].smallTitle[currentGroupIndex].content.splice(currentSmallIndex,0,storageSmall);
				}else{//移入非题组
					if(this.pageStatic.moveQuestion.targetSmallTitNo > storageSmall.titNo){
						currentGroupIndex =currentGroupIndex+1
					}
					groupFormat.content.push(storageSmall);
					this.allData.analysisData[currentBigIndex].smallTitle.splice(currentGroupIndex,0,groupFormat)
				}
				
				if(moveGroupObj.groupTitState && moveGroupObj.content.length > 1){//题组
					moveGroupObj.content.splice(this.pageStatic.moveQuestion.currentSmallIndex,1);
					
				}else{//非题组
					moveBigObj.smallTitle.splice(this.pageStatic.moveQuestion.currentGroupIndex,1);
				}
				//排序
				this.bigTitSort();
				this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);

			}
			this.pageStatic.moveQuestion.display = false;
		},
		//移动弹框取消按钮
		moveCancel (){
			this.pageStatic.moveQuestion.display = false;
		},
 		//小题确认按钮（拆分/编辑）
 		smallSure (quesI,questionBox,index,groupIndex,quesIndex){
 			//当前小题，小题盒子，大题下标，题组下标，当前小题下标
// 			console.log(quesI)
// 			console.log(this)
			let _this = this;
			
			if(quesI.split){//拆分状态
				this.$parent.$parent.confirmFn('确认拆分此小题吗?',function (state){
     				if(state == 'sure'){
     					quesI.state = false;
						quesI.btnConfirm = false;
						quesI.btnOperation = true;
     					let ue = _this.$refs[(index - 0 + 1) + "-" + (groupIndex - 0 + 1) + "-" + (quesIndex - 0 + 1)][0].editor;
						let splitlabel = "<split-text></split-text>";
						ue.execCommand("inserthtml", splitlabel, true);
						let text = ue.body.innerHTML.substring(0,ue.body.innerHTML.indexOf(splitlabel));
						let regSplitlabel = /<split-text><\/split-text>/g;
						let splitText = ue.body.innerHTML
							.substring(ue.body.innerHTML.indexOf(splitlabel))
							.replace(regSplitlabel, "");
		//				console.log(text)
		//				console.log(splitText)
		//				console.log(questionBox)
						quesI.questionContent[0] = text;
		                quesI.questionContentCopy[0] = text;
		                let groupObj = JSON.parse(JSON.stringify(_this.groupDataFormat));
		                groupObj.group = '';
						groupObj.groupCopy = '';
						let obj = JSON.parse(JSON.stringify(quesI));
						obj.questionContent[0] = splitText;
						obj.questionContent[1] = "";
						obj.questionContent[2] = "";
						obj.questionContentCopy[0] = splitText;
						obj.questionContentCopy[1] = "";
						obj.questionContentCopy[2] = "";
						groupObj.content.push(obj);
						_this.allData.analysisData[index].smallTitle.splice(groupIndex + 1,0,groupObj);
						console.log(_this.allData.analysisData[index].smallTitle[groupIndex + 1])
						//排序
						_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
						_this.$parent.$parent.timingFn('success','拆分完成');
     				}
 				});
				
				
			}else{//编辑状态
				quesI.state = false;
				quesI.btnConfirm = false;
				quesI.btnOperation = true;
				quesI.questionContent[0] = quesI.questionContentCopy[0];
				quesI.questionContent[1] = quesI.questionContentCopy[1];
				quesI.questionContent[2] = quesI.questionContentCopy[2];
			}
 		},
 		//小题拆分按钮
 		smallSplit (quesI,index){
 			quesI.split = true;
 			quesI.state = true;
			quesI.btnConfirm = true;
			quesI.btnOperation = false;
 		},
 		//小题删除按钮
 		smallDelete (quesI,index,groupIndex,quesIndex){
 			//index：大题下标	groupIndex：题组下标  quesIndex：小题下标
 			let _this = this;
 			if(this.allData.analysisData[index].smallTitle[groupIndex].groupTitState){//题组显示
 				if(this.allData.analysisData[index].smallTitle[groupIndex].content.length == 1){
 					this.$parent.$parent.confirmFn('题组只有1道小题，删除将解散题组',function (state){
         				if(state == 'sure'){
         					_this.allData.analysisData[index].smallTitle.splice(groupIndex,1);
         					//排序
							_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
         					_this.$parent.$parent.timingFn('success','删除成功');
         				}
     				});
 				}else if(this.allData.analysisData[index].smallTitle[groupIndex].content.length > 1){
 					this.$parent.$parent.confirmFn('确认删除此小题吗?',function (state){
	     				if(state == 'sure'){
 							_this.allData.analysisData[index].smallTitle[groupIndex].content.splice(quesIndex,1);
	     					//排序
							_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
	     					_this.$parent.$parent.timingFn('success','删除成功');
	     				}
	 				});
				}
 			}else{//非题组显示
 				this.$parent.$parent.confirmFn('确认删除此小题吗?',function (state){
     				if(state == 'sure'){
     					_this.allData.analysisData[index].smallTitle.splice(groupIndex,1);
     					//排序
						_this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
     					_this.$parent.$parent.timingFn('success','删除成功');
     				}
 				});
 			}
 		},
   		//小题与上题合并
   		smallMergeQues (quesI,quesIndex,groupI,groupIndex,index){
   			//当前小题  当前小题下标  当前组  当前组下标  大题下标
   			let prevT = this.allData.analysisData[index].smallTitle[groupIndex - 1];
   			if(groupI.groupTitState){
   				if(quesIndex > 0){
   					groupI.content[quesIndex - 1].questionContent.forEach(function (e,i){
   						groupI.content[quesIndex - 1].questionContent[i] += groupI.content[quesIndex].questionContent[i];
   						groupI.content[quesIndex - 1].questionContentCopy[i] += groupI.content[quesIndex].questionContent[i];
   					});
   					groupI.content.splice(quesIndex,1);
   				}
   			}else{
	   			prevT.content[prevT.content.length - 1].questionContent.forEach(function (e,i){
	   				prevT.content[prevT.content.length - 1].questionContent[i] += quesI.questionContent[i];
	   				prevT.content[prevT.content.length - 1].questionContentCopy[i] += quesI.questionContent[i];
	   			});
	 			this.allData.analysisData[index].smallTitle.splice(groupIndex,1);
   			}
   			//排序
			this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
   		},
 		//小题与上题合并为题目组
 		smallMergeGroup (quesI,quesIndex,index,groupIndex){
 			//quesI：当前小题，quesIndex：当前小题下标，index：大题下标 ，groupIndex：当前题组下标
 			this.allData.analysisData[index].smallTitle[groupIndex - 1].content.push(quesI);
 			this.allData.analysisData[index].smallTitle[groupIndex - 1].groupTitState = true;
 			this.allData.analysisData[index].smallTitle[groupIndex].content.splice(quesIndex,1);
 			if(this.allData.analysisData[index].smallTitle[groupIndex].content.length == 0){
 				this.allData.analysisData[index].smallTitle.splice(groupIndex,1);
 			}
 		},
 		//小题移出题目组
 		smallMoveOutGroup (index,groupIndex,quesIndex){
 			let _this = this;
 			let moveBigObj = this.allData.analysisData[index];
			let moveGroupObj = moveBigObj.smallTitle[groupIndex];
			
			if(moveGroupObj.content.length > 1 &&　quesIndex == moveGroupObj.content.length - 1){
				let arr = moveGroupObj.content.splice(quesIndex,1);
				let groupFormat = JSON.parse(JSON.stringify(this.groupDataFormat));
				groupFormat.content.push(arr[0]);
				moveBigObj.smallTitle.splice(groupIndex+index+1,0,groupFormat);
				if(quesIndex == 0){
					moveBigObj.smallTitle.splice(groupIndex,1);
				}
				//排序
				this.bigTitSort();
				this.titlePatternSort(this.allData.pageRelated.titleNaturalOrder);
				
				this.$parent.$parent.timingFn('success','已移出');
			}else{
				let tipWord = (moveGroupObj.content.length == 1 && quesIndex == moveGroupObj.content.length - 1) ? '移出小题将解散题组' : '将移出小题后所有小题';
				this.$parent.$parent.confirmFn(tipWord,(state) => {
					if(state == 'sure'){
						let arr = moveGroupObj.content.splice(quesIndex,moveGroupObj.content.length-quesIndex);
						if(arr.length == 1){
							let groupFormat = JSON.parse(JSON.stringify(this.groupDataFormat));
							groupFormat.content.push(arr[0]);
							moveBigObj.smallTitle.splice(groupIndex+index+1,0,groupFormat);
						}else if(arr.length > 1){
							arr.forEach((ele,index)=>{
								let groupFormat = JSON.parse(JSON.stringify(_this.groupDataFormat));
								groupFormat.content.push(ele);
								moveBigObj.smallTitle.splice(groupIndex+index+1,0,groupFormat);
							});
						}
						if(quesIndex == 0){
							moveBigObj.smallTitle.splice(groupIndex,1);
						}
						//排序
						this.bigTitSort();
						this.titlePatternSort(_this.allData.pageRelated.titleNaturalOrder);
					
						this.$parent.$parent.timingFn('success','已移出');
					}
				});
			}
 		},
 		//小题题型下拉框
 		smallType (allObj,selected){
 			//console.log(allObj)
 			//console.log(selected)
 			//单选2 多选4 完形有答案区间
 			if(selected == 2 || selected == 4 || selected == 7){
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
   			allObj.quzSection.forEach((ele,i) => {
   				ele.state = false;
   			});
   			currentObj.state = true;
			allObj.questionContent[2] = currentObj.name;
			allObj.questionContentCopy[2] = currentObj.name;
 		},
 		//小题多选按钮
 		smallcheckChoose (allObj,currentObj){
   			currentObj.state = !currentObj.state;
   			let str = '';
   			allObj.quzSection.forEach((ele,i) => {
				if(ele.state){
					str += ',' + ele.name;
				}
   			});
   			allObj.questionContent[2] = str.substring(1);
   			allObj.questionContentCopy[2] = str.substring(1);
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
   			previous.questionContent[2] = current;
   			previous.questionContentCopy[2] = current;
   			this.allData = JSON.parse(JSON.stringify(this.allData));
 		},
 		//返回列表
 		returnList (){
 			this.$router.push({
                path : '/index/testPaper/testList',
                query : {}
           	});
 		},
 		//上一步（返回上传页)
 		previousStep (){
 			this.$router.push({
                path : '/index/testPaper/process/uploadFile',
                query : {
//              	headInfo : this.$route.query.headInfo 	//考试信息相关
                }
           	});
		 },
		 //判断是否有未上传图片
		 findWordImg (){
			// console.log(this.$children[0].editor.body.innerHTML)
			// var arg = UE.getEditor('editor').getContent();
			var arg = "";
			this.allData.analysisData.forEach(e=>{
				e.smallTitle.forEach(e1=>{
					e1.content.forEach(e2=>{
						e2.questionContent.forEach(e3=>{
							arg += e3
						})
					})
				})
			})
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
 		//提交数据(设置答案页)
 		submitData (){
			console.log(this.allData);
			console.log(this.findWordImg())
			if(this.findWordImg ()){
				this.$parent.$parent.timingFn("warning","请上传图片");
			}else{
				// 设置题组类型
				this.allData.analysisData.forEach(function (e,i){
					e.smallTitle.forEach((groupE,groupI) => {
						groupE.groupType = e.sectionType;
					});
				});
				wordRelevant.submitAllData(this.allData).then(res => {
					console.log(res);
					if(res.status == 200){
						this.$router.push({
							path : '/index/testPaper/process/setAnswer',
							query : {
	//	                        paperMsg : JSON.stringify(res.data.data)
	//							paperResId : res.data.data.paperResId
							}
						});
					}
				}).catch(e => {
					
				});
			}	
 		},
 		//获取数据
 		obtainData (){
 			wordRelevant.echoAllData({"paperResId" : this.allData.paperResId,"step":"2"}).then(res => {
				console.log(res);
				if(res.status == 200){
					this.allData = res.data.data;
		            //大题类型
					if(this.allData.analysisData[0].sectionType == ""){
						this.allData.analysisData.forEach(function (e,i){
							_this.bigTypeArr.forEach(function (ele,index){
								console.log(e.topicNumber)
								if(e.topicNumber.indexOf(ele.name) != -1){
									e.sectionType = ele.type;
								}
							});
						})
					}
				}
			}).catch(e => {
				
			});
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
//		this.load ();
//		this.confirm ();
//		this.time ();
	},
	//架构加载之前
	created() {
		
//		console.log(this.$route.query.paperResId);
		console.log(this.$route.query.pageState);
		console.log(this.$route.query.step);
//		console.log(JSON.parse(this.$route.query.headInfo));
//		this.allData.analysisData = this.parsingDocuments();
//		console.log(this.allData.analysisData)
//		this.wordData()
		
		//获取考试信息相关
		let sessionInfo = JSON.parse(sessionStorage.getItem('examInfo'));
		this.allData.headInfo = sessionInfo.headInfo;
		this.allData.paperResId = sessionInfo.id;
		console.log(this.allData)
		
		if(this.$route.query.step == 1){//新建无题页面
			this.questionTypeData();
			console.log("<div id='dd'>" + sessionStorage.getItem('newPaperMsg') + "</div>")
			this.allData.analysisData = this.parsingDocuments('<div id="dd">' + sessionStorage.getItem('newPaperMsg') + '</div>');
		}else if(this.$route.query.step == undefined){//有题页面回显(列表页或设置答案页返回)
			wordRelevant.echoAllData({"paperResId" : this.allData.paperResId,"step":"2"}).then(res => {
				console.log(res);
				if(res.status == 200){
					this.allData = res.data.data;
					console.log(this.allData)
		            //大题类型
					if(this.allData.analysisData[0].sectionType == ""){
						this.allData.analysisData.forEach(function (e,i){
							_this.bigTypeArr.forEach(function (ele,index){
								console.log(e.topicNumber)
								if(e.topicNumber.indexOf(ele.name) != -1){
									e.sectionType = ele.type;
								}
							});
						})
					}
				}
			}).catch(e => {
				
			});
		}
	},
	components: {
　　		VueUeditorWrap 	
　　}
}
