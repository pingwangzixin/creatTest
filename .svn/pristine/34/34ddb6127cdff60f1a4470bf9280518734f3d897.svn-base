<template>
    <div>
        <div class="wd_header">
            <span @click="send1"><i class="iconfont iconfanhui1"></i> &nbsp;返回</span>
            <select name="" id="">
                <option v-for="(item,index) in subject" :key="index" v-show="infor.subjectId == item.id">{{item.name}}</option>
            </select>
            <p>{{infor.paperMarkingName}}</p>
            <b>
                阶段状态
                <i class="iconfont iconquestion"></i>
            </b>
            <div class="stageState">
                <ul>
                    <li>
                        <p><span></span>进行中状态</p>
                    </li>
                    <li>
                        <p><span></span>已完成状态</p>
                    </li>
                    <li>
                        <p><span></span>不可操作状态</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="wd_main">
            <div class="top_title clearfix">
                <div class="subject_name fl">{{infor.subjectName}}</div> 
                <div class="subject_head fl">学科负责人：{{infor.paperSubjectHeader}}</div> 
                <div class="reference_class fl">参考班级：1个</div> 
                <div class="reference_person_nums fl">参考人数：56个</div>
            </div>
            <div class="bigStep">
                <ul>
                    <li class="clearfix" v-if="infor.markingMode==0">
                        <div class="head_inner fl">
                            <div class="active" v-if="infor.speedProgress<4">1</div>
                            <i class="iconfont iconduigou1" v-if="infor.speedProgress>=4"></i>
                            <p :class="{active:infor.speedProgress>=4}"></p>
                        </div>
                        <div class="main_inner fl">
                            <p>制作答题卡 <span class="gray">出卷人：{{infor.paperSubjectDealer}}</span><i class="iconfont iconbianji"></i></p>
                            <p>完成制作答题卡并【确认定稿】后才能开始本次阅卷后续操作。</p>
                            <p><span class="red1">注意：</span>定稿前的答题卡预览和PDF文件加有水印用于校验，定稿后会去除水印并禁止修改！</p>
                        </div>
                        <div class="right_inner fr">
                            <p @click="send" :class="{active:infor.speedProgress==1,active1:infor.speedProgress==3}">制作答题卡</p>
                            <p :class="{active:infor.speedProgress==3}" @click="finalization">我要定稿</p>
                        </div>
                    </li>
                    <li class="clearfix" v-if="infor.markingMode==1">
                        <div class="head_inner fl">
                            <div class="active" v-if="infor.speedProgress<4">1</div>
                            <i class="iconfont iconduigou1" v-if="infor.speedProgress>=4"></i>
                            <p :class="{active:infor.speedProgress>4}"></p>
                        </div>
                        <div class="main_inner fl">
                            <p>设置试卷结构</p>
                            <p>完成试卷结构设置才能开始本次阅卷后续操作，<span class="gray1">录入题干解析</span>便于学生后续查阅时自查。</p>
                        </div>
                        <div class="right_inner fr">
                        	<!--:style="{cursor : (infor.speedProgress<=2||infor.speedProgress==4) ? 'pointer':'no-drop'}" -->
                            <p @click="send3" :class="{active:infor.speedProgress<=2,active1:infor.speedProgress==4}">设置试卷结构</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <div class="head_inner fl">                                            
                            <div :class="{active:infor.speedProgress==4}" v-if="infor.speedProgress<5">2</div>
                            <i class="iconfont iconduigou1" v-if="infor.speedProgress>=5"></i>
                            <p :class="{active:infor.speedProgress>=5}"></p>
                        </div>
                        <div class="main_inner fl">
                            <p>框选锚点信息</p>
                            <p>对答题卡框选出需要识别的内容：学生信息、试卷信息、客观题和主观题。</p>
                            <p><span class="red1">注意：</span>请使用学生空白答卷作为答题卡模版进行框选！</p>
                        </div>
                        <div class="right_inner fr">
                            <a :href="'aClient://'+infor.answerSheetId + '~' +infor.id" :class="{active:infor.speedProgress==4,active1:infor.speedProgress==5 || infor.speedProgress == 6}">框选锚点信息</a>
                        </div>
                        
                    </li>
                    <li class="clearfix">
                        <div class="head_inner fl">
                            <div :class="{active:infor.speedProgress==5 || infor.speedProgress==6}" v-if="infor.speedProgress<7">3</div>
                            <i class="iconfont iconduigou1" v-if="infor.speedProgress>=7"></i>
                            <p :class="{active:infor.speedProgress>=7}"></p>
                        </div>
                        <div class="main_inner fl">
                            <p>配置与扫描 <span class="gray">扫描负责人：杨冬，猿科，尚勤，杨秀姐，段立鹏等11位</span><i class="iconfont iconbianji"></i></p>
                            <p>合理的设置单评双评方式以及每道题目的阅卷老师可以有效提高老师批阅效率。</p>
                            <p>上传完成后，请先<span class="gray1">检查主观题图片</span>，确认无误后再开始阅卷。</p>
                        </div>
                        <div class="right_inner fr">
                            <p @click="send2" :class="{active:infor.speedProgress==5,active1:infor.speedProgress==6 || infor.speedProgress==7}">分配阅卷任务</p>
                            <p @click="toScanAnswerSheet" :class="{active:infor.speedProgress==5 || infor.speedProgress==6,active1:infor.speedProgress==7}">扫描答题卡</p>
                        </div>
                        
                    </li>
                    <li class="clearfix">
                        <div class="head_inner fl">
                            <div :class="{active:infor.speedProgress==7 || infor.speedProgress==8}" v-if="infor.speedProgress<9">4</div>
                            <i class="iconfont iconduigou1" v-if="infor.speedProgress>=9"></i>
                            <p :class="{active:infor.speedProgress>=9}"></p>
                        </div>
                        <div class="main_inner fl">
                            <p>阅卷阶段</p>
                            <p>准备工作就绪后可以开始阅卷，则本场考试的阅卷老师可以进行阅卷。</p>
                        </div>
                        <div class="right_inner fr">
                            <p @click="startMarking" :class="{active:infor.speedProgress==7}" v-if="infor.speedProgress<=7">开始阅卷</p>
                            <p :class="{active:infor.speedProgress==8}" v-if="infor.speedProgress==8">暂停阅卷</p>
                            <p v-if="infor.speedProgress>8">阅卷完成</p>
                            <p @click="toMarkingControl" :class="{active:infor.speedProgress==8,active1:infor.speedProgress>8}">阅卷监控</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <div class="head_inner fl">
                            <div :class="{active:infor.speedProgress==9 || infor.speedProgress==10}" v-if="infor.speedProgress<11">5</div>
                            <i class="iconfont iconduigou1" v-if="infor.speedProgress==11"></i>
                        </div>
                        <div class="main_inner fl">
                            <p>合成成绩</p>
                            <p>合成成绩前请检查客观题，保证成绩准确性，支持修改答案与分数。</p>
                            <p>合成成绩后本次阅卷结束，可导出成绩查看，亦可前往分析报告中导入本次记录查看更多分析。</p>
                        </div>
                        <div class="right_inner fr">
                            <p @click="hiding" :class="{active:infor.speedProgress==9,active1:infor.speedProgress==10}">查看客观题答案</p>
                            <p @click="mergerResults" :class="{active:infor.speedProgress==9 || infor.speedProgress==10 }">合成成绩</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="wd_greyBack" v-if="bol"></div>
        <div class="wd_objectiveAnswers" v-if="bol">
            <div class="objectiveAnswers_header clearfix">
                <span class="fl">设置客观题答案</span>
                <i class="iconfont iconguanbi1 fr" @click="hiding"></i>
            </div>
            <div class="objectiveAnswers_main">
                <div v-for="(item,index) in arr" :key="index">
                    <h3>
                        <span>{{item.sectionTitleLabel}}</span>
                        <span>每题
                            <input type="number" v-model="item.score" :disabled="item.monomerSetting" @blur="score(item)">
                            分
                        </span>
                        <label>
                            <input type="checkbox" name="" id="" v-model="item.monomerSetting">
                            单体设分
                        </label>    
                    </h3>
                    <ul class="clearfix">
                        <li class="fl clearfix" v-for="(item1,index1) in item.objQuzsList" :key="index1">
                            <div class="fl">
                                {{item1.answerSheetSectionGroupSeq}}、
                            </div>
                            <div class="fl">
                                <p>满分
                                    <input type="number" v-model="item1.answerSheetSectionGroupScore" :disabled="!item.monomerSetting">
                                    分
                                </p>
                                <p>
                                    答案：
                                    <span @click="chooseAnswer(item1,index2)" :class="{active:item2.state}" v-for="(item2,index2) in JSON.parse(item1.correctAnswer)" :key="index2">{{item2.name}}</span>
                                </p>
                            </div>
                            
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="objectiveAnswers_footer">
                <div>
                    <button type="button" @click="hiding">
                        <span>取消</span>
                    </button>
                    <button type="button" @click="confirm">
                        <span>确定</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { wordRelevant } from "@/api";
export default {
    name:"thisPlatform",
    data(){
        return {
            infor:"",
            subject:"",
            bol:false,
            arr:[
            ],
            arr1:[],
			speedProgress : 0,	//步骤            
        }
    },
    methods:{
        send(){
        	if(this.infor.speedProgress==1 || this.infor.speedProgress==3){
        		this.$router.push({path:"/index/readPaper/admin/answerCard",query:this.infor})
        	}
        },
        send1(){
            this.$router.push({path:"/index/readPaper/admin/readList"})
        },
        send2(){
        	if(this.infor.speedProgress==5 || this.infor.speedProgress==6 || this.infor.speedProgress==7){
        		this.$router.push({path:"/index/readPaper/admin/assignMarkingTasks",query:this.infor});
        	}
        },
        send3(){
        	if(this.infor.speedProgress<=2 || this.infor.speedProgress==4){
        		this.$router.push({path:"/index/readPaper/admin/setTestStructure",query:this.infor});
        	}
        },
        toScanAnswerSheet(){
        	if(this.infor.speedProgress==5 || this.infor.speedProgress==6 || this.infor.speedProgress==7){
        		this.$router.push({path:"/index/readPaper/admin/scanAnswerSheet",query:this.infor});
        	}
        },
        // 去阅卷监控
        toMarkingControl(){
        	if(this.infor.speedProgress==8 || this.infor.speedProgress>8){
        		this.$router.push({path:"/index/readPaper/admin/markingControl",query:this.infor});
        	}
        },
        // 选择答案
        chooseAnswer(item,index){
            let arr = JSON.parse(item.correctAnswer);
            arr[index].state = !arr[index].state;
            item.correctAnswer = JSON.stringify(arr)
        },
        // 每题多少分
        score(item){
            item.objQuzsList.forEach(element => {
                element.answerSheetSectionGroupScore = item.score;
            });
        },
        // 取消
        hiding(){
        	if(this.infor.speedProgress==9 || this.infor.speedProgress==10){
        		this.arr = JSON.parse(JSON.stringify(this.arr1))
        		this.bol = !this.bol;
        	}
        },
        // 确定
        confirm(){
            this.bol = !this.bol;
            this.arr1 = this.arr;
            let obj = {
                paperMarkingTaskId:this.infor.id,
                quzInfoArr:[]
            }
            this.arr.forEach(ele=>{
                ele.objQuzsList.forEach(ele1=>{
                    let obj1 = {
                        paperMarkingTaskObjQuzId:ele1.id,
                        correctAnswer:JSON.parse(ele1.correctAnswer),
                        answerSheetSectionGroupScore:Number(ele1.answerSheetSectionGroupScore)
                    }
                    obj.quzInfoArr.push(obj1)
                })
            })
            wordRelevant.saveObjectiveQuestions(obj).then(res=>{
                if(res.data.ret == 200){
                    this.$parent.$parent.timingFn("success","保存成功")
                }
            })
        },
        // 定稿
        finalization(){
            wordRelevant.queryTestPaper({id:this.infor.id}).then(res=>{
                if(res.data.ret == 200){
                    this.$parent.$parent.timingFn("success","定稿成功");
                }else{
                    this.$parent.$parent.timingFn("fail","定稿失败");
                }
            })
        },
        // 开始阅卷
        startMarking(){
            wordRelevant.startmarking({id:this.infor.id}).then(res=>{
                console.log(res)
                console.log(this)
            })
        },
        // 合成成绩
        mergerResults(){
            wordRelevant.mergerResults({
                paperMarkingTaskId:this.infor.id
            }).then(res=>{
                console.log(res)
            })
        },
        //页面操作步骤状态(暂时没用)
        getPageState (){
        	console.log(this.infor)
        	console.log(this.infor.id)
        	console.log(this.infor.speedProgress)
        	wordRelevant.queryState({id:this.infor.id}).then(res => {
				if(res.status == 200){
					console.log(res.data.data.data)
					this.speedProgress = res.data.data.data.speedProgress;
				}
			}).catch(e => {
				
			});
        }
    },
    watch: {
        $route(to,form){
            this.infor= to.query;
        }
    },
    created(){
        this.infor= this.$route.query;
        console.log(this.$route.query)
        //获取页面步骤
//      this.getPageState();
        //获取学科下拉
        wordRelevant
            .getSubjectData({ levelId: "level_2" })
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    this.subject = res.data.data.list;
                }
            })
            .catch(e => {});
        wordRelevant.objectiveQuestionsAnswer({id:this.infor.id}).then(res=>{
            this.arr1 = res.data.data;
            this.arr1.forEach(ele=>{
                ele.score = "";
                ele.monomerSetting = false;

            })
            this.arr = JSON.parse(JSON.stringify(this.arr1))
        }) 
    }
}
</script>
<style lang="" scoped>
.wd_header{
    width: 100%;
    height: 60px;
    border-radius: 10px;
    background: #fff;
    position: relative;
}
.wd_header span{
    color: #5093e1;
    line-height: 60px;
    margin-left:30px; 
    cursor: pointer;
}
.wd_header .iconfanhui1{
    font-size: 14px;
}
.wd_header  select{
    width: 150px;
    height: 30px;
    vertical-align: middle;
    margin-left: 20px;
    border-radius:5px;
    outline: none;
}
.wd_header>p{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 20px;
    font-weight: 700;
    top: 16px;
}
.wd_header b{
    color: #999;
    font-weight: 400;
    position: absolute;
    top: 19px;
    right: 20px;
    cursor: pointer;
}

.wd_header .stageState{
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    width: 130px;
    height: 130px;
    position: absolute;
    right: 0;
    top: 44px;
    background: #fff;
    border-radius: 5px;
    display: none;
}
.wd_header b:hover + .stageState{
    display: block;   
}
.wd_header .stageState li{
    margin-top: 15px;
    text-align: left;
}
.wd_header .stageState li p{
    margin-left: -15px;
}
.wd_header .stageState li:nth-child(1) span{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #5093e1;
    margin-right: 10px;
    vertical-align: middle;
}
.wd_header .stageState li:nth-child(2) span{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #1abc9c;
    margin-right: 10px;
    vertical-align: middle;
}
.wd_header .stageState li:nth-child(3) span{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #ddd;
    margin-right: 10px;
    vertical-align: middle;
}
.wd_main{

    width: 100%;
    border-radius: 10px;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 20px  70px;
    margin-top:10px; 
}
.wd_main .top_title{
    font-size: 14px;
    margin-bottom: 25px;
}
.wd_main .top_title div{
    margin-right: 15px;
    margin-top: 6px;
}
.wd_main .top_title  .subject_name{
    font-size: 18px;
    font-weight: 700;
    margin-top: 0;
}

.wd_main .bigStep .head_inner div{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #ccc;
    color: #ccc;
    text-align: center;
    line-height: 60px;
    font-size: 25px;
    margin-top: 15px;
    cursor: pointer;
}
.wd_main .bigStep .head_inner .iconduigou1{
    font-size: 60px;
    color: #1abc9c;
    cursor: pointer;
}
.wd_main .bigStep .head_inner div.active{
    background: #5093e1;
    color: #fff;
}

.wd_main .bigStep .head_inner  p{
    width: 1px;
    height: 150px;
    background: #ccc;
    margin-top:10px;
    margin-left: 30px; 
}
.wd_main .bigStep .head_inner  p.active{
    background: #1abc9c;
}
.wd_main .bigStep .main_inner{
    width: 800px;
    margin-left: 30px;
}
.wd_main .bigStep .main_inner p{
    margin-top: 10px;
    font-size: 14px;
}
.wd_main .bigStep .main_inner p .red1{
    color: red;
}
.wd_main .bigStep .main_inner p .gray{
    color: #999;
    font-size: 12px;
}
.wd_main .bigStep .main_inner p .gray1{
    color: #999;
}
.wd_main .bigStep .main_inner p .iconbianji{
    font-size: 12px;
    margin-left:10px; 
    cursor: pointer;
}
.wd_main .bigStep .right_inner{
    margin-right: 40px;
}
.wd_main .bigStep .right_inner p{
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #999;
    border-radius: 5px;
    background: #eee;
    cursor: pointer;
    margin-top:15px; 
    color: #999;
    /* pointer-events:none; */
    cursor: no-drop;
}
.wd_main .bigStep .right_inner p.active{
    background: #5093e1;
    color: #fff;
    border: none;
    /*pointer-events:auto;*/
    cursor: pointer;
}
.wd_main .bigStep .right_inner p.active1{
    background: #1abc9c;
    color: #fff;
    border: none;
    /*pointer-events:auto;*/
    cursor: pointer;
}
.wd_main .bigStep .right_inner a{
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #999;
    border-radius: 5px;
    background: #eee;
    cursor: pointer;
    margin-top:15px; 
    color: #999;
    display: block;
    /* pointer-events:none; */
    cursor: no-drop;
}
.wd_main .bigStep .right_inner a.active{
    background: #5093e1;
    color: #fff;
    border: none;
    /*pointer-events:auto;*/
    cursor: pointer;
}
.wd_main .bigStep .right_inner a.active1{
    background: #1abc9c;
    color: #fff;
    border: none;
    /*pointer-events:auto;*/
    cursor: pointer;
}
.wd_greyBack{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
}
.wd_objectiveAnswers{
    width: 950px;
    background: #fff;
    position:fixed;
    top: 50px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 10px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    z-index: 120;
    
}
.wd_objectiveAnswers   .objectiveAnswers_header{
    box-sizing: border-box;
    padding: 10px 20px;
    color: #5093e1;
    font-size: 16px;
    border-bottom: 1px solid  #ccc;
}
.wd_objectiveAnswers   .objectiveAnswers_header .iconguanbi1{
    color: #4a4a4a;
    vertical-align:middle;
    cursor: pointer;
    margin-top: 2px;
    
}
.wd_objectiveAnswers .objectiveAnswers_footer {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    border-top: 1px solid #ccc;
    padding-top: 10px;
}
.wd_objectiveAnswers .objectiveAnswers_footer button:nth-child(1) {
    border-radius: 2px !important;
    padding: 0 22px !important;
    height: 36px !important;
    line-height: 36px !important;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
    color: #4a4a4a !important;
    background: #fff;
    font-size: 16px !important;
    border: 1px solid #ccc;
    margin-right: 30px;
    cursor: pointer;
    outline: none;
}
.wd_objectiveAnswers .objectiveAnswers_footer button:nth-child(2) {
    border-radius: 2px;
    outline: none;
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
.wd_objectiveAnswers .objectiveAnswers_main{
    width: 100%;
    padding: 20px;
    max-height: 450px;
    overflow: auto;
    box-sizing: border-box;
}
.wd_objectiveAnswers .objectiveAnswers_main h3 input[type="number"]{
    width: 50px;
    height: 25px;
    vertical-align: middle;
    text-align: center;
    line-height: 25px;

}
.wd_objectiveAnswers .objectiveAnswers_main h3 span{
    margin-right: 10px;
}
.wd_objectiveAnswers .objectiveAnswers_main ul{
    padding-bottom: 20px;
}
.wd_objectiveAnswers .objectiveAnswers_main li{
    width: 197px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px 5px;
    margin-top: 20px;
    margin-right: 13px;
}
.wd_objectiveAnswers .objectiveAnswers_main li div:nth-child(1){
    line-height: 25px;
}
.wd_objectiveAnswers .objectiveAnswers_main label{
    cursor: pointer;
}
.wd_objectiveAnswers .objectiveAnswers_main li input{
    width: 50px;
    height: 25px;
    vertical-align: middle;
    text-align: center;
    line-height: 25px;
    margin: 0 10px;
    outline: none;
}
.wd_objectiveAnswers .objectiveAnswers_main li div:nth-child(2) p {
    margin-bottom: 10px;
    width: 163px;
}
.wd_objectiveAnswers .objectiveAnswers_main li div:nth-child(2) p span{
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 2px;
    cursor: pointer; 
}
.wd_objectiveAnswers .objectiveAnswers_main li div:nth-child(2) p span.active{
    background: #2d8cf0;
    color: #fff;
}
</style>