<template>
    <div>

        <div class="prompt_box public_box waiting_box jhf_public_addtest" v-show="addtestShow" style="position: relative" >
            <div class="hide"></div>
            <div class='con jhf_addtest_content' >
                <!-- 添加试卷 -->
                <div class="jhf_addtest" >
                    <!-- 头部 -->
                    <div class="jhf_addtest_header" >
                        <span class="fl" >添加试卷</span>
                        <i class="iconfont iconguanbi1 fr jhf_addtest_close" @click="closeAddtest()" ></i>
                    </div>
                    <!-- 内容 -->
                    <div class="jhf_addtest_conter clearfix" >
                        <ul class="clearfix" >
                            <li class="fl" >
                                <span class="fl" >{{listTitle.conter}}</span>
                                <input type="text" class="fr" v-model="text" @click="addtestclick()" >
                            </li>
                            <li class="fl" >
                                <span class="fl" >{{listGrade.conter}}</span>
                                <div class="jhf_opt fr" @click="GradeShow()" >
                                    {{listGrade.content}}
                                    <div class="jhf_pull fr" ></div>
                                </div>
                            </li>
                            <li class="fl" >
                                <span class="fl" >{{listSubject.conter}}</span>
                                <div class="jhf_opt fr" @click="SubjectShow()" >
                                    {{listSubject.content}}
                                    <div class="jhf_pull fr" ></div>
                                </div>
                            </li>
                            <li class="fl" >
                                <span class="fl" >{{listTest.conter}}</span>
                                <div class="jhf_opt fr" @click="TestShow()" >
                                    {{listTest.content}}
                                    <div class="jhf_pull fr" ></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 底部 -->
                    <div class="jhf_addtest_footer clearfix" >
                        <span class="fl" @click="confirm()" >确定</span>
                        <em class="fl" @click="callOff()" >取消</em>
                    </div>
                </div>
                <!-- 年级分类选择 -->
                <div class="jhf_addtest_grade" v-show="gradeShow" >
                    <span class="fl" v-for="(item , index) in addGrade" :key="index" @click="gradePull(item)" >{{item}}</span>
                </div>
                <!-- 学科分类选择 -->
                <div class="jhf_addtest_subject" v-show="subjectShow" >
                    <span class="fl" v-for="(item , index) in addSubject" :key="index" @click="subjectPull(item)" >{{item}}</span>
                </div>
                <!-- 考试类型分类选择 -->
                <div class="jhf_addtest_test" v-show="testShow" >
                    <span class="fl" v-for="(item , index) in addTest" :key="index" @click="testPull(item)" >{{item}}</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name : "addtest",
    props : ["btnClose"],
    data(){
        return{
            text : "",
            // 添加试卷显示与隐藏
            addtestShow : true,
            // 内容数组
            listTitle : {conter : "标题"},
            listGrade : {content : "请选择年级",conter : "年级"},
            listSubject : {content : "请选择学科",conter : "学科"},
            listTest : {content : "请选择考试类型",conter : "考试类型"},
            // 年级分类显示隐藏
            gradeShow : false,
            // 年级分类数组
            addGrade : ["初一年级上" , "初一年级下" , "初二年级上" , "初二年级下" , "初三年级上" , "初三年级下"],
            // 学科分类显示隐藏
            subjectShow : false,
            // 学科选择数组
            addSubject : ["语文" , "数学" , "英语" , "物理" , "化学" , "生物"],
            // 考试类型显示隐藏
            testShow : false,
            // 考试类型数组
            addTest : ["入学考试" , "摸底考试" , "模拟考试" , "月考考试" , "期中考试" , "期末考试" , "毕业考试"]
        }
    },
    methods : {
        // 关闭添加试卷
        closeAddtest(){
            this.btnClose();
            this.gradeShow = false;
            this.subjectShow = false;
            this.testShow = false;
            this.listGrade.content = "请选择年级";
            this.listSubject.content = "请选择学科";
            this.listTest.content = "请选择考试类型";
            this.text = "";
        },
        // 点击取消
        callOff(){
            this.btnClose();
            this.gradeShow = false;
            this.subjectShow = false;
            this.testShow = false;
            this.listGrade.content = "请选择年级";
            this.listSubject.content = "请选择学科";
            this.listTest.content = "请选择考试类型";
            this.text = "";
        },
        // 年级分类下拉
        GradeShow(){
            this.gradeShow = !this.gradeShow;
            this.subjectShow = false;
            this.testShow = false;
        },
        // 年级分类下拉显示隐藏
        gradePull(item){
            this.gradeShow = false;
            this.listGrade.content = item;
        },
        // 学科分类下拉
        SubjectShow(){
            this.subjectShow = !this.subjectShow;
            this.testShow = false;
        },
        // 学科分类下拉显示隐藏
        subjectPull(item){
            this.subjectShow = false;
            this.listSubject.content = item;
        },
        // 考试类型分类下拉
        TestShow(){
            this.testShow = !this.testShow;
            this.gradeShow = false;
        },
        // 考试类型分类显示隐藏
        testPull(item){
            this.testShow = false;
            this.listTest.content = item;
        },
        // 点击确定
        confirm(){
            if(this.text == ""){
                alert("请输入标题！");
            }else if(this.listGrade.content == "请选择年级"){
                alert("请选择年级！");
            }else if(this.listSubject.content == "请选择学科"){
                alert("请选择学科！");
            }else if(this.listTest.content == "请选择考试类型"){
                alert("请选择考试类型！")
            }else{
                this.btnClose();
                this.listGrade.content = "请选择年级";
                this.listSubject.content = "请选择学科";
                this.listTest.content = "请选择考试类型";
                this.text = "";
            }
        },
        addtestclick(){
            this.testShow = false;
            this.gradeShow = false;
            this.subjectShow = false;
        }
    }
}
</script>
<style>
    /* 最外层遮罩层样式 */
    .jhf_public_addtest .jhf_addtest_content{
        width: 400px;
        height: 292px;
        padding: 0;
        text-align: left;
    }


    /* 添加试卷 */
    .jhf_addtest{
        width: 400px;
        height: 292px;
    }


    /* 头部 */
    .jhf_addtest_header{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #DDD;
    }
    .jhf_addtest_header span{
        line-height: 45px;
        margin-left: 29px;
        font-size: 16px;
        color: #5093e1;
    }
    .jhf_addtest_close{
        line-height: 45px;
        margin-right: 20px;
        cursor: pointer;
    }


    /* 内容 */
    .jhf_addtest_conter{
        width: 100%;
    }
    .jhf_addtest_conter ul li{
        margin: 20px 0 0 64px;
    }
    .jhf_addtest_conter ul li:last-child{
        margin-bottom: 20px;
    }
    .jhf_addtest_conter span{
        width: 56px;
        text-align: right;
        margin: 4px 19px 0 0;
    }
    .jhf_addtest_conter .jhf_opt{
        width: 177px;
        height: 22px;
        line-height: 22px;
        border: 1px solid #DDD;
        border-radius: 3px;
        cursor: pointer;
        padding-left: 5px;
        padding-right: 5px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .jhf_addtest_conter input{
        width: 177px;
        height: 22px;
        outline: none;
        cursor: pointer;
        border: 1px solid #DDD;
        border-radius: 3px;
        padding-left: 5px;
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .jhf_addtest_conter .jhf_pull{
        border-color: #000 transparent transparent transparent;
        border-style: solid;
        border-width: 6px;
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-20%);
    }


    /* 底部 */
    .jhf_addtest_footer{
        width: 100%;
    }
    .jhf_addtest_footer span{
        width: 110px;
        height: 30px;
        background: #dbeef9;
        color: #5093e1;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 53px;
    }
    .jhf_addtest_footer em{
        font-style: normal;
        width: 108px;
        height: 28px;
        border: 1px solid #DDD;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        margin-left: 72px;
    }


    /* 年级分类 */
    .jhf_addtest_grade{
        position: absolute;
        width: 177px;
        height: 68px;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid #DDD;
        top: 134px;
        right: 72px;
        overflow: auto;
        background: #FFF;
        border-radius: 3px;
        overflow-x:hidden;
    }
    .jhf_addtest_grade span{
        cursor: pointer;
        width: 187px;
        padding-top: 4px;
    }


    /* 学科选择 */
    .jhf_addtest_subject{
        position: absolute;
        width: 177px;
        height: 68px;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid #DDD;
        top: 178px;
        right: 72px;
        overflow: auto;
        background: #FFF;
        border-radius: 3px;
        overflow-x:hidden;
    }
    .jhf_addtest_subject span{
        cursor: pointer;
        width: 187px;
        padding-top: 4px;
    }


    /* 考试类型选择 */
    .jhf_addtest_test{
        position: absolute;
        width: 177px;
        height: 68px;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid #DDD;
        top: 222px;
        right: 72px;
        overflow: auto;
        background: #FFF;
        border-radius: 3px;
        overflow-x:hidden;
    }
    .jhf_addtest_test span{
        cursor: pointer;
        width: 187px;
        padding-top: 4px;
    }
</style>