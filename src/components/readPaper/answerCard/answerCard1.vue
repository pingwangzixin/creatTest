<template>
	<div  @click="bodyListener" >
		<div class="wd_header">
			<div>
				<i class="iconfont iconfanhui1" @click="jump"></i>
				<span @click="jump">返回</span>
				<span>数学</span>
			</div>	
			<p>制作答题卡</p>
		</div>
		<div class="wd_answer clearfix" >
			<div class="wd_left fl">
				<div>
					<div class="title">结构详情</div>
					<div class="total-score">当前总分：{{_totalScore}}分</div>
					<div class="main">
						<div v-for="(item,index) in  all.arr"  :key="index">
							<h3 class="clearfix"><span class="fl">{{item.number}}、{{item.title}}</span><span class="fr">{{item.fraction}}分</span></h3>
							<div v-for="(item1,index1) in item.content" :key="index1">
								<p class="clearfix" v-for="(item2,index2) in item1.arr" :key="index2"><span class="fl">{{item2.num.content}}</span><span class="fr">{{item2.score}}分</span></p>
							</div>
						</div> 
					</div>
				</div>
			</div>
			<div class="wd_right fr" >
				<div class="title" >
					<span>设置答题卡类型</span>
					<span>+</span>
				</div>
				<div class="scantron" :class="{prohibit:all.hasSaved==1}">
					<label ><input type="radio"  v-model="all.scantronType"  name="ivuRadioGroup_1573181179785_5" value="0">空白答题卡</label> 
					<label ><input type="radio"  v-model="all.scantronType"  name="ivuRadioGroup_1573181179785_5" value="1">卷卡合一</label>
				</div>
				<div class="question_types" v-if="all.scantronType==0" :class="{prohibit:all.hasSaved==1}"> 
					<span>题号</span>
					<div class="choiceNumber" @click="choiceTh">
						<span>{{all.sortType}}</span>
						<p></p>
					</div>
					<div v-if="right.titleNumber.isShow">
						<p v-for="(item,index) in right.titleNumber.arr" :key="index" @click="choiceTh1(item)">{{item}}</p>
					</div>
				</div>
				<div class="tjtm" v-if="all.scantronType==0" :class="{prohibit:all.hasSaved==1}">
					<p @click="xzkgtshow">+客观题</p>
					<p @click="xztktshow">+填空题</p>
					<p @click="xzjdtshow">+解答题</p>
					<p @click="xzxztshow">+选做题</p>
					<p @click="xzzwtshow">+作文题</p>
					<!-- <p>+混合题</p> -->
				</div>
				<div  class="volumeCard" v-if="all.scantronType==1" :class="{prohibit:all.hasSaved==1}">
					<span @click="testCancel">从组卷选择</span>
					<p>说明：需在组卷中心中配置试卷结构和内容，再选取试卷生成题卡</p>
				</div>
				<div class="tjtm tjtm1" :class="{prohibit:all.hasSaved==1}">
					<p @click="xztgqshow">+题干区</p>
					<p @click="xzjdqshow">+禁答区</p>
				</div>
				<div class="szlx" :class="{prohibit:all.hasSaved==1}">
					<div class="tit">设置答题卡类型</div>
					<div class="lan">
						<i class="iconfont" :class="{'active':all.scantronFormat == 1}" @click="scantronFormat(1)">&#xe60d;</i>
						<i class="iconfont" :class="{'active':all.scantronFormat == 2}" @click="scantronFormat(2)">&#xe60c;</i>
						<i class="iconfont" :class="{'active':all.scantronFormat == 3}" @click="scantronFormat(3)">&#xe60e;</i>
					</div>
					<div class="tip">一栏适用于A4/B5，两/三栏适用于A3/8K/B4</div>
				</div>
				<div class="mfx" :class="{prohibit:all.hasSaved==1}">
					<label for="mifeng" class="lab">
						<input type="checkbox" name id="mifeng" class="ipt"  @change="pottedLine" v-model="all.pottedLine"/>
						<span>密封线</span>
					</label>
					<label for="xinxi" class="lab">
						<input type="checkbox" name id="xinxi" class="ipt" v-model="all.showPageInfo" :disabled="all.pottedLine"/>
						<span>每页显示学生信息</span>
					</label>
				</div>
				<div class="dy" :class="{prohibit:all.hasSaved==1}">
					<span>打印格式：</span>
					<label for="sm">  
						<input type="radio" name="dayin" id="sm" class="ipt1" v-model="all.printFormat"  value="0"/>
						<span>双面打印</span>
					</label>
					<label for="dm">
						<input type="radio" name="dayin" id="dm" class="ipt1" v-model="all.printFormat"  value="1" :disabled="!all.pottedLine"/>
						<span>单面打印</span>
					</label>
				</div>
				<div class="ksh" :class="{prohibit:all.hasSaved==1}">
					<span>考试号：</span>
					<label for="ttk">
						<input type="radio" name="ksh" id="ttk" class="ipt1" v-model="all.numberFormat.content"  @change="calculatedC" value="1" :disabled="all.pottedLine"/>
						<span>填涂框</span>
					</label>

					<label for="ewm">
						<input type="radio" name="ksh" id="ewm" class="ipt1" v-model="all.numberFormat.content" value="2" @change="calculatedC"/>
						<span>二维码</span>
					</label>
					<p>
						<label for="txm">
							<input type="radio" name="ksh" id="txm" class="ipt1" v-model="all.numberFormat.content" value="3" @change="calculatedC"/>
							<span>条形码</span>
						</label>
					</p>
				</div>
				<div class="mfx" :class="{prohibit:all.hasSaved==1}">
					<label for="zysx" class="lab">
						<input type="checkbox" name id="zysx" class="ipt"  v-model="all.existAttentionMatters.bol" @change="calculatedC"/>
						<span>注意事项</span>
					</label>
					<label for="qkbj" class="lab">
						<input type="checkbox" name id="qkbj" class="ipt"  v-model="all.markingMissExamination.bol" @change="calculatedC"/>
						<span>缺考标记</span>
					</label>
				</div>
				<div class="kgtbb" :class="{prohibit:all.hasSaved==1}">
					<h3>设置客观题版式</h3>
					<div>
						<label for="xxsp" class="lab">
							<input type="checkbox" name id="xxsp" class="ipt"  v-model="all.existVerticalRow" @change="calculatedC"/>
						<span>客观题选项竖排</span>
						</label>
						<label for="xxsy" class="lab">
							<input type="checkbox" name id="xxsy" class="ipt"  v-model="all.existChoiceFigure" @change="judge"/>
							<span>判断题选项使用✓✘</span>
						</label>
						<label>
							<input type="checkbox" name class="ipt"  v-model="halfFrame" @change="judge"/>
							<span>半框</span>
						</label>
					</div>

				</div>
				<div class="xiazai">
					<div>
						<p class="active" @click="preservation" :class="{prohibit:all.hasSaved==1}">完成设置</p>
						<p @click="send">预览</p>
					</div>
					<div>
						<p :class="{active:all.answerSheetId}"><a :href="configure.testPaper + 'examPaper/answerSheet/downPDF?id='+all.answerSheetId" :style="all.answerSheetId?'':'pointer-events: none;'">下载pdf</a></p>
						<P>导出模板</P>
					</div>
				</div>
			</div>
			<div class="wd_main" id="htmlstr" >
				<input type="file" accept=".jpg,.png,.gif,.jpeg" name="" ref="aa" style="display:none" @change="file1"/>
				<div class="yilan" v-if="all.scantronFormat == 1" :class="{prohibit:all.hasSaved==1}">
					<div class="one">
						<div class="left" :class="{'left_mifen':all.pottedLine }">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 126px;top: 10px;"></div>
							<svg class="svg1" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="82" y="100"></use>
								<use xlink:href="#letterline" x="82" y="500"></use>
								<use xlink:href="#letterline" x="82" y="900"></use>
								<g v-if="all.markingMissExamination.bol">
									<g>
										<rect stroke="#4A4A4A" fill="#FFFFFF" x="0" y="940" width="55" height="49"></rect>
										<text font-size="13" fill="#f00"><tspan x="30" y="957" text-anchor="middle">缺考</tspan></text>
										<rect stroke="none" fill="#4A4A4A" x="0" y="964" width="55" height="1"></rect>
										<rect stroke="#4A4A4A" fill="#FFFFFF" x="20" y="972" width="17" height="10"></rect>
									</g>
								</g>
								<g>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
								<g transform="rotate(-90,112,112)">
									<rect stroke="#f00" fill="#FFFFFF" stroke-dasharray="4" x="0" y="0" width="180" height="75" rx="0"></rect>
									<text font-size="16" fill="#f00">
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 2">二维码粘贴区</tspan>
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 3">条形码粘贴区</tspan>
									</text>
								</g>
							</svg>
						</div>
						<div class="right">
							<div></div>
							<div></div>
						</div>
						<div class="content" :class="{'content_mifen':all.pottedLine}" @click.stop>
							<div class="textMessage"  :style="'width:'+ all.textMessage.w+'px;height:'+all.textMessage.h+'px;'" @mouseover="headingAcross" @mouseout="headingAway"  @click.stop>
								<div v-html="all.textMessage.content" v-if="all.textMessage.showFlag" @click.stop="titleEditing" style="padding: 4px 8px 0 ;overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #F00;"></div>
								<vue-ueditor-wrap :config='myConfig'  v-model="all.textMessage.content" v-if="!all.textMessage.showFlag" style="width:100%;height:100%;margin-top:-36px;"></vue-ueditor-wrap>
								<i  v-show="!all.textMessage.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(all.textMessage.h-20)+'px;'" @mousedown="drag($event)"></i>
							</div>
							<div v-for="(item,index) in rendering.arr1" :key="index">
								<div class="posi title1" v-if="item.questionType != '16'" :style="'width:'+ item.infor.font.w+'px;height:'+item.infor.font.h+'px;top:'+item.infor.font.y+'px;left:'+item.infor.font.x+'px;' " @mouseover="subjectAcross(item)" @mouseout="subjectAway(item)"> 
									<div v-html="item.infor.font.content"  :class="{bord:!item.infor.font.showFlag1}"  @click.stop="subjectEditing(item)"  v-if="item.infor.font.showFlag"  style="overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #F00;"></div>
									<vue-ueditor-wrap :config='myConfig'  v-model="item.infor.font.content" v-if="!item.infor.font.showFlag" style="width:100%;height:100%;margin-top:-36px;"></vue-ueditor-wrap>
									<i  v-show="!item.infor.font.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.infor.font.h-20)+'px;'" @mousedown="drag1($event,item)"></i>
								</div>
								<div v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div v-for="(item2,index2) in item1.arr" :key="index2">
											<div class="posi" :style="'width:'+ item2.w+'px;height:'+ item1.h+'px;top:'+item2.y+'px;left:'+ item2.x+'px;'" >
												<div class="tu" v-if="item2.img[0].length>0" v-for="(item3,index3) in item2.img[0]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="editcogeditoring"  v-html="item2.words[0]" v-if="item2.bol[0] " @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="operate" v-show="item.bol" v-if="item1.arr.length==1?true:(index2==0?false:true)"> 
													<span  class="posi shou subTopic"  style="right: 187px; top: 1px;" @click="file(item1,item)">插图</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='vertical'}" style="right: 145px; top: -1px;" @click="jdtformat3(item,item1,'竖')">竖排</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='transverse'}" style="right: 100px; top: -1px;"  @click="jdtformat3(item,item1,'横')">横排</span> 
													<span class="posi shou" style="right: 44px; top: -1px;" @click="jdtedit(item)">编辑</span> 
													<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
												</div>
												<i v-if="item1.arr.length==1?true:(index2==0?false:true)"  v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[0]" v-if="!item2.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
											</div>
										</div>
									</div>
								</div>
								<div v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div class="posi" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.y+'px;left:'+ item1.x+'px;'" >
											<div class="tu" v-if="item1.img[0].length>0" v-for="(item2,index2) in item1.img[0]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'')" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="editcogeditoring"  v-html="item1.words[0]" v-if="item1.bol[0] " @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="operate" v-show="item.bol" > 
												<span  class="posi shou subTopic"  style="right: 100px; top: 1px;" @click="file(item1,item)">插图</span> 
												<span class="posi shou" style="right: 44px; top: -1px;" @click="xztedit(item)">编辑</span> 
												<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
											</div>
											<i v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[0]" v-if="!item1.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
										</div>
									</div>
								</div>
								<div v-if="item.topicArea &&  item.topicArea.rect.x != '' &&  (item.questionType == '1' || item.questionType == '2' || item.questionType == '4' )"   @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)">
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-model="item.topicArea.words[0]" v-if="item.topicArea.isShear?!item.topicArea.bol[1]:!item.topicArea.bol[0]" style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
								<div v-if="item.topicArea &&  item.topicArea.rect.x != '' && item.questionType == '3'"   @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-model="item.topicArea.words[0]" v-if="item.topicArea.isShear?!item.topicArea.bol[1]:!item.topicArea.bol[0]" style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
							</div>
							
							<div class="foot-page">第1页</div>
						</div>
						<svg class="svg2" :class="{'svg2_mifen':all.pottedLine}" height="1072" version="1.1">
							<defs>
								<g id="rowdown">
									<path d="M26,14.9500205 L39,14.9500205 L39,16 L26,16 L26,14.9500205 Z M26,10.2999795 L36,10.2999795 L36,11.349959 L26,11.349959 L26,10.2999795 Z M26,6.09997949 L31,6.09997949 L31,7.15004102 L26,7.15004102 L26,6.09997949 Z M37.9285041,11.349959 L37.9285041,7.15004102 L34.713912,7.15004102 L34.713912,9.24999999 L31.4993198,6.62500001 L34.713912,4 L34.713912,6.09995899 L39,6.09995899 L39,11.349959 L37.9285041,11.349959 Z" id="" fill="#FFFFFF"></path>
								</g> 
								<g id="rowadd">
									<path d="M4,5 L17,5 L17,6.13333333 L4,6.13333333 L4,5 Z M4,9.06666667 L14,9.06666667 L14,10.2 L4,10.2 L4,9.06666667 Z M4,13.6 L9,13.6 L9,14.7333333 L4,14.7333333 L4,13.6 Z M15.9285714,9.06666667 L17,9.06666667 L17,13.6 L17,14.7333333 L15.9285714,14.7333333 L12.7142857,14.7333333 L12.7142857,17 L9.5,14.1666667 L12.7142857,11.3333333 L12.7142857,13.6 L15.9285714,13.6 L15.9285714,9.06666667 Z" id="Combined-Shape" fill="#FFFFFF"></path>
								</g>
							</defs>
							<g v-if="all.pottedLine && all.existAttentionMatters.bol">
								<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
								<text font-size="11" fill="#f00">
									<tspan :x="all.existAttentionMatters.font[0].x" :y="all.existAttentionMatters.font[0].y">1. 答题前请将姓名、班级、考场、座位号和准考证号填写清楚。</tspan>
									<tspan :x="all.existAttentionMatters.font[1].x" :y="all.existAttentionMatters.font[1].y">2. 客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。</tspan>
									<tspan :x="all.existAttentionMatters.font[2].x" :y="all.existAttentionMatters.font[2].y">3. 主观题必须使用黑色签字笔书写。</tspan>
									<tspan :x="all.existAttentionMatters.font[3].x" :y="all.existAttentionMatters.font[3].y">4. 必须在题号对应的答题区域内作答,超出答题区域书写无效。</tspan>
									<tspan :x="all.existAttentionMatters.font[4].x" :y="all.existAttentionMatters.font[4].y">5. 保持答卷清洁完整。</tspan>
								</text>
							</g>
							<g v-if="!all.pottedLine">
								<g v-if="all.existAttentionMatters.bol">
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<g v-for="(item, index) in all.basicInfor" :key="index">
											<text font-size="13" :x="item.font[0].x" :y="item.font[0].y">{{ item.name }}</text>
											<rect fill="#f00" :x="item.rectangle.x" :y="item.rectangle.y" :width="item.rectangle.w" :height="item.rectangle.h" />
										</g>
									</g>
									<g class="basicInforShow" v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" :x="btnState.basicInfor.font.x" :y="btnState.basicInfor.font.y" />
										<text class="shou" font-size="14" fill="#fff" :x="btnState.basicInfor.rectangle.x" :y="btnState.basicInfor.rectangle.y">编辑</text>
									</g>
									<g>
										<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
										<text font-size="11" fill="#f00">
											<tspan :x="all.existAttentionMatters.font[0].x" :y="all.existAttentionMatters.font[0].y">1. 答题前请将姓名、班级、考场、座位号和准考证号填写清楚。</tspan>
											<tspan :x="all.existAttentionMatters.font[1].x" :y="all.existAttentionMatters.font[1].y">2. 客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。</tspan>
											<tspan :x="all.existAttentionMatters.font[2].x" :y="all.existAttentionMatters.font[2].y">3. 主观题必须使用黑色签字笔书写。</tspan>
											<tspan :x="all.existAttentionMatters.font[3].x" :y="all.existAttentionMatters.font[3].y">4. 必须在题号对应的答题区域内作答,超出答题区域书写无效。</tspan>
											<tspan :x="all.existAttentionMatters.font[4].x" :y="all.existAttentionMatters.font[4].y">5. 保持答卷清洁完整。</tspan>
										</text>
									</g>
								</g>
								<g v-if="!all.existAttentionMatters.bol" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<g v-for="(item, index) in all.basicInfor" :key="index">
											<text font-size="13" :x="item.font[0].x" :y="item.font[0].y">{{ item.name }}</text>
											<rect fill="#f00" :x="item.rectangle.x" :y="item.rectangle.y" :width="item.rectangle.w" :height="item.rectangle.h" />
										</g>
									</g>
									<g class="basicInforShow" v-show="btnState.basicInfor.isShow" @click="basicInforShow">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" :x="btnState.basicInfor.font.x" :y="btnState.basicInfor.font.y" />
										<text class="shou" font-size="14" fill="#fff" :x="btnState.basicInfor.rectangle.x" :y="btnState.basicInfor.rectangle.y">编辑</text>
									</g>
								</g>
								<g v-if="all.numberFormat.content == 2 || all.numberFormat.content == 3">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" :x="all.numberFormat.rect.x" :y="all.numberFormat.rect.y" :width="all.numberFormat.rect.w" :height="all.numberFormat.rect.h" rx="5"></rect>
									<text font-size="16" fill="#f00">
										<tspan v-if="all.numberFormat.content == 2" :x="all.numberFormat.font.x" :y="all.numberFormat.font.y">二维码粘贴区</tspan>
										<tspan v-if="all.numberFormat.content == 3" :x="all.numberFormat.font.x" :y="all.numberFormat.font.y">条形码粘贴区</tspan>
									</text>
								</g>
								<g v-if="all.markingMissExamination.bol">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.markingMissExamination.rect[0].x" :y="all.markingMissExamination.rect[0].y" :width="all.markingMissExamination.rect[0].w" :height="all.markingMissExamination.rect[0].h" rx="5"></rect>
									<text font-size="13" fill="#f00">
										<tspan :x="all.markingMissExamination.font[0].x" :y="all.markingMissExamination.font[0].y">缺考标记</tspan> 
										<tspan :x="all.markingMissExamination.font[2].x" :y="all.markingMissExamination.font[2].y">填涂示例</tspan>
									</text>
									<rect fill="#212121" :x="all.markingMissExamination.rect[1].x" :y="all.markingMissExamination.rect[1].y" :width="all.markingMissExamination.rect[1].w" :height="all.markingMissExamination.rect[1].h"></rect>
									<rect :x="all.markingMissExamination.font[1].x" :y="all.markingMissExamination.font[1].y-9" :width="all.markingMissExamination.rect[1].w" :height="all.markingMissExamination.rect[1].h" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect>
								</g>
								<g v-if="all.numberFormat.content == 1" @mouseover="numberFormatShow1" @mouseout="numberFormatShow2">
									<rect stroke="#f00" fill="#FFFFFF" :x="all.numberFormat.basic[0].x" :y="all.numberFormat.basic[0].y" :width="all.numberFormat.basic[0].w" :height="all.numberFormat.basic[0].h"></rect>
									<rect fill="#f00" :x="all.numberFormat.basic[1].x" :y="all.numberFormat.basic[1].y" :width="all.numberFormat.basic[1].w" :height="all.numberFormat.basic[1].h"></rect>
									<rect fill="#f00" :x="all.numberFormat.basic[2].x" :y="all.numberFormat.basic[2].y" :width="all.numberFormat.basic[2].w" :height="all.numberFormat.basic[2].h"></rect>
									<text :x="all.numberFormat.basic[3].x" :y="all.numberFormat.basic[3].y" font-size="14" fill="#4A4A4A">考试证号</text>
									<g>
										<rect v-for="(item, index) in all.numberFormat.verticalLine" :key="index" fill="#f00" :x="item.x" :y="item.y" :width="item.w" :height="item.h"></rect>
									</g>
									<g v-for="(item, index) in all.numberFormat.square" :key="index">
										<g v-for="(item1, index) in item" :key="index">
											<rect :x="item1.rectx" :y="item1.recty" :width="item1.rectw" :height="item1.recth" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(256, 0, 0);"></rect>
											<rect v-if="halfFrame" :x="item1.rectx+3" :y="item1.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
											<text font-size="9" line-spacing="8" fill="#212121" :x="item1.fontx" :y="item1.fonty">{{ item1.content }}</text>
										</g>
									</g>
								</g>
								<g v-if="all.numberFormat.content == 1" v-show="btnState.numberFormat.isShow" @mouseover="numberFormatShow1" @mouseout="numberFormatShow2" @click="numberFormatShow">
									<rect class="shou" fill="#00A9F6" :width="btnState.numberFormat.rect.w" :height="btnState.numberFormat.rect.h" rx="2" :x="btnState.numberFormat.rect.x" :y="btnState.numberFormat.rect.y"></rect>
									<text class="shou" font-size="14" fill="#fff" :x="btnState.numberFormat.font.x" :y="btnState.numberFormat.font.y">编辑</text>
								</g>
							</g>
							<rect v-if="rendering.arr1.length>0"  :x="all.rect.x" :y="all.rect.y" stroke="#f00" :width="all.rect.w" :height="all.rect.h" rx="5" stroke-width="2" fill="none" fill-rule="evenodd"></rect>
							<g v-if="rendering.arr1.length>0">
								<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="1015">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
								<g v-for="(item,index) in rendering.arr1" :key="index" >
									<g @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" v-if="item.questionType == '1' || item.questionType == '2' || item.questionType == '4' ">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line v-if="item.topicArea && item.topicArea.rect.x " :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
										<g v-for="(item1,index1) in item.arr" :key="index1" >
											<g v-for="(item2,index2) in item1" :key="index2">
												<text font-size="11" line-spacing="8" fill="#212121" :x="item2.num.x" :y="item2.num.y" :style="all.existVerticalRow?'text-anchor: middle;':'text-anchor: end;'">{{item2.num.content}}</text> 
												<g v-for="(item3,index3) in item2.options" :key="index3">
													<rect :x="item3.rectx" :y="item3.recty" width="16.5" height="10" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect> 
													<rect v-if="halfFrame" :x="item3.rectx+3" :y="item3.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
													<text font-size="9" line-spacing="8" fill="#212121" :x="item3.fontx" :y="item3.fonty">{{item3.content}}</text>
												</g>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol">
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect> 
											<text	@click="delete1(item)" class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" @click="kgtedit(item)" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="84" height="20" :x="item.infor.rect.x+item.infor.rect.w-250" :y="item.infor.rect.y"></rect>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-247" :y="item.infor.rect.y+15">每组题目数</text> 
											<rect fill="#fff" stroke="#00A9F6"    width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-114" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" @click="add(item)" :x="item.infor.rect.x+item.infor.rect.w-108" :y="item.infor.rect.y+17">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y"></rect> 
											<text font-size="16" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-126" :y="item.infor.rect.y+16" style="text-anchor: middle;">{{item.perGroup}}</text>
											<rect fill="#fff" stroke="#00A9F6"   width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-166" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" @click="jian(item)" :x="item.infor.rect.x+item.infor.rect.w-162" :y="item.infor.rect.y+17" >—</text>
										</g>
									</g>
									<g v-if="item.questionType == '3'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line v-if="item.topicArea && item.topicArea.rect.x " :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<text font-size="12"  fill="#4A4A4A" :x="item1.font.x" :y="item1.font.y" >{{item1.content}}</text> 
											<line :x1="item1.rect.x" :y1="item1.rect.y" :x2="item1.rect.x + item1.size" stroke-width="1" :y2="item1.rect.y" stroke="#666"  ></line>
											<g v-if="item.bol1" v-show="item1.content">
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+2" :y="item1.rect.y-22" @click="lineFeed(item,item1)"></rect>
												<use xlink:href="#rowadd" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeed(item,item1)"></use>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+23" :y="item1.rect.y-22" @click="lineFeedNo(item,item1)"></rect>
												<use xlink:href="#rowdown" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeedNo(item,item1)"></use>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+44" :y="item1.rect.y-22"  @click="addchang(item,item1)"></rect>
												<text class="shou" font-size="24" fill="#fff" :x="item1.rect.x+47" :y="item1.rect.y-4" @click="addchang(item,item1)">+</text>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+65" :y="item1.rect.y-22" @click="jianchang(item,item1)"></rect>
												<rect class="shou"  fill="#FFFFFF" :x="item1.rect.x+70" :y="item1.rect.y-12" width="12" height="1.5" @click="jianchang(item,item1)"></rect>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol">
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15" @click="delete1(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15" @click="tktedit(item)">编辑</text>
											<rect  fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-128" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-120" :y="item.infor.rect.y+15" @click="formatAdjustment(item)">调整</text>
										</g>
										<g v-if="item.number" v-show="item.bol1">
											<rect class="shou" @click="formatAdjustment1(item)" fill="#fff" stroke="#fff" width="24" height="24" :x="item.infor.rect.x+item.infor.rect.w-24" :y="item.infor.rect.y-14"></rect>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y-10" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y+6" stroke="#4a4a4a" stroke-width="2"></line>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y+6" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y-10" stroke="#666" stroke-width="2"></line>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-55" :y="item.infor.rect.y-10"></rect>
											<text  class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-50" :y="item.infor.rect.y+6" @click="addLineHeight(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-81" :y="item.infor.rect.y-10"></rect>
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w-68" :y="item.infor.rect.y+6" style="text-anchor: middle;">{{item.lineHeight}}</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-107" :y="item.infor.rect.y-10"></rect> 
											<text  class="shou"  font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-104" :y="item.infor.rect.y+6" @click="reduceLineHeight(item)">—</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y+5">行高</text>
										</g>
									</g>
									<g v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<g v-for="(item2,index2) in item1.arr" :key="index2">
												<rect :x="item2.x" :y="item2.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item2.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<rect :x="item1.x" :y="item1.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item1.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<g v-for="(item2,index2) in item1.num" :key="index2">
												<rect :x="191+index2*50" :y="item1.y+12" stroke="#4A4A4A" width="17" height="10" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
												<text font-size="11" fill="#4A4A4A" :x="185+index2*50" :y="item1.y+21" style="text-anchor: end;">{{item2.content}}</text>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '14'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<line :x1="item1.line.x1" :y1="item1.line.y1" :x2="item1.line.x2" :y2="item1.line.y2" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" stroke-width="1" ></line>
											<text font-size="12" fill="#4A4A4A" :x="item1.num.x" :y="item1.num.y">{{item1.num.content}}.({{item1.score}}分)</text>
											<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi == 'square'">
												<rect :x="item2.x" :y="item2.y" stroke="#4A4A4A" :width="item2.w" :height="item2.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
												<text v-if="item2.i%100 == 0"  font-size="10" fill="#4A4A4A" :x="item2.x+item2.w" :y="item2.y+item2.h+5" style="text-anchor: end;">{{item2.i}}</text>
											</g>
											<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi != 'square'">
												<line :x1="item2.x1" :y1="item2.y1" :x2="item2.x2" :y2="item2.y2" stroke="#666" stroke-width="1"></line>
											</g>
											<g v-show="item.bol">
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-44" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2 -36 "  :y="item1.line.y1+15" @click="delete1(item)"  class="shou">删除</text>
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-88" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2-80" :y="item1.line.y1+15"  class="shou" @click="zwtedit(item)">编辑</text>
												<g v-show="item1.fangshi != 'square'">
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-30" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-24" :y="item1.num.y+36" @click="zwtformat1(item,item1,'加')">+</text>
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-56" :y="item1.num.y+20"></rect> 
													<text  font-size="16" fill="#4a4a4a" :x="item1.line.x2-43" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowNumber}}</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-82" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-79" :y="item1.num.y+36" @click="zwtformat1(item,item1,'减')">—</text>
													<text  font-size="14" fill="#4A4A4A" :x="item1.line.x2-117" :y="item1.num.y+35">行数</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-150" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-144" :y="item1.num.y+36" @click="zwtformat2(item,item1,'加')">+</text>
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-176" :y="item1.num.y+20"></rect> 
													<text font-size="16" fill="#4a4a4a" :x="item1.line.x2-163" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowHeight}}</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-202" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-199" :y="item1.num.y+36" @click="zwtformat2(item,item1,'减')">—</text>
													<text font-size="14" fill="#4A4A4A" :x="item1.line.x2-237" :y="item1.num.y+35">行高</text>
												</g>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '16'" @mouseover="jdumovej(item)" @mouseout="jdumovec(item)">
										<g>
											<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<line :x1="item.infor.rect.x" :y1="item.infor.rect.y" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y+item.infor.rect.h" stroke="#979797" stroke-width="1"></line>
											<line :x1="item.infor.rect.x" :y1="item.infor.rect.y+item.infor.rect.h" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y" stroke="#979797" stroke-width="1"></line>
											<text font-size="24" fill="#4A4A4A" :x="item.infor.rect.w/2-79" :y="9+item.infor.rect.h/2+item.infor.rect.y">禁止在此区域作答</text>
										</g>
										<g v-show="item.bol" >
											<rect @mouseover="jdumovej(item)" fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 44" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 36" :y="item.infor.rect.y+21" @click="deletejdq(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 88" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 80" :y="item.infor.rect.y+21" @click="jdqedit(item)">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 120" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 114" :y="item.infor.rect.y+21" @click="jdqjia(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 146" :y="item.infor.rect.y+5"></rect> 
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w - 133" :y="item.infor.rect.y+21" style="text-anchor: middle;">{{item.rowNumber}}</text> 
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 172" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 169" :y="item.infor.rect.y+21" @click="jdqjian(item)"> —</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w - 207" :y="item.infor.rect.y+20">行数</text>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div class="one" v-if="rendering.arr2.length>0" v-for="(ele,ind) in rendering.arr2" :key="ind">
						<div class="left" :class="{'left_mifen':all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? false:true ):true):false }">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? false:true ):true):false" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 126px;top: 10px;"></div>
							<svg class="svg1" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? false:true ):true):false">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="82" y="100"></use>
								<use xlink:href="#letterline" x="82" y="500"></use>
								<use xlink:href="#letterline" x="82" y="900"></use>
								<g>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
								<g transform="rotate(-90,112,112)">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" x="0" y="0" width="180" height="75" rx="0"></rect>
									<text font-size="16" fill="#f00">
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 2">二维码粘贴区</tspan>
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 3">条形码粘贴区</tspan>
									</text>
								</g>
							</svg>
						</div>
						<div class="right" :class="{'right_mifen':all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? true:false ):false):false}">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? true:false ):false):false" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 7px;top: 10px;"></div>
							<svg class="svg1" :class="{svg11:all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? true:false ):false):false}" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? true:false ):false):false">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="0" y="100"></use>
								<use xlink:href="#letterline" x="0" y="500"></use>
								<use xlink:href="#letterline" x="0" y="900"></use>
								<g transform="translate(30 12)">
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
							</svg>
						</div>
						<div class="content" :class="{'content_mifen':all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? false:true ):true):false,'content_mifen1':all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? true:false ):false):false}">
							<div v-for="(item,index) in ele" :key="index" > 
								<div v-if="!item.isShear" class="posi title1" :style="'width:'+ item.infor.font.w+'px;height:'+item.infor.font.h+'px;top:'+item.infor.font.y+'px;left:'+item.infor.font.x+'px;' " @mouseover="subjectAcross(item)" @mouseout="subjectAway(item)"> 
									<div v-html="item.infor.font.content"  :class="{bord:!item.infor.font.showFlag1}"  @click.stop="subjectEditing(item)"  v-if="item.infor.font.showFlag"  style="overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #f00;"></div>
									<vue-ueditor-wrap :config='myConfig'  v-model="item.infor.font.content" v-if="!item.infor.font.showFlag" style="width:100%;height:100%;margin-top:-36px;"></vue-ueditor-wrap>
									<i  v-show="!item.infor.font.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.infor.font.h-20)+'px;'" @mousedown="drag1($event,item)"></i>
								</div>
								<div v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div v-for="(item2,index2) in item1.arr" :key="index2">
											<div class="posi" :style="'width:'+ item2.w+'px;height:'+ item1.h+'px;top:'+item2.y+'px;left:'+ item2.x+'px;'" >
												<div  class="tu" v-if="item2.img[0].length>0 && !item1.isShear" v-for="(item3,index3) in item2.img[0]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="tu" v-if="item2.img[1].length>0 && item1.isShear" v-for="(item3,index3) in item2.img[1]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="editcogeditoring"  v-html="item2.words[1]" v-if="item1.isShear && item2.bol[1]" @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="editcogeditoring"  v-html="item2.words[0]" v-if="!item1.isShear && item2.bol[0] " @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="operate" v-show="item.bol" v-if="item1.arr.length==1?true:(index2==0?false:true)"> 
													<span  class="posi shou subTopic"  style="right: 187px; top: 1px;" @click="file(item1,item)">插图</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='vertical'}" style="right: 145px; top: -1px;" @click="jdtformat3(item,item1,'竖')">竖排</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='transverse'}" style="right: 100px; top: -1px;"  @click="jdtformat3(item,item1,'横')">横排</span> 
													<span class="posi shou" style="right: 44px; top: -1px;">编辑</span> 
													<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
												</div>
												<i v-if="item1.arr.length==1?true:(index2==0?false:true)"  v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[1]" v-if="item1.isShear && !item2.bol[1]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[0]" v-if="!item1.isShear && !item2.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
											</div>
										</div>
									</div>
								</div>
								<div v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div class="posi" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.y+'px;left:'+ item1.x+'px;'" >
											<div  class="tu" v-if="item1.img[0].length>0 && !item1.isShear" v-for="(item2,index2) in item1.img[0]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'',$event)" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="tu" v-if="item1.img[1].length>0 && item1.isShear" v-for="(item2,index2) in item1.img[1]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'',$event)" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="editcogeditoring"  v-html="item1.words[1]" v-if="item1.isShear && item1.bol[1]" @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="editcogeditoring"  v-html="item1.words[0]" v-if="!item1.isShear && item1.bol[0] " @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="operate" v-show="item.bol" > 
												<span  class="posi shou subTopic"  style="right: 100px; top: 1px;" @click="file(item1,item)">插图</span> 
												<span class="posi shou" style="right: 44px; top: -1px;">编辑</span> 
												<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
											</div>
											<i   v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[1]" v-if="item1.isShear && !item1.bol[1]" style="width:100%;height:100%;margin-top:-32px;" ></vue-ueditor-wrap>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[0]" v-if="!item1.isShear && !item1.bol[0]" style="width:100%;height:100%;margin-top:-32px;" ></vue-ueditor-wrap>
										</div>
									</div>
								</div>
								<div v-if="item.topicArea  &&  (item.questionType == '1' || item.questionType == '2' || item.questionType == '4' )"   @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" @click.stop>
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0 && !item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="tu" v-if="item.topicArea.img[1].length>0 && item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[1]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item,item.topicArea.isShear)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-if="!item.topicArea.isShear && !item.topicArea.bol[0]"  v-model="item.topicArea.words[0]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
										<vue-ueditor-wrap :config='myConfig'  v-if="item.topicArea.isShear && !item.topicArea.bol[1]"  v-model="item.topicArea.words[1]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
								<div v-if="item.topicArea && item.questionType == '3'"   @mouseover="tktmovej(item)" @mouseout="tktmovec(item)" @click.stop>
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0 && !item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="tu" v-if="item.topicArea.img[1].length>0 && item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[1]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item,item.topicArea.isShear)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-if="!item.topicArea.isShear && !item.topicArea.bol[0]"  v-model="item.topicArea.words[0]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
										<vue-ueditor-wrap :config='myConfig'  v-if="item.topicArea.isShear && !item.topicArea.bol[1]"  v-model="item.topicArea.words[1]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
							</div>
							<div class="page-info-show" v-if="!all.pottedLine  &&   all.printFormat==0  &&  all.showPageInfo" >班级<span></span>姓名<span></span></div>
							<div class="foot-page">第{{ind+2}}页</div>
						</div>
						<svg class="svg2" :class="{'svg2_mifen':all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? false:true ):true):false,'svg2_mifen1':all.pottedLine?(all.printFormat==0?(ind%2 == 0 ? true:false ):false):false}" height="1072" version="1.1">
							<defs>
								<g id="rowdown">
									<path d="M26,14.9500205 L39,14.9500205 L39,16 L26,16 L26,14.9500205 Z M26,10.2999795 L36,10.2999795 L36,11.349959 L26,11.349959 L26,10.2999795 Z M26,6.09997949 L31,6.09997949 L31,7.15004102 L26,7.15004102 L26,6.09997949 Z M37.9285041,11.349959 L37.9285041,7.15004102 L34.713912,7.15004102 L34.713912,9.24999999 L31.4993198,6.62500001 L34.713912,4 L34.713912,6.09995899 L39,6.09995899 L39,11.349959 L37.9285041,11.349959 Z" id="" fill="#FFFFFF"></path>
								</g> 
								<g id="rowadd">
									<path d="M4,5 L17,5 L17,6.13333333 L4,6.13333333 L4,5 Z M4,9.06666667 L14,9.06666667 L14,10.2 L4,10.2 L4,9.06666667 Z M4,13.6 L9,13.6 L9,14.7333333 L4,14.7333333 L4,13.6 Z M15.9285714,9.06666667 L17,9.06666667 L17,13.6 L17,14.7333333 L15.9285714,14.7333333 L12.7142857,14.7333333 L12.7142857,17 L9.5,14.1666667 L12.7142857,11.3333333 L12.7142857,13.6 L15.9285714,13.6 L15.9285714,9.06666667 Z" id="Combined-Shape" fill="#FFFFFF"></path>
								</g>
							</defs>
							<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="25">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
							<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="1015">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
							<rect x="11" y="10" stroke="#f00" :width="all.pottedLine?'597':'693'" height="1011" rx="5" stroke-width="2" fill="none" fill-rule="evenodd"></rect>
							<g v-for="(item,index) in ele" :key="index" >
								<g @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" v-if="item.questionType == '1' || item.questionType == '2' || item.questionType == '4' ">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<line v-if="item.topicArea" :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
									<g v-if="!item.topicArea || !item.topicArea.isShear">
										<g v-for="(item1,index1) in item.arr" :key="index1" >
											<g v-for="(item2,index2) in item1" :key="index2">
												<text font-size="11" line-spacing="8" fill="#212121" :x="item2.num.x" :y="item2.num.y" :style="all.existVerticalRow?'text-anchor: middle;':'text-anchor: end;'">{{item2.num.content}}</text> 
												<g v-for="(item3,index3) in item2.options" :key="index3">
													<rect :x="item3.rectx" :y="item3.recty" width="16.5" height="10" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect> 
													<rect v-if="halfFrame" :x="item3.rectx+3" :y="item3.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
													<text font-size="9" line-spacing="8" fill="#212121" :x="item3.fontx" :y="item3.fonty">{{item3.content}}</text>
												</g>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol" >
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect> 
											<text	@click="delete1(item)" class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" @click="kgtedit(item)" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="84" height="20" :x="item.infor.rect.x+item.infor.rect.w-250" :y="item.infor.rect.y"></rect>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-247" :y="item.infor.rect.y+15">每组题目数</text> 
											<rect fill="#fff" stroke="#00A9F6"    width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-114" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" @click="add(item)" :x="item.infor.rect.x+item.infor.rect.w-108" :y="item.infor.rect.y+17">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y"></rect> 
											<text font-size="16" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-126" :y="item.infor.rect.y+16" style="text-anchor: middle;">{{item.perGroup}}</text>
											<rect fill="#fff" stroke="#00A9F6"   width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-166" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" @click="jian(item)" :x="item.infor.rect.x+item.infor.rect.w-162" :y="item.infor.rect.y+17" >—</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '3'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<text font-size="12"  fill="#4A4A4A" :x="item1.font.x" :y="item1.font.y" >{{item1.content}}</text> 
										<line :x1="item1.rect.x" :y1="item1.rect.y" :x2="item1.rect.x + item1.size" stroke-width="1" :y2="item1.rect.y" stroke="#666"  ></line>
										<g v-if="item.bol1" v-show="item1.content">
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+2" :y="item1.rect.y-22" @click="lineFeed(item,item1)"></rect>
											<use xlink:href="#rowadd" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeed(item,item1)"></use>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+23" :y="item1.rect.y-22" @click="lineFeedNo(item,item1)"></rect>
											<use xlink:href="#rowdown" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeedNo(item,item1)"></use>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+44" :y="item1.rect.y-22"  @click="addchang(item,item1)"></rect>
											<text class="shou" font-size="24" fill="#fff" :x="item1.rect.x+47" :y="item1.rect.y-4" @click="addchang(item,item1)">+</text>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+65" :y="item1.rect.y-22" @click="jianchang(item,item1)"></rect>
											<rect class="shou"  fill="#FFFFFF" :x="item1.rect.x+70" :y="item1.rect.y-12" width="12" height="1.5" @click="jianchang(item,item1)"></rect>
										</g>
									</g>
									<g v-if="!item.topicArea || !item.topicArea.isShear">
										<g v-if="item.number" v-show="item.bol" >
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15" @click="delete1(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15" @click="tktedit(item)">编辑</text>
											<rect  fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-128" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-120" :y="item.infor.rect.y+15" @click="formatAdjustment(item)">调整</text>
										</g>
										<g v-if="item.number" v-show="item.bol1">
											<rect class="shou" @click="formatAdjustment1(item)" fill="#fff" stroke="#fff" width="24" height="24" :x="item.infor.rect.x+item.infor.rect.w-24" :y="item.infor.rect.y-14"></rect>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y-10" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y+6" stroke="#4a4a4a" stroke-width="2"></line>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y+6" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y-10" stroke="#666" stroke-width="2"></line>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-55" :y="item.infor.rect.y-10"></rect>
											<text  class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-50" :y="item.infor.rect.y+6" @click="addLineHeight(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-81" :y="item.infor.rect.y-10"></rect>
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w-68" :y="item.infor.rect.y+6" style="text-anchor: middle;">{{item.lineHeight}}</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-107" :y="item.infor.rect.y-10"></rect> 
											<text  class="shou"  font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-104" :y="item.infor.rect.y+6" @click="reduceLineHeight(item)">—</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y+5">行高</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<g v-for="(item2,index2) in item1.arr" :key="index2">
											<rect :x="item2.x" :y="item2.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item2.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<rect :x="item1.x" :y="item1.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item1.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item2,index2) in item1.num" :key="index2" v-if="!item1.isShear">
											<rect :x="191+index2*50" :y="item1.y+12" stroke="#4A4A4A" width="17" height="10" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<text font-size="11" fill="#4A4A4A" :x="185+index2*50" :y="item1.y+21" style="text-anchor: end;">{{item2.content}}</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '14'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<line :x1="item1.line.x1" :y1="item1.line.y1" :x2="item1.line.x2" :y2="item1.line.y2" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" stroke-width="1" ></line>
										<text v-if="!item1.isShear" font-size="12" fill="#4A4A4A" :x="item1.num.x" :y="item1.num.y">{{item1.num.content}}.({{item1.score}}分)</text>
										<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi == 'square'">
											<rect :x="item2.x" :y="item2.y" stroke="#4A4A4A" :width="item2.w" :height="item2.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<text v-if="item2.i%100 == 0"  font-size="10" fill="#4A4A4A" :x="item2.x+item2.w" :y="item2.y+item2.h+5" style="text-anchor: end;">{{item2.i}}</text>
										</g>
										<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi != 'square'">
											<line :x1="item2.x1" :y1="item2.y1" :x2="item2.x2" :y2="item2.y2" stroke="#666" stroke-width="1"></line>
										</g>
										<g v-show="item.bol">
											<g v-if="item1.fangshi == 'square'?true:(item1.isShear?false:true)">
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-44" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2 -36 "  :y="item1.line.y1+15" @click="delete1(item)"  class="shou">删除</text>
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-88" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2-80" :y="item1.line.y1+15"  class="shou" @click="zwtedit(item)">编辑</text>
											</g>
											<g v-show="item1.fangshi != 'square'">
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-30" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-24" :y="item1.num.y+36" @click="zwtformat1(item,item1,'加')">+</text>
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-56" :y="item1.num.y+20"></rect> 
												<text  font-size="16" fill="#4a4a4a" :x="item1.line.x2-43" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowNumber}}</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-82" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-79" :y="item1.num.y+36" @click="zwtformat1(item,item1,'减')">—</text>
												<text  font-size="14" fill="#4A4A4A" :x="item1.line.x2-117" :y="item1.num.y+35">行数</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-150" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-144" :y="item1.num.y+36" @click="zwtformat2(item,item1,'加')">+</text>
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-176" :y="item1.num.y+20"></rect> 
												<text font-size="16" fill="#4a4a4a" :x="item1.line.x2-163" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowHeight}}</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-202" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-199" :y="item1.num.y+36" @click="zwtformat2(item,item1,'减')">—</text>
												<text font-size="14" fill="#4A4A4A" :x="item1.line.x2-237" :y="item1.num.y+35">行高</text>
											</g>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '16'" @mouseover="jdumovej(item)" @mouseout="jdumovec(item)">
									<g>
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line :x1="item.infor.rect.x" :y1="item.infor.rect.y" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y+item.infor.rect.h" stroke="#979797" stroke-width="1"></line>
										<line :x1="item.infor.rect.x" :y1="item.infor.rect.y+item.infor.rect.h" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y" stroke="#979797" stroke-width="1"></line>
										<text font-size="24" fill="#4A4A4A" x="257.5" :y="9+item.infor.rect.h/2+item.infor.rect.y">禁止在此区域作答</text>
									</g>
									<g v-show="item.bol" >
										<rect @mouseover="jdumovej(item)" fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 44" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 36" :y="item.infor.rect.y+21" @click="deletejdq(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 88" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 80" :y="item.infor.rect.y+21" @click="jdqedit(item)">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 120" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 114" :y="item.infor.rect.y+21" @click="jdqjia(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 146" :y="item.infor.rect.y+5"></rect> 
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w - 133" :y="item.infor.rect.y+21" style="text-anchor: middle;">{{item.rowNumber}}</text> 
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 172" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 169" :y="item.infor.rect.y+21" @click="jdqjian(item)"> —</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w - 207" :y="item.infor.rect.y+20">行数</text>
									</g>
								</g>
							</g>
						</svg>
					</div>
				</div>
				<div class="lianglan"   v-if="all.scantronFormat == 2" :class="{prohibit:all.hasSaved==1}">
					<div class="two"  :class="{two1:all.pottedLine}">
						<div style="width: 9px;height: 10px;position: absolute;right: 0;top: 20px;background: #333;"></div>
						<div style="width: 9px;height: 10px;position: absolute;right: 0;bottom: 20px;background: #333;"></div>
						<div class="left" :class="{'left_mifen':all.pottedLine }">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 126px;top: 10px;"></div>
							<svg class="svg1" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="82" y="100"></use>
								<use xlink:href="#letterline" x="82" y="500"></use>
								<use xlink:href="#letterline" x="82" y="900"></use>
								<g v-if="all.markingMissExamination.bol">
									<g>
										<rect stroke="#4A4A4A" fill="#FFFFFF" x="0" y="940" width="55" height="49"></rect>
										<text font-size="13" fill="#f00"><tspan x="30" y="957" text-anchor="middle">缺考</tspan></text>
										<rect stroke="none" fill="#4A4A4A" x="0" y="964" width="55" height="1"></rect>
										<rect stroke="#4A4A4A" fill="#FFFFFF" x="20" y="972" width="17" height="10"></rect>
									</g>
								</g>
								<g>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
								<g transform="rotate(-90,112,112)">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" x="0" y="0" width="180" height="75" rx="0"></rect>
									<text font-size="16" fill="#f00">
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 2">二维码粘贴区</tspan>
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 3">条形码粘贴区</tspan>
									</text>
								</g>
							</svg>
						</div>
						<div class="content" :class="{'content_mifen1':all.pottedLine}" @click.stop>
							<div class="textMessage"  :style="'width:'+ all.textMessage.w+'px;height:'+all.textMessage.h+'px;'" @mouseover="headingAcross" @mouseout="headingAway"  @click.stop>
								<div v-html="all.textMessage.content" v-if="all.textMessage.showFlag" @click.stop="titleEditing" style="padding: 4px 8px 0 ;overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #f00;"></div>
								<vue-ueditor-wrap :config='myConfig'  v-model="all.textMessage.content" v-if="!all.textMessage.showFlag" style="width:100%;height:100%;margin-top:-36px;"></vue-ueditor-wrap>
								<i  v-show="!all.textMessage.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(all.textMessage.h-20)+'px;'" @mousedown="drag($event)"></i>
							</div>
							<div v-for="(item,index) in rendering.arr1" :key="index">
								<div class="posi title1" v-if="item.questionType != '16'" :style="'width:'+ item.infor.font.w+'px;height:'+item.infor.font.h+'px;top:'+item.infor.font.y+'px;left:'+item.infor.font.x+'px;' " @mouseover="subjectAcross(item)" @mouseout="subjectAway(item)"> 
									<div v-html="item.infor.font.content"  :class="{bord:!item.infor.font.showFlag1}"  @click.stop="subjectEditing(item)"  v-if="item.infor.font.showFlag"  style="overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #f00;"></div>
									<vue-ueditor-wrap :config='myConfig'  v-model="item.infor.font.content" v-if="!item.infor.font.showFlag" style="width:100%;height:100%;margin-top:-36px;"></vue-ueditor-wrap>
									<i  v-show="!item.infor.font.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.infor.font.h-20)+'px;'" @mousedown="drag1($event,item)"></i>
								</div>
								<div v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div v-for="(item2,index2) in item1.arr" :key="index2">
											<div class="posi" :style="'width:'+ item2.w+'px;height:'+ item1.h+'px;top:'+item2.y+'px;left:'+ item2.x+'px;'" >
												<div class="tu" v-if="item2.img[0].length>0" v-for="(item3,index3) in item2.img[0]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="editcogeditoring"  v-html="item2.words[0]" v-if="item2.bol[0] " @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="operate" v-show="item.bol" v-if="item1.arr.length==1?true:(index2==0?false:true)"> 
													<span  class="posi shou subTopic"  style="right: 187px; top: 1px;" @click="file(item1,item)">插图</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='vertical'}" style="right: 145px; top: -1px;" @click="jdtformat3(item,item1,'竖')">竖排</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='transverse'}" style="right: 100px; top: -1px;"  @click="jdtformat3(item,item1,'横')">横排</span> 
													<span class="posi shou" style="right: 44px; top: -1px;" @click="jdtedit(item)">编辑</span> 
													<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
												</div>
												<i v-if="item1.arr.length==1?true:(index2==0?false:true)"  v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[0]" v-if="!item2.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
											</div>
										</div>
									</div>
								</div>
								<div v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div class="posi" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.y+'px;left:'+ item1.x+'px;'" >
											<div class="tu" v-if="item1.img[0].length>0" v-for="(item2,index2) in item1.img[0]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'')" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="editcogeditoring"  v-html="item1.words[0]" v-if="item1.bol[0] " @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="operate" v-show="item.bol" > 
												<span  class="posi shou subTopic"  style="right: 100px; top: 1px;" @click="file(item1,item)">插图</span> 
												<span class="posi shou" style="right: 44px; top: -1px;" @click="jdtedit(item)">编辑</span> 
												<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
											</div>
											<i v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[0]" v-if="!item1.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
										</div>
									</div>
								</div>
								<div v-if="item.topicArea &&  item.topicArea.rect.x != '' &&  (item.questionType == '1' || item.questionType == '2' || item.questionType == '4' )"   @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)">
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-model="item.topicArea.words[0]" v-if="item.topicArea.isShear?!item.topicArea.bol[1]:!item.topicArea.bol[0]" style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
								<div v-if="item.topicArea &&  item.topicArea.rect.x != '' && item.questionType == '3'"   @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-model="item.topicArea.words[0]" v-if="item.topicArea.isShear?!item.topicArea.bol[1]:!item.topicArea.bol[0]" style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
							</div>
							<div class="foot-page">第1页-1</div>
						</div>
						<svg class="svg2" :class="{'svg2_mifen1':all.pottedLine}" height="1072" version="1.1">
							<defs>
								<g id="rowdown">
									<path d="M26,14.9500205 L39,14.9500205 L39,16 L26,16 L26,14.9500205 Z M26,10.2999795 L36,10.2999795 L36,11.349959 L26,11.349959 L26,10.2999795 Z M26,6.09997949 L31,6.09997949 L31,7.15004102 L26,7.15004102 L26,6.09997949 Z M37.9285041,11.349959 L37.9285041,7.15004102 L34.713912,7.15004102 L34.713912,9.24999999 L31.4993198,6.62500001 L34.713912,4 L34.713912,6.09995899 L39,6.09995899 L39,11.349959 L37.9285041,11.349959 Z" id="" fill="#FFFFFF"></path>
								</g> 
								<g id="rowadd">
									<path d="M4,5 L17,5 L17,6.13333333 L4,6.13333333 L4,5 Z M4,9.06666667 L14,9.06666667 L14,10.2 L4,10.2 L4,9.06666667 Z M4,13.6 L9,13.6 L9,14.7333333 L4,14.7333333 L4,13.6 Z M15.9285714,9.06666667 L17,9.06666667 L17,13.6 L17,14.7333333 L15.9285714,14.7333333 L12.7142857,14.7333333 L12.7142857,17 L9.5,14.1666667 L12.7142857,11.3333333 L12.7142857,13.6 L15.9285714,13.6 L15.9285714,9.06666667 Z" id="Combined-Shape" fill="#FFFFFF"></path>
								</g>
							</defs>
							<g v-if="all.pottedLine && all.existAttentionMatters.bol">
								<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
								<text font-size="11" fill="#f00">
									<tspan :x="all.existAttentionMatters.font[0].x" :y="all.existAttentionMatters.font[0].y">1. 答题前请将姓名、班级、考场、座位号和准考证号填写清楚。</tspan>
									<tspan :x="all.existAttentionMatters.font[1].x" :y="all.existAttentionMatters.font[1].y">2. 客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。</tspan>
									<tspan :x="all.existAttentionMatters.font[2].x" :y="all.existAttentionMatters.font[2].y">3. 主观题必须使用黑色签字笔书写。</tspan>
									<tspan :x="all.existAttentionMatters.font[3].x" :y="all.existAttentionMatters.font[3].y">4. 必须在题号对应的答题区域内作答,超出答题区域书写无效。</tspan>
									<tspan :x="all.existAttentionMatters.font[4].x" :y="all.existAttentionMatters.font[4].y">5. 保持答卷清洁完整。</tspan>
								</text>
							</g>
							<g v-if="!all.pottedLine">
								<g v-if="all.existAttentionMatters.bol">
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<g v-for="(item, index) in all.basicInfor" :key="index">
											<text font-size="13" :x="item.font[0].x" :y="item.font[0].y">{{ item.name }}</text>
											<rect fill="#f00" :x="item.rectangle.x" :y="item.rectangle.y" :width="item.rectangle.w" :height="item.rectangle.h" />
										</g>
									</g>
									<g class="basicInforShow" v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" :x="btnState.basicInfor.font.x" :y="btnState.basicInfor.font.y" />
										<text class="shou" font-size="14" fill="#fff" :x="btnState.basicInfor.rectangle.x" :y="btnState.basicInfor.rectangle.y">编辑</text>
									</g>
									<g>
										<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
										<text font-size="11" fill="#f00">
											<tspan :x="all.existAttentionMatters.font[0].x" :y="all.existAttentionMatters.font[0].y">1. 答题前请将姓名、班级、考场、座位号和准考证号填写清楚。</tspan>
											<tspan :x="all.existAttentionMatters.font[1].x" :y="all.existAttentionMatters.font[1].y">2. 客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。</tspan>
											<tspan :x="all.existAttentionMatters.font[2].x" :y="all.existAttentionMatters.font[2].y">3. 主观题必须使用黑色签字笔书写。</tspan>
											<tspan :x="all.existAttentionMatters.font[3].x" :y="all.existAttentionMatters.font[3].y">4. 必须在题号对应的答题区域内作答,超出答题区域书写无效。</tspan>
											<tspan :x="all.existAttentionMatters.font[4].x" :y="all.existAttentionMatters.font[4].y">5. 保持答卷清洁完整。</tspan>
										</text>
									</g>
								</g>
								<g v-if="!all.existAttentionMatters.bol" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<g v-for="(item, index) in all.basicInfor" :key="index">
											<text font-size="13" :x="item.font[0].x" :y="item.font[0].y">{{ item.name }}</text>
											<rect fill="#f00" :x="item.rectangle.x" :y="item.rectangle.y" :width="item.rectangle.w" :height="item.rectangle.h" />
										</g>
									</g>
									<g class="basicInforShow" v-show="btnState.basicInfor.isShow" @click="basicInforShow">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" :x="btnState.basicInfor.font.x" :y="btnState.basicInfor.font.y" />
										<text class="shou" font-size="14" fill="#fff" :x="btnState.basicInfor.rectangle.x" :y="btnState.basicInfor.rectangle.y">编辑</text>
									</g>
								</g>
								<g v-if="all.numberFormat.content == 2 || all.numberFormat.content == 3">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" :x="all.numberFormat.rect.x" :y="all.numberFormat.rect.y" :width="all.numberFormat.rect.w" :height="all.numberFormat.rect.h" rx="5"></rect>
									<text font-size="16" fill="#f00">
										<tspan v-if="all.numberFormat.content == 2" :x="all.numberFormat.font.x" :y="all.numberFormat.font.y">二维码粘贴区</tspan>
										<tspan v-if="all.numberFormat.content == 3" :x="all.numberFormat.font.x" :y="all.numberFormat.font.y">条形码粘贴区</tspan>
									</text>
								</g>
								<g v-if="all.markingMissExamination.bol">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.markingMissExamination.rect[0].x" :y="all.markingMissExamination.rect[0].y" :width="all.markingMissExamination.rect[0].w" :height="all.markingMissExamination.rect[0].h" rx="5"></rect>
									<text font-size="13" fill="#f00">
										<tspan :x="all.markingMissExamination.font[0].x" :y="all.markingMissExamination.font[0].y">缺考标记</tspan> 
										<tspan :x="all.markingMissExamination.font[2].x" :y="all.markingMissExamination.font[2].y">填涂示例</tspan>
									</text>
									<rect fill="#212121" :x="all.markingMissExamination.rect[1].x" :y="all.markingMissExamination.rect[1].y" :width="all.markingMissExamination.rect[1].w" :height="all.markingMissExamination.rect[1].h"></rect>
									<rect :x="all.markingMissExamination.font[1].x" :y="all.markingMissExamination.font[1].y-9" :width="all.markingMissExamination.rect[1].w" :height="all.markingMissExamination.rect[1].h" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect>
								</g>
								<g v-if="all.numberFormat.content == 1" @mouseover="numberFormatShow1" @mouseout="numberFormatShow2">
									<rect stroke="#f00" fill="#FFFFFF" :x="all.numberFormat.basic[0].x" :y="all.numberFormat.basic[0].y" :width="all.numberFormat.basic[0].w" :height="all.numberFormat.basic[0].h"></rect>
									<rect fill="#f00" :x="all.numberFormat.basic[1].x" :y="all.numberFormat.basic[1].y" :width="all.numberFormat.basic[1].w" :height="all.numberFormat.basic[1].h"></rect>
									<rect fill="#f00" :x="all.numberFormat.basic[2].x" :y="all.numberFormat.basic[2].y" :width="all.numberFormat.basic[2].w" :height="all.numberFormat.basic[2].h"></rect>
									<text :x="all.numberFormat.basic[3].x" :y="all.numberFormat.basic[3].y" font-size="14" fill="#4A4A4A">考试证号</text>
									<g>
										<rect v-for="(item, index) in all.numberFormat.verticalLine" :key="index" fill="#f00" :x="item.x" :y="item.y" :width="item.w" :height="item.h"></rect>
									</g>
									<g v-for="(item, index) in all.numberFormat.square" :key="index">
										<g v-for="(item1, index) in item" :key="index">
											<rect :x="item1.rectx" :y="item1.recty" :width="item1.rectw" :height="item1.recth" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(256, 0, 0);"></rect>
											<rect v-if="halfFrame" :x="item1.rectx+3" :y="item1.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
											<text font-size="9" line-spacing="8" fill="#212121" :x="item1.fontx" :y="item1.fonty">{{ item1.content }}</text>
										</g>
									</g>
								</g>
								<g v-if="all.numberFormat.content == 1" v-show="btnState.numberFormat.isShow" @mouseover="numberFormatShow1" @mouseout="numberFormatShow2" @click="numberFormatShow">
									<rect class="shou" fill="#00A9F6" :width="btnState.numberFormat.rect.w" :height="btnState.numberFormat.rect.h" rx="2" :x="btnState.numberFormat.rect.x" :y="btnState.numberFormat.rect.y"></rect>
									<text class="shou" font-size="14" fill="#fff" :x="btnState.numberFormat.font.x" :y="btnState.numberFormat.font.y">编辑</text>
								</g>
							</g>
							<rect v-if="rendering.arr1.length>0"  :x="all.rect.x" :y="all.rect.y" stroke="#f00" :width="all.rect.w" :height="all.rect.h" rx="5" stroke-width="2" fill="none" fill-rule="evenodd"></rect>

							<g v-if="rendering.arr1.length>0">
								<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="1015">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
								<g v-for="(item,index) in rendering.arr1" :key="index" >
									<g @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" v-if="item.questionType == '1' || item.questionType == '2' || item.questionType == '4' ">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line v-if="item.topicArea && item.topicArea.rect.x " :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
										<g v-for="(item1,index1) in item.arr" :key="index1" >
											<g v-for="(item2,index2) in item1" :key="index2">
												<text font-size="11" line-spacing="8" fill="#212121" :x="item2.num.x" :y="item2.num.y" :style="all.existVerticalRow?'text-anchor: middle;':'text-anchor: end;'">{{item2.num.content}}</text> 
												<g v-for="(item3,index3) in item2.options" :key="index3">
													<rect :x="item3.rectx" :y="item3.recty" width="16.5" height="10" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect> 
													<rect v-if="halfFrame" :x="item3.rectx+3" :y="item3.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
													<text font-size="9" line-spacing="8" fill="#212121" :x="item3.fontx" :y="item3.fonty">{{item3.content}}</text>
												</g>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol">
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect> 
											<text	@click="delete1(item)" class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" @click="kgtedit(item)" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="84" height="20" :x="item.infor.rect.x+item.infor.rect.w-250" :y="item.infor.rect.y"></rect>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-247" :y="item.infor.rect.y+15">每组题目数</text> 
											<rect fill="#fff" stroke="#00A9F6"    width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-114" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" @click="add(item)" :x="item.infor.rect.x+item.infor.rect.w-108" :y="item.infor.rect.y+17">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y"></rect> 
											<text font-size="16" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-126" :y="item.infor.rect.y+16" style="text-anchor: middle;">{{item.perGroup}}</text>
											<rect fill="#fff" stroke="#00A9F6"   width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-166" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" @click="jian(item)" :x="item.infor.rect.x+item.infor.rect.w-162" :y="item.infor.rect.y+17" >—</text>
										</g>
									</g>
									<g v-if="item.questionType == '3'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line v-if="item.topicArea && item.topicArea.rect.x " :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<text font-size="12"  fill="#4A4A4A" :x="item1.font.x" :y="item1.font.y" >{{item1.content}}</text> 
											<line :x1="item1.rect.x" :y1="item1.rect.y" :x2="item1.rect.x + item1.size" stroke-width="1" :y2="item1.rect.y" stroke="#666"  ></line>
											<g v-if="item.bol1" v-show="item1.content">
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+2" :y="item1.rect.y-22" @click="lineFeed(item,item1)"></rect>
												<use xlink:href="#rowadd" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeed(item,item1)"></use>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+23" :y="item1.rect.y-22" @click="lineFeedNo(item,item1)"></rect>
												<use xlink:href="#rowdown" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeedNo(item,item1)"></use>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+44" :y="item1.rect.y-22"  @click="addchang(item,item1)"></rect>
												<text class="shou" font-size="24" fill="#fff" :x="item1.rect.x+47" :y="item1.rect.y-4" @click="addchang(item,item1)">+</text>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+65" :y="item1.rect.y-22" @click="jianchang(item,item1)"></rect>
												<rect class="shou"  fill="#FFFFFF" :x="item1.rect.x+70" :y="item1.rect.y-12" width="12" height="1.5" @click="jianchang(item,item1)"></rect>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol">
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15" @click="delete1(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15" @click="tktedit(item)">编辑</text>
											<rect  fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-128" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-120" :y="item.infor.rect.y+15" @click="formatAdjustment(item)">调整</text>
										</g>
										<g v-if="item.number" v-show="item.bol1">
											<rect class="shou" @click="formatAdjustment1(item)" fill="#fff" stroke="#fff" width="24" height="24" :x="item.infor.rect.x+item.infor.rect.w-24" :y="item.infor.rect.y-14"></rect>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y-10" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y+6" stroke="#4a4a4a" stroke-width="2"></line>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y+6" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y-10" stroke="#666" stroke-width="2"></line>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-55" :y="item.infor.rect.y-10"></rect>
											<text  class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-50" :y="item.infor.rect.y+6" @click="addLineHeight(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-81" :y="item.infor.rect.y-10"></rect>
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w-68" :y="item.infor.rect.y+6" style="text-anchor: middle;">{{item.lineHeight}}</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-107" :y="item.infor.rect.y-10"></rect> 
											<text  class="shou"  font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-104" :y="item.infor.rect.y+6" @click="reduceLineHeight(item)">—</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y+5">行高</text>
										</g>
									</g>
									<g v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<g v-for="(item2,index2) in item1.arr" :key="index2">
												<rect :x="item2.x" :y="item2.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item2.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<rect :x="item1.x" :y="item1.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item1.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<g v-for="(item2,index2) in item1.num" :key="index2">
												<rect :x="191+index2*50" :y="item1.y+12" stroke="#4A4A4A" width="17" height="10" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
												<text font-size="11" fill="#4A4A4A" :x="185+index2*50" :y="item1.y+21" style="text-anchor: end;">{{item2.content}}</text>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '14'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<line :x1="item1.line.x1" :y1="item1.line.y1" :x2="item1.line.x2" :y2="item1.line.y2" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" stroke-width="1" ></line>
											<text font-size="12" fill="#4A4A4A" :x="item1.num.x" :y="item1.num.y">{{item1.num.content}}.({{item1.score}}分)</text>
											<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi == 'square'">
												<rect :x="item2.x" :y="item2.y" stroke="#4A4A4A" :width="item2.w" :height="item2.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
												<text v-if="item2.i%100 == 0"  font-size="10" fill="#4A4A4A" :x="item2.x+item2.w" :y="item2.y+item2.h+5" style="text-anchor: end;">{{item2.i}}</text>
											</g>
											<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi != 'square'">
												<line :x1="item2.x1" :y1="item2.y1" :x2="item2.x2" :y2="item2.y2" stroke="#666" stroke-width="1"></line>
											</g>
											<g v-show="item.bol">
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-44" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2 -36 "  :y="item1.line.y1+15" @click="delete1(item)"  class="shou">删除</text>
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-88" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2-80" :y="item1.line.y1+15"  class="shou" @click="zwtedit(item)">编辑</text>
												<g v-show="item1.fangshi != 'square'">
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-30" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-24" :y="item1.num.y+36" @click="zwtformat1(item,item1,'加')">+</text>
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-56" :y="item1.num.y+20"></rect> 
													<text  font-size="16" fill="#4a4a4a" :x="item1.line.x2-43" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowNumber}}</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-82" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-79" :y="item1.num.y+36" @click="zwtformat1(item,item1,'减')">—</text>
													<text  font-size="14" fill="#4A4A4A" :x="item1.line.x2-117" :y="item1.num.y+35">行数</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-150" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-144" :y="item1.num.y+36" @click="zwtformat2(item,item1,'加')">+</text>
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-176" :y="item1.num.y+20"></rect> 
													<text font-size="16" fill="#4a4a4a" :x="item1.line.x2-163" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowHeight}}</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-202" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-199" :y="item1.num.y+36" @click="zwtformat2(item,item1,'减')">—</text>
													<text font-size="14" fill="#4A4A4A" :x="item1.line.x2-237" :y="item1.num.y+35">行高</text>
												</g>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '16'" @mouseover="jdumovej(item)" @mouseout="jdumovec(item)">
										<g>
											<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<line :x1="item.infor.rect.x" :y1="item.infor.rect.y" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y+item.infor.rect.h" stroke="#979797" stroke-width="1"></line>
											<line :x1="item.infor.rect.x" :y1="item.infor.rect.y+item.infor.rect.h" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y" stroke="#979797" stroke-width="1"></line>
											<text font-size="24" fill="#4A4A4A" :x="item.infor.rect.w/2-79" :y="9+item.infor.rect.h/2+item.infor.rect.y">禁止在此区域作答</text>
										</g>
										<g v-show="item.bol" >
											<rect @mouseover="jdumovej(item)" fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 44" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 36" :y="item.infor.rect.y+21" @click="deletejdq(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 88" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 80" :y="item.infor.rect.y+21" @click="jdqedit(item)">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 120" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 114" :y="item.infor.rect.y+21" @click="jdqjia(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 146" :y="item.infor.rect.y+5"></rect> 
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w - 133" :y="item.infor.rect.y+21" style="text-anchor: middle;">{{item.rowNumber}}</text> 
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 172" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 169" :y="item.infor.rect.y+21" @click="jdqjian(item)"> —</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w - 207" :y="item.infor.rect.y+20">行数</text>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div class="two" :class="{two1:all.pottedLine?(all.printFormat==0?((ind%4 == 2 || ind%4 == 3)? true:false):(ind%2==1?true:false)):false,two2:all.pottedLine?(all.printFormat==0?((ind%4 == 0 ||ind%4 == 1)? true:false):(ind%2==0?true:false)) :false}" v-if="rendering.arr2.length>0" v-for="(ele,ind) in rendering.arr2" :key="ind">
						<div v-if="ind%2==1" style="width: 9px;height: 10px;position: absolute;right: 0;top: 20px;background: #333;"></div>
						<div v-if="ind%2==1" style="width: 9px;height: 10px;position: absolute;right: 0;bottom: 20px;background: #333;"></div>
						<div v-if="ind%2==0" style="width: 9px;height: 10px;position: absolute;left: 0;top: 20px;background: #333;"></div>
						<div v-if="ind%2==0" style="width: 9px;height: 10px;position: absolute;left: 0;bottom: 20px;background: #333;"></div>
						<div class="left" :class="{'left_mifen':all.pottedLine?(all.printFormat==0?(ind%4 == 3 ? true:false ):(ind%2 == 1 ? true:false )):false }"  v-if="ind%2 != 0">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine?(all.printFormat==0?(ind%4 == 3 ? true:false ):(ind%2 == 1 ? true:false )):false " style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 126px;top: 10px;"></div>
							<svg class="svg1" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine?(all.printFormat==0?(ind%4 == 3 ? true:false ):(ind%2 == 1 ? true:false )):false ">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="82" y="100"></use>
								<use xlink:href="#letterline" x="82" y="500"></use>
								<use xlink:href="#letterline" x="82" y="900"></use>
								<g>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
								<g transform="rotate(-90,112,112)">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" x="0" y="0" width="180" height="75" rx="0"></rect>
									<text font-size="16" fill="#f00">
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 2">二维码粘贴区</tspan>
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 3">条形码粘贴区</tspan>
									</text>
								</g>
							</svg>
						</div>
						<div class="right" :class="{'right_mifen':all.pottedLine?(all.printFormat==0?(ind%4 == 2 ? true:false ):false):false}"  v-if="ind%2 == 0">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine?(all.printFormat==0?(ind%4 == 2 ? true:false ):false):false" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 7px;top: 10px;"></div>
							<svg class="svg1" :class="{svg11:all.pottedLine?(all.printFormat==0?(ind%4 == 2 ? true:false ):false):false}" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine?(all.printFormat==0?(ind%4 == 2 ? true:false ):false):false">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="0" y="100"></use>
								<use xlink:href="#letterline" x="0" y="500"></use>
								<use xlink:href="#letterline" x="0" y="900"></use>
								<g transform="translate(30 12)">
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
							</svg>
						</div>
						<div class="content" :class="{'content_mifen':ind%2 ==0?true:false,'content_mifen1':all.pottedLine?(all.printFormat==0?(ind%4 == 3 ? true:false ):(ind%2 ==1 ?true:false)):false}">
							<div v-for="(item,index) in ele" :key="index" > 
								<div v-if="!item.isShear" class="posi title1" :style="'width:'+ item.infor.font.w+'px;height:'+item.infor.font.h+'px;top:'+item.infor.font.y+'px;left:'+item.infor.font.x+'px;' " @mouseover="subjectAcross(item)" @mouseout="subjectAway(item)"> 
									<div v-html="item.infor.font.content"  :class="{bord:!item.infor.font.showFlag1}"  @click.stop="subjectEditing(item)"  v-if="item.infor.font.showFlag"  style="overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #f00;"></div>
									<vue-ueditor-wrap :config='myConfig'  v-model="item.infor.font.content" v-if="!item.infor.font.showFlag" style="width:100%;height:100%;margin-top:-36px;"></vue-ueditor-wrap>
									<i  v-show="!item.infor.font.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.infor.font.h-20)+'px;'" @mousedown="drag1($event,item)"></i>
								</div>
								<div v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div v-for="(item2,index2) in item1.arr" :key="index2">
											<div class="posi" :style="'width:'+ item2.w+'px;height:'+ item1.h+'px;top:'+item2.y+'px;left:'+ item2.x+'px;'" >
												<div  class="tu" v-if="item2.img[0].length>0 && !item1.isShear" v-for="(item3,index3) in item2.img[0]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="tu" v-if="item2.img[1].length>0 && item1.isShear" v-for="(item3,index3) in item2.img[1]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="editcogeditoring"  v-html="item2.words[1]" v-if="item1.isShear && item2.bol[1]" @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="editcogeditoring"  v-html="item2.words[0]" v-if="!item1.isShear && item2.bol[0] " @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="operate" v-show="item.bol" v-if="item1.arr.length==1?true:(index2==0?false:true)"> 
													<span  class="posi shou subTopic"  style="right: 187px; top: 1px;" @click="file(item1,item)">插图</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='vertical'}" style="right: 145px; top: -1px;" @click="jdtformat3(item,item1,'竖')">竖排</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='transverse'}" style="right: 100px; top: -1px;"  @click="jdtformat3(item,item1,'横')">横排</span> 
													<span class="posi shou" style="right: 44px; top: -1px;">编辑</span> 
													<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
												</div>
												<i v-if="item1.arr.length==1?true:(index2==0?false:true)"  v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[1]" v-if="item1.isShear && !item2.bol[1]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[0]" v-if="!item1.isShear && !item2.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
											</div>
										</div>
									</div>
								</div>
								<div v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div class="posi" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.y+'px;left:'+ item1.x+'px;'" >
											<div  class="tu" v-if="item1.img[0].length>0 && !item1.isShear" v-for="(item2,index2) in item1.img[0]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'',$event)" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="tu" v-if="item1.img[1].length>0 && item1.isShear" v-for="(item2,index2) in item1.img[1]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'',$event)" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="editcogeditoring"  v-html="item1.words[1]" v-if="item1.isShear && item1.bol[1]" @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="editcogeditoring"  v-html="item1.words[0]" v-if="!item1.isShear && item1.bol[0] " @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="operate" v-show="item.bol" > 
												<span  class="posi shou subTopic"  style="right: 100px; top: 1px;" @click="file(item1,item)">插图</span> 
												<span class="posi shou" style="right: 44px; top: -1px;">编辑</span> 
												<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
											</div>
											<i   v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[1]" v-if="item1.isShear && !item1.bol[1]" style="width:100%;height:100%;margin-top:-32px;" ></vue-ueditor-wrap>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[0]" v-if="!item1.isShear && !item1.bol[0]" style="width:100%;height:100%;margin-top:-32px;" ></vue-ueditor-wrap>
										</div>
									</div>
								</div>
								<div v-if="item.topicArea  &&  (item.questionType == '1' || item.questionType == '2' || item.questionType == '4' )"   @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" @click.stop>
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0 && !item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="tu" v-if="item.topicArea.img[1].length>0 && item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[1]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item,item.topicArea.isShear)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-if="!item.topicArea.isShear && !item.topicArea.bol[0]"  v-model="item.topicArea.words[0]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
										<vue-ueditor-wrap :config='myConfig'  v-if="item.topicArea.isShear && !item.topicArea.bol[1]"  v-model="item.topicArea.words[1]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
								<div v-if="item.topicArea && item.questionType == '3'"   @mouseover="tktmovej(item)" @mouseout="tktmovec(item)" @click.stop>
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0 && !item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="tu" v-if="item.topicArea.img[1].length>0 && item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[1]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item,item.topicArea.isShear)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-if="!item.topicArea.isShear && !item.topicArea.bol[0]"  v-model="item.topicArea.words[0]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
										<vue-ueditor-wrap :config='myConfig'  v-if="item.topicArea.isShear && !item.topicArea.bol[1]"  v-model="item.topicArea.words[1]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
							</div>
							<div class="page-info-show" v-if="!all.pottedLine  &&   all.printFormat==0  &&  all.showPageInfo" v-show="ind%2==1" >班级<span></span>姓名<span></span></div>
							<div class="foot-page">第{{parseInt((ind+3)/2)}}页-{{ind%2==0?2:1}}</div>
						</div>
						<svg class="svg2" :class="{'svg2_mifen':ind%2 ==0?true:false,'svg2_mifen1':all.pottedLine?(all.printFormat==0?(ind%4 == 3 ? true:false ):(ind%2 ==1 ?true:false)):false}" height="1072" version="1.1">
							<defs>
								<g id="rowdown">
									<path d="M26,14.9500205 L39,14.9500205 L39,16 L26,16 L26,14.9500205 Z M26,10.2999795 L36,10.2999795 L36,11.349959 L26,11.349959 L26,10.2999795 Z M26,6.09997949 L31,6.09997949 L31,7.15004102 L26,7.15004102 L26,6.09997949 Z M37.9285041,11.349959 L37.9285041,7.15004102 L34.713912,7.15004102 L34.713912,9.24999999 L31.4993198,6.62500001 L34.713912,4 L34.713912,6.09995899 L39,6.09995899 L39,11.349959 L37.9285041,11.349959 Z" id="" fill="#FFFFFF"></path>
								</g> 
								<g id="rowadd">
									<path d="M4,5 L17,5 L17,6.13333333 L4,6.13333333 L4,5 Z M4,9.06666667 L14,9.06666667 L14,10.2 L4,10.2 L4,9.06666667 Z M4,13.6 L9,13.6 L9,14.7333333 L4,14.7333333 L4,13.6 Z M15.9285714,9.06666667 L17,9.06666667 L17,13.6 L17,14.7333333 L15.9285714,14.7333333 L12.7142857,14.7333333 L12.7142857,17 L9.5,14.1666667 L12.7142857,11.3333333 L12.7142857,13.6 L15.9285714,13.6 L15.9285714,9.06666667 Z" id="Combined-Shape" fill="#FFFFFF"></path>
								</g>
							</defs>
							<rect x="11" y="10" stroke="#f00" :width="all.rect.w" height="1011" rx="5" stroke-width="2" fill="none" fill-rule="evenodd"></rect>
							<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="25">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
							<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="1015">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
							<g v-for="(item,index) in ele" :key="index" >
								<g @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" v-if="item.questionType == '1' || item.questionType == '2' || item.questionType == '4' ">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<line v-if="item.topicArea" :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
									<g v-if="!item.topicArea || !item.topicArea.isShear">
										<g v-for="(item1,index1) in item.arr" :key="index1" >
											<g v-for="(item2,index2) in item1" :key="index2">
												<text font-size="11" line-spacing="8" fill="#212121" :x="item2.num.x" :y="item2.num.y" :style="all.existVerticalRow?'text-anchor: middle;':'text-anchor: end;'">{{item2.num.content}}</text> 
												<g v-for="(item3,index3) in item2.options" :key="index3">
													<rect :x="item3.rectx" :y="item3.recty" width="16.5" height="10" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect> 
													<rect v-if="halfFrame" :x="item3.rectx+3" :y="item3.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
													<text font-size="9" line-spacing="8" fill="#212121" :x="item3.fontx" :y="item3.fonty">{{item3.content}}</text>
												</g>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol" >
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect> 
											<text	@click="delete1(item)" class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" @click="kgtedit(item)" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="84" height="20" :x="item.infor.rect.x+item.infor.rect.w-250" :y="item.infor.rect.y"></rect>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-247" :y="item.infor.rect.y+15">每组题目数</text> 
											<rect fill="#fff" stroke="#00A9F6"    width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-114" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" @click="add(item)" :x="item.infor.rect.x+item.infor.rect.w-108" :y="item.infor.rect.y+17">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y"></rect> 
											<text font-size="16" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-126" :y="item.infor.rect.y+16" style="text-anchor: middle;">{{item.perGroup}}</text>
											<rect fill="#fff" stroke="#00A9F6"   width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-166" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" @click="jian(item)" :x="item.infor.rect.x+item.infor.rect.w-162" :y="item.infor.rect.y+17" >—</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '3'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<text font-size="12"  fill="#4A4A4A" :x="item1.font.x" :y="item1.font.y" >{{item1.content}}</text> 
										<line :x1="item1.rect.x" :y1="item1.rect.y" :x2="item1.rect.x + item1.size" stroke-width="1" :y2="item1.rect.y" stroke="#666"  ></line>
										<g v-if="item.bol1" v-show="item1.content">
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+2" :y="item1.rect.y-22" @click="lineFeed(item,item1)"></rect>
											<use xlink:href="#rowadd" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeed(item,item1)"></use>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+23" :y="item1.rect.y-22" @click="lineFeedNo(item,item1)"></rect>
											<use xlink:href="#rowdown" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeedNo(item,item1)"></use>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+44" :y="item1.rect.y-22"  @click="addchang(item,item1)"></rect>
											<text class="shou" font-size="24" fill="#fff" :x="item1.rect.x+47" :y="item1.rect.y-4" @click="addchang(item,item1)">+</text>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+65" :y="item1.rect.y-22" @click="jianchang(item,item1)"></rect>
											<rect class="shou"  fill="#FFFFFF" :x="item1.rect.x+70" :y="item1.rect.y-12" width="12" height="1.5" @click="jianchang(item,item1)"></rect>
										</g>
									</g>
									<g v-if="!item.topicArea || !item.topicArea.isShear">
										<g v-if="item.number" v-show="item.bol" >
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15" @click="delete1(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15" @click="tktedit(item)">编辑</text>
											<rect  fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-128" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-120" :y="item.infor.rect.y+15" @click="formatAdjustment(item)">调整</text>
										</g>
										<g v-if="item.number" v-show="item.bol1">
											<rect class="shou" @click="formatAdjustment1(item)" fill="#fff" stroke="#fff" width="24" height="24" :x="item.infor.rect.x+item.infor.rect.w-24" :y="item.infor.rect.y-14"></rect>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y-10" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y+6" stroke="#4a4a4a" stroke-width="2"></line>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y+6" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y-10" stroke="#666" stroke-width="2"></line>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-55" :y="item.infor.rect.y-10"></rect>
											<text  class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-50" :y="item.infor.rect.y+6" @click="addLineHeight(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-81" :y="item.infor.rect.y-10"></rect>
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w-68" :y="item.infor.rect.y+6" style="text-anchor: middle;">{{item.lineHeight}}</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-107" :y="item.infor.rect.y-10"></rect> 
											<text  class="shou"  font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-104" :y="item.infor.rect.y+6" @click="reduceLineHeight(item)">—</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y+5">行高</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<g v-for="(item2,index2) in item1.arr" :key="index2">
											<rect :x="item2.x" :y="item2.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item2.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<rect :x="item1.x" :y="item1.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item1.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item2,index2) in item1.num" :key="index2" v-if="!item1.isShear">
											<rect :x="191+index2*50" :y="item1.y+12" stroke="#4A4A4A" width="17" height="10" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<text font-size="11" fill="#4A4A4A" :x="185+index2*50" :y="item1.y+21" style="text-anchor: end;">{{item2.content}}</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '14'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<line :x1="item1.line.x1" :y1="item1.line.y1" :x2="item1.line.x2" :y2="item1.line.y2" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" stroke-width="1" ></line>
										<text v-if="!item1.isShear" font-size="12" fill="#4A4A4A" :x="item1.num.x" :y="item1.num.y">{{item1.num.content}}.({{item1.score}}分)</text>
										<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi == 'square'">
											<rect :x="item2.x" :y="item2.y" stroke="#4A4A4A" :width="item2.w" :height="item2.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<text v-if="item2.i%100 == 0"  font-size="10" fill="#4A4A4A" :x="item2.x+item2.w" :y="item2.y+item2.h+5" style="text-anchor: end;">{{item2.i}}</text>
										</g>
										<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi != 'square'">
											<line :x1="item2.x1" :y1="item2.y1" :x2="item2.x2" :y2="item2.y2" stroke="#666" stroke-width="1"></line>
										</g>
										<g v-show="item.bol">
											<g v-if="item1.fangshi == 'square'?true:(item1.isShear?false:true)">
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-44" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2 -36 "  :y="item1.line.y1+15" @click="delete1(item)"  class="shou">删除</text>
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-88" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2-80" :y="item1.line.y1+15"  class="shou" @click="zwtedit(item)">编辑</text>
											</g>
											<g v-show="item1.fangshi != 'square'">
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-30" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-24" :y="item1.num.y+36" @click="zwtformat1(item,item1,'加')">+</text>
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-56" :y="item1.num.y+20"></rect> 
												<text  font-size="16" fill="#4a4a4a" :x="item1.line.x2-43" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowNumber}}</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-82" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-79" :y="item1.num.y+36" @click="zwtformat1(item,item1,'减')">—</text>
												<text  font-size="14" fill="#4A4A4A" :x="item1.line.x2-117" :y="item1.num.y+35">行数</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-150" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-144" :y="item1.num.y+36" @click="zwtformat2(item,item1,'加')">+</text>
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-176" :y="item1.num.y+20"></rect> 
												<text font-size="16" fill="#4a4a4a" :x="item1.line.x2-163" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowHeight}}</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-202" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-199" :y="item1.num.y+36" @click="zwtformat2(item,item1,'减')">—</text>
												<text font-size="14" fill="#4A4A4A" :x="item1.line.x2-237" :y="item1.num.y+35">行高</text>
											</g>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '16'" @mouseover="jdumovej(item)" @mouseout="jdumovec(item)">
									<g>
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line :x1="item.infor.rect.x" :y1="item.infor.rect.y" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y+item.infor.rect.h" stroke="#979797" stroke-width="1"></line>
										<line :x1="item.infor.rect.x" :y1="item.infor.rect.y+item.infor.rect.h" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y" stroke="#979797" stroke-width="1"></line>
										<text font-size="24" fill="#4A4A4A" x="257.5" :y="9+item.infor.rect.h/2+item.infor.rect.y">禁止在此区域作答</text>
									</g>
									<g v-show="item.bol" >
										<rect @mouseover="jdumovej(item)" fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 44" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 36" :y="item.infor.rect.y+21" @click="deletejdq(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 88" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 80" :y="item.infor.rect.y+21" @click="jdqedit(item)">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 120" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 114" :y="item.infor.rect.y+21" @click="jdqjia(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 146" :y="item.infor.rect.y+5"></rect> 
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w - 133" :y="item.infor.rect.y+21" style="text-anchor: middle;">{{item.rowNumber}}</text> 
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 172" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 169" :y="item.infor.rect.y+21" @click="jdqjian(item)"> —</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w - 207" :y="item.infor.rect.y+20">行数</text>
									</g>
								</g>
							</g>
						</svg>
					</div>
				</div>
				<div class="sanlan"   v-if="all.scantronFormat == 3" :class="{prohibit:all.hasSaved==1}">
					<div class="three"  :class="{three2:all.pottedLine}">
						<div class="clearfix  blackBlock" style="position: absolute;top: 6px;left:133px;margin:0 auro;">
							<p class="fl" v-for="(item,index) in 16" :key="index" style="width: 18px;height:6px;background:#333;margin-left:10px;"></p>
						</div>
						<div style="width: 9px;height: 10px;position: absolute;right: 0;top: 20px;background: #333;"></div>
						<div style="width: 9px;height: 10px;position: absolute;right: 0;bottom: 20px;background: #333;"></div>
						<div class="left" :class="{'left_mifen':all.pottedLine }">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 126px;top: 10px;"></div>
							<svg class="svg1" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="82" y="100"></use>
								<use xlink:href="#letterline" x="82" y="500"></use>
								<use xlink:href="#letterline" x="82" y="900"></use>
								<g v-if="all.markingMissExamination.bol">
									<g>
										<rect stroke="#4A4A4A" fill="#FFFFFF" x="0" y="940" width="55" height="49"></rect>
										<text font-size="13" fill="#f00"><tspan x="30" y="957" text-anchor="middle">缺考</tspan></text>
										<rect stroke="none" fill="#4A4A4A" x="0" y="964" width="55" height="1"></rect>
										<rect stroke="#4A4A4A" fill="#FFFFFF" x="20" y="972" width="17" height="10"></rect>
									</g>
								</g>
								<g>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
								<g transform="rotate(-90,112,112)">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" x="0" y="0" width="180" height="75" rx="0"></rect>
									<text font-size="16" fill="#f00">
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 2">二维码粘贴区</tspan>
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 3">条形码粘贴区</tspan>
									</text>
								</g>
							</svg>
						</div>
						<div class="content" :class="{'content_mifen3':all.pottedLine}" @click.stop>
							<div class="textMessage"  :style="'width:'+ all.textMessage.w+'px;height:'+all.textMessage.h+'px;'" @mouseover="headingAcross" @mouseout="headingAway"  @click.stop>
								<div v-html="all.textMessage.content" v-if="all.textMessage.showFlag" @click.stop="titleEditing" style="padding: 4px 8px 0 ;overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #f00;"></div>
								<vue-ueditor-wrap :config='myConfig'  v-model="all.textMessage.content" v-if="!all.textMessage.showFlag" style="width:100%;height:100%;margin-top:-60px;"></vue-ueditor-wrap>
								<i  v-show="!all.textMessage.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(all.textMessage.h-20)+'px;'" @mousedown="drag($event)"></i>
							</div>
							<div v-for="(item,index) in rendering.arr1" :key="index">
								<div class="posi title1" v-if="item.questionType != '16'" :style="'width:'+ item.infor.font.w+'px;height:'+item.infor.font.h+'px;top:'+item.infor.font.y+'px;left:'+item.infor.font.x+'px;' " @mouseover="subjectAcross(item)" @mouseout="subjectAway(item)"> 
									<div v-html="item.infor.font.content"  :class="{bord:!item.infor.font.showFlag1}"  @click.stop="subjectEditing(item)"  v-if="item.infor.font.showFlag"  style="overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #f00;"></div>
									<vue-ueditor-wrap :config='myConfig'  v-model="item.infor.font.content" v-if="!item.infor.font.showFlag" style="width:100%;height:100%;margin-top:-60px;"></vue-ueditor-wrap>
									<i  v-show="!item.infor.font.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.infor.font.h-20)+'px;'" @mousedown="drag1($event,item)"></i>
								</div>
								<div v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div v-for="(item2,index2) in item1.arr" :key="index2">
											<div class="posi" :style="'width:'+ item2.w+'px;height:'+ item1.h+'px;top:'+item2.y+'px;left:'+ item2.x+'px;'" >
												<div class="tu" v-if="item2.img[0].length>0" v-for="(item3,index3) in item2.img[0]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="editcogeditoring"  v-html="item2.words[0]" v-if="item2.bol[0] " @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="operate" v-show="item.bol" v-if="item1.arr.length==1?true:(index2==0?false:true)"> 
													<span  class="posi shou subTopic"  style="right: 187px; top: 1px;" @click="file(item1,item)">插图</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='vertical'}" style="right: 145px; top: -1px;" @click="jdtformat3(item,item1,'竖')">竖排</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='transverse'}" style="right: 100px; top: -1px;"  @click="jdtformat3(item,item1,'横')">横排</span> 
													<span class="posi shou" style="right: 44px; top: -1px;" @click="jdtedit(item)">编辑</span> 
													<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
												</div>
												<i v-if="item1.arr.length==1?true:(index2==0?false:true)"  v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[0]" v-if="!item2.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
											</div>
										</div>
									</div>
								</div>
								<div v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div class="posi" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.y+'px;left:'+ item1.x+'px;'" >
											<div class="tu" v-if="item1.img[0].length>0" v-for="(item2,index2) in item1.img[0]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'')" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="editcogeditoring"  v-html="item1.words[0]" v-if="item1.bol[0] " @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="operate" v-show="item.bol" > 
												<span  class="posi shou subTopic"  style="right: 100px; top: 1px;" @click="file(item1,item)">插图</span> 
												<span class="posi shou" style="right: 44px; top: -1px;" @click="jdtedit(item)">编辑</span> 
												<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
											</div>
											<i v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[0]" v-if="!item1.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
										</div>
									</div>
								</div>
								<div v-if="item.topicArea &&  item.topicArea.rect.x != '' &&  (item.questionType == '1' || item.questionType == '2' || item.questionType == '4' )"   @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)">
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-model="item.topicArea.words[0]" v-if="item.topicArea.isShear?!item.topicArea.bol[1]:!item.topicArea.bol[0]" style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
								<div v-if="item.topicArea &&  item.topicArea.rect.x != '' && item.questionType == '3'"   @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-model="item.topicArea.words[0]" v-if="item.topicArea.isShear?!item.topicArea.bol[1]:!item.topicArea.bol[0]" style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
							</div>
							<div class="foot-page">第1页-1</div>
						</div>
						<svg class="svg2" :class="{'svg2_mifen3':all.pottedLine}" height="1072" version="1.1">
							<defs>
								<g id="rowdown">
									<path d="M26,14.9500205 L39,14.9500205 L39,16 L26,16 L26,14.9500205 Z M26,10.2999795 L36,10.2999795 L36,11.349959 L26,11.349959 L26,10.2999795 Z M26,6.09997949 L31,6.09997949 L31,7.15004102 L26,7.15004102 L26,6.09997949 Z M37.9285041,11.349959 L37.9285041,7.15004102 L34.713912,7.15004102 L34.713912,9.24999999 L31.4993198,6.62500001 L34.713912,4 L34.713912,6.09995899 L39,6.09995899 L39,11.349959 L37.9285041,11.349959 Z" id="" fill="#FFFFFF"></path>
								</g> 
								<g id="rowadd">
									<path d="M4,5 L17,5 L17,6.13333333 L4,6.13333333 L4,5 Z M4,9.06666667 L14,9.06666667 L14,10.2 L4,10.2 L4,9.06666667 Z M4,13.6 L9,13.6 L9,14.7333333 L4,14.7333333 L4,13.6 Z M15.9285714,9.06666667 L17,9.06666667 L17,13.6 L17,14.7333333 L15.9285714,14.7333333 L12.7142857,14.7333333 L12.7142857,17 L9.5,14.1666667 L12.7142857,11.3333333 L12.7142857,13.6 L15.9285714,13.6 L15.9285714,9.06666667 Z" id="Combined-Shape" fill="#FFFFFF"></path>
								</g>
							</defs>
							<g v-if="all.pottedLine && all.existAttentionMatters.bol">
								<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
								<text font-size="11" fill="#f00">
									<tspan :x="all.existAttentionMatters.font[0].x" :y="all.existAttentionMatters.font[0].y">1. 答题前请将姓名、班级、考场、座位号和准考证号填写清楚。</tspan>
									<tspan :x="all.existAttentionMatters.font[1].x" :y="all.existAttentionMatters.font[1].y">2. 客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。</tspan>
									<tspan :x="all.existAttentionMatters.font[2].x" :y="all.existAttentionMatters.font[2].y">3. 主观题必须使用黑色签字笔书写。</tspan>
									<tspan :x="all.existAttentionMatters.font[3].x" :y="all.existAttentionMatters.font[3].y">4. 必须在题号对应的答题区域内作答,超出答题区域书写无效。</tspan>
									<tspan :x="all.existAttentionMatters.font[4].x" :y="all.existAttentionMatters.font[4].y">5. 保持答卷清洁完整。</tspan>
								</text>
							</g>
							<g v-if="!all.pottedLine">
								<g  @mouseover="basicInforShow1" @mouseout="basicInforShow2">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.basicInfor1.x" :y="all.basicInfor1.y" :width="all.basicInfor1.w" :height="all.basicInfor1.h" rx="5"></rect>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<g v-for="(item, index) in all.basicInfor" :key="index">
											<text font-size="13" :x="item.font[0].x" :y="item.font[0].y">{{ item.name }}</text>
											<rect fill="#f00" :x="item.rectangle.x" :y="item.rectangle.y" :width="item.rectangle.w" :height="item.rectangle.h" />
										</g>
									</g>
									<g class="basicInforShow" v-show="btnState.basicInfor.isShow" @click="basicInforShow">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" :x="btnState.basicInfor.font.x" :y="btnState.basicInfor.font.y" />
										<text class="shou" font-size="14" fill="#fff" :x="btnState.basicInfor.rectangle.x" :y="btnState.basicInfor.rectangle.y">编辑</text>
									</g>
								</g>
								<g v-if="all.existAttentionMatters.bol">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.existAttentionMatters.rectangle.x" :y="all.existAttentionMatters.rectangle.y" :width="all.existAttentionMatters.rectangle.w" :height="all.existAttentionMatters.rectangle.h" rx="5"></rect>
									<text font-size="11" fill="#f00">
										<tspan :x="all.existAttentionMatters.font[0].x" :y="all.existAttentionMatters.font[0].y">1. 答题前请将姓名、班级、考场、座位号和准考证号填写清楚。</tspan>
										<tspan :x="all.existAttentionMatters.font[1].x" :y="all.existAttentionMatters.font[1].y">2. 客观题答题,必须使用2B铅笔填涂,修改时用橡皮擦干净。</tspan>
										<tspan :x="all.existAttentionMatters.font[2].x" :y="all.existAttentionMatters.font[2].y">3. 主观题必须使用黑色签字笔书写。</tspan>
										<tspan :x="all.existAttentionMatters.font[3].x" :y="all.existAttentionMatters.font[3].y">4. 必须在题号对应的答题区域内作答,超出答题区域书写无效。</tspan>
										<tspan :x="all.existAttentionMatters.font[4].x" :y="all.existAttentionMatters.font[4].y">5. 保持答卷清洁完整。</tspan>
									</text>
								</g>
								<g v-if="all.numberFormat.content == 2 || all.numberFormat.content == 3">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" :x="all.numberFormat.rect.x" :y="all.numberFormat.rect.y" :width="all.numberFormat.rect.w" :height="all.numberFormat.rect.h" rx="5"></rect>
									<text font-size="16" fill="#f00">
										<tspan v-if="all.numberFormat.content == 2" :x="all.numberFormat.font.x" :y="all.numberFormat.font.y">二维码粘贴区</tspan>
										<tspan v-if="all.numberFormat.content == 3" :x="all.numberFormat.font.x" :y="all.numberFormat.font.y">条形码粘贴区</tspan>
									</text>
								</g>
								<g v-if="all.markingMissExamination.bol">
									<rect stroke="#4A4A4A" fill="#FFFFFF" :x="all.markingMissExamination.rect[0].x" :y="all.markingMissExamination.rect[0].y" :width="all.markingMissExamination.rect[0].w" :height="all.markingMissExamination.rect[0].h" rx="5"></rect>
									<text font-size="13" fill="#f00">
										<tspan :x="all.markingMissExamination.font[0].x" :y="all.markingMissExamination.font[0].y">缺考标记</tspan> 
										<tspan :x="all.markingMissExamination.font[2].x" :y="all.markingMissExamination.font[2].y">填涂示例</tspan>
									</text>
									<rect :x="all.markingMissExamination.font[1].x" :y="all.markingMissExamination.font[1].y-9" :width="all.markingMissExamination.rect[1].w" :height="all.markingMissExamination.rect[1].h" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect>
									<rect fill="#212121" :x="all.markingMissExamination.rect[1].x" :y="all.markingMissExamination.rect[1].y" :width="all.markingMissExamination.rect[1].w" :height="all.markingMissExamination.rect[1].h"></rect>
								</g>
								<g v-if="all.numberFormat.content == 1" @mouseover="numberFormatShow1" @mouseout="numberFormatShow2">
									<rect stroke="#f00" fill="#FFFFFF" :x="all.numberFormat.basic[0].x" :y="all.numberFormat.basic[0].y" :width="all.numberFormat.basic[0].w" :height="all.numberFormat.basic[0].h"></rect>
									<rect fill="#f00" :x="all.numberFormat.basic[1].x" :y="all.numberFormat.basic[1].y" :width="all.numberFormat.basic[1].w" :height="all.numberFormat.basic[1].h"></rect>
									<rect fill="#f00" :x="all.numberFormat.basic[2].x" :y="all.numberFormat.basic[2].y" :width="all.numberFormat.basic[2].w" :height="all.numberFormat.basic[2].h"></rect>
									<text :x="all.numberFormat.basic[3].x" :y="all.numberFormat.basic[3].y" font-size="14" fill="#4A4A4A">考试证号</text>
									<g>
										<rect v-for="(item, index) in all.numberFormat.verticalLine" :key="index" fill="#f00" :x="item.x" :y="item.y" :width="item.w" :height="item.h"></rect>
									</g>
									<g v-for="(item, index) in all.numberFormat.square" :key="index">
										<g v-for="(item1, index) in item" :key="index">
											<rect :x="item1.rectx" :y="item1.recty" :width="item1.rectw" :height="item1.recth" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(256, 0, 0);"></rect>
											<rect v-if="halfFrame" :x="item1.rectx+3" :y="item1.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
											<text font-size="9" line-spacing="8" fill="#212121" :x="item1.fontx" :y="item1.fonty">{{ item1.content }}</text>
										</g>
									</g>
								</g>
								<g v-if="all.numberFormat.content == 1" v-show="btnState.numberFormat.isShow" @mouseover="numberFormatShow1" @mouseout="numberFormatShow2" @click="numberFormatShow">
									<rect class="shou" fill="#00A9F6" :width="btnState.numberFormat.rect.w" :height="btnState.numberFormat.rect.h" rx="2" :x="btnState.numberFormat.rect.x" :y="btnState.numberFormat.rect.y"></rect>
									<text class="shou" font-size="14" fill="#fff" :x="btnState.numberFormat.font.x" :y="btnState.numberFormat.font.y">编辑</text>
								</g>
							</g>
							<rect v-if="rendering.arr1.length>0"  :x="all.rect.x" :y="all.rect.y" stroke="#f00" :width="all.rect.w" :height="all.rect.h" rx="5" stroke-width="2" fill="none" fill-rule="evenodd"></rect>
							<g v-if="rendering.arr1.length>0">
								<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="1015">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
								<g v-for="(item,index) in rendering.arr1" :key="index" >
									<g @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" v-if="item.questionType == '1' || item.questionType == '2' || item.questionType == '4' ">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line v-if="item.topicArea && item.topicArea.rect.x " :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
										<g v-for="(item1,index1) in item.arr" :key="index1" >
											<g v-for="(item2,index2) in item1" :key="index2">
												<text font-size="11" line-spacing="8" fill="#212121" :x="item2.num.x" :y="item2.num.y" :style="all.existVerticalRow?'text-anchor: middle;':'text-anchor: end;'">{{item2.num.content}}</text> 
												<g v-for="(item3,index3) in item2.options" :key="index3">
													<rect :x="item3.rectx" :y="item3.recty" width="16.5" height="10" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect> 
													<rect v-if="halfFrame" :x="item3.rectx+3" :y="item3.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
													<text font-size="9" line-spacing="8" fill="#212121" :x="item3.fontx" :y="item3.fonty">{{item3.content}}</text>
												</g>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol">
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect> 
											<text	@click="delete1(item)" class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" @click="kgtedit(item)" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="84" height="20" :x="item.infor.rect.x+item.infor.rect.w-250" :y="item.infor.rect.y"></rect>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-247" :y="item.infor.rect.y+15">每组题目数</text> 
											<rect fill="#fff" stroke="#00A9F6"    width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-114" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" @click="add(item)" :x="item.infor.rect.x+item.infor.rect.w-108" :y="item.infor.rect.y+17">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y"></rect> 
											<text font-size="16" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-126" :y="item.infor.rect.y+16" style="text-anchor: middle;">{{item.perGroup}}</text>
											<rect fill="#fff" stroke="#00A9F6"   width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-166" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" @click="jian(item)" :x="item.infor.rect.x+item.infor.rect.w-162" :y="item.infor.rect.y+17" >—</text>
										</g>
									</g>
									<g v-if="item.questionType == '3'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line v-if="item.topicArea && item.topicArea.rect.x " :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<text font-size="12"  fill="#4A4A4A" :x="item1.font.x" :y="item1.font.y" >{{item1.content}}</text> 
											<line :x1="item1.rect.x" :y1="item1.rect.y" :x2="item1.rect.x + item1.size" stroke-width="1" :y2="item1.rect.y" stroke="#666"  ></line>
											<g v-if="item.bol1" v-show="item1.content">
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+2" :y="item1.rect.y-22" @click="lineFeed(item,item1)"></rect>
												<use xlink:href="#rowadd" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeed(item,item1)"></use>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+23" :y="item1.rect.y-22" @click="lineFeedNo(item,item1)"></rect>
												<use xlink:href="#rowdown" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeedNo(item,item1)"></use>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+44" :y="item1.rect.y-22"  @click="addchang(item,item1)"></rect>
												<text class="shou" font-size="24" fill="#fff" :x="item1.rect.x+47" :y="item1.rect.y-4" @click="addchang(item,item1)">+</text>
												<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+65" :y="item1.rect.y-22" @click="jianchang(item,item1)"></rect>
												<rect class="shou"  fill="#FFFFFF" :x="item1.rect.x+70" :y="item1.rect.y-12" width="12" height="1.5" @click="jianchang(item,item1)"></rect>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol">
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15" @click="delete1(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15" @click="tktedit(item)">编辑</text>
											<rect  fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-128" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-120" :y="item.infor.rect.y+15" @click="formatAdjustment(item)">调整</text>
										</g>
										<g v-if="item.number" v-show="item.bol1">
											<rect class="shou" @click="formatAdjustment1(item)" fill="#fff" stroke="#fff" width="24" height="24" :x="item.infor.rect.x+item.infor.rect.w-24" :y="item.infor.rect.y-14"></rect>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y-10" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y+6" stroke="#4a4a4a" stroke-width="2"></line>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y+6" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y-10" stroke="#666" stroke-width="2"></line>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-55" :y="item.infor.rect.y-10"></rect>
											<text  class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-50" :y="item.infor.rect.y+6" @click="addLineHeight(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-81" :y="item.infor.rect.y-10"></rect>
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w-68" :y="item.infor.rect.y+6" style="text-anchor: middle;">{{item.lineHeight}}</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-107" :y="item.infor.rect.y-10"></rect> 
											<text  class="shou"  font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-104" :y="item.infor.rect.y+6" @click="reduceLineHeight(item)">—</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y+5">行高</text>
										</g>
									</g>
									<g v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<g v-for="(item2,index2) in item1.arr" :key="index2">
												<rect :x="item2.x" :y="item2.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item2.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<rect :x="item1.x" :y="item1.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item1.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<g v-for="(item2,index2) in item1.num" :key="index2">
												<rect :x="191+index2*50" :y="item1.y+12" stroke="#4A4A4A" width="17" height="10" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
												<text font-size="11" fill="#4A4A4A" :x="185+index2*50" :y="item1.y+21" style="text-anchor: end;">{{item2.content}}</text>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '14'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item1,index1) in item.arr" :key="index1">
											<line :x1="item1.line.x1" :y1="item1.line.y1" :x2="item1.line.x2" :y2="item1.line.y2" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" stroke-width="1" ></line>
											<text font-size="12" fill="#4A4A4A" :x="item1.num.x" :y="item1.num.y">{{item1.num.content}}.({{item1.score}}分)</text>
											<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi == 'square'">
												<rect :x="item2.x" :y="item2.y" stroke="#4A4A4A" :width="item2.w" :height="item2.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
												<text v-if="item2.i%100 == 0"  font-size="10" fill="#4A4A4A" :x="item2.x+item2.w" :y="item2.y+item2.h+5" style="text-anchor: end;">{{item2.i}}</text>
											</g>
											<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi != 'square'">
												<line :x1="item2.x1" :y1="item2.y1" :x2="item2.x2" :y2="item2.y2" stroke="#666" stroke-width="1"></line>
											</g>
											<g v-show="item.bol">
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-44" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2 -36 "  :y="item1.line.y1+15" @click="delete1(item)"  class="shou">删除</text>
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-88" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2-80" :y="item1.line.y1+15"  class="shou" @click="zwtedit(item)">编辑</text>
												<g v-show="item1.fangshi != 'square'">
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-30" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-24" :y="item1.num.y+36" @click="zwtformat1(item,item1,'加')">+</text>
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-56" :y="item1.num.y+20"></rect> 
													<text  font-size="16" fill="#4a4a4a" :x="item1.line.x2-43" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowNumber}}</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-82" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-79" :y="item1.num.y+36" @click="zwtformat1(item,item1,'减')">—</text>
													<text  font-size="14" fill="#4A4A4A" :x="item1.line.x2-117" :y="item1.num.y+35">行数</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-150" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-144" :y="item1.num.y+36" @click="zwtformat2(item,item1,'加')">+</text>
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-176" :y="item1.num.y+20"></rect> 
													<text font-size="16" fill="#4a4a4a" :x="item1.line.x2-163" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowHeight}}</text> 
													<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-202" :y="item1.num.y+20"></rect> 
													<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-199" :y="item1.num.y+36" @click="zwtformat2(item,item1,'减')">—</text>
													<text font-size="14" fill="#4A4A4A" :x="item1.line.x2-237" :y="item1.num.y+35">行高</text>
												</g>
											</g>
										</g>
									</g>
									<g v-if="item.questionType == '16'" @mouseover="jdumovej(item)" @mouseout="jdumovec(item)">
										<g>
											<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<line :x1="item.infor.rect.x" :y1="item.infor.rect.y" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y+item.infor.rect.h" stroke="#979797" stroke-width="1"></line>
											<line :x1="item.infor.rect.x" :y1="item.infor.rect.y+item.infor.rect.h" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y" stroke="#979797" stroke-width="1"></line>
											<text font-size="24" fill="#4A4A4A" :x="item.infor.rect.w/2-79" :y="9+item.infor.rect.h/2+item.infor.rect.y">禁止在此区域作答</text>
										</g>
										<g v-show="item.bol" >
											<rect @mouseover="jdumovej(item)" fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 44" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 36" :y="item.infor.rect.y+21" @click="deletejdq(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 88" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 80" :y="item.infor.rect.y+21" @click="jdqedit(item)">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 120" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 114" :y="item.infor.rect.y+21" @click="jdqjia(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 146" :y="item.infor.rect.y+5"></rect> 
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w - 133" :y="item.infor.rect.y+21" style="text-anchor: middle;">{{item.rowNumber}}</text> 
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 172" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 169" :y="item.infor.rect.y+21" @click="jdqjian(item)"> —</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w - 207" :y="item.infor.rect.y+20">行数</text>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div class="three" :class="{three1:all.pottedLine?false:(ind%3 == 0?true:false),three2:all.pottedLine?(all.printFormat==0?((ind%6==4 || ind%6==5)?true:false):(ind%3 ==2 ?true:false)):false,three3:all.pottedLine?(ind%3==0?true:false):false,three4:all.pottedLine?(all.printFormat==0?((ind%6==1 || ind%6 == 2)?true:false):(ind%3==1?true:false)):false}" v-if="rendering.arr2.length>0" v-for="(ele,ind) in rendering.arr2" :key="ind">
						<div v-if="ind%3!=1" style="width: 9px;height: 10px;position: absolute;right: 0;top: 20px;background: #333;"></div>
						<div v-if="ind%3!=1" style="width: 9px;height: 10px;position: absolute;right: 0;bottom: 20px;background: #333;"></div>
						<div v-if="ind%3!=2" style="width: 9px;height: 10px;position: absolute;left: 0;top: 20px;background: #333;"></div>
						<div v-if="ind%3!=2" style="width: 9px;height: 10px;position: absolute;left: 0;bottom: 20px;background: #333;"></div>
						<div class="left" :class="{'left_mifen':all.pottedLine?(all.printFormat==0?(ind%6 == 5 ? true:false ):(ind%3 == 2 ? true:false )):false }"  v-if="ind%3 == 2">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine?(all.printFormat==0?(ind%6 == 5 ? true:false ):(ind%3 == 2 ? true:false )):false"  style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 126px;top: 10px;"></div>
							<svg class="svg1" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine?(all.printFormat==0?(ind%6 == 5 ? true:false ):(ind%3 == 2 ? true:false )):false" >
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="82" y="100"></use>
								<use xlink:href="#letterline" x="82" y="500"></use>
								<use xlink:href="#letterline" x="82" y="900"></use>
								<g>
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
								<g transform="rotate(-90,112,112)">
									<rect stroke="#F00" fill="#FFFFFF" stroke-dasharray="4" x="0" y="0" width="180" height="75" rx="0"></rect>
									<text font-size="16" fill="#f00">
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 2">二维码粘贴区</tspan>
										<tspan x="40" y="42.5" v-if="all.numberFormat.content == 3">条形码粘贴区</tspan>
									</text>
								</g>
							</svg>
						</div>
						<div class="right" :class="{'right_mifen':all.pottedLine?(all.printFormat==0?(ind%6 == 4 ? true:false ):false):false }"  v-if="ind%3 == 1">
							<div></div>
							<div></div>
							<div v-if="all.pottedLine?(all.printFormat==0?(ind%6 == 4 ? true:false ):false):false" style="width: 1px;height: 1097px;border-right:1px dashed #000;position: absolute;left: 7px;top: 10px;"></div>
							<svg class="svg1" :class="{svg11:all.pottedLine?(all.printFormat==0?(ind%6 == 4 ? true:false ):false):false }" width="98" height="1072" version="1.1" viewBox="0 0 98 1072" v-if="all.pottedLine?(all.printFormat==0?(ind%6 == 4 ? true:false ):false):false">
								<defs>
									<g id="letterline">
										<text x="0" y="0" fill="#212121" font-size="14">
											<tspan x="0" y="20">密</tspan> 
											<tspan x="0" y="70">封</tspan> 
											<tspan x="0" y="120">线</tspan>
										</text>
									</g>
								</defs>
								<use xlink:href="#letterline" x="0" y="100"></use>
								<use xlink:href="#letterline" x="0" y="500"></use>
								<use xlink:href="#letterline" x="0" y="900"></use>
								<g transform="translate(30 12)">
									<g @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect fill="#fff" width="20" height="500" x="36" y="220"></rect>
										<g v-for="(item,index) in all.basicInfor" :key="index">
											<text font-size="13">
												<tspan :x="item.font[0].x" :y="item.font[0].y" rotate="-90">{{item.font[0].content}}</tspan> 
												<tspan :x="item.font[1].x" :y="item.font[1].y" rotate="-90">{{item.font[1].content}}</tspan>
											</text>
											<rect fill="#f00" :x="item.rect.x" :y="item.rect.y" :width="item.rect.w" :height="item.rect.h"></rect>
										</g>
									</g>
									<g v-show="btnState.basicInfor.isShow" @click="basicInforShow" @mouseover="basicInforShow1" @mouseout="basicInforShow2">
										<rect class="shou" fill="#00A9F6" width="70" height="30" rx="2" x="-16" y="222"></rect>
										<text class="shou" font-size="14" fill="#fff" x="4" y="242">编辑</text>
									</g>
								</g>
							</svg>
						</div>
						<div class="content" :class="{'content_mifen':all.pottedLine?false:(ind%3 ==2?false:true),'content_mifen1':all.pottedLine?((ind%3 == 0 || ind%3 == 1)? true:false ):false,'content_mifen2':all.pottedLine?(all.printFormat==0?(ind%6==2?true:false):false):false,'content_mifen3':all.pottedLine?(all.printFormat==0?(ind%6==5?true:false):(ind%3==2?true:false)):false}">
							<div v-for="(item,index) in ele" :key="index" > 
								<div v-if="!item.isShear" class="posi title1" :style="'width:'+ item.infor.font.w+'px;height:'+item.infor.font.h+'px;top:'+item.infor.font.y+'px;left:'+item.infor.font.x+'px;' " @mouseover="subjectAcross(item)" @mouseout="subjectAway(item)"> 
									<div v-html="item.infor.font.content"  :class="{bord:!item.infor.font.showFlag1}"  @click.stop="subjectEditing(item)"  v-if="item.infor.font.showFlag"  style="overflow: hidden;width: 100%;height: 100%;box-sizing: border-box;word-wrap:break-word;color: #F00;"></div>
									<vue-ueditor-wrap :config='myConfig'  v-model="item.infor.font.content" v-if="!item.infor.font.showFlag" style="width:100%;height:100%;margin-top:-60px;"></vue-ueditor-wrap>
									<i  v-show="!item.infor.font.showFlag1"  class="iconfont iconk-i-rese shou" style="position: absolute;font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.infor.font.h-20)+'px;'" @mousedown="drag1($event,item)"></i>
								</div>
								<div v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div v-for="(item2,index2) in item1.arr" :key="index2">
											<div class="posi" :style="'width:'+ item2.w+'px;height:'+ item1.h+'px;top:'+item2.y+'px;left:'+ item2.x+'px;'" >
												<div  class="tu" v-if="item2.img[0].length>0 && !item1.isShear" v-for="(item3,index3) in item2.img[0]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="tu" v-if="item2.img[1].length>0 && item1.isShear" v-for="(item3,index3) in item2.img[1]" :key="index3" :style="'width:'+ item3.w+'px;height:'+ item3.h+'px;top:'+item3.t+'px;left:'+ item3.l+'px;position: absolute;'" >
													<p class="handle handle-tl" @mousedown="img6('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tm" @mousedown="img7('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-tr" @mousedown="img4('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-mr" @mousedown="img8('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-br" @mousedown="img3('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bm" @mousedown="img9('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-bl" @mousedown="img5('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<p class="handle handle-ml" @mousedown="img10('解答题',index,index1,index2,index3,$event,item,item1)"></p>
													<i class="iconfont iconguanbi1" @click="deleteImg('解答题',index2,index3,item,item1)"></i>
													<img :src="item3.src" :ref="index + '-'+index1+'-'+index2+'-'+index3" alt=""  @click.stop="img1('解答题',index,index1,index2,index3,$event)" style="width:100%;height:100%;" @mousedown="img2('解答题',index,index1,index2,index3,$event,item,item1)" > 
												</div>
												<div class="editcogeditoring"  v-html="item2.words[1]" v-if="item1.isShear && item2.bol[1]" @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="editcogeditoring"  v-html="item2.words[0]" v-if="!item1.isShear && item2.bol[0] " @click.stop="jdtpoint(item,item1,index2)">
												</div>
												<div class="operate" v-show="item.bol" v-if="item1.arr.length==1?true:(index2==0?false:true)"> 
													<span  class="posi shou subTopic"  style="right: 187px; top: 1px;" @click="file(item1,item)">插图</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='vertical'}" style="right: 145px; top: -1px;" @click="jdtformat3(item,item1,'竖')">竖排</span> 
													<span v-if="item1.bol1" class="posi shou" :class="{'active':item1.mode =='transverse'}" style="right: 100px; top: -1px;"  @click="jdtformat3(item,item1,'横')">横排</span> 
													<span class="posi shou" style="right: 44px; top: -1px;">编辑</span> 
													<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
												</div>
												<i v-if="item1.arr.length==1?true:(index2==0?false:true)"  v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[1]" v-if="item1.isShear && !item2.bol[1]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
												<vue-ueditor-wrap :config='myConfig'    v-model="item2.words[0]" v-if="!item1.isShear && !item2.bol[0]" style="width:100%;height:100%;" :style="item1.mode=='transverse'?'margin-top:-55px':'margin-top:-32px'"></vue-ueditor-wrap>
											</div>
										</div>
									</div>
								</div>
								<div v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)" >
									<div v-for="(item1,index1) in item.arr" :key="index1">
										<div class="posi" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.y+'px;left:'+ item1.x+'px;'" >
											<div  class="tu" v-if="item1.img[0].length>0 && !item1.isShear" v-for="(item2,index2) in item1.img[0]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'',$event)" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="tu" v-if="item1.img[1].length>0 && item1.isShear" v-for="(item2,index2) in item1.img[1]" :key="index2" :style="'width:'+ item2.w+'px;height:'+ item2.h+'px;top:'+item2.t+'px;left:'+ item2.l+'px;position: absolute;'" >
												<p class="handle handle-tl" @mousedown="img6('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tm" @mousedown="img7('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-tr" @mousedown="img4('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-mr" @mousedown="img8('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-br" @mousedown="img3('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bm" @mousedown="img9('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-bl" @mousedown="img5('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<p class="handle handle-ml" @mousedown="img10('选做题',index,index1,index2,'',$event,item,item1)"></p>
												<i class="iconfont iconguanbi1" @click="deleteImg('选做题',index2,'',item,item1)"></i>
												<img :src="item2.src" :ref="index + '-'+index1+'-'+index2" alt=""  @click.stop="img1('选做题',index,index1,index2,'',$event)" style="width:100%;height:100%;" @mousedown="img2('选做题',index,index1,index2,'',$event,item,item1)" > 
											</div>
											<div class="editcogeditoring"  v-html="item1.words[1]" v-if="item1.isShear && item1.bol[1]" @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="editcogeditoring"  v-html="item1.words[0]" v-if="!item1.isShear && item1.bol[0] " @click.stop="jdtpoint(item,item1,index1)">
											</div>
											<div class="operate" v-show="item.bol" > 
												<span  class="posi shou subTopic"  style="right: 100px; top: 1px;" @click="file(item1,item)">插图</span> 
												<span class="posi shou" style="right: 44px; top: -1px;">编辑</span> 
												<span class="posi shou" style="right: -1px; top: -1px;" @click="delete1(item)">删除</span> 
											</div>
											<i   v-show="item.bol"  class="iconfont iconk-i-rese posi shou" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item1.h-20)+'px;'" @mousedown="drag2(item,item1,$event)"></i>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[1]" v-if="item1.isShear && !item1.bol[1]" style="width:100%;height:100%;margin-top:-32px;" ></vue-ueditor-wrap>
											<vue-ueditor-wrap :config='myConfig'    v-model="item1.words[0]" v-if="!item1.isShear && !item1.bol[0]" style="width:100%;height:100%;margin-top:-32px;" ></vue-ueditor-wrap>
										</div>
									</div>
								</div>
								<div v-if="item.topicArea  &&  (item.questionType == '1' || item.questionType == '2' || item.questionType == '4' )"   @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" @click.stop>
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0 && !item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="tu" v-if="item.topicArea.img[1].length>0 && item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[1]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item,item.topicArea.isShear)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-if="!item.topicArea.isShear && !item.topicArea.bol[0]"  v-model="item.topicArea.words[0]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
										<vue-ueditor-wrap :config='myConfig'  v-if="item.topicArea.isShear && !item.topicArea.bol[1]"  v-model="item.topicArea.words[1]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
								<div v-if="item.topicArea && item.questionType == '3'"   @mouseover="tktmovej(item)" @mouseout="tktmovec(item)" @click.stop>
									<div class="posi" :style="'width:'+ item.topicArea.rect.w+'px;height:'+ item.topicArea.rect.h+'px;top:'+item.topicArea.rect.y+'px;left:'+ item.topicArea.rect.x+'px;'" >
										<div class="tu" v-if="item.topicArea.img[0].length>0 && !item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[0]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="tu" v-if="item.topicArea.img[1].length>0 && item.topicArea.isShear" v-for="(item1,index1) in item.topicArea.img[1]" :key="index1" :style="'width:'+ item1.w+'px;height:'+ item1.h+'px;top:'+item1.t+'px;left:'+ item1.l+'px;position: absolute;'" >
											<p class="handle handle-tl" @mousedown="img6('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tm" @mousedown="img7('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-tr" @mousedown="img4('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-mr" @mousedown="img8('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-br" @mousedown="img3('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bm" @mousedown="img9('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-bl" @mousedown="img5('客观题',index,index1,'','',$event,item,item1)"></p>
											<p class="handle handle-ml" @mousedown="img10('客观题',index,index1,'','',$event,item,item1)"></p>
											<i class="iconfont iconguanbi1" @click="deleteImg('客观题',index1,'',item,item1)"></i>
											<img :src="item1.src" :ref="index + '-'+index1" alt=""  @click.stop="img1('客观题',index,index1,'','',$event)" style="width:100%;height:100%;" @mousedown="img2('客观题',index,index1,'','',$event,item,'')" > 
										</div>
										<div class="editcogeditoring"  v-html="item.topicArea.isShear?item.topicArea.words[1]:item.topicArea.words[0]" v-if="item.topicArea.isShear?item.topicArea.bol[1]:item.topicArea.bol[0]" @click.stop="tgqpoint(item,item.topicArea.isShear)">
										</div>
										<div class="operate" v-show="item.bol" > 
											<span  class="posi shou subTopic"  style="right: 1px; top: 1px;" @click="file('',item)">插图</span> 
										</div>
										<i  v-show="item.bol"  class="iconfont iconk-i-rese posi" style="font-size:20px;width:20px;height:20px;right:0;" :style="'top:'+(item.topicArea.rect.h-20)+'px;'" @mousedown="drag3(item,$event)"></i>
										<vue-ueditor-wrap :config='myConfig'  v-if="!item.topicArea.isShear && !item.topicArea.bol[0]"  v-model="item.topicArea.words[0]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
										<vue-ueditor-wrap :config='myConfig'  v-if="item.topicArea.isShear && !item.topicArea.bol[1]"  v-model="item.topicArea.words[1]"  style="width:100%;height:100%;margin-top:-32px;"></vue-ueditor-wrap>
									</div>
								</div>
							</div>
							<div class="page-info-show" v-if="!all.pottedLine  &&   all.printFormat==0  &&  all.showPageInfo" v-show="ind%2==1" >班级<span></span>姓名<span></span></div>
							<div class="foot-page">第{{parseInt((ind+4)/3)}}页-{{ind%3==0?2:ind%3==1?3:1}}</div>
						</div>
						<svg class="svg2" :class="{'svg2_mifen':all.pottedLine?false:(ind%3 ==2?false:true),'svg2_mifen1':all.pottedLine?((ind%3 == 0 || ind%3 == 1)? true:false ):false,'svg2_mifen2':all.pottedLine?(all.printFormat==0?(ind%6==2?true:false):false):false,'svg2_mifen3':all.pottedLine?(all.printFormat==0?(ind%6==5?true:false):(ind%3==2?true:false)):false}" height="1072" version="1.1">
							<defs>
								<g id="rowdown">
									<path d="M26,14.9500205 L39,14.9500205 L39,16 L26,16 L26,14.9500205 Z M26,10.2999795 L36,10.2999795 L36,11.349959 L26,11.349959 L26,10.2999795 Z M26,6.09997949 L31,6.09997949 L31,7.15004102 L26,7.15004102 L26,6.09997949 Z M37.9285041,11.349959 L37.9285041,7.15004102 L34.713912,7.15004102 L34.713912,9.24999999 L31.4993198,6.62500001 L34.713912,4 L34.713912,6.09995899 L39,6.09995899 L39,11.349959 L37.9285041,11.349959 Z" id="" fill="#FFFFFF"></path>
								</g> 
								<g id="rowadd">
									<path d="M4,5 L17,5 L17,6.13333333 L4,6.13333333 L4,5 Z M4,9.06666667 L14,9.06666667 L14,10.2 L4,10.2 L4,9.06666667 Z M4,13.6 L9,13.6 L9,14.7333333 L4,14.7333333 L4,13.6 Z M15.9285714,9.06666667 L17,9.06666667 L17,13.6 L17,14.7333333 L15.9285714,14.7333333 L12.7142857,14.7333333 L12.7142857,17 L9.5,14.1666667 L12.7142857,11.3333333 L12.7142857,13.6 L15.9285714,13.6 L15.9285714,9.06666667 Z" id="Combined-Shape" fill="#FFFFFF"></path>
								</g>
							</defs>
							<rect x="11" y="10" stroke="#f00" :width="all.rect.w" height="1011" rx="5" stroke-width="2" fill="none" fill-rule="evenodd"></rect>
							<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="25">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
							<text font-size="14" line-spacing="8" fill="#f00" :x="all.rect.w/2-206.5" y="1015">请在各科目的答题区域内作答，超出黑色矩形边框限定区域的答案无效</text>
							<g v-for="(item,index) in ele" :key="index" >
								<g @mouseover="kgtmovej(item)" @mouseout="kgtmovec(item)" v-if="item.questionType == '1' || item.questionType == '2' || item.questionType == '4' ">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<line v-if="item.topicArea" :x1="item.topicArea.rect.x" :y1="item.topicArea.rect.y" :x2="item.topicArea.rect.x+item.topicArea.rect.w" :y2="item.topicArea.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" stroke-width="1" class="colorchange"></line>
									<g v-if="!item.topicArea || !item.topicArea.isShear">
										<g v-for="(item1,index1) in item.arr" :key="index1" >
											<g v-for="(item2,index2) in item1" :key="index2">
												<text font-size="11" line-spacing="8" fill="#212121" :x="item2.num.x" :y="item2.num.y" :style="all.existVerticalRow?'text-anchor: middle;':'text-anchor: end;'">{{item2.num.content}}</text> 
												<g v-for="(item3,index3) in item2.options" :key="index3">
													<rect :x="item3.rectx" :y="item3.recty" width="16.5" height="10" style="fill-opacity: 0; stroke-width: 0.5; stroke: rgb(33, 33, 33);"></rect> 
													<rect v-if="halfFrame" :x="item3.rectx+3" :y="item3.recty-1" width="10.5" height="12" style="" fill="#fff"></rect>
													<text font-size="9" line-spacing="8" fill="#212121" :x="item3.fontx" :y="item3.fonty">{{item3.content}}</text>
												</g>
											</g>
										</g>
										<g v-if="item.number" v-show="item.bol" >
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect> 
											<text	@click="delete1(item)" class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" @click="kgtedit(item)" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="84" height="20" :x="item.infor.rect.x+item.infor.rect.w-250" :y="item.infor.rect.y"></rect>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-247" :y="item.infor.rect.y+15">每组题目数</text> 
											<rect fill="#fff" stroke="#00A9F6"    width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-114" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" @click="add(item)" :x="item.infor.rect.x+item.infor.rect.w-108" :y="item.infor.rect.y+17">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y"></rect> 
											<text font-size="16" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-126" :y="item.infor.rect.y+16" style="text-anchor: middle;">{{item.perGroup}}</text>
											<rect fill="#fff" stroke="#00A9F6"   width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-166" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" @click="jian(item)" :x="item.infor.rect.x+item.infor.rect.w-162" :y="item.infor.rect.y+17" >—</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '3'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<text font-size="12"  fill="#4A4A4A" :x="item1.font.x" :y="item1.font.y" >{{item1.content}}</text> 
										<line :x1="item1.rect.x" :y1="item1.rect.y" :x2="item1.rect.x + item1.size" stroke-width="1" :y2="item1.rect.y" stroke="#666"  ></line>
										<g v-if="item.bol1" v-show="item1.content">
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+2" :y="item1.rect.y-22" @click="lineFeed(item,item1)"></rect>
											<use xlink:href="#rowadd" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeed(item,item1)"></use>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+23" :y="item1.rect.y-22" @click="lineFeedNo(item,item1)"></rect>
											<use xlink:href="#rowdown" :x="item1.rect.x+2" :y="item1.rect.y-22" class="shou" @click="lineFeedNo(item,item1)"></use>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+44" :y="item1.rect.y-22"  @click="addchang(item,item1)"></rect>
											<text class="shou" font-size="24" fill="#fff" :x="item1.rect.x+47" :y="item1.rect.y-4" @click="addchang(item,item1)">+</text>
											<rect class="shou" fill="#4D4D4D" stroke="#4D4D4D" width="20" height="20" :x="item1.rect.x+65" :y="item1.rect.y-22" @click="jianchang(item,item1)"></rect>
											<rect class="shou"  fill="#FFFFFF" :x="item1.rect.x+70" :y="item1.rect.y-12" width="12" height="1.5" @click="jianchang(item,item1)"></rect>
										</g>
									</g>
									<g v-if="!item.topicArea || !item.topicArea.isShear">
										<g v-if="item.number" v-show="item.bol" >
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-44" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-36" :y="item.infor.rect.y+15" @click="delete1(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-88" :y="item.infor.rect.y"></rect> 
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-80" :y="item.infor.rect.y+15" @click="tktedit(item)">编辑</text>
											<rect  fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w-128" :y="item.infor.rect.y"></rect>
											<text class="shou" font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-120" :y="item.infor.rect.y+15" @click="formatAdjustment(item)">调整</text>
										</g>
										<g v-if="item.number" v-show="item.bol1">
											<rect class="shou" @click="formatAdjustment1(item)" fill="#fff" stroke="#fff" width="24" height="24" :x="item.infor.rect.x+item.infor.rect.w-24" :y="item.infor.rect.y-14"></rect>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y-10" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y+6" stroke="#4a4a4a" stroke-width="2"></line>
											<line class="shou" @click="formatAdjustment1(item)" :x1="item.infor.rect.x+item.infor.rect.w-20" :y1="item.infor.rect.y+6" :x2="item.infor.rect.x+item.infor.rect.w-4" :y2="item.infor.rect.y-10" stroke="#666" stroke-width="2"></line>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-55" :y="item.infor.rect.y-10"></rect>
											<text  class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-50" :y="item.infor.rect.y+6" @click="addLineHeight(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-81" :y="item.infor.rect.y-10"></rect>
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w-68" :y="item.infor.rect.y+6" style="text-anchor: middle;">{{item.lineHeight}}</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w-107" :y="item.infor.rect.y-10"></rect> 
											<text  class="shou"  font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w-104" :y="item.infor.rect.y+6" @click="reduceLineHeight(item)">—</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w-140" :y="item.infor.rect.y+5">行高</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '13'" @mouseover="jdtmovej(item)" @mouseout="jdtmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<g v-for="(item2,index2) in item1.arr" :key="index2">
											<rect :x="item2.x" :y="item2.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item2.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '15'" @mouseover="xztmovej(item)" @mouseout="xztmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<rect :x="item1.x" :y="item1.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item1.w" :height="item1.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<g v-for="(item2,index2) in item1.num" :key="index2" v-if="!item1.isShear">
											<rect :x="191+index2*50" :y="item1.y+12" stroke="#4A4A4A" width="17" height="10" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<text font-size="11" fill="#4A4A4A" :x="185+index2*50" :y="item1.y+21" style="text-anchor: end;">{{item2.content}}</text>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '14'" @mouseover="tktmovej(item)" @mouseout="tktmovec(item)">
									<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
									<g v-for="(item1,index1) in item.arr" :key="index1">
										<line :x1="item1.line.x1" :y1="item1.line.y1" :x2="item1.line.x2" :y2="item1.line.y2" :stroke="item.bol?'#00A9F6':item.bol1?'#00A9F6':'#4A4A4A'" stroke-width="1" ></line>
										<text v-if="!item1.isShear" font-size="12" fill="#4A4A4A" :x="item1.num.x" :y="item1.num.y">{{item1.num.content}}.({{item1.score}}分)</text>
										<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi == 'square'">
											<rect :x="item2.x" :y="item2.y" stroke="#4A4A4A" :width="item2.w" :height="item2.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
											<text v-if="item2.i%100 == 0"  font-size="10" fill="#4A4A4A" :x="item2.x+item2.w" :y="item2.y+item2.h+5" style="text-anchor: end;">{{item2.i}}</text>
										</g>
										<g v-for="(item2,index2) in item1.arr" :key="index2" v-if="item1.fangshi != 'square'">
											<line :x1="item2.x1" :y1="item2.y1" :x2="item2.x2" :y2="item2.y2" stroke="#666" stroke-width="1"></line>
										</g>
										<g v-show="item.bol">
											<g v-if="item1.fangshi == 'square'?true:(item1.isShear?false:true)">
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-44" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2 -36 "  :y="item1.line.y1+15" @click="delete1(item)"  class="shou">删除</text>
												<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item1.line.x2-88" :y="item1.line.y1"></rect>
												<text font-size="14" fill="#00A9F6" :x="item1.line.x2-80" :y="item1.line.y1+15"  class="shou" @click="zwtedit(item)">编辑</text>
											</g>
											<g v-show="item1.fangshi != 'square'">
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-30" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-24" :y="item1.num.y+36" @click="zwtformat1(item,item1,'加')">+</text>
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-56" :y="item1.num.y+20"></rect> 
												<text  font-size="16" fill="#4a4a4a" :x="item1.line.x2-43" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowNumber}}</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-82" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-79" :y="item1.num.y+36" @click="zwtformat1(item,item1,'减')">—</text>
												<text  font-size="14" fill="#4A4A4A" :x="item1.line.x2-117" :y="item1.num.y+35">行数</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-150" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="24" fill="#00A9F6" :x="item1.line.x2-144" :y="item1.num.y+36" @click="zwtformat2(item,item1,'加')">+</text>
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-176" :y="item1.num.y+20"></rect> 
												<text font-size="16" fill="#4a4a4a" :x="item1.line.x2-163" :y="item1.num.y+36" style="text-anchor: middle;">{{item1.rowHeight}}</text> 
												<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item1.line.x2-202" :y="item1.num.y+20"></rect> 
												<text class="shou" font-size="20" fill="#00A9F6" :x="item1.line.x2-199" :y="item1.num.y+36" @click="zwtformat2(item,item1,'减')">—</text>
												<text font-size="14" fill="#4A4A4A" :x="item1.line.x2-237" :y="item1.num.y+35">行高</text>
											</g>
										</g>
									</g>
								</g>
								<g v-if="item.questionType == '16'" @mouseover="jdumovej(item)" @mouseout="jdumovec(item)">
									<g>
										<rect :x="item.infor.rect.x" :y="item.infor.rect.y" :stroke="item.bol?'#00A9F6':'#4A4A4A'" :width="item.infor.rect.w" :height="item.infor.rect.h" stroke-width="1" fill="#fff" fill-rule="evenodd"></rect>
										<line :x1="item.infor.rect.x" :y1="item.infor.rect.y" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y+item.infor.rect.h" stroke="#979797" stroke-width="1"></line>
										<line :x1="item.infor.rect.x" :y1="item.infor.rect.y+item.infor.rect.h" :x2="item.infor.rect.x+item.infor.rect.w" :y2="item.infor.rect.y" stroke="#979797" stroke-width="1"></line>
										<text font-size="24" fill="#4A4A4A" x="257.5" :y="9+item.infor.rect.h/2+item.infor.rect.y">禁止在此区域作答</text>
									</g>
									<g v-show="item.bol" >
										<rect @mouseover="jdumovej(item)" fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 44" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 36" :y="item.infor.rect.y+21" @click="deletejdq(item)">删除</text>
											<rect fill="#fff" stroke="#00A9F6" width="44" height="20" :x="item.infor.rect.x+item.infor.rect.w - 88" :y="item.infor.rect.y+5"></rect> 
											<text class="shou"  font-size="14" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 80" :y="item.infor.rect.y+21" @click="jdqedit(item)">编辑</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 120" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="24" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 114" :y="item.infor.rect.y+21" @click="jdqjia(item)">+</text>
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 146" :y="item.infor.rect.y+5"></rect> 
											<text font-size="16" fill="#4a4a4a" :x="item.infor.rect.x+item.infor.rect.w - 133" :y="item.infor.rect.y+21" style="text-anchor: middle;">{{item.rowNumber}}</text> 
											<rect fill="#fff" stroke="#00A9F6" width="26" height="20" :x="item.infor.rect.x+item.infor.rect.w - 172" :y="item.infor.rect.y+5"></rect> 
											<text class="shou" font-size="20" fill="#00A9F6" :x="item.infor.rect.x+item.infor.rect.w - 169" :y="item.infor.rect.y+21" @click="jdqjian(item)"> —</text>
											<text font-size="14" fill="#4A4A4A" :x="item.infor.rect.x+item.infor.rect.w - 207" :y="item.infor.rect.y+20">行数</text>
									</g>
								</g>
							</g>
						</svg>
					</div>	
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.basicInfor.isShow">
				<div class="hide"></div>
				<div class="con xinxi">
					<div class="ivu-modal-header">
						<div class="ivu-modal-header-inner">设置学生信息</div>
					</div>
					<div class="ivu-modal-body clearfix">
						<label :for="'basicInfor' + index" v-for="(item, index) in bounced.basicInfor.arr" :key="index" class="fl">
							<input type="checkbox" v-model="item.bol" :id="'basicInfor' + index" />
							<span>{{ item.name }}</span>
						</label>
					</div>
					<div class="ivu-modal-footer">
						<button @click="basicInforCancel">取消</button>
						<button @click="basicInforConfirm">确定</button>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.numberFormat.isShow">
				<div class="hide"></div>
				<div class="con kaoshihao">
					<div class="ivu-modal-header">
						<div class="ivu-modal-header-inner">设置考试号</div>
					</div>
					<div class="ivu-modal-body ">
						<p>
							考试号位数
							<input type="text" maxlength="2" v-model="bounced.numberFormat.num1" @input="numberFormat"/>
							<span>支持4~12位考试号</span>
						</p>
					</div>
					<div class="ivu-modal-footer">
						<button @click="numberFormatCancel">取消</button>
						<button @click="numberFormatConfirm">确定</button>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.addObjective.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt">
					<div class="ivu-modal-header">
						<p>新增客观题</p>
					</div>
					<div class="ivu-modal-body">
						<div class="nav">
							<span>大题题号</span>
							<select name="" id="" v-model="bounced.addObjective.titleNumber">
								<option v-for="(item,index) in _arr" :key="index" :value="item" v-if="bounced.addObjective.type == 'add'?true:(index==0?false:true)">{{item}}</option>
							</select>
							<span>大题题型</span>
							<select name="" id="" v-model="bounced.addObjective.questionType" @change="xzkgttx">
								<option value="" disabled selected hidden>请选择</option>
								<option value="2">单选题</option>
								<option value="4">多选题</option>
								<option value="1">判断题</option>
							</select>
						</div>
						<div class="body">
							<div v-for="(item,index) in bounced.addObjective.choiceQuestions" :key="index">
								<div class="clearfix choiceQuestions" v-if="bounced.addObjective.questionType != ''">
									<p class="fl"><span>共</span><input type="text" v-model="item.number" @blur="xzduonum(index)" maxlength="2" @input="xzduonum1(item)"><span>题</span></p>
									<p class="fl"><span>每题</span><input :disabled="item.itemAssignment" type="text" v-model="item.score" @blur="xzduoScore(index)" maxlength="3" @input="xzduoScore1(item)"><span>分</span></p>
									<p class="fl" v-if="bounced.addObjective.questionType == '4'"><span>漏选的</span><input :disabled="item.itemAssignment" type="text" v-model="item.missedScore" @blur="xzduoMissed(index)" @input="xzduoMissed1(item)"><span>分</span></p>
									<p class="fl"><label><input type="checkbox" v-model="item.itemAssignment" @click="kgtSetPoints(index)"><span>单题设分</span></label></p>
									<p class="fl" v-if="bounced.addObjective.questionType != '1'"><span>每题</span><input type="text" :disabled="item.itemSetting" maxlength="2" @blur="xzduooption(index)" v-model="item.option" @input="xzduooption1(item)"><span>个选项</span></p>
									<p class="fl" v-if="bounced.addObjective.questionType != '1'"><label><input type="checkbox" @click="kgtSetItem(index)" v-model="item.itemSetting"><span>单题设项</span></label></p>
									<p class="fr" @click="deletekgt1(index)">删除</p>
								</div>
								<div class="clearfix duoxuan" v-if="item.arr.length>0">
									<p class="fl" v-for="(item1,index1) in item.arr" :key="index1">
										<span>{{item1.num}}.</span>
										<span><input type="text"  v-model="item1.score" :disabled="!item.itemAssignment" maxlength="2" @input="scoreChecking(item1)">分</span>
										<span><input type="text" v-model="item1.option" :disabled="!item.itemSetting" maxlength="1"  @input="optionChecking(item1)">个选项</span>
										<span v-if="bounced.addObjective.questionType == '4'">漏选得<input type="text"  v-model="item1.missedScore" maxlength="2"  @input="missedScoreChecking(item1)" :disabled="!item.itemAssignment">分</span>
										<span @click="deletekgt(index,index1)">删除</span>
									</p>
								</div>
							</div>
							<div class="shou addTitle" @click="addTitle('客观题')">+添加题目</div>
						</div>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="xzkgtshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="xzkgtconfirm" :disabled="!xzkgt">
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.addCompletion.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt wd_xztkt ">
					<div class="ivu-modal-header"><p>新增填空题</p></div>
					<div class="ivu-modal-body">
						<div class="nav">
							<span>大题题号</span>
							<select name="" id="" v-model="bounced.addCompletion.titleNumber">
								<option v-for="(item,index) in _arr" :key="index" :value="item" v-if="bounced.addCompletion.type == 'add'?true:(index==0?false:true)">{{item}}</option>
							</select>
						</div>
						<div class="body">
							<div v-for="(item,index) in bounced.addCompletion.choiceQuestions" :key="index">
								<div class="clearfix choiceQuestions" >
									<p class="fl"><span>共</span><input type="text" v-model="item.number" maxlength="2" @blur="xztktnum(index)" @input="xztktnum1(item)"><span>题</span></p>
									<p class="fl"><span>每题</span><input :disabled="item.itemAssignment" type="text" maxlength="2" v-model="item.score" @blur="xztktScore(index)" @input="xztktScore1(item)"><span>分</span></p>
									<p class="fl"><label><input type="checkbox" v-model="item.itemAssignment" @click="tktSetPoints(index)"><span>单题设分</span></label></p>
									<p class="fl"><span>每行显示</span><input type="text"     maxlength="1" @input="xztktoption(item)"  v-model="item.option" ><span>空(1~5)</span></p>
									<p class="fr shou" @click="deletetkt1(index)">删除</p>
								</div>
								<div class="clearfix tiankong" v-if="item.arr.length>0">
									<p class="fl clearfix" v-for="(item1,index1) in item.arr" :key="index1">
										<span class="fl">{{item1.num}}.</span>
										<span class="fl"><input type="text"  v-model="item1.score" :disabled="!item.itemAssignment" @input="scoreChecking(item1)">分</span>
										<span class="fl">小问数<input type="text" v-model="item1.number" @blur="tktxiaowenshu(item1,index,index1)" maxlength="2"  @input="numberChecking(item1)">个</span>
										<span class="fl wenshu1" v-if="item1.arr.length>0">每问分值</span>
										<span class="wenshu fl" v-if="item1.arr.length>0"><input type="text" v-for="(item2,index2) in item1.arr" :key="index2" maxlength="2" v-model="item2.score"  @input="scoreChecking(item2)"></span>
										<span  class="fl "><label><input type="checkbox" v-model="item1.longBlank">长空</label></span>
										<span  class="fr" @click="deletetkt(index,index1)">删除</span>
									</p>
								</div>
							</div>
							<div class="shou addTitle" @click="addTitle('填空题')">+添加题目</div>
						</div>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="xztktshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="xztktconfirm" :disabled="!xztkt">
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.addAnswer.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt  wd_xzjdt">
					<div class="ivu-modal-header"><p>新增解答题</p></div>
					<div class="ivu-modal-body">
						<div class="nav">
							<span>大题题号</span>
							<select name="" id="" v-model="bounced.addAnswer.titleNumber">
								<option v-for="(item,index) in _arr" :key="index" :value="item" v-if="bounced.addAnswer.type == 'add'?true:(index==0?false:true)">{{item}}</option>
							</select>
						</div>
						<div class="body">
							<div v-for="(item,index) in bounced.addAnswer.choiceQuestions" :key="index">
								<div class="clearfix choiceQuestions" >
									<p class="fl"><span>共</span><input type="text" v-model="item.number" maxlength="2" @blur="xzjdtnum(index)" @input="xzjdtnum1(item)"><span>题</span></p>
									<p class="fl"><span>每题</span><input :disabled="item.itemAssignment" type="text" v-model="item.score" maxlength="2" @blur="xzjdtScore(index)" @input="xzjdtScore1(item)"><span>分</span></p>
									<p class="fl"><label><input type="checkbox" v-model="item.itemAssignment" @click="jdtSetPoints(index)"><span>单题设分</span></label></p>
									<!-- <p class="fl"><input type="checkbox" v-model="item.answerLine" ><span>生成答题线</span></p> -->
									<p class="fr shou" @click="deletejdt1(index)">删除</p>
								</div>
								<div class="clearfix  jieda" v-if="item.arr.length>0">
									<p class="fl clearfix" v-for="(item1,index1) in item.arr" :key="index1">
										<span class="fl">{{item1.num}}.</span>
										<span class="fl"><input type="text"  v-model="item1.score" :disabled="!item.itemAssignment" maxlength="2" @input="scoreChecking(item1)">分</span>
										<span class="fl">小问数<input type="text" v-model="item1.number" @blur="jdtxiaowenshu(item1,index,index1)" maxlength="2" @input="numberChecking(item1)">个</span>
										<span class="fl wenshu1" v-if="item1.arr.length>0">每问分值</span>
										<span class="wenshu fl" v-if="item1.arr.length>0"><input type="text" v-for="(item2,index2) in item1.arr" :key="index2" v-model="item1.arr[index2].score" maxlength="2" @input="scoreChecking(item2)"></span>
										<span class="fl smallQuestionsShow"><label><input type="checkbox" name="" id="" v-model="item1.smallQuestionsShow">是否分开小题</label></span>
										<span  class="fr" @click="deletejdt(index1,index)">删除</span>
									</p>
								</div>
							</div>
							<div class="shou addTitle" @click="addTitle('解答题')">+添加题目</div>
						</div>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="xzjdtshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="xzjdtconfirm" :disabled="!xzjdt">
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.addComposition.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt wd_xzzwt">
					<div class="ivu-modal-header"><p>新增作文题</p></div>
					<div class="ivu-modal-body">
						<div class="nav">
							<span>大题题号</span>
							<select name="" id="" v-model="bounced.addComposition.titleNumber">
								<option v-for="(item,index) in _arr" :key="index" :value="item" v-if="bounced.addComposition.type == 'add'?true:(index==0?false:true)">{{item}}</option>
							</select>
						</div>
						<div class="body">
							<div v-for="(item,index) in bounced.addComposition.choiceQuestions" :key="index">
								<div class="clearfix choiceQuestions" >
									<p class="fl"><span>共</span><input type="text" v-model="item.number" @blur="xzzwtnum(index)" maxlength="1" @input="xzzwtnum1(item)"><span>题</span></p>
									<p></p>
								</div>
								<div class="clearfix zuowen" v-if="item.arr.length>0">
									<p class="fl clearfix" v-for="(item1,index1) in item.arr" :key="index1">
										<span class="fl">{{item1.num}}.</span>
										<span class="fl"><input type="text"  v-model="item1.score" maxlength="2" @input="scoreChecking(item1)">分</span>
										<span class="fl">作答显示方式</span>
										<span class="fl"><label ><input type="radio" :name="'fangshi'+index1" v-model="item1.fangshi" value="Line">横线</label></span>
										<span class="fl"><label ><input type="radio" :name="'fangshi'+index1" v-model="item1.fangshi" value="square">方格</label></span>
										<span class="fl" v-if="item1.fangshi=='square'">共<input type="text"   v-model="item1.wordNumber" maxlength="4"  @input="wordNumberChecking(item1)">字</span>
										<span class="fl" v-if="item1.fangshi=='square'">每行<input type="text"   v-model="item1.wordNumberLine" maxlength="2"  @input="wordNumberLineChecking(item1)" @blur="wordNumberLine(item1)">字 <font> (限每行15~25字)</font></span>
										<span  class="fr" @click="deletezwt(index,index1)">删除</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="xzzwtshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="xzzwtconfirm" :disabled="!xzzwt">
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.insertPictur.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt wd_crtp">
					<div class="ivu-modal-header"><p>插入图片</p></div>
					<div class="ivu-modal-body">
						<p>
							<span>横排插入图片时，请选择插入区域</span>
							<span><label><input type="radio" name="" id="" value="left" v-model="bounced.insertPictur.region">左边</label></span>
							<span><label><input type="radio" name="" id="" value="right" v-model="bounced.insertPictur.region">右边</label></span>
						</p>
						
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="crtpshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="crtpconfirm" >
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.addOptional.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt wd_xzjdt">
					<div class="ivu-modal-header"><p>新增选做题</p></div>
					<div class="ivu-modal-body">
						<div class="nav">
							<span>大题题号</span>
							<select name="" id="" v-model="bounced.addOptional.titleNumber">
								<option v-for="(item,index) in _arr" :key="index" :value="item" v-if="bounced.addComposition.type == 'add'?true:(index==0?false:true)">{{item}}</option>
							</select>
						</div>
						<div class="body">
							<div v-for="(item,index) in bounced.addOptional.choiceQuestions" :key="index">
								<div class="clearfix choiceQuestions" >
									<p class="fl"><span>共</span><input type="text" v-model="item.number" @blur="xzxztnum(index)" maxlength="1" @input="numberChecking(item)"><span>题</span></p>
									<p class="fl"><span>选做数量</span><input type="text" v-model="item.number1" @input="number1Checking(item)" ></p>
									<p class="fl"><span>每题</span><input type="text" v-model="item.score" @blur="xzxztScore(index)" @input="scoreChecking(item)"><span>分</span></p>
									<p class="fl"><span>最多只能五题</span></p>
									<p class="fr shou" @click="deletexzt1(index)">删除</p>
								</div>
								<div class="clearfix jieda" v-if="item.arr.length>0">
									<p class="fl clearfix" v-for="(item1,index1) in item.arr" :key="index1">
										<span class="fl">{{item1.num}}.</span>
										<span class="fl"><input type="text"  v-model="item1.score" disabled>分</span>
										<span  class="fr" @click="deletexzt(index,index1)">删除</span>
									</p>
								</div>
							</div>
							<div class="shou addTitle" @click="addTitle('选做题')">+添加题目</div>
						</div>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="xzxztshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="xzxztconfirm" :disabled="!xzxzt">
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.topicArea.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt wd_xztgq">
					<div class="ivu-modal-header"><p>添加题干区</p></div>
					<div class="ivu-modal-body">
						<p>
							<span>请选择需要显示题干的大题：</span>
						</p>
						<p v-if="bounced.topicArea.arr.length ==0">暂无可选大题</p>
						<p v-if="bounced.topicArea.arr.length>0"> 
							<label v-for="(item,index) in bounced.topicArea.arr" :key="index" :for="'a'+index">
								<input type="checkbox" name="" :id="'a'+index" v-model="item.bol">
								<span>{{item.number}}、{{item.title}}</span>
							</label>
						</p>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="tgqshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="tgqconfirm" >
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.noAnswerZone.isShow">
				<div class="hide"></div>
				<div class=" wd_xzkgt wd_xzjdq">
					<div class="ivu-modal-header"><p>新增禁答区</p></div>
					<div class="ivu-modal-body clearfix">
						<p class="fl">
							<span>行数</span>
							<input type="text" maxlength="2" v-model="bounced.noAnswerZone.rowNumber" @input="rowNumberChecking(bounced.noAnswerZone)">
						</p>
						<p class="fl">
							<span>添加到</span>	
							<select  v-model="bounced.noAnswerZone.titleNumber">
								<option v-for="(item,index) in _arr" :key="index" :value="item" v-if="index != 0">{{item}}</option>
								<option value="" v-if="_arr.length ==1">暂无匹配数据</option>
							</select>
							<span>之后</span>
						</p>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="xzjdqshow1">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="xzjdqconfirm" :disabled="!xzjdq">
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box" v-if="bounced.chooseTest.bol">
				<div class="hide"></div>
				<div class="wd_volumeCard">
					<div class="ivu-modal-header"><p>选择试卷</p></div>
					<div class="ivu-modal-body clearfix">
						<div class="fl left">
							<div v-for="(item,index) in bounced.chooseTest.testPaper" :key="index">
								<h3 @click="selectiveGrade(index)" :class="{active:bounced.chooseTest.gradeNum == index}">{{item.gradeName}}</h3>
								<div class="ceping" v-if="bounced.chooseTest.gradeNum == index">
									<p v-for="(item1,index1) in item.arr" :key="index1" :class="{active:bounced.chooseTest.evaluateNum == index1}" @click="choiceExamination(index1)">{{item1.remarks}}</p>
								</div>
							</div>
						</div>
						<div class="fl right">
							<div class="state1" v-if="bounced.chooseTest.gradeNum == -1">
								请在左侧列表选择对应类型后查看
							</div>
							<div class="state1" v-if="bounced.chooseTest.questionsList.lenght == 0">
								该类型下暂无数据
							</div>
							<div v-if="bounced.chooseTest.questionsList.length >0">
								<table>
									<tr>
										<td></td>
										<td>作业名称</td>
										<td>年级</td>
										<td>作者</td>
										<td>创建时间</td>
										<td>试题数量</td>
									</tr>
									<tr v-for="(item,index) in bounced.chooseTest.questionsList" :key="index">
										<td>
											<input type="checkbox" name="" id="" v-model="item.bol" @click="election(index)">
										</td>
										<td>{{item.remarks}}</td>
										<td>{{item.termName}}</td>
										<td>{{item.updateBy}}</td>
										<td>{{item.createDate}}</td>
										<td>{{item.quzCount}}</td>
									</tr>
								</table>								
							</div>
						</div>
					</div>
					<div class="ivu-modal-footer">
						<div>
							<button type="button" class="cancel" @click="testCancel">
								<span>取消</span>
							</button>
							<button type="button" class="confirm" @click="testConfirm" >
								<span>确定</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="prompt_box public_box timing_box" v-show="bounced.timingBox.open">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="main_cont">
		                <i class="iconfont iconduihao2 success" v-show="bounced.timingBox.type == 'success'"></i>
		                <i class="iconfont iconcuowu fail" v-show="bounced.timingBox.type == 'fail'"></i>
		                <p>{{bounced.timingBox.tipWord}}</p>
		            </div>
		        </div> 
		    </div>
		</div>
	</div>
</template>
<script>
	import answerCard1 from "../../../assets/js/answerCard1"
	export default {
		...answerCard1
	}
</script>
<style lang="" scoped>
    .prohibit{
		pointer-events: none;
	}
	.wd_header{
		width: 100%;
		height:40px;
		position: fixed;
		top:0;
		background:#5093e1;
		z-index: 99;
		line-height: 40px;
	}
	.wd_header p{
		font-size:16px;
		color:#fff;
		text-align: center;
		font-weight: 700;
	} 
	.wd_header div{
		width:200px;
		position:absolute;
		left: 20px;
		font-size:14px;
		color:#fff;
		font-weight: 700;
	}
	.wd_header div span{
		margin-right: 10px;
	}
	.wd_header div span:nth-child(2){
		cursor: pointer;
	}
	.wd_header div .iconfanhui1{
		font-size: 14px;
		cursor: pointer;
	} 
	.wd_answer {
		width: 100%;
		margin: 50px auto 0;
		box-sizing: border-box;
		overflow-x: hidden;
	}
	
	.wd_answer .shou {
		cursor: pointer;
	}
	 
	
	.wd_answer .wd_left {
		width: 180px;
		height: 800px;
		overflow: hidden;
		background: #fff;
		font-size: 16px;
	}
	.wd_answer .wd_left>div{
		width: 193px;
		overflow: auto;
		overflow-x: hidden;
		height: 800px;
	}
	
	.wd_answer .wd_left .title {
		line-height: 55px;
		padding-left: 15px;
		font-weight: 600;
		background: #fff;
	}
	
	.wd_answer .wd_left .total-score {
		line-height: 40px;
		padding-left: 15px;
		background: #eef1f6;
	}
	
	.wd_answer .wd_left .main {
		width: 180px;
		box-sizing: border-box;
		padding: 10px;
	}
	.wd_answer .wd_left h3{
		font-size:16px ;
		padding: 10px 0 ;
		font-weight: 700;
	}
	.wd_answer .wd_left p {
		padding: 5px 0 ;
		border-bottom:1px dashed   #333 ;
	}
	.wd_answer .wd_right {
		width: 275px;
		background: #fff;
		border-radius: 5px;
	}
	
	.wd_answer .wd_right .title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20px;
		height: 40px;
		background: #5093e1;
		color: #fff;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		line-height: 40px;
		font-size: 15px;
	}
	
	.wd_answer .wd_right .title span:last-child {
		font-size: 25px;
	}
	.wd_answer .wd_right .volumeCard{
		width: 100%;
		padding: 10px 15px 15px;
		box-sizing: border-box;
	}
	.wd_answer .wd_right .volumeCard span{
		cursor: pointer;
		color: #5093e1;
	}
	.wd_answer .wd_right .volumeCard p{
		margin-top: 10px;
	}
	.wd_answer .wd_right .scantron{
		width: 100%;
		box-sizing: border-box;
		padding: 10px 15px 0;
	}
	.wd_answer .wd_right .scantron  label{
		cursor: pointer;
	}
	.wd_answer .wd_right .question_types {
		width: 100%;
		height: 60px;
		line-height: 60px;
		font-size: 15px;
		margin-left: 20px;
		position: relative;
	}
	
	.wd_answer .wd_right .question_types div:nth-child(2) {
		border: 1px solid #ddd;
		width: 209px;
		height: 30px;
		box-sizing: border-box;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		border-radius: 3px;
		position: absolute;
		top: 13px;
		left: 35px;
		cursor: pointer;
	}
	
	.wd_answer .wd_right .question_types div:nth-child(2) p {
		border: 6px solid transparent;
		border-top-color: #000;
		margin-top: 12px;
	}
	
	.wd_answer .wd_right .question_types div:nth-child(3) {
		width: 207px;
		height: 85px;
		border: 1px solid #ddd;
		border-radius: 5px;
		position: absolute;
		position: absolute;
		top: 45px;
		left: 35px;
		background: #fff;
	}
	
	.wd_answer .wd_right .question_types div:nth-child(3) p {
		line-height: 40px;
		padding-left: 9px;
		cursor: pointer;
	}
	
	.wd_answer .wd_right .tjtm {
		padding-bottom: 13px;
		margin-top: -10px;
	}
	.wd_answer .wd_right .tjtm1 {
		padding-bottom: 13px;
		border-bottom: 1px solid #ddd;
	}
	
	.wd_answer .wd_right .tjtm p {
		width: 68px;
		height: 28px;
		line-height: 28px;
		text-align: center;
		border: 1px solid #5193e1;
		color: #5193e1;
		display: inline-block;
		margin: 10px 0 0 15px;
		border-radius: 2px;
		background: #f4f5f5;
		cursor: pointer;
	}
	
	.wd_answer .wd_right .tjtm1 p {
		border: 1px solid#000;
		color: #000;
	}
	
	.wd_answer .wd_right .szlx {
		width: 100%;
	}
	
	.wd_answer .wd_right .szlx .tit {
		margin: 10px 0 0 15px;
		font-weight: 600;
		font-size: 15px;
	}
	
	.wd_answer .wd_right .szlx .tip {
		color: #333;
		text-align: center;
		font-size: 12px;
	}
	
	.wd_answer .wd_right .lan .iconfont {
		font-size: 65px;
		cursor: pointer;
		margin-left: 18px;
		color: #c1c8ea;
	}
	
	.wd_answer .wd_right .lan .active {
		color: #5093e2;
	}
	
	.wd_answer .wd_right .mfx {
		width: 100%;
		font-size: 14px;
		margin-top: 20px;
	}
	
	.wd_answer .wd_right .mfx .lab {
		text-align: center;
		line-height: 10px;
		margin-left: 18px;
		cursor: pointer;
	}
	
	.wd_answer .wd_right .mfx .ipt {
		vertical-align: middle;
	}
	
	.wd_answer .wd_right .dy {
		margin-top: 20px;
		font-size: 14px;
	}
	
	.wd_answer .wd_right .dy span:nth-child(1) {
		margin-left: 18px;
	}
	
	.wd_answer .wd_right .dy .ipt1 {
		vertical-align: middle;
	}
	
	.wd_answer .wd_right .dy label {
		margin-left: 5px;
		cursor: pointer;
	}
	
	.wd_answer .wd_right .ksh {
		margin-top: 20px;
		font-size: 14px;
	}
	
	.wd_answer .wd_right .ksh span:nth-child(1) {
		margin-left: 31px;
	}
	
	.wd_answer .wd_right .ksh .ipt1 {
		vertical-align: middle;
	}
	
	.wd_answer .wd_right .ksh label {
		cursor: pointer;
		margin-left: 5px;
	}
	
	.wd_answer .wd_right .ksh p {
		margin: 10px 0 0 91px;
	}
	
	.wd_answer .wd_right .kgtbb {
		margin-top: 10px;
	}
	
	.wd_answer .wd_right .kgtbb h3 {
		width: 100%;
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		padding-left: 15px;
		background: #EEF1F6;
		font-size: 16px;
		font-weight: 600;
		color: #000;
	}
	
	.wd_answer .wd_right .kgtbb div {
		width: 100%;
		box-sizing: border-box;
		/* height: 40px; */
		line-height: 40px;
	}
	
	.wd_answer .wd_right .kgtbb div input {
		vertical-align: middle;
	}
	
	.wd_answer .wd_right .kgtbb label {
		cursor: pointer;
		margin-left: 9px;
	}
	
	.wd_answer .wd_right .xiazai {
		width: 90%;
		margin: 0 auto;
		border-top: 1px solid #ddd;
		padding-bottom:20px; 
	}
	
	.wd_answer .wd_right .xiazai div {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	
	.wd_answer .wd_right .xiazai p {
		width: 110px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #f0f0f0;
		border-radius: 2px;
		cursor: pointer;
	}
	
	.wd_answer .wd_right .xiazai .active {
		background: #5093e1;
		color: #fff;
	}
	.wd_answer .wd_right .xiazai .active a {
		color: #fff;
	}
	
	
	.wd_answer .wd_main {
		margin: 0 275px 0 180px;
		max-height: 800px;
		overflow: auto;
	}
	
	.wd_answer .yilan {
		width: 100%;
	}
	
	.wd_answer .yilan .one {
		width: 793px;
		margin: 0 auto;
		height: 1122px;
		background-color: #ffffff;
		border-radius: 2px;
		position: relative;
		margin-bottom: 5px;
	}
	
	.wd_answer .one .left {
		width: 39px;
		height: 100%;
		border: dashed 1px #333333;
		position: absolute;
		box-sizing: border-box;
	}
	
	.wd_answer .one .right {
		width: 39px;
		height: 100%;
		border: dashed 1px #333333;
		position: absolute;
		right: 0;
		box-sizing: border-box;
	}
	
	.wd_answer .one .left div:nth-child(1) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		left: 20px;
		top: 20px;
	}
	
	.wd_answer .one .right div:nth-child(1) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		right: 20px;
		top: 20px;
	}
	
	.wd_answer .one .left div:nth-child(2) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		bottom: 20px;
		left: 20px;
	}
	
	.wd_answer .one .right div:nth-child(2) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	
	.wd_answer .one .left_mifen {
		width: 135px;
	}
	.wd_answer .one .right_mifen {
		width: 135px;
	}
	
	.wd_answer .one .content {
		width: 715px;
		position: relative;
		top: 25px;
		left: 39px;
		z-index: 10;
	}
	
	.wd_answer .one .content_mifen {
		width: 619px;
		left: 135px;
	}
	
	.wd_answer .one .content_mifen1 {
		width: 619px;
		left: 39px;
	}
	
	.wd_answer .one .svg1 {
		position: absolute;
		top: 25px;
		left: 39px;
		overflow: visible;
	}
	.wd_answer .one .svg11 {
		left: 2px;
	}
	
	.wd_answer .one .svg2 {
		width: 715px;
		position: absolute;
		top: 25px;
		left: 39px;
		overflow: visible;
	}
	
	.wd_answer .one .svg2_mifen {
		width: 619px;
		left: 135px;
	}
	.wd_answer .one .svg2_mifen1 {
		width: 619px;
		left: 39px;
	}
	
	.wd_answer .one .content .textMessage {
		position: absolute;
		font-size: 16px;
		border: #4A4A4A dashed 1px;
		box-sizing: border-box;
		left: 21px;
		top: 0;
	}
	.wd_answer .one .content .posi{
		position: absolute;
	}
	.wd_answer .one .content .bord{
		border: 1px solid #00A9F6;
	}
	.wd_answer .one .foot-page{
		width: 100%;
	    position: absolute;
	    top: 1040px;
	    height: 25px;
	    text-align: center;
	}
	.wd_answer .one .page-info-show{
		position: absolute;
		height: 25px;
		top:1044px;
		left: 28px;
		font-size: 13px;
	}
	.wd_answer .one .page-info-show span{
		display: inline-block;
		margin: 0 10px 0 5px;
		width: 70px;
		height: 18px;
		border-bottom: 1px solid #4A4A4A;
		vertical-align: top;
	}
	.wd_answer .one .content .editcogeditoring{
		width: 100%;
		height: 100%;
		overflow: hidden;
		word-wrap: break-word;
		padding: 8px 7px 0 9px;
		box-sizing: border-box;
		font-size: 16px;
	}
	.wd_answer .one .content .iconfont{
		cursor: pointer;
	}
	.wd_answer .one .content .operate span{
		display: inline-block;
		color: #00A9F6;
		border:  1px solid #00A9F6;
		padding: 0   8px;
		background:#fff;
	}

	.wd_answer .one .content .operate .subTopic{
		border:none;
	}

	.wd_answer .one .content .operate .active{
		color: #fff;
		background: #00A9F6;
	}
	.wd_answer .one .tu .iconfont{
		font-size: 16px;
		color: #f00;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.wd_answer .wd_main .handle{
		display: none;
		width: 10px;
		height: 10px;
		box-sizing: border-box;
		border: 1px solid #333;
		position:absolute;
	}
	.wd_answer .wd_main .handle-tl{
		top: -10px;
		left: -10px;
		cursor: nw-resize;
	}
	.wd_answer .wd_main .handle-tm{
		top: -10px;
		left: 50%;
		margin-left: -5px;
		cursor: n-resize;
	}
	.wd_answer .wd_main .handle-tr{
		top: -10px;
		right: -10px;
		cursor: ne-resize;
	}
	.wd_answer .wd_main .handle-mr{
		right: -10px;
		cursor: e-resize;
		top: 50%;
		margin-top: -5px;
	}
	.wd_answer .wd_main .handle-br{
		bottom: -10px;
		right: -10px;
		cursor: se-resize;
	}
	.wd_answer .wd_main .handle-bm{
		bottom: -10px;
		left: 50%;
		margin-left: -5px;
		cursor: s-resize;
	}
	.wd_answer .wd_main .handle-bl{
		bottom: -10px;
		left: -10px;
		cursor: sw-resize;
	}
	.wd_answer .wd_main .handle-ml{
		top: 50%;
		margin-top: -5px;
		left: -10px;
		cursor: w-resize;
	}
	.wd_answer .lianglan {
		width: 100%;
	}
	
	.wd_answer .lianglan .two {
		width: 793px;
		margin: 0 auto;
		height: 1122px;
		background-color: #ffffff;
		border-radius: 2px;
		position: relative;
		margin-bottom: 5px;
	}
	.wd_answer .lianglan .two1 {
		width: 841px;
	}
	.wd_answer .lianglan .two2 {
		width: 745px;
	}
	.wd_answer .lianglan .left {
		width: 39px;
		height: 100%;
		border: dashed 1px #333333;
		position: absolute;
		box-sizing: border-box;
	}
	
	.wd_answer .lianglan .left div:nth-child(1) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		left: 20px;
		top: 20px;
	}
	
	.wd_answer .lianglan .left div:nth-child(2) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		bottom: 20px;
		left: 20px;
	}
	
	.wd_answer .lianglan .left_mifen {
		width: 135px;
	}
	
	
	.wd_answer .lianglan .content {
		width: 754px;
		position: relative;
		top: 25px;
		left: 39px;
		z-index: 10;
	}
	
	.wd_answer .lianglan .content_mifen {
		width: 684px;
		left: 0px;
	}
	
	.wd_answer .lianglan .content_mifen1 {
		width: 684px;
		left: 135px;
	}
	
	.wd_answer .lianglan .svg1 {
		position: absolute;
		top: 25px;
		left: 39px;
		overflow: visible;
	}
	.wd_answer .lianglan .svg11 {
		left: 2px;
	}
	
	.wd_answer .lianglan .svg2 {
		width: 754px;
		position: absolute;
		top: 25px;
		left: 39px;
		overflow: visible;
	}
	
	.wd_answer .lianglan .svg2_mifen {
		width: 684px;
		left: 0px;
	}
	.wd_answer .lianglan .svg2_mifen1 {
		width: 684px;
		left: 135px;
	}
	
	.wd_answer .lianglan .content .textMessage {
		position: absolute;
		font-size: 16px;
		border: #4A4A4A dashed 1px;
		box-sizing: border-box;
		left: 21px;
		top: 0;
	}
	.wd_answer .lianglan .content .posi{
		position: absolute;
	}
	.wd_answer .lianglan .content .bord{
		border: 1px solid #00A9F6;
	}
	.wd_answer .lianglan .foot-page{
		width: 100%;
	    position: absolute;
	    top: 1040px;
	    height: 25px;
	    text-align: center;
	}
	.wd_answer .lianglan .page-info-show{
		position: absolute;
		height: 25px;
		top:1044px;
		left: 28px;
		font-size: 13px;
	}
	.wd_answer .lianglan .page-info-show span{
		display: inline-block;
		margin: 0 10px 0 5px;
		width: 70px;
		height: 18px;
		border-bottom: 1px solid #4A4A4A;
		vertical-align: top;
	}
	.wd_answer .lianglan .content .editcogeditoring{
		width: 100%;
		height: 100%;
		overflow: hidden;
		word-wrap: break-word;
		padding: 8px 7px 0 9px;
		box-sizing: border-box;
		font-size: 16px;
	}
	.wd_answer .lianglan .content .iconfont{
		cursor: pointer;
	}
	.wd_answer .lianglan .content .operate span{
		display: inline-block;
		color: #00A9F6;
		border:  1px solid #00A9F6;
		padding: 0   8px;
		background:#fff;
	}

	.wd_answer .lianglan .content .operate .subTopic{
		border:none;
	}

	.wd_answer .lianglan .content .operate .active{
		color: #fff;
		background: #00A9F6;
	}
	.wd_answer .lianglan .tu .iconfont{
		font-size: 16px;
		color: #f00;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.wd_answer .lianglan .right {
		width: 39px;
		height: 100%;
		border: dashed 1px #333333;
		position: absolute;
		right: 0;
		box-sizing: border-box;
	}
	.wd_answer .lianglan .right div:nth-child(1) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		right: 20px;
		top: 20px;
	}
	.wd_answer .lianglan .right div:nth-child(2) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.wd_answer .lianglan .right_mifen {
		width: 135px;
	}
	.wd_answer .sanlan {
		width: 100%;
	}
	
	.wd_answer .sanlan .three {
		width: 542px;
		margin: 0 auto;
		height: 1122px;
		background-color: #ffffff;
		border-radius: 2px;
		position: relative;
		margin-bottom: 5px;
	}
	.wd_answer .sanlan .three1 {
		width: 503px;
	}
	.wd_answer .sanlan .three2 {
		width: 606px;
	}
	.wd_answer .sanlan .three3 {
		width: 471px;
	}
	.wd_answer .sanlan .three4 {
		width: 510px;
	}
	.wd_answer .sanlan .left {
		width: 39px;
		height: 100%;
		border: dashed 1px #333333;
		position: absolute;
		box-sizing: border-box;
	}
	
	.wd_answer .sanlan .left div:nth-child(1) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		left: 20px;
		top: 20px;
	}
	
	.wd_answer .sanlan .left div:nth-child(2) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		bottom: 20px;
		left: 20px;
	}
	
	.wd_answer .sanlan .left_mifen {
		width: 135px;
	}
	
	
	.wd_answer .sanlan .content {
		width: 503px;
		position: relative;
		top: 25px;
		left: 39px;
		z-index: 10;
	}
	
	.wd_answer .sanlan .content_mifen {
		width: 503px;
		left: 0px;
	}
	.wd_answer .sanlan .content_mifen1 {
		width: 471px;
		left: 0px;
	}
	.wd_answer .sanlan .content_mifen2 {
		width: 471px;
		left: 39px;
	}
	.wd_answer .sanlan .content_mifen3 {
		width: 471px;
		left: 135px;
	}
	
	.wd_answer .sanlan .svg1 {
		position: absolute;
		top: 25px;
		left: 39px;
		overflow: visible;
	}
	.wd_answer .sanlan .svg11 {
		left: 2px;
	}
	
	.wd_answer .sanlan .svg2 {
		width: 503px;
		position: absolute;
		top: 25px;
		left: 39px;
		overflow: visible;
	}
	
	.wd_answer .sanlan .svg2_mifen {
		width: 503px;
		left: 0px;
	}
	.wd_answer .sanlan .svg2_mifen1 {
		width: 471px;
		left: 0px;
	}
	.wd_answer .sanlan .svg2_mifen2 {
		width: 471px;
		left: 39px;
	}
	.wd_answer .sanlan .svg2_mifen3 {
		width: 471px;
		left: 135px;
	}
	
	.wd_answer .sanlan .content .textMessage {
		position: absolute;
		font-size: 16px;
		border: #4A4A4A dashed 1px;
		box-sizing: border-box;
		left: 21px;
		top: 0;
	}
	.wd_answer .sanlan .content .posi{
		position: absolute;
	}
	.wd_answer .sanlan .content .bord{
		border: 1px solid #00A9F6;
	}
	.wd_answer .sanlan .foot-page{
		width: 100%;
	    position: absolute;
	    top: 1040px;
	    height: 25px;
	    text-align: center;
	}
	.wd_answer .sanlan .page-info-show{
		position: absolute;
		height: 25px;
		top:1044px;
		left: 28px;
		font-size: 13px;
	}
	.wd_answer .sanlan .page-info-show span{
		display: inline-block;
		margin: 0 10px 0 5px;
		width: 70px;
		height: 18px;
		border-bottom: 1px solid #4A4A4A;
		vertical-align: top;
	}
	.wd_answer .sanlan .content .editcogeditoring{
		width: 100%;
		height: 100%;
		overflow: hidden;
		word-wrap: break-word;
		padding: 8px 7px 0 9px;
		box-sizing: border-box;
		font-size: 16px;
	}
	.wd_answer .sanlan .content .iconfont{
		cursor: pointer;
	}
	.wd_answer .sanlan .content .operate span{
		display: inline-block;
		color: #00A9F6;
		border:  1px solid #00A9F6;
		padding: 0   8px;
		background:#fff;
	}

	.wd_answer .sanlan .content .operate .subTopic{
		border:none;
	}

	.wd_answer .sanlan .content .operate .active{
		color: #fff;
		background: #00A9F6;
	}
	.wd_answer .sanlan .tu .iconfont{
		font-size: 16px;
		color: #f00;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.wd_answer .sanlan .right {
		width: 39px;
		height: 100%;
		border: dashed 1px #333333;
		position: absolute;
		right: 0;
		box-sizing: border-box;
	}
	.wd_answer .sanlan .right div:nth-child(1) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		right: 20px;
		top: 20px;
	}
	.wd_answer .sanlan .right div:nth-child(2) {
		width: 18px;
		height: 10px;
		background-color: #333333;
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
	.wd_answer .sanlan .right_mifen {
		width: 135px;
	}

	.wd_answer .prompt_box .xinxi {
		width: 640px;
		height: 193px;
		padding: 0;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-header {
		padding: 12px 15px 11px;
		height: 50px;
		border-color: #ccc;
		font-size: 18px !important;
		box-sizing: border-box;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-header div {
		height: 27px;
		line-height: 27px;
		font-size: 18px !important;
		font-weight: 400;
		color: #4a4a4a;
		box-sizing: border-box;
		text-align: left;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-body {
		font-size: 16px;
		padding: 16px;
		line-height: 1.5;
		border-top: solid 1px #ccc;
		border-bottom: 1px solid #e9eaec;
		box-sizing: border-box;
		height: 80px;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-body input {
		cursor: pointer;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-body label {
		margin-left: 25px;
		cursor: pointer;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-footer {
		padding: 12px 18px 12px 18px;
		text-align: right;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-footer button:nth-child(1) {
		border-radius: 2px !important;
		padding: 0 22px !important;
		height: 36px !important;
		line-height: 36px !important;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
		color: #4a4a4a !important;
		background: #fff;
		font-size: 16px !important;
		border: none;
		outline: none;
		cursor: pointer;
	}
	
	.wd_answer .prompt_box .xinxi .ivu-modal-footer button:nth-child(2) {
		border-radius: 2px;
		padding: 0 22px !important;
		height: 36px !important;
		line-height: 36px !important;
		background: #2d8cf0;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
		font-size: 16px !important;
		box-sizing: border-box;
		border: none;
		color: #fff;
		cursor: pointer;
		outline: none;
	}
	
	.wd_answer .prompt_box .kaoshihao {
		width: 520px;
		height: 193px;
		padding: 0;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-header {
		padding: 12px 15px 11px;
		height: 50px;
		border-color: #ccc;
		font-size: 18px !important;
		box-sizing: border-box;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-header div {
		height: 27px;
		line-height: 27px;
		font-size: 18px !important;
		font-weight: 400;
		color: #4a4a4a;
		box-sizing: border-box;
		text-align: left;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-body {
		font-size: 16px;
		padding: 16px;
		line-height: 1.5;
		border-top: solid 1px #ccc;
		border-bottom: 1px solid #e9eaec;
		box-sizing: border-box;
		height: 80px;
		line-height: 48px;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-body input {
		margin: 0 10px;
		width: 100px;
		text-align: center;
		height: 30px;
		border: 1px solid #ccc;
		outline: none;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-body span {
		font-size: 14px;
		color: #757575;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-footer {
		padding: 12px 18px 12px 18px;
		text-align: right;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-footer button:nth-child(1) {
		border-radius: 2px !important;
		padding: 0 22px !important;
		height: 36px !important;
		line-height: 36px !important;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
		color: #4a4a4a !important;
		background: #fff;
		font-size: 16px !important;
		border: none;
		outline: none;
		cursor: pointer;
	}
	
	.wd_answer .prompt_box .kaoshihao .ivu-modal-footer button:nth-child(2) {
		border-radius: 2px;
		padding: 0 22px !important;
		height: 36px !important;
		line-height: 36px !important;
		background: #2d8cf0;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
		font-size: 16px !important;
		box-sizing: border-box;
		border: none;
		color: #fff;
		cursor: pointer;
		outline: none;
	}
	
	.wd_answer .prompt_box .wd_xzkgt {
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
	.wd_answer .prompt_box .wd_xzkgt label{
		cursor: pointer;
	}

	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-header {
		padding: 12px 15px 11px;
		height: 50px;
		border-color: #ccc;
		font-size: 18px !important;
		text-align: left;
		border-bottom: 1px solid #e9eaec;
		box-sizing: border-box;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body {
		padding: 20px 30px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .nav {
		text-align: left;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .nav span {
		font-size: 16px;
		margin: 0 15px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .nav span:nth-child(1) {
		margin-left: 0;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .nav select {
		width: 120px;
		height: 30px;
		border-radius: 5px;
		border: 1px solid #dddee1;
		outline: none;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .nav input {
		width: 590px;
		height: 32px;
		box-sizing: border-box;
		padding: 0 15px;
		border: 1px solid #dddee1;
		border-radius: 4px;
		outline: none;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body {
		width: 1140px;
		max-height: 250px;
		overflow: auto;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions {
		width: 100%;
		padding: 5px 10px;
		box-sizing: border-box;
		height: 44px;
		border: 1px solid #2d8cf0;
		background: rgba(90, 200, 250, 0.1);
		margin-top: 15px
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions span {
		font-size: 16px;
		margin: 0 5px;
		line-height: 30px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions input[type="text"] {
		width: 45px;
		height: 32px;
		border-radius: 4px;
		outline: none;
		border: 1px solid #dddee1;
		vertical-align: middle;
		box-sizing: border-box;
		text-align: center;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions p {
		margin-right: 15px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .choiceQuestions p:last-child {
		color: #2d8cf0;
		line-height: 30px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #2d8cf0;
		margin-top: -1px;
		padding: 15px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p {
		margin-top: 15px;
		width: 50%;
		text-align: left;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p span:nth-child(1) {
		display: inline-block;
		width: 20px;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p span {
		margin: 0 10px 0;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p span:last-child {
		color: #2d8cf0;
		cursor: pointer;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p:nth-child(1) {
		margin-top: 0;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p:nth-child(2) {
		margin-top: 0;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p input[type="text"] {
		width: 45px;
		height: 32px;
		text-align: center;
		font-size: 14px !important;
		border-radius: 4px;
		margin: 0 5px;
		background-color: #fff;
		border: 1px solid #dddee1;
		outline: none;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-body .body .duoxuan p input:disabled {
		background-color: #f3f3f3;
		border: 1px solid #dddee1;
		cursor: not-allowed;
		color: #ccc;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-footer {
		border-top: 1px solid #e9eaec;
		padding: 12px 18px 12px 18px;
		text-align: right;
	}
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-footer .cancel {
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
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-footer .confirm {
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
	
	.wd_answer .prompt_box .wd_xzkgt .ivu-modal-footer .confirm:disabled {
		color: #bbbec4;
		background: #f7f7f7;
		cursor: no-drop;
	}
	
	.wd_answer .prompt_box .addTitle {
		text-align: left;
		margin-top: 5px;
		color: #2d8cf0;
		width: 100px;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body .nav input{
		width: 800px;
	}
	.wd_answer .shou{
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong{
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #2d8cf0;
		margin-top: -1px;
		padding: 15px;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p{
		margin-top: 15px;
		width: 100%;
		text-align: left;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p span:nth-child(1){
		display: inline-block;
		width: 20px;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p span:nth-last-child(1){
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p span:nth-last-child(2){
		margin-top:8px; 
		vertical-align: middle;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p span{
		margin:0 10px 0; 
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p span:last-child{
		color: #2d8cf0;
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p:nth-child(1){
		margin-top: 0;
	}

	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p input[type="text"]{
		width: 45px;
		height:32px;
		text-align: center;
		font-size: 14px !important;
		border-radius: 4px;
		margin: 0 5px;
		background-color: #fff;
		border: 1px solid #dddee1;
		outline: none;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p input:disabled{
		background-color: #f3f3f3;
		border: 1px solid #dddee1;
		cursor: not-allowed;
		color: #ccc;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p .wenshu{
		display: inline-block;
		max-width: 60%;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong p .wenshu input[type="text"]{
		margin: 0 2px;
	}
	.wd_answer .prompt_box .wd_xztkt .ivu-modal-body  .body  .tiankong  p .wenshu1{
		display: inline-block;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda{
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #2d8cf0;
		margin-top: -1px;
		padding: 15px;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda  p{
		margin-top: 15px;
		width: 100%;
		text-align: left;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda  p:nth-child(1){
		margin-top: 0;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda  p .smallQuestionsShow{
		display: inline-block;
		margin-top:8px;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda input[type="text"]{
		width: 45px;
		height:32px;
		text-align: center;
		font-size: 14px !important;
		border-radius: 4px;
		margin: 0 5px;
		background-color: #fff;
		border: 1px solid #dddee1;
		outline: none;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p span{
		margin:0 10px 0; 
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p span:nth-child(1){
		display: inline-block;
		width: 20px;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p span:nth-last-child(1){
		color: #2d8cf0;
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p input:disabled{
		background-color: #f3f3f3;
		border: 1px solid #dddee1;
		cursor: not-allowed;
		color: #ccc;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p .wenshu{
		display: inline-block;
		max-width: 60%;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p .wenshu input[type="text"]{
		margin: 0 2px;
	}
	.wd_answer .prompt_box .wd_xzjdt .ivu-modal-body  .body  .jieda p .wenshu1{
		display: inline-block;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_crtp{
		width:640px;
	}
	.wd_answer .prompt_box .wd_crtp .ivu-modal-body{
		text-align: left;
	}
	.wd_answer .prompt_box .wd_crtp .ivu-modal-body span{
		margin-right: 20px;
	}
	.wd_answer .prompt_box .wd_crtp .ivu-modal-body span:nth-child(1){
		font-size: 16px;
	}
	.wd_answer .prompt_box .wd_crtp .ivu-modal-body label{
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_crtp .ivu-modal-body input{
		vertical-align: middle;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen{
		width: 100%;
		box-sizing: border-box;
		border: 1px solid #2d8cf0;
		margin-top: -1px;
		padding: 15px;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p{
		margin-top: 15px;
		width: 100%;
		text-align: left;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span:nth-child(1){
		display: inline-block;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span:nth-child(3){
		display: inline-block;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span:nth-child(4){
		display: inline-block;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span:nth-child(5){
		display: inline-block;
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span:nth-last-child(1){
		margin-top:8px; 
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span{
		margin:0 10px 0; 
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span label{
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span font{
		font-weight: 500;
   		color: #9B9B9B;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p span:last-child{
		color: #2d8cf0;
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p:nth-child(1){
		margin-top: 0;
	}

	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p input[type="text"]{
		width: 45px;
		height:32px;
		text-align: center;
		font-size: 14px !important;
		border-radius: 4px;
		margin: 0 5px;
		background-color: #fff;
		border: 1px solid #dddee1;
		outline: none;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p input:disabled{
		background-color: #f3f3f3;
		border: 1px solid #dddee1;
		cursor: not-allowed;
		color: #ccc;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p .wenshu{
		display: inline-block;
		max-width: 60%;
	}
	.wd_answer .prompt_box .wd_xzzwt .ivu-modal-body  .body  .zuowen p .wenshu input[type="text"]{
		margin: 0 2px;
	}
	.wd_answer .prompt_box .wd_xztgq{
		width:640px;
	}
	.wd_answer .prompt_box .wd_xztgq .ivu-modal-body{
		font-size: 16px;
		padding: 20px;
		border-top: solid 1px #ccc;
		border-bottom: 1px solid #e9eaec;
		box-sizing: border-box;
		text-align: left;
	}
	.wd_answer .prompt_box .wd_xztgq .ivu-modal-body p{
		margin-top:10px;
		margin-left: 20px; 
	}
	.wd_answer .prompt_box .wd_xztgq .ivu-modal-body p label{
		margin-right: 20px;
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_xztgq .ivu-modal-body input{
		vertical-align: middle;
	}
	.wd_answer .prompt_box .wd_xzjdq .ivu-modal-body{
		font-size: 16px;
		padding: 20px;
		border-top: solid 1px #ccc;
		border-bottom: 1px solid #e9eaec;
		box-sizing: border-box;
		text-align: left;
	}
	.wd_answer .prompt_box .wd_xzjdq .ivu-modal-body input{
		width: 45px;
		height:32px;
		text-align: center;
		font-size: 14px !important;
		border-radius: 4px;
		margin: 0 5px;
		background-color: #fff;
		border: 1px solid #dddee1;
		outline: none;
		box-sizing: border-box;
	}
	.wd_answer .prompt_box .wd_xzjdq .ivu-modal-body select{
		width: 120px;
		height: 32px;
		border-radius: 5px;
		border: 1px solid #dddee1;
		outline: none;
	}
	.wd_answer .prompt_box .wd_xzjdq .ivu-modal-body p{
		margin-left: 20px;
	}
	.wd_answer .prompt_box .wd_volumeCard{
		width: 900px;
		height:500px;
		background:#fff;
		position: fixed;
		top:100px;
		left:50%;
		transform: translate(-50%);
		z-index : 1005;
		border-radius: 10px;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-header{
		box-sizing: border-box;
		padding:10px 20px;
		text-align: left;
		font-size:18px;
		border-bottom: 1px solid #ccc;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-footer {
		padding: 12px 18px 12px 18px;
		text-align: right;
	}
	
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-footer button:nth-child(1) {
		border-radius: 2px !important;
		padding: 0 22px !important;
		height: 36px !important;
		line-height: 36px !important;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
		color: #4a4a4a !important;
		background: #fff;
		font-size: 16px !important;
		border: none;
		outline: none;
		cursor: pointer;
		margin-right:20px;
	}
	
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-footer button:nth-child(2) {
		border-radius: 2px;
		padding: 0 22px !important;
		height: 36px !important;
		line-height: 36px !important;
		background: #2d8cf0;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
		font-size: 16px !important;
		box-sizing: border-box;
		border: none;
		color: #fff;
		cursor: pointer;
		outline: none;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body{
		width: 100%;
		height:390px;
		border-bottom: 1px solid #ccc;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left{
		width: 220px;
		height: 100%;
		overflow: auto;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left h3{
		width: 100%;
		box-sizing: border-box;
		padding:7px 10px;
		text-align: left;
		background: #999;
		color:#fff;
		border-bottom: 1px solid #fff;
		cursor: pointer;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left h3.active{
		background:#2d8cf0;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left .ceping{
		width:100%;
		box-sizing: border-box;
		padding:  5px  20px;
		
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left p{
		text-align: left;
		cursor: pointer;
		padding:  3px  0;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left p.active{
		color:#2d8cf0;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .left p:hover{
		background: #ccc;
		color:#fff;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .right{
		width:680px;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .right .state1{
		width:100%;
		height: 390px;
		overflow: auto;
		overflow-x: hidden;
		text-align: center;
		line-height: 390px;
		font-size:16px;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .right .state1{
		width:100%;
		height: 390px;
		overflow: auto;
		overflow-x: hidden;
		text-align: center;
		line-height: 390px;
		font-size:16px;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .right  table{
		width: 90%;
		margin-left:5%;
		margin-top: 10px;
		box-sizing: border-box;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .right  table  td{
		border: 1px solid  #999;
		padding: 10px;
	}
	.wd_answer .prompt_box .wd_volumeCard .ivu-modal-body .right  table input{
		cursor: pointer;
	}
</style>