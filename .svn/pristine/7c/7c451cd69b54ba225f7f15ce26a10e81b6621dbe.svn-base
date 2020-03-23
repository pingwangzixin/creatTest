<template>
    <div class="wd_testNumberSetting">
        <div class="wd_header">
            <p>2019学年初一下学期语文期末考试</p>
            <div class="return1" @click="send1">
                <i class="iconfont iconfanhui1"></i>
                返回
            </div>
        </div>
        <div class="wd_main">
            <div class="header">
                <ul class="clearfix">
                    <li @click="selectionType(index)" class="fl" :class="{active:item.state}" v-for="(item,index) in nav" :key="index">{{item.name}}</li>
                </ul>
            </div>
            <!-- <div class="one" v-if="nav[0].state">
                <p>方式一：导出学生二维码Excel表格
                    <button>导出表格(按班级)</button>
                    <button class="button_disabled" disabled>导出表格(按班级)</button>
                </p>
                <p>方式二：生成学生二维码PDF</p>
            </div> -->
            <div class="two clearfix" v-if="nav[0].state  && nav[0].subPage[0].state ">
                <div class="fl left">
                    <h3>选择班级</h3>
                    <div class="banji clearfix">
                        <button class="fl" @click="allElectionC" :class="{active:bol1}">全部</button>
                        <button class="fl" @click="choosingClasses(index)" v-for="(item,index) in banji" :key="index" :class="{active:item.state}">{{item.className}}班</button>
                    </div>
                    <button class="nextStep" :class="{active:_num>0 }" @click="preservation">下一步</button>
                </div>
                <div class="fl right">
                    <h3>共{{studentList.length}}名学生，已选中{{_num}}名  <input type="text" v-model="search"><button @click="searchStudent">搜索</button></h3>
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <label v-if="studentList1.length == 0">
                                        <input type="checkbox" name="" id="" @click="allElection" v-model="bol">
                                        全选
                                    </label>
                                    
                                </td>
                                <td>班级</td>
                                <td>学号</td>
                                <td>姓名</td>
                                <td>考试号</td>
                            </tr>
                            <tr v-for="(item,index) in studentList" :key="index" v-if="studentList1.length == 0"> 
                                <td><input type="checkbox" name="" id="" v-model="item.bol" @click="SelectStudents(index)"></td>
                                <td>{{item.className}}班</td>
                                <td>{{item.stuNo}}</td>
                                <td>{{item.stuName}}</td>
                                <td>{{item.loginName}}</td>
                            </tr>
                            <tr v-for="(item,index) in studentList1" :key="index" v-if="studentList1.length > 0 "> 
                                <td><input type="checkbox" name="" id="" v-model="item.bol" @click="SelectStudents1(index)"></td>
                                <td>{{item.className}}班</td>
                                <td>{{item.stuNo}}</td>
                                <td>{{item.stuName}}</td>
                                <td>{{item.loginName}}</td>
                            </tr>
                        </table>
                    </div>
                    
                </div>
            </div>
            <!-- <div  class="three clearfix" >
                <div class="left fl">
                    <div class="shang"> 
                        <h3>二维码排版设置</h3>
                        <p>选择生成类型:</p>
                        <p>
                            <label >
                                <input type="radio" name="type" id="">
                                每人生成一整张二维码
                            </label>
                            <br>
                            <span>
                                二维码标签在A4纸上以4*14排列，共56张
                            </span>
                        </p>
                        <p>
                            <label >
                                <input type="radio" name="type" id="">
                                依次生成学生二维码
                            </label>
                            <br>
                            <span>
                                输入每人二维码标签数量:
                                <input type="number" name="" id="">
                                (1~56)
                            </span>
                        </p>
                    </div>
                    <div class="lower">
                        <h3>选择显示信息：
                            <span>最多选择显示2种信息</span>
                        </h3>
                        <label >
                            <input type="checkbox" name="" id="">
                            显示考试号
                        </label>
                        <label >
                            <input type="checkbox" name="" id="">
                            显示学校名称
                        </label>
                        <label >
                            <input type="checkbox" name="" id="">
                            显示考场号与座位号
                        </label>
                        <br>
                        <input type="text" name="" id="xiaoxue" value="宜宾科信小学">
                        <p>(因二维码标签大小限制，学校名称最多显示6个汉字，如不修改，默认使用学校名字前6个字)</p>
                        <p class="clearfix">
                            <button class="fl">重新选择学生</button>
                            <button class="fr">保存并阅览</button>
                        </p>
                        
                    </div>
                </div>
                <div class="right fl">
                    <h3>注：二维码标签大小为32*15mm，在A4纸上以4*14排列，共56张二维码标签</h3>
                </div>
            </div> -->
            <div class="four" v-if="nav[1].state">
                <h3>
                    <p>1、仅用于自定义考试号的导入，如需要使用系统考试号，清空本场自定义考试号即可；</p>
                    <p>2、考试号需保证统一的固定位数，位数不足的请在前面补0，例：01、02……99。</p>
                </h3>
                <label  @click="file1">
                    <span>浏览文件</span>    
                    <input ref="files" type="file" name="" id="">
                </label>
                <a>样表下载</a>
                <span>（空白表，只包含格式，用于导入新数据）</span>
            </div>
            <div class="five" v-if="nav[0].state  && nav[0].subPage[1].state ">
                <div class="tips">所有考生按照考场顺序随机分配，考生数量为空的考场保存后系统将自动清除。</div>
                <p>已分配{{peopleAllocatedNumber>_num?_num:peopleAllocatedNumber}}个考生，未分配<span>{{_num-peopleAllocatedNumber>0?_num-peopleAllocatedNumber:0}}</span>个</p>
                <div>
                    <div class="title clearfix">
                        <h3 class="fl">单个考场人数</h3>
                        <h3 class="fl">考场数量</h3>
                        <h3 class="fl">总人数</h3>
                    </div>
                    <ul >
                        <li class="clearfix" v-for="(item,index) in distributionExaminationRoom" :key="index"> 
                            <input class="fl" type="number" v-model="item.eachRoomStuNum">
                            <p class="numberExamination clearfix fl">
                                <button class="fl" @click="addReduce('减',item)"  :class="{disabledBtn:item.roomCount==0}">-</button>
                                <input type="number" class="fl" v-model="item.roomCount">
                                <button class="fr" @click="addReduce('加',item)">+</button>
                            </p>
                             <p class="numberExamination fl">{{item.eachRoomStuNum*item.roomCount}}</p>
                             <p class="numberExamination1 fl" @click="deleteTestRoomType(index)"><i class="iconfont iconguanbi1"></i></p>
                        </li>
                    </ul >
                    <p class="add-btn" @click="addTestRoomType" v-if="_num-peopleAllocatedNumber>0">+ 添加考场类别</p>
                </div>
                <div class="preservation">
                    <button class="revert" v-if="false">返回详情</button>
                    <button class="setUp" :class="{disable:_num-peopleAllocatedNumber>0}" @click="saveSettings">保存设置</button>
                </div>
            </div>
            <div class="six" v-if="nav[0].state  && nav[0].subPage[2].state ">
                <div class="exportTable clearfix">
                    <h3 class="fl">共{{roomlist.length}}个考场<i class="iconfont iconrenwuchaxun" @click="hideShow"></i></h3>
                    <a class="fr" :href="configure.testPaper + 'examPaper/paperMarkingTaskClassStudent/exportClassStudentData?paperMarkingTaskId='+this.infor.id">导出表格(按班级)</a>
                    <a class="fr" :href="configure.testPaper + 'examPaper/paperMarkingTaskRoomSetting/exportRoomStudentData?paperMarkingTaskId='+this.infor.id">导出表格(按考场)</a>
                    <button class="fr" @click="goToStepOne">重新设置</button>               
                </div>
                <ul class="banji clearfix">
                    <li class="fl">班级：</li>
                    <li class="fl content">
                        <span @click="showByClass1" :class="{active:banji1Show}">全选</span>
                        <span @click="showByClass(index)" v-for="(item,index) in banji1" :key="index" :class="{active:item.state}">{{item.className}}班</span>

                    </li>
                </ul>
                <ul class="banji clearfix">
                    <li class="fl">考场号：</li>
                    <li class="fl content">
                        <span @click="showByRoom1" :class="{active:roomShow}">全选</span>
                        <span @click="showByRoom(index)" v-for="(item,index) in roomlist" :key="index" :class="{active:item.state}">{{item.roomName}}教室</span>

                    </li>
                </ul>
                <table>
                    <tr>
                        <td>考场号</td>
                        <td>座位号</td>
                        <td>姓名</td>
                        <td>班级</td>
                        <td>考试号</td>
                    </tr>
                    <tr v-for="(item,index) in allocatedStudentList" :key="index">
                        <td v-text="item.roomName"></td>
                        <td v-text="item.seatNum"></td>
                        <td v-text="item.studentName"></td>
                        <td v-text="item.className+'班'"></td>
                        <td v-text="item.studentLoginName"></td>
                    </tr>
                </table>
                <div class="wd_pageBn" v-if="pageInfo">
                    <i
                        class="iconfont iconxiangzuo wd_left1"
                        :class="pageInfo.prePage.state=='disabled'?'disabledBn':''"
                        @click="prePageBn(pageInfo.prePage)"
                    ></i>
                    <span
                        
                        v-for="(item,index) in pageInfo.middlePageInfoLists"
                        :key="index"
                        class="pageNum"
                        :class="item.state=='active'?'activePageBn':''"
                        @click="pageChange(item)"
                    >{{item.text}}</span>
                    <i
                        class="iconfont iconicon03 wd_right1"
                        :class="pageInfo.nextPage.state=='disabled'?'disabledBn':''"
                        @click="nextPageBn(pageInfo.nextPage)"
                    ></i>
                </div>
            </div>
        </div>
        <div class="prompt_box public_box wd_bounced" v-if="bounced.state">
            <div class="hide"></div>
            <div class="con1">
                <div class="header clearfix">
                    <h3 class="fl">考场信息</h3>
                    <span class="fl">共{{_num}}个考生，{{roomlist.length}}个考场</span>
                </div>
                <div class="main">
                    <ul class="clearfix">
                        <li class="fl" v-for="(item,index) in roomlist" :key="index">
                            <div class="clearfix">
                                <span class="fl">{{item.roomName}}考场</span>
                                <span class="fr">共{{item.roomStuCount}}人</span>
                            </div>
                            <div>
                                已分配{{item.roomStuCount}}人
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="footer clearfix">
                    <button class="fr" @click="hideShow">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { wordRelevant,configure } from "@/api";
export default {
    name:"testNumberSetting",
    data(){
        return {
            bol:false,
            bol1:false,
            bol2:true,
            nav:[
                {
                    name:"系统考试号",
                    state:true,
                    subPage:[
                        {
                            state:true
                        },
                        {
                            state:false
                        },
                        {
                            state:false
                        }                    
                    ]
                },{
                    name:"自定义考试号",
                    state:false
                }
            ],
            banji:[
            ],
            studentList:[],
            studentList1:[],
            // 已分配学生列表
            banji1:[
            ],
            banji1Show:true,
            allocatedStudentList:[],
            roomShow:true,
            roomlist:[],
            // 分页信息
            pageInfo:null,
            // 搜索字段
            search:"",
            // 分配考场
            distributionExaminationRoom:[
                {
                    eachRoomStuNum:0,
                    roomCount:0
                }
            ],
            // 网址
            configure:"",
            // 弹框
            bounced:{
                state:false
            }
        }
    },
    methods:{
        // 返回
        send1(){
            this.$router.push({path:"/index/readPaper/admin/readList",query:this.infor})
        },
        // 系统考试号  自定义考试号
        selectionType(i){
            this.nav.forEach((ele,index)=>{
                ele.state = false;
                if(i == index){
                    ele.state = true;
                }
            })
        },
        // 全选验证
        student1(){
            this.studentList = [];
            let arr = JSON.parse(JSON.stringify(this.banji))
            arr.forEach(ele=>{
                if(ele.state){
                    ele.studentList.forEach(ele1=>{
                        ele1.bol = false;
                        this.studentList.push(ele1);
                    })
                }
            })
        },
        // 搜索
        searchStudent(){
            this.studentList1 = [];
            if(this.search == ""){
                return;
            }
            let arr = JSON.parse(JSON.stringify(this.studentList));
            arr.forEach(ele=>{
                if(ele.stuNo.indexOf(this.search) != -1  || ele.stuName.indexOf(this.search) != -1  || ele.loginName.indexOf(this.search) != -1){
                    this.studentList1.push(ele)
                }
            })
        },
        // 学生全选
        allElection(){
            this.bol = !this.bol;
            this.studentList.forEach(ele=>{
                ele.bol =  this.bol;
            })
            this.studentList = JSON.parse(JSON.stringify(this.studentList))
            
        },
        // 学生验证
        judge(){
            let bol = this.studentList.every(ele=>{
                if(ele.bol){
                    return  true
                }else{
                    return false
                }
            });
            this.bol = bol;
        },
        // 学生选择
        SelectStudents(index){
            this.studentList[index].bol =  !this.studentList[index].bol;
            this.judge()
        },
        SelectStudents1(index){
            this.studentList1[index].bol =  !this.studentList1[index].bol;
            this.studentList.forEach(ele=>{
                if(ele.id == this.studentList1[index].id){
                    ele.bol = this.studentList1[index].bol;
                }
            })
            this.judge()
        },
        // 班级全选
        allElectionC(){
            this.bol1 = !this.bol1;
            this.banji.forEach(ele=>{
                ele.state = this.bol1;
            })
            
            this.banji = JSON.parse(JSON.stringify(this.banji))
            this.student1();
            this.judge()
        },
        // 选择班级
        choosingClasses(index){
            this.banji[index].state = !this.banji[index].state;
            let bol = this.banji.every(ele=>{
                if(ele.state){
                    return  true
                }else{
                    return false
                }
            });
            this.bol1 = bol;
            this.student1();
            this.judge()
        },
        // 保存
        preservation(){
            let obj = {
                paperMarkingTaskId:this.infor.id,
                stuInfoArr:[]
            }
            this.studentList.forEach(ele=>{
                if(ele.bol){
                    let obj1 = {
                        studentLoginName:ele.loginName,
                        studentId:ele.id,
                        studentNum:ele.stuNo,
                        studentName:ele.stuName,
                        classId:ele.classId,
                        className:ele.className,
                        termId:this.infor.termId,
                        gradeId:this.infor.gradeId,
                        jeucGradeId:this.infor.jeucGradeId,
                        jeucGradeName:this.infor.jeucGradeName,
                        jeucSchoolId:this.infor.jeucSchoolId,
                    }
                    obj.stuInfoArr.push(obj1)
                }
            })
            wordRelevant.saveExamNumberSettings(obj).then(res=>{
                if(res.data.ret == 200){
                    this.$parent.$parent.timingFn("success","保存成功");
                    this.nav[0].subPage.forEach((ele,index)=>{
                        ele.state = false;
                        if(index==1){
                           ele.state = true; 
                        }
                    })
                    this.banji1 =[];
                    JSON.parse(JSON.stringify(this.banji)).forEach((ele,index)=>{
                        if(ele.state){
                            this.banji1.push(ele);
                        }
                    })
                    this.banji1.forEach(ele=>{
                        ele.state  =  false;
                    })
                }
            })
            
        },
        // 考场数量加减
        addReduce(type,item){
            item.roomCount = Number(item.roomCount)
            if(type == "加"){
                item.roomCount += 1;
            }else{
                if(item.roomCount-1 < 0){
                    item.roomCount = 0;
                }else{
                    item.roomCount -= 1;
                }
            }
        },
        // 添加考场类型
        addTestRoomType(){
            this.distributionExaminationRoom.push({
                eachRoomStuNum:0,
                roomCount:0
            })
        },
         deleteTestRoomType(index){
             this.distributionExaminationRoom.splice(index,1);
        },
        // 考场设置保存
        saveSettings(){
            let obj = {
                paperMarkingTaskId:this.infor.id,
                classRoomTypeSetting:this.distributionExaminationRoom
            }
            obj.classRoomTypeSetting.forEach(ele=>{
                ele.eachRoomStuNum = Number(ele.eachRoomStuNum)
                ele.roomCount = Number(ele.roomCount)
            })
            wordRelevant.saveRoomSetting(obj).then(res=>{
                if(res.data.ret == 200){
                    this.$parent.$parent.timingFn("success","保存成功");
                    this.getTableInfo(1)
                    wordRelevant.enquiryExaminationHall({paperMarkingTaskId:this.infor.id}).then(res=>{
                        this.roomlist =res.data.data;
                    })
                }
            })
        },
        getTableInfo(pageNo){
            let classId = "";
            if(!this.banji1Show){
                this.banji1.forEach(ele=>{
                    if(ele.state){
                        classId = ele.classId;
                    }
                })
            }
            let roomId = "";
            if(!this.roomShow){
                this.roomlist.forEach(ele=>{
                    if(ele.state){
                        roomId = ele.id;
                    }
                })
            }
            wordRelevant.queryStudentList({
                pageSize:10,
                pageNo:pageNo,
                classId:classId,
                paperMarkingTaskId:this.infor.id,
                roomId:roomId
            }).then(res=>{
                this.allocatedStudentList = res.data.data.list;
                this.pageInfo=res.data.data.pageInfo;
                this.nav[0].subPage.forEach((ele,index)=>{
                    ele.state = false;
                    if(index==2){
                        ele.state = true; 
                    }
                });
                console.log(this.allocatedStudentList)
            })
        },
         //点击页码按钮
        pageChange(item) {
            if(item.state == "disabled"){
                return
            }
            this.getTableInfo(item.text)
        },
        //点击下一页按钮
        nextPageBn(info) {
            if(info.state == "disabled"){
                return
            }
            this.getTableInfo(info.pageNo)
        },
        //点击上一页按钮
        prePageBn(info) {
            if(info.state == "disabled"){
                return
            }
            this.getTableInfo(info.pageNo)
        },
        // 第三步班级全选
        showByClass(i){
            this.banji1.forEach((ele,index)=>{
                ele.state = false;
                if(i == index){
                    ele.state = true;
                }
            })
            this.banji1 = JSON.parse(JSON.stringify(this.banji1))
            this.banji1Show = false;
            this.getTableInfo(1)
        },
        // 第三步选择班级
        showByClass1(){
            this.banji1.forEach((ele,index)=>{
                ele.state = false;
            })
            this.banji1Show = true;
            this.getTableInfo(1)
        },
        // 第三步考场全选
        showByRoom1(){
            this.roomlist.forEach((ele,index)=>{
                ele.state = false;
            })
            this.roomShow = true;
            this.getTableInfo(1)
        },
        // 第三步考场选择
        showByRoom(i){
            this.roomlist.forEach((ele,index)=>{
                ele.state = false;
                if(i == index){
                   ele.state = true; 
                }
            })
            this.roomShow = false;
            this.getTableInfo(1)
        },
        // 重新设置
        goToStepOne(){
            this.nav[0].subPage.forEach((ele,index)=>{
                ele.state = false;
                if(index==0){
                    ele.state = true; 
                }
            });
            this.distributionExaminationRoom=[
                {
                    eachRoomStuNum:0,
                    roomCount:0
                }
            ];
        },
        // 弹框显示隐藏
        hideShow(){
            this.bounced.state = !this.bounced.state;
        },
        file1(){
            // this.$refs.files
        }
    },
    created(){
        this.configure = configure;
        this.infor = this.$route.query;
        wordRelevant.getClassList({
            officeId:"office_9f32ab3748d64717a6601e0079e9c941",
            gradeDictId:this.$route.query.gradeId
        }).then(res=>{
            this.banji = res.data.data.classes;
            wordRelevant.enquiryExaminationHall({paperMarkingTaskId:this.infor.id}).then(res=>{
                if(res.data.data.length>0){
                    this.roomlist =res.data.data;
                    console.log(this.roomlist)
                    this.nav[0].subPage.forEach((ele,index)=>{
                        ele.state = false;
                        if(index==2){
                            ele.state = true; 
                        }
                    });
                    wordRelevant.queryStudentList({
                        pageSize:10,
                        pageNo:1,
                        paperMarkingTaskId:this.infor.id,
                    }).then(res=>{
                        if(res.data.ret ==200 && res.data.data.list.length>0){
                            this.allocatedStudentList = res.data.data.list;
                            this.pageInfo=res.data.data.pageInfo;
                        }
                    })
                }
            })
            let  arr = this.banji.map((ele)=>{
                return   wordRelevant.queryStudents({
                    officeId:"office_9f32ab3748d64717a6601e0079e9c941",
                    classId:ele.classId
                })
            })
            Promise.all(arr).then(res1=>{
                this.banji.forEach((ele,index)=>{
                    ele.state = false;
                    ele.studentList = res1[index].data.data.list;
                })
                wordRelevant.examinationNumberSettingQuery({id:this.infor.id}).then(res=>{
                    res.data.data.classList.forEach(ele=>{
                        this.banji.forEach(ele1=>{
                            if(ele.classId == ele1.classId){
                                ele1.state  = true;
                            }
                        })
                    })
                    this.banji1 =[];
                    JSON.parse(JSON.stringify(this.banji)).forEach((ele,index)=>{
                        if(ele.state){
                            this.banji1.push(ele);
                        }
                    })
                    this.banji1.forEach(ele=>{
                        ele.state  =  false;
                    })
                    this.student1();
                    res.data.data.studentList.forEach(ele=>{
                        this.studentList.forEach(ele1=>{
                            if(ele.studentId == ele1.id){
                                ele1.bol = true;
                            }
                        })
                    })
                    this.judge()
                })
            })
        })
    },
    computed:{
        // 考试人数
        _num(){
            let num = 0;
            this.studentList.forEach(ele=>{
                if(ele.bol){
                    num += 1;
                }
            })
            return num;
        },
        // 已分配人数
        peopleAllocatedNumber(){
            let num = 0;
            this.distributionExaminationRoom.forEach((ele,index)=>{
                num += ele.eachRoomStuNum*ele.roomCount
            })
            return num;
        }
    }
}
</script>

<style lang="" scoped>
    .wd_testNumberSetting{
        width: 100%;
    }
    .wd_testNumberSetting .wd_header{
        position: relative;
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
    }
    .wd_testNumberSetting .wd_header p{
        font-size: 16px;
        font-weight: 700;
        line-height: 50px;
    }
    .wd_testNumberSetting .wd_header .return1{
        position: absolute;
        top: 15px;
        left:25px;
        cursor: pointer;
        color: #2d8cf0;
    }
    .wd_testNumberSetting .wd_main{
        width: 100%;
        margin-top: 20px;
        border-radius: 5px;
        background: #fff;
    }
    .wd_testNumberSetting .wd_main .header{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ccc;
    }
    .wd_testNumberSetting .wd_main .header  li{
        padding: 15px 30px ;
        border-bottom:1px solid  #fff; 
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .header  li.active{
        border-bottom:2px solid  #5093e1;
    }
    .wd_testNumberSetting .wd_main .one{
        padding: 20px 30px;
        border-bottom: 2px solid #ccc;
    }
    .wd_testNumberSetting .wd_main .one p:nth-child(1){
        margin-bottom: 20px;
    }
    .wd_testNumberSetting .wd_main .one p:nth-child(1) button{
        width: 140px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-left: 15px;
        background: #fff;
        border: 1px solid #5093e1;
        outline: none;
        cursor: pointer;
        color:#5093e1;
        border-radius: 5px;
    }
    .wd_testNumberSetting .wd_main .one p:nth-child(1) button:hover{
        background: #5093e1;
        color:#fff;
        
    }
    .wd_testNumberSetting .wd_main .one p:nth-child(1) button.button_disabled{
        color: #999;
        background: #eee;
        border: none;
    }
    .wd_testNumberSetting .wd_main .two{
        width: 100%;
        
    }
    .wd_testNumberSetting .wd_main .two .left{
        width: 400px;
        box-sizing: border-box;
        padding: 20px;
        
    }
    .wd_testNumberSetting .wd_main .two .left h3{
        font-weight: 700;
    }
    
    .wd_testNumberSetting .wd_main .two .left .banji{
        margin-top: 15px;
    }
    .wd_testNumberSetting .wd_main .two .left .banji button{
        width: 74px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #999;
        background: #fff;
        color: #999;
        outline: none;
        cursor: pointer;
        border-radius: 5px ;
        margin-right: 15px;
        box-sizing: border-box;
        margin-top: 15px;
    }
    .wd_testNumberSetting .wd_main .two .left .banji button:hover{
        background: #5093e1;
        color: #fff;
        border: 1px solid #fff;
    }
    .wd_testNumberSetting .wd_main .two .left .banji button.active{
        background: #5093e1;
        color: #fff;
        border: 1px solid #fff;
    } 
    .wd_testNumberSetting .wd_main .two .left .nextStep{
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
        color: #ccc;
        background: #eee;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .two .left .active{
        color: #fff;
        background: #5093e1;
        border: 1px solid #fff;
    }
    .wd_testNumberSetting .wd_main .two .right{
        width: 800px;
        box-sizing: border-box;
        border-left: 1px solid #ccc;
    }
    .wd_testNumberSetting .wd_main .two .right h3{
        padding: 20px;
    }
    .wd_testNumberSetting .wd_main .two .right h3 input{
        margin-left: 150px;
        outline: none;
    }
    .wd_testNumberSetting .wd_main .two .right h3 button{
        width: 60px;
        margin-left: 10px;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: none;
        outline: none;
        background: #2d8cf0;
        color: #fff;
        border-radius: 5px;
    }
    .wd_testNumberSetting .wd_main .two .right div{
        min-height: 300px;
        max-height: 700px;
        overflow: auto;
    }
    .wd_testNumberSetting .wd_main .two .right  table{
        width: 100%;
    }
    .wd_testNumberSetting .wd_main .two .right  table td{
        border: 1px solid #ccc;
        text-align: center;
        padding:10px;
    }
    .wd_testNumberSetting .wd_main .two .right  table td label{
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .two .right  table td input{
        cursor: pointer;
    }
    /* .wd_testNumberSetting .wd_main .three{
        width: 100%;
    }
     .wd_testNumberSetting .wd_main .three .left {
        width: 400px;
        box-sizing: border-box;
        padding: 20px;
        border-right: 1px solid #ccc;
    }
    .wd_testNumberSetting .wd_main .three .left .shang{
        padding-bottom:10px; 
        border-bottom: 1px solid #ccc;
    }
    .wd_testNumberSetting .wd_main .three .left .shang h3{
        margin-bottom: 10px;
        font-weight: 700;
    }
    .wd_testNumberSetting .wd_main .three .left .shang label{
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .three .left .shang p{
        margin-bottom: 10px;
    }
    .wd_testNumberSetting .wd_main .three .left .shang p span{
        margin-left: 17px;
        display: inline-block;
        margin-top: 10px;
        font-weight: 700;
    }
    .wd_testNumberSetting .wd_main .three .left .shang p input{
        vertical-align: middle;
    }
    .wd_testNumberSetting .wd_main .three .left .shang p input[type="number"]{
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 5px;
        outline: none;
        border: 1px solid #999;
    }
    .wd_testNumberSetting .wd_main .three .left .lower{
        width: 100%;
    }
    .wd_testNumberSetting .wd_main .three .left .lower h3{
        padding: 15px 0;
    }
    .wd_testNumberSetting .wd_main .three .left .lower h3 span{
        font-size: 12px;
        font-weight: 700;
    }
    .wd_testNumberSetting .wd_main .three .left .lower label{
        width: 49%;
        text-align: left;
        display: inline-block;
        margin-bottom: 10px;
    }
    .wd_testNumberSetting .wd_main .three .left .lower #xiaoxue{
        width:100%;
        box-sizing: border-box;
        line-height: 30px;
        height: 30px;
        text-align: center;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .wd_testNumberSetting .wd_main .three .left .lower button{
        width: 45%;
        border: 1px solid #fff;
        background: #2d8cf0;
        color:#fff;
        height: 40px;
        line-height: 40px;
        margin-top: 15px;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
    }
    .wd_testNumberSetting .wd_main .three .right{
        width: 800px;
        box-sizing: border-box;
    }
    .wd_testNumberSetting .wd_main .three .right h3{
        padding: 20px;
        box-sizing: border-box;
    } */
    .wd_testNumberSetting .wd_main .four{
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
    }
    .wd_testNumberSetting .wd_main .four h3{
        padding: 10px 20px;
        border-radius: 3px;
        border: 1px solid #2d8cf0;
        background: rgba(90, 200, 250, 0.1);
        margin-bottom: 15px;
    }
    .wd_testNumberSetting .wd_main .four label{
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .four label span{
        display: inline-block;
        width: 98px;
        height: 44px;
        line-height: 44px;
        border-radius: 2px;
        text-align: center;
        color: #fff;
        font-size: 16px !important;
        cursor: pointer;
        background: #2d8cf0;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
        border: none;
        outline: none;
    }
    .wd_testNumberSetting .wd_main .four label input{
        display: none;
    }
    .wd_testNumberSetting .wd_main .four a{
        margin-left: 20px;
        color:#2d8cf0;
        font-size: 16px;
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .four>span{
        color: #9B9B9B;
    }
    .wd_testNumberSetting .wd_main .five{
        width: 100%;
        box-sizing: border-box;
        padding:0 2% 20px;
    } 
    .wd_testNumberSetting .wd_main .five .tips{
        width: 100%;
        margin:10px auto;
        height: 40px;
        line-height: 40px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 20px;
        border: 1px solid #5ac8fa;
        font-size: 14px;
        background: rgba(90, 200, 250, 0.1);
        color: #4A4A4A;
    }
    .wd_testNumberSetting .wd_main .five>p span{
        color: red;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) .title{
        font-size: 14px;
        margin-top: 10px;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) .title h3{
        width: 86px;
        text-align: center;
        font-size: 14px;
        margin-right: 25px;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li{
        margin-top: 15px;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li>input[type="number"]{
        width: 86px;
        height: 25px;
        text-align: center;
        box-sizing: border-box;
        outline: none;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li .numberExamination{
        width: 86px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-left: 25px;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li .numberExamination button{
        width: 25px;
        cursor: pointer;
        height: 25px;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li .numberExamination button.disabledBtn{
        cursor: no-drop;
        pointer-events:none;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li .numberExamination input{
        width: 38px;
        height: 25px;
        text-align: center;
        margin-left: -1px;
        margin-right: -1px;
        box-sizing: border-box;
        outline: none;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) li .numberExamination1{
        margin-left: 0;
        line-height: 25px;
        cursor: pointer;
    }
    .wd_testNumberSetting .wd_main .five div:nth-child(3) .add-btn{
        width: 120px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #2d8cf0;
        cursor: pointer;
        margin-top:15px; 
    }
    .wd_testNumberSetting .wd_main .five .preservation{
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
    .wd_testNumberSetting .wd_main .five .preservation .revert{
        width: 180px;
        height: 44px;
        border-radius: 2px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        border: 1px solid #9B9B9B;
        color: #4A4A4A;
        cursor: pointer;
        margin-right: 25px;
        background: #fff;
        box-sizing: border-box;
        outline: none;
    }
    .wd_testNumberSetting .wd_main .five .preservation .setUp{
        width: 180px;
        height: 44px;
        border-radius: 2px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        background: #2d8cf0;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
        cursor: pointer;
        border: 1px solid #2d8cf0;
        outline: none;
        box-sizing: border-box;
    }
    .wd_testNumberSetting .wd_main .five .preservation .setUp.disable{
        background: rgba(153, 153, 153, 0.1);
        border: 1px solid #f1f1f1;
        color: #9B9B9B;
        cursor: not-allowed;
        pointer-events:none;
    }
    .wd_testNumberSetting .wd_main .six .exportTable{
        padding: 10px 25px;
    }
    .wd_testNumberSetting .wd_main .six .exportTable h3{
        font-size: 16px;
        font-weight: 700;
        line-height: 35px;
    }
    .wd_testNumberSetting .wd_main .six .exportTable .iconrenwuchaxun{
        font-size: 20px;
        color: rgb(0, 122, 255); 
        cursor: pointer;
        margin-left: -10px;
    }
    .wd_testNumberSetting .wd_main .six .exportTable a{
        display: inline-block;
        width: 140px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border: 1px solid #5093e1;
        cursor: pointer;
        color:#5093e1;
        border-radius: 5px;
        margin-left: 30px;
    }
    .wd_testNumberSetting .wd_main .six .exportTable button{
        display: inline-block;
        width: 140px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border: 1px solid #5093e1;
        outline: none;
        cursor: pointer;
        color:#5093e1;
        border-radius: 5px;
        margin-left: 30px;
    }
    .wd_testNumberSetting .wd_main .six .banji{
        padding:10px 25px;
    }
    .wd_testNumberSetting .wd_main .six .banji li:nth-child(1){
        line-height: 30px;
    }
    .wd_testNumberSetting .wd_main .six .banji li:nth-child(2) span{
        padding: 5px 10px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 5px;
    }
    .wd_testNumberSetting .wd_main .six .banji li:nth-child(2) span.active{
        background:#5093e1;
        color: #fff;
    }
    .wd_testNumberSetting .wd_main .six table{
        width: 1150px;
        margin: 5px auto;
    }
    .wd_testNumberSetting .wd_main .six  tr:nth-child(2n+1){
        background-color: rgba(76, 217, 100, 0.1);
    }
    .wd_testNumberSetting .wd_main .six  tr:nth-child(1){
        background-color: #f8f8f9;
    }
    .wd_testNumberSetting .wd_main .six td{
        border: 1px  solid #ccc;
        padding: 10px;
        text-align: center;
    }
    .wd_testNumberSetting .wd_main .six  .wd_pageBn{
        width: 100%;
        padding: 20px 0;
        box-sizing: border-box;
        text-align: center;
    }
    .wd_testNumberSetting .wd_main .six .pageNum {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        cursor: pointer;
        margin: 0 8px 0 8px;
    }
    .wd_testNumberSetting .wd_main .six .activePageBn {
        background: #399fdf;
        color: #fff;
        border-radius: 5px;
    }

    .wd_testNumberSetting .wd_main .six .disabledBn {
        cursor: not-allowed;
    }
    .wd_testNumberSetting .wd_main .six .iconfont{
        cursor: pointer;
    }
    .wd_bounced  .hide{
        display: block;
    }
    .wd_bounced  .con1{
        width: 900px;
        max-height: 450px;
        position: fixed;
        top: 100px;
        left: 50%;
        background: #fff;
        z-index: 1005;
        transform: translate(-50%);
        border-radius:5px; 
    }
    .wd_bounced  .con1 .header{
        border-bottom: 1px solid #ccc;
    }
    .wd_bounced  .con1 .header h3{
        padding-left: 20px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 700;
    }
    .wd_bounced  .con1 .header span{
        line-height: 50px;
        margin-left: 15px;
    }
    .wd_bounced  .con1 .main{
        padding: 15px 20px 25px;
        box-sizing: border-box;
    }
    .wd_bounced  .con1 .main li{
        width: 270px;
        height: 60px;
        background: #f4f4f4;
        box-sizing: border-box;
        padding: 8px 10px;
        margin-right: 15px;
        margin-top: 10px;
    }
    .wd_bounced  .con1 .main li div:nth-child(1)  span:nth-child(1){
        font-weight: 700;
    }
    .wd_bounced  .con1 .main li div:nth-child(2){
        text-align: left;
        margin-top: 5px;
    }
    .wd_bounced  .con1  .footer{
        padding: 12px 18px;
        border-top: 1px solid #eee;
    }
    .wd_bounced  .con1  .footer button{
        border-radius: 2px;
        padding: 0 22px !important;
        height: 36px !important;
        line-height: 36px !important;
        background: #2d8cf0;
        box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
        font-size: 16px !important;
        border: none;
        color: #fff;
        cursor: pointer;
    }
</style>