//文本编辑
import '../../../static/ueditor/ueditor.config.js';
import '../../../static/ueditor/ueditor.all.js';
//语言
import '../../../static/ueditor/lang/zh-cn/zh-cn.js';
//数学公式
import '../../../static/ueditor/kityformula-plugin/addKityFormulaDialog.js';
import '../../../static/ueditor/kityformula-plugin/getKfContent.js';
import '../../../static/ueditor/kityformula-plugin/defaultFilterFix.js';
import VueUeditorWrap from "vue-ueditor-wrap";
import {wordRelevant,configure} from '@/api'



export default {
    name: 'answerCard1',
    data() {
        return {
			halfFrame:false,
			aaa:{},
			configure:{},
            arr : ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","二十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十","三十一","三十二","三十三","三十四","三十五","三十六","三十七","三十八","三十九","四十","四十一","四十二","四十三","四十四","四十五","四十六","四十七","四十八","四十九","五十"],
            myConfig: {
	            UEDITOR_HOME_URL: "/static/ueditor/",
	            // 编辑器不自动被内容撑高
				autoHeightEnabled: false,
	            // 工具栏是否可以浮动
	            autoFloatEnabled: false,
	            // 初始容器高度
				initialFrameHeight:168,
				wordCount:false,
				fontsize:[10, 11, 12, 14, 16, 18, 20, 24],
				toolbars: [
					["undo","redo","bold","italic","fontfamily","fontsize","underline","strikethrough","subscript","superscript","justifyleft","justifyright","justifycenter","justifyjustify", ]
				],
	            // 关闭自动保存
	            enableAutoSave: true
			},
            all: {
				// 原卷任务id
				paperMarkingTaskId:"",
				// 答题卡id
				answerSheetId:"",
            	//  标题
            	textMessage:{
            		content:"<p style='line-height: 2em;text-align: center;font-size:20px;'>考试<p>",
            		showFlag: true,
            		showFlag1: true,
            		w:673,
            		h:40,
            	},
				// 题号
				sortType:"整卷从1开始顺序递增",
				// 空白答卷    卷卡和合一
				scantronType:0,
				arrayWay:1,
				// 本平台     其他平台
				markingMode:0,
				//  答题卡类型
            	scantronFormat:1,
				//  密封线
            	pottedLine:false,
//          	每页显示学生信息
            	showPageInfo:false,
//          	考试号
            	numberFormat:{
            		content:1
            	},
//          	注意事项
            	existAttentionMatters:{
            		bol:true
            	},
//          	缺考标记
				markingMissExamination:{
					bol:true
				},
//				打印格式
				printFormat:0, 
//				客观题选项竖排				
				existVerticalRow:false,
//				判断题选项使用
				existChoiceFigure:false,
				// 学生信息
                basicInfor : [
                	{ name: '学校', bol: true }, 
                	{ name: '姓名', bol: true }, 
                	{ name: '班级', bol: true },
                	{ name: '学号', bol: true }, 
                	{ name: '考场', bol: true },
				],
				basicInfor1:{},
				// 总分
				sheetTotalScore:"",
				// 多少页
				paperCount:this._num,
				// 是否保存
				hasSaved:"0",
				
				rect:{},
				sheetHtmlContent:"",
                arr:[],
            },
//          带坐标点的数据
            rendering:{
            	arr1:[],
            	arr2:[]
            },
            // 弹框
            bounced:{
                // 学生信息
                basicInfor:{
                    //控制显示隐藏
                    isShow: false,
                    //数据
                    arr: [
                        { name: '学校', bol: false },
                        { name: '姓名', bol: false },
                        { name: '考号', bol: false },
                        { name: '班级', bol: false },
                        { name: '学号', bol: false },
                        { name: '考场', bol: false },
                        { name: '座号', bol: false }
                    ]
				},
				//定时提示框
				timingBox : {
					open : false,
					type : '',
					tipWord : ''
				},
//              考试号位数弹框
                numberFormat:{
                	isShow:false,
                	num: '12',
                	num1: '12',
				},
				// 插入图片
				insertPictur:{
					isShow:false,
					region:"left"
				},
//				新增客观题弹框
				addObjective:{
					isShow:false,
					titleNumber:"一",
					questionType:"",
					title:"" ,
					type:"add",
					perGroup:3,
					choiceQuestions:[]
				},
				//新增填空题
				addCompletion:{
					isShow:false,
					titleNumber:"",
					title:"填空题",
					questionType:"填空题",
					type:"add",
					choiceQuestions:[{
						number:"",
						score:"",
						itemAssignment:false,
						option:"5",
						arr:[]
					}]
				},
				//新增解答题
				addAnswer:{
					isShow:false,
					titleNumber:"",
					title:"解答题" ,
					questionType:"解答题",
					type:"add",
					choiceQuestions:[{
						number:"",
						score:"",
						itemAssignment:false,
						answerLine:false,
						arr:[]
					}]
				},
				//新增作文题
				addComposition:{
					isShow:false,
					titleNumber:"",
					title:"作文题",
					questionType:"14",
					type:"add",
					choiceQuestions:[{
						number:"",
						arr:[]
					}]
				},
				// 选做题
				addOptional:{
					isShow:false,
					titleNumber:"",
					title:"选做题",
					questionType:"15",
					type:"add",
					choiceQuestions:[{
						number:"",
						number1:"1",
						score:"",
						arr:[]
					}]
				},
				//题干区
				topicArea:{
					isShow:false,
					arr:[]
				},
				// 禁答区
				noAnswerZone:{
					isShow:false,
					rowNumber:"",
					titleNumber:"",
					id:""
				},
				// 卷卡合一
				chooseTest:{
					bol:false,
					gradeNum:0,
					evaluateNum:0,
					testPaper:[
					],
					questionsList:[]
				} 
            },
//          按钮状态
            btnState:{
//          	学生信息编辑
            	basicInfor:{
            		isShow:false,
            	},
//          	考试号位数编辑
            	numberFormat:{
            		isShow:false,
            	}
            },
//          右边数据
            right:{
                titleNumber:{
                    isShow:false,
					arr:["整卷从1开始顺序递增","每大题下均从1顺序递增"],
                }
            },
//          拖拽时,按下不跟新坐标
			execution:true,
//			保存编辑器信息
			obj:{
				type:"",
				number:"",
				item:"",
				bol:""
			},
			// 上传保存信息
			obj1:{
			},
			region:{
				str:"",
				obj:"",
				number:""
			},
        }
    },
    methods:{
		request1(){
			wordRelevant.getTestListData({
				gradeId: this.bounced.chooseTest.testPaper[this.bounced.chooseTest.gradeNum].id,
				type:this.bounced.chooseTest.testPaper[this.bounced.chooseTest.gradeNum].arr[this.bounced.chooseTest.evaluateNum].id
			}).then(res=>{
				this.bounced.chooseTest.questionsList = res.data.data.list;
				if(this.bounced.chooseTest.questionsList.length>0){
					this.bounced.chooseTest.questionsList.forEach(ele=>{
						ele.bol = false;
					})
				}
			})
		},
		// 从组卷选择弹框
		testCancel(){
			this.bounced.chooseTest.gradeNum = -1;
			this.bounced.chooseTest.evaluateNum = 0;
			this.bounced.chooseTest.bol = !this.bounced.chooseTest.bol;
			this.selectiveGrade(0)
		},
		// 选择试卷
		election(index){
			console.log(index)
			this.bounced.chooseTest.questionsList.forEach(ele=>{
				ele.bol = false;
			})
			this.bounced.chooseTest.questionsList[index].bol = true;
		},
		// 确定
		testConfirm(){
			console.log(this.bounced.chooseTest.questionsList)
			let id = "";
			this.bounced.chooseTest.questionsList.forEach(ele=>{
				if(ele.bol){
					id = ele.id;
				}
			})
			wordRelevant.integration({id:id}).then(res=>{
				console.log(res)
				this.all.arr = res.data.data.sectionGroupQuzList;
				this.calculatedC()
				this.testCancel();
			});
		},
		// 选择年级
		selectiveGrade(index){
			if(this.bounced.chooseTest.gradeNum == index){
				this.bounced.chooseTest.gradeNum = -1;
			}else{
				this.bounced.chooseTest.gradeNum = index;
				this.bounced.chooseTest.evaluateNum = 0;
			}
			if(this.bounced.chooseTest.gradeNum >= 0){
				this.request1();
			}
		},
		// 选择类型
		choiceExamination(index1){
			this.bounced.chooseTest.evaluateNum = index1;
			this.request1();
		},
		// 返回
		jump(){
			this.$router.push({path:"/index/readPaper/admin/platform",query:this.aaa})
		},
//  	选择题号的显示隐藏
    	choiceTh(){
			this.right.titleNumber.isShow = !this.right.titleNumber.isShow;
		},
//		选择题号的点击事件
		choiceTh1(item){
			this.all.sortType = item;
			this.right.titleNumber.isShow = !this.right.titleNumber.isShow;
			this.itemNumberSorting();
		},
//	 	题号排序
		itemNumberSorting(){
			let i = 0;
			this.all.arr.forEach((ele,index)=>{
				if(!ele.content){
					return;
				}else{
					ele.number = this.arr[i];
					i++;
				}
			})
			if(this.all.sortType== "整卷从1开始顺序递增"){
				let num = 0;
				this.all.arr.forEach(ele=>{
					if(!ele.content){
						return;
					}else{
						ele.content.forEach(ele1=>{
							ele1.arr.forEach(ele2=>{
								num += 1;
								ele2.num.content = num;
							})
						})
					}
				})
			}else{
				this.all.arr.forEach(ele=>{
					if(!ele.content){
						return;
					}else{
						ele.content.forEach((ele1,index)=>{
							ele1.arr.forEach((ele2,index1)=>{
								ele2.num.content = index1+1;
							})
						})
					}
				})
			}
		},
//  	选择答题卡类型
		scantronFormat(num){
			this.all.scantronFormat = num;
		},
//		选择是否有密封线
		pottedLine(){
			if(this.all.pottedLine  && this.all.showPageInfo){
				this.all.showPageInfo =false;
			}
			if(this.all.pottedLine  && this.all.numberFormat.content == 1){
				this.all.numberFormat.content = 2;
			}
			if(!this.all.pottedLine  && this.all.printFormat == 1){
				this.all.printFormat = 0;
			}
			this.calculatedC();
		},
//		判断题选项使用
		judge(){
			this.all.arr.forEach((ele,index)=>{
				if(ele.questionType == "1"){
					ele.content.forEach((ele1,index1)=>{
						ele1.arr.forEach((ele2,index2)=>{
							if(this.all.existChoiceFigure){
								ele2.options[0].content = "√"
								ele2.options[1].content = "×"
							}else{
								ele2.options[0].content = "T"
								ele2.options[1].content = "F"
							}
//							
						})
					})
				}
			})
			this.calculatedC();
		},
//		标题鼠标滑过
		headingAcross(){
			if(this.all.textMessage.showFlag1){
				this.all.textMessage.showFlag1 = false;
			}
		},
//		标题鼠标离开
		headingAway(){
			this.all.textMessage.showFlag1 = true;
		},
//		标题点击拖动
		drag(e){
			let mt = e.clientY;
			e.preventDefault();
			let _this =this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveY = e.clientY - mt;
				mt = e.clientY;
				if(_this.all.textMessage.h + moveY<=30){
					_this.all.textMessage.h = 30;
				}else{
					_this.all.textMessage.h = _this.all.textMessage.h + moveY;
				}
			};
		},
//		点击标题出现编辑器
		titleEditing(){
			this.bodyListener();
			this.myConfig.initialFrameHeight = this.all.textMessage.h;
			this.myConfig.toolbars =[
				["undo","redo","bold","italic","fontfamily","fontsize","underline","strikethrough","subscript","superscript","lineheight","justifyleft","justifyright","justifycenter","justifyjustify","aaaaa","bbbbb" ]
			];
			this.all.textMessage.showFlag=false; 
		},
//		大题标题滑过显示
		subjectAcross(item){
			this.all.arr.forEach((ele,index)=>{
				if(ele.number ==  item.number){
					ele.infor.font.content = item.infor.font.content;
					if(ele.infor.font.showFlag){
						ele.infor.font.showFlag1 = false;
					}
				}
			})
      		this.calculatedC();
		},
//		大题标题离开隐藏
		subjectAway(item){
			this.all.arr.forEach((ele)=>{
				if(ele.number ==  item.number){
					ele.infor.font.showFlag1 = true;
					ele.infor.font.content = item.infor.font.content;
				}
			})
			this.calculatedC();
		},
//		大题标题点击显示编辑器
		subjectEditing(item){
			this.bodyListener();
			this.myConfig.toolbars =[
				["undo","redo","bold","italic","fontfamily","fontsize","underline","strikethrough","subscript","superscript","lineheight","justifyleft","justifyright","justifycenter","justifyjustify","aaaaa","bbbbb" ]
			];
			this.all.arr.forEach((ele)=>{
				if(ele.number ==  item.number){
					this.myConfig.initialFrameHeight = ele.infor.font.h;
					this.obj.type="title";
					this.obj.number = item.number;
					ele.infor.font.showFlag = false;
				}
			})
			this.calculatedC();
				setTimeout(()=>{
					this.$children[0].editor.ready(()=>{
						this.$children[0].editor.body.style.margin = 0;
					})
				},0)

		},
		drag1(e,item){
			let mt = e.clientY;
			e.preventDefault();
			let _this =this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveY = e.clientY - mt;
				mt = e.clientY;
				_this.all.arr.forEach((ele,index)=>{
					if(ele.number == item.number){
						if(ele.infor.font.h + moveY<=20){
							ele.infor.font.h = 20;
						}else{
							ele.infor.font.h = ele.infor.font.h + moveY;
						}
					}
				})
			};
		},
//		学生信息编辑按钮点击事件
		basicInforShow(){
			this.bounced.basicInfor.isShow = true;
			this.bounced.basicInfor.arr.forEach(element => {
				this.all.basicInfor.forEach(ele => {
					if (element.name == ele.name) {
						element.bol = ele.bol;
					}
				});
			});
		},
//      学生信息编辑按钮划过显示
		basicInforShow1() {
			this.btnState.basicInfor.isShow = true;
		},
//      学生信息编辑按钮离开取消
		basicInforShow2() {
			this.btnState.basicInfor.isShow = false;
		},
		//学生信息弹框取消
		basicInforCancel(){
			this.bounced.basicInfor.isShow = false;
		},
		//学生信息弹框确认
		basicInforConfirm(){
			let bol = this.bounced.basicInfor.arr.some(element => {
				return element.bol
			});
			if(bol){
				this.bounced.basicInfor.isShow = false;
				this.all.basicInfor=[];
				this.bounced.basicInfor.arr.forEach(element => {
					if(element.bol){
						this.all.basicInfor.push(element)
					}
				});
				this.calculatedC();
			}else{
				this.bounced.timingBox.open = true;
				this.bounced.timingBox.type = "fail";
				this.bounced.timingBox.tipWord = "至少选一项";
				setTimeout(()=>{
					this.bounced.timingBox.open = false;
				},1500);
			}
//			
		},
		numberFormat(){
			
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(this.bounced.numberFormat.num1)){
				this.bounced.numberFormat.num1 = "";
			}
		},
		numberFormatShow(){
			this.bounced.numberFormat.isShow = true;
		},
//		考试号编辑按钮划过显示
		numberFormatShow1(){
			this.btnState.numberFormat.isShow = true;
		},
//		考试号编辑按钮划离开取消
		numberFormatShow2(){
			this.btnState.numberFormat.isShow = false;
		},
//		考试号弹框取消
		numberFormatCancel(){
			this.bounced.numberFormat.isShow=false;
		},
//		考试号弹框确定
		numberFormatConfirm(){
			if (Number(this.bounced.numberFormat.num1) > 12 || Number(this.bounced.numberFormat.num1) < 4) {
				this.bounced.timingBox.open = true;
				this.bounced.timingBox.type = "fail";
				this.bounced.timingBox.tipWord = "数值不符合条件";
				setTimeout( ()=>{
					this.bounced.timingBox.open = false;
				},1500);
			}else{
				this.bounced.numberFormat.num = this.bounced.numberFormat.num1;
				this.bounced.numberFormat.isShow=false;
				this.calculatedC();
			}
		},
		//新增客观题显示隐藏
		xzkgtshow(){
			this.bounced.addObjective.isShow =  true;
			this.bounced.addObjective.type = "add";
			this.bounced.addObjective.titleNumber = this._arr[0];
		},
		// 新增客观题取消
		xzkgtshow1(){
			this.bounced.addObjective = {
				isShow:false,
				titleNumber:"",
				questionType:"",
				title:"" ,
				type:"add",
				perGroup:3,
				choiceQuestions:[]
			}
		},
		// 新增客观题确认
		xzkgtconfirm(){
			this.region.str = "";
			let  obj = {
				number:this.bounced.addObjective.titleNumber,
				title:this.bounced.addObjective.title,
				questionType:this.bounced.addObjective.questionType,
				objSubFlag:0,
				content:[],
				perGroup:this.bounced.addObjective.perGroup,
				infor:{
					rect:{

					},
					font:{
						content:"<p style='font-size:16px;'>"+this.bounced.addObjective.titleNumber +"、" + this.bounced.addObjective.title +"</p>",
						h:20,
						showFlag:true,
						showFlag1:true,
					}
				},
				bol:false
			};
			let arr = ["A","B","C","D","E","F","G","H","I","J"];
			let num1  = 0;
			this.bounced.addObjective.choiceQuestions.forEach((e,i)=>{
				let obj1 = {
					itemAssignment:e.itemAssignment,
					itemSetting: e.itemSetting,
					number: e.number,
					option: e.option,
					score: e.score,
					arr:[]
				}
				if(this.bounced.addObjective.questionType == "4"){
					obj1.missedScore = e.missedScore
				}
				e.arr.forEach(ele=>{
					num1 += Number(ele.score);
					let options = [];
					if(this.bounced.addObjective.questionType == "1"){
						if(this.all.existChoiceFigure){
							options.push({content:"√"})
							options.push({content:"×"})
						}else{
							options.push({content:"T"})
							options.push({content:"F"})
						}
						
					}else{
						for(let i=0;i<ele.option;i++){
							options.push({
								content:arr[i]
							})
						}
					}
					if(this.bounced.addObjective.questionType == "4"){
						obj1.arr.push({
							num:{content:ele.num},
							options:options,
							score:ele.score,
							missedScore:ele.missedScore,
						})
					}else{
						obj1.arr.push({
							num:{content:ele.num},
							options:options,
							score:ele.score,
						})
					}
				})
				obj.content.push(obj1);
			})
			
			obj.fraction = num1;
			let num;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == obj.number){
					num = index;
				}
			})
			if(this.bounced.addObjective.type == "add"){
				if(num){
					this.all.arr.splice(num,0,obj)
				}else{
					this.all.arr.push(obj)
				}
			}else{
				this.all.arr.splice(this.bounced.addObjective.type-0,1);
				this.all.arr.splice(num,0,obj)
			}
			
			this.itemNumberSorting();
			this.calculatedC();
			this.bounced.addObjective = {
				isShow:false,
				titleNumber:"",
				questionType:"",
				title:"" ,
				type:"add",
				perGroup:3,
				choiceQuestions:[]
			}
		},
		//客观题题型选择
		xzkgttx(){
			if(this.bounced.addObjective.questionType == "1"){
				this.bounced.addObjective.title = "判断题"
			}else  if(this.bounced.addObjective.questionType == "2"){
				this.bounced.addObjective.title = "单选题"
			}else  if(this.bounced.addObjective.questionType == "4"){
				this.bounced.addObjective.title = "多选题"
			}
			this.bounced.addObjective.choiceQuestions = [];
			if(this.bounced.addObjective.questionType == "1"){
				this.bounced.addObjective.choiceQuestions.push({
					number:"",
					score:"",
					missedScore:"",
					itemAssignment:false,
					option:"2",
					itemSetting:false,
					arr:[
					]
				})
			}else{
				this.bounced.addObjective.choiceQuestions.push({
					number:"",
					score:"",
					missedScore:"",
					itemAssignment:false,
					option:"4",
					itemSetting:false,
					arr:[
					]
				})
			}
		},
		//客观题单题设分
		kgtSetPoints(index){
			this.bounced.addObjective.choiceQuestions[index].itemAssignment = !this.bounced.addObjective.choiceQuestions[index].itemAssignment;
			this.bounced.addObjective.choiceQuestions[index].score = "";
			this.bounced.addObjective.choiceQuestions[index].missedScore = "";
		},
		//客观题单题设项
		kgtSetItem(index){
			this.bounced.addObjective.choiceQuestions[index].itemSetting = !this.bounced.addObjective.choiceQuestions[index].itemSetting;
			this.bounced.addObjective.choiceQuestions[index].option = "";
		},
		// 客观题共多少题的失焦事件
		xzduonum(index){
			if(this.bounced.addObjective.choiceQuestions[index].number == "0"){
				this.bounced.addObjective.choiceQuestions[index].arr = [];
				this.bounced.addObjective.choiceQuestions[index].number = "";
				return;
			}
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addObjective.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
				
			})
			this.bounced.addObjective.choiceQuestions[index].arr = [];
			if(this.all.sortType == "整卷从1开始顺序递增"){
				for(let i =0;i<this.bounced.addObjective.choiceQuestions[index].number;i++){
					this.bounced.addObjective.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						option:this.bounced.addObjective.choiceQuestions[index].option,
						missedScore:""
					})
				}
				this.bounced.addObjective.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				for(let i =0;i<this.bounced.addObjective.choiceQuestions[index].number;i++){
					this.bounced.addObjective.choiceQuestions[index].arr.push({
						num:i+1,
						score:"",
						option:this.bounced.addObjective.choiceQuestions[index].option,
						missedScore:""
					})
				}
				let a = 1;
				this.bounced.addObjective.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
			this.xzduooption(index);
			this.xzduoScore(index);
			this.xzduoMissed(index)
		},
		// 客观题共多少题的验证
		xzduonum1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
		},
		//  客观题每题多少分的失焦事件
		xzduoScore(index){
			if(this.bounced.addObjective.choiceQuestions[index].score == 0){
				this.bounced.addObjective.choiceQuestions[index].score = "";
				return;
			}
            this.bounced.addObjective.choiceQuestions[index].arr.forEach(ele=>{
				ele.score = this.bounced.addObjective.choiceQuestions[index].score;
			})
		},
		//  客观题每题多少分的验证
		xzduoScore1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.score)){
				item.score = "";
			}
		},
		// 客观题每题多少项失焦事件
		xzduooption(index){
			if(this.bounced.addObjective.choiceQuestions[index].option == 0){
				this.bounced.addObjective.choiceQuestions[index].option = "";
				return;
			}
			if(this.bounced.addObjective.choiceQuestions[index].option > 10){
				this.bounced.addObjective.choiceQuestions[index].option = 10;
			}
			this.bounced.addObjective.choiceQuestions[index].arr.forEach(ele=>{
				ele.option = this.bounced.addObjective.choiceQuestions[index].option;
			})
		},
		// 客观题每题多少项验证
		xzduooption1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.option)){
				item.option = "";
			}
		},
		//  客观题漏选得分的失焦事件
		xzduoMissed(index){
			this.bounced.addObjective.choiceQuestions[index].arr.forEach(ele=>{
				ele.missedScore = this.bounced.addObjective.choiceQuestions[index].missedScore;
			})
		},
		//  客观题漏选得分的验证
		xzduoMissed1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.missedScore)){
				item.missedScore = "";
			}
		},
		// 客观题删除题目
		deletekgt(index,index1){
			this.bounced.addObjective.choiceQuestions[index].number = this.bounced.addObjective.choiceQuestions[index].number-1;
			this.bounced.addObjective.choiceQuestions[index].arr.splice(index1,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addCompletion.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addObjective.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addObjective.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		deletekgt1(index){
			this.bounced.addObjective.choiceQuestions.splice(index,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addCompletion.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addObjective.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addObjective.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 客观题鼠标划入
		kgtmovej(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.bol = true;
					if(ele.topicArea){
						ele.topicArea.words[0] = item.topicArea.words[0];
						ele.topicArea.words[1] = item.topicArea.words[1];
					}
				}
			})
			this.calculatedCoordinates();
		},
		// 客观题鼠标划出
		kgtmovec(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.bol = false;
					if(ele.topicArea){
						ele.topicArea.words[0] = item.topicArea.words[0];
						ele.topicArea.words[1] = item.topicArea.words[1];
					}
				}
			})
			this.calculatedCoordinates();
		},
		// 客观题每组加
		add(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(ele.perGroup + 1 >40){
						ele.perGroup =40;
					}else{
						ele.perGroup += 1;
					}
					 
				}
			})
			this.all = JSON.parse(JSON.stringify(this.all))
			this.calculatedCoordinates();
		},
		// 客观题每组减
		jian(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(ele.perGroup - 1 == 0){
						ele.perGroup = 1
					}else{
						ele.perGroup -= 1;
					}
				}
			})
			this.all = JSON.parse(JSON.stringify(this.all)); 
			this.calculatedCoordinates();
		},
		// 客观题编辑
		kgtedit(item){
			let num ;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == item.number){
					num = index;
				}
			})
			let arr =  item.content.map(ele=>{
				let arr1 = ele.arr.map(ele1=>{
					let obj1 ={
						num:ele1.num.content,
						score:ele1.score,
						option:ele1.options.length,
						missedScore:ele1.missedScore
					}
					return  obj1;
				})
				let obj = {
					missedScore:ele.missedScore,
					itemAssignment:ele.itemAssignment,
					itemSetting:ele.itemSetting,
					number: ele.number,
					option: ele.option,
					score:ele.score,
					arr:arr1
				};
				return  obj
			})
			
			this.bounced.addObjective = {
				isShow:true,
				titleNumber:this.all.arr[num].number,
				questionType:this.all.arr[num].questionType,
				title:this.all.arr[num].title,
				type:num,
				perGroup:this.all.arr[num].perGroup,
				choiceQuestions:arr
			}
		},
		// 小题分数验证
		scoreChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.score)){
				item.score= "";
			}
		},
		// 小题多少选项验证
		optionChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.option)){
				item.option= "";
			}
		},
		// 小题漏选得分验证
		missedScoreChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.missedScore)){
				item.missedScore= "";
			}
		},
//		填空题显示
		xztktshow(){
			this.bounced.addCompletion.isShow =  true;
			this.bounced.addCompletion.titleNumber = this._arr[0];
			this.bounced.addCompletion.type ="add";
		},
		// 贴空题多少题失去焦点
		xztktnum(index){
			if(this.bounced.addCompletion.choiceQuestions[index].number == "0"){
				this.bounced.addCompletion.choiceQuestions[index].number ="";
				this.bounced.addCompletion.choiceQuestions[index].arr = [];
				return;
			}
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addCompletion.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			this.bounced.addCompletion.choiceQuestions[index].arr = [];
			if(this.all.sortType == "整卷从1开始顺序递增"){
				for(let i =0;i<this.bounced.addCompletion.choiceQuestions[index].number;i++){
					this.bounced.addCompletion.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						number:"",
						longBlank:false,
						arr:[]
					})
				}
				this.bounced.addCompletion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				for(let i =0;i<this.bounced.addCompletion.choiceQuestions[index].number;i++){
					this.bounced.addCompletion.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						number:"",
						longBlank:false,
						arr:[]
					})
				}
				let a = 1;
				this.bounced.addCompletion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
			this.xztktScore(index);
		},
		// 贴空题多少题验证
		xztktnum1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
		},
		// 填空题每题多少分的失焦事件
		xztktScore(index){
			if(this.bounced.addCompletion.choiceQuestions[index].score == "0"){
				this.bounced.addCompletion.choiceQuestions[index].score ="";
				return;
			}
			this.bounced.addCompletion.choiceQuestions[index].arr.forEach(ele=>{
				ele.score = this.bounced.addCompletion.choiceQuestions[index].score;
			})
		},
		// 填空题每题多少分验证
		xztktScore1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.score)){
				item.score = "";
			}
		},
		//填空题单题设分
		tktSetPoints(index){
			this.bounced.addCompletion.choiceQuestions[index].itemAssignment = !this.bounced.addCompletion.choiceQuestions[index].itemAssignment;
			this.bounced.addCompletion.choiceQuestions[index].score = "";
		},
		//填空题每行多少空验证
		xztktoption(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.option)){
				item.option = "";
			}else if(item.option > 5){
				item.option = 5;
			}else if(item.option < 1){
				item.option = 1;
			}
		},
		// 填空题小问数
		tktxiaowenshu(item,index,index1){
			let num ;
			if(item.score%item.number ==0 ){
				num = item.score/item.number
			}
			this.bounced.addCompletion.choiceQuestions[index].arr[index1].arr = [];
			for(let i =0;i<item.number;i++){
				if(num){
					this.bounced.addCompletion.choiceQuestions[index].arr[index1].arr.push({
						score: num.toString() 
					})
				}else{
					this.bounced.addCompletion.choiceQuestions[index].arr[index1].arr.push({
						score:  "" 
					})
				}
				
			}
			this.bounced = JSON.parse(JSON.stringify(this.bounced))
		},
		// 填空题删除
		deletetkt1(index){
			this.bounced.addCompletion.choiceQuestions.splice(index,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addCompletion.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addCompletion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addCompletion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 填空题删除
		deletetkt(index,index1){
			this.bounced.addCompletion.choiceQuestions[index].number = this.bounced.addCompletion.choiceQuestions[index].number-1;
			this.bounced.addCompletion.choiceQuestions[index].arr.splice(index1,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addCompletion.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addCompletion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addCompletion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		//添加题目
		addTitle(type){
			if(type == "客观题"){
				this.bounced.addObjective.choiceQuestions.push({
					number:"",
					score:"",
					itemAssignment:false,
					option:"4",
					arr:[]
				})
			}else if(type == "填空题"){
				this.bounced.addCompletion.choiceQuestions.push({
					number:"",
					score:"",
					itemAssignment:false,
					option:"5",
					arr:[]
				})
			}else if(type == "解答题"){
				this.bounced.addAnswer.choiceQuestions.push({
					number:"",
					score:"",
					itemAssignment:false,
					arr:[]
				})
			}else if(type == "选做题"){
				this.bounced.addOptional.choiceQuestions.push({
					number:"",
					number1:"1",
					score:"",
					arr:[]
				})
			}
			
		},
		// 填空题取消
		xztktshow1(){
			this.bounced.addCompletion = {
				isShow:false,
				titleNumber:"",
				title:"填空题",
				questionType:"填空题",
				type:"add",
				choiceQuestions:[{
					number:"",
					score:"",
					itemAssignment:false,
					option:"5",
					arr:[]
				}]
			}
		},
		// 填空题确认
		xztktconfirm(){
			this.region.str = "";
			let obj = {
				number:this.bounced.addCompletion.titleNumber,
				title:this.bounced.addCompletion.title,
				content:[],
				questionType:"3",
				objSubFlag:1,
				infor:{
					rect:{
					},
					font:{
						content:"<p style='font-size:16px;'>"+this.bounced.addCompletion.titleNumber +"、" + this.bounced.addCompletion.title +"</p>",
						h:20,
						showFlag:true,
						showFlag1:true,
					}
				},
				bol:false,
				bol1:false,
				lineHeight:8
			}
			let num1  = 0;
			let arr = [];
			this.bounced.addCompletion.choiceQuestions.forEach((item,index) =>{
				let arr1 =[];
				item.arr.forEach(ele=>{
					num1 += Number(ele.score);
					let arr2  = [];
					if(ele.arr.length>0){
						ele.arr.forEach((ele1,index1)=>{
							arr2.push({
								size:0,
								score:ele1.score,
								rect:{
								},
								font:{
								},
								content:"",
								number:1
							})
						})
					}else{
						arr2.push({
							size:0,
							score:ele.score,
							rect:{
							},
							font:{
							},
							content:"",
							number:1
						})
					}
					arr1.push({
						num:{content:ele.num},
						longBlank:ele.longBlank,
						score:ele.score,
						arr:arr2,
					})
				})
				arr.push({
					arr:arr1,
					itemAssignment:item.itemAssignment,
					number:item.number,
					option:item.option,
					score:item.score,
				})
			})
			obj.content = arr;
			obj.fraction = num1;
			let num;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == obj.number){
					num = index;
				}
			})
			if(this.bounced.addCompletion.type == "add"){
				if(num){
					this.all.arr.splice(num,0,obj)
				}else{
					this.all.arr.push(obj)
				}
			}else{
				this.all.arr.splice(this.bounced.addCompletion.type-0,1);
				this.all.arr.splice(num,0,obj)
			}
			this.itemNumberSorting();
			this.calculatedCoordinates()
			this.bounced.addCompletion = {
				isShow:false,
				titleNumber:"",
				title:"填空题",
				questionType:"填空题",
				type:"add",
				choiceQuestions:[{
					number:"",
					score:"",
					itemAssignment:false,
					option:"5",
					arr:[]
				}]
			}
		},
		// 填空题/作文题鼠标划入
		tktmovej(item){
			if(!item.bol1){
				this.all.arr.forEach(ele=>{
					if(ele.number == item.number){
						ele.bol = true;
						if(ele.topicArea){
							ele.topicArea.words[0] = item.topicArea.words[0];
							ele.topicArea.words[1] = item.topicArea.words[1];
						}
					}
				})
				this.calculatedCoordinates();
			}
		},
		// 填空题/作文题鼠标画出
		tktmovec(item){
			if(!item.bol1){
				this.all.arr.forEach(ele=>{
					if(ele.number == item.number){
						ele.bol = false;
						if(ele.topicArea){
							ele.topicArea.words[0] = item.topicArea.words[0];
							ele.topicArea.words[1] = item.topicArea.words[1];
						}
					}
				})
				this.calculatedCoordinates();
			}
		},
		// 填空题/作文题调整板式
		formatAdjustment(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.bol = false;
					ele.bol1 = true;
				}
			})
			this.calculatedCoordinates();
		},
		// 填空题/作文题调整板式退出
		formatAdjustment1(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.bol1 = false;
				}
			})
			this.calculatedCoordinates();
		},
		// 填空题加行高
		addLineHeight(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.lineHeight += 1;
				}
			})
			this.all = JSON.parse(JSON.stringify(this.all))
			this.calculatedCoordinates();
		},
		// 填空题加行减
		reduceLineHeight(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if((ele.lineHeight - 1) == 7){
						ele.lineHeight = 8
					}else{
						ele.lineHeight -= 1;
					}
				}
			})
			this.all = JSON.parse(JSON.stringify(this.all)); 
			this.calculatedCoordinates();
		},
		// 强制换行
		lineFeed(item,item1){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.content[item1.i].arr[item1.index1].arr[item1.index2].lineFeed = true;
				}
			})
			this.calculatedCoordinates();
		},
		// 取消强制换行
		lineFeedNo(item,item1){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.content[item1.i].arr[item1.index1].arr[item1.index2].lineFeed = false;
				}
			})
			this.calculatedCoordinates();
		},
		//加长度
		addchang(item,item1){
			let size = 0;
			let size1 = 0;
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(this.all.pottedLine){
						if(ele.content[0].option == "1"  ){
							size = 522;
						}else if(ele.content[0].option == "2"){
							size = 238.5;
						}else if(ele.content[0].option == "3"){
							size = 144;
						}else if(ele.content[0].option == "4"){
							size = 96.75;
						}else if(ele.content[0].option == "5" || ele.content[0].option == ""){
							size = 68.4;
						}
						size1 = 522;
					}else{
						if(ele.content[0].option == "1"  ){
							size = 618;
						}else if(ele.content[0].option == "2"){
							size = 286.5;
						}else if(ele.content[0].option == "3"){
							size = 176;
						}else if(ele.content[0].option == "4"){
							size = 120.75;
						}else if(ele.content[0].option == "5" || ele.content[0].option == ""){
							size = 87.6;
						}
						size1 = 618;
					}
					if(ele.content[item1.i].arr[item1.index1].longBlank){
						ele.content[item1.i].arr[item1.index1].arr[item1.index2].number += 1;
 					}else{
						if(ele.content[item1.i].arr[item1.index1].arr[item1.index2].size + 5 >size1 - size){
							ele.content[item1.i].arr[item1.index1].arr[item1.index2].size = size1 - size;
						}else{
							ele.content[item1.i].arr[item1.index1].arr[item1.index2].size += 5;
						}
					}
				}
			})
			this.calculatedCoordinates();
		},
		// 减长度
		jianchang(item,item1){
			let size = 0;
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					ele.content.forEach(e=>{
						if(e.option == "1"  ){
							size = this.all.rect.w - 75;
						}else if(e.option == "2"){
							size = (this.all.rect.w - 120)/2;
						}else if(e.option == "3"){
							size = (this.all.rect.w - 165)/3;
						}else if(e.option == "4"){
							size = (this.all.rect.w - 210)/4;
						}else if(e.option == "5" || e.option == ""){
							size = (this.all.rect.w - 255)/5;
						}
						if(size<55){
							size = 55;
						}
						if(ele.content[item1.i].arr[item1.index1].longBlank){
							if(ele.content[item1.i].arr[item1.index1].arr[item1.index2].number-1< 1){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].number = 1;
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].number -= 1;
							}
							
	 					}else{
							if(ele.content[item1.i].arr[item1.index1].arr[item1.index2].size - 5 < 55 - size){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].size = 55 - size;
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].size -= 5;
							}
						}
					})
				}
			})
			this.calculatedCoordinates();
		},
		// 填空题编辑
		tktedit(item){
			let num ;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == item.number){
					num = index;
				}
			})
			let arr =  this.all.arr[num].content.map(e=>{
				let arr = [] ;
				e.arr.forEach(ele=>{
					let obj;
					if(ele.arr.length == 1){
						obj = {
							longBlank:ele.longBlank,
							num:ele.num.content,
							score:ele.score,
							arr:[],
							number:""
						}
					}else{
						let arr1 = [];
						ele.arr.forEach(ele1=>{
							arr1.push(ele1.score)
						})
						obj = {
							longBlank:ele.longBlank,
							num:ele.num.content,
							score:ele.score,
							arr:arr1,
							number:arr1.length
						}
					}
					arr.push(obj)
				})
				return  {
					arr:arr,
					itemAssignment:e.itemAssignment,
					number:e.number,
					option:e.option,
					score:e.score
				}
			})
			this.bounced.addCompletion = {
				isShow:true,
				titleNumber:this.all.arr[num].number,
				questionType:this.all.arr[num].questionType,
				title:this.all.arr[num].title,
				type:num,
				choiceQuestions:arr
			}
		},
		// 小问数验证
		numberChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
		},
		// 解答题显示
		xzjdtshow(){
			this.bounced.addAnswer.isShow =  true;
			this.bounced.addAnswer.titleNumber = this._arr[0];
			this.bounced.addAnswer.type ="add";
		},
		// 解答题取消
		xzjdtshow1(){
			this.bounced.addAnswer = {
				isShow:false,
				titleNumber:"",
				title:"解答题" ,
				questionType:"解答题",
				type:"add",
				choiceQuestions:[{
					number:"",
					score:"",
					itemAssignment:false,
					answerLine:false,
					arr:[]
				}]
			}
		},
	// 解答题确认按钮
		xzjdtconfirm(){
			this.region.str = "";
			let obj = {
				number:this.bounced.addAnswer.titleNumber,
				title:this.bounced.addAnswer.title,
				objSubFlag:1,
				content:[],
				questionType:"13",
				infor:{
					rect:{
					},
					font:{
						content:"<p style='font-size:16px;'>"+this.bounced.addAnswer.titleNumber +"、" + this.bounced.addAnswer.title +"</p>",
						h:20,
						showFlag:true,
						showFlag1:true,
					}
				},
				bol:false,
			}
			// let str = '<p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a></p><p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a></p><p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a></p><p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </a></p>';
			let num1  = 0;
			let arr = [];
			this.bounced.addAnswer.choiceQuestions.forEach((item,index) =>{
			 	let arr1 =[];
			 	item.arr.forEach(ele=>{
			 		num1 += Number(ele.score);
					let arr2 = [];
					if(ele.arr.length == 0){
						arr2.push({
							score:ele.score,
							words:[ele.num+".("+ele.score+"分)",""],
							bol:[true,true],
							img:[[],[]],
							h: 244
						})
					}else{
						ele.arr.forEach((e,i)=>{
							arr2.push({
								score:e.score,
								words: e.words  || [ele.num+"("+(i+1)+").("+e.score+"分)",""],
								bol:[true,true],
								img:e.img ||  [[],[]],
								h: e.h || 244
							})
						});
					} 
		 			arr1.push({
		 				num:{content:ele.num},
		 				number:ele.number,
						score:ele.score,
						smallQuestionsShow:ele.smallQuestionsShow,
						arr:arr2,
						mode: ele.mode || "vertical"
		 			})
			 	})
			 	arr.push({
			 		arr:arr1,
			 		number:item.number,
			 		itemAssignment:item.itemAssignment,
			 		score:item.score
			 	})
			})
			obj.content = arr;
			obj.fraction = num1;
			let num;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == obj.number){
					num = index;
				}
			})
			if(this.bounced.addAnswer.type == "add"){
				if(num){
					this.all.arr.splice(num,0,obj)
				}else{
					this.all.arr.push(obj)
				}
			}else{
				this.all.arr.splice(this.bounced.addAnswer.type-0,1);
				this.all.arr.splice(num,0,obj)
			}
			this.itemNumberSorting();
			this.calculatedCoordinates();
			this.bounced.addAnswer = {
				isShow:false,
				titleNumber:"",
				title:"解答题" ,
				questionType:"解答题",
				type:"add",
				choiceQuestions:[{
					number:"",
					score:"",
					itemAssignment:false,
					answerLine:false,
					arr:[]
				}]
			}
		},
		// 解答题多少题的失去焦点事件
		xzjdtnum(index){
			if(this.bounced.addAnswer.choiceQuestions[index].number == "0"){
				this.bounced.addAnswer.choiceQuestions[index].number ="";
				this.bounced.addAnswer.choiceQuestions[index].arr = [];
				return;
			}
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addAnswer.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
			})
			this.bounced.addAnswer.choiceQuestions[index].arr = [];
			if(this.all.sortType == "整卷从1开始顺序递增"){
				for(let i =0;i<this.bounced.addAnswer.choiceQuestions[index].number;i++){
					this.bounced.addAnswer.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						number:"",
						smallQuestionsShow:false,
						arr:[]
					})
				}
				this.bounced.addAnswer.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				for(let i =0;i<this.bounced.addAnswer.choiceQuestions[index].number;i++){
					this.bounced.addAnswer.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						number:"",
						smallQuestionsShow:false,
						arr:[]
					})
				}
				let a = 1;
				this.bounced.addAnswer.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
			this.xzjdtScore(index);
		},
		// 解答题多少题的验证
		xzjdtnum1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
		},
		// 解答题每题多少分的失焦事件
		xzjdtScore(index){
			if(this.bounced.addAnswer.choiceQuestions[index].score =="0"){
				this.bounced.addAnswer.choiceQuestions[index].score ="";

			}
			this.bounced.addAnswer.choiceQuestions[index].arr.forEach(ele=>{
				ele.score = this.bounced.addAnswer.choiceQuestions[index].score;
			})
		},
		// 解答题每题多少分的验证
		xzjdtScore1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.score)){
				item.score = "";
			}
		},
		//解答题单题设分
		jdtSetPoints(index){
			this.bounced.addAnswer.choiceQuestions[index].itemAssignment = !this.bounced.addAnswer.choiceQuestions[index].itemAssignment;
			this.bounced.addAnswer.choiceQuestions[index].score = "";
		},
		// 解答题小问数
		jdtxiaowenshu(item,index,index1){
			let num ;
			if(item.score%item.number ==0 ){
				num = item.score/item.number
			}
			this.bounced.addAnswer.choiceQuestions[index].arr[index1].arr = [];
			for(let i =0;i<item.number;i++){
				this.bounced.addAnswer.choiceQuestions[index].arr[index1].arr.push({
					score: num || "" 
				})
			}
			this.bounced = JSON.parse(JSON.stringify(this.bounced))
		},
		// 解答题删除、
		deletejdt1(index){
			this.bounced.addAnswer.choiceQuestions.splice(index,1)
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addAnswer.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
			})
			if(this.all.sortType== "整卷从1开始顺序递增"){
				this.bounced.addAnswer.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addAnswer.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 解答题删除、
		deletejdt(index,index1){
			this.bounced.addAnswer.choiceQuestions[index].number = this.bounced.addAnswer.choiceQuestions[index].number-1;
			this.bounced.addAnswer.choiceQuestions[index].arr.splice(index1,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addAnswer.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
			})
			if(this.all.sortType== "整卷从1开始顺序递增"){
				this.bounced.addAnswer.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addAnswer.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 解答题鼠标移入
		jdtmovej(item){
			if(!item.bol1){
				this.all.arr.forEach(ele=>{
					if(ele.number == item.number){
						item.arr.forEach((ele1,index1)=>{
							ele.content[ele1.i].arr[ele1.index1].arr[ele1.index2].words = ele1.arr[0].words;
							if(ele1.arr.length >1){
								ele.content[ele1.i].arr[ele1.index1].arr[ele1.index2+1].words = ele1.arr[1].words;
							}
						})
						ele.bol = true;
					}
				})
				this.calculatedCoordinates();
			}
		},
		// 解答题鼠标移出
		jdtmovec(item){
			if(!item.bol1){
				this.all.arr.forEach(ele=>{
					if(ele.number == item.number){
						item.arr.forEach((ele1,index1)=>{
							ele.content[ele1.i].arr[ele1.index1].arr[ele1.index2].words = ele1.arr[0].words;
							if(ele1.arr.length >1){
								ele.content[ele1.i].arr[ele1.index1].arr[ele1.index2+1].words = ele1.arr[1].words;
							}
						})
						ele.bol = false;
					}
				})
				this.calculatedCoordinates();
			}
		},
		//解答题横竖
		jdtformat3(item,item1,e){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(e == "横"){
						ele.content[item1.i].arr[item1.index1].mode = "transverse";
					}else{
						ele.content[item1.i].arr[item1.index1].mode = "vertical";
					}
				}
			})
			this.calculatedCoordinates();
		},
		// 点击出现编辑器(解答   选做)
		jdtpoint(item,item1,index2){
			this.bodyListener();
			this.myConfig.initialFrameHeight = item1.h;
			this.myConfig.toolbars =[
				["undo","redo","bold","italic","fontfamily","fontsize","underline","strikethrough","subscript","superscript","lineheight","justifyleft","justifyright","justifycenter","justifyjustify","aaaaa","bbbbb" ]
			];
			this.obj.number = item.number ;
			this.obj.item = item1;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number ==  item.number){
					if(item.questionType == "13"){
						this.obj.type = "13";
						if(item1.isShear){
							if(index2 ==0){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].bol[1]=false;
								this.obj.bol = true;
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2+1].bol[1]=false;
								this.obj.bol = false;
							}
						}else{
							if(index2 ==0){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].bol[0]=false;
								this.obj.bol = true;
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2+1].bol[0]=false;
								this.obj.bol = false;
							}
						}
					}else  if(item.questionType  == "15"){
						this.obj.type = "15";
						if(item1.isShear){
							ele.content[item1.i].number1[item1.index1].bol[1]=false;
								
						}else{
							ele.content[item1.i].number1[item1.index1].bol[0]=false;
								
						}
					}
					
					
				}
			})
			this.calculatedCoordinates();
		},
		// 解答题拖拽
		drag2(item,item1,e){
			let mt = e.clientY;
			e.preventDefault();
			let _this =this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveY = e.clientY - mt;
				mt = e.clientY;
				_this.all.arr.forEach((ele,index)=>{
					if(ele.number == item.number){
						if(item.questionType == "13"){
							if(ele.content[item1.i].arr[item1.index1].arr[item1.index2].h <=20){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].h = 20; 
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].h += moveY;
							}
						}else  if(item.questionType == "15"){
							if(ele.content[item1.i].number1[item1.index1].h <=20){
								ele.content[item1.i].number1[item1.index1].h = 20; 
							}else{
								ele.content[item1.i].number1[item1.index1].h += moveY;
							}
						}
						
					}
				})
				
			};
		},
		// 解答题编辑
		jdtedit(item){
			let num ;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == item.number){
					num = index;
				}
			})
			let arr =  this.all.arr[num].content.map(e=>{
				let arr = [] ;
				e.arr.forEach(ele=>{
					if(ele.arr.length == 1){
						arr.push({
							num:ele.num.content,
							number:1,
							score:ele.score,
							arr:[{
								score:ele.score,
								words:ele.arr[0].words,
								img:ele.arr[0].img,
								h:ele.arr[0].h
							}]
						})
					}else{
						let arr1 = [];
						ele.arr.forEach(ele1=>{
							arr1.push({
								score:ele1.score,
								words:ele1.words,
								img:ele1.img,
								h:ele1.h
							})
						})
						arr.push({
							num:ele.num.content,
							number:ele.arr.length,
							score:ele.score,
							smallQuestionsShow:ele.smallQuestionsShow,
							mode:ele.mode,
							arr:arr1
						})
					}
				})
				return  {
					arr:arr,
					number:e.number,
					itemAssignment:e.itemAssignment,
					score:e.score,
				}
			})
			this.bounced.addAnswer = {
				isShow:true,
				titleNumber:this.all.arr[num].number,
				title:"解答题" ,
				questionType:"13",
				type:num,
				choiceQuestions:arr
			}
		},
		// 插图按钮
		file(item1,item){
			this.obj1.number = item.number;
			if(item.questionType == "13"){
				this.obj1.Infor = item1;
				if(item1.arr.length == 1){
					this.obj1.position = "";
					this.$refs.aa.dispatchEvent(new MouseEvent('click'))
				}else{
					this.obj1.position = "region";
					this.bounced.insertPictur.isShow =true;
				}
			}else if(item.questionType == "15"){
				this.obj1.Infor = item1;
				this.obj1.position = "";
				this.$refs.aa.dispatchEvent(new MouseEvent('click'))
			}else if(item.questionType == "1"  || item.questionType == "2" || item.questionType == "4" || item.questionType == "3"){
				this.obj1.Infor = item.topicArea;
				this.obj1.position = "";
				this.$refs.aa.dispatchEvent(new MouseEvent('click'))
			}
		},
		file1(){
			if(this.obj1.position == "" ){
				let fileData = this.$refs.aa.files[0];
				let reader = new FileReader();
				let _this =this;
				reader.readAsDataURL(fileData);
				reader.onload = function(e) {
					_this.all.arr.forEach(ele=>{
						if(ele.number == _this.obj1.number){
							if(ele.questionType == "13"){
								if(_this.obj1.Infor.isShear){
									ele.content[_this.obj1.Infor.i].arr[_this.obj1.Infor.index1].arr[_this.obj1.Infor.index2].img[1].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}else{
									ele.content[_this.obj1.Infor.i].arr[_this.obj1.Infor.index1].arr[_this.obj1.Infor.index2].img[0].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}
								
							}else if(ele.questionType == "15"){
								if(_this.obj1.Infor.isShear){
									ele.content[_this.obj1.Infor.i].number1[_this.obj1.Infor.index1].img[1].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}else{
									ele.content[_this.obj1.Infor.i].number1[_this.obj1.Infor.index1].img[0].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}
							}else if(ele.questionType == "1" || ele.questionType == "2"  ||  ele.questionType == "4" ||  ele.questionType == "3"){
								if(_this.obj1.Infor.isShear){
									ele.topicArea.img[1].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}else{
									ele.topicArea.img[0].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}
							}
						}
					})
					_this.calculatedCoordinates();
	            }
			}else{
				let fileData = this.$refs.aa.files[0];
				var reader = new FileReader();
				let _this =this;
				reader.readAsDataURL(fileData);
				reader.onload = function(e) {
					_this.all.arr.forEach(ele=>{
						if(ele.number == _this.obj1.number){
							if(_this.bounced.insertPictur.region == "left"){
								if(_this.obj1.Infor.isShear){
									ele.content[_this.obj1.Infor.i].arr[_this.obj1.Infor.index1].arr[_this.obj1.Infor.index2].img[1].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}else{
									ele.content[_this.obj1.Infor.i].arr[_this.obj1.Infor.index1].arr[_this.obj1.Infor.index2].img[0].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}
								
							}else{
								if(_this.obj1.Infor.isShear){
									ele.content[_this.obj1.Infor.i].arr[_this.obj1.Infor.index1].arr[_this.obj1.Infor.index2+1].img[1].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}else{
									ele.content[_this.obj1.Infor.i].arr[_this.obj1.Infor.index1].arr[_this.obj1.Infor.index2+1].img[0].push({
										src:e.target.result,
										w:100,
										h:100,
										t:0,
										l:0
									})
								}
								
							}
						}
					})
					_this.calculatedCoordinates();
					
				}
			}
			this.$refs.aa.value = "";
		},
		//		图片点击出现8个方格
		img1(type,index,index1,index2,index3){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
			}else if(type == "客观题"){
				str = index + '-'+index1;
			}
			this.region.str =str;
			for(let i=0;i<8;i++){
				this.$refs[str][0].parentNode.children[i].style.display = "block";
			}
		},
		//		图片8个方向拉升事件
		img2(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let aw = tagObject.parentNode.offsetWidth;
			let ah = tagObject.parentNode.offsetHeight;
			let eleWidth = tagObject.offsetWidth;
			let eleHeight = tagObject.offsetHeight;
			let xArea = aw - eleWidth;
			let yArea = ah - eleHeight;
			let ml = e.clientX;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				let moveY = e.clientY - mt;
				ml = e.clientX;
				mt = e.clientY;
				let mx = tagObject.offsetLeft + moveX;
				let my = tagObject.offsetTop + moveY;
				if(mx >= xArea){
					mx = xArea;
				}else if(mx <= 0){
					mx = 0
				}
				if(my >= yArea){
					my = yArea;
				}else if(my <= 0){
					my = 0
				}				
				tagObject.style.left = mx + "px";
				tagObject.style.top = my + "px";
			};
			
		},
		img3(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let aw = tagObject.parentNode.offsetWidth;
			let ah = tagObject.parentNode.offsetHeight;
			let eleWidth =tagObject.offsetLeft;
			let eleHeight =tagObject.offsetTop;
			let xArea = aw - eleWidth;
			let yArea = ah - eleHeight;
			let ml = e.clientX;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				let moveY = e.clientY - mt;
				ml = e.clientX;
				mt = e.clientY;
				let mx = tagObject.offsetWidth + moveX;
				let my = tagObject.offsetHeight + moveY;
				 if(mx >= xArea){
				 	mx = xArea;
				 }else if(mx <= 0){
				 	mx = 0
				 }
				 if(my >= yArea){
				 	my = yArea;
				 }else if(my <= 0){
				 	my = 0
				 }			
				tagObject.style.width = mx + "px";
				tagObject.style.height = my + "px";
			};
		},
		img4(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let aw = tagObject.parentNode.offsetWidth;
			let eleWidth =tagObject.offsetLeft;
			let xArea = aw - eleWidth;
			let yArea = tagObject.offsetTop + tagObject.offsetHeight;
			let ml = e.clientX;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				let moveY = e.clientY - mt;
				ml = e.clientX;
				mt = e.clientY;
				let mx = tagObject.offsetWidth + moveX;
				let my1 = tagObject.offsetHeight - moveY;
				let my2 = tagObject.offsetTop + moveY;
				if(mx >= xArea){
					mx = xArea;
				}else if(mx <= 0){
					mx = 0
				};
				if(my1 >= yArea){
					my1 = yArea;
				}else if(my1 <=0 ){
					my1 = 0;
				}
				if(my2 >= yArea ){
					my2 = yArea;
				}else if(my2 <=0 ){
					my2 = 0;
				}
				tagObject.style.width = mx + "px";
				tagObject.style.height = my1 + "px";
				tagObject.style.top = my2 + "px";
			};
		},
		img5(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			// let aw = tagObject.parentNode.offsetWidth;
			let ah = tagObject.parentNode.offsetHeight;
			// let eleWidth =tagObject.offsetLeft;
			let eleHeight =tagObject.offsetTop;
			let xArea = tagObject.offsetLeft +tagObject.offsetWidth ;
			let yArea = ah - eleHeight;
			let ml = e.clientX;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				let moveY = e.clientY - mt;
				ml = e.clientX;
				mt = e.clientY;
				let mx1 = tagObject.offsetWidth - moveX;
				let mx2 = tagObject.offsetLeft + moveX;
				let my = tagObject.offsetHeight + moveY;
				 if(mx1 >= xArea){
				 	mx1 = xArea;
				 }else if(mx1 <= 0){
					mx1 = 0
				 }
				 if(mx2 >= xArea){
					mx2 = xArea;
				}else if(mx2 <= 0){
					mx2 = 0
				}
				 if(my >= yArea){
				 	my = yArea;
				 }else if(my <= 0){
				 	my = 0
				 }			
				tagObject.style.width = mx1 + "px";
				tagObject.style.left = mx2 + "px";
				tagObject.style.height = my + "px";
			};
		},
		img6(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let xArea = tagObject.offsetLeft +tagObject.offsetWidth ;
			let yArea = tagObject.offsetTop +tagObject.offsetHeight ;
			let ml = e.clientX;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				let moveY = e.clientY - mt;
				ml = e.clientX;
				mt = e.clientY;
				let mx1 = tagObject.offsetWidth - moveX;
				let mx2 = tagObject.offsetLeft + moveX;
				let my1 = tagObject.offsetHeight - moveY;
				let my2 = tagObject.offsetTop + moveY;
				 if(mx1 >= xArea){
				 	mx1 = xArea;
				 }else if(mx1 <= 0){
					mx1 = 0
				 }
				 if(mx2 >= xArea){
					mx2 = xArea;
				}else if(mx2 <= 0){
					mx2 = 0
				}
				if(my1 >= yArea){
				 	my1 = yArea;
				}else if(my1 <= 0){
				 	my1 = 0
				}
				if(my2 >= yArea){
					my2 = yArea;
				}else if(my2 <= 0){
					my2 = 0
				}		
				tagObject.style.width = mx1 + "px";
				tagObject.style.left = mx2 + "px";
				tagObject.style.height = my1 + "px";
				tagObject.style.top = my2 + "px";
			};
		},
		img7(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let yArea = tagObject.offsetTop +tagObject.offsetHeight ;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveY = e.clientY - mt;
				mt = e.clientY;
				let my1 = tagObject.offsetHeight - moveY;
				let my2 = tagObject.offsetTop + moveY;
				if(my1 >= yArea){
				 	my1 = yArea;
				}else if(my1 <= 0){
				 	my1 = 0
				}
				if(my2 >= yArea){
					my2 = yArea;
				}else if(my2 <= 0){
					my2 = 0
				}		
				tagObject.style.height = my1 + "px";
				tagObject.style.top = my2 + "px";
			};
		},
		img8(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let aw = tagObject.parentNode.offsetWidth;
			let eleWidth =tagObject.offsetLeft;
			let xArea = aw - eleWidth;
			let ml = e.clientX;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				ml = e.clientX;
				let mx = tagObject.offsetWidth + moveX;
				 if(mx >= xArea){
				 	mx = xArea;
				 }else if(mx <= 0){
				 	mx = 0
				 }
				tagObject.style.width = mx + "px";
			};
		},
		img9(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let ah = tagObject.parentNode.offsetHeight;
			let eleHeight =tagObject.offsetTop;
			let yArea = ah - eleHeight;
			let mt = e.clientY;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveY = e.clientY - mt;
				mt = e.clientY;
				let my = tagObject.offsetHeight + moveY;
				 if(my >= yArea){
				 	my = yArea;
				 }else if(my <= 0){
				 	my = 0
				 }			
				tagObject.style.height = my + "px";
			};
		},
		img10(type,index,index1,index2,index3,e,item,item1){
			let str;
			if(type == "解答题"){
				str = index + '-'+index1+'-'+index2+'-'+index3;
				this.region.obj = item1;
			}else if(type == "选做题"){
				str = index + '-'+index1+'-'+index2;
				this.region.obj = item1;
			}else if(type == "客观题"){
				str = index + '-'+index1;
				this.region.obj = item;
			}
			this.region.str =str;
			this.region.number = item.number;
			let tagObject = this.$refs[str][0].parentNode;
			let xArea = tagObject.offsetLeft +tagObject.offsetWidth ;
			let ml = e.clientX;
			e.preventDefault();
			let _this = this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveX = e.clientX - ml;
				ml = e.clientX;
				let mx1 = tagObject.offsetWidth - moveX;
				let mx2 = tagObject.offsetLeft + moveX;
				 if(mx1 >= xArea){
				 	mx1 = xArea;
				 }else if(mx1 <= 0){
					mx1 = 0
				 }
				 if(mx2 >= xArea){
					mx2 = xArea;
				}else if(mx2 <= 0){
					mx2 = 0
				}
				tagObject.style.width = mx1 + "px";
				tagObject.style.left = mx2 + "px";
			};
		},
		//		删除图片
		deleteImg(type,index2,index3,item,item1){
			this.region.str = "";
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(type == "解答题"){
						if(index2 == 0){
							if(item1.isShear){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].img[1].splice(index3,1);
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2].img[1].splice(index3,1);
							}
						}else{
							if(item1.isShear){
								ele.content[item1.i].arr[item1.index1].arr[item1.index2+1].img[0].splice(index3,1);
							}else{
								ele.content[item1.i].arr[item1.index1].arr[item1.index2+1].img[0].splice(index3,1);
							}
						}
					}else if(type == "选做题"){
						if(item1.isShear){
							ele.content[item1.i].number1[item1.index1].img[1].splice(index2,1)
						}else{
							ele.content[item1.i].number1[item1.index1].img[0].splice(index2,1)
						}
					}else if(type == "客观题"){
						if(item1.isShear){
							ele.topicArea.img[1].splice(index2,1)
						}else{
							ele.topicArea.img[0].splice(index2,1)
						}
					}
				}
			})
			this.calculatedCoordinates();
		},
		// 插入图片弹框取消
		crtpshow1(){
			this.bounced.insertPictur.isShow =false;
		},
		// 插入图片弹框确认
		crtpconfirm(){
			this.$refs.aa.dispatchEvent(new MouseEvent('click'));
			this.bounced.insertPictur.isShow =false;
		},
		// 作文题显示
		xzzwtshow(){
			this.bounced.addComposition.isShow =  true;
			this.bounced.addComposition.titleNumber = this._arr[0];
			this.bounced.addComposition.type ="add";
		},
		// 作文题取消按钮
		xzzwtshow1(){
			this.bounced.addComposition= {
				isShow:false,
				titleNumber:"",
				title:"作文题",
				questionType:"14",
				type:"add",
				choiceQuestions:[{
					number:"",
					arr:[]
				}]
			}
		},
		// 作文题多少题目的失焦事件
		xzzwtnum(index){
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addComposition.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			this.bounced.addComposition.choiceQuestions[index].arr = [];
			if(this.all.sortType == "整卷从1开始顺序递增"){
				for(let i =0;i<this.bounced.addComposition.choiceQuestions[index].number;i++){
					this.bounced.addComposition.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						fangshi:"square",
						wordNumber:"",
						wordNumberLine:""
					})
				}
				this.bounced.addComposition.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				for(let i =0;i<this.bounced.addComposition.choiceQuestions[index].number;i++){
					this.bounced.addComposition.choiceQuestions[index].arr.push({
						num:"",
						score:"",
						fangshi:"square",
						wordNumber:"",
						wordNumberLine:""
					})
				}
				let a = 1;
				this.bounced.addComposition.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 作文题题目数验证
		xzzwtnum1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
		},
		// 作文题字数验证
		wordNumberChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.wordNumber)){
				item.wordNumber = "";
			}
		},
		
		wordNumberLineChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.wordNumberLine)){
				item.wordNumberLine = "";
			}
		},
		wordNumberLine(item){
			if(item.wordNumberLine>25){
				item.wordNumberLine = "25";
			}else if(item.wordNumberLine<15){
				item.wordNumberLine = "15";
			}
		},
		//作文题删除
		deletezwt1(index){
			this.bounced.addComposition.choiceQuestions.splice(index,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addComposition.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addComposition.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addComposition.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}

		},
		// 作文题删除
		deletezwt(index,index1){
			this.bounced.addComposition.choiceQuestions[index].number = this.bounced.addComposition.choiceQuestions[index].number-1;
			this.bounced.addComposition.choiceQuestions[index].arr.splice(index1,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addComposition.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
				
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addComposition.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addComposition.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 作文题确定按钮
		xzzwtconfirm(){
			let obj = {
				number:this.bounced.addComposition.titleNumber,
				title:this.bounced.addComposition.title,
				content:[],
				questionType:"14",
				objSubFlag:1,
				infor:{
					rect:{
					},
					font:{
						content:"<p style='font-size:16px;'>"+this.bounced.addComposition.titleNumber +"、" + this.bounced.addComposition.title +"</p>",
						h:20,
						showFlag:true,
						showFlag1:true,
					}
				},
				bol:false,
			}
			let num1  = 0;
			let arr = [];
			 this.bounced.addComposition.choiceQuestions.forEach((item,index) =>{
			 	let arr1 =[];
			 	item.arr.forEach(ele=>{
			 		num1 += Number(ele.score);
			 		if(ele.fangshi == "square"){
			 			arr1.push({
			 				num:{content:ele.num},
			 				fangshi:ele.fangshi,
			 				score:ele.score,
							wordNumber:ele.wordNumber,
							wordNumberLine:ele.wordNumberLine
			 			})
			 		}else{
			 			arr1.push({
			 				num:{content:ele.num},
			 				fangshi:ele.fangshi,
							score:ele.score,
							rowHeight: ele.rowHeight || 8,
							rowNumber: ele.rowNumber || 4
			 			})
			 		}
			 	})
			 	arr.push({
			 		arr:arr1,
			 		number:item.number,
			 	})
			 })
			
			obj.content = arr;
			obj.fraction = num1;
			let num;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == obj.number){
					num = index;
				}
			})
			if(this.bounced.addComposition.type == "add"){
				if(num){
					this.all.arr.splice(num,0,obj)
				}else{
					this.all.arr.push(obj)
				}
			}else{
				this.all.arr.splice(this.bounced.addComposition.type-0,1);
				this.all.arr.splice(num,0,obj)
			}
			this.itemNumberSorting();
			this.calculatedCoordinates();
			this.bounced.addComposition= {
				isShow:false,
				titleNumber:"",
				title:"作文题",
				questionType:"作文题",
				type:"add",
				choiceQuestions:[{
					number:"",
					arr:[]
				}]
			}
		},
		//作文题横线行数
		zwtformat1(item,item1,e){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(e == "加"){
						ele.content[item1.i].arr[item1.index1].rowNumber += 1;
					}else{
						if(ele.content[item1.i].arr[item1.index1].rowNumber-1 <= 1){
							ele.content[item1.i].arr[item1.index1].rowNumber = 1;
						}else{
							ele.content[item1.i].arr[item1.index1].rowNumber -= 1;
						}
					}
				}
			})
			this.calculatedCoordinates();
		},
		//作文题横线行高
		zwtformat2(item,item1,e){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					if(e == "加"){
						ele.content[item1.i].arr[item1.index1].rowHeight += 1;
					}else{
						if(ele.content[item1.i].arr[item1.index1].rowHeight-1 <= 8){
							ele.content[item1.i].arr[item1.index1].rowHeight = 8;
						}else{
							ele.content[item1.i].arr[item1.index1].rowHeight -= 1;
						}
					}
				}
			})
			this.calculatedCoordinates();
		},
		// 作文题编辑
		zwtedit(item){
			let num ;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == item.number){
					num = index;
				}
			})
			let arr =  this.all.arr[num].content.map(e=>{
				let arr = [] ;
				e.arr.forEach(ele=>{
					if(ele.fangshi == "square"){
						arr.push({
							num:ele.num.content,
							fangshi:ele.fangshi,
							score:ele.score,
							wordNumberLine: ele.wordNumberLine,
							wordNumber:ele.wordNumber
						})
					}else{
						arr.push({
							num:ele.num.content,
							fangshi:ele.fangshi,
							score:ele.score,
							rowHeight:ele.rowHeight,
							rowNumber:ele.rowNumber
						})
					}
				})
				return  {
					arr:arr,
					number:e.number,
				}

			})
			this.bounced.addComposition = {
				isShow:true,
				titleNumber:this.all.arr[num].number,
				questionType:"14",
				title:this.all.arr[num].title,
				type:num,
				choiceQuestions:arr
			}
		},
		// 选做题显示
		xzxztshow(){
			this.bounced.addOptional.isShow =  true;
			this.bounced.addOptional.titleNumber = this._arr[0];
			this.bounced.addOptional.type ="add";
		},
		// 选做题取消
		xzxztshow1(){
			this.bounced.addOptional = {
				isShow:false,
				titleNumber:"",
				title:"选做题" ,
				questionType:"15",
				type:"add",
				choiceQuestions:[{
					number:"",
					score:"",
					itemAssignment:false,
					arr:[]
				}]
			}
		},
		// 选做题多少题的失去焦点事件
		xzxztnum(index){
			if(this.bounced.addOptional.choiceQuestions[index].number>5){
				this.bounced.addOptional.choiceQuestions[index].number = "5";
			}else if(this.bounced.addOptional.choiceQuestions[index].number<2){
				this.bounced.addOptional.choiceQuestions[index].number = "2";
			}
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addOptional.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
			})
			this.bounced.addOptional.choiceQuestions[index].arr = [];
			if(this.all.sortType == "整卷从1开始顺序递增"){
				for(let i =0;i<this.bounced.addOptional.choiceQuestions[index].number;i++){
					this.bounced.addOptional.choiceQuestions[index].arr.push({
						num:"",
						score:"",
					})
				}
				this.bounced.addOptional.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				for(let i =0;i<this.bounced.addOptional.choiceQuestions[index].number;i++){
					this.bounced.addOptional.choiceQuestions[index].arr.push({
						num:"",
						score:"",
					})
				}
				let a = 1;
				this.bounced.addOptional.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
			this.xzxztScore(index);
		},
		// 选做题多少题的验证
		number1Checking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number1)){
				item.number1 = "";
			}else{
				if(item.number1 >item.number - 1 ){
					item.number1 = (item.number - 1).toString();
				}
			}
		},
		// 选做题每题多少分的失焦事件
		xzxztScore(index){
			this.bounced.addOptional.choiceQuestions[index].arr.forEach(ele=>{
				ele.score = this.bounced.addOptional.choiceQuestions[index].score;
			})
		},
		xztedit(item){
			let num;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == item.number){
					num = index;
				}
			})
			let arr =  this.all.arr[num].content.map(e=>{
				let arr1 = [] ;
				e.arr.forEach(ele=>{
					arr1.push({
						num:ele.num.content,
						score:ele.score,
					})
				})
				return  {
					arr:arr1,
					number:e.number,
					number1:e.number1.length,
					score:e.score,
				}
			})
			this.bounced.addOptional = {
				isShow:true,
				titleNumber:this.all.arr[num].number,
				title:"解答题" ,
				questionType:"15",
				type:num,
				choiceQuestions:arr
			}
		},
		// 选做题删除
		deletexzt1(index){
			this.bounced.addOptional.choiceQuestions.splice(index,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addOptional.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addOptional.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addOptional.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 选做题删除
		deletexzt(index,index1){
			this.bounced.addOptional.choiceQuestions[index].number = this.bounced.addOptional.choiceQuestions[index].number-1;
			this.bounced.addOptional.choiceQuestions[index].arr.splice(index1,1);
			let num = 0;
			this.all.arr.some(ele=>{
				if(ele.number == this.bounced.addOptional.titleNumber){
					return  true
				}
				if(ele.content){
					ele.content.forEach(ele1=>{
						num += ele1.arr.length;
					})
				}
			})
			if(this.all.sortType == "整卷从1开始顺序递增"){
				this.bounced.addOptional.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = num + 1;
						num += 1;
					})
				})
			}else{
				let a = 1;
				this.bounced.addOptional.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			}
		},
		// 选做题确认按钮
		xzxztconfirm(){
			this.region.str = "";
			let obj = {
				number:this.bounced.addOptional.titleNumber,
				title:this.bounced.addOptional.title,
				content:[],
				questionType:"15",
				objSubFlag:1,
				infor:{
					rect:{
					},
					font:{
						content:"<p style='font-size:16px;'>"+this.bounced.addOptional.titleNumber +"、" + this.bounced.addOptional.title +"</p>",
						h:20,
						showFlag:true,
						showFlag1:true,
					}
				},
				bol:false,
			}
			let num1  = 0;
			let arr = [];
			this.bounced.addOptional.choiceQuestions.forEach((item,index) =>{
			 	let arr1 =[];
			 	item.arr.forEach(ele=>{
		 			arr1.push({
		 				num:{content:ele.num},
		 				score:ele.score,
		 			})
				 })
				let arr2 = [];
				for(let i=0;i<item.number1;i++){
					arr2.push({
						words:[(i+1)+"("+item.score+"分)",""],
						bol:[true,true],
						img:[[],[]],
						score:item.score,
						h:244
					})
				}
				arr.push({
					arr:arr1,
					number:item.number,
					number1:arr2,
					score:item.score
				})
				num1 += item.number1*item.score
		   })
			obj.content = arr;
			obj.fraction = num1;
			let num;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number == obj.number){
					num = index;
				}
			})
			if(this.bounced.addOptional.type == "add"){
				if(num){
					this.all.arr.splice(num,0,obj)
				}else{
					this.all.arr.push(obj)
				}
			}else{
				this.all.arr.splice(this.bounced.addOptional.type-0,1);
				this.all.arr.splice(num,0,obj)
			}
			this.itemNumberSorting();
			this.calculatedCoordinates();
			this.bounced.addOptional = {
				isShow:false,
				titleNumber:"",
				title:"选做题" ,
				questionType:"14",
				type:"add",
				choiceQuestions:[{
					number:"",
					score:"",
					itemAssignment:false,
					arr:[]
				}]
			}
		},
		// 选做题鼠标移入
		xztmovej(item){
				this.all.arr.forEach(ele=>{
					if(ele.number == item.number){
						item.arr.forEach((ele1,index1)=>{
							ele.content[ele1.i].number1[ele1.index1].words[0] = ele1.words[0];
							ele.content[ele1.i].number1[ele1.index1].words[1] = ele1.words[1];
						})
						ele.bol = true;
					}
				})
				this.calculatedCoordinates();
		},
		// 选做题鼠标移出
		xztmovec(item){
			this.all.arr.forEach(ele=>{
				if(ele.number == item.number){
					item.arr.forEach((ele1,index1)=>{
						ele.content[ele1.i].number1[ele1.index1].words[0] = ele1.words[0];
						ele.content[ele1.i].number1[ele1.index1].words[1] = ele1.words[1];
					})
					ele.bol = false;
				}
			})
			this.calculatedCoordinates();
		},
		// 添加题干区显示弹框
		xztgqshow(){
			this.bounced.topicArea.arr = []
			this.all.arr.forEach((ele,index)=>{
				if(ele.questionType == "1" || ele.questionType == "2" || ele.questionType == "3" || ele.questionType == "4" ){
					if(ele.topicArea){
						this.bounced.topicArea.arr.push({
							bol:true,
							number:ele.number,
							title:ele.title
						})
					}else{
						this.bounced.topicArea.arr.push({
							bol:false,
							number:ele.number,
							title:ele.title
						})
					}
				}
			})
			this.bounced.topicArea.isShow = true;
		},
		// 添加题干区隐藏弹框
		tgqshow1(){
			this.bounced.topicArea.isShow = false;
			this.bounced.topicArea.arr = []
		},
		tgqconfirm(){
			this.bounced.topicArea.arr.forEach((ele,index)=>{
				this.all.arr.forEach((ele1,index1)=>{
					if(ele1.number == ele.number){
						if(ele.bol){
							if(!ele1.topicArea){
								ele1.topicArea={
									rect:{
										x:"",
										y:"",
										w:673,
										h:244
									},
									words:['',''],
									// words:'<p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a></p><p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a></p><p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a></p><p style="line-height: 3em;"><a style="border-bottom:1px solid ;">         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </a></p>',
									img:[[],[]],
									bol:[true,true],
								}
							}
						}else{
							delete(ele1["topicArea"]);
						}
					}
				})
			})
			this.calculatedCoordinates();
			this.bounced.topicArea.isShow = false;
			this.bounced.topicArea.arr = []
		},
		// 题干区拖拽
		drag3(item,e){
			let mt = e.clientY;
			e.preventDefault();
			let _this =this;
			document.onmousemove = function(e){
				_this.execution = false;
				let moveY = e.clientY - mt;
				mt = e.clientY;
				_this.all.arr.forEach(ele=>{
					if(ele.number == item.number){
						if(ele.topicArea.rect.h + moveY<=30){
							ele.topicArea.rect.h = 30;
						}else{
							ele.topicArea.rect.h = ele.topicArea.rect.h + moveY;
						}
					}
				})
			};
		},
		// 题干区显示编辑器
		tgqpoint(item){
			this.bodyListener();
			this.myConfig.initialFrameHeight = item.topicArea.rect.h;;
			this.myConfig.toolbars =[
				["undo","redo","bold","italic","fontfamily","fontsize","underline","strikethrough","subscript","superscript","lineheight","justifyleft","justifyright","justifycenter","justifyjustify","aaaaa","bbbbb" ]
			];
			this.obj.number = item.number ;
			this.obj.item = item;
			this.all.arr.forEach((ele,index)=>{
				if(ele.number ==  item.number){
					this.obj.type = item.questionType;
					if(item.topicArea.isShear){
						ele.topicArea.bol[1] = false;
					}else{
						ele.topicArea.bol[0] = false;
					}
				}
			})
			this.calculatedCoordinates();
		},
		//		添加禁答区显示
		xzjdqshow(){
			this.bounced.noAnswerZone.isShow =  true;
		},
//		添加禁答区取消按钮
		xzjdqshow1(){
			this.bounced.noAnswerZone = {
				isShow:false,
				rowNumber:"",
				titleNumber:"",
				id:""
			};
		},
		rowNumberChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.rowNumber)){
				item.rowNumber = "";
			}
		},
		// 禁答区确认按钮
		xzjdqconfirm(){
			let obj = {
				bol:false,
				infor:{
					font:{},
					rect:{}
				},
				rowNumber:this.bounced.noAnswerZone.rowNumber,
				questionType:"16",
				id:this.bounced.noAnswerZone.id  ||  new Date().getTime(),
				titleNumber:this.bounced.noAnswerZone.titleNumber
			}
			if(this.bounced.noAnswerZone.id){
				this.all.arr.forEach((ele,index)=>{
					if(ele.id == this.bounced.noAnswerZone.id ){
						this.all.arr.splice(index,1)
					}
				})
			}
			
			if(this.bounced.noAnswerZone.titleNumber){
				this.all.arr.forEach((ele,index) => {
					if(this.bounced.noAnswerZone.titleNumber == ele.number ){
						this.all.arr.splice(index+1,0,obj)
					}
				});
			}else{
				this.all.arr.push(obj)
			}
			this.bounced.noAnswerZone = {
				isShow:false,
				rowNumber:"",
				titleNumber:"",
				id:""
			};
			this.calculatedCoordinates();
		},
		// 禁答区鼠标移入
		jdumovej(item){
			this.all.arr.forEach((ele,index)=>{
				if(ele.id == item.id){
					ele.bol = true;
					return;
				}
			})
			this.calculatedCoordinates();
		},
		// 禁答区鼠标移出
		jdumovec(item){
			this.all.arr.forEach((ele,index)=>{
				if(ele.id == item.id){
					ele.bol = false;
					return;
				}
			})
			this.calculatedCoordinates();
		},
		// 禁答区删除
		deletejdq(item){
			this.all.arr.forEach((ele,index)=>{
				if(ele.id == item.id){
					this.all.arr.splice(index,1)
					return;
				}
			})
			this.calculatedCoordinates();
		},
		// 禁答区行数加
		jdqjia(item){
			this.all.arr.forEach((ele,index)=>{
				if(ele.id == item.id){
					ele.rowNumber = Number(ele.rowNumber) +1;
					return;
				}
			})
			this.calculatedCoordinates();
		},
		// 禁答区行数减
		jdqjian(item){
			this.all.arr.forEach((ele,index)=>{
				if(ele.id == item.id){
					if(Number(ele.rowNumber) <1){
						ele.rowNumber = 1
					}else{
						ele.rowNumber = Number(ele.rowNumber) -1;
					}
					return;
				}
			})
			this.calculatedCoordinates();
		},
		// 禁答区编辑
		jdqedit(item){
			this.bounced.noAnswerZone.isShow =  true;
			this.bounced.noAnswerZone.titleNumber = item.titleNumber;
			this.bounced.noAnswerZone.rowNumber = item.rowNumber;
			this.bounced.noAnswerZone.id = item.id;
		},
		// 大题删除
		delete1(item){
			this.region.str = "";
			let index ;
			this.all.arr.forEach((ele,i)=>{
				if(ele.number == item.number){
					index= i;					
				}
			})
			this.all.arr.splice(index,1)
			this.itemNumberSorting();
			this.calculatedCoordinates();
		},
//		坐标计算
		calculatedC(){
			if(this.all.scantronFormat == 1){
				//			考试号
				this.all.numberFormat.square = [];
				this.all.numberFormat.verticalLine = [];
				for (let i = 0; i < this.bounced.numberFormat.num; i++) {
					this.all.numberFormat.square.push([
						{ content: 0, fontx: 474.08, fonty: 163.35, rectx: 468.58, recty: 154.85, rectw: 16.5, recth: 10 },
						{ content: 1, fontx: 474.08, fonty: 179.35, rectx: 468.58, recty: 170.85, rectw: 16.5, recth: 10 },
						{ content: 2, fontx: 474.08, fonty: 195.35, rectx: 468.58, recty: 186.85, rectw: 16.5, recth: 10 },
						{ content: 3, fontx: 474.08, fonty: 211.35, rectx: 468.58, recty: 202.85, rectw: 16.5, recth: 10 },
						{ content: 4, fontx: 474.08, fonty: 227.35, rectx: 468.58, recty: 218.85, rectw: 16.5, recth: 10 },
						{ content: 5, fontx: 474.08, fonty: 243.35, rectx: 468.58, recty: 234.85, rectw: 16.5, recth: 10 },
						{ content: 6, fontx: 474.08, fonty: 259.35, rectx: 468.58, recty: 250.85, rectw: 16.5, recth: 10 },
						{ content: 7, fontx: 474.08, fonty: 275.35, rectx: 468.58, recty: 266.85, rectw: 16.5, recth: 10 },
						{ content: 8, fontx: 474.08, fonty: 291.35, rectx: 468.58, recty: 282.85, rectw: 16.5, recth: 10 },
						{ content: 9, fontx: 474.08, fonty: 307.35, rectx: 468.58, recty: 298.85, rectw: 16.5, recth: 10 }
					]);
					if (i != this.bounced.numberFormat.num - 1) {
						this.all.numberFormat.verticalLine.push({ x: 490.16, y: 121.5, w: 1, h: 193 });
					}
				}
				if(this.all.pottedLine){
	//				有密封线学生信息坐标计算
					this.all.textMessage.w = 577;
					let num = this.all.basicInfor.length;
					this.all.basicInfor.forEach((ele,index)=>{
						ele.rect={
							x:51,
							y:252+651/num*(num-1-index),
							w:1,
							h:651/num - 47
						},
						ele.font=[{
							content:ele.name.charAt(0),
							x:48,
							y:ele.rect.y + ele.rect.h + 33, 
						},{
							content:ele.name.charAt(1),
							x:48,
							y:ele.rect.y + ele.rect.h + 18, 
						}]
					})
					if(this.all.existAttentionMatters.bol){
						this.all.existAttentionMatters.font = [
							{ x: 38, y: this.all.textMessage.h + 40 },
							{ x: 38, y: this.all.textMessage.h + 59 },
							{ x: 38, y: this.all.textMessage.h + 78 },
							{ x: 38, y: this.all.textMessage.h + 97 }, 
							{ x: 38, y: this.all.textMessage.h + 116 }
						];
						this.all.existAttentionMatters.rectangle = {
							x: 11,
							y: this.all.textMessage.h + 13,
							w: 597,
							h: 114
						};
						this.all.rect ={
							x:11,
							y:this.all.existAttentionMatters.rectangle.y + this.all.existAttentionMatters.rectangle.h +15,
							w:597,
							h:1006 - this.all.existAttentionMatters.rectangle.y - this.all.existAttentionMatters.rectangle.h
						}
					}else{
						this.all.rect ={
							x:11,
							y:this.all.textMessage.h + 13,
							w:597,
							h:1008 - this.all.textMessage.h
						}
					}
				}else{
					this.all.textMessage.w = 673;
	          		if(this.all.existAttentionMatters.bol){
	//					无密封线有注意事项 学生信息坐标计算       			
	          			let num = this.all.basicInfor.length;
						this.all.basicInfor.forEach((element, index) => {
							element.font = [{
								content:element.name,
								x: 11 + index * 693 / num,
								y: this.all.textMessage.h + 28
							}];
							element.rectangle = {
								x: 43 + index * 693 / num,
								w: 693 / num - 40,
								y: this.all.textMessage.h + 28,
								h: 1
							};
						});
						this.btnState.basicInfor.font = {
							x: 622,
							y: this.all.textMessage.h + 15
						};
						this.btnState.basicInfor.rectangle = {
							x: 642,
							y: this.all.textMessage.h + 35
						};
						if(this.all.numberFormat.content == 2 || this.all.numberFormat.content == 3){
	//						注意事项坐标计算（无密封线，条形码或者二维码）
							this.all.existAttentionMatters.font = [
								{ x: 38, y: this.all.textMessage.h + 101 },
								{ x: 38, y: this.all.textMessage.h + 119 },
								{ x: 38, y: this.all.textMessage.h + 137 },
								{ x: 38, y: this.all.textMessage.h + 155 }, 
								{ x: 38, y: this.all.textMessage.h + 173 }
							];
							this.all.existAttentionMatters.rectangle = {
								x: 11,
								y: this.all.textMessage.h + 43,
								w:438,
								h:175
							};
							this.all.rect ={
								x:11,
								y:this.all.existAttentionMatters.rectangle.y + this.all.existAttentionMatters.rectangle.h +15,
								w:693,
								h:1006 - this.all.existAttentionMatters.rectangle.y - this.all.existAttentionMatters.rectangle.h
							}
							if(this.all.markingMissExamination.bol){
	//							条形码活二维码坐标计算（有注意事项，有缺考标记）
								this.all.numberFormat.rect={
									x:464,
									y:this.all.textMessage.h + 43,
									w:240,
									h:110
								}
								this.all.numberFormat.font={
									x:534,
									y:this.all.textMessage.h + 103
								}
	//							缺考标记计算（无密封线，有注意事项，条形码或二维码）
								this.all.markingMissExamination.font=[
									{x:499,y:this.all.textMessage.h + 198},
									{x:559,y:this.all.textMessage.h + 198},
									{x:589,y:this.all.textMessage.h + 198},
								]
								this.all.markingMissExamination.rect=[{
									x:464,
									y:this.all.textMessage.h + 169,
									w:240,
									h:49
								},{
									x:649,
									y:this.all.textMessage.h + 188,
									w:21,
									h:11.5	
								}]
							}else{
	//							条形码活二维码坐标计算（有注意事项，无缺考标记）
								this.all.numberFormat.rect={
									x:464,
									y:this.all.textMessage.h + 43,
									w:240,
									h:175
								}
								this.all.numberFormat.font={
									x:534,
									y:this.all.textMessage.h + 135.5
								}
							}
						}else{
							this.btnState.numberFormat.font = {x:652,y:this.all.textMessage.h+65};
							this.btnState.numberFormat.rect = {x:632,y:this.all.textMessage.h+45,w:70,h:30};
							this.all.rect ={
								x:11,
								y:this.btnState.numberFormat.rect.h+this.btnState.numberFormat.rect.y+203,
								w:693,
								h:818-this.btnState.numberFormat.rect.h-this.btnState.numberFormat.rect.y
							}
							if(this.bounced.numberFormat.num>=10){
	//							考试号（有注意事项，考试号位数大于9）
								this.all.numberFormat.basic = [ 
									{x:382,y:this.all.textMessage.h+43,w:322,h:219},
									{x:381.5,y:this.all.textMessage.h+95.5,w:323,h:1},
									{x:381.5,y:this.all.textMessage.h+68.5,w:323,h:1},
									{x:514.5,y:this.all.textMessage.h+60.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 382 + (index + 1) * (320 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 382 + ((320 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (320 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								注意事项（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 38, y: this.all.textMessage.h + 91 },
										{ x: 38, y: this.all.textMessage.h + 109 },
										{ x: 38, y: this.all.textMessage.h + 127 },
										{ x: 38, y: this.all.textMessage.h + 145 }, 
										{ x: 38, y: this.all.textMessage.h + 163 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:356,
										h:156
									};
	//								缺考标记(有注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:74,y:this.all.textMessage.h + 243},
										{x:134,y:this.all.textMessage.h + 243},
										{x:194,y:this.all.textMessage.h + 243},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 214,
										w:356,
										h:49
									},{
										x:254,
										y:this.all.textMessage.h + 233,
										w:21,
										h:11.5	
									}]
								}else{
	//								注意事项（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 38, y: this.all.textMessage.h + 121 },
										{ x: 38, y: this.all.textMessage.h + 139 },
										{ x: 38, y: this.all.textMessage.h + 157 },
										{ x: 38, y: this.all.textMessage.h + 175 }, 
										{ x: 38, y: this.all.textMessage.h + 193 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:356,
										h:220
									};
								}
							}else{
	//							考试号位数小于9
								this.all.numberFormat.basic = [ 
									{x:464,y:this.all.textMessage.h+43,w:240,h:219},
									{x:463.5,y:this.all.textMessage.h+95.5,w:240,h:1},
									{x:463.5,y:this.all.textMessage.h+68.5,w:240,h:1},
									{x:555.5,y:this.all.textMessage.h+60.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 464 + (index + 1) * (240 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 464 + ((240 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (240 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								注意事项（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 58, y: this.all.textMessage.h + 91 },
										{ x: 58, y: this.all.textMessage.h + 109 },
										{ x: 58, y: this.all.textMessage.h + 127 },
										{ x: 58, y: this.all.textMessage.h + 145 }, 
										{ x: 58, y: this.all.textMessage.h + 163 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:438,
										h:156
									};
	//								缺考标记(有注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:115,y:this.all.textMessage.h + 243},
										{x:175,y:this.all.textMessage.h + 243},
										{x:235,y:this.all.textMessage.h + 243},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 214,
										w:438,
										h:49
									},{
										x:295,
										y:this.all.textMessage.h + 233,
										w:21,
										h:11.5	
									}]
								}else{
	//								注意事项（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 58, y: this.all.textMessage.h + 121 },
										{ x: 58, y: this.all.textMessage.h + 139 },
										{ x: 58, y: this.all.textMessage.h + 157 },
										{ x: 58, y: this.all.textMessage.h + 175 }, 
										{ x: 58, y: this.all.textMessage.h + 193 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:438,
										h:220
									};
								}
							}
						}
	          		}else{
	          			if(this.all.numberFormat.content == 2 || this.all.numberFormat.content == 3){
	//        				学生信息(无注意事项,条形码或二维码)
	          				this.all.existAttentionMatters.rectangle = {
								x: 11,
								y: this.all.textMessage.h + 13,
								w:438,
								h:175
							};
							let num = this.all.basicInfor.length+1;
							this.all.basicInfor.forEach((element, index) => {
								element.font = [{
									content:element.name,
									x:76.5,
									y:this.all.existAttentionMatters.rectangle.y+ 7 +(170/num)*(index+1) 
								}];
								element.rectangle = {
									x: 116.7,
									w: 267,
									y: element.font[0].y,
									h: 1
								};
							});
							this.btnState.basicInfor.font = {
								x: 377,
								y: this.all.textMessage.h + 15
							};
							this.btnState.basicInfor.rectangle = {
								x: 397,
								y: this.all.textMessage.h + 35
							};
							this.all.rect ={
								x:11,
								y:this.all.existAttentionMatters.rectangle.y+this.all.existAttentionMatters.rectangle.h + 15,
								w:693,
								h:1006-this.all.existAttentionMatters.rectangle.y-this.all.existAttentionMatters.rectangle.h
							}
							if(this.all.markingMissExamination.bol){
	//							条形码活二维码坐标计算（无注意事项，有缺考标记）
								this.all.numberFormat.rect={
									x:464,
									y:this.all.textMessage.h + 13,
									w:240,
									h:110
								}
								this.all.numberFormat.font={
									x:534,
									y:this.all.textMessage.h + 73
								}
	//							缺考标记计算（无密封线，无注意事项，条形码或二维码）
								this.all.markingMissExamination.font=[
									{x:499,y:this.all.textMessage.h + 168},
									{x:559,y:this.all.textMessage.h + 168},
									{x:589,y:this.all.textMessage.h + 168},
								]
								this.all.markingMissExamination.rect=[{
									x:464,
									y:this.all.textMessage.h + 139,
									w:240,
									h:49
								},{
									x:649,
									y:this.all.textMessage.h + 158,
									w:21,
									h:11.5	
								}]
							}else{
	//							条形码活二维码坐标计算（无注意事项，无缺考标记）
								this.all.numberFormat.rect={
									x:464,
									y:this.all.textMessage.h + 13,
									w:240,
									h:175
								}
								this.all.numberFormat.font={
									x:534,
									y:this.all.textMessage.h + 105.5
								}
							}
	          			}else{
	          				this.btnState.numberFormat.font = {x:652,y:this.all.textMessage.h+35}
							this.btnState.numberFormat.rect = {x:632,y:this.all.textMessage.h+15,w:70,h:30}
							this.all.rect ={
								x:11,
								y:this.btnState.numberFormat.rect.y+this.btnState.numberFormat.rect.h+203,
								w:693,
								h:818-this.btnState.numberFormat.rect.y-this.btnState.numberFormat.rect.h
							}
	          				if(this.bounced.numberFormat.num>=10){
	//							考试号（有注意事项，考试号位数大于9）
								this.all.numberFormat.basic = [ 
									{x:382,y:this.all.textMessage.h+13,w:322,h:219},
									{x:381.5,y:this.all.textMessage.h+65.5,w:323,h:1},
									{x:381.5,y:this.all.textMessage.h+38.5,w:323,h:1},
									{x:514.5,y:this.all.textMessage.h+30.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 382 + (index + 1) * (320 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 382 + ((320 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (320 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								学生信息（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:356,
										h:156
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											content:element.name,
											x:64.4,
											y:this.all.existAttentionMatters.rectangle.y + 7 +(150/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 209,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 295,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 315,
										y: this.all.textMessage.h + 35
									};
	//								缺考标记(有注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:74,y:this.all.textMessage.h + 213},
										{x:134,y:this.all.textMessage.h + 213},
										{x:194,y:this.all.textMessage.h + 213},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 184,
										w:356,
										h:49
									},{
										x:254,
										y:this.all.textMessage.h + 203,
										w:21,
										h:11.5	
									}]
								}else{
	//								学生信息（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:356,
										h:220
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											content:element.name,
											x:64.4,
											y:this.all.existAttentionMatters.rectangle.y + 7 +(210/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 209,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 295,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 315,
										y: this.all.textMessage.h + 35
									};
								}
							}else{
	//							考试号位数小于9
								this.all.numberFormat.basic = [ 
									{x:464,y:this.all.textMessage.h+13,w:240,h:219},
									{x:463.5,y:this.all.textMessage.h+65.5,w:240,h:1},
									{x:463.5,y:this.all.textMessage.h+38.5,w:240,h:1},
									{x:555.5,y:this.all.textMessage.h+30.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 464 + (index + 1) * (240 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 464 + ((240 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (240 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								学生信息（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:438,
										h:156
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											content:element.name,
											x:64.4,
											y:this.all.existAttentionMatters.rectangle.y + 7+(150/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 267,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 377,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 397,
										y: this.all.textMessage.h + 35
									};
	//								缺考标记(无注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:115,y:this.all.textMessage.h + 213},
										{x:175,y:this.all.textMessage.h + 213},
										{x:235,y:this.all.textMessage.h + 213},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 184,
										w:438,
										h:49
									},{
										x:295,
										y:this.all.textMessage.h + 203,
										w:21,
										h:11.5	
									}]
								}else{
	//								学生信息（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:438,
										h:220
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											content:element.name,
											x:64.4,
											y:this.all.existAttentionMatters.rectangle.y + 7 +(210/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 267,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 377,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 397,
										y: this.all.textMessage.h + 35
									};
								}
							}
	          			}
	          		}
				}
				
			}else if(this.all.scantronFormat == 2){
							// 考试号
				this.all.numberFormat.square = [];
				this.all.numberFormat.verticalLine = [];
				for (let i = 0; i < this.bounced.numberFormat.num; i++) {
					this.all.numberFormat.square.push([
						{ content: 0, fontx: 474.08, fonty: 163.35, rectx: 468.58, recty: 154.85, rectw: 16.5, recth: 10 },
						{ content: 1, fontx: 474.08, fonty: 179.35, rectx: 468.58, recty: 170.85, rectw: 16.5, recth: 10 },
						{ content: 2, fontx: 474.08, fonty: 195.35, rectx: 468.58, recty: 186.85, rectw: 16.5, recth: 10 },
						{ content: 3, fontx: 474.08, fonty: 211.35, rectx: 468.58, recty: 202.85, rectw: 16.5, recth: 10 },
						{ content: 4, fontx: 474.08, fonty: 227.35, rectx: 468.58, recty: 218.85, rectw: 16.5, recth: 10 },
						{ content: 5, fontx: 474.08, fonty: 243.35, rectx: 468.58, recty: 234.85, rectw: 16.5, recth: 10 },
						{ content: 6, fontx: 474.08, fonty: 259.35, rectx: 468.58, recty: 250.85, rectw: 16.5, recth: 10 },
						{ content: 7, fontx: 474.08, fonty: 275.35, rectx: 468.58, recty: 266.85, rectw: 16.5, recth: 10 },
						{ content: 8, fontx: 474.08, fonty: 291.35, rectx: 468.58, recty: 282.85, rectw: 16.5, recth: 10 },
						{ content: 9, fontx: 474.08, fonty: 307.35, rectx: 468.58, recty: 298.85, rectw: 16.5, recth: 10 }
					]);
					if (i != this.bounced.numberFormat.num - 1) {
						this.all.numberFormat.verticalLine.push({ x: 490.16, y: 121.5, w: 1, h: 193 });
					}
				}
				if(this.all.pottedLine){
					// 有密封线学生信息坐标计算
					this.all.textMessage.w = 664;
					let num = this.all.basicInfor.length;
					this.all.basicInfor.forEach((ele,index)=>{
						ele.rect={
							x:51,
							y:252+651/num*(num-1-index),
							w:1,
							h:651/num - 47
						},
						ele.font=[{
							content:ele.name.charAt(0),
							x:48,
							y:ele.rect.y + ele.rect.h + 33, 
						},{
							content:ele.name.charAt(1),
							x:48,
							y:ele.rect.y + ele.rect.h + 18, 
						}]
					});
					if(this.all.existAttentionMatters.bol){
						this.all.existAttentionMatters.font = [
							{ x: 38, y: this.all.textMessage.h + 40 },
							{ x: 38, y: this.all.textMessage.h + 59 },
							{ x: 38, y: this.all.textMessage.h + 78 },
							{ x: 38, y: this.all.textMessage.h + 97 }, 
							{ x: 38, y: this.all.textMessage.h + 116 }
						];
						this.all.existAttentionMatters.rectangle = {
							x: 11,
							y: this.all.textMessage.h + 13,
							w: 684,
							h: 114
						};
						this.all.rect ={
							x:11,
							y:this.all.existAttentionMatters.rectangle.y + this.all.existAttentionMatters.rectangle.h +15,
							w:684,
							h:1006 - this.all.existAttentionMatters.rectangle.y - this.all.existAttentionMatters.rectangle.h
						}
					}else{
						this.all.rect ={
							x:11,
							y:this.all.textMessage.h + 13,
							w:684,
							h:1008 - this.all.textMessage.h
						}
					}
				}else{
					this.all.textMessage.w = 712;
					if(this.all.existAttentionMatters.bol){
						let num = this.all.basicInfor.length;
						this.all.basicInfor.forEach((element, index) => {
							element.font = [{
								content:element.name,
								x: 11 + index * 745 / num,
								y: this.all.textMessage.h + 28
							}];
							element.rectangle = {
								x: 43 + index * 745 / num,
								w: 693 / num - 40,
								y: this.all.textMessage.h + 28,
								h: 1
							};
						});
						this.btnState.basicInfor.font = {
							x: 671,
							y: this.all.textMessage.h + 15
						};
						this.btnState.basicInfor.rectangle = {
							x: 691,
							y: this.all.textMessage.h + 35
						};
						if(this.all.numberFormat.content == 2 || this.all.numberFormat.content == 3){
							//						注意事项坐标计算（无密封线，条形码或者二维码）
							this.all.existAttentionMatters.font = [
								{ x: 38, y: this.all.textMessage.h + 101 },
								{ x: 38, y: this.all.textMessage.h + 119 },
								{ x: 38, y: this.all.textMessage.h + 137 },
								{ x: 38, y: this.all.textMessage.h + 155 }, 
								{ x: 38, y: this.all.textMessage.h + 173 }
							];
							this.all.existAttentionMatters.rectangle = {
								x: 11,
								y: this.all.textMessage.h + 43,
								w:477,
								h:175
							};
							this.all.rect ={
								x:11,
								y:this.all.existAttentionMatters.rectangle.y + this.all.existAttentionMatters.rectangle.h +15,
								w:731,
								h:1006 - this.all.existAttentionMatters.rectangle.y - this.all.existAttentionMatters.rectangle.h
							}
							if(this.all.markingMissExamination.bol){
	//							条形码活二维码坐标计算（有注意事项，有缺考标记）
								this.all.numberFormat.rect={
									x:503,
									y:this.all.textMessage.h + 43,
									w:240,
									h:110
								}
								this.all.numberFormat.font={
									x:573,
									y:this.all.textMessage.h + 103
								}
	//							缺考标记计算（无密封线，有注意事项，条形码或二维码）
								this.all.markingMissExamination.font=[
									{x:538,y:this.all.textMessage.h + 198},
									{x:598,y:this.all.textMessage.h + 198},
									{x:628,y:this.all.textMessage.h + 198},
								]
								this.all.markingMissExamination.rect=[{
									x:503,
									y:this.all.textMessage.h + 169,
									w:240,
									h:49
								},{
									x:688,
									y:this.all.textMessage.h + 188,
									w:21,
									h:11.5	
								}]
							}else{
	//							条形码活二维码坐标计算（有注意事项，无缺考标记）
								this.all.numberFormat.rect={
									x:503,
									y:this.all.textMessage.h + 43,
									w:240,
									h:175
								}
								this.all.numberFormat.font={
									x:573,
									y:this.all.textMessage.h + 135.5
								}
							}
						}else{
							this.btnState.numberFormat.font = {x:691,y:this.all.textMessage.h+65};
							this.btnState.numberFormat.rect = {x:671,y:this.all.textMessage.h+45,w:70,h:30};
							this.all.rect ={
								x:11,
								y:this.btnState.numberFormat.rect.h+this.btnState.numberFormat.rect.y+203,
								w:732,
								h:818-this.btnState.numberFormat.rect.h-this.btnState.numberFormat.rect.y
							}
							if(this.bounced.numberFormat.num>=10){
	//							考试号（有注意事项，考试号位数大于9）
								this.all.numberFormat.basic = [ 
									{x:421,y:this.all.textMessage.h+43,w:322,h:219},
									{x:420.5,y:this.all.textMessage.h+95.5,w:323,h:1},
									{x:420.5,y:this.all.textMessage.h+68.5,w:323,h:1},
									{x:553.5,y:this.all.textMessage.h+60.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 421 + (index + 1) * (320 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 421 + ((320 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (320 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								注意事项（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 38, y: this.all.textMessage.h + 91 },
										{ x: 38, y: this.all.textMessage.h + 109 },
										{ x: 38, y: this.all.textMessage.h + 127 },
										{ x: 38, y: this.all.textMessage.h + 145 }, 
										{ x: 38, y: this.all.textMessage.h + 163 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:395,
										h:156
									};
	//								缺考标记(有注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:93.5,y:this.all.textMessage.h + 243},
										{x:153.5,y:this.all.textMessage.h + 243},
										{x:213.5,y:this.all.textMessage.h + 243},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 214,
										w:395,
										h:49
									},{
										x:273.5,
										y:this.all.textMessage.h + 233,
										w:21,
										h:11.5	
									}]
								}else{
	//								注意事项（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 38, y: this.all.textMessage.h + 121 },
										{ x: 38, y: this.all.textMessage.h + 139 },
										{ x: 38, y: this.all.textMessage.h + 157 },
										{ x: 38, y: this.all.textMessage.h + 175 }, 
										{ x: 38, y: this.all.textMessage.h + 193 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:395,
										h:220
									};
								}
							}else{
								//							考试号位数小于9
								this.all.numberFormat.basic = [ 
									{x:503,y:this.all.textMessage.h+43,w:240,h:219},
									{x:502.5,y:this.all.textMessage.h+95.5,w:240,h:1},
									{x:502.5,y:this.all.textMessage.h+68.5,w:240,h:1},
									{x:594.5,y:this.all.textMessage.h+60.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 503 + (index + 1) * (240 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 503 + ((240 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (240 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								注意事项（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 58, y: this.all.textMessage.h + 91 },
										{ x: 58, y: this.all.textMessage.h + 109 },
										{ x: 58, y: this.all.textMessage.h + 127 },
										{ x: 58, y: this.all.textMessage.h + 145 }, 
										{ x: 58, y: this.all.textMessage.h + 163 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:477,
										h:156
									};
	//								缺考标记(有注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:134.5,y:this.all.textMessage.h + 243},
										{x:194.5,y:this.all.textMessage.h + 243},
										{x:254.5,y:this.all.textMessage.h + 243},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 214,
										w:477,
										h:49
									},{
										x:314.5,
										y:this.all.textMessage.h + 233,
										w:21,
										h:11.5	
									}]
								}else{
	//								注意事项（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.font = [
										{ x: 58, y: this.all.textMessage.h + 121 },
										{ x: 58, y: this.all.textMessage.h + 139 },
										{ x: 58, y: this.all.textMessage.h + 157 },
										{ x: 58, y: this.all.textMessage.h + 175 }, 
										{ x: 58, y: this.all.textMessage.h + 193 }
									];
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 43,
										w:477,
										h:220
									};
								}
							}
						}
					}else{
						if(this.all.numberFormat.content == 2 || this.all.numberFormat.content == 3){
							//        				学生信息(无注意事项,条形码或二维码)
							this.all.existAttentionMatters.rectangle = {
								x: 11,
								y: this.all.textMessage.h + 13,
								w:477,
								h:175
							};
							let num = this.all.basicInfor.length+1;
							this.all.basicInfor.forEach((element, index) => {
								element.font = [{
									content:element.name,
									x:76.5,
									y:this.all.existAttentionMatters.rectangle.y+ 7 +(170/num)*(index+1) 
								}];
								element.rectangle = {
									x: 122,
									w: 293,
									y: element.font[0].y,
									h: 1
								};
							});
							this.btnState.basicInfor.font = {
								x: 416,
								y: this.all.textMessage.h + 15
							};
							this.btnState.basicInfor.rectangle = {
								x: 436,
								y: this.all.textMessage.h + 35
							};
							this.all.rect ={
								x:11,
								y:this.all.existAttentionMatters.rectangle.y+this.all.existAttentionMatters.rectangle.h + 15,
								w:732,
								h:1006-this.all.existAttentionMatters.rectangle.y-this.all.existAttentionMatters.rectangle.h
							}
							if(this.all.markingMissExamination.bol){
	//							条形码活二维码坐标计算（无注意事项，有缺考标记）
								this.all.numberFormat.rect={
									x:503,
									y:this.all.textMessage.h + 13,
									w:240,
									h:110
								}
								this.all.numberFormat.font={
									x:573,
									y:this.all.textMessage.h + 73
								}
	//							缺考标记计算（无密封线，无注意事项，条形码或二维码）
								this.all.markingMissExamination.font=[
									{x:538,y:this.all.textMessage.h + 168},
									{x:598,y:this.all.textMessage.h + 168},
									{x:628,y:this.all.textMessage.h + 168},
								]
								this.all.markingMissExamination.rect=[{
									x:503,
									y:this.all.textMessage.h + 139,
									w:240,
									h:49
								},{
									x:688,
									y:this.all.textMessage.h + 158,
									w:21,
									h:11.5	
								}]
							}else{
	//							条形码活二维码坐标计算（无注意事项，无缺考标记）
								this.all.numberFormat.rect={
									x:464,
									y:this.all.textMessage.h + 13,
									w:240,
									h:175
								}
								this.all.numberFormat.font={
									x:534,
									y:this.all.textMessage.h + 105.5
								}
							}
						}else{
							this.btnState.numberFormat.font = {x:691,y:this.all.textMessage.h+35}
							this.btnState.numberFormat.rect = {x:671,y:this.all.textMessage.h+15,w:70,h:30}
							this.all.rect ={
								x:11,
								y:this.btnState.numberFormat.rect.y+this.btnState.numberFormat.rect.h+203,
								w:732,
								h:818-this.btnState.numberFormat.rect.y-this.btnState.numberFormat.rect.h
							}
							if(this.bounced.numberFormat.num>=10){
								//							考试号（有注意事项，考试号位数大于9）
								this.all.numberFormat.basic = [ 
									{x:421,y:this.all.textMessage.h+13,w:322,h:219},
									{x:420.5,y:this.all.textMessage.h+65.5,w:323,h:1},
									{x:420.5,y:this.all.textMessage.h+38.5,w:323,h:1},
									{x:553.5,y:this.all.textMessage.h+30.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 421 + (index + 1) * (320 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 421 + ((320 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (320 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								学生信息（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:395,
										h:156
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											content:element.name,
											x:64.4,
											y:this.all.existAttentionMatters.rectangle.y + 7 +(150/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 236,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 334,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 354,
										y: this.all.textMessage.h + 35
									};
	//								缺考标记(有注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:93.5,y:this.all.textMessage.h + 213},
										{x:153.5,y:this.all.textMessage.h + 213},
										{x:213.5,y:this.all.textMessage.h + 213},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 184,
										w:395,
										h:49
									},{
										x:273.5,
										y:this.all.textMessage.h + 203,
										w:21,
										h:11.5	
									}]
								}else{
	//								学生信息（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:395,
										h:220
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											content:element.name,
											x:64.4,
											y:this.all.existAttentionMatters.rectangle.y + 7 +(210/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 236,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 334,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 354,
										y: this.all.textMessage.h + 35
									};
								}
							}else{
								//							考试号位数小于9
								this.all.numberFormat.basic = [ 
									{x:503,y:this.all.textMessage.h+13,w:240,h:219},
									{x:502.5,y:this.all.textMessage.h+65.5,w:240,h:1},
									{x:502.5,y:this.all.textMessage.h+38.5,w:240,h:1},
									{x:594.5,y:this.all.textMessage.h+30.5}
								];
								this.all.numberFormat.verticalLine.forEach((ele, index) => {
									ele.x = 503 + (index + 1) * (240 / this.bounced.numberFormat.num);
									ele.y = this.all.numberFormat.basic[0].y + 26.5
								});
								this.all.numberFormat.square.forEach((ele, index) => {
									ele.forEach((ele1, index1) => {
										ele1.rectx = 503 + ((240 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (240 / this.bounced.numberFormat.num);
										ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
										ele1.fontx = ele1.rectx + 5.5;
										ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
									});
								});
								if(this.all.markingMissExamination.bol){
	//								学生信息（有缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:477,
										h:156
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											x:64.4,
											content:element.name,
											y:this.all.existAttentionMatters.rectangle.y + 7+(150/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 293,
											y: element.font[0].y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 416,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 436,
										y: this.all.textMessage.h + 35
									};
	//								缺考标记(无注意事项,填涂框，考试位数大于9)
									this.all.markingMissExamination.font=[
										{x:134.5,y:this.all.textMessage.h + 213},
										{x:194.5,y:this.all.textMessage.h + 213},
										{x:254.5,y:this.all.textMessage.h + 213},
									]
									this.all.markingMissExamination.rect=[{
										x:11,
										y:this.all.textMessage.h + 184,
										w:477,
										h:49
									},{
										x:314.5,
										y:this.all.textMessage.h + 203,
										w:21,
										h:11.5	
									}]
								}else{
	//								学生信息（无缺考标记，填涂框，考试位数大于9）
									this.all.existAttentionMatters.rectangle = {
										x: 11,
										y: this.all.textMessage.h + 13,
										w:477,
										h:220
									};
									let num = this.all.basicInfor.length+1;
									this.all.basicInfor.forEach((element, index) => {
										element.font = [{
											x:64.4,
											content:element.name,
											y:this.all.existAttentionMatters.rectangle.y + 7 +(210/num)*(index+1) 
										}];
										element.rectangle = {
											x: 104.4,
											w: 293,
											y: element.font.y,
											h: 1
										};
									});
									this.btnState.basicInfor.font = {
										x: 416,
										y: this.all.textMessage.h + 15
									};
									this.btnState.basicInfor.rectangle = {
										x: 436,
										y: this.all.textMessage.h + 35
									};
								}
							}
						}
					}
				}
			}else if(this.all.scantronFormat == 3){
				// 考试号
				this.all.numberFormat.square = [];
				this.all.numberFormat.verticalLine = [];
				for (let i = 0; i < this.bounced.numberFormat.num; i++) {
					this.all.numberFormat.square.push([
						{ content: 0, fontx: 474.08, fonty: 163.35, rectx: 468.58, recty: 154.85, rectw: 16.5, recth: 10 },
						{ content: 1, fontx: 474.08, fonty: 179.35, rectx: 468.58, recty: 170.85, rectw: 16.5, recth: 10 },
						{ content: 2, fontx: 474.08, fonty: 195.35, rectx: 468.58, recty: 186.85, rectw: 16.5, recth: 10 },
						{ content: 3, fontx: 474.08, fonty: 211.35, rectx: 468.58, recty: 202.85, rectw: 16.5, recth: 10 },
						{ content: 4, fontx: 474.08, fonty: 227.35, rectx: 468.58, recty: 218.85, rectw: 16.5, recth: 10 },
						{ content: 5, fontx: 474.08, fonty: 243.35, rectx: 468.58, recty: 234.85, rectw: 16.5, recth: 10 },
						{ content: 6, fontx: 474.08, fonty: 259.35, rectx: 468.58, recty: 250.85, rectw: 16.5, recth: 10 },
						{ content: 7, fontx: 474.08, fonty: 275.35, rectx: 468.58, recty: 266.85, rectw: 16.5, recth: 10 },
						{ content: 8, fontx: 474.08, fonty: 291.35, rectx: 468.58, recty: 282.85, rectw: 16.5, recth: 10 },
						{ content: 9, fontx: 474.08, fonty: 307.35, rectx: 468.58, recty: 298.85, rectw: 16.5, recth: 10 }
					]);
					if (i != this.bounced.numberFormat.num - 1) {
						this.all.numberFormat.verticalLine.push({ x: 490.16, y: 121.5, w: 1, h: 193 });
					}
				}
				if(this.all.pottedLine){
					// 有密封线学生信息坐标计算
					this.all.textMessage.w = 429;
					let num = this.all.basicInfor.length;
					this.all.basicInfor.forEach((ele,index)=>{
						ele.rect={
							x:51,
							y:252+651/num*(num-1-index),
							w:1,
							h:651/num - 47
						},
						ele.font=[{
							content:ele.name.charAt(0),
							x:48,
							y:ele.rect.y + ele.rect.h + 33, 
						},{
							content:ele.name.charAt(1),
							x:48,
							y:ele.rect.y + ele.rect.h + 18, 
						}]
					});
					if(this.all.existAttentionMatters.bol){
						// 注意事项
						this.all.existAttentionMatters.font = [
							{ x: 38, y: this.all.textMessage.h + 40 },
							{ x: 38, y: this.all.textMessage.h + 59 },
							{ x: 38, y: this.all.textMessage.h + 78 },
							{ x: 38, y: this.all.textMessage.h + 97 }, 
							{ x: 38, y: this.all.textMessage.h + 116 }
						];
						this.all.existAttentionMatters.rectangle = {
							x: 11,
							y: this.all.textMessage.h + 13,
							w: 449,
							h: 114
						};
						this.all.rect ={
							x:11,
							y:this.all.existAttentionMatters.rectangle.y + this.all.existAttentionMatters.rectangle.h +15,
							w:449,
							h:1006 - this.all.existAttentionMatters.rectangle.y - this.all.existAttentionMatters.rectangle.h
						}
					}else{
						this.all.rect ={
							x:11,
							y:this.all.textMessage.h + 13,
							w:449,
							h:1008 - this.all.textMessage.h
						}
					}
				}else{
					// 考试标题宽度
					this.all.textMessage.w = 461;
					if(this.all.numberFormat.content == 2 || this.all.numberFormat.content == 3){
						if(this.all.existAttentionMatters.bol){
							this.all.rect ={
								x:11,
								y:this.all.textMessage.h + 322,
								w:481,
								h:699 - this.all.textMessage.h 
							}
						}else{
							this.all.rect ={
								x:11,
								y:this.all.textMessage.h + 203,
								w:481,
								h:788 - this.all.textMessage.h
							}
						}
						this.all.basicInfor1 = {
							x: 11,
							y: this.all.textMessage.h + 13,
							w:226,
							h:175
						};
						let num = this.all.basicInfor.length+1;
						this.all.basicInfor.forEach((element, index) => {
							element.font = [{
								x:45,
								content:element.name,
								y:this.all.basicInfor1.y+ 7 +(170/num)*(index+1) 
							}];
							element.rectangle = {
								x: 85,
								w: 118,
								y: element.font[0].y,
								h: 1
							};
						});
						this.btnState.basicInfor.font = {
							x: 165,
							y: this.all.textMessage.h + 15
						};
						this.btnState.basicInfor.rectangle = {
							x: 185,
							y: this.all.textMessage.h + 35
						};
						this.all.existAttentionMatters.font = [
							{ x: 38, y: this.all.textMessage.h + 225 },
							{ x: 38, y: this.all.textMessage.h + 244 },
							{ x: 38, y: this.all.textMessage.h + 263 },
							{ x: 38, y: this.all.textMessage.h + 282 }, 
							{ x: 38, y: this.all.textMessage.h + 301 }
						];
						this.all.existAttentionMatters.rectangle = {
							x: 11,
							y: this.all.textMessage.h + 203,
							w: 481,
							h: 104
						};
						if(this.all.markingMissExamination.bol){
								//							条形码活二维码坐标计算（有注意事项，有缺考标记）
							this.all.numberFormat.rect={
								x:252,
								y:this.all.textMessage.h + 13,
								w:240,
								h:110
							}
							this.all.numberFormat.font={
								x:322,
								y:this.all.textMessage.h + 73
							}
//							缺考标记计算（无密封线，有注意事项，条形码或二维码）
							this.all.markingMissExamination.font=[
								{x:287,y:this.all.textMessage.h + 168},
								{x:347,y:this.all.textMessage.h + 168},
								{x:377,y:this.all.textMessage.h + 168},
							]
							this.all.markingMissExamination.rect=[{
								x:252,
								y:this.all.textMessage.h + 139,
								w:240,
								h:49
							},{
								x:437,
								y:this.all.textMessage.h + 158,
								w:21,
								h:11.5	
							}]
						}else{
							this.all.numberFormat.rect={
								x:252,
								y:this.all.textMessage.h + 13,
								w:240,
								h:175
							}
							this.all.numberFormat.font={
								x:322,
								y:this.all.textMessage.h + 103
							}
						}
					}else if(this.all.numberFormat.content == 1){
						this.btnState.numberFormat.font = {x:440,y:this.all.textMessage.h+35};
						this.btnState.numberFormat.rect = {x:420,y:this.all.textMessage.h+15,w:70,h:30};
						if(this.all.existAttentionMatters.bol){
							this.all.rect ={
								x:11,
								y:this.all.textMessage.h + 367,
								w:481,
								h:655 - this.all.textMessage.h 
							}
						}else{
							this.all.rect ={
								x:11,
								y:this.all.textMessage.h + 248,
								w:481,
								h:774 - this.all.textMessage.h
							}
						}
						if(this.bounced.numberFormat.num>=10){
							this.all.numberFormat.basic = [ 
								{x:170,y:this.all.textMessage.h+13,w:322,h:219},
								{x:169.5,y:this.all.textMessage.h+65.5,w:323,h:1},
								{x:169.5,y:this.all.textMessage.h+38.5,w:323,h:1},
								{x:302.5,y:this.all.textMessage.h+30.5}
							];
							this.all.numberFormat.verticalLine.forEach((ele, index) => {
								ele.x = 170 + (index + 1) * (320 / this.bounced.numberFormat.num);
								ele.y = this.all.numberFormat.basic[0].y + 26.5
							});
							this.all.numberFormat.square.forEach((ele, index) => {
								ele.forEach((ele1, index1) => {
									ele1.rectx = 170 + ((320 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (320 / this.bounced.numberFormat.num);
									ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
									ele1.fontx = ele1.rectx + 5.5;
									ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
								});
							});
							this.all.existAttentionMatters.font = [
								{ x: 38, y: this.all.textMessage.h + 270 },
								{ x: 38, y: this.all.textMessage.h + 289 },
								{ x: 38, y: this.all.textMessage.h + 308 },
								{ x: 38, y: this.all.textMessage.h + 327 }, 
								{ x: 38, y: this.all.textMessage.h + 346 }
							];
							this.all.existAttentionMatters.rectangle = {
								x: 11,
								y: this.all.textMessage.h + 248,
								w:481,
								h:106
							};
							if(this.all.markingMissExamination.bol){
								this.all.basicInfor1 = {
									x: 11,
									y: this.all.textMessage.h + 13,
									w:144,
									h:156
								};
								let num = this.all.basicInfor.length+1;
								this.all.basicInfor.forEach((element, index) => {
									element.font = [{
										x:32.6,
										content:element.name,
										y:this.all.basicInfor1.y+ 7 +(150/num)*(index+1) 
									}];
									element.rectangle = {
										x: 72.6,
										w: 60.8,
										y: element.font[0].y,
										h: 1
									};
								});
								this.btnState.basicInfor.font = {
									x: 83,
									y: this.all.textMessage.h + 15
								};
								this.btnState.basicInfor.rectangle = {
									x: 103,
									y: this.all.textMessage.h + 35
								};
								this.all.markingMissExamination.font=[
									{x:25.5,y:this.all.textMessage.h + 203},
									{x:45.5,y:this.all.textMessage.h + 222},
									{x:90.5,y:this.all.textMessage.h + 203},
								]
								this.all.markingMissExamination.rect=[{
									x:11,
									y:this.all.textMessage.h + 184,
									w:144,
									h:49
								},{
									x:110.5,
									y:this.all.textMessage.h + 213,
									w:21,
									h:11.5	
								}]
							}else{
								this.all.basicInfor1 = {
									x: 11,
									y: this.all.textMessage.h + 13,
									w:144,
									h:220
								};
								let num = this.all.basicInfor.length+1;
								this.all.basicInfor.forEach((element, index) => {
									element.font = [{
										x:32.6,
										content:element.name,
										y:this.all.basicInfor1.y+ 7 +(220/num)*(index+1) 
									}];
									element.rectangle = {
										x: 72.6,
										w: 60.8,
										y: element.font[0].y,
										h: 1
									};
								});
								this.btnState.basicInfor.font = {
									x: 83,
									y: this.all.textMessage.h + 15
								};
								this.btnState.basicInfor.rectangle = {
									x: 103,
									y: this.all.textMessage.h + 35
								};
							}
						}else{
							this.all.numberFormat.basic = [ 
								{x:252,y:this.all.textMessage.h+13,w:240,h:219},
								{x:251.5,y:this.all.textMessage.h+65.5,w:240,h:1},
								{x:251.5,y:this.all.textMessage.h+38.5,w:240,h:1},
								{x:343.5,y:this.all.textMessage.h+30.5}
							];
							this.all.numberFormat.verticalLine.forEach((ele, index) => {
								ele.x = 252 + (index + 1) * (240 / this.bounced.numberFormat.num);
								ele.y = this.all.numberFormat.basic[0].y + 26.5
							});
							this.all.numberFormat.square.forEach((ele, index) => {
								ele.forEach((ele1, index1) => {
									ele1.rectx = 252 + ((240 / this.bounced.numberFormat.num - 16.5) / 2 )+ index * (240 / this.bounced.numberFormat.num);
									ele1.recty = this.all.numberFormat.basic[0].y + 59.85 + index1 * 16;
									ele1.fontx = ele1.rectx + 5.5;
									ele1.fonty = this.all.numberFormat.basic[0].y + 68.35 + index1 * 16;
								});
							});
							this.all.existAttentionMatters.font = [
								{ x: 38, y: this.all.textMessage.h + 270 },
								{ x: 38, y: this.all.textMessage.h + 289 },
								{ x: 38, y: this.all.textMessage.h + 308 },
								{ x: 38, y: this.all.textMessage.h + 327 }, 
								{ x: 38, y: this.all.textMessage.h + 346 }
							];
							this.all.existAttentionMatters.rectangle = {
								x: 11,
								y: this.all.textMessage.h + 248,
								w:481,
								h:106
							};
							if(this.all.markingMissExamination.bol){
								this.all.basicInfor1 = {
									x: 11,
									y: this.all.textMessage.h + 13,
									w:226,
									h:156
								};
								let num = this.all.basicInfor.length+1;
								this.all.basicInfor.forEach((element, index) => {
									element.font = [{
										x:44,
										content:element.name,
										y:this.all.basicInfor1.y+ 7 +(150/num)*(index+1) 
									}];
									element.rectangle = {
										x: 85,
										w: 118,
										y: element.font[0].y,
										h: 1
									};
								});
								this.btnState.basicInfor.font = {
									x: 165,
									y: this.all.textMessage.h + 15
								};
								this.btnState.basicInfor.rectangle = {
									x: 185,
									y: this.all.textMessage.h + 35
								};
								this.all.markingMissExamination.font=[
									{x:39,y:this.all.textMessage.h + 213},
									{x:99,y:this.all.textMessage.h + 213},
									{x:129,y:this.all.textMessage.h + 213},
								]
								this.all.markingMissExamination.rect=[{
									x:11,
									y:this.all.textMessage.h + 184,
									w:226,
									h:49
								},{
									x:189,
									y:this.all.textMessage.h + 213,
									w:21,
									h:11.5	
								}]
							}else{
								this.all.basicInfor1 = {
									x: 11,
									y: this.all.textMessage.h + 13,
									w:226,
									h:220
								};
								let num = this.all.basicInfor.length+1;
								this.all.basicInfor.forEach((element, index) => {
									element.font = [{
										x:44,
										content:element.name,
										y:this.all.basicInfor1.y+ 7 +(220/num)*(index+1) 
									}];
									element.rectangle = {
										x: 85,
										w: 118,
										y: element.font[0].y,
										h: 1
									};
								});
								this.btnState.basicInfor.font = {
									x: 165,
									y: this.all.textMessage.h + 15
								};
								this.btnState.basicInfor.rectangle = {
									x: 185,
									y: this.all.textMessage.h + 35
								};
							}
						}
					}
				}
			}
			console.log(this.all.textMessage)
			this.calculatedCoordinates();
		},
		calculatedCoordinates(){
			if(this.execution){
				this.rendering.arr1 = JSON.parse(JSON.stringify(this.all.arr));
				this.rendering.arr2 = [];
				if(this.rendering.arr1.length>0){
					this.rendering.arr1.forEach((ele,index)=>{
						if(ele.questionType =="1" || ele.questionType =="2" || ele.questionType == "4"){
							let arr = [];
							ele.content.forEach((ele1,index1)=>{
								ele1.arr.forEach((ele2,index2)=>{
									arr.push(ele2)
								})
							})
							let arr1 = [];
							for(let i = arr.length; i>0 ; i = i-ele.perGroup){
								arr1.push(arr.splice(0,ele.perGroup))
							}
							ele.arr = arr1;
							if(index == 0){
								ele.infor.rect.y = this.all.rect.y + ele.infor.font.h + 20;
								ele.infor.font.y = this.all.rect.y + 10;
							}else{
								ele.infor.rect.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + ele.infor.font.h + 20;
								ele.infor.font.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							let h = 7;
							if(this.all.existVerticalRow){
								let num = parseInt((ele.infor.rect.w+10)/(24*ele.perGroup + 20));
								ele.arr.some((ele1,index1)=>{
									let a = parseInt(index1/num);
									let b = 0;
									let c = 0;
									if((a+1)*num < ele.arr.length){
										c = (a+1)*num ;
									}else{
										c = ele.arr.length
									}
									for(let i = a*num; i<c;i++){
										ele.arr[i].forEach((e,i)=>{
											if(e.options.length > b){
												b = e.options.length;
											}
										})
									}
									if(index1 == 0){
										if(ele.infor.rect.y + 22 * b + 20 > (this.all.rect.y + this.all.rect.h - 30)){
											let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
											this.rendering.arr2.push(arr);
											return true;
										}
										ele1[0].num.x =	ele.infor.rect.x +18; 
										ele1[0].num.y =	ele.infor.rect.y + 17;
										if(h < ele1[0].num.y +  22*b){
											h = ele1[0].num.y +  22*b ;
										}
									}else{
										if(index1%num == 0){
											let a = parseInt(index1/num);
											let d = 0;
											for(let i = (a-1)*num; i<a*num;i++){
												ele.arr[i].forEach((e,i)=>{
													if(e.options.length > d){
														d = e.options.length;
													}
												})
											}
											if(ele.arr[index1-1][0].num.y + 34 + 22*(b+d)>(this.all.rect.y + this.all.rect.h - 30) ){
												let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
												let  obj = JSON.parse(JSON.stringify(ele));
												let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
												obj.arr =arr1;
												obj.isShear = true;
												arr.unshift(obj);
												this.rendering.arr2.push(arr)
												return true;
											}else{
												ele1[0].num.x =	ele.infor.rect.x +18; 
												ele1[0].num.y =	ele.arr[index1-1][0].num.y + 34 + 22*d;
												if(h < ele1[0].num.y +  22*b){
													h = ele1[0].num.y +  22*b ;
												}
											}
											
										}else{
											ele1[0].num.x =	ele.arr[index1-1][0].num.x + 20 + 24*ele.perGroup; 
											ele1[0].num.y =	ele.arr[index1-1][0].num.y
										}

									}
									ele1.forEach((ele2,index2)=>{
										if(index2 > 0){
											ele2.num.x = ele1[index2-1].num.x + 24;
											ele2.num.y = ele1[index2-1].num.y;
											if(h < ele2.num.y +  22*b){
												h = ele2.num.y +  22*b ;
											}
										}
										ele2.options.forEach((ele3,index3)=>{
											if(index3 == 0){
												ele3.fontx =ele2.num.x - 2.5;
												ele3.fonty =ele2.num.y + 15.5;
												ele3.rectx =ele2.num.x - 8;
												ele3.recty =ele2.num.y + 7;
											}else{
												ele3.fontx = ele2.options[index3-1].fontx;
												ele3.fonty = ele2.options[index3-1].fonty+22;
												ele3.rectx = ele2.options[index3-1].rectx;
												ele3.recty = ele2.options[index3-1].recty+22;
											}
											
										})
									})
									if(ele.topicArea  &&   index1 == ele.arr.length-1){
										ele.topicArea.rect.x = ele.infor.rect.x;
										ele.topicArea.rect.y = h + 13;
										ele.topicArea.rect.w = ele.infor.rect.w;
										if(h + 13 + ele.topicArea.rect.h>990){
											let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
											let  obj = JSON.parse(JSON.stringify(ele));
											ele.topicArea.rect.h = 990 - h - 13;
											obj.topicArea.isShear =true;
											obj.topicArea.rect.h = obj.topicArea.rect.h - ele.topicArea.rect.h
											obj.isShear =true;
											obj.arr = [];
											arr.unshift(obj);
											this.rendering.arr2.push(arr)
											ele.infor.rect.h = 990 - ele.infor.rect.y;
											return ;
										}else{
											ele.infor.rect.h = h + 13 + ele.topicArea.rect.h- ele.infor.rect.y;
										}
									}else{
										ele.infor.rect.h = h + 13 - ele.infor.rect.y;
									}
								})
							}else{
								ele.arr.some((ele1,index1)=>{
									let num = ele1[0].options.length;
									ele1.forEach(ele2=>{
										if(num < ele2.options.length){
											num = ele2.options.length
										}
									})
									if(index1 == 0){
										if(ele.infor.rect.y + 19 + 22 * ele.perGroup >(this.all.rect.y +this.all.rect.h-20)){
											let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
											this.rendering.arr2.push(arr);
											return true;
										}else{
											ele1[0].num.x =	ele.infor.rect.x +24; 
											ele1[0].num.y =	ele.infor.rect.y + 19;
											if(h < ele1[0].num.y){
												h = ele1[0].num.y;
											}
										}
									}else{
										let num1 = ele.arr[index1-1][0].options.length;
										ele.arr[index1-1].forEach(ele1=>{
											if(num1 < ele1.options.length){
												num1 = ele1.options.length
											}
										})
										if(ele.arr[index1-1][0].num.x + 72 + (num+num1)*24 > (this.all.rect.x +this.all.rect.w + 20) ){
											if(ele.arr[index1-1][0].num.y + 20 + 44 * ele.perGroup >(this.all.rect.y +this.all.rect.h-20) ){
												let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
												let  obj = JSON.parse(JSON.stringify(ele));
												let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
												obj.arr =arr1;
												obj.isShear = true;
												arr.unshift(obj);
												this.rendering.arr2.push(arr)
												h = ele.arr[index1-1][ele.arr[index1-1].length-1].num.y;
												return true;
											}
											ele1[0].num.x =	ele.infor.rect.x +24;
											ele1[0].num.y = ele.arr[index1-1][0].num.y + 20 + 22 * ele.perGroup;
											if(h < ele1[0].num.y){
												h = ele1[0].num.y;
											}
										}else{
											ele1[0].num.x = ele.arr[index1-1][0].num.x + 36 + num1 *24;
											ele1[0].num.y = ele.arr[index1-1][0].num.y ;
										}
									}
									ele1.forEach((ele2,index2)=>{
										if(index2 > 0){
											ele2.num.x = ele1[index2-1].num.x;
											ele2.num.y = ele1[index2-1].num.y + 22;
											if(h < ele2.num.y){
												h = ele2.num.y;
											}
										}
										ele2.options.forEach((ele3,index3)=>{
											if(index3 == 0){
												ele3.fontx =ele2.num.x + 15.5;
												ele3.fonty =ele2.num.y - 0.5;
												ele3.rectx =ele2.num.x +10;
												ele3.recty =ele2.num.y - 9;
											}else{
												ele3.fontx = ele2.options[index3-1].fontx + 24;
												ele3.fonty = ele2.options[index3-1].fonty;
												ele3.rectx = ele2.options[index3-1].rectx +24;
												ele3.recty = ele2.options[index3-1].recty;
											}
										})
									})
									if(ele.topicArea  &&   index1 == ele.arr.length-1){
										ele.topicArea.rect.x = ele.infor.rect.x;
										ele.topicArea.rect.y = h + 13;
										ele.topicArea.rect.w = ele.infor.rect.w;
										if(h + 13 + ele.topicArea.rect.h>990){
											let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
											let  obj = JSON.parse(JSON.stringify(ele));
											ele.topicArea.rect.h = 990 - h - 13;
											obj.topicArea.isShear =true;
											obj.topicArea.rect.h = obj.topicArea.rect.h - ele.topicArea.rect.h
											obj.isShear =true;
											obj.arr = [];
											arr.unshift(obj);
											this.rendering.arr2.push(arr)
											ele.infor.rect.h = 990 - ele.infor.rect.y;
											return ;
										}else{
											ele.infor.rect.h = h + 13 + ele.topicArea.rect.h- ele.infor.rect.y;
										}
									}else{
										ele.infor.rect.h = h + 13 - ele.infor.rect.y;
									}
								})
							}
						}else if(ele.questionType == "3"){
							let arr = [];
							ele.content.forEach((e,i)=>{
								let size = 0;
								let size1 = 0;
								if(e.option == "1"  ){
									size = this.all.rect.w - 75;
								}else if(e.option == "2"){
									size = (this.all.rect.w - 120)/2;
								}else if(e.option == "3"){
									size = (this.all.rect.w - 165)/3;
								}else if(e.option == "4"){
									size = (this.all.rect.w - 210)/4;
								}else if(e.option == "5" || e.option == ""){
									size = (this.all.rect.w - 255)/5;
								}
								if(size<55){
									size = 55;
								}
								size1  = this.all.rect.w - 75;;
								e.arr.forEach((ele1,index1)=>{
									if(ele1.arr.length == 1){
										if(ele1.longBlank){
											for(let i=0;i<ele1.arr[0].number;i++){
												let obj = {
													content:i==0?ele1.num.content:"",
													size:size1,
													font:{},
													rect:{},
													lineFeed: ele1.arr[0].lineFeed,
													i:i,
													index1:index1,
													index2:0
												}
												arr.push(obj)
											}
										}else{
											let obj = {
												content:ele1.num.content,
												size:ele1.arr[0].size + size ,
												font:{},
												rect:{},
												lineFeed: ele1.arr[0].lineFeed,
												i:i,
												index1:index1,
												index2:0
											}
											arr.push(obj)
										}
									}else{
										ele1.arr.forEach((ele2,index2)=>{
											if(ele1.longBlank){
												for(let i=0;i<ele2.number;i++){
													let obj = {
														content:i==0?index2 == 0?ele1.num.content + "(" + (index2+1) + ")":"(" + (index2+1) + ")":"",
														// content:i==0?ele1.num.content:"",
														size:size1,
														font:{},
														rect:{},
														lineFeed: ele1.arr[0].lineFeed,
														i:i,
														index1:index1,
														index2:index2
													}
													arr.push(obj)
												}
											}else{
												let obj = {
													content:index2 == 0?ele1.num.content + "(" + (index2+1) + ")":"(" + (index2+1) + ")",
													size:ele2.size +size,
													font:{},
													rect:{},
													lineFeed: ele2.lineFeed,
													i:i,
													index1:index1,
													index2:index2
												}
												arr.push(obj)
											}
										})
									}
								})
							})
							ele.arr = arr;
							if(index == 0){
								ele.infor.rect.y = this.all.rect.y + ele.infor.font.h + 20;
								ele.infor.font.y = this.all.rect.y + 10;
							}else{
								ele.infor.rect.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + ele.infor.font.h + 20;
								ele.infor.font.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + 10;
								
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1 == 0 ){
									if((ele.infor.rect.y+ele.lineHeight*3 +1) > (this.all.rect.y +this.all.rect.h -30)){
										let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
										this.rendering.arr2.push(arr);
										return true;
									}else{
										ele1.font.x = ele.infor.rect.x+10;
										ele1.font.y = ele.infor.rect.y+ele.lineHeight*3 - 2;
										ele1.rect.x = ele1.font.x+20;
										ele1.rect.y = ele1.font.y+3;
									}
								}else{
									if(ele.arr[index1-1].rect.x+ ele.arr[index1-1].size + 25+20+ele1.size > (this.all.rect.x +this.all.rect.w -20) || ele1.lineFeed ){
										if(ele.arr[index1-1].rect.y +10 + ele.lineHeight*3 - 2 > (this.all.rect.y +this.all.rect.h -30)){
											let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
											let  obj = JSON.parse(JSON.stringify(ele));
											let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
											obj.arr =arr1;
											obj.isShear = true;
											arr.unshift(obj);
											this.rendering.arr2.push(arr)
											ele.infor.rect.h = ele.arr[index1-1].rect.y +10 - ele.infor.rect.y;
											return true;
										}else{
											ele1.font.x= ele.infor.rect.x+10;
											ele1.font.y= ele.arr[index1-1].rect.y +10 + ele.lineHeight*3 - 2;
										}
									}else{
										ele1.font.x= ele.arr[index1-1].rect.x+ ele.arr[index1-1].size + 25;
										ele1.font.y= ele.arr[index1-1].font.y;
									}
									ele1.rect.x = ele1.font.x+20;
									ele1.rect.y = ele1.font.y+3;
								}
								
								if(ele.topicArea  &&   index1 == ele.arr.length-1){
									ele.topicArea.rect.x = ele.infor.rect.x;
									ele.topicArea.rect.y = ele1.rect.y +10;
									ele.topicArea.rect.w = ele.infor.rect.w;
									if(ele1.rect.y +10 + ele.topicArea.rect.h>990){
										let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										ele.topicArea.rect.h = 990 - ele1.rect.y - 10;
										obj.topicArea.isShear =true;
										obj.topicArea.rect.h = obj.topicArea.rect.h - ele.topicArea.rect.h
										obj.isShear =true;
										obj.arr = [];
										arr.unshift(obj);
										this.rendering.arr2.push(arr)
										ele.infor.rect.h = 990 - ele.infor.rect.y;
										return true;
									}else{
										ele.infor.rect.h = ele1.rect.y +10 + ele.topicArea.rect.h - ele.infor.rect.y;
									}
								}else{
									ele.infor.rect.h = ele1.rect.y +10 - ele.infor.rect.y;
								}
							})
						}else if(ele.questionType == "13"){
							let arr = [];
							ele.content.forEach((e,i)=>{
								e.arr.forEach((ele1,index1)=>{
									if(ele1.arr.length == 1){
										arr.push({
											arr:[{
												words:ele1.arr[0].words,
												bol:ele1.arr[0].bol,
												img:ele1.arr[0].img
											}],
											h:ele1.arr[0].h,
											i:i,
											index1:index1,
											index2:0,
										})
									}else{
										if(ele1.mode == "vertical"){
											ele1.arr.forEach((ele2,index2)=>{
												arr.push({
													arr:[{
														words:ele1.arr[index2].words,
														bol:ele1.arr[index2].bol,
														img:ele1.arr[index2].img
													}],
													h:ele2.h,
													mode:"vertical",
													i:i,
													index1:index1,
													index2:index2,
													bol1:index2==0?true:false
												})
											})
										}else{
											ele1.arr.forEach((ele2,index2)=>{
												if(index2%2 != 0){
													if(index2 == 1){
														arr.push({
															arr:[{
																words:ele1.arr[index2-1].words,
																bol:ele1.arr[index2-1].bol,
																img:ele1.arr[index2-1].img,
															},{
																words:ele1.arr[index2].words,
																bol:ele1.arr[index2].bol,
																img:ele1.arr[index2].img
															}],
															h:ele1.arr[index2-1].h,
															mode:"transverse",
															i:i,
															index1:index1,
															index2:index2-1,
															bol1:true
														})
													}else{
														arr.push({
															arr:[{
																words:ele1.arr[index2-1].words,
																bol:ele1.arr[index2-1].bol,
																img:ele1.arr[index2-1].img
															},{
																words:ele1.arr[index2].words,
																bol:ele1.arr[index2].bol,
																img:ele1.arr[index2].img
															}],
															h:ele1.arr[index2-1].h,
															mode:"transverse",
															i:i,
															index1:index1,
															index2:index2-1
														})
													}
												}
												if(index2 == ele1.arr.length-1  && index2%2 == 0){
													arr.push({
														arr:[{
															words:ele1.arr[index2].words,
															bol:ele1.arr[index2].bol,
															img:ele1.arr[index2].img
														}],
														h:ele2.h,
														mode:"transverse",
														i:i,
														index1:index1,
														index2:index2
													})
												}
											})
										}
									}
								})
							})
							ele.arr = arr;
							if(index == 0){
								ele.infor.rect.y = this.all.rect.y + ele.infor.font.h + 20;
								ele.infor.font.y = this.all.rect.y + 10;
							}else{
								ele.infor.rect.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + ele.infor.font.h + 20;
								ele.infor.font.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1==0){
									if(ele.infor.rect.y > (this.all.rect.y +this.all.rect.h - 30 )){
										let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
										this.rendering.arr2.push(arr);
										return true;
									}
									if(ele1.arr.length == 1){
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.infor.rect.y;
										ele1.arr[0].w = ele.infor.rect.w;
									}else{
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.infor.rect.y;
										ele1.arr[0].w = ele.infor.rect.w/2;
										ele1.arr[1].x = ele.infor.rect.x + ele1.arr[0].w;
										ele1.arr[1].y = ele.infor.rect.y;
										ele1.arr[1].w = ele.infor.rect.w/2;
									}
									if(ele1.arr[0].y + ele1.h > (this.all.rect.y +this.all.rect.h - 30 )){
										let num =  this.all.rect.y +this.all.rect.h - 20  - ele1.arr[0].y;
										let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 20  - ele.infor.rect.y;
										return true;
									}
								}else{
									if(ele1.arr.length == 1){
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.arr[index1-1].arr[0].y + ele.arr[index1-1].h
										ele1.arr[0].w = ele.infor.rect.w;
									}else{
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.arr[index1-1].arr[0].y + ele.arr[index1-1].h;
										ele1.arr[0].w = ele.infor.rect.w/2;
										ele1.arr[1].x = ele.infor.rect.x + ele1.arr[0].w;
										ele1.arr[1].y = ele1.arr[0].y;
										ele1.arr[1].w = ele.infor.rect.w/2;
									}
									if(ele1.arr[0].y + ele1.h > (this.all.rect.y +this.all.rect.h - 30 )){
										let num =  this.all.rect.y +this.all.rect.h - 20  - ele1.arr[0].y;
										let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 20  - ele.infor.rect.y;
										return true;
									}
								}
								if(index1 == ele.arr.length-1){
									ele.infor.rect.h = ele1.arr[0].y + ele1.h - ele.infor.rect.y;
								}
							})
						}else if(ele.questionType == "15"){
							let arr = [];
							ele.content.forEach((e,i)=>{
								e.number1.forEach((ele1,index1)=>{
									let obj = JSON.parse(JSON.stringify(ele1));
									obj.num = [];
									obj.i = i;
									obj.index1 = index1;
									e.arr.forEach(ele2=>{
										obj.num.push({content:ele2.num.content})
									})
									arr.push(obj)								
								})
							})
							ele.arr = arr;
							if(index == 0){
								ele.infor.rect.y = this.all.rect.y + ele.infor.font.h + 20;
								ele.infor.font.y = this.all.rect.y + 10;
							}else{
								ele.infor.rect.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + ele.infor.font.h + 20;
								ele.infor.font.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1==0){
									if(ele.infor.rect.y > (this.all.rect.y +this.all.rect.h - 30 )){
										let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
										this.rendering.arr2.push(arr);
										return true;
									}
									ele1.x = ele.infor.rect.x;
									ele1.y = ele.infor.rect.y;
									ele1.w = ele.infor.rect.w;
									if(ele1.y + ele1.h > (this.all.rect.y +this.all.rect.h - 30 )){
										let num =  this.all.rect.y +this.all.rect.h - 20  - ele1.y;
										let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 30  - ele.infor.rect.y;
										return true;
									}
								}else{
									ele1.x = ele.infor.rect.x;
									ele1.y = ele.arr[index1-1].y + ele.arr[index1-1].h
									ele1.w = ele.infor.rect.w;
									if(ele1.y + ele1.h > (this.all.rect.y +this.all.rect.h - 30 )){
										let num =  this.all.rect.y +this.all.rect.h - 20  - ele1.y;
										let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 30  - ele.infor.rect.y;
										return true;
									}
								}
								if(index1 == ele.arr.length-1){
									ele.infor.rect.h = ele1.y + ele1.h - ele.infor.rect.y;
								}
							})
						}else if(ele.questionType == "14"){
							let arr = [];
							ele.content.forEach((ele1,index1)=>{
								ele1.arr.forEach((ele2,index2)=>{
									let obj = JSON.parse(JSON.stringify(ele2));
									obj.i = index1;
									obj.index1 = index2;
									obj.line = {x1:"",y1:"",x2:"",y2:""};
									obj.arr = [];
									if(obj.fangshi == "square"){
										obj.size =( this.all.rect.w - 40 )/ele2.wordNumberLine;
										let num ;
										if(Number(ele2.wordNumber)%ele2.wordNumberLine == 0){
											num = ele2.wordNumber;
										}else{
											num = (parseInt(ele2.wordNumber/ ele2.wordNumberLine)+1)* ele2.wordNumberLine;
										}
										for(let i=0;i<num;i++){
											obj.arr.push({
												x:"",
												y:"",
												w:"",
												h:"",
												i:i+1
											})
										}
									}else{
										for(let i=0;i<obj.rowNumber;i++){
											obj.arr.push({
												x1:"",
												y1:"",
												x2:"",
												y2:""
											})
										}
									}
									arr.push(obj)
								})
							});
							ele.arr = arr;
							if(index == 0){
								ele.infor.rect.y = this.all.rect.y + ele.infor.font.h + 20;
								ele.infor.font.y = this.all.rect.y + 10;
							}else{
								ele.infor.rect.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + ele.infor.font.h + 20;
								ele.infor.font.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1 == 0){
									ele1.line.x1 = ele.infor.rect.x;
									ele1.line.y1 = ele.infor.rect.y;
									ele1.line.x2 = ele.infor.rect.x + ele.infor.rect.w;
									ele1.line.y2 = ele.infor.rect.y;
								}else{
									ele1.line.x1 = ele.infor.rect.x;
									ele1.line.x2 = ele.infor.rect.x + ele.infor.rect.w;
									if(ele.arr[index1-1].fangshi == "square"){
										ele1.line.y1 = ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 + ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h;
										ele1.line.y2= ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 + ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h;
									}else{
										ele1.line.y1 = ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10;
										ele1.line.y2 = ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10;
									}
								}
								ele1.num.x = ele1.line.x1 + 10;
								ele1.num.y = ele1.line.y1 + 22;
								if(ele1.fangshi == "square"){
									ele1.arr.forEach((e,i)=>{
										if(i == 0){
											if(ele1.num.y + 18 >(this.all.rect.y +this.all.rect.h -70) ){
												if(index1 == 0 ){
													let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
													this.rendering.arr2.push(arr);
													return  true;
												}else{
													if(ele.arr[index1-1].fangshi == "square"){
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 +  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h - ele.infor.rect.y;
													}else{
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10 - ele.infor.rect.y;
													}
													let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
													let  obj = JSON.parse(JSON.stringify(ele));
													let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
													obj.arr = arr1;
													obj.isShear = true;
													arr.unshift(obj);
													this.rendering.arr2.push(arr);
													return  true;
												}
											}else{
												e.x=ele1.num.x;
												e.y=ele1.num.y + 18;
												e.w=ele1.size;
												e.h=ele1.size
											}
										}else{
											if(i%ele1.wordNumberLine == 0){
												if(ele1.arr[i-1].y + ele1.size + 6.5 > (this.all.rect.y +this.all.rect.h -70)){
													ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y + 10 + ele1.arr[ele1.arr.length-1].h - ele.infor.rect.y;
													let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
													let  obj = JSON.parse(JSON.stringify(ele));
													let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
													let  obj1 = JSON.parse(JSON.stringify(ele1));
													let  arr2 = ele1.arr.splice(i,ele1.arr.length-i);
													obj1.arr = arr2;
													obj1.isShear = true;
													arr1.unshift(obj1)
													obj.arr = arr1;
													obj.isShear = true;
													arr.unshift(obj);
													this.rendering.arr2.push(arr);
													return true;
												}else{
													e.x=ele1.num.x;
													e.y=ele1.arr[i-1].y + ele1.size + 6.5;
													e.w=ele1.size;
													e.h=ele1.size
												}
											}else{
												e.x=ele1.arr[i-1].x + ele1.size;
												e.y=ele1.arr[i-1].y;
												e.w=ele1.size;
												e.h=ele1.size
											}
										}
									})
								}else{
									ele1.arr.some((e,i)=>{
										if(i == 0){
											if(ele1.num.y + ele1.rowHeight*4 + 8 >(this.all.rect.y +this.all.rect.h -30) ){
												if(index1 == 0 ){
													let  arr = this.rendering.arr1.splice(index,this.rendering.arr1.length-index);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return true;
												}else{
													if(ele.arr[index1-1].fangshi == "square"){
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 +  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h - ele.infor.rect.y;
													}else{
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10 - ele.infor.rect.y;
													}
													let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
													let  obj = JSON.parse(JSON.stringify(ele));
													let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
													obj.arr = arr1;
													obj.isShear = true;
													arr.unshift(obj);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return true;
												}
											}else{
												e.x1 =ele1.num.x;
												e.x2 =ele1.num.x + this.all.rect.w -40;
												e.y1 =ele1.num.y + ele1.rowHeight*4 + 8;
												e.y2 =ele1.num.y + ele1.rowHeight*4 + 8;
											}
										}else{
											if(ele1.arr[i-1].y1 + ele1.rowHeight*4 > (this.all.rect.y +this.all.rect.h -30)){
												ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y1 + 10 - ele.infor.rect.y;
												let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
												let  obj = JSON.parse(JSON.stringify(ele));
												let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
												let  obj1 = JSON.parse(JSON.stringify(ele1));
												let  arr2 = ele1.arr.splice(i,ele1.arr.length-i);
												obj1.arr = arr2;
												obj1.isShear = true;
												arr1.unshift(obj1)
												obj.arr = arr1;
												obj.isShear = true;
												arr.unshift(obj);
												this.rendering.arr2.push(arr);
												this.calculatedCoordinates1();
												return true;
											}else{
												e.x1 =ele1.num.x;
												e.x2 =ele1.num.x+this.all.rect.w-40;
												e.y1 =ele1.arr[i-1].y1 + ele1.rowHeight*4;
												e.y2 =ele1.arr[i-1].y1 + ele1.rowHeight*4;
											}
										}
									})
								}
								if(index1 == (ele.arr.length-1)){
									if(ele1.fangshi == "square"){
										ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y + 10 + ele1.arr[ele1.arr.length-1].h - ele.infor.rect.y;
									}else{
										ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y1 + 10 - ele.infor.rect.y;
									} 
								}
							})
						}else if(ele.questionType == "16"){
							if(index == 0){
								ele.infor.rect.y = this.all.rect.y  + 10;
							}else{
								ele.infor.rect.y = this.rendering.arr1[index-1].infor.rect.y + this.rendering.arr1[index-1].infor.rect.h  + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							if((38* Number(ele.rowNumber)+ele.infor.rect.y) > (this.all.rect.h +this.all.rect.y -30)){
								ele.infor.rect.h = this.all.rect.h +this.all.rect.y -20  - ele.infor.rect.y;
								let  arr = this.rendering.arr1.splice(index+1,this.rendering.arr1.length-index-1);
								let  obj = JSON.parse(JSON.stringify(ele));
								obj.infor.rect.h = 38* Number(ele.rowNumber) - ele.infor.rect.h;
								obj.isShear = true;
								arr.unshift(obj);
								this.rendering.arr2.push(arr);
								return true;
							}else{
								ele.infor.rect.h = 38* Number(ele.rowNumber);
							}
						}
					})	
					this.calculatedCoordinates1();
				}
			}
		},
		calculatedCoordinates1(){
			if(this.rendering.arr2.length>0){
				this.rendering.arr2.forEach((item,num)=>{
					item.forEach((ele,index)=>{
						if(ele.questionType =="1" || ele.questionType =="2" || ele.questionType == "4"){
							if(!ele.isShear && !ele.arr){
								let arr = [];
								ele.content.forEach((ele1,index1)=>{
									ele1.arr.forEach((ele2,index2)=>{
										arr.push(ele2)
									})
								})
								let arr1 = [];
								for(let i = arr.length; i>0 ; i = i-ele.perGroup){
									arr1.push(arr.splice(0,ele.perGroup))
								}
								ele.arr = arr1;
							}
							if(ele.isShear){
								ele.infor.rect.y = 35;
							}else if(index == 0){
								ele.infor.rect.y = ele.infor.font.h+45;
								ele.infor.font.y = 35;
							}else{
								ele.infor.rect.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 20 +ele.infor.font.h;
								ele.infor.font.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							let h = 7;
							if(this.all.existVerticalRow){
								let num = parseInt((ele.infor.rect.w+10)/(24*ele.perGroup + 20));
								ele.arr.some((ele1,index1)=>{
									let a = parseInt(index1/num);
									let b = 0;
									let c = 0;
									if((a+1)*num < ele.arr.length){
										c = (a+1)*num ;
									}else{
										c = ele.arr.length
									}
									for(let i = a*num; i<c;i++){
										ele.arr[i].forEach((e,i)=>{
											if(e.options.length > b){
												b = e.options.length;
											}
										})
									}
									if(index1 == 0){
										if(ele.infor.rect.y + 22 * b + 20> (this.all.rect.y + this.all.rect.h - 30)){
											let  arr = item.splice(index,item.length-index);
											this.rendering.arr2.push(arr);
											this.calculatedCoordinates1();
											return true;
										}
										ele1[0].num.x =	ele.infor.rect.x +18; 
										ele1[0].num.y =	ele.infor.rect.y + 17;
										if(h < ele1[0].num.y +  22*b){
											h = ele1[0].num.y +  22*b ;
										}
									}else{
										if(index1%num == 0){
											let a = parseInt(index1/num);
											let d = 0;
											for(let i = (a-1)*num; i<a*num;i++){
												ele.arr[i].forEach((e,i)=>{
													if(e.options.length > d){
														d = e.options.length;
													}
												})
											}
											if(ele.arr[index1-1][0].num.y + 34 + 22*(b+d)>(this.all.rect.y + this.all.rect.h - 30) ){
												let  arr = item.splice(index+1,item.length-index-1);
												let  obj = JSON.parse(JSON.stringify(ele));
												let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
												obj.arr =arr1;
												obj.isShear = true;
												arr.unshift(obj);
												this.rendering.arr2.push(arr);
												this.calculatedCoordinates1();
												return true;
											}else{
												ele1[0].num.x =	ele.infor.rect.x +18; 
												ele1[0].num.y =	ele.arr[index1-1][0].num.y + 34 + 22*d;
												if(h < ele1[0].num.y +  22*b){
													h = ele1[0].num.y +  22*b ;
												}
											}
										}else{
											ele1[0].num.x =	ele.arr[index1-1][0].num.x + 20 + 24*ele.perGroup; 
											ele1[0].num.y =	ele.arr[index1-1][0].num.y
										}

									}
									ele1.forEach((ele2,index2)=>{
										if(index2 > 0){
											ele2.num.x = ele1[index2-1].num.x + 24;
											ele2.num.y = ele1[index2-1].num.y;
											if(h < ele2.num.y +  22*b){
												h = ele2.num.y +  22*b ;
											}
										}
										ele2.options.forEach((ele3,index3)=>{
											if(index3 == 0){
												ele3.fontx =ele2.num.x - 2.5;
												ele3.fonty =ele2.num.y + 15.5;
												ele3.rectx =ele2.num.x - 8;
												ele3.recty =ele2.num.y + 7;
											}else{
												ele3.fontx = ele2.options[index3-1].fontx;
												ele3.fonty = ele2.options[index3-1].fonty+22;
												ele3.rectx = ele2.options[index3-1].rectx;
												ele3.recty = ele2.options[index3-1].recty+22;
											}
											
										})
									})
									if(ele.topicArea  &&   index1 == ele.arr.length-1){
										ele.topicArea.rect.x = ele.infor.rect.x;
										ele.topicArea.rect.y = h + 13;
										ele.topicArea.rect.w = ele.infor.rect.w;
										if(h + 13 + ele.topicArea.rect.h>990){
											let  arr = item.arr1.splice(index+1,item.length-index-1);
											let  obj = JSON.parse(JSON.stringify(ele));
											ele.topicArea.rect.h = 990 - h - 13;
											obj.topicArea.isShear =true;
											obj.topicArea.rect.h = obj.topicArea.rect.h - ele.topicArea.rect.h
											obj.isShear =true;
											obj.arr = [];
											arr.unshift(obj);
											this.rendering.arr2.push(arr)
											ele.infor.rect.h = 990 - ele.infor.rect.y;
											this.calculatedCoordinates1();
											return ;
										}else{
											ele.infor.rect.h = h + 13 + ele.topicArea.rect.h- ele.infor.rect.y;
										}
									}else{
										ele.infor.rect.h = h + 13 - ele.infor.rect.y;
									}
								})
							}else{
								ele.arr.forEach((ele1,index1)=>{
									let num = ele1[0].options.length;
									ele1.forEach(ele2=>{
										if(num < ele2.options.length){
											num = ele2.options.length
										}
									})
									if(index1 == 0){
										if(ele.infor.rect.y + 19 + 22 * ele.perGroup >(this.all.rect.y +this.all.rect.h-20)){
											let  arr = item.splice(index,item.length-index);
											this.rendering.arr2.push(arr);
											this.calculatedCoordinates1();
											return;
										}else{
											ele1[0].num.x =	ele.infor.rect.x +24; 
											ele1[0].num.y =	ele.infor.rect.y + 19;
											if(h < ele1[0].num.y){
												h = ele1[0].num.y;
											}
										}
									}else{
										let num1 = ele.arr[index1-1][0].options.length;
										ele.arr[index1-1].forEach(ele1=>{
											if(num1 < ele1.options.length){
												num1 = ele1.options.length
											}
										})
										if(ele.arr[index1-1][0].num.x + 72 + (num+num1)*24 > (this.all.rect.x +this.all.rect.w +20) ){
											if(ele.arr[index1-1][0].num.y + 20 + 44 * ele.perGroup >990 ){
												let  arr = item.splice(index+1,item.length-index-1);
												let  obj = JSON.parse(JSON.stringify(ele));
												let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
												obj.arr =arr1;
												obj.isShear = true;
												arr.unshift(obj);
												this.rendering.arr2.push(arr)
												h = ele.arr[index1-1][ele.arr[index1-1].length-1].num.y;
												this.calculatedCoordinates1();
												return;
											}else{
												ele1[0].num.x =	ele.infor.rect.x +24;
												ele1[0].num.y = ele.arr[index1-1][0].num.y + 20 + 22 * ele.perGroup;
												if(h < ele1[0].num.y){
													h = ele1[0].num.y;
												}
											}
											
										}else{
											ele1[0].num.x = ele.arr[index1-1][0].num.x + 36 + num1 *24;
											ele1[0].num.y = ele.arr[index1-1][0].num.y ;
										}
									}
									ele1.forEach((ele2,index2)=>{
										if(index2 > 0){
											ele2.num.x = ele1[index2-1].num.x;
											ele2.num.y = ele1[index2-1].num.y + 22;
											if(h < ele2.num.y){
												h = ele2.num.y;
											}
										}
										ele2.options.forEach((ele3,index3)=>{
											if(index3 == 0){
												ele3.fontx =ele2.num.x + 15.5;
												ele3.fonty =ele2.num.y - 0.5;
												ele3.rectx =ele2.num.x +10;
												ele3.recty =ele2.num.y -9;
											}else{
												ele3.fontx = ele2.options[index3-1].fontx + 24;
												ele3.fonty = ele2.options[index3-1].fonty;
												ele3.rectx = ele2.options[index3-1].rectx +24;
												ele3.recty = ele2.options[index3-1].recty;
											}
										})
									})
									if(ele.topicArea  &&   index1 == ele.arr.length-1){
										ele.topicArea.rect.x = ele.infor.rect.x;
										ele.topicArea.rect.w = ele.infor.rect.w;
										ele.topicArea.rect.y = h + 13;
										if(h + 13 + ele.topicArea.rect.h>990){
											let  arr = item.splice(index+1,item.length-index-1);
											let  obj = JSON.parse(JSON.stringify(ele));
											ele.topicArea.rect.h = 990 - h - 13;
											obj.topicArea.isShear =true;
											obj.topicArea.rect.h = obj.topicArea.rect.h - ele.topicArea.rect.h
											obj.isShear =true;
											obj.arr = [];
											arr.unshift(obj);
											this.rendering.arr2.push(arr)
											ele.infor.rect.h = 990 - ele.infor.rect.y;
											this.calculatedCoordinates1();
											return ;
										}else{
											ele.infor.rect.h = h + 13 + ele.topicArea.rect.h- ele.infor.rect.y;
										}
									}else{
										ele.infor.rect.h = h + 13 - ele.infor.rect.y;
									}
								})
							}
							if(ele.topicArea  &&  ele.topicArea.isShear ){
								ele.topicArea.rect.x = ele.infor.rect.x;
								ele.topicArea.rect.w = ele.infor.rect.w;
								ele.topicArea.rect.y = h + 13;
								ele.infor.rect.h = h + 13 + ele.topicArea.rect.h- ele.infor.rect.y;
							}
							
						}else if(ele.questionType =="3"){
							if(!ele.isShear && !ele.arr){
								let size = 0;
								let size1 = 0;
								if(this.all.pottedLine){
									if(ele.content[0].option == "1"  ){
										size = 522;
									}else if(ele.content[0].option == "2"){
										size = 238.5;
									}else if(ele.content[0].option == "3"){
										size = 144;
									}else if(ele.content[0].option == "4"){
										size = 96.75;
									}else if(ele.content[0].option == "5" || ele.content[0].option == ""){
										size = 68.4;
									}
									size1 = 522;
								}else{
									if(ele.content[0].option == "1"  ){
										size = 618;
									}else if(ele.content[0].option == "2"){
										size = 286.5;
									}else if(ele.content[0].option == "3"){
										size = 176;
									}else if(ele.content[0].option == "4"){
										size = 120.75;
									}else if(ele.content[0].option == "5" || ele.content[0].option == ""){
										size = 87.6;
									}
									size1 = 618;
								}
								let arr = [];
								ele.content.forEach((e,i)=>{
									e.arr.forEach((ele1,index1)=>{
										if(ele1.arr.length == 1){
											if(ele1.longBlank){
												for(let i=0;i<ele1.arr[0].number;i++){
													let obj = {
														content:i==0?ele1.num.content:"",
														size:size1,
														font:{},
														rect:{},
														lineFeed: ele1.arr[0].lineFeed,
														i:i,
														index1:index1,
														index2:0
													}
													arr.push(obj)
												}
											}else{
												let obj = {
													content:ele1.num.content,
													size:ele1.arr[0].size + size ,
													font:{},
													rect:{},
													lineFeed: ele1.arr[0].lineFeed,
													i:i,
													index1:index1,
													index2:0
												}
												arr.push(obj)
											}
										}else{
											ele1.arr.forEach((ele2,index2)=>{
												if(ele1.longBlank){
													for(let i=0;i<ele2.number;i++){
														let obj = {
															content:i==0?index2 == 0?ele1.num.content + "(" + (index2+1) + ")":"(" + (index2+1) + ")":"",
															// content:i==0?ele1.num.content:"",
															size:size1,
															font:{},
															rect:{},
															lineFeed: ele1.arr[0].lineFeed,
															i:i,
															index1:index1,
															index2:index2
														}
														arr.push(obj)
													}
												}else{
													let obj = {
														content:index2 == 0?ele1.num.content + "(" + (index2+1) + ")":"(" + (index2+1) + ")",
														size:ele2.size +size,
														font:{},
														rect:{},
														lineFeed: ele2.lineFeed,
														i:i,
														index1:index1,
														index2:index2
													}
													arr.push(obj)
												}
											})
										}
									})
								})
								ele.arr = arr;
							}
							if(ele.isShear){
								ele.infor.rect.y = 35;
							}else if(index == 0){
								ele.infor.rect.y = ele.infor.font.h+45;
								ele.infor.font.y = 35;
							}else{
								ele.infor.rect.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 20 +ele.infor.font.h;
								ele.infor.font.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.forEach((ele1,index1)=>{
								if(index1 == 0 ){
									if((ele.infor.rect.y+ele.lineHeight*3 +1)>990){
										let arr = item.splice(index,item.length-index);
										this.rendering.arr2.push(arr);
										this.calculatedCoordinates1();
										return;
									}else{
										ele1.font.x = ele.infor.rect.x+10;
										ele1.font.y = ele.infor.rect.y+ele.lineHeight*3 - 2;
										ele1.rect.x = ele1.font.x+20;
										ele1.rect.y = ele1.font.y+3;
									}
								}else{
									if(ele.arr[index1-1].rect.x+ ele.arr[index1-1].size + 25+20+ele1.size >  (this.all.rect.x +this.all.rect.w - 20) || ele1.lineFeed ){
										if(ele.arr[index1-1].rect.y +10 + ele.lineHeight*3 - 2 > 990){
											let  arr = item.splice(index+1,item.length-index-1);
											let  obj = JSON.parse(JSON.stringify(ele));
											let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
											obj.arr =arr1;
											obj.isShear = true;
											arr.unshift(obj);
											this.rendering.arr2.push(arr)
											ele.infor.rect.h = ele.arr[index1-1].rect.y +10 - ele.infor.rect.y;
											this.calculatedCoordinates1();
											return;
										}else{
											ele1.font.x= ele.infor.rect.x+10;
											ele1.font.y= ele.arr[index1-1].rect.y +10 + ele.lineHeight*3 - 2;
										}
									}else{
										ele1.font.x= ele.arr[index1-1].rect.x+ ele.arr[index1-1].size + 25;
										ele1.font.y= ele.arr[index1-1].font.y;
									}
									ele1.rect.x = ele1.font.x+20;
									ele1.rect.y = ele1.font.y+3;
								}
								if(ele.topicArea  &&   index1 == ele.arr.length-1){
									ele.topicArea.rect.x = ele.infor.rect.x;
									ele.topicArea.rect.w = ele.infor.rect.w;
									ele.topicArea.rect.y = ele1.rect.y +10;
									if(ele1.rect.y +10 + ele.topicArea.rect.h>990){
										let  arr = item.splice(index+1,item.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										ele.topicArea.rect.h = 990 - ele1.rect.y - 10;
										obj.topicArea.isShear =true;
										obj.topicArea.rect.h = obj.topicArea.rect.h - ele.topicArea.rect.h
										obj.isShear =true;
										obj.arr = [];
										arr.unshift(obj);
										this.rendering.arr2.push(arr)
										ele.infor.rect.h = 990 - ele.infor.rect.y;
										this.calculatedCoordinates1();
										return ;
									}else{
										ele.infor.rect.h = ele1.rect.y +10 +  ele.topicArea.rect.h- ele.infor.rect.y;
									}
								}else{
									ele.infor.rect.h = ele1.rect.y +10 - ele.infor.rect.y;
								}
							})
							if(ele.topicArea  &&  ele.topicArea.isShear ){
								ele.topicArea.rect.x = ele.infor.rect.x;
								ele.topicArea.rect.y = ele.infor.rect.y;
								ele.topicArea.rect.w = ele.infor.rect.w;
								ele.infor.rect.h =ele.topicArea.rect.h;
							}
						}else if(ele.questionType =="13"){
							if(!ele.isShear && !ele.arr){
								let arr = [];
								ele.content.forEach((e,i)=>{
									e.arr.forEach((ele1,index1)=>{
										if(ele1.arr.length == 1){
											arr.push({
												arr:[{
													words:ele1.arr[0].words,
													bol:ele1.arr[0].bol,
													img:ele1.arr[0].img
												}],
												h:ele1.arr[0].h,
												i:i,
												index1:index1,
												index2:0,
											})
										}else{
											if(ele1.mode == "vertical"){
												ele1.arr.forEach((ele2,index2)=>{
													arr.push({
														arr:[{
															words:ele1.arr[index2].words,
															bol:ele1.arr[index2].bol,
															img:ele1.arr[index2].img
														}],
														h:ele2.h,
														mode:"vertical",
														i:i,
														index1:index1,
														index2:index2,
														bol1:index2==0?true:false
													})
												})
											}else{
												ele1.arr.forEach((ele2,index2)=>{
													if(index2%2 != 0){
														if(index2 == 1){
															arr.push({
																arr:[{
																	words:ele1.arr[index2-1].words,
																	bol:ele1.arr[index2-1].bol,
																	img:ele1.arr[index2-1].img,
																},{
																	words:ele1.arr[index2].words,
																	bol:ele1.arr[index2].bol,
																	img:ele1.arr[index2].img
																}],
																h:ele1.arr[index2-1].h,
																mode:"transverse",
																i:i,
																index1:index1,
																index2:index2-1,
																bol1:true
															})
														}else{
															arr.push({
																arr:[{
																	words:ele1.arr[index2-1].words,
																	bol:ele1.arr[index2-1].bol,
																	img:ele1.arr[index2-1].img
																},{
																	words:ele1.arr[index2].words,
																	bol:ele1.arr[index2].bol,
																	img:ele1.arr[index2].img
																}],
																h:ele1.arr[index2-1].h,
																mode:"transverse",
																i:i,
																index1:index1,
																index2:index2-1
															})
														}
													}
													if(index2 == ele1.arr.length-1  && index2%2 == 0){
														arr.push({
															arr:[{
																words:ele1.arr[index2].words,
																bol:ele1.arr[index2].bol,
																img:ele1.arr[index2].img
															}],
															h:ele2.h,
															mode:"transverse",
															i:i,
															index1:index1,
															index2:index2
														})
													}
												})
											}
										}
									})
								})
								ele.arr = arr;
							}
							if(ele.isShear){
								ele.infor.rect.y = 35;
							}else if(index == 0){
								ele.infor.rect.y = ele.infor.font.h+45;
								ele.infor.font.y = 35;
							}else{
								ele.infor.rect.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 20 +ele.infor.font.h;
								ele.infor.font.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1==0){
									if(ele.infor.rect.y > (this.all.rect.y +this.all.rect.h - 20 )){
										let arr = item.splice(index,item.length-index);
										this.rendering.arr2.push(arr);
										this.calculatedCoordinates1();
										return true;
									}
									if(ele1.arr.length == 1){
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.infor.rect.y;
										ele1.arr[0].w = ele.infor.rect.w;
									}else{
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.infor.rect.y;
										ele1.arr[0].w = ele.infor.rect.w/2;
										ele1.arr[1].x = ele.infor.rect.x + ele1.arr[0].w;
										ele1.arr[1].y = ele.infor.rect.y;
										ele1.arr[1].w = ele.infor.rect.w/2;
									}
									if(ele1.arr[0].y + ele1.h > (this.all.rect.y +this.all.rect.h - 20 )){
										let num =  this.all.rect.y +this.all.rect.h - 20  - ele1.arr[0].y;
										let  arr = item.splice(index+1,item.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 20  - ele.infor.rect.y;
										this.calculatedCoordinates1();
										return true;
									}
								}else{
									if(ele1.arr.length == 1){
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.arr[index1-1].arr[0].y + ele.arr[index1-1].h
										ele1.arr[0].w = ele.infor.rect.w;
									}else{
										ele1.arr[0].x = ele.infor.rect.x;
										ele1.arr[0].y = ele.arr[index1-1].arr[0].y + ele.arr[index1-1].h;
										ele1.arr[0].w = ele.infor.rect.w/2;
										ele1.arr[1].x = ele.infor.rect.x + ele1.arr[0].w;
										ele1.arr[1].y = ele1.arr[0].y;
										ele1.arr[1].w = ele.infor.rect.w/2;
									}
									if(ele1.arr[0].y + ele1.h > (this.all.rect.y +this.all.rect.h - 20 )){
										let num =  this.all.rect.y +this.all.rect.h - 20  - ele1.arr[0].y;
										let  arr = item.splice(index+1,item.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 20  - ele.infor.rect.y;
										this.calculatedCoordinates1();
										return true;
									}
								}
								if(index1 == ele.arr.length-1){
									ele.infor.rect.h = ele1.arr[0].y + ele1.h - ele.infor.rect.y;
								}
							})
						}else if(ele.questionType == "15"){
							if(!ele.isShear && !ele.arr){
								let arr = [];
								ele.content.forEach((e,i)=>{
									e.number1.forEach((ele1,index1)=>{
										let obj = JSON.parse(JSON.stringify(ele1));
										obj.num = [];
										obj.i = i;
										obj.index1 = index1;
										e.arr.forEach(ele2=>{
											obj.num.push({content:ele2.num.content})
										})
										arr.push(obj)								
									})
								})
								ele.arr = arr;
							}
							if(ele.isShear){
								ele.infor.rect.y = 35;
							}else if(index == 0){
								ele.infor.rect.y = ele.infor.font.h+45;
								ele.infor.font.y = 35;
							}else{
								ele.infor.rect.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 20 +ele.infor.font.h;
								ele.infor.font.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1==0){
									if(ele.infor.rect.y > (this.all.rect.y +this.all.rect.h - 30 )){
										let arr = item.splice(index,item.length-index);
										this.rendering.arr2.push(arr);
										this.calculatedCoordinates1();
										return true;
									}
									ele1.x = ele.infor.rect.x;
									ele1.y = ele.infor.rect.y;
									ele1.w = ele.infor.rect.w;
									if(ele1.y + ele1.h > (this.all.rect.y +this.all.rect.h - 30 )){
										let num =  this.all.rect.y +this.all.rect.h - 30  - ele1.y;
										let  arr = item.splice(index+1,item.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 30  - ele.infor.rect.y;
										this.calculatedCoordinates1();
										return true;
									}
								}else{
									ele1.x = ele.infor.rect.x;
									ele1.y = ele.arr[index1-1].y + ele.arr[index1-1].h
									ele1.w = ele.infor.rect.w;
									if(ele1.y + ele1.h > (this.all.rect.y +this.all.rect.h - 30 )){
										let num =  this.all.rect.y +this.all.rect.h - 30  - ele1.y;
										let  arr = item.splice(index+1,item.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
										let  obj1 = JSON.parse(JSON.stringify(ele1));
										let  num1 =  ele1.h - num;
										obj1.h = num1;
										obj1.isShear = true;
										arr1.unshift(obj1);
										obj.arr = arr1;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										ele1.h = num;
										ele.infor.rect.h = this.all.rect.y +this.all.rect.h - 30  - ele.infor.rect.y;
										this.calculatedCoordinates1();
										return true;
									}
								}
								if(index1 == ele.arr.length-1){
									ele.infor.rect.h = ele1.y + ele1.h - ele.infor.rect.y;
								}
							})
							
						}else if(ele.questionType == "14"){
							if(!ele.isShear && !ele.arr){
								let arr = [];
								ele.content.forEach((ele1,index1)=>{
									ele1.arr.forEach((ele2,index2)=>{
										let obj = JSON.parse(JSON.stringify(ele2));
										obj.i = index1;
										obj.index1 = index2;
										obj.line = {x1:"",y1:"",x2:"",y2:""};
										obj.arr = [];
										if(obj.fangshi == "square"){
											obj.size =( this.all.rect.w - 40 )/ele2.wordNumberLine;
											let num ;
											if(Number(ele2.wordNumber)%ele2.wordNumberLine == 0){
												num = ele2.wordNumber;
											}else{
												num = (parseInt(ele2.wordNumber/ ele2.wordNumberLine)+1)* ele2.wordNumberLine;
											}
											for(let i=0;i<num;i++){
												obj.arr.push({
													x:"",
													y:"",
													w:"",
													h:"",
													i:i+1
												})
											}
										}else{
											for(let i=0;i<obj.rowNumber;i++){
												obj.arr.push({
													x1:"",
													y1:"",
													x2:"",
													y2:""
												})
											}
										}
										arr.push(obj)
									})
								});
								ele.arr = arr;
							}
							if(ele.isShear){
								ele.infor.rect.y = 35;
							}else if(index == 0){
								ele.infor.rect.y = ele.infor.font.h+45;
								ele.infor.font.y = 35;
							}else{
								ele.infor.rect.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 20 +ele.infor.font.h;
								ele.infor.font.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							ele.infor.font.x = ele.infor.rect.x;
							ele.infor.font.w = ele.infor.rect.w;
							ele.arr.some((ele1,index1)=>{
								if(index1 == 0){
									ele1.line.x1 = ele.infor.rect.x;
									ele1.line.y1 = ele.infor.rect.y;
									ele1.line.x2 = ele.infor.rect.x + ele.infor.rect.w;
									ele1.line.y2 = ele.infor.rect.y;
								}else{
									ele1.line.x1 = ele.infor.rect.x;
									ele1.line.x2 = ele.infor.rect.x + ele.infor.rect.w;
									if(ele.arr[index1-1].fangshi == "square"){
										ele1.line.y1 = ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 + ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h;
										ele1.line.y2= ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 + ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h;
									}else{
										ele1.line.y1 = ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10;
										ele1.line.y2 = ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10;
									}
								}
								ele1.num.x = ele1.line.x1 + 10;
								if(ele1.isShear){
									ele1.num.y = ele1.line.y1 - 10;
								}else{
									ele1.num.y = ele1.line.y1 + 22;
								}
								if(ele1.fangshi == "square"){
									ele1.arr.forEach((e,i)=>{
										if(i == 0){
											if(ele1.num.y + 18 >(this.all.rect.y +this.all.rect.h -60) ){
												if(index1 == 0 ){
													let  arr = item.splice(index,item.length-index);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return  true;
												}else{
													if(ele.arr[index1-1].fangshi == "square"){
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 +  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h - ele.infor.rect.y;
													}else{
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10 - ele.infor.rect.y;
													}
													let  arr = item.splice(index+1,item.length-index-1);
													let  obj = JSON.parse(JSON.stringify(ele));
													let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
													obj.arr = arr1;
													obj.isShear = true;
													arr.unshift(obj);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return  true;
												}
											}else{
												e.x=ele1.num.x;
												e.y=ele1.num.y + 18;
												e.w=ele1.size;
												e.h=ele1.size
											}
										}else{
											if(i%ele1.wordNumberLine == 0){
												if(ele1.arr[i-1].y + ele1.size + 6.5 > (this.all.rect.y +this.all.rect.h -60)){
													ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y + 10 + ele1.arr[ele1.arr.length-1].h - ele.infor.rect.y;
													let  arr = item.splice(index+1,item.length-index-1);
													let  obj = JSON.parse(JSON.stringify(ele));
													let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
													let  obj1 = JSON.parse(JSON.stringify(ele1));
													let  arr2 = ele1.arr.splice(i,ele1.arr.length-i);
													obj1.arr = arr2;
													obj1.isShear = true;
													arr1.unshift(obj1)
													obj.arr = arr1;
													obj.isShear = true;
													arr.unshift(obj);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return true;
												}else{
													e.x=ele1.num.x;
													e.y=ele1.arr[i-1].y + ele1.size + 6.5;
													e.w=ele1.size;
													e.h=ele1.size
												}
											}else{
												e.x=ele1.arr[i-1].x + ele1.size;
												e.y=ele1.arr[i-1].y;
												e.w=ele1.size;
												e.h=ele1.size
											}
										}
									})
								}else{
									ele1.arr.forEach((e,i)=>{
										if(i == 0){
											if(ele1.num.y + ele1.rowHeight*4 + 8 >(this.all.rect.y +this.all.rect.h -30) ){
												if(index1 == 0 ){
													let  arr = item.splice(index,item.length-index);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return true;
												}else{
													if(ele.arr[index1-1].fangshi == "square"){
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y + 10 +  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].h - ele.infor.rect.y;
													}else{
														ele.infor.rect.h =  ele.arr[index1-1].arr[ele.arr[index1-1].arr.length-1].y1 + 10 - ele.infor.rect.y;
													}
													let  arr =item.splice(index+1,item.length-index-1);
													let  obj = JSON.parse(JSON.stringify(ele));
													let  arr1 = ele.arr.splice(index1,ele.arr.length-index1);
													obj.arr = arr1;
													obj.isShear = true;
													arr.unshift(obj);
													this.rendering.arr2.push(arr);
													this.calculatedCoordinates1();
													return true;
												}
											}else{
												e.x1 =ele1.num.x;
												e.x2 =ele1.num.x + this.all.rect.w -40;
												e.y1 =ele1.num.y + ele1.rowHeight*4 + 8;
												e.y2 =ele1.num.y + ele1.rowHeight*4 + 8;
											}
										}else{
											if(ele1.arr[i-1].y1 + ele1.rowHeight*4 > (this.all.rect.y +this.all.rect.h -30)){
												ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y1 + 10 - ele.infor.rect.y;
												let  arr = item.splice(index+1,item.length-index-1);
												let  obj = JSON.parse(JSON.stringify(ele));
												let  arr1 = ele.arr.splice(index1+1,ele.arr.length-index1-1);
												let  obj1 = JSON.parse(JSON.stringify(ele1));
												let  arr2 = ele1.arr.splice(i,ele1.arr.length-i);
												obj1.arr = arr2;
												obj1.isShear = true;
												arr1.unshift(obj1)
												obj.arr = arr1;
												obj.isShear = true;
												arr.unshift(obj);
												this.rendering.arr2.push(arr);
												this.calculatedCoordinates1();
												return true;
											}else{
												e.x1 =ele1.num.x;
												e.x2 =ele1.num.x+this.all.rect.w-40;
												e.y1 =ele1.arr[i-1].y1 + ele1.rowHeight*4;
												e.y2 =ele1.arr[i-1].y1 + ele1.rowHeight*4;
											}
										}
									})
								}
								if(index1 == (ele.arr.length-1)){
									if(ele1.fangshi == "square"){
										ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y + 10 + ele1.arr[ele1.arr.length-1].h - ele.infor.rect.y;
									}else{
										ele.infor.rect.h = ele1.arr[ele1.arr.length-1].y1 + 10 - ele.infor.rect.y;
									} 
								}
							})
						}else if(ele.questionType == "16"){
							if(ele.isShear){
								ele.infor.rect.y = 35;
							}else{
								ele.infor.rect.y = this.rendering.arr2[num][index-1].infor.rect.y + this.rendering.arr2[num][index-1].infor.rect.h + 10;
							}
							ele.infor.rect.x = this.all.rect.x + 10;
							ele.infor.rect.w = this.all.rect.w - 20;
							if(ele.isShear){
								if((ele.infor.rect.y + ele.infor.rect.h) > (this.all.rect.h +this.all.rect.y -20)){
									let  arr = item.splice(index+1,item.length-index-1);
									let  obj = JSON.parse(JSON.stringify(ele));
									obj.infor.rect.h = ele.infor.rect.h - 990;
									arr.unshift(obj);
									this.rendering.arr2.push(arr);
									ele.infor.rect.h = 990;
									this.calculatedCoordinates1();
									return true;
								}
							}else{
								if(!ele.infor.rect.h){
									if((38* Number(ele.rowNumber)+ele.infor.rect.y) > (this.all.rect.h +this.all.rect.y -20)){
										ele.infor.rect.h = this.all.rect.h +this.all.rect.y -30  - ele.infor.rect.y;
										let  arr = item.splice(index+1,item.length-index-1);
										let  obj = JSON.parse(JSON.stringify(ele));
										obj.infor.rect.h = 38* Number(ele.rowNumber) - ele.infor.rect.h;
										obj.isShear = true;
										arr.unshift(obj);
										this.rendering.arr2.push(arr);
										this.calculatedCoordinates1();
										return true;
									}else{
										ele.infor.rect.h = 38* Number(ele.rowNumber);
									}
								}
							}
						}
					})
				})
			}
		},
//		点击周围自动关闭编辑器
		bodyListener(){
			console.log(this.region.str)
			if(this.region.str){
				for(let i=0;i<8;i++){
					this.$refs[this.region.str][0].parentNode.children[i].style.display = "none";
				}
			}
			this.all.arr.forEach(ele=>{
				if(ele.number == this.obj.number){
					let  num =  0;
					for(let i=0;i<this.$children[0].editor.body.children.length;i++){
						num += this.$children[0].editor.body.children[i].offsetHeight;
					}
					if(this.obj.type == "title"){
						ele.infor.font.content = this.$children[0].editor.body.innerHTML;
						if(num > ele.infor.font.h){
							ele.infor.font.h =  num;
						}
					}else  if(this.obj.type == "13"){
						if(ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].h != this.obj.item.h     &&    !this.obj.item.isShear){
							let  num =  0;
							let  num1 ;
							for(let i=0;i<this.$children[0].editor.body.children.length;i++){
								num += this.$children[0].editor.body.children[i].offsetHeight;
								if(num >this.obj.item.h-8){
									num1 = i;
									break;
								}
							}
							if(num1 != undefined){
								if(num1 == 0){
									if(!this.obj.bol){
										let str = ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[0];
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[0] = '';
										str += ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[1];
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[1] = str;
									}else{
										let str = ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[0];
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[0] = '';
										str += ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[1];
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[1] = str;
									}
								}else{
									if(!this.obj.bol){
										let str  = ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[0];
										for(let i = 0;i<num1;i++){
											str  =  str.substring(4);
											let num2= str.indexOf("</p>");
											str  =  str.substring(num2);
										}
										let str1 = str;
										str1 = str1.substring(4);
										str += ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[1];;
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[1] = str;
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[0] = ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[0].substring(0,ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2+1].words[0].indexOf(str1))
									}else{
										let str  = ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[0];
										for(let i = 0;i<num1;i++){
											str  =  str.substring(4);
											let num2= str.indexOf("</p>");
											str  =  str.substring(num2);
										}
										let str1 = str;
										str1 = str1.substring(4);
										str += ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[1];;
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[1] = str;
										ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[0] = ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[0].substring(0,ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].words[0].indexOf(str1))
									}
								}
							}
						}
						if( num > this.obj.item.h){
							ele.content[this.obj.item.i].arr[this.obj.item.index1].arr[this.obj.item.index2].h +=  num - this.obj.item.h + 10;
						}
					}else if(this.obj.type == "15"){
						if(ele.content[this.obj.item.i].number1[this.obj.item.index1].h != this.obj.item.h     &&    !this.obj.item.isShear){
							let  num =  0;
							let  num1 ;
							for(let i=0;i<this.$children[0].editor.body.children.length;i++){
								num += this.$children[0].editor.body.children[i].offsetHeight;
								if(num >this.obj.item.h-8){
									num1 = i;
									break;
								}
							}
							if(num1 != undefined){
								if(num1 == 0){
									let str = ele.content[this.obj.item.i].number1[this.obj.item.index1].words[0];
									ele.content[this.obj.item.i].number1[this.obj.item.index1].words[0] = '';
									str += ele.content[this.obj.item.i].number1[this.obj.item.index1].words[1];
									ele.content[this.obj.item.i].number1[this.obj.item.index1].words[1] = str;
								}else{
									let str  = ele.content[this.obj.item.i].number1[this.obj.item.index1].words[0];
									for(let i = 0;i<num1;i++){
										str  =  str.substring(4);
										let num2= str.indexOf("</p>");
										str  =  str.substring(num2);
									}
									let str1 = str;
									str1 = str1.substring(4);
									str += ele.content[this.obj.item.i].number1[this.obj.item.index1].words[1];;
									ele.content[this.obj.item.i].number1[this.obj.item.index1].words[1] = str;
									ele.content[this.obj.item.i].number1[this.obj.item.index1].words[0] = ele.content[this.obj.item.i].number1[this.obj.item.index1].words[0].substring(0,ele.content[this.obj.item.i].number1[this.obj.item.index1].words[0].indexOf(str1))
								}
							}
						}
						if( num > this.obj.item.h){
							ele.content[this.obj.item.i].number1[this.obj.item.index1].h +=  num - this.obj.item.h + 10;
						}
					}else   if(ele.questionType =="1" || ele.questionType =="2" || ele.questionType =="3" || ele.questionType =="4" ){
						if(ele.topicArea){
							if(ele.topicArea.rect.h != this.obj.item.topicArea.rect.h    &&    !this.obj.item.topicArea.isShear){
								let  num2 =  0;
								let  num3 ;
								for(let i=0;i<this.$children[0].editor.body.children.length;i++){
									num2 += this.$children[0].editor.body.children[i].offsetHeight;
									if(num2 >this.obj.item.topicArea.rect.h-8){
										num3 = i;
										break;
									}
								}
								if(num3 != undefined){
									if(num3 == 0){
										let str = ele.topicArea.words[0];
										ele.topicArea.words[0] = '';
										str += ele.topicArea.words[1];
										ele.topicArea.words[1] = str;
									}else{
										let str  = ele.topicArea.words[0];
										for(let i = 0;i<num3;i++){
											str  =  str.substring(4);
											let num4= str.indexOf("</p>");
											str  =  str.substring(num4);
										}
										let str1 = str;
										str1 = str1.substring(4);
										str += ele.topicArea.words[1];;
										ele.topicArea.words[1] = str;
										ele.topicArea.words[0] =ele.topicArea.words[0].substring(0,ele.topicArea.words[0].indexOf(str1))
									}
								}
							}
							if(num >this.obj.item.topicArea.rect.h){
								ele.topicArea.rect.h +=  num -this.obj.item.topicArea.rect.h +10;
							}
						}
					}
				}
			})
			this.obj = {
				type:"",
				number:"",
				item:"",
				bol:""
			}
			this.all.textMessage.showFlag = true;
			this.all.arr.forEach((ele)=>{
				ele.infor.font.showFlag = true;
				if(ele.questionType =="13"){
					ele.content.forEach(ele1=>{
						ele1.arr.forEach(ele2=>{
							ele2.arr.forEach(ele3=>{
								ele3.bol[0] = true;
								ele3.bol[1] = true;
								
							})
						})
					})
				}
				if(ele.questionType =="15"){
					ele.content.forEach(ele1=>{
						ele1.number1.forEach(ele2=>{
							ele2.bol[0] = true;
							ele2.bol[1] = true;
						})
					})
				}
				if(ele.questionType =="1" || ele.questionType =="2" || ele.questionType =="3" || ele.questionType =="4" ){
					if(ele.topicArea){
						ele.topicArea.bol[0] = true;
						ele.topicArea.bol[1] = true;
					}
				}
			})
			this.calculatedC();
		},
		// 保存
		preservation(){
			this.all.arr.forEach(ele=>{
				if(ele.questionType == "3"){
					ele.bol1 = false;
				}
			})
			if(this.all.hasSaved == "1"){
				this.bounced.timingBox.open = true;
				this.bounced.timingBox.type = "fail";
				this.bounced.timingBox.tipWord = "已定稿,保存失败";
				setTimeout( ()=>{
					this.bounced.timingBox.open = false;
				},1500);
				return;
			}
			let num = 0;
			let num1 = 0;
			this.all.arr.forEach(e=>{
				num += e.fraction;
				e.content.forEach(ele=>{
					num1 += Number(ele.number)
				})
			}) 
			this.all.sheetTotalScore = num;
			this.all.sheetTotalQuzCount = num1;
			this.all.sheetHtmlContent = $("#htmlstr").html();
			console.log(this.all.sheetHtmlContent)
			let fn = ()=>{
				wordRelevant.preservation(this.all).then(res=>{
					if(res.data.ret == 200){
						this.all = res.data.data;
						this.calculatedC();
						this.bounced.timingBox.open = true;
						this.bounced.timingBox.type = "success";
						this.bounced.timingBox.tipWord = "保存成功";
						setTimeout( ()=>{
							this.bounced.timingBox.open = false;
						},1500);
					}
				}).catch(error=>{
					this.bounced.timingBox.open = true;
					this.bounced.timingBox.type = "fail";
					this.bounced.timingBox.tipWord = "保存失败";
					setTimeout(()=>{
						this.bounced.timingBox.open = false;
					},1500);
				})
			}			
			if(this.all.scantronFormat == 2){
				if(this.rendering.arr2.length%2 ==0){
					this.rendering.arr2.push([])
					this.all.paperCount = (this.rendering.arr2.length + 1)/2;
					this.$nextTick(()=>{
						fn()
					})
				}else{
					this.all.paperCount = (this.rendering.arr2.length + 1)/2;
					fn()
				}
			}else if(this.all.scantronFormat == 1){
				this.all.paperCount = this.rendering.arr2.length + 1;
				fn()
			}else	if(this.all.scantronFormat == 3){
				if(this.rendering.arr2.length%3 ==0){
					this.rendering.arr2.push([])
					this.rendering.arr2.push([])
					this.all.paperCount = (this.rendering.arr2.length + 1)/3;
					this.$nextTick(()=>{
						fn()
					})
				}else if(this.rendering.arr2.length%3 ==1){
					this.rendering.arr2.push([]);
					this.all.paperCount = (this.rendering.arr2.length + 1)/3;
					this.$nextTick(()=>{
						fn()
					})
				}else{
					this.all.paperCount = (this.rendering.arr2.length + 1)/3;
					fn()
				}
			}
		},
//		预览
		send(){
			if(this.all.scantronFormat == 2){
				if(this.rendering.arr2.length%2 ==0){
					this.rendering.arr2.push([])
					this.$nextTick(()=>{
						sessionStorage.msg = $("#htmlstr").html();
						window.open('#/answerCard11?scantronFormat='+this.all.scantronFormat, '_blank')
					})
				}else{
					sessionStorage.msg = $("#htmlstr").html();
					window.open('#/answerCard11?scantronFormat='+this.all.scantronFormat, '_blank')
				}
			}else if(this.all.scantronFormat == 1){
				sessionStorage.msg = $("#htmlstr").html();
				window.open('#/answerCard11?scantronFormat='+this.all.scantronFormat, '_blank')
			}else	if(this.all.scantronFormat == 3){
				if(this.rendering.arr2.length%3 ==0){
					this.rendering.arr2.push([])
					this.rendering.arr2.push([])
					this.$nextTick(()=>{
						sessionStorage.msg = $("#htmlstr").html();
						window.open('#/answerCard11?scantronFormat='+this.all.scantronFormat, '_blank')
					})
				}else if(this.rendering.arr2.length%3 ==1){
					this.rendering.arr2.push([])
					this.$nextTick(()=>{
						sessionStorage.msg = $("#htmlstr").html();
						window.open('#/answerCard11?scantronFormat='+this.all.scantronFormat, '_blank')
					})
				}else{
					sessionStorage.msg = $("#htmlstr").html();
					window.open('#/answerCard11?scantronFormat='+this.all.scantronFormat, '_blank')
				}
			}
		},
    },
    created(){
		wordRelevant.getGradeData({levelId: "level_2"}).then((res)=>{
			this.bounced.chooseTest.testPaper = res.data.data.list;
			return  wordRelevant.getExamTypeData({});
		})
		.then(res => {
			this.bounced.chooseTest.testPaper.forEach(ele=>{
				ele.arr = JSON.parse(JSON.stringify(res.data.data.list));
			})
			this.calculatedC()
      	})
		this.configure = configure;
		this.aaa = this.$route.query;
		this.all.paperMarkingTaskId = this.$route.query.id;
		this.calculatedC()
		wordRelevant.inquiryAnswerCard({answerSheetOriginTypeId:this.$route.query.id}).then(res=>{
			if(res.data.data){
				console.log(res)
				this.all = JSON.parse(res.data.data.jsonForBackshow)
				this.all.hasSaved = res.data.data.hasSaved;
				this.calculatedC()
			}
		})
		
    },
    mounted(){
    	let _this =this;
		window.onmouseup = function(){
			if(!_this.execution){
				_this.execution = true;
				if(_this.region.number){
					let arr = _this.region.str.split("-");
					let tagObject = _this.$refs[_this.region.str][0].parentNode;
					_this.all.arr.forEach(ele=>{
						if(ele.number == _this.region.number){
							if(ele.questionType == "13"){
								if( Number(arr[2]) == 0 ){
									if(_this.region.obj.isShear){
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[1][arr[3]].w =tagObject.offsetWidth;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[1][arr[3]].h =tagObject.offsetHeight;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[1][arr[3]].l =tagObject.offsetLeft;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[1][arr[3]].t =tagObject.offsetTop;
									}else{
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[0][arr[3]].w =tagObject.offsetWidth;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[0][arr[3]].h =tagObject.offsetHeight;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[0][arr[3]].l =tagObject.offsetLeft;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2].img[0][arr[3]].t =tagObject.offsetTop;
									}
								}else{
									if(_this.region.obj.isShear){
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[1][arr[3]].w =tagObject.offsetWidth;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[1][arr[3]].h =tagObject.offsetHeight;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[1][arr[3]].l =tagObject.offsetLeft;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[1][arr[3]].t =tagObject.offsetTop;
									}else{
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[0][arr[3]].w =tagObject.offsetWidth;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[0][arr[3]].h =tagObject.offsetHeight;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[0][arr[3]].l =tagObject.offsetLeft;
										ele.content[_this.region.obj.i].arr[_this.region.obj.index1].arr[_this.region.obj.index2+1].img[0][arr[3]].t =tagObject.offsetTop;
									}
									
								}
							}else if(ele.questionType == "15"){
								if(_this.region.obj.isShear){
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[1][arr[2]].w = tagObject.offsetWidth;
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[1][arr[2]].h = tagObject.offsetHeight;
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[1][arr[2]].l = tagObject.offsetLeft;
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[1][arr[2]].t = tagObject.offsetTop;
								}else{
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[0][arr[2]].w = tagObject.offsetWidth;
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[0][arr[2]].h = tagObject.offsetHeight;
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[0][arr[2]].l = tagObject.offsetLeft;
									ele.content[_this.region.obj.i].number1[_this.region.obj.index1].img[0][arr[2]].t = tagObject.offsetTop;
								}
							}else if(ele.questionType == "1" || ele.questionType == "2" || ele.questionType == "4" || ele.questionType == "3"){
								if(_this.region.obj.topicArea.isShear){
									ele.topicArea.img[1][arr[1]].w = tagObject.offsetWidth;
									ele.topicArea.img[1][arr[1]].h = tagObject.offsetHeight;
									ele.topicArea.img[1][arr[1]].l = tagObject.offsetLeft;
									ele.topicArea.img[1][arr[1]].t = tagObject.offsetTop;
								}else{
									ele.topicArea.img[0][arr[1]].w = tagObject.offsetWidth;
									ele.topicArea.img[0][arr[1]].h = tagObject.offsetHeight;
									ele.topicArea.img[0][arr[1]].l = tagObject.offsetLeft;
									ele.topicArea.img[0][arr[1]].t = tagObject.offsetTop;
								}
							}
						}
					})
					_this.region.obj = "";
					_this.region.number = "";
				}
				document.onmousemove = null;
				_this.calculatedC();
			}
			
		};
		// wordRelevant.aaa().then(res=>{
		// 	this.all.arr = res.data.data.sectionGroupQuzList;
		// 	this.calculatedC();
		// })
		
    },
    computed:{
		_totalScore(){
			let num = 0;
			this.all.arr.forEach(e=>{
				num += e.fraction;
			})
			return num;
		},
    	_arr(){
			let num = 0;
			this.all.arr.forEach(e=>{
				if(e.content){
					num++; 
				}
			})
			return ( this.arr.slice(0,num+1)).reverse();
		},
		// 客观题验证
		xzkgt(){
			let bol = true;
			if(this.bounced.addObjective.choiceQuestions.length == 0){
				bol = false;
			}
			this.bounced.addObjective.choiceQuestions.forEach((ele,index)=>{
				if(ele.number == ""){
					bol = false;
				}
				if(ele.itemAssignment){
					bol = ele.arr.every((ele1,index)=>{
						if(ele1.score == ""){
							return  false;
						}else if(ele1.missedScore ==""  &&  this.bounced.addObjective.questionType =="4"){
							return  false;
						}else{
							return  true;
						}
					})
				}else{
					if(ele.score == ""){
						bol = false;
					}else if(ele.missedScore ==""  &&  this.bounced.addObjective.questionType =="4"){
						bol = false;
					}
				}
				if(ele.itemSetting){
					bol = ele.arr.every((ele1,index)=>{
						if(ele1.option != ""){
							return  true;
						}else{
							return false;
						}
					})
				}else{
					if(ele.option == ""){
						bol = false;
					}
				}
			})
			return bol
		},
		// 填空题验证
		xztkt(){
			let bol = true;
			if(this.bounced.addCompletion.choiceQuestions.length == 0){
				bol = false;
			}
			this.bounced.addCompletion.choiceQuestions.forEach((ele,index)=>{
				if(ele.number == ""){
					bol = false;
				}
				if(ele.option == ""){
					bol = false;
				}
				if(ele.itemAssignment){
					ele.arr.forEach(ele1=>{
						if(ele1.score == ""){
							bol = false;
						}
					})
				}else if(ele.score == ""){
					bol =false;
				}
				ele.arr.forEach(ele1=>{
					ele1.arr.forEach(ele2=>{
						if(ele2.score==""){
							bol =false;
						}
					})
				})
			})
			return bol;
		},
		// 解答题验证
		xzjdt(){
			let bol = true;
			if(this.bounced.addAnswer.choiceQuestions.length == 0){
				bol = false;
			}
			this.bounced.addAnswer.choiceQuestions.forEach((ele,index)=>{
				if(ele.number == ""){
					bol = false;
				}
				if(ele.itemAssignment){
					ele.arr.forEach(ele1=>{
						if(ele1.score == ""){
							bol = false;
						}
					})
				}else if(ele.score == ""){
					bol =false;
				}
				ele.arr.forEach(ele1=>{
					ele1.arr.forEach(ele2=>{
						if(ele2.score==""){
							bol =false;
						}
					})
				})
			})
			return bol;
		},
		// 选做题验证
		xzxzt(){
			let bol = true;
			if(this.bounced.addOptional.choiceQuestions.length == 0){
				bol = false;
			}
			this.bounced.addOptional.choiceQuestions.forEach((ele,index)=>{
				if(ele.number == ""){
					bol = false;
				}
				if(ele.number1 == ""){
					bol = false;
				}
				if(ele.score == ""){
					bol = false;
				}
			})
			return bol;
		},
		// 作文题验证
		xzzwt(){
			let bol = true;
			if(this.bounced.addComposition.choiceQuestions.length == 0){
				bol = false;
			}
			this.bounced.addComposition.choiceQuestions.forEach((ele,index)=>{
				if(ele.number == ""){
					bol = false;
				}
				ele.arr.forEach(ele1=>{
					if(ele1.score == ""){
						bol = false;
					}
					if(ele1.fangshi == "square"){
						if(ele1.wordNumber =="" || ele1.wordNumberLine == ""){
							bol = false;
						}
					}
				})
			})
			return bol;
		},
		// 新增禁答区
		xzjdq(){
			if(this.bounced.noAnswerZone.rowNumber == ""){
				return false;
			}else{
				return true;
			}
		}
    },
    components: {
　　		VueUeditorWrap 	
　　},
}