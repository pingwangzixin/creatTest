<template>
    <div class="wd_setTestStructure">
        <div class="wd_header">
            试卷总分：{{_num}}分
        </div>
        <div class="wd_main">
            <div class="title clearfix">
                <p class="fl">小题题号设置</p>
                <p class="fr">
                    <label>
                        <input type="radio" name="type" id="" value="整卷从1开始顺序递增" v-model="all.sortType" @change="itemNumberSorting">
                        整卷从1开始顺序递增
                    </label>
                    <label>
                        <input type="radio" name="type" id="" value="每大题下均从1顺序递增" v-model="all.sortType" @change="itemNumberSorting">
                        每大题下均从1顺序递增
                    </label>
                </p>
            </div>
            <div class="main">
                <div v-for="(item,index) in all.topicDetails" :key="index">
                    <p class="clearfix">
                        <span class="fl">{{item.number}}、{{item.title}} {{item.fraction}}分</span>
                        <span class="fr" @click="deleteBigQuestions(index)">删除</span>
                        <span class="fr" @click="edit(index)">编辑</span>
                    </p>
                    <p class="clearfix">
                        <span  class="clearfix fl" v-for="(item1,index1) in item.content" :key="index1">
                            <span class="clearfix fl"  v-for="(item2,index2) in item1.arr" :key="index2" :class="{long:item2.arr && item2.arr.length>0}">
                                <span  class="testQuestions fl" >
                                    {{item2.num}}.
                                    <font>{{item2.score}}分</font>
                                </span>
                                <span  v-for="(item3,index3) in item2.arr" :key="index3" class="testQuestions fl" v-if="!item2.smallQuestionsShow">
                                    ({{index3+1}}).
                                    <font>{{item3.score}}分</font>
                                </span>
                                <span  v-for="(item3,index3) in item2.arr" :key="index3" class="testQuestions fl" v-if="item2.smallQuestionsShow">
                                    {{item2.num+"-"+(index3+1)}}.
                                    <font>{{item3.score}}分</font>
                                </span>
                            </span>
                        </span>
                    </p>
                </div>
            </div>
            <div class="footer">
                <button @click="addQuestionShow(true)">
                    + 新增大题
                </button>
            </div>
        </div>
        <div class="wd_footer">
            <button @click="saveOuterAnswerSheet">保存设置</button>
        </div>
        <div class="prompt_box public_box" v-if="addQuestion.bol">
            <div class="hide"></div>
            <div class="wd_xzkgt">
                <div class="ivu-modal-header">
                    <p>新增大题</p>
                </div>
                <div class="ivu-modal-body">
                    <div class="nav">
                        <span>大题题号</span>
                        <select name="" id="" v-model="addQuestion.titleNumber">
                            <option v-for="(item,index) in _arr" :key="index" :value="item">{{item}}</option>
                        </select>
                        <span>大题题型</span>
                        <select name="" id="" v-model="addQuestion.questionType" @change="choiceQuestionType">
                            <option value="" disabled selected hidden>请选择</option>
                            <option value="2">单选题</option>
                            <option value="4">多选题</option>
                            <option value="1">判断题</option>
                            <option value="3">填空题</option>
                            <option value="13">解答题</option>
                            <option value="14">作文题</option>
                        </select>
                        <span>标题</span>
                        <input type="text" placeholder="(50个字符以内)" v-model="addQuestion.title">
                    </div>
                    <div class="body">
                        <div v-for="(item,index) in addQuestion.choiceQuestions" :key="index">
                            <div class="clearfix choiceQuestions" v-if="addQuestion.questionType != ''">
                                <p class="fl"><span>共</span><input type="text" v-model="item.number" @blur="manyQuestions(index)" maxlength="2" @input="manyQuestions1(item)"><span>题</span></p>
                                <p class="fl"><span>每题</span><input :disabled="item.itemAssignment" type="text" v-model="item.score" @blur="score(index)" maxlength="3" @input="score1(item)"><span>分</span></p>
                                <p class="fl" v-if="addQuestion.questionType == '4'"><span>漏选的</span><input :disabled="item.itemAssignment" type="text" v-model="item.missedScore" @blur="missedScore(index)" @input="missedScore1(item)"><span>分</span></p>
                                <p class="fl"><label><input type="checkbox" v-model="item.itemAssignment" @click="kgtSetPoints(index)"><span>单题设分</span></label></p>
                                <p class="fl" v-if="addQuestion.questionType == '2'  || addQuestion.questionType == '4'"><span>每题</span><input type="text" :disabled="item.itemSetting" maxlength="2" @blur="option(index)" v-model="item.option" @input="option1(item)"><span>个选项</span></p>
                                <p class="fl" v-if="addQuestion.questionType == '2' || addQuestion.questionType == '4'"><label><input type="checkbox" @click="kgtSetItem(index)" v-model="item.itemSetting"><span>单题设项</span></label></p>
                                <p class="fr" @click="deletekgt1(index)">删除</p>
                            </div>
                            <div class="clearfix duoxuan" v-if="item.arr.length>0">
                                <p class="fl" v-for="(item1,index1) in item.arr" :key="index1" :class="{active:addQuestion.questionType=='3' || addQuestion.questionType=='13'}">
                                    <span>{{item1.num}}.</span>
                                    <span><input type="text"  v-model="item1.score" :disabled="!item.itemAssignment" maxlength="2" @input="scoreChecking(item1)">分</span>
                                    <span v-if="addQuestion.questionType != '3' && addQuestion.questionType != '13' && addQuestion.questionType != '14'"><input type="text" v-model="item1.option" :disabled="!item.itemSetting" maxlength="1"  @input="optionChecking(item1)">个选项</span>
                                    <span v-if="addQuestion.questionType == '4'">漏选得<input type="text"  v-model="item1.missedScore" maxlength="2"  @input="missedScoreChecking(item1)" :disabled="!item.itemAssignment">分</span>
                                    <span  v-if="addQuestion.questionType == '3' || addQuestion.questionType == '13' ">小问数<input type="text" v-model="item1.number" @blur="jdtxiaowenshu(item1,index,index1)" maxlength="2" @input="numberChecking(item1)">个</span>
									<span v-if="addQuestion.questionType == '3' || addQuestion.questionType == '13'" class=" wenshu1" v-show="item1.arr.length>0">每问分值</span>
									<span v-if="addQuestion.questionType == '3' || addQuestion.questionType == '13'" class="wenshu" v-show="item1.arr.length>0"><input type="text" v-for="(item2,index2) in item1.arr" :key="index2" v-model="item1.arr[index2].score" maxlength="2" @input="scoreChecking(item2)"></span>
                                    <span v-if="addQuestion.questionType == '13'"><label><input type="checkbox" name="" id="" v-model="item1.smallQuestionsShow">是否分开小题</label></span>
                                    <span @click="deletekgt(index,index1)">删除</span>
                                </p>
                            </div>
                        </div>
                        <div class="shou addTitle" @click="addTitle('客观题')">+添加题目</div>
                    </div>
                </div>
                <div class="ivu-modal-footer">
                    <div>
                        <button type="button" class="cancel" @click="addQuestionShow(false)">
                            <span>取消</span>
                        </button>
                        <button type="button" class="confirm" @click="addQuestionConfirm" :disabled="!clickBol">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {wordRelevant} from '@/api'
export default {
    name:"setTestStructure",
    data(){
        return {
            addQuestion:{
                bol:false,
                titleNumber:"",
                questionType:"",
                title:"",
                composition:false,
                type:"add",
                choiceQuestions:{

                }
            },
            arr : ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","二十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十","三十一","三十二","三十三","三十四","三十五","三十六","三十七","三十八","三十九","四十","四十一","四十二","四十三","四十四","四十五","四十六","四十七","四十八","四十九","五十"],
            all:{
                answerSheetId:"",
                sortType:"整卷从1开始顺序递增",
                sheetTotalScore:"",
                sheetTotalQuzCount:"",
                topicDetails:[

                ]
            }
            
        }
    },
    methods:{
        // 新增题目弹框
        addQuestionShow(bol){
            this.addQuestion= {
                bol:bol,
                titleNumber:"",
                questionType:"",
                title:"",
                type:"add",
                choiceQuestions:{}
            },
            this.addQuestion.titleNumber = this._arr[0];
        },
        // 题目类型
        choiceQuestionType(){
            if(this.addQuestion.questionType == "1"){
				this.addQuestion.title = "判断题"
			}else  if(this.addQuestion.questionType == "2"){
				this.addQuestion.title = "单选题"
			}else  if(this.addQuestion.questionType == "4"){
				this.addQuestion.title = "多选题"
            }else if(this.addQuestion.questionType == "3"){
				this.addQuestion.title = "填空题"
            }else if(this.addQuestion.questionType == "13"){
				this.addQuestion.title = "解答题"
            }else if(this.addQuestion.questionType == "14"){
				this.addQuestion.title = "作文题"
            }
            this.addQuestion.choiceQuestions = [];
			if(this.addQuestion.questionType == "1"){
				this.addQuestion.choiceQuestions.push({
					number:"",
					score:"",
					missedScore:"",
					itemAssignment:false,
					option:"2",
					itemSetting:false,
					arr:[]
				})
			}else{
				this.addQuestion.choiceQuestions.push({
					number:"",
					score:"",
					missedScore:"",
					itemAssignment:false,
					option:"4",
					itemSetting:false,
					arr:[]
				})
			}
        },
        // 多少题失焦时间
        manyQuestions(index){
            if(this.addQuestion.choiceQuestions[index].number == "0"){
				this.addQuestion.choiceQuestions[index].arr = [];
				this.addQuestion.choiceQuestions[index].number = "";
				return;
            }
            this.addQuestion.choiceQuestions[index].arr = [];
            for(let i =0;i<this.addQuestion.choiceQuestions[index].number;i++){
                this.addQuestion.choiceQuestions[index].arr.push({
                    num:"",
                    score:"",
                    option:this.addQuestion.choiceQuestions[index].option,
                    missedScore:"",
                    number:"",
                    smallQuestionsShow:false,
					arr:[]
                })
            }
            let num = 0;
            this.addQuestion.choiceQuestions.forEach(ele=>{
                ele.arr.forEach((ele1,index1)=>{
                    ele1.num = num + 1;
                    num += 1;
                })
            })
			// let num = 0;
			// this.topicDetails.some(ele=>{
			// 	if(ele.number == this.bounced.addObjective.titleNumber){
			// 		return  true
			// 	}
			// 	if(ele.content){
			// 		ele.content.forEach(ele1=>{
			// 			num += ele1.arr.length;
			// 		})
			// 	}
			// })
			// this.bounced.addObjective.choiceQuestions[index].arr = [];
			// if(this.all.sortType == "整卷从1开始顺序递增"){
			// 	for(let i =0;i<this.bounced.addObjective.choiceQuestions[index].number;i++){
			// 		this.bounced.addObjective.choiceQuestions[index].arr.push({
			// 			num:"",
			// 			score:"",
			// 			option:this.bounced.addObjective.choiceQuestions[index].option,
			// 			missedScore:""
			// 		})
			// 	}
			// 	this.bounced.addObjective.choiceQuestions.forEach(ele=>{
			// 		ele.arr.forEach((ele1,index1)=>{
			// 			ele1.num = num + 1;
			// 			num += 1;
			// 		})
			// 	})
			// }else{
			// 	for(let i =0;i<this.bounced.addObjective.choiceQuestions[index].number;i++){
			// 		this.bounced.addObjective.choiceQuestions[index].arr.push({
			// 			num:i+1,
			// 			score:"",
			// 			option:this.bounced.addObjective.choiceQuestions[index].option,
			// 			missedScore:""
			// 		})
			// 	}
			// 	let a = 1;
			// 	this.bounced.addObjective.choiceQuestions.forEach(ele=>{
			// 		ele.arr.forEach((ele1,index1)=>{
			// 			ele1.num = a;
			// 			a += 1;
			// 		})
			// 	})
			// }
			this.score(index);
			this.missedScore(index);
			this.option(index)
        },
        // 添加题目
        addTitle(){
            this.addQuestion.choiceQuestions.push({
                number:"",
                score:"",
                itemAssignment:false,
                option:"4",
                arr:[]
            })
		},
        // 多少题验证
        manyQuestions1(item){
            let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
        },
        // 每题多少分
        score(index){
			if(this.addQuestion.choiceQuestions[index].score == 0){
				this.addQuestion.choiceQuestions[index].score = "";
				return;
			}
            this.addQuestion.choiceQuestions[index].arr.forEach(ele=>{
				ele.score = this.addQuestion.choiceQuestions[index].score;
			})
		},
		//  每题多少分验证
		score1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.score)){
				item.score = "";
			}
        },
        //  漏选得分的失焦事件
		missedScore(index){
			this.addQuestion.choiceQuestions[index].arr.forEach(ele=>{
				ele.missedScore = this.addQuestion.choiceQuestions[index].missedScore;
			})
		},
		//  漏选得分的验证
		missedScore1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.missedScore)){
				item.missedScore = "";
			}
        },
        // 每题多少项失焦事件
		option(index){
			if(this.addQuestion.choiceQuestions[index].option == 0){
				this.addQuestion.choiceQuestions[index].option = "";
				return;
			}
			if(this.addQuestion.choiceQuestions[index].option > 10){
				this.addQuestion.choiceQuestions[index].option = 10;
			}
			this.addQuestion.choiceQuestions[index].arr.forEach(ele=>{
				ele.option = this.addQuestion.choiceQuestions[index].option;
			})
		},
		// 每题多少项验证
		option1(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.option)){
				item.option = "";
			}
		},
        // 单体设分
        kgtSetPoints(index){
			this.addQuestion.choiceQuestions[index].itemAssignment = !this.addQuestion.choiceQuestions[index].itemAssignment;
			this.addQuestion.choiceQuestions[index].score = "";
			this.addQuestion.choiceQuestions[index].missedScore = "";
		},
		//单题设项
		kgtSetItem(index){
			this.addQuestion.choiceQuestions[index].itemSetting = !this.addQuestion.choiceQuestions[index].itemSetting;
			this.addQuestion.choiceQuestions[index].option = "";
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
        // 小问数
        jdtxiaowenshu(item,index,index1){
            if(item.number>10){
                item.number = 10;
            }
			let num ;
			if(item.score%item.number ==0 ){
				num = (item.score/item.number).toString()
			}
			this.addQuestion.choiceQuestions[index].arr[index1].arr = [];
			for(let i =0;i<item.number;i++){
				this.addQuestion.choiceQuestions[index].arr[index1].arr.push({
					score: num || "" 
				})
			}
        },
        // 小问数验证
		numberChecking(item){
			let reg=/^[1-9]\d*$|^0$/;
			if(!reg.test(item.number)){
				item.number = "";
			}
		},
        // 确认按钮
        addQuestionConfirm(){
            console.log(this.addQuestion)
            let  obj = {
				number:this.addQuestion.titleNumber,
				title:this.addQuestion.title,
				questionType:this.addQuestion.questionType,
				content:[],
            };
            if(this.addQuestion.questionType == "3" || this.addQuestion.questionType == "13"  || this.addQuestion.questionType == "14"){
                obj.objSubFlag = 1;
            }else{
                obj.objSubFlag = 0;
            }
            
            let num1  = 0;
			this.addQuestion.choiceQuestions.forEach((e,i)=>{
				let obj1 = {
					itemAssignment:e.itemAssignment,
					number: e.number,
					score: e.score,
					arr:[]
				}
				if(this.addQuestion.questionType == "2"){
					obj1.option = e.option;
					obj1.itemSetting = e.itemSetting;
                }
                if(this.addQuestion.questionType == "4"){
                    obj1.missedScore = e.missedScore;
                    obj1.option = e.option;
					obj1.itemSetting = e.itemSetting;
                }
				e.arr.forEach(ele=>{
                    num1 += Number(ele.score);
                    let obj2 = {
                        num:ele.num,
                        score:ele.score,
                    }
					if(this.addQuestion.questionType == "1" || this.addQuestion.questionType == "2" || this.addQuestion.questionType == "4"){
                        obj2.option = ele.option;
                    }
                    if(this.addQuestion.questionType == "4"){
                        obj2.missedScore = ele.missedScore;
                    }
                    if(this.addQuestion.questionType == "3"){
                        obj2.number = ele.number;
                        obj2.arr= ele.arr;
                    }
                    if(this.addQuestion.questionType == "13"){
                        obj2.number = ele.number;
                        obj2.arr= ele.arr;
                        obj2.smallQuestionsShow= ele.smallQuestionsShow;
                    }
                    obj1.arr.push(obj2)
				})
				obj.content.push(obj1);
            })
            obj.fraction = num1;
            let num;
			this.all.topicDetails.forEach((ele,index)=>{
				if(ele.number == obj.number){
					num = index;
				}
            })
			if(this.addQuestion.type == "add"){
				if(num != undefined){
                    this.all.topicDetails.splice(num,0,obj)
				}else{
                    this.all.topicDetails.push(obj)
				}
			}else{
				this.all.topicDetails.splice(this.addQuestion.type-0,1);
				this.all.topicDetails.splice(num,0,obj)
            }
            this.addQuestion= {
                bol:false,
                titleNumber:"",
                questionType:"",
                title:"",
                composition:false,
                type:"add",
                choiceQuestions:{}
            }
            this.itemNumberSorting();
        },
        // 排序
        itemNumberSorting(){
			let i = 0;
			this.all.topicDetails.forEach((ele,index)=>{
                ele.number = this.arr[i];
                i++;
			})
			if(this.all.sortType== "整卷从1开始顺序递增"){
				let num = 0;
				this.all.topicDetails.forEach(ele=>{
                    ele.content.forEach(ele1=>{
                        ele1.arr.forEach(ele2=>{
                            num += 1;
                            ele2.num = num;
                        })
                    })
				})
			}else{
				this.all.topicDetails.forEach(ele=>{
                    let a = 0;
                    ele.content.forEach((ele1,index)=>{
                        ele1.arr.forEach((ele2,index1)=>{
                            ele2.num = a+1;
                            a += 1;
                        })
                    })
				})
			}
        },
        // 删除大题
        deleteBigQuestions(index){
            this.all.topicDetails.splice(index,1);
        },
        // 删除题目
		deletekgt(index,index1){
			this.addQuestion.choiceQuestions[index].number = this.addQuestion.choiceQuestions[index].number-1;
			this.addQuestion.choiceQuestions[index].arr.splice(index1,1);
			// let num = 0;
			// this.all.arr.some(ele=>{
			// 	if(ele.number == this.bounced.addCompletion.titleNumber){
			// 		return  true
			// 	}
			// 	if(ele.content){
			// 		ele.content.forEach(ele1=>{
			// 			num += ele1.arr.length;
			// 		})
			// 	}
				
			// })
			// if(this.all.sortType == "整卷从1开始顺序递增"){
			// 	this.bounced.addObjective.choiceQuestions.forEach(ele=>{
			// 		ele.arr.forEach((ele1,index1)=>{
			// 			ele1.num = num + 1;
			// 			num += 1;
			// 		})
			// 	})
			// }else{
				let a = 1;
				this.addQuestion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			// }
		},
		deletekgt1(index){
			this.addQuestion.choiceQuestions.splice(index,1);
			// let num = 0;
			// this.all.arr.some(ele=>{
			// 	if(ele.number == this.bounced.addCompletion.titleNumber){
			// 		return  true
			// 	}
			// 	if(ele.content){
			// 		ele.content.forEach(ele1=>{
			// 			num += ele1.arr.length;
			// 		})
			// 	}
				
			// })
			// if(this.all.sortType == "整卷从1开始顺序递增"){
			// 	this.bounced.addObjective.choiceQuestions.forEach(ele=>{
			// 		ele.arr.forEach((ele1,index1)=>{
			// 			ele1.num = num + 1;
			// 			num += 1;
			// 		})
			// 	})
			// }else{
				let a = 1;
				this.addQuestion.choiceQuestions.forEach(ele=>{
					ele.arr.forEach((ele1,index1)=>{
						ele1.num = a;
						a += 1;
					})
				})
			// }
        },
        edit(index){
			let arr = this.all.topicDetails[index].content.map(ele=>{
				let arr1 = ele.arr.map(ele1=>{
					let obj1 ={
						num:ele1.num,
						score:ele1.score,
						option:ele1.option,
                        missedScore:ele1.missedScore,
                        smallQuestionsShow:ele1.smallQuestionsShow,
                        number:ele1.number,
                        arr:ele1.arr
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
			this.addQuestion = {
				bol:true,
				titleNumber:this.all.topicDetails[index].number,
				questionType:this.all.topicDetails[index].questionType,
				title:this.all.topicDetails[index].title,
                type:index,
                choiceQuestions:arr,
                composition:this.all.topicDetails[index].composition
			}
        },
        // 保存
        saveOuterAnswerSheet(){
            let num = 0;
            let score = 0;
            this.all.topicDetails.forEach(ele=>{
                score += ele.fraction
                ele.content.forEach(ele1=>{
                   num += ele1.arr.length;
                })
            })
            this.all.sheetTotalScore = score;
            this.all.sheetTotalQuzCount = num;
            console.log(JSON.stringify(this.all))
            wordRelevant.setStructureSave(this.all).then(res=>{
                if(res.data.ret == 200){
                    this.$parent.$parent.timingFn("success","保存成功");
                }
            })
        }
    },
    created(){
        this.all.paperMarkingTaskId = this.$route.query.id;
        wordRelevant.inquiryAnswerCard({answerSheetOriginTypeId:this.$route.query.id}).then(res=>{
            console.log(res)
			if(res.data.data){
				this.all = JSON.parse(res.data.data.jsonForBackshow)
			}
		})
    },
    watch: {
        $route(to,form){
            this.all.paperMarkingTaskId = to.query.id;
        }
    },
    computed:{
        _arr(){
			let num = 0;
			this.all.topicDetails.forEach(e=>{
					num++; 
			})
            return ( this.arr.slice(0,num+1)).reverse();
        },
        _num(){
            let num = 0;
            this.all.topicDetails.forEach(ele=>{
                num += ele.fraction;
            })
            return num;
        },
        clickBol(){
            let bol = true;
            if(this.addQuestion.questionType == ""){
                bol = false;
            }
            if(this.addQuestion.choiceQuestions.length>0){
                this.addQuestion.choiceQuestions.forEach(ele=>{
                    if(ele.number == ""){
                    bol = false;  
                    }
                    ele.arr.forEach(ele1=>{
                        if(ele1.score == ""){
                            bol = false; 
                        }
                        if(this.addQuestion.questionType == "2"  &&  ele1.option == ""){
                            bol = false;
                        }
                        if(this.addQuestion.questionType == "4"){
                            if(ele1.missedScore == ""  ||  ele1.option == ""){
                                bol = false;
                            }
                        }
                    })
                })
            }
            return  bol;
        }
    }
}
</script>

<style lang="" scoped >
.wd_setTestStructure .wd_header{
    width: 100%;
    padding: 20px ;
    font-size: 16px;
    font-weight: 700;
    background: #fff;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}  
.wd_setTestStructure .wd_main{
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 15px  30px; 
} 
.wd_setTestStructure .wd_main .title{
    width: 100%;
    border: 1px solid  #5ac8fa;
    background: rgba(90, 200, 250, 0.1);
    padding: 10px 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.wd_setTestStructure .wd_main .title label{
    cursor: pointer;
}
.wd_setTestStructure .wd_main .main{
    width: 100%;

}
.wd_setTestStructure .wd_main .main div{
    width: 100%;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
}
.wd_setTestStructure .wd_main .main div p{
    font-size: 0;
    padding-bottom: 10px;
}
.wd_setTestStructure .wd_main .main div p:nth-child(1) span{
    color: #2d8cf0;
    cursor: pointer;    
    margin-left: 15px;
    font-size: 16px;
}
.wd_setTestStructure .wd_main .main div p:nth-child(1) span:nth-child(1){
    margin-left: 0;
    color: #333;
    font-weight: 700;
    cursor:auto;
}

.wd_setTestStructure .wd_main .main div p:nth-child(2) .long{
     display: inline-block;
     width: 100%;
}
.wd_setTestStructure .wd_main .main div p:nth-child(2) .testQuestions{
    font-weight: 700;
    display: inline-block;
    text-align: left;
    width: 100px;
    height: 30px;
    font-size: 16px;
}

.wd_setTestStructure .wd_main .main div p:nth-child(2)  .testQuestions font{
    font-weight: 400;
}   
.wd_setTestStructure .wd_main .footer{
    width: 100%;
    text-align: left;
}
.wd_setTestStructure .wd_main .footer  button{
    color: #2d8cf0;
    font-size: 14px !important;
    width: 100px;
    height: 35px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    background: #fff;
    border-radius:5px;
    cursor: pointer; 
    outline: none;
}
.wd_setTestStructure .wd_main .footer  button:hover{
    border: 1px solid #2d8cf0;
}

.wd_setTestStructure .wd_footer{
    width: 100%;
    text-align: center;
    margin-top: 15px;
}
.wd_setTestStructure .wd_footer button{
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    background: #155ABB;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;    
}
.prompt_box .wd_xzkgt {
    width: 1200px;
    border-radius: 2px;
    height: auto;
    padding: 0;
    max-height: 540px;
    background-color: #FFFFFF;
    opacity: 1;
    box-shadow: 0 0 6px #ccc;
    position: fixed;
    left: 50%;
    top: 100px;
    transform: translate(-50%);
    z-index: 1005;
}
.prompt_box .wd_xzkgt label{
    cursor: pointer;
}

.prompt_box .wd_xzkgt .ivu-modal-header {
    padding: 12px 15px 11px;
    height: 50px;
    border-color: #ccc;
    font-size: 18px !important;
    text-align: left;
    border-bottom: 1px solid #e9eaec;
    box-sizing: border-box;
}

.prompt_box .wd_xzkgt .ivu-modal-body {
    padding: 20px 30px;
}

.prompt_box .wd_xzkgt .ivu-modal-body .nav {
    text-align: left;
}

.prompt_box .wd_xzkgt .ivu-modal-body .nav span {
    font-size: 16px;
    margin: 0 15px;
}

.prompt_box .wd_xzkgt .ivu-modal-body .nav span:nth-child(1) {
    margin-left: 0;
}

.prompt_box .wd_xzkgt .ivu-modal-body .nav select {
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #dddee1;
    outline: none;
}

.prompt_box .wd_xzkgt .ivu-modal-body .nav input[type="text"] {
    width: 300px;
    height: 32px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    outline: none;
}
.prompt_box .wd_xzkgt .ivu-modal-body .nav label{
    font-size: 16px;
}
.prompt_box .wd_xzkgt .ivu-modal-body .nav input[type="checkbox"]{
    vertical-align: middle;
    margin-left: 15px;
}
.prompt_box .wd_xzkgt .ivu-modal-body .body {
    width: 1140px;
    max-height: 250px;
    overflow: auto;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    height: 44px;
    border: 1px solid #2d8cf0;
    background: rgba(90, 200, 250, 0.1);
    margin-top: 15px
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions span {
    font-size: 16px;
    margin: 0 5px;
    line-height: 30px;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions input[type="text"] {
    width: 45px;
    height: 32px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #dddee1;
    vertical-align: middle;
    box-sizing: border-box;
    text-align: center;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions p {
    margin-right: 15px;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions p:last-child {
    color: #2d8cf0;
    line-height: 30px;
    cursor: pointer;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #2d8cf0;
    margin-top: -1px;
    padding: 15px;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p {
    margin-top: 15px;
    width: 50%;
    text-align: left;
}
.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p label{
    cursor: pointer;
}
.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p.active{
    margin-top: 15px;
    width: 100%;
    text-align: left;
}
.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p span:nth-child(1) {
    display: inline-block;
    width: 20px;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p span {
    margin: 0 10px 0;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p span:last-child {
    color: #2d8cf0;
    cursor: pointer;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p:nth-child(1) {
    margin-top: 0;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p:nth-child(2) {
    margin-top: 0;
}
.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p.active:nth-child(2){
    margin-top: 15px;
}
.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p input[type="text"] {
    width: 45px;
    height: 32px;
    text-align: center;
    font-size: 14px !important;
    border-radius: 4px;
    margin: 0 4px;
    background-color: #fff;
    border: 1px solid #dddee1;
    outline: none;
}

.prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p input:disabled {
    background-color: #f3f3f3;
    border: 1px solid #dddee1;
    cursor: not-allowed;
    color: #ccc;
}

.prompt_box .wd_xzkgt .ivu-modal-footer {
    border-top: 1px solid #e9eaec;
    padding: 12px 18px 12px 18px;
    text-align: right;
}

.prompt_box .wd_xzkgt .ivu-modal-footer .cancel {
    border-radius: 2px !important;
    padding: 0 22px !important;
    height: 36px !important;
    line-height: 36px !important;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
    color: #4A4A4A !important;
    font-size: 16px !important;
    background-color: transparent;
    border-color: transparent;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
}

.prompt_box .wd_xzkgt .ivu-modal-footer .confirm {
    border-radius: 2px;
    padding: 0 22px !important;
    height: 36px !important;
    color: #fff;
    line-height: 36px !important;
    background: #2d8cf0;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
    font-size: 16px !important;
    margin-left: 8px;
    border: none;
    outline: none;
    cursor: pointer;
}

.prompt_box .wd_xzkgt .ivu-modal-footer .confirm:disabled {
    color: #bbbec4;
    background: #f7f7f7;
    cursor: no-drop;
}
.prompt_box .addTitle {
    text-align: left;
    margin-top: 5px;
    color: #2d8cf0;
    width: 100px;
    cursor: pointer;
}
</style>