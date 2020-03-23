<template>
	<div>
		<div class="g_border">
			<div class="zy_paper_main zy_set_answer">
                <div class="tit clearfix">
                    <span class="fl baocun">试题内容</span>
                    <!--<ul class="fr">
                        <li>快速录入答案</li>
                        <li class="open_analysis">展开解析</li>
                    </ul>-->
                </div>
            	<div class="answer_list">
            		<div class="big_ques" v-for="(bigI,i) in allData.analysisData" :key="i">
            			<div class="top clearfix">
	            			<b class="fl" v-text="bigI.headlineTitNo + '、'"></b>
	                		<!--<select class="fl question_type_select" name="" v-model="bigI.sectionType" @click="aaa(bigI.smallTitle,bigI.sectionType)" @change="bigType(bigI.smallTitle,bigI.sectionType)">-->
	                		<select class="fl question_type_select" name="" v-model="bigI.sectionType" @change="bigType(bigI.smallTitle,bigI.sectionType)">
                                <option value="">请选择题型</option>
                                <option v-for="(bigOption,bigTypeIndex) in questionType.type" v-bind:value="bigOption.value" v-text="bigOption.name" :key="bigTypeIndex"></option>
                            </select>
	            		</div>
	            		<div class="bottom clearfix" v-for="(groupI,groupIndex) in bigI.smallTitle" :key="groupIndex">
	            			<!--<select class="fl question_type_select" name="" v-model="groupI.groupType" @change="groupType(groupI,groupI.groupType)">
                                <option value="">请选择题型</option>
                                <option v-for="(groupOption,groupTypeIndex) in questionType.type" v-bind:value="groupOption.value" v-text="groupOption.name" :key="groupTypeIndex"></option>
                            </select> -->
                            <!--{{groupI.groupType}}-->
                            <div class="fl group_right">
		            			<div class="small_list clearfix" v-for="(quesI,quesIndex) in groupI.content" :key="quesIndex">
		            				<select class="fl question_type_select" name="" v-model="quesI.quzType" @change="quesType(quesI,quesI.quzType)">
		                                <option value="">请选择题型</option>
		                                <option v-for="(quesOption,quesTypeIndex) in questionType.type" v-bind:value="quesOption.value" v-text="quesOption.name" :key="quesTypeIndex"></option>
		                            </select> 
		            				<!--单选：2	多选：4	判断：1	填空：3	作文：14	 简答：6 完形填空：7  阅读理解：5  材料题：8  综合题：9 论证/证明题：10 画图题：11  自答题：12  解答：13-->
		        					<!--单选-->
		            				<div class="clearfix answer_template answer_single fl" v-if="quesI.quzType == 2">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                	<span class="fl">答案</span>
	                                        <ul class="fl">
	                                            <li :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" :key="optionIndex" @click="smallSingleChoose(quesI,i)"></li>
	                                            <li class="option_btn fl">
	                                                <i class="iconfont iconjia" @click="smallAddOption(quesI.quzSection)"></i>
	                                				<i class="iconfont iconjianshao" @click="smallReduceOption(quesI.quzSection)"></i>
	                                            </li>
	                                        </ul>
		                                </div>
		            				</div>
		            				<!--完形填空-->
		            				<div class="clearfix answer_template answer_cloze fl" v-if="quesI.quzType == 7">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'1')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                	<span class="fl">答案</span>
	                                        <ul class="fl">
	                                            <li :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" :key="optionIndex" @click="smallSingleChoose(quesI,i)"></li>
	                                            <li class="option_btn fl">
	                                                <i class="iconfont iconjia" @click="smallAddOption(quesI.quzSection)"></i>
	                                				<i class="iconfont iconjianshao" @click="smallReduceOption(quesI.quzSection)"></i>
	                                            </li>
	                                        </ul>
		                                </div>
		            				</div>
		            				<!--多选-->
		            				<div class="clearfix answer_template answer_multiple fl" v-if="quesI.quzType == 4">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                	<span class="fl">答案</span>
	                                        <ul class="fl">
	                                            <li :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" @click="smallcheckChoose(quesI,i)"></li>
	                                            <li class="option_btn fl">
	                                                <i class="iconfont iconjia" @click="smallAddOption(quesI.quzSection)"></i>
	                                				<i class="iconfont iconjianshao" @click="smallReduceOption(quesI.quzSection)"></i>
	                                            </li>
	                                        </ul>
	                                        <div class="detailed fl">
	                                        	<em>漏选得分</em>
	                                        	<input type="text" name="" id="" value="" maxlength="2" v-model="quesI.missedScore" @input="validation(quesI,'missedScore')" />
	                                        </div>
		                                </div>
		            				</div>
		            				<!--判断-->
		            				<div class="clearfix answer_template answer_fill fl" v-if="quesI.quzType == 1">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                	<span class="fl">答案</span>
		                                	<ul class="fl">           
	                                            <li :class="{active : quesI.questionContent[2] == '正确'}" @click="smallJudge(quesI,'正确')">对</li>
	                                            <li :class="{active : quesI.questionContent[2] == '错误'}" @click="smallJudge(quesI,'错误')">错</li>
	                                        </ul>
		                                </div>
		            				</div>
		            				<!--填空-->
		            				<div class="clearfix answer_template answer_judge fl" v-if="quesI.quzType == 3">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score"  maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
	                                        <div class="detailed fl">
	                                        	<em>空数</em>
	                                        	<input type="text" name="" id="" value="" v-model="quesI.fillNum" @input="fillNumCtrl(quesI)" />
	                                        	<!--<input type="text" name="" id="" value="" v-model="quesI.fillNum" @focus="fillNumCtrl(quesI,quesI.fillNum)"  @input="validation(quesI,'fillNum')" />-->
	                                        </div>
	                                        <div class="detailed fl">
	                                        	<em v-if="quesI.quzScore.quzblank.length > 0">每空分值</em>
	                                        	<input type="text" name="" id="" v-for="(fillScore, fillScoreI) in quesI.quzScore.quzblank" value="" v-model="quesI.quzScore.quzblank[fillScoreI]" maxlength="2" @input="validation(quesI,'everyFill',fillScoreI)" />
	                                        </div>
		                                </div>
		            				</div>
		            				<!--简答-->
		            				<div class="clearfix answer_template answer_short_answer fl" v-if="quesI.quzType == 6">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                	<!--<span class="fl">答案</span>-->
	                                        <!--<div class="detailed fl">
	                                        	<em>字数</em>
	                                        	<input type="text" name="" id="" value="" />
	                                        </div>-->
		                                </div>
		            				</div>
		            				<!--阅读理解-->
		            				<div class="clearfix answer_template answer_reading fl" v-if="quesI.quzType == 5">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--材料题-->
		            				<div class="clearfix answer_template answer_material fl" v-if="quesI.quzType == 8">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--综合题-->
		            				<div class="clearfix answer_template answer_comprehensive fl" v-if="quesI.quzType == 9">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--论证/证明题-->
		            				<div class="clearfix answer_template answer_prove fl" v-if="quesI.quzType == 10">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--画图题-->
		            				<div class="clearfix answer_template answer_drawing fl" v-if="quesI.quzType == 11">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--自答题-->
		            				<div class="clearfix answer_template answer_self_answer fl" v-if="quesI.quzType == 12">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--解答题-->
		            				<div class="clearfix answer_template answer_answer fl"  v-if="quesI.quzType == 13">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
		                                    
		                                </div>
		            				</div>
		            				<!--作文-->
		            				<div class="clearfix answer_template answer_composition fl" v-if="quesI.quzType == 14">
		            					<b class="fl" v-text="quesI.titNo"></b>
		            					<div class="score fl">
		            						<p><em>分值</em><i class="iconfont iconshang" v-if="groupIndex == 0 && quesIndex == 0" @click="unifiedScore(bigI.smallTitle,quesI.quzScore.score)"></i></p>
		            						<input type="text" name="" id="" value="" v-model="quesI.quzScore.score" maxlength="2" @input="validation(quesI,'score')" />
		            					</div>
		            					<div class="all_tem fl clearfix">
	                                        <div class="detailed fl">
	                                        	<em>字数</em>
	                                        	<input type="text" name="" id="" value="" v-model="quesI.wordCount" />
	                                        </div>
		                                </div>
		            				</div>
		            			</div>
	            			</div>
	            		</div>			
            		</div>
            	</div>
                <div class="zy_paper_title_btn">
                	<div class="btn_group">
		                <button class="cancle" @click="returnList()">取消并返回列表</button>
		                <button class="middle" @click="returnEditPaper()">继续编辑卷面</button>
		                <button class="sure" @click="submitData()">完成设置</button>
		            </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
//接口汇总
import {wordRelevant} from '@/api'

//试卷静态数据
import questionTypeJson from '../../../assets/json/data.json';
	
export default{
	name : 'setAnswer',
	data (){
		return {
			//大题类型
			bigTypeArr : questionTypeJson.quzType,
			allData : {},
			//大题序号
			questionOrder : ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十'],
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
			}
		}
	},
	//父级参数
	props:[],
	//函数
	methods : {
		//分值/每空得分验证
		validation(quesI,type,index){
			//当前小题 验证类型 添加每空得分下标
			/*分值 score
			漏选得分 missedScore (多选)
//			空数 fillNum (填空)
			每空分值 everyFill (填空)*/
            let part  = /^[1-9]\d*$/;
            if(type == 'score'){
                if(!part.test(quesI.quzScore.score)){
                    quesI.quzScore.score = "";
                }
				//填空题 每空得分联动
				if(quesI.quzType == 3){
					if(quesI.quzScore.score > 0){
		 				if(quesI.quzScore.score % quesI.fillNum == 0){
		 					let score = quesI.quzScore.score / quesI.fillNum;
		   					quesI.quzScore.quzblank.forEach((e,i)=>{
		   						quesI.quzScore.quzblank[i] = score;
		   					});
		 				}
		 			}
				}
            }else if(type == 'missedScore'){
                if(!part.test(quesI.missedScore)){
                    quesI.missedScore = "";
                }
            }/*else if(type == 'fillNum'){
                if(!part.test(quesI.fillNum)){
                    quesI.fillNum = "";
                }
				if(Number(quesI.fillNum) > 10){
					quesI.fillNum = 10;
				}
            }*/else if(type == 'everyFill'){
                console.log(quesI,type,index)
                console.log(quesI.quzScore.quzblank[index])
                if(!part.test(quesI.quzScore.quzblank[index])){
                    quesI.quzScore.quzblank[index] = "";
                }
            }
        },
		//大题下拉列表题型
		aaa(allObj,selected){
			alert()
			selected = "";
			console.log(selected)
		},
		bigType (allObj,selected){
			//大题  大题类型
			allObj.forEach(function (e,i){
				e.groupType = selected;
				e.content.forEach(function (ele,index){
					ele.quzType = selected;
				});
			});
			console.log(this.allData)
		},
		//题组下拉列表题型
		groupType (allObj,selected){
			//题组  题组类型
// 			console.log(allObj)
// 			console.log(selected)
			let _this = this;
   			allObj.content.forEach(function (e,i){
   				e.quzType = selected;
   				//多选单选完形
	   			if(selected == 2 || selected == 4 || selected == 7){
					if(e.quzSection.length == 0){
						_this.questionType.option.forEach((ele,index) =>{
							if(index < 4){
								e.quzSection.push({'name': ele,'state':false});
							}
						});
					}
	 			}else{
	 				e.quzSection = [];
	 			}
   			});
   			
 		},
 		//大题第一小题向下箭头
 		unifiedScore (objI,currentScore){
 			//大题  当前分值
 			objI.forEach(function (e,i){
 				e.content.forEach(function (ele,index){
 					console.log(ele.quzScore.score)
 					
 					ele.quzScore.score = currentScore;
 				});
 			});
 		},
 		//填空题空数及验证
 		fillNumCtrl (quesI){
 			//小题
 			let part  = /^[1-9]\d*$/;
            if(!part.test(quesI.fillNum)){
                quesI.fillNum = "";
            }
			if(Number(quesI.fillNum) > 10){
				quesI.fillNum = 10;
			}
 			quesI.quzScore.quzblank.length = 0;
 			for(let i=0;i<quesI.fillNum;i++){
 				quesI.quzScore.quzblank.push(0);
 			}
// 			console.log((quesI.quzScore.score - 0) % (fillNum - 0))
 			if(quesI.quzScore.score > 0){
 				if(quesI.quzScore.score % quesI.fillNum == 0){
 					let score = quesI.quzScore.score / quesI.fillNum;
   					quesI.quzScore.quzblank.forEach((e,i)=>{
   						quesI.quzScore.quzblank[i] = score;
   					});
 				}
 			}
 			
 			console.log(quesI.quzScore.quzblank)
 		},
 		//填空题
 		fillScore(a,score){
 			
 			
 		},
 		//小题类型下拉列表题型
 		quesType (quesI,selected){
 			//小题  小题类型
			quesI.quzType = selected;
 		},
 		//小题单选按钮
 		smallSingleChoose (allObj,currentObj){
   			allObj.quzSection.forEach((ele,i) => {
   				ele.state = false;
   			});
   			currentObj.state = true;
			allObj.questionContent[2] = currentObj.name;
			allObj.questionContentCopy[2] = currentObj.name;
   			console.log(this.allData)
 		},
 		//小题多选按钮
 		smallcheckChoose (allObj,currentObj){
   			currentObj.state = !currentObj.state;
   			let str = '';
   			allObj.quzSection.forEach((ele,i) => {
				str += ',' + ele.name;
   			});
   			allObj.questionContent[2] = str.substring(1);
   			allObj.questionContentCopy[2] = str.substring(1);
   			console.log(this.allData)
 		},
 		//小题判断对错按钮
 		smallJudge (previous,current){
   			previous.questionContent[2] = current;
   			previous.questionContentCopy[2] = current;
   			//刷新
   			this.allData = JSON.parse(JSON.stringify(this.allData));
   			console.log(this.allData)
 		},
		//小题答案增加选项按钮
 		smallAddOption (allObj){
   			if(allObj.length < this.questionType.option.length){
   				allObj.push({'name': this.questionType.option[allObj.length],'state':false});
   			}else{
   				alert('最多10选项');
   			}
 		},
 		//小题答案减少选项按钮
 		smallReduceOption (allObj){
   			if(allObj.length > 4){
   				allObj.splice(allObj.length - 1,1);
   			}else{
   				alert('最少4选项');
   			}
// 			//console.log(this.allData.analysisData);
 		},
		//提交数据（设置答题卡）
 		submitData (){
   			// this.allData.pageRelated.step = '4';	//步骤 2卷面 3答案 4答题卡
   			// this.allData.analysisData.forEach(function (bigE,BigI){
   			// 	let bigTol = 0;
   			// 	let bigLen = 0;
   			// 	bigE.smallTitle.forEach(function (groupE,groupI){
   			// 		let groupTot = 0;
			// 		console.log(groupE.content.length)
   			// 		groupE.content.forEach(function (smallE,smallI){
   			// 			let fillTot = 0;
   			// 			smallE.quzScore.quzblank.forEach(function (fliiE,fillI){
   			// 				fillTot += fliiE;
   			// 			})
   			// 			smallE.quzScore.score = fillTot;
   			// 			groupTot += fillTot;
   			// 		})
   			// 		groupE.groupScore = groupTot;
   			// 		groupE.groupCount = groupE.content.length;
   			// 		bigTol += groupTot;
   			// 		bigLen += groupE.groupCount;
   			// 	});
   			// 	bigE.sectionScore = bigTol;
   			// 	bigE.sectionCount = bigLen;
   				
   			// 	//判断题选项
			// 	if(bigE.sectionType == 1){
			// 		bigE.smallTitle.forEach((groupE,groupI) => {
			// 			groupE.content.forEach((quesE,quesI) => {
			// 				quesE.quzSection = [];
			// 				quesE.quzSection.push({'name':'T','state':quesE.questionContent[2] == '正确'});
			// 				quesE.quzSection.push({'name':'F','state':quesE.questionContent[2] == '错误'});
			// 			});
			// 		});
			// 	}
   			// });
   			console.log(this.allData);
   			
			//提交数据
   			wordRelevant.submitAllData(this.allData).then(res => {
   				console.log(res);
   				if(res.status == 200){
   					this.$router.push({
	                    path : '/index/testPaper/testList',
	                    // query : {
//	                        paperMsg : JSON.stringify(this.allData)
	                    // }
	               	});
   				}
   			}).catch(e => {
   				
   			});
 		},
		//回到编辑卷面
		returnEditPaper (){
			this.allData.pageRelated.step = '3';
			wordRelevant.submitAllData(this.allData).then(res => {
				console.log(res.data.data.pageRelated.step);
				if(res.status == 200){
					this.$router.push({
	                    path : '/index/testPaper/process/examPaperEdit',
	                    query : {
//							paperResId : res.data.data.paperResId
							pageOperation : "editVolume"
	                    }
	               	});
				}
			}).catch(e => {
				
			});
		},
		//回到列表页
		returnList (){
			this.$router.push({
	            path : '/index/testPaper/testList',
	            query : {}
	       	});
		}
		
	},
	//结构加载之后
	mounted() {
		console.log(this)
	},
	//架构加载之前
	created() {
//		console.log(this.$route.query)
		let _this = this;
//		this.allData = JSON.parse(this.$route.meta.paperMsg);
//		this.allData = JSON.parse(this.$route.query.paperMsg);
		/*this.allData = JSON.parse(sessionStorage.getItem("paperMsg"));
		this.allData.analysisData.forEach(function (bigE,BigI){
			bigE.smallTitle.forEach(function (groupE,groupI){
				groupE.content.forEach(function (smallE,smallI){
					groupE.groupType = 2;
					smallE.quzScore.quzblank = [5,9];
//					console.log(smallE.quzScore.quzblank)
				})
			});
		});*/
		let sessionInfo = JSON.parse(sessionStorage.getItem('examInfo'));
//		this.allData.headInfo = sessionInfo.headInfo;
		this.allData.paperResId = sessionInfo.id;
//		console.log(this.allData)
		//获取页面数据
		wordRelevant.echoAllData({"paperResId" : this.allData.paperResId,"step":"3"}).then(res => {
			console.log(res);
			if(res.status == 200){
				this.allData = res.data.data;
	            //大题类型
//				if(this.allData.analysisData[0].sectionType == ""){
					this.allData.analysisData.forEach(function (e,i){
						if(e.sectionType == ""){
							_this.bigTypeArr.forEach(function (ele,index){
								console.log(e.topicNumber)
								if(e.topicNumber.indexOf(ele.name) != -1){
									e.sectionType = ele.type;
								}
							});
						}
						//填空题空数
						e.smallTitle.forEach((groupE,groupI) => {
							groupE.content.forEach((quesE,quesI) => {
								console.log(quesE.quzScore.quzblank.length)
//								quesE.questionContent[2] = '|sdas |asdas|asdas|685';
								if(quesE.quzType == 3 && quesE.quzScore.quzblank.length == 0){
//									console.log(quesE.questionContent[2].split('|').length-1)
									let n = quesE.questionContent[2].split('|').length;
									for(let i=0; i<n; i++){
										quesE.quzScore.quzblank.push(0);
									}
									quesE.fillNum = n;
								}
							});
						});
						
					})
//				}
//				测试分数 假数据
				/*this.allData.analysisData.forEach(function (bigE,BigI){
					bigE.smallTitle.forEach(function (groupE,groupI){
						groupE.groupType = "";
						groupE.content.forEach(function (smallE,smallI){
							smallE.quzScore.quzblank = [5,9];
		//					console.log(smallE.quzScore.quzblank)
						})
					});
				});*/
			}
		}).catch(e => {
			
		});
		//大题类型
		/*if(this.allData.analysisData[0].sectionType == ""){
			this.allData.analysisData.forEach(function (e,i){
				_this.bigTypeArr.forEach(function (ele,index){
					console.log(e.topicNumber)
					if(e.topicNumber.indexOf(ele.name) != -1){
						e.sectionType = ele.type;
					}
				});
			})
		}*/
		
		console.log(this.allData)
//		delete this.allData.pageRelated;
//		console.log(this.allData)
	},
	watch: {
		
	},
	components: {
		
	},
}
</script>

<style>
</style>