<template>
	<div class="clearfix">
		<!--<div id="editor" style="width: 200px; height: 200px;"></div>-->
		<!--<vue-ueditor-wrap :config="myConfig"  v-model="item"></vue-ueditor-wrap>-->
		<!--<input type="file" @change="selectFile($event)" ref="myupload">
		<br />
		<button @click="submitData()">提交提交提交</button>
		<button @click="obtainData()">获取获取获取</button>-->
		<div class="g_border fl">
            <div class="zy_paper_main">
                <div class="tit clearfix">
                    <span class="fl baocun">试题内容</span>
                    <ul class="fr">
                    	<li v-if="pageOperation=='knowledgePoint'" @click="knowledgeStateAll($event)">批量添加知识点</li>
                    	<li v-if="pageOperation=='knowledgePoint'" @click="knowledgeState()">添加知识点</li>
                        <li class="add_question_btn j_add_big_question" v-if="pageOperation=='editVolume'" @click="addBig('big')">添加大题</li>
                        <!--<li>补录题干/解析</li>-->
                        <li v-if="pageOperation=='editVolume'" @click="titleSwitching(allData.pageRelated.titleNaturalOrder = !allData.pageRelated.titleNaturalOrder)">题号模式</li>
                        <li class="open_analysis j_open_analysis" @click="analysisFn()">展开解析</li>
                        <!--<li class="open_analysis j_open_analysis" @click="analysisFn()" v-text="allData.pageRelated.analysis == 'true' ? '收起解析' ? '展开解析'">展开解析</li>-->
                    </ul>
                </div>
                <ul class="task_list j_task_list">
                    <li class="big_question_list" v-for="(bigI,index) in allData.analysisData" :key="index">
                        <div class="head j_head clearfix" @mouseover="headlineIn(bigI)" @mouseout="headlineOut(bigI)">
                            <b class="tit_num fl" v-text="bigI.headlineTitNo + '、'"></b> 
                            <div class="tit_cont fl" v-html="bigI.topicNumber" v-if="!bigI.headlineState"></div>
                            <div class="edit_big_tit fl clearfix" v-if="bigI.headlineState">
                            	<vue-ueditor-wrap class="editor_unified" :ref="index - 0 + 1" :config="myConfig" v-model="bigI.topicNumberCopy"></vue-ueditor-wrap>
                                <!--<textarea name="" id="" class="fl" v-model="bigI.topicNumberCopy"></textarea>-->
                                <!--<div class="btn_group fl">
                                    <button class="sure j_sure" @click="headlineSure(bigI)">确认</button>
                                    <button class="cancel j_cancel" @click="headlineCancel(bigI)">取消</button>
                                </div>-->
                            </div>
                            <span class="btn" v-show="bigI.headlineOperation" v-if="pageOperation=='editVolume'">
                                <b class="btn_edit j_btn_edit" @click="headlineEdit(bigI)">编辑名称</b>
                                <b class="btn_add" @click="headlineAddSmall('small',index)">添加小题</b>
                                <!--<b class="btn_sort" @click="headlineSetStartQue(bigI)">设置起始题号</b>-->
                                <b class="btn_move" @click="headlineMove('big',index)">移动</b>
                                <b class="btn_split btn_split_big" @click="headlineSplitBig(bigI,'big',index)">拆分大题</b>
                                <b class="btn_split btn_split_group" @click="headlineSplit(bigI,'group')">拆分题组</b>
                                <b class="btn_split btn_split_small" @click="headlineSplit(bigI,'small')">拆分小题</b>
                                <b class="btn_delete" @click="headlineDelete(bigI,index)">删除</b>
                            </span> 
                            <span class="btn fr" v-show="bigI.headlineConfirm">
                                <b class="btn_sure j_btn_sure" @click="headlineSure(bigI,index)">确认</b>
                                <b class="btn_cancel j_btn_cancel" @click="headlineCancel(bigI)">取消</b>
                            </span>
                        </div>
                        <ul class="cont">
                            <li class="clearfix group j_group" :class="{active : groupI.groupBorder}" v-for="(groupI,groupIndex) in bigI.smallTitle" @mouseover="groupIn(groupI)" @mouseout="groupOut(groupI)" :key="groupIndex">
                                <div class="group_head j_group_head" v-if="pageOperation=='editVolume' && groupI.groupTitState" @mouseover="groupTitIn(groupI)" @mouseout="groupTitOut(groupI)">
                                    <span class="btn" v-show="groupI.groupbtnOperation">
                                    	<b class="btn_quick_group" @click="groupFastMerge(groupI,groupIndex,index)">快速合并题目组</b>
                                        <b class="btn_edit j_btn_edit" @click="groupTitEdit(groupI)">编辑</b>
                                        <b class="btn_split j_btn_split" @click="groupSplit(groupI)">拆分</b>
                                        <b class="btn_delete j_btn_delete" @click="groupTitDelete(groupI,index,groupIndex)">删除</b>
                                    </span> 
                                    <span class="btn fr" v-show="groupI.groupbtnConfirm">
                                        <b class="btn_sure j_btn_sure" ref="dataNum" @click="groupTitSure(groupI,index,groupIndex)">确认</b>
                                        <b class="btn_cancel j_btn_cancel"  @click="groupTitCancel(groupI)">取消</b>
                                    </span>
                                    <div class="tit_cont" v-html="groupI.group" v-if="!groupI.groupState"></div>
                                     <vue-ueditor-wrap class="editor_unified" :ref="(index - 0 + 1) + '-' + (groupIndex - 0 + 1)" :config="myConfig" v-model="groupI.groupCopy" v-if="groupI.groupState"></vue-ueditor-wrap>
                                </div>
                                <div class="question j_question" v-for="(quesI,quesIndex) in groupI.content" @mouseover="smallIn(quesI)" @mouseout="smallOut(quesI)" :key="quesIndex">
                                    <span class="btn fr" v-show="pageOperation=='editVolume' && quesI.btnOperation">
                                        <b class="btn_edit j_btn_edit" @click="smallEdit(quesI)">编辑</b>
                                        <b class="btn_move j_btn_move" @click="smallMove('small',index,groupIndex,quesIndex)">移动</b>
                                        <b class="btn_merge_group j_btn_merge_group" v-if="groupIndex > 0 ? (groupI.groupTitState ? false:true):false" @click="smallMergeGroup(quesI,quesIndex,index,groupIndex)">与上题合并为题目组</b>
                                        <b class="btn_merge j_btn_remove" v-if="groupI.groupTitState" @click="smallMoveOutGroup(index,groupIndex,quesIndex)">移出题目组</b>
                                         <b class="btn_merge j_btn_merge" v-if="groupI.groupTitState?(quesIndex==0?false:true):(groupIndex == 0?false:true)"  @click="smallMergeQues(quesI,quesIndex,groupI,groupIndex,index)">与上题合并</b>
                                        <b class="btn_split j_btn_split" @click="smallSplit(quesI,quesIndex)">拆分</b>
                                        <b class="btn_delete j_btn_delete" @click="smallDelete(quesI,index,groupIndex,quesIndex)">删除</b>
                                    </span>
                                    <span class="btn fr" v-show="pageOperation=='editVolume' && quesI.btnConfirm">
                                        <b class="btn_sure j_btn_sure" @click="smallSure(quesI,groupI.content,index,groupIndex,quesIndex)">确认</b>
                                        <b class="btn_cancel j_btn_cancel" @click="smallCancel(quesI)">取消</b>
                                    </span>
                                    <div class="question_option">
                                        <div class="question_type clearfix">
                                            <b class="fl tit_num" v-text="quesI.titNo">1</b> 
                                            <select class="fl" name="" :style="{cursor : pageOperation=='editVolume' ? 'pointer':'no-drop'}" v-model="quesI.quzType" :disabled="pageOperation=='knowledgePoint'" @change="smallType(quesI,quesI.quzType)">
                                                <option value="">请选择题型</option>
                                                <option v-for="(i,typeIndex) in questionType.type" v-bind:value="i.value" v-text="i.name" :key="typeIndex"></option>
                                            </select> 
                                            <div class="question_template fl">
                                            	<!--单选-->
                                                <div class="all_tem single clearfix" v-if="quesI.quzType == 2">
                                                	<span class="fl">答案</span>
                                                    <ul class="fl">
                                                        <li :style="{cursor : pageOperation=='editVolume' ? 'pointer':'no-drop'}" :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" :key="optionIndex" @click="smallSingleChoose(quesI,i)"></li>
                                                        <li class="option_btn fl" v-if="pageOperation=='editVolume'">
                                                            <i class="iconfont iconjia" @click="smallAddOption(quesI.quzSection)"></i>
                                            				<i class="iconfont iconjianshao" @click="smallReduceOption(quesI.quzSection)"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!--复选-->
                                                <div class="all_tem multiple clearfix" v-if="quesI.quzType == 4">
                                                	<span class="fl">答案</span>
                                                    <ul class="fl">
                                                        <li :style="{cursor : pageOperation=='editVolume' ? 'pointer':'no-drop'}" :class="{active : i.state}" v-for="(i,optionIndex) in quesI.quzSection" v-text="i.name" :key="optionIndex" @click="smallcheckChoose(quesI,i)">A</li>
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
                                                        <li :style="{cursor : pageOperation=='editVolume' ? 'pointer':'no-drop'}" :class="quesI.questionContent[2] == '正确' ? 'active' : ''" @click="smallJudge(quesI,'正确')">对</li>
                                                        <li :style="{cursor : pageOperation=='editVolume' ? 'pointer':'no-drop'}" :class="quesI.questionContent[2] == '错误' ? 'active' : ''" @click="smallJudge(quesI,'错误')">错</li>
                                                        <!--<li :class="{active : quesI.questionContent[2] == '正确'}" @click="smallJudge(quesI.questionContent,'正确')">对</li>
                                                        <li :class="{active : quesI.questionContent[2] == '错误'}" @click="smallJudge(quesI.questionContent,'错误')">错</li>-->
                                                    </ul>
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="qusetion_main">
                                        <div class="normal_state" v-if="!quesI.state">
                                            <div class="echo_content stem_cont" v-html="quesI.questionContent[0]"></div>
                                            <!--判断1 单选2 多选4-->
                                            <div class="analysis_answer answer_cont clearfix" v-if="quesI.quzType != 1 && quesI.quzType != 2 && quesI.quzType != 4">
                                            	<span class="fl">答案：</span>
                                                <div class="echo_content fl" v-html="quesI.questionContent[2]"></div>
                                            </div>
                                            <transition name="analysis">
	                                            <div class="analysis_answer analysis_cont clearfix" v-if="allData.pageRelated.analysis">
	                                                <span class="fl">解析：</span>
	                                                <div class="echo_content fl" v-html="quesI.questionContent[1]"></div>
	                                            </div>
                                            </transition>
                                            <div class="knowledge_point" v-if="allData.pageRelated.knowledge">
                                            	<div class="difficult clearfix">
                                            		<span class="fl"> <i class="g_star">*</i>难易度：</span>
                                            		<ul class="fl">
                                            			<li class="fl" v-for="(difficultItem,difficultIndex) in knowledgePointsDifficulty" :key="difficultIndex">
                                            				<label :for="'id' + index + groupIndex + quesIndex + quesI.quzType + difficultIndex" v-model="quesI.knowledgePoint.degree">
																<input type="radio" :name="'degree' + index + groupIndex + quesIndex + quesI.quzType" :value="difficultIndex + 1" :id="'id' + index + groupIndex + quesIndex + quesI.quzType + difficultIndex" v-model="quesI.knowledgePoint.degree" />
																<b v-text="difficultItem.name"></b>
															</label>
                                            			</li>
                                            		</ul>
                                            	</div>
                                            	<div class="topic clearfix">
                                            		<span class="fl"> <i class="g_star">*</i>知识点：</span>
                                            		<ul class="fl">
                                            			<li class="fl" v-for="(pointI,pointIndex) in quesI.knowledgePoint.point" :key="pointIndex">
                                            				<span v-text="pointI.kpointName"></span>
                                            				<i class="iconfont iconguanbi1" @click="deleteKnowledge(quesI.knowledgePoint.point,pointIndex)"></i>
                                            				<!--<i class="iconfont iconguanbi1" @click="deleteKnowledge(index,groupIndex,quesIndex,pointIndex)"></i>-->
                                            			</li>
                                            			<li class="fl" @click="addKnowledge($event,index,groupIndex,quesIndex)">+添加</li>
                                            		</ul>
                                            	</div>
                                            </div>
                                        </div>
                                        <div class="edit_state" v-if="quesI.state" :class="{'active': quesI.split}">
                                            <div class="stem_cont">
                                                <!--<div class="editor_unified" id=""></div>-->
                                                <vue-ueditor-wrap class="editor_unified" :ref="(index - 0 + 1) + '-' + (groupIndex - 0 + 1) + '-' + (quesIndex - 0 + 1)" :config="myConfig" v-model="quesI.questionContentCopy[0]"></vue-ueditor-wrap>
                                            </div>
                                            <div class="answer_cont" v-if="quesI.quzType != 1 && quesI.quzType != 2 && quesI.quzType != 4" v-show="!quesI.split">
                                                <span>答案：</span>
                                                <!--<div class="editor_unified" id=""></div>-->
                                                <vue-ueditor-wrap class="editor_unified" :config="myConfig" v-model="quesI.questionContentCopy[2]"></vue-ueditor-wrap>
                                            </div>
                                            <div class="analysis_cont" v-show="!quesI.split">
                                                <span>解析：</span>
                                                <!--<div class="editor_unified" id=""></div>-->
                                                <vue-ueditor-wrap class="editor_unified" :config="myConfig" v-model="quesI.questionContentCopy[1]"></vue-ueditor-wrap>
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
                <!--知识点联动-->
                <div class="knowledge_linkage" ref="knowledge_linkage" :style="{'top':pageStatic.knowledgePoints.top+'px','left':pageStatic.knowledgePoints.left+'px'}" v-if="pageStatic.knowledgePoints.display">
        			<ul>
        				<li :class="{'active':fItem.children.length && fItem.state}" v-for="(fItem,fI) in knowledData" @click="knowledgeF(fI)" :key="fI">
        					<input type="checkbox" name="" :id="fItem.id" value="" v-model="fItem.checked" @click="$event.stopPropagation();" v-if="fItem.children.length == 0" />
        					<label :for="fItem.id" v-text="fItem.name"></label>
        					<div class="children">
        						<ul v-show="fItem.state && fItem.children.length">
        							<li :class="{'active':sItem.children.length && sItem.state}" v-for="(sItem,sI) in fItem.children" @click="knowledgeS($event,sI)" :key="sI">
        								<input type="checkbox" name="" :id="sItem.id" value="" v-model="sItem.checked" @click="$event.stopPropagation();" v-if="sItem.children.length == 0" />
        								<label :for="sItem.id" v-text="sItem.name"></label>
        								<div class="children">
        									<ul v-show="sItem.state && sItem.children.length">
        										<li v-for="(cItem,cI) in sItem.children" @click="knowledgeC($event,cI)" :key="cI">
        											<input type="checkbox" name="" :id="cItem.id" value="" v-model="cItem.checked" @click="$event.stopPropagation();" />
        											<label :for="cItem.id" v-text="cItem.name"></label>
        										</li>
        									</ul>
        								</div>
        							</li>
        						</ul>
        					</div>
        				</li>
        			</ul>
        		</div>
            </div>
            
			<div class="zy_paper_title_btn">
            	<div class="btn_group">
	                <button class="cancle" @click="returnList()">取消并返回列表</button>
	                <button class="middle" @click="previousStep()">上一步</button>
	                <button class="sure" @click="submitData()" v-text="pageOperation=='editVolume'?'设置答案':'完成设置'"></button>
           			<!--<router-link :to="{path:'/index/process/setAnswer', query: {paperMsg : JSON.stringify(allData)}}"><button class="sure">设置答案</button></router-link>-->
	            </div>
            </div>
            
            <!--各种框框-->
            <!--快捷合并题目组-->
			<div class="prompt_box public_box quick_merge_group" v-if="pageStatic.fastMergeGroup.display">	
				<div class="hide"></div>
				<div class="con">
					<div class="tit">
						<span>快捷合并题目组</span>
					</div>
					<div class="main_cont">
						<p class="order">
							<span>起始题号：</span>
							<input type="text" name="" id="" value="" :placeholder="'开始' + pageStatic.fastMergeGroup.tipStart" maxlength="2" v-model="pageStatic.fastMergeGroup.start" @blur="groupFastTest(pageStatic.fastMergeGroup.start,pageStatic.fastMergeGroup.tipStart,'start')" />
						</p>
						<p class="number">
							<span>结束题号：</span>
							<input type="text" name="" id="" value="" :placeholder="'结束' + pageStatic.fastMergeGroup.tipEnd" maxlength="2" v-model="pageStatic.fastMergeGroup.end" @blur="groupFastTest(pageStatic.fastMergeGroup.end,pageStatic.fastMergeGroup.tipEnd,'end')" />
						</p>
						<p class="tip">提示信息提示信息</p>
					</div>
					<div class="btn_group">
						<button class="sure" @click="groupFastMergeSure()">确认</button>
						<button class="cancel" @click="groupFastMergeCancel()">取消</button>
					</div>
				</div>
			</div>
			
            <!--移动大题/小题-->
			<div class="prompt_box public_box move_ques" v-if="pageStatic.moveQuestion.display">	
				<div class="hide"></div>
				<div class="con">
					<div class="tit">
						<span v-if="pageStatic.moveQuestion.moveType=='big'">移动大题</span>
						<span v-if="pageStatic.moveQuestion.moveType=='small'">移动题目</span>
					</div>
					<div class="main_cont">
						<p class="order">
							<span>目标大题题号：</span>
							<select name="" v-model="pageStatic.moveQuestion.targetBigTitNo" @change="moveBigTitSection()">
								<option v-for="(move,moveI) in pageStatic.moveQuestion.bigTitSection" v-bind:value="move" v-text="move" :key="moveI">一</option>
							</select>
						</p>
						<p class="number" v-if="pageStatic.moveQuestion.moveType=='small'">
							<span>目标小题题号：</span>
							<input type="text" name="" id="" value="" :placeholder="'请输入' + pageStatic.moveQuestion.tipStart + '~' + pageStatic.moveQuestion.tipEnd + '整数'" maxlength="2" v-model="pageStatic.moveQuestion.targetSmallTitNo" />
						</p>
						<p class="tip">提示信息提示信息</p>
					</div>
					<div class="btn_group">
						<button class="sure" @click="moveSure()">确认</button>
						<button class="cancel" @click="moveCancel()">取消</button>
					</div>
				</div>
			</div>
			
            <!--设置起始题号-->
			<!--<div class="prompt_box public_box start_ques" v-if="pageStatic.startQuestionNum.display">	
				<div class="hide"></div>
				<div class="con">
					<div class="tit">
						<span>设置起始题号</span>
					</div>
					<div class="main_cont">
						<p class="number">
							<span>目标小题题号：</span>
							<input type="text" name="" id="" value="" :placeholder="'请输入起始题号'" maxlength="2" v-model="pageStatic.moveQuestion.startNum" />
						</p>
						<p class="tip">提示信息提示信息</p>
					</div>
					<div class="btn_group">
						<button class="sure" @click="startQuesSure()">确认</button>
						<button class="cancel" @click="startQuesCancel()">取消</button>
					</div>
				</div>
			</div>-->
			
            <!--添加大题/小题-->
			<div class="prompt_box public_box move_ques" v-if="pageStatic.addQuestion.display">	
				<div class="hide"></div>
				<div class="con">
					<div class="tit">
						<span v-if="pageStatic.addQuestion.addType=='big'">添加大题</span>
						<span v-if="pageStatic.addQuestion.addType=='small'">添加小题</span>
					</div>
					<div class="main_cont">
						<p class="order" v-if="pageStatic.addQuestion.addType=='big'">
							<span>起始题号：</span>
							<select name="" v-model="pageStatic.addQuestion.targetBigTitNo">
								<option v-for="(move,moveI) in pageStatic.addQuestion.bigTitSection" v-bind:value="move" v-text="move" :key="moveI">一</option>
							</select>
						</p>
						<p class="number" v-if="pageStatic.addQuestion.addType=='small' && pageStatic.addQuestion.tipInput">
							<span>起始题号：</span>
							<input type="text" name="" id="" value="" :placeholder="'请输入' + pageStatic.addQuestion.tipSmallStart + '~' + pageStatic.addQuestion.tipSmallEnd + '整数'" maxlength="2" v-model="pageStatic.addQuestion.targetSmallTitNo" />
						</p>
						<p class="number">
							<span>增加数量：</span>
							<input type="text" name="" id="" value="" maxlength="2" v-model="pageStatic.addQuestion.addNum" />
						</p>
						<p class="tip">提示信息提示信息</p>
					</div>
					<div class="btn_group">
						<button class="sure" @click="addSure()">确认</button>
						<button class="cancel" @click="addCancel()">取消</button>
					</div>
				</div>
			</div>
			
            <!--拆分大题-->
			<div class="prompt_box public_box split_big_ques" v-if="pageStatic.splitBigQuestion.display">	
				<div class="hide"></div>
				<div class="con">
					<div class="tit">
						<span>拆分大题</span>
					</div>
					<div class="main_cont">
						<p class="number">
							<span>起始题号：</span>
							<input type="text" name="" id="" value="" :placeholder="'请输入' + pageStatic.splitBigQuestion.tipStart + '~' + pageStatic.splitBigQuestion.tipEnd + '整数'" maxlength="2" v-model="pageStatic.splitBigQuestion.targetNo" />
						</p>
						<p class="tip">提示信息提示信息</p>
					</div>
					<div class="btn_group">
						<button class="sure" @click="splitBigSure()">确认</button>
						<button class="cancel" @click="splitBigCancel()">取消</button>
					</div>
				</div>
			</div>
			
            <!--<div @click="load()">loading</div>
        	<div @click="time()">定时</div>
        	<div @click="confirm()">确认</div>-->
            
        </div>
		<!--右边浮框-->
	    <div class="fr" v-if="pageOperation=='editVolume'">
	        <div class="zy_float">
		        <div class="selected_topic toSelect" @click="toQuestionlist">
		        	<i class="iconfont icontiku toSelectIcon"></i>
		            <span>去选题</span>
		        </div>
		        <div class="selected_topic examBasket" @click="expandExerciseBar">
		        	{{$store.state.arr.length}}
		        	<br/>
		                        习题篮
		        </div>
	        </div>
	    </div>
	</div>
</template>

<script>
//import $ from 'jquery';
/*//文本编辑
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
import {dataObj} from '../../assets/json/dataObj.js';
//import {dataObj} from '../../assets/json/dataObjWX.js';

//接口汇总
import {wordRelevant} from '@/api'
*/
//引入页面js
import examPaperEdit  from "../../../assets/js/examPaperEdit.js"

export default {
	...examPaperEdit
}
</script>

