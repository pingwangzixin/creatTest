<template>
    <div class="wd_question clearfix">
        <div class="wd_left fl">
            <h3>
                <span >学科学段</span>
                <select name="" id="" v-model="subject.selectSubjects" @change="selectSubjects">
                    <option :value="item" v-for="(item,index) in subject.arr" :key="index">{{item.fname}}</option>
                </select>
            </h3>
            <div class="main">
                <ul class="firstLevelNavigation clearfix">
                    <li @click="firstLevelNavigationSelection(index)" class="fl" :class="{active:item.isNewRecord}" v-for="(item,index) in nav" :key="index">{{item.name}}</li>
                </ul>
                <div class="teachingMaterial" v-if="nav.length > 0" v-show="nav[0].isNewRecord">
                    <select name="" id="" v-model="VersionNumber.selectVersionNumber" @change="selectVersionNumber">
                        <option v-for="(item,index) in VersionNumber.arr" :key="index" :value="item">{{item.versionName}}</option>
                    </select>
                    <ul>
                        <li v-for="(item,index) in textbookOutline" :key="index">
                            <p class="secondLevelNavigation" :class="{active:item.state}" @click="selectiveGrade('textbookOutline',index,item.state)">{{item.name}}<i class="iconfont iconup2 fr" v-if="!item.state"></i><i class="iconfont iconarrow-down fr" v-if="item.state"></i></p>
                            <ul>
                                <li v-for="(item1,index1) in item.children" :key="index1" v-if="item.state">
                                    <p class="thirdLevelNavigation"  @click="choiceChapter('textbookOutline',index1,item1.state)"><i class="iconfont iconjiahao" v-if="!item1.state"></i><i class="iconfont iconjian" v-if="item1.state"></i>{{item1.name}}</p>
                                    <ul>
                                        <li v-for="(item2,index2) in item1.children" :key="index2" v-if="item1.state">
                                            <p class="fourthLevelNavigation"  @click="selectionSection('textbookOutline',index2,item2.state)"><i class="iconfont iconjiahao" v-if="!item2.state"></i><i class="iconfont iconjian" v-if="item2.state"></i>{{item2.name}}</p>
                                            <ul>
                                                <li v-for="(item3,index3) in item2.children" :key="index3" v-if="item2.state">
                                                    <p class="fifthLevelNavigation"  @click="selectiveCourse('textbookOutline',index3,item3.state)">{{item3.name}}</p>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="teachingMaterial" v-if="nav.length > 0" v-show="nav[1].isNewRecord">
                    <ul>
                        <li v-for="(item,index) in knowledgePointOutline" :key="index">
                            <p class="secondLevelNavigation" :class="{active:item.state}" @click="selectiveGrade('knowledgePointOutline',index,item.state)">{{item.name}}<i class="iconfont iconup2 fr" v-if="!item.state"></i><i class="iconfont iconarrow-down fr" v-if="item.state"></i></p>
                            <ul>
                                <li v-for="(item1,index1) in item.children" :key="index1" v-if="item.state">
                                    <p class="thirdLevelNavigation"  @click="choiceChapter('knowledgePointOutline',index1,item1.state)"><i class="iconfont iconjiahao" v-if="!item1.state"></i><i class="iconfont iconjian" v-if="item1.state"></i>{{item1.name}}</p>
                                    <ul>
                                        <li v-for="(item2,index2) in item1.children" :key="index2" v-if="item1.state">
                                            <p class="fourthLevelNavigation"  @click="selectionSection('knowledgePointOutline',index2,item2.state)"><i class="iconfont iconjiahao" v-if="!item2.state"></i><i class="iconfont iconjian" v-if="item2.state"></i>{{item2.name}}</p>
                                            <ul>
                                                <li v-for="(item3,index3) in item2.children" :key="index3" v-if="item2.state">
                                                    <p class="fifthLevelNavigation"  @click="selectiveCourse('knowledgePointOutline',index3,item3.state)">{{item3.name}}</p>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="teachingMaterial" v-if="nav.length > 0" v-show="nav[2].isNewRecord">
                    <ul>
                        <li v-for="(item,index) in testPaper" :key="index">
                            <p class="secondLevelNavigation" :class="{active:item.state}" @click="selectiveGrade('testPaper',index,item.state,item.name)">{{item.name}}<i class="iconfont iconup2 fr" v-if="!item.state"></i><i class="iconfont iconarrow-down fr" v-if="item.state"></i></p>
                        </li>
                    </ul>
                </div>
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
        <div class="wd_right fr">
            <ul class="clearfix header">
                <li class="fl active">公共题库</li>
            </ul>
            <div class="main">
                <div class="searchBar">
                    <p class="clearfix" v-if="nav.length > 0" v-show="nav[0].isNewRecord || nav[1].isNewRecord">
                        <span class="fl">题型:</span>
                        <span class="option fl">
                            <span :class="{active:questionType.state}" @click="questionTypeAll">全部</span>
                            <span v-for="(item,index) in questionType.arr" @click="questionTypeClick(index)" :key="index" :class="{active:item.state}">{{item.questionTypeName}}</span>
                        </span>
                    </p>
                    <p class="clearfix" v-if="nav.length > 0" v-show="nav[0].isNewRecord || nav[1].isNewRecord">
                        <span class="fl">难度:</span>
                        <span class="option1 fl">
                            <span :class="{active:difficulty.state}" @click="difficultyAll">全部</span>
                            <span v-for="(item,index) in difficulty.arr" :key="index" @click="difficultyClick(index)" :class="{active:item.state}">{{item.questionDifferentName}}</span>
                        </span>
                    </p>
                    <p class="clearfix"  v-if="nav.length > 0"  v-show="nav[2].isNewRecord">
                        <span class="fl">类型:</span>
                        <span class="option fl">
                            <span :class="{active:testQuestionsType.state}" @click="testQuestionsTypeAll">全部</span>
                            <span v-for="(item,index) in testQuestionsType.arr" @click="testQuestionsTypeClick(index)" :key="index" :class="{active:item.state}">{{item.name}}</span>
                        </span>
                    </p>
                    <p class="clearfix"  v-if="nav.length > 0"  v-show="nav[2].isNewRecord">
                        <span class="fl">省份:</span>
                        <span class="option1 fl">
                            <span :class="{active:testPaperProvince.state}" @click="testPaperProvinceAll">全部</span>
                            <span v-for="(item,index) in testPaperProvince.arr" @click="testPaperProvinceClick(index)" :key="index" :class="{active:item.state}" >{{item.name}}</span>
                        </span>
                    </p>
                    <p class="clearfix"  v-if="nav.length > 0"  v-show="nav[2].isNewRecord">
                        <span class="fl">时间:</span>
                        <span class="option1 fl">
                            <span :class="{active:testPaperYear.state}" @click="testPaperYearAll">全部</span>
                            <span v-for="(item,index) in testPaperYear.arr" @click="testPaperYearClick(index)" :key="index" :class="{active:item.state}">{{item.sort}}</span>
                        </span>
                    </p>
                    <input type="text" name="" id="search" placeholder="请输入相关字" @keyup.enter="searchEvent" v-model="searchContent">
                    <i class="iconfont iconsousuo"  @click="searchEvent"></i>
                </div>
                <div class="topicsList">
                    <!-- <h3>共{{testQuestionsDetails.count}}套题</h3> -->
                    <div>
                        <ul class="testQuestions" ref="parentElement"  v-if="nav.length > 0"  v-show="nav[0].isNewRecord || nav[1].isNewRecord">
                            <li  :class="{topic:_num(item)}" v-for="(item,index) in testQuestionsDetails.arr" :key="index" :ref="'a'+index">
                                <div class="addExerciseBar" @click="addTopic(item,$event)" v-if="!_num(item)">+习题栏</div>
                                <div class="addExerciseBar" @click="addTopic(item,$event)" v-if="_num(item)">-习题栏</div>
                                <div class="analysis" @click="send(index)">解析</div>
                                <p v-html="item.questionBody"></p>
                                <p v-if="item.state" v-html="item.questionAnswer"></p>
                                <p v-if="item.state" v-html="item.questionParse"></p>
                            </li>
                        </ul>
                        <ul  class="testPaper" v-if="nav.length > 0"  v-show="nav[2].isNewRecord">
                            <li :class="{topic:_num(item)}" v-for="(item,index) in examinationPaperlist" :key="index" :ref="'a'+index" >
                                <p>{{item.note}} <span class="fr">共{{item.paperQuesCount}}题</span></p>
                                <p>类型：{{item.paperTypeName}}  {{item.createDate}}</p>
                                <div>
                                    <!-- <button>收藏</button>                                     -->
                                    <button @click="clickTestPaper(item)">选题</button>                                    
                                </div>
                            </li>
                        </ul> 
                        <div class="paging" v-if="pageInfo != null">
                            <i class="iconfont iconxiangzuo" :class="pageInfo.prePage.state =='disabled'?'disabledBn':''" @click="pageChange(pageInfo.prePage)"></i>
                            <span v-for="(item,index) in pageInfo.middlePageInfoLists" :key="index" class="pageNum" :class="item.state=='active'?'activePageBn':''"
                            @click="pageChange(item)">{{item.text}}</span>
                            <i class="iconfont iconicon03" :class="pageInfo.nextPage.state =='disabled'?'':''" @click="pageChange(pageInfo.nextPage)" ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import { wordRelevant } from "@/api";
export default {
    name:"questionlist",
    data() {
        return {
            bol:false,
            // 导航栏    教材   知识点   试卷
            nav:[],
            // 学科
            subject:{
                selectSubjects:{},
                arr:[]
            },
            //学段id
            levelId : '',
            // 版本
            VersionNumber:{
                selectVersionNumber:{},
                arr:[]
            },
            // 教材大纲
            textbookOutline:[],
            // 知识点大纲
            knowledgePointOutline:[],
            // 试卷
            learningSection : {
            	primary :[{
                    name:"一年级",
                    isNewRecord:true
                },
                {
                    name:"二年级",
                    isNewRecord:false
                },
                {
                    name:"三年级",
                    isNewRecord:false
                },
            	{
                    name:"四年级",
                    isNewRecord:false
                },
                {
                    name:"五年级",
                    isNewRecord:false
                },
                {
                    name:"六年级",
                    isNewRecord:false
                }],
            	middle :[{
                    name:"初一",
                    isNewRecord:true
                },
                {
                    name:"初二",
                    isNewRecord:false
                },
                {
                    name:"初三",
                    isNewRecord:false
                }],
            	high :[{
                    name:"高一",
                    isNewRecord:true
                },
                {
                    name:"高二",
                    isNewRecord:false
                },
                {
                    name:"高三",
                    isNewRecord:false
                }]
            },
            testPaper:[],
            // 题型
            questionType:{
                state:true,
                arr:[
                    
                ]
            },
            // 难度
            difficulty:{
                state:true,
                arr:[
                     
                ]
            },
            // 试题类型
            testQuestionsType:{
                state:true,
                arr:[
                     
                ]
            },
            // 试题年份
            testPaperYear:{
                state:true,
                arr:[
                     
                ]
            },
            // 试题省份
            testPaperProvince:{
                state:true,
                arr:[
                     
                ]
            },
            // 试题详情
            testQuestionsDetails:{
                count:"",
                arr:[]
            },
            examinationPaperlist:[],
            // 分页信息
            pageInfo:null,
            // 教材查询条件
            teachingMaterialCondition:{
                textBookId:"",
                pageNo:1,
                pageSize:10,
                search:"",
                questionTypeIds:2,
                questionDifferentIds:2,
                subjectId : '',
                levelId : ''
            },
            // 知识点查询条件
            KnowledgePointCondition:{
                specialId:"",
                pageNo:1,
                pageSize:10,
                search:"",
                questionTypeIds:"",
                questionDifferentIds:"",
                subjectId : '',
                levelId : ''
            },
             // 试卷查询条件
            examinationConditions:{
                levelId:"level_2",
                subjectId:"subject_2_2",
                learnGradeName:"初一",
                paperTypeId:"8,3,14",
                paperProvinceId:"6,7,20",
                paperYearId:"2013,2014",
                pageNo:1,
                pageSize:10
            },
            searchContent:"",
            should1:true
        }
    },
    methods:{
        // 添加习题栏
        addTopic(item,e){
        	console.log(item)
            if(this.should1){
                this.should1 = false;
                if(this._num(item)){
                    let target = e.target.parentElement;
                    var clonedNode = target.cloneNode(true);
                    $(clonedNode).css({"position":"fixed","left":this.$refs.expandExerciseBar.getBoundingClientRect().x,"top":this.$refs.expandExerciseBar.getBoundingClientRect().y,"z-index":1010,"width":0,"height":0,"box-size":'border-box',"background":'#fff',"border-radius":"5px","border":" 1px solid #ccc",'overflow': 'hidden',"transition":"all 0.7s "}).removeClass("topic");
                    $(clonedNode).find("div").remove();
                    $(this.$refs.parentElement).append(clonedNode);
                    $(clonedNode).css({"left":target.getBoundingClientRect().x,"top":target.getBoundingClientRect().y-10,"width":target.getBoundingClientRect().width,"height":target.getBoundingClientRect().height})
                    setTimeout(()=>{
                        $(clonedNode).remove(); 
                        this.should1 = true;
                        this.$store.dispatch("requestAddObj",{userId:1,questionId:item.questionId,questionTypeId:item.questionTypeId,levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
                    },700)
                }else{
                    let target = e.target.parentElement;
                    var clonedNode = target.cloneNode(true);
                    $(clonedNode).css({"position":"fixed","left":target.getBoundingClientRect().x,"top":target.getBoundingClientRect().y-10,"z-index":1010,"width":target.getBoundingClientRect().width,"height":target.getBoundingClientRect().height,"box-size":'border-box',"background":'#fff',"border-radius":"5px","border":" 1px solid #ccc",'overflow': 'hidden',"transition":"all 0.7s "}).removeClass("topic");
                    $(clonedNode).find("div").remove();
                    $(this.$refs.parentElement).append(clonedNode);
                    $(clonedNode).css({"left":this.$refs.expandExerciseBar.getBoundingClientRect().x,"top":this.$refs.expandExerciseBar.getBoundingClientRect().y,"width":0,"height":0})
                    setTimeout(()=>{
                        $(clonedNode).remove(); 
                        this.should1 = true;
                        this.$store.dispatch("requestAddObj",{userId:1,questionId:item.questionId,questionTypeId:item.questionTypeId,levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
                    },700)
                }
            }
            
        },
        // 选择学科
        selectSubjects(){
        	this.levelId = this.subject.selectSubjects.lid;
        	if(this.subject.selectSubjects.lname == "小学"){
        		this.testPaper = this.learningSection.primary;
        	}else if(this.subject.selectSubjects.lname == "初中"){
        		this.testPaper = this.learningSection.middle;
        	}else if(this.subject.selectSubjects.lname == "高中"){
        		this.testPaper = this.learningSection.high;
        	}
        	this.teachingMaterialCondition.subjectId = this.subject.selectSubjects.sid;
        	this.teachingMaterialCondition.levelId = this.levelId;
        	this.KnowledgePointCondition.subjectId = this.subject.selectSubjects.sid;
        	this.KnowledgePointCondition.levelId = this.levelId;
            this.examinationConditions.subjectId = this.subject.selectSubjects.sid; 
            this.examinationConditions.levelId = this.levelId; 
            this.nav.forEach(ele=>{

                if(ele.isNewRecord){
                    if(ele.sort == "1"){
                        this.queryVersionNo({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
                    }
                    if(ele.sort == "2"){
                        this.queryKnowledgePointOutline({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
                    }
                    if(ele.sort == "3"){
                        this.queryTestPaperList();
                    }
                }
            })
            this.queryQuestionType({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
            this.queryTestQuestionsType({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
            this.$store.dispatch("requestViewTitle",{levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
            this.queryDifficulty();
            this.queryTestPaperYear();
            this.queryTestPaperProvince();
        },
        // 选择版本
        selectVersionNumber(){
            this.queryTextbookOutline({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid,versionId:this.VersionNumber.selectVersionNumber.versionId});
        },
        // 教材内容查询
        queryTextbook(){
            this.testQuestionsDetails = {
                arr:[],
                count:0
            };
            this.pageInfo = null;
                console.log(this.teachingMaterialCondition)
            
            wordRelevant.queryTextbook(this.teachingMaterialCondition).then(res=>{
                console.log(res)
                this.testQuestionsDetails.arr = res.data.data.list;
                console.log(this.testQuestionsDetails.arr)
                this.pageInfo =  res.data.data.pageInfo;
                this.testQuestionsDetails.count = res.data.data.count;
                this.testQuestionsDetails.arr.forEach(ele=>{
                    ele.state = false;
                    ele.state1 = this.$store.state.arr.some(ele1=>{
                        return  ele.id == ele1.id;
                    })
                })
            })
        },
        // 选择年级
        selectiveGrade(type,i,bol,name){
        	console.log(type)
        	console.log(this[type])
        	console.log(name)
            this[type].forEach((ele,index)=>{
                ele.state = false;
                if(index == i){
                    ele.state = !bol;
                    this.teachingMaterialCondition.search = "";
                    this.KnowledgePointCondition.search = "";
                    if(type == "textbookOutline"){
                        this.teachingMaterialCondition.textBookId = ele.id;
                        this.teachingMaterialCondition.pageNo = 1;
                        this.queryTextbook();
                    }else if(type ==  "knowledgePointOutline"){
                        this.KnowledgePointCondition.specialId = ele.id;
                        this.KnowledgePointCondition.pageNo = 1;
                        this.knowledgePointsTextbook();
                    }else if(type == "testPaper"){
                    	this.queryTestPaperList(name);
                    	/*wordRelevant.queryTestPaperList(this.examinationConditions).then(res=>{
			                this.examinationPaperlist = res.data.data.list;
			                this.pageInfo =  res.data.data.pageInfo;
			            });*/
                    }
                }
            });
            // if(type != "testPaper"){
            //     this.choiceChapter(type,i,bol)
            // }
            this[type]=  JSON.parse(JSON.stringify(this[type]));
            
        },
        // 选择章
        choiceChapter(type,i,bol){
            this[type].forEach((ele,index)=>{
                if(ele.state){
                    ele.children.forEach((ele1,index1)=>{
                        ele1.state = false;
                        if(index1 == i){
                            ele1.state = !bol;  
                            this.teachingMaterialCondition.search = "";
                            this.KnowledgePointCondition.search = "";
                            if(type == "textbookOutline"){
                                this.teachingMaterialCondition.textBookId = ele1.id;
                                this.teachingMaterialCondition.pageNo = 1;
                                this.queryTextbook();
                            }else if(type ==  "knowledgePointOutline"){
                                this.KnowledgePointCondition.specialId = ele1.id;
                                this.KnowledgePointCondition.pageNo = 1;
                                this.knowledgePointsTextbook();
                            }
                        }
                    })
                }
            })
            this[type] =  JSON.parse(JSON.stringify(this[type]));
        },
        // 选择节
        selectionSection(type,i,bol){
            this[type].forEach((ele,index)=>{
                if(ele.state){
                    ele.children.forEach((ele1,index1)=>{
                        if(ele1.state){
                            ele1.children.forEach((ele2,index2)=>{
                                ele2.state = false;
                                if(index2 == i){
                                    ele2.state = !bol; 
                                    this.teachingMaterialCondition.search = "";
                                    this.KnowledgePointCondition.search = "";
                                    if(type == "textbookOutline"){
                                        this.teachingMaterialCondition.textBookId = ele2.id;
                                        this.teachingMaterialCondition.pageNo = 1;
                                        this.queryTextbook();
                                    }else if(type ==  "knowledgePointOutline"){
                                        this.KnowledgePointCondition.specialId = ele2.id;
                                        this.KnowledgePointCondition.pageNo = 1;
                                        this.knowledgePointsTextbook();
                                    }
                                }
                            })
                        }
                    })
                }
            });
            this[type] =  JSON.parse(JSON.stringify(this[type]));
        },
        // 选择课
        selectiveCourse(type,i){
            this[type].forEach((ele,index)=>{
                if(ele.state){
                    ele.children.forEach((ele1,index1)=>{
                        if(ele1.state){
                            ele1.children.forEach((ele2,index2)=>{
                                if(ele2.state){
                                    ele1.children.forEach((ele3,index3)=>{
                                        if(index3 == i){
                                            this.teachingMaterialCondition.search = "";
                                            this.KnowledgePointCondition.search = "";
                                            if(type == "textbookOutline"){
                                                this.teachingMaterialCondition.textBookId = ele3.id;
                                                this.teachingMaterialCondition.pageNo = 1;

                                                this.queryTextbook();
                                            }else if(type ==  "knowledgePointOutline"){
                                                this.KnowledgePointCondition.specialId = ele3.id;
                                                this.KnowledgePointCondition.pageNo = 1;
                                                this.knowledgePointsTextbook();
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
            this[type] =  JSON.parse(JSON.stringify(this[type]));
        },
        // 展开习题栏
        expandExerciseBar(){
            this.$parent.exerciseBar();
        },
        // 查询版本号
        queryVersionNo(data){
            wordRelevant.queryVersionNo(data).then(res=>{
                this.VersionNumber.arr = res.data.data;
                this.VersionNumber.selectVersionNumber = this.VersionNumber.arr[0];
                let obj = JSON.parse(JSON.stringify(data))
                obj.versionId = this.VersionNumber.selectVersionNumber.versionId;
                this.queryTextbookOutline(obj);
                
            })
        },
        // 查询教材大纲
        queryTextbookOutline(data){
            wordRelevant.queryTextbookOutline(data).then(res=>{
                this.textbookOutline = res.data.data;
                this.selectiveGrade('textbookOutline',0);
            })
        },
        // 查询题库知识点
        queryKnowledgePointOutline(data){
            wordRelevant.queryKnowledgePointOutline(data).then(res=>{
                this.knowledgePointOutline = res.data.data;
                this.selectiveGrade('knowledgePointOutline',0);
            })
        },
        // 查询题型
        queryQuestionType(data){
            wordRelevant.queryQuestionType(data).then(res=>{
                this.questionType.arr = res.data.data;
                this.questionType.state = true;
                let str = "";
                this.questionType.arr.forEach((ele,index)=>{
                    ele.state = false;
                    if(index == this.questionType.arr.length-1){
                        str += ele.questionTypeId;
                    }else{
                        str += ele.questionTypeId + ",";
                    }
                })
                this.teachingMaterialCondition.questionTypeIds = str;
                this.KnowledgePointCondition.questionTypeIds = str;
            })
        },
        // 查询难度
        queryDifficulty(){
            wordRelevant.queryDifficulty().then(res=>{
                this.difficulty.arr = res.data.data;
                this.difficulty.state = true;
                let str = "";
                this.difficulty.arr.forEach((ele,index)=>{
                    ele.state = false;
                    if(index == this.difficulty.arr.length-1){
                        str += ele.questionDifferentId;
                    }else{
                        str += ele.questionDifferentId + ",";
                    }
                })
                this.teachingMaterialCondition.questionDifferentIds = str;
                this.KnowledgePointCondition.questionDifferentIds = str;
            })
        },
        // 展开解析
        send(index){
            this.testQuestionsDetails.arr[index].state = !this.testQuestionsDetails.arr[index].state;
            this.testQuestionsDetails = JSON.parse(JSON.stringify(this.testQuestionsDetails));

        },
        // 题型全选
        questionTypeAll(){
            this.questionType.state = true;
            this.questionType.arr.forEach(ele=>{
                ele.state = false;
            })
            let str = "";
            this.questionType.arr.forEach((ele,index)=>{
                ele.state = false;
                if(index == this.questionType.arr.length-1){
                    str += ele.questionTypeId;
                }else{
                    str += ele.questionTypeId + ",";
                }
            })
            this.teachingMaterialCondition.questionTypeIds = str;
            this.KnowledgePointCondition.questionTypeIds = str;
            this.teachingMaterialCondition.search = "";
            this.KnowledgePointCondition.search = "";
            if(this.nav[0].isNewRecord){
                this.queryTextbook();
            }else if(this.nav[1].isNewRecord){
                this.knowledgePointsTextbook();
            }
            
        },
        // 难度全选
        difficultyAll(){
            this.difficulty.state = true;
            this.difficulty.arr.forEach(ele=>{
                ele.state =false;
            });
            let str = "";
            this.difficulty.arr.forEach((ele,index)=>{
                ele.state = false;
                if(index == this.difficulty.arr.length-1){
                    str += ele.questionDifferentId;
                }else{
                    str += ele.questionDifferentId + ",";
                }
            })
            this.teachingMaterialCondition.questionDifferentIds = str;
            this.KnowledgePointCondition.questionDifferentIds = str;
            this.teachingMaterialCondition.search = "";
            this.KnowledgePointCondition.search = "";
            if(this.nav[0].isNewRecord){
                this.queryTextbook();
            }else if(this.nav[1].isNewRecord){
                this.knowledgePointsTextbook();
            }
        },
        // 试卷类型全选
        testQuestionsTypeAll(){
            this.testQuestionsType.state = true;
            let str = "";
            this.testQuestionsType.arr.forEach((ele,index)=>{
                ele.state = false;
                if(index == this.testQuestionsType.length){
                    str += ele.paperTypeId;
                }else{
                    str += ele.paperTypeId + ",";
                }
            })
            this.examinationConditions.paperTypeId = str;
            this.queryTestPaperList();
        },
        // 试卷省份全选
        testPaperProvinceAll(){
            this.testPaperProvince.state =true;
            let str = "";
            this.testPaperProvince.arr.forEach((ele,index)=>{
                ele.state = false;
                if(index == this.testPaperProvince.length){
                    str += ele.sort;
                }else{
                    str += ele.sort + ",";
                }
            })
            this.examinationConditions.paperProvinceId = str;
            this.queryTestPaperList();
        },
        // 试卷年份全选
        testPaperYearAll(){
            this.testPaperYear.state = true;
            let str = "";
            this.testPaperYear.arr.forEach((ele,index)=>{
                ele.state = false;
                if(index == this.testPaperYear.length){
                    str += ele.sort;
                }else{
                    str += ele.sort + ",";
                }
            })
            this.examinationConditions.paperYearId = str;
            this.queryTestPaperList();
        },
        // 题型单个选择
        questionTypeClick(index){
            this.questionType.state = false;
            this.questionType.arr.forEach(ele=>{
                ele.state = false;
            });
            this.questionType.arr[index].state = true;
            this.questionType = JSON.parse(JSON.stringify(this.questionType));
            this.teachingMaterialCondition.questionTypeIds =  this.questionType.arr[index].questionTypeId;
            this.KnowledgePointCondition.questionTypeIds = this.questionType.arr[index].questionTypeId;
            this.teachingMaterialCondition.search = "";
            this.KnowledgePointCondition.search = "";
            if(this.nav[0].isNewRecord){
                this.queryTextbook();
            }else if(this.nav[1].isNewRecord){
                this.knowledgePointsTextbook();
            }
        },
        // 难度单个选择
        difficultyClick(index){
            this.difficulty.state = false;
            this.difficulty.arr.forEach(ele=>{
                ele.state = false;
            });
            this.difficulty.arr[index].state = true;
            this.difficulty = JSON.parse(JSON.stringify(this.difficulty));
            this.teachingMaterialCondition.questionDifferentIds = this.difficulty.arr[index].questionDifferentId;
            this.KnowledgePointCondition.questionDifferentIds = this.difficulty.arr[index].questionDifferentId;
            this.teachingMaterialCondition.search = "";
            this.KnowledgePointCondition.search = "";
            if(this.nav[0].isNewRecord){
                this.queryTextbook();
            }else if(this.nav[1].isNewRecord){
                this.knowledgePointsTextbook();
            }
        },
        // 试卷类型选择
        testQuestionsTypeClick(index){
            this.testQuestionsType.state = false;
            this.testQuestionsType.arr.forEach(ele=>{
                ele.state = false;
            });
            this.testQuestionsType.arr[index].state = true;
            this.testQuestionsType = JSON.parse(JSON.stringify(this.testQuestionsType));
            this.examinationConditions.paperTypeId = this.testQuestionsType.arr[index].paperTypeId;
            this.queryTestPaperList();
        },
        // 试卷省份选择
        testPaperProvinceClick(index){
            this.testPaperProvince.state = false;
            this.testPaperProvince.arr.forEach(ele=>{
                ele.state = false;
            });
            this.testPaperProvince.arr[index].state = true;
            this.testPaperProvince = JSON.parse(JSON.stringify(this.testPaperProvince));
            this.examinationConditions.paperProvinceId = this.testPaperProvince.arr[index].sort;
            this.queryTestPaperList();
        },
        // 试卷年份
        testPaperYearClick(index){
            this.testPaperYear.state = false;
            this.testPaperYear.arr.forEach(ele=>{
                ele.state = false;
            });
            this.testPaperYear.arr[index].state = true;
            this.testPaperYear = JSON.parse(JSON.stringify(this.testPaperYear));
            this.examinationConditions.paperYearId = this.testPaperYear.arr[index].sort;
            this.queryTestPaperList();
        },
        // 第一级导航选择  教材   知识点
        firstLevelNavigationSelection(i){
            this.nav.forEach((ele,index)=>{
                ele.isNewRecord = false;
                if(i == index){
                    ele.isNewRecord = true;
                    if(ele.sort == "1"){
                        this.queryVersionNo({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
                    }
                    if(ele.sort == "2"){
                        this.queryKnowledgePointOutline({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
                    }
                    if(ele.sort == "3"){
                        this.queryTestPaperList(this.subject.selectSubjects.lname);
                    }
                }
            })
        },
        // 查询试题类型
        queryTestQuestionsType(data){
            wordRelevant.queryTestQuestionsType(data).then(res=>{
                this.testQuestionsType.arr =  res.data.data.list;
                this.testQuestionsType.state = true;
                let str = "";
                this.testQuestionsType.arr.forEach((ele,index)=>{
                    ele.state = false;
                    if(index == this.testQuestionsType.length){
                        str += ele.paperTypeId;
                    }else{
                        str += ele.paperTypeId + ",";
                    }
                });
                this.examinationConditions.paperTypeId = str;
            })
        },
        // 查询试题年份
        queryTestPaperYear(){
            wordRelevant.queryTestPaperYear().then(res=>{
                this.testPaperYear.arr =  res.data.data.list;
                this.testPaperYear.state = true;
                let str = "";
                this.testPaperYear.arr.forEach((ele,index)=>{
                    ele.state = false;
                    if(index == this.testPaperYear.length){
                        str += ele.sort;
                    }else{
                        str += ele.sort + ",";
                    }
                })
                this.examinationConditions.paperYearId = str;
            })
        },
        // 查询试题省份
        queryTestPaperProvince(){
            wordRelevant.queryTestPaperProvince().then(res=>{
                this.testPaperProvince.arr =  res.data.data.list.splice(1,res.data.data.list.length - 1);
                this.testPaperProvince.state = true;
                let str = "";
                this.testPaperProvince.arr.forEach((ele,index)=>{
                    ele.state = false;
                    if(index == this.testPaperProvince.length){
                        str += ele.sort;
                    }else{
                        str += ele.sort + ",";
                    }
                })
                this.examinationConditions.paperProvinceId = str;
            })
        },
        // 查询试卷列表
        queryTestPaperList(name){
            this.pageInfo = null;
            this.examinationPaperlist = null;
            this.examinationConditions.learnGradeName = name;
            console.log(this.examinationConditions)
            wordRelevant.queryTestPaperList(this.examinationConditions).then(res=>{
                this.examinationPaperlist = res.data.data.list;
                this.pageInfo =  res.data.data.pageInfo;
            })
        },
        // 知识点查询
        knowledgePointsTextbook(){
            this.testQuestionsDetails = {
                arr:[],
                count:0
            }
            this.pageInfo = null;
            console.log(this.KnowledgePointCondition)
            wordRelevant.knowledgePointsTextbook(this.KnowledgePointCondition).then(res=>{
            	
                this.testQuestionsDetails.arr = res.data.data.list;
                this.pageInfo =  res.data.data.pageInfo;
                this.testQuestionsDetails.count = res.data.data.count;
                this.testQuestionsDetails.arr.forEach(ele=>{
                    ele.state = false;
                    ele.state1 = this.$store.state.arr.some(ele1=>{
                        return  ele.id == ele1.id;
                    })
                })
            })
        },
        // 第几页
        pageChange(item){
            this.nav.forEach(ele=>{
                if(ele.isNewRecord  && ele.name=="教材"){
                    this.teachingMaterialCondition.pageNo =item.pageNo;
                    this.queryTextbook();
                }
                if(ele.isNewRecord  && ele.name=="知识点"){
                    this.KnowledgePointCondition.pageNo = item.pageNo;
                    this.knowledgePointsTextbook();
                }
                if(ele.isNewRecord  && ele.name=="试卷"){
                    this.examinationConditions.pageNo = item.pageNo;
                    this.queryTestPaperList();
                }
            })
        },
        // 点击试卷
        clickTestPaper(item){
            console.log(item)
            this.$router.push({path:"/index/questionBank/examinationDetails",query:{id:item.id}})
        },
        _num(item){
            return this.$store.state.arr.some(ele=>{
                return  ele.questionId == item.questionId;
            })
        },
        // 搜索
        searchEvent(){
            this.nav.forEach(ele=>{
                if(ele.isNewRecord  && ele.name=="教材"){
                    this.teachingMaterialCondition.search =this.searchContent;
                    this.queryTextbook();
                }
                if(ele.isNewRecord  && ele.name=="知识点"){
                    this.KnowledgePointCondition.search = this.searchContent;
                    this.knowledgePointsTextbook();
                }
                if(ele.isNewRecord  && ele.name=="试卷"){
                    this.queryTestPaperList();
                }
            })
        },
        

    },
    created(){
        // 获取学科 getSubjectData subjectListData
        wordRelevant.subjectListData({levelId: "" }).then(res => {
        	console.log(res.data.data)
        	
            this.subject.arr = res.data.data;
            this.testPaper = this.learningSection.primary;
//          this.subject.arr = res.data.data.list;
            this.subject.selectSubjects = this.subject.arr[0];
            this.levelId = this.subject.selectSubjects.lid;
            this.queryQuestionType({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
            this.queryDifficulty();
            this.queryTestQuestionsType({levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
            this.teachingMaterialCondition.subjectId = this.subject.selectSubjects.sid;
            this.teachingMaterialCondition.levelId = this.levelId;
            this.KnowledgePointCondition.subjectId = this.subject.selectSubjects.sid;
        	this.KnowledgePointCondition.levelId = this.levelId;
            this.queryTestPaperYear();
            this.queryTestPaperProvince();
            // 获取导航栏
            wordRelevant.questionBankNavQuery().then(res=>{
                this.nav = res.data.data.list;
                this.firstLevelNavigationSelection(0);
            })
            this.$store.dispatch("requestViewTitle",{levelId:this.levelId,subjectId:this.subject.selectSubjects.sid});
        })
        .catch(e => {});
//      this.$store.dispatch('getlists',name)
        
    },
    mounted(){
    },
    computed:{
        
    }
}
</script>


<style lang="" scoped>
.wd_left{
    width: 210px;
}
.wd_left  h3{
    width:100%;
	height: 50px;
	background-color: #5093e1;
	border-radius: 2px;
    line-height: 50px;
}
.wd_left  h3  span{
    font-size: 14px;
    color: #ffffff;
    margin-left: 25px;
}
.wd_left  h3 select{
    width: 98px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 2px;
	border: solid 1px #dddddd;
}
.wd_left .main{
    margin-top: 10px;
    width: 100%;
	background-color: #5093e1;
	box-shadow: 0px 1px 5px 0px 
        rgba(0, 0, 0, 0.15);
}
.wd_left .main .firstLevelNavigation{
    padding-bottom: 10px;
}
.wd_left .main .firstLevelNavigation li{
    width: 70px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    text-align: center;
    color: #333;
    cursor: pointer;
}
.wd_left .main .firstLevelNavigation li.active{
    background: #5093e1;
    color: #fff;
}
.wd_left .main .teachingMaterial{
    width: 100%;
    height: 800px;
}
.wd_left .main .teachingMaterial p{
    margin-bottom: 5px;
}
.wd_left .main .teachingMaterial select{
    width: 160px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 2px;
    border: solid 1px #dddddd;
    display: block;
    margin: 0  auto 10px;
}
.wd_left .main .teachingMaterial .secondLevelNavigation{
    padding: 7px 11px;
    color: #fff;
    background: #6fb2ff;
    cursor: pointer;
}
.wd_left .main .teachingMaterial .secondLevelNavigation.active{
    background: #306eb6;
}

.wd_left .main .teachingMaterial .thirdLevelNavigation{
    padding: 5px 11px;
    color: #fff;
    cursor: pointer;
}
.wd_left .main .teachingMaterial .fourthLevelNavigation{
    padding: 5px 0 7px 25px;
    color: #fff;
    cursor: pointer;
}
.wd_left .main .teachingMaterial .fifthLevelNavigation{
    padding: 5px 0 7px 40px;
    color: #fff;
    cursor: pointer;
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
.wd_right{
    width: 980px;
}

.wd_right .header ul{
    padding-bottom: 5px;
}
.wd_right .header li{
    font-size: 14px;
    color: #949494;
    border-bottom: 2px solid #edeff0;
}
.wd_right .header li.active{
    border-bottom: 2px solid #5093e1;
    color: #333333;
}
.wd_right .main{
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    position: relative;
    margin-top: 5px;
}
.wd_right .main .searchBar{
    padding: 20px;
}
.wd_right .main .searchBar p{
    font-size: 14px;
    letter-spacing: 1px;
	color: #333333;
}
.wd_right .main .searchBar p span{
    display: inline-block;
    padding: 3px 10px;
    cursor: pointer;
    border-radius: 10px;
    background:#fff;
    color: #333333;
    margin-right: 10px; 
}
.wd_right .main .searchBar p>span:nth-child(1){
    cursor: default;
}
.wd_right .main .searchBar p span.active{
    background:#5093e1;
    color: #fff;
}
.wd_right .main .searchBar p .option{
    display: inline-block;
    width: 640px;
    padding: 0;
} 
.wd_right .main .searchBar p .option1{
    display: inline-block;
    width: 850px;
    padding: 0;
}
.wd_right .main .searchBar p .option1 span{
    display: inline-block;
    margin-left: 0;
    margin-bottom: 10px;
    
}
.wd_right .main .searchBar p .option span{
    display: inline-block;
    margin-bottom: 10px;
}
.wd_right .main .searchBar p:nth-child(1){
    margin-bottom: 10px;
}
.wd_right .main .searchBar input{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 242px;
	height: 36px;
	background-color: #f5f5f5;
    border-radius: 17px;
    border: none;
    outline: none;
    box-sizing: border-box;
    padding-left:20px; 
}
.wd_right .main .searchBar .iconsousuo{
    font-size: 20px;
    color: #333;
    position: absolute;
    top: 15px;
    right: 25px;
    cursor: pointer;
}
.wd_right .main .topicsList{
    width: 100%;
    border-top: 2px solid #dddddd;
    box-sizing: border-box;
    padding-bottom: 20px;
}
.wd_right .main .topicsList h3{
    width: 100%;
    padding: 10px   15px;
    text-align: right;
    box-sizing: border-box;
}
.wd_right .main .topicsList .testQuestions li{
    width: 95%;
    margin: 8px auto;
    border-radius: 5px;
    border: 1px solid #fff;
    position: relative;
    box-sizing: border-box;
    padding:0 15px 15px;
    border: 1px solid #ccc;
    transition:all  1s;
}
.wd_right .main .topicsList .testQuestions li .a1{
    overflow: hidden;
}
.wd_right .main .topicsList .testQuestions li:hover{
    box-shadow: 0px 1px 5px 4px 
        rgba(0, 0, 0, 0.15);
}
.wd_right .main .topicsList .addExerciseBar{
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
.wd_right .main .topicsList .testQuestions li:hover .addExerciseBar{
    display:block;
}
.wd_right .main .topicsList .analysis{
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
.wd_right .main .topicsList .testQuestions li:hover .analysis{
    display:block;
}
.wd_right .main .topicsList .testQuestions li p{
    font-size: 14px;
    letter-spacing: 1px;
	color: #222222; 
    margin-top: 15px;
}
.wd_right .main .topicsList .testQuestions li p span{
    margin-right: 25px;
}
.wd_right .main .topicsList  .paging{
    width: 100%;
    text-align: center;
    padding: 10px 0 ;
    margin-top: 15px;    
}
.wd_right .main .topicsList  .paging .iconfont{
    cursor: pointer;
}
.wd_right .main .topicsList  .paging .pageNum {
  display: inline-block;
  padding: 0  5px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  margin: 0 8px 0;
}
.wd_right .main .topicsList  .paging .activePageBn {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}

.wd_right .main .topicsList  .paging .disabledBn {
  cursor: not-allowed;
}
.wd_right .main .topicsList .testPaper{
    width: 100%;
}
.wd_right .main .topicsList .testPaper li{
    width: 930px;
    box-sizing: border-box;
    margin: 15px  25px  0;  
    background-color: #f5f5f5;
    padding: 19px 17px 0 11px;
}
.wd_right .main .topicsList .testPaper li p:nth-child(1){
    font-size: 14px;
    letter-spacing: 1px;
	color: #000000;
    padding: 0;
}
.wd_right .main .topicsList .testPaper li p:nth-child(2){
    font-size: 14px;
    letter-spacing: 1px;
	color: #333333;
    margin-top: 15px;
    padding: 0;
}  
.wd_right .main .topicsList .testPaper li div{
    margin-top: 20px;
    border-top: 1px solid  #cccccc;
    text-align: right;
    padding: 10px  0  ;
}
.wd_right .main .topicsList .testPaper li div button:nth-child(2){
    width: 50px;
	height: 25px;
	background-color: #c5d9ef;
	border-radius: 13px;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    letter-spacing: 1px;
	color: #5093e1;
    border: none;
    outline: none;
    cursor: pointer;
    margin-right:13px; 
}
.wd_right .main .topicsList .testPaper li div button:nth-child(1){
    width: 50px;
	height: 25px;
	background-color: #eac2b8;
	border-radius: 13px;
    text-align: center;
    line-height: 25px;
    letter-spacing: 1px;
    font-size: 14px;
	color: #d04524;
    border: none;
    outline: none;
    cursor: pointer;
}
.wd_right .main .topicsList .topic{
    opacity: 0.6;
}
</style>