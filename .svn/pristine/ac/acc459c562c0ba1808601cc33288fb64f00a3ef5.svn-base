<template>
    <div>
        <div class="wd_nav clearfix">
            <p
                class="fl"
                :class="{active:item.state}"
                v-for="(item,index) in  infor.grade"
                :key="index"
                @click="selectiveGrade(index)"
            >{{item.gradeName}}</p>
            <button class="fr" @click="newlyBuild">+ 新建阅卷</button>
        </div>
        <div class="wd_main">
            <ul class="list">
                <li class="clearfix" v-for="(item,index) in infor.arr" :key="index">
                    <div class="fl subject">语</div>
                    <div class="fl details">
                        <div class="clearfix">
                            <p class="fl">{{item.paperMarkingName}}</p>
                            <p class="fl" v-for="(item1,index1) in infor.subject" :key="index1" v-show="item1.id == item.subjectId">{{item1.name}}</p>
                            <ul class="fr clearfix">
                                <li class="fr" @click="delete1(item)">删除</li>
                                <li class="fr" @click="editTestPaper(item)">编辑</li>
                                <li class="fr" @click="testNumber(item)">考试号设置</li>
                                <!-- <li class="fr" @click="examinationSettings(item)">考场设置</li> -->
                            </ul>
                        </div>
                        <div>
                            <span>{{item.createBy}}</span>
                            <span>创建于 {{item.createDate}}</span>
                            <span>学科负责人：{{item.paperSubjectHeader}}</span>
                            <span>出卷人：{{item.paperSubjectDealer}}</span>
                        </div>
                        <div class="clearfix">
                            <ul class="speed clearfix fl">
                                <li class="fl">
                                    <i class="big-triangle"></i>
                                    <i class="big-triangle1"></i>
                                    <i
                                        class="small-triangle"
                                        :style="'border-color: transparent transparent transparent '+(item.speedProgress>3?'#1abc9c':'#5093e1')+';'"
                                    ></i>
                                    <div
                                        v-if="item.markingMode == 0"
                                        class="middle"
                                        :style="'background:'+ (item.speedProgress>3?'#1abc9c':'#5093e1')+ ';'"
                                    >制作答题卡</div>
                                    <div
                                        v-if="item.markingMode == 1"
                                        class="middle"
                                        :style="'background:'+ (item.speedProgress>3?'#1abc9c':'#5093e1')+ ';'"
                                    >设置试题结构</div>
                                </li>
                                <li class="fl">
                                    <i class="big-triangle"></i>
                                    <i class="big-triangle1"></i>
                                    <i
                                        class="small-triangle"
                                        :style="'border-color: transparent transparent transparent '+(item.speedProgress>4?'#1abc9c':(item.speedProgress==4?'#5093e1':'#ddd')) +';'"
                                    ></i>
                                    <div
                                        class="middle"
                                        :style="'background:'+ (item.speedProgress>4?'#1abc9c':(item.speedProgress==4?'#5093e1':'#ddd'))+ ';'"
                                    >
                                        <span>框选锚点信息</span>
                                    </div>
                                </li>
                                <li class="fl">
                                    <i class="big-triangle"></i>
                                    <i class="big-triangle1"></i>
                                    <i
                                        class="small-triangle"
                                        :style="'border-color: transparent transparent transparent '+(item.speedProgress>6?'#1abc9c':(item.speedProgress==5 || item.speedProgress==6 ?'#5093e1':'#ddd')) +';'"
                                    ></i>
                                    <div
                                        class="middle"
                                        :style="'background:'+ (item.speedProgress>6?'#1abc9c':(item.speedProgress==5 || item.speedProgress==6 ?'#5093e1':'#ddd'))+ ';'"
                                    >
                                        <span>配置与扫描</span>
                                    </div>
                                </li>
                                <li class="fl">
                                    <i class="big-triangle"></i>
                                    <i class="big-triangle1"></i>
                                    <i
                                        class="small-triangle"
                                        :style="'border-color: transparent transparent transparent '+(item.speedProgress>8?'#1abc9c':(item.speedProgress==7 || item.speedProgress==8?'#5093e1':'#ddd')) +';'"
                                    ></i>
                                    <div
                                        class="middle"
                                        :style="'background:'+ (item.speedProgress>8?'#1abc9c':(item.speedProgress==7 || item.speedProgress==8 ?'#5093e1':'#ddd'))+ ';'"
                                    >
                                        <span>阅卷阶段</span>
                                    </div>
                                </li>
                                <li class="fl">
                                    <i
                                        class="small-triangle"
                                        :style="'border-color: transparent transparent transparent '+(item.speedProgress>10?'#1abc9c':(item.speedProgress==9 || item.speedProgress==10 ?'#5093e1':'#ddd')) +';'"
                                    ></i>
                                    <div
                                        class="middle"
                                        :style="'background:'+ (item.speedProgress>10?'#1abc9c':(item.speedProgress== 9  || item.speedProgress== 10 ?'#5093e1':'#ddd'))+ ';'"
                                    >
                                        <span>合成成绩</span>
                                    </div>
                                </li>
                            </ul>
                            <button class="fr" @click="jump(item)">阅卷设置</button>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="wd_page" v-if="infor.pageInfo" >
                <div class="wd_pageBn">
                    <i
                        class="iconfont iconxiangzuo wd_left1"
                        :class="infor.preInfo=='disabled'?'disabledBn':''"
                        @click="prePageBn(infor.preInfo)"
                    ></i>
                    <span
                        
                        v-for="(item,index) in infor.pageInfo.middlePageInfoLists"
                        :key="index"
                        class="pageNum"
                        :class="item.state=='active'?'activePageBn':''"
                        @click="pageChange(item.text)"
                    >{{item.text}}</span>
                    <i
                        class="iconfont iconicon03 wd_right1"
                        :class="infor.nextInfo=='disabled'?'disabledBn':''"
                        @click="nextPageBn(infor.nextInfo)"
                    ></i>
                </div> 
                <div class="wd_pageInfo">
                    <p>
                        显示
                        <span>{{infor.pageInfo.currentPage}}</span> 到
                        <span>{{infor.pageInfo.pageSize}}</span>项，共
                        <span>{{infor.pageInfo.totalPage}}</span>页
                    </p>
                </div> 
            </div>
        </div>
        <div class="wd_greyBack" v-if="elasticFrame.bol"></div>
        <div class="wd_newMarking" v-if="elasticFrame.bol">
        	
            <div class="newMarking_header" v-text="elasticFrame.state == 'new' ? '新建阅卷' : '编辑阅卷'"></div>
            <div class="newMarking_main">
                <ul>
                    <li>
                        <h3>基本信息</h3>
                    </li>
                    <li>
                        <span>阅卷名称</span>
                        <input
                            type="text"
                            placeholder="请输入阅卷名称"
                            v-model="elasticFrame.infor.paperMarkingName"
                        />
                    </li>
                    <li class="clearfix">
                        <span class="fl">选择年级</span>
                        <div class="fl block">
                            <label v-for="(item,index) in infor.grade" :key="index" >
                                <input
                                    type="radio"
                                    name="grade"
                                    id
                                    v-model="elasticFrame.infor.termId"
                                    :value="item.id"
                                    @click="frameSelectiveGrade(index)"
                                />
                                {{item.gradeName}}
                            </label>
                        </div>
                    </li>
                    <li class="clearfix">
                        <span class="fl">阅卷模式</span>
                        <div class="fl block">
                            <label>
                                <input
                                    type="radio"
                                    name="markingMode"
                                    id
                                    v-model="elasticFrame.infor.markingMode"
                                    value="0"
                                />网阅本平台
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="markingMode"
                                    id
                                    v-model="elasticFrame.infor.markingMode"
                                    value="1"
                                />网阅其它试卷
                            </label>
                        </div>
                    </li>
                    <li class="clearfix">
                        <span class="fl">选择学科</span>
                        <div class="fl block">
                            <label v-for="(item,index) in infor.subject" :key="index">
                                <input
                                    type="radio"
                                    name="subject"
                                    id
                                    v-model="elasticFrame.infor.subjectId"
                                    :value="item.id"
                                    
                                />
                                {{item.name}}
                            </label>
                        </div>
                    </li>
                    <li v-if="elasticFrame.infor.subjectId">
                        <h3>单科信息</h3>
                        <table>
                            <tr>
                                <td>学科</td>
                                <td>学科负责人</td>
                                <td>出卷负责人</td>
                            </tr>
                            <tr>
                                <td v-for="(item,index) in infor.subject" :key="index" v-if="item.id == elasticFrame.infor.subjectId">{{item.name}}</td>
                                <td>{{elasticFrame.infor.paperSubjectHeader}}</td>
                                <td>{{elasticFrame.infor.paperSubjectDealer}}</td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <span>参考班级</span>
                                    <button :class="{active:bol}" @click="election">全部</button>
                                    <button
                                        @click="choosingClasses(index)"
                                        :class="{active:item.active}"
                                        v-for="(item,index) in infor.class1"
                                        :key="index"
                                    >{{item.className}}班</button>
                                </td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </div>
            <div class="newMarking_footer">
                <div>
                    <button type="button" @click="newlyBuild">
                        <span>取消</span>
                    </button>
                    <button type="button" @click="determine">
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
    name: "readList",
    data() {
        return {
            infor: {
                // 班级列表
                grade: {},
                // 学科列表
                subject: {},
                // 表格列表
                arr: [],
                class1: [
                    
                ],
            },
            // 班级全选
            bol: false,
            elasticFrame: {
                bol: false,
                state : 'new',   //new 新建  edit 编辑
                infor: {
                    // // 名称
                    // paperMarkingName: "",
                    // // 阅卷模式
                    // markingMode: 0,
                    // // 学科名称
                    // subjectName: "",
                    // // 学科id
                    // subjectId: "",
                    // //试卷id
                    // paperResId: "",
                    // // 年级id
                    // gradeId: "",
                    // // 年级名称
                    // gradeName: "",
                    // // 学期
                    // termName: "",
                    // // 学段id
                    // levelId: "",
                    // // 学段名称
                    // levelName: "",
                    
                    // // 班级id
                    // classId: "",
                    // // 班级名称
                    // className: "",
                    // // 进度
                    // speedProgress: 1,
                    // // 时间
                    // createDate: "2019-07-04 16:22:18"
                    paperMarkingName:"",
                    markingMode:"",
                    gradeId:"",
                    levelId:"level_2",
                    subjectId:"",
                    termId:"",
                    classIds:"",
                    classNames:"",
                    speedProgress:"1",
                    // 学科负责人
                    paperSubjectHeader: "张琳",
                    // 出卷人
                    paperSubjectDealer: "张琳",
                    gradeName:"",
                    termName:"",
                    subjectName:"",
                    jeucGradeId:"",
                    jeucGradeName:"",
                    jeucSchoolId:""
                }
            },
            pageNum:1
        };
    },
    methods: {
        // 年级选择
        selectiveGrade(index) {
            console.log(index)
            this.getTableInfo(index);
            this.infor.grade.forEach(ele => {
                ele.state = false;
            });
            this.infor.grade[index].state = true;
            this.pageNum = 1;
        },
        // 考场设置
        examinationSettings(item){
            this.$router.push({path:"/index/readPaper/admin/examinationSettings",query:item})
        },
        // 考试号设置
        testNumber(item){
            this.$router.push({path:"/index/readPaper/admin/testNumberSetting",query:item})
        },
        // 弹框显示与隐藏
        newlyBuild() {
            this.elasticFrame.bol = !this.elasticFrame.bol;
            this.elasticFrame.state = 'new';
            this.elasticFrame.infor = {
                paperMarkingName:"",
                markingMode:"",
                gradeId:"",
                levelId:"level_2",
                subjectId:"",
                termId:"",
                classIds:"",
                classNames:"",
                // 学科负责人
                paperSubjectHeader: "张琳",
                // 出卷人
                paperSubjectDealer: "张琳",
                speedProgress:"1",
                gradeName:"",
                termName:"",
                subjectName:"",
                jeucGradeId:"",
                jeucGradeName:"",
                jeucSchoolId:""
            };
        },
        // 弹框选择年级
        frameSelectiveGrade(i){
            this.infor.grade.forEach((ele,index)=>{
                ele.active = false;
                if(i == index){
                    ele.active = true;
                    this.elasticFrame.infor.gradeId = this.infor.grade[i].parentId;
                }
            })
            wordRelevant.getClassList({
                officeId:"office_9f32ab3748d64717a6601e0079e9c941",
                gradeDictId:this.infor.grade[i].parentId
            }).then(res=>{
                this.infor.class1 = res.data.data.classes;
                this.elasticFrame.infor.jeucGradeId = res.data.data.gradeId;
                this.elasticFrame.infor.jeucGradeName = res.data.data.gradeName;
                this.elasticFrame.infor.jeucSchoolId = "office_9f32ab3748d64717a6601e0079e9c941";
                this.elasticFrame.infor.gradeName =this.infor.grade[i].gradeName;
                this.elasticFrame.infor.termName = this.infor.grade[i].gradeName;
                this.infor.class1.forEach(ele=>{
                    ele.active = false;
                })
            })
        },
        // 弹框确认
        determine() {
            this.elasticFrame.infor.classIds = "";
            this.elasticFrame.infor.classNames = "";
            this.infor.class1.forEach(ele => {
                if(ele.active){
                    this.elasticFrame.infor.classIds+=ele.classId+",";
                    this.elasticFrame.infor.classNames+=ele.className+",";
                }
            });
            if(this.elasticFrame.infor.markingMode==0){
                this.elasticFrame.infor.speedProgress="1";
            }else{
                this.elasticFrame.infor.speedProgress="2";
            }
            this.infor.subject.forEach(ele=>{
                if(ele.id == this.elasticFrame.infor.subjectId){
                    this.elasticFrame.infor.subjectName = ele.name
                }
            })
            this.elasticFrame.infor.classIds=this.elasticFrame.infor.classIds.substring(0,this.elasticFrame.infor.classIds.length-1);
            this.elasticFrame.infor.classNames=this.elasticFrame.infor.classNames.substring(0,this.elasticFrame.infor.classNames.length-1);
            console.log(this.elasticFrame.infor)
            wordRelevant
                .createMarkingTask(this.elasticFrame.infor)
                .then(res => {
                    if(res.data.ret==400){
                        this.$parent.$parent.timingFn("fail",res.data.message)
                    }
                    if(res.data.ret==200){
                        let num=0;
                        this.infor.grade.forEach((ele,index) => {
                            if(ele.active == true){
                                num = index;
                            }
                        });
                        this.selectiveGrade(num)
                        this.elasticFrame.infor = {
                            paperMarkingName:"",
                            markingMode:"",
                            gradeId:"",
                            levelId:"level_2",
                            subjectId:"",
                            termId:"",
                            classIds:"",
                            classNames:"",
                            speedProgress:"1",
                            // 学科负责人
                            paperSubjectHeader: "张琳",
                            // 出卷人
                            paperSubjectDealer: "张琳",
                            gradeName:"",
                            termName:"",
                            subjectName:"",
                            jeucGradeId:"",
                            jeucGradeName:"",
                            jeucSchoolId:""
                        };
                        this.elasticFrame.bol = !this.elasticFrame.bol;
                        let tips = this.elasticFrame.state == 'new' ? '新建成功' : '修改成功';
                        this.$parent.$parent.timingFn("success",tips);
                    }
                })
        },
        // 删除
        delete1(item) {
            let obj ={
                id:item.id
            }
            let _this = this;
            this.$parent.$parent.confirmFn("确认删除本场阅卷吗？", function(state) {
                if (state == "sure") {
                    wordRelevant.deleteMarkingTask(obj).then(res=>{
                        if(res.data.ret == 200){
                            _this.$parent.$parent.timingFn("success","删除成功");
                            let num=0;
                            _this.infor.grade.forEach((ele,index) => {
                                if(ele.active == true){
                                    num = index;
                                }
                            });
                            _this.selectiveGrade(num)
                        }
                    })
                }
            });
        },
        // 编辑试卷
        editTestPaper(item){
            // this.elasticFrame.infor = {
            //     paperMarkingName:"",
            //     markingMode:"",
            //     gradeId:"",
            //     levelId:"level_2",
            //     subjectId:"",
            //     termId:"",
            //     classIds:"",
            //     classNames:"",
            //     speedProgress:"1",
            //     // 学科负责人
            //     paperSubjectHeader: "张琳",
            //     // 出卷人
            //     paperSubjectDealer: "张琳",
            //     gradeName:"",
            //     termName:"",
            //     subjectName:"",
            //     jeucGradeId:"",
            //     jeucGradeName:"",
            //     jeucSchoolId:""
            // };
            
            
            this.elasticFrame.bol = true;
            this.elasticFrame.state = 'edit';
            wordRelevant.queryState({id:item.id}).then(res => {
				if(res.status == 200){
					console.log(res.data.data.data)	
					let data = res.data.data.data;
//					this.elasticFrame.infor = res.data.data.data;
					this.elasticFrame.infor.paperMarkingName = data.paperMarkingName;
					this.elasticFrame.infor.markingMode = data.markingMode;
					this.elasticFrame.infor.gradeId = data.gradeId;
					this.elasticFrame.infor.levelId = data.levelId;
					this.elasticFrame.infor.subjectId = data.subjectId;
					this.elasticFrame.infor.termId = data.termId;
					this.elasticFrame.infor.classIds = data.classIds;
					this.elasticFrame.infor.classNames = data.classNames;
					this.elasticFrame.infor.speedProgress = data.speedProgress;
					this.elasticFrame.infor.paperSubjectHeader = data.paperSubjectHeader;
					this.elasticFrame.infor.paperSubjectDealer = data.paperSubjectDealer;
					this.elasticFrame.infor.gradeName = data.gradeName;
					this.elasticFrame.infor.termName = data.termName;
					this.elasticFrame.infor.subjectName = data.subjectName;
					this.elasticFrame.infor.jeucGradeId = data.jeucGradeId;
					this.elasticFrame.infor.jeucGradeName = data.jeucGradeName;
					this.elasticFrame.infor.jeucSchoolId = data.jeucSchoolId;
				}
			}).catch(e => {
				
			});
        },
        // 班级全选按钮
        election() {
            this.bol = !this.bol;
            this.infor.class1.forEach(ele => {
                ele.active = this.bol;
            });

        },
        // 选择班级
        choosingClasses(index) {
            console.log(index)
            this.infor.class1[index].active = !this.infor.class1[index].active;
            let bol = this.infor.class1.every(ele => {
                return ele.active;
            });
            this.bol = bol;
            this.infor.class1 = JSON.parse(JSON.stringify(this.infor.class1))
        },
        //点击页码按钮
        pageChange(num) {
            this.pageNum = num;
            this.getTableInfo();
        },
        //点击下一页按钮
        nextPageBn(info) {
            if (info == "disabled") return;
            this.pageNum++;
            this.getTableInfo();
        },
        //点击上一页按钮
        prePageBn(info) {
            if (info == "disabled") return;
            this.pageNum--;
            this.getTableInfo();
        },
        getTableInfo(init){
            let index = init || 0;
            this.infor.grade.forEach((ele,i) => {
                if(ele.state == true){
                    index = i;
                }
            });
            let obj = {
                pageSize: 10,
                termId: '',
                pageNo: this.pageNum,
            };
            if(index > -1){
            	obj.termId = this.infor.grade[index].id
            }
            wordRelevant
                .getMarkingList(obj)
                .then(res => {
                    if (res.status == 200) {
                        this.infor.arr = res.data.data.list;
                        this.infor.pageInfo = res.data.data.pageInfo;
                        this.infor.nextInfo = res.data.data.pageInfo.nextPage.state;
                        this.infor.preInfo = res.data.data.pageInfo.prePage.state;
                    }
                })
                .catch(error => {});
        },
        // 阅卷设置
        jump(item) {
            this.$router.push({ path: "/index/readPaper/admin/platform",query:item });
        },

    },
    created() {
        //获取学科下拉
        wordRelevant
            .getSubjectData({ levelId: "level_2" })
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    this.infor.subject = res.data.data.list;
                }
            })
            .catch(e => {});
        //获取年级列表
        wordRelevant
            .getGradeData({ levelId: "level_2" })
            .then(res => {
                if (res.status == 200) {
                    this.infor.grade = res.data.data.list;
                    this.infor.grade.forEach((ele, index) => {
                        if (index == 0) {
                            ele.active = false;
//                          ele.state = true;
                        } else {
                            ele.active = false;
                            ele.state = false;
                        }
                    });
                    this.selectiveGrade(-1);
                }
            })
            .catch(e => {});
    },
    
    
};
</script>
<style lang="" scoped>
.wd_nav {
    width: 100%;
    height: 50px;
    background-color: #f8f8f8;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
}
.wd_nav p {
    font-size: 16px;
    line-height: 50px;
    letter-spacing: 0px;
    color: #333333;
    margin-right: 35px;
    cursor: pointer;
}
.wd_nav p:nth-child(1) {
    margin-left: 20px;
}
.wd_nav .active {
    color: #5093e1;
}
.wd_nav button {
    width: 98px;
    height: 30px;
    background-color: #1abc9c;
    border-radius: 2px;
    border: none;
    margin-top: 11px;
    margin-right: 20px;
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
}
.wd_main {
    width: 100%;
    margin-top: 10px;
    background-color: #f8f8f8;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
}
.wd_main .list > li {
    width: 100%;
    height: 125px;
    border-bottom: 1px solid #ddd;
}
.wd_main .list .subject {
    width: 16px;
    height: 16px;
    background-color: #f8f8f8;
    border-radius: 2px;
    border: solid 1px #399fdf;
    font-size: 12px;
    line-height: 16px;
    color: #399fdf;
    text-align: center;
    margin-top: 19px;
    margin-left: 18px;
}
.wd_main .list .details {
    width: 1158px;
    margin-top: 18px;
    margin-left: 5px;
}
.wd_main .list .details div:nth-child(1) p {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin-right: 10px;
}
.wd_main .list .details div:nth-child(1) ul {
    margin-right: 12px;
}
.wd_main .list .details div:nth-child(1) li {
    width: 72px;
    height: 24px;
    background-color: #f8f8f8;
    border-radius: 2px;
    border: solid 1px #cccccc;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
    color: #666666;
    margin-right: 8px;
    cursor: pointer;
}
.wd_main .list .details div:nth-child(1) li:hover {
    border: solid 1px #2d8cf0;
    color: #2d8cf0;
}
.wd_main .list .details div:nth-child(2) span {
    font-size: 14px;
    line-height: 24px;
    color: #999999;
    margin-right: 14px;
}
.wd_main .list .details > div:nth-child(3) {
    margin-top: 10px;
}
.wd_main .list .details div:nth-child(3) li {
    position: relative;
}
.wd_main .list .details div:nth-child(3) .middle {
    width: 161px;
    height: 30px;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    color: #ffffff;
    background-color: #dddddd;
}
.wd_main .list .details div:nth-child(3) .middle span {
    margin-left: 5px;
    color: #fff;
}
.wd_main .list .details div:nth-child(3) li:nth-child(1) .middle {
    width: 130px;
}
.wd_main .list .details div:nth-child(3) .big-triangle {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 10px;
    border-color: transparent transparent transparent #fff;
    position: absolute;
    right: -13px;
    top: 0;
    z-index: 77;
}
.wd_main .list .details div:nth-child(3) .big-triangle1 {
    width: 3px;
    height: 30px;
    background: #fff;
    position: absolute;
    top: 0;
    right: -3px;
    z-index: 88;
}
.wd_main .list .details div:nth-child(3) .small-triangle {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 10px;
    position: absolute;
    right: -10px;
    top: 0px;
    z-index: 99;
}
.wd_main .list .details div:nth-child(3) button {
    width: 103px;
    height: 34px;
    background-color: #5093e1;
    box-shadow: 0px 1px 0px 0px #14539d;
    border-radius: 2px;
    border: none;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    margin-right: 20px;
}
/* 页码 */
.wd_main .wd_page {
    margin-top: 25px;
    width: 100%;
    position: relative;
}
.wd_main .wd_pageBn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
}
.wd_main .wd_pageInfo {
  float: right;
  margin-right: 31px;
}
.wd_main .wd_left1,
.wd_main .wd_right1 {
  color: #65a0e5;
  cursor: pointer;
}

.wd_main .pageNum {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  margin: 0 8px 0 8px;
}
.wd_main .activePageBn {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}

.disabledBn {
  cursor: not-allowed;
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

.wd_newMarking {
    width: 800px;
    height: auto;
    border-radius: 5px;
    padding: 0;
    background-color: #ffffff;
    opacity: 1;
    box-shadow: 0 0 6px #ccc;
    position: fixed;
    left: 50%;
    top: 100px;
    transform: translate(-50%);
    z-index: 101;
    text-align: center;
}
.wd_newMarking .newMarking_header {
    font-size: 20px;
    text-align: left;
    padding: 10px;
    font-weight: 700;
    color: #2d8cf0;
    border-bottom: 1px solid #ccc;
}
.wd_newMarking .newMarking_main {
    margin-left: 30px;
}
.wd_newMarking .newMarking_main li {
    text-align: left;
    font-size: 16px;
    color: #757575;
    margin-top: 15px;
}
.wd_newMarking .newMarking_main li h3 {
    color: #333;
    font-weight: 700;
}
.wd_newMarking .newMarking_main li span {
    margin-right: 20px;
}
.wd_newMarking .newMarking_main li input[type="text"] {
    width: 300px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid #ccc;
    outline: none;
}
.wd_newMarking .newMarking_main li label {
    margin-right: 20px;
    cursor: pointer;
}
.wd_newMarking .newMarking_main li label input {
    vertical-align: middle;
}
.wd_newMarking .newMarking_main li table {
    width: 90%;
    margin: 10px;
}

.wd_newMarking .newMarking_main li button {
    width: 60px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #999;
    outline: none;
    line-height: 28px;
    text-align: center;
    margin-left: 10px;
    cursor: pointer;
    background: #fff;
}
.wd_newMarking .newMarking_main li p {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
}
.wd_newMarking .newMarking_main li .relation {
    width: 190px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    background: #1abc9c;
    border: 1px solid #ccc;
    color: #fff;
}
.wd_newMarking .newMarking_main li .block {
    width: 600px;
}
.wd_newMarking .newMarking_main li .active {
    background: #2d8cf0;
    color: #fff;
    border: none;
}
.wd_newMarking .newMarking_main li table td {
    border: 1px solid #333;
    text-align: center;
    padding: 5px 0;
}
.wd_newMarking .newMarking_footer {
    margin-top: 20px;
    margin-bottom: 20px;
}
.wd_newMarking .newMarking_footer button:nth-child(1) {
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
}
.wd_newMarking .newMarking_footer button:nth-child(2) {
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
</style>