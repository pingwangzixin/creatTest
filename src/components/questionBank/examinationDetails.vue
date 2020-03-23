<template>
    <div >
        <div class="wd_examinationDetails">
            <div class="wd_head" v-if="testPaper.paper">
                <h3>
                    <span v-text="testPaper.paper.title"></span>
                    <!-- <button>查看答题卡</button> -->
                </h3>
                <p class="clearfix">
                    <span class="fl">{{testPaper.paper.learnGradeName}}年级 | {{testPaper.paper.createBy}} | {{testPaper.paper.time}}</span>
                    <span class="fr" @click="unfoldingAnalysis">展开答案及解析</span>
                </p>
            </div>
            <div class="wd_main" v-if="testPaper.paper">
                <h3>{{testPaper.paper.title}}</h3>
                <h3>{{testPaper.paper.subjectName}}</h3>
                <div class="mattersNeedingAttention">
                    <p>注意事项：</p>
                    <p>1.本试卷分第Ⅰ卷（选择题）和第Ⅱ卷（非选择题）两部分，共5页。</p>
                    <p>2.答卷前，考生务必在答题卡上用直径0.5毫米的黑色字迹签字笔将自己的学校、班级、姓名及座位号。在右上角的信息栏填写自己的考号，并用2B铅笔填涂相应的信息点。</p>
                    <p>3.答Ⅰ卷时，选出每题答案后，用2B铅笔把答题卡上对应题目的答案标号涂黑。如需改动，用橡皮擦干净后，再选涂其他答案，答在本试卷上无效。</p>
                    <p>4.答第Ⅱ卷时，请用直径0.5毫米黑色字迹签字笔在答题卡上各题的答题区域内作答。答在本试卷上无效。</p>
                </div>
                <!-- <h3>第Ⅰ卷</h3> -->
                <ul class="topicContent">
                    <li v-for="(item,index) in testPaper.questionTypeList" :key="index">
                        <p>{{arr[index]}}、{{item.questionTypeName}}</p>
                        <ul ref="parentElement">
                            <li :class="{topic1:_num(item1)}" class="topic" v-for="(item1,index1) in item.questionList" :key="index1">
                                <p v-html="item1.questionBody"></p>
                                <p v-show="item1.state" v-html="item1.questionAnswer"></p>
                                <p v-show="item1.state" v-html="item1.questionParse"></p>
                                <div class="addExerciseBar" @click="addTopic(item1,$event)" v-if="!_num(item1)">+习题栏</div>
                                <div class="addExerciseBar" @click="addTopic(item1,$event)" v-if="_num(item1)">-习题栏</div>
                                <div class="analysis" @click="send(index,index1)">解析</div>                            
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="exerciseBar fr">
            <!--<div class="selected_topic toSelect">
                <i class="iconfont icontiku toSelectIcon"></i>
                <br/>
                <span>去选题</span>
            </div>-->
            <div @click="expandExerciseBar" ref="expandExerciseBar">
                {{$store.state.arr.length}}
                <br/>
                习题栏
            </div>
        </div>
        <button class="returnList" @click="returnList">返回列表</button>
    </div>
</template>

<script>
import { wordRelevant } from "@/api";
export default {
    name:"examinationDetails",
    data() {
        return {
            testPaper:{},
            arr:["一","二","三","四","五","六","七","八","九"],
            state:false,
            should1:true
        }
    },
    created(){
        wordRelevant.queryTestPaperDetails
        ({paperId:this.$route.query.id}).then(res=>{
            this.testPaper = res.data.data;
            for(let i = 0 ; i < this.testPaper.questionTypeList.length ; i++){
                if(this.testPaper.questionTypeList[i].questionList.length == 0){
                    this.testPaper.questionTypeList.splice(i,1);
                    i--;
                }
            }
            this.testPaper.questionTypeList.forEach((ele,index) => {
                ele.questionList.forEach(ele1=>{
                    ele1.state = false;
                })
            });
        })
    },
    methods:{
        returnList(){
            this.$router.back(-1);
        },
        expandExerciseBar(){
            this.$parent.exerciseBar();
        },
        getLeft(e){
            var offset=e.offsetLeft;
            if(e.offsetParent!=null) offset+=this.getLeft(e.offsetParent);
            return offset;
        },
        getTop(e){
            var offset=e.offsetTop;
            if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent);
            return offset;
        },
        // 添加习题栏
        addTopic(item,e){
        	console.log(item)
            if(this.should1){
                if(this._num(item)){
                    let target = e.target.parentElement;
                    var clonedNode = target.cloneNode(true);
                    $(clonedNode).css({"position":"fixed","left":this.$refs.expandExerciseBar.getBoundingClientRect().x,"top":this.$refs.expandExerciseBar.getBoundingClientRect().y,"z-index":1010,"width":0,"height":0,"box-size":'border-box',"background":'#fff',"border-radius":"5px","border":" 1px solid #ccc",'overflow': 'hidden',"transition":"all 0.7s "}).removeClass("topic1");
                    $(clonedNode).find("div").remove();
                    $(this.$refs.parentElement).append(clonedNode);
                    $(clonedNode).css({"left":target.getBoundingClientRect().x,"top":target.getBoundingClientRect().y-10,"width":target.getBoundingClientRect().width-22,"height":target.getBoundingClientRect().height-22})
                    setTimeout(()=>{
                        $(clonedNode).remove(); 
                        this.should1 = true;
                        this.$store.dispatch("requestAddObj",{userId:1,questionId:item.questionId,questionTypeId:item.questionTypeId,levelId:item.levelId,subjectId:item.subjectId});
                    },700)
                }else{
                    let target = e.target.parentElement;
                    var clonedNode = target.cloneNode(true);
                    $(clonedNode).css({"position":"fixed","left":target.getBoundingClientRect().x,"top":target.getBoundingClientRect().y-10,"z-index":1010,"width":target.getBoundingClientRect().width-22,"height":target.getBoundingClientRect().height-22,"box-size":'border-box',"background":'#fff',"border-radius":"5px","border":" 1px solid #ccc",'overflow': 'hidden',"transition":"all 0.7s "}).removeClass("topic1");
                    $(clonedNode).find("div").remove();
                    $(this.$refs.parentElement).append(clonedNode);
                    $(clonedNode).css({"left":this.$refs.expandExerciseBar.getBoundingClientRect().x,"top":this.$refs.expandExerciseBar.getBoundingClientRect().y,"width":0,"height":0})
                    setTimeout(()=>{
                        $(clonedNode).remove(); 
                        this.should1 = true;
                        this.$store.dispatch("requestAddObj",{userId:1,questionId:item.questionId,questionTypeId:item.questionTypeId,levelId:item.levelId,subjectId:item.subjectId});
                    },700)
                }

            }
            
            
        },
        _num(item){
            return this.$store.state.arr.some(ele=>{
                return  ele.questionId == item.questionId;
                
            })
        },
        send(index,index1){
            this.testPaper.questionTypeList[index].questionList[index1].state = !this.testPaper.questionTypeList[index].questionList[index1].state;
            this.testPaper = JSON.parse(JSON.stringify(this.testPaper));        
        },
        // 展开答案与解析
        unfoldingAnalysis(){
            this.state = !this.state;
            this.testPaper.questionTypeList.forEach((ele,index) => {
                ele.questionList.forEach(ele1=>{
                    ele1.state = this.state;
                    
                })
            });
            this.testPaper = JSON.parse(JSON.stringify(this.testPaper));
        }
    },
    mounted(){
    }
}
</script>

<style lang="" scoped>
.wd_examinationDetails{
    width: 100%;
    background-color: #ffffff;
    padding: 0;
    border-radius: 5px;
}
.wd_head{
    padding: 20px;
    border-bottom: 1px solid #dddddd;
    
    
}
.wd_head h3{
    padding-bottom: 10px;
}
.wd_head h3  span{
    font-size: 16px; 
    color: #333333;
    font-weight:700;
}
.wd_head h3  button{
    width: 100px;
	height: 32px;
	border-radius: 5px;
	border: solid 2px #5093e1;
    margin-left: 20px;
    outline: none;
    background: #fff;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: #5093e1;
    cursor: pointer;
}
.wd_head p span:nth-child(1){
    color: #333333;
    font-size: 14px;
}
.wd_head p span:nth-child(2){
    font-size: 14px;
    letter-spacing: 1px;
	color: #5093e1;
    cursor: pointer;
}
.wd_head p span:nth-child(3){
    font-size: 14px;
    letter-spacing: 1px;
	color: #5093e1;
    margin-right: 30px;
    cursor: pointer;
}
.wd_main{
    padding: 25px 38px;
}
.wd_main h3{
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
}
.wd_main .mattersNeedingAttention{
    line-height: 25px;
    letter-spacing: 1px;
    padding-bottom: 15px;
}
.wd_main .topicContent{
    line-height: 30px;
}
.wd_main .topicContent .topic{
    border-radius: 5px;
    border: 1px solid #ccc;
    position: relative;
    padding: 10px;
    margin-top: 10px;
}
.wd_main .topicContent .topic1{
    opacity: 0.6;
}
.wd_main .topicContent .topic .addExerciseBar{
    width: 72px;
    box-sizing: border-box;
	background-color: #ff8a00;
	border-radius: 5px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 25px;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    cursor: pointer;
}
.wd_main .topicContent .topic:hover{
    box-shadow: 0px 1px 5px 4px 
        rgba(0, 0, 0, 0.15);
}

.wd_main .topicContent .topic:hover .addExerciseBar{
    display:block;
}
.returnList{
    width: 140px;
	height: 40px;
	background-color: #ffffff;
	border-radius: 5px;
    color: #333333;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 50%;
    transform: translate(-50%);
}
.wd_main .topicContent .topic .analysis{
    padding: 1px 10px;
	background-color: #ff8a00;
	border-radius: 5px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 25px;
    position: absolute;
    right: 80px;
    top: 0;
    display: none;
    cursor: pointer;
}
.wd_main .topicContent .topic:hover .analysis{
    display:block;
}


.exerciseBar{
    width: 0px;
    position: relative;
}
.exerciseBar div:nth-child(1){
    width: 50px;
	height: 50px;
	background-color: #0169df;;
	border-radius: 3px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
    position: fixed;
    top: 230px;
    padding: 6px 0;
    margin-left: 5px;
    cursor: pointer;
}
.exerciseBar div:nth-child(2){
    width: 50px;
	height: 50px;
	background-color: #4a4a4a;
	border-radius: 3px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
    padding: 6px 0;
    position: fixed;
    top: 300px;
    margin-left: 5px;
    cursor: pointer;
}
</style>