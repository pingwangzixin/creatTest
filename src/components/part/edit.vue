<template>
    <div>

        <div class="prompt_box public_box waiting_box jhf_public_edit" v-show="editShow" style="position: relative" >
            <div class="hide"></div>
            <div class='con jhf_edit_content' >
                <!-- 添加试卷 -->
                <div class="jhf_edit" >
                    <!-- 头部 -->
                    <div class="jhf_edit_header" >
                        <span class="fl" >编辑</span>
                        <i class="iconfont iconguanbi1 fr jhf_edit_close" @click="closeAddtest()" ></i>
                    </div>
                    <!-- 内容 -->
                    <div class="jhf_edit_conter clearfix" >
                        <ul class="clearfix" >
                            <li class="fl" >
                                <span class="fl" >{{editTitle.conter}}</span>
                                <input type="text" class="fr" v-model="edittext" @click="edittextclick()" >
                            </li>
                            <li class="fl" >
                                <span class="fl" >{{editGrade.conter}}</span>
                                <div class="jhf_opt fr" @click="GradeShow()" >
                                    {{editGrade.content}}
                                    <div class="jhf_pull fr" ></div>
                                </div>
                            </li>
                            <li class="fl" >
                                <span class="fl" >{{editTest.conter}}</span>
                                <div class="jhf_opt fr" @click="TestShow()" >
                                    {{editTest.content}}
                                    <div class="jhf_pull fr" ></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 底部 -->
                    <div class="jhf_edit_footer clearfix" >
                        <span class="fl" @click="confirm()" >确定</span>
                        <em class="fl" @click="callOff()" >取消</em>
                    </div>
                </div>
                <!-- 年级分类选择 -->
                <div class="jhf_edit_grade" v-show="gradeShow" >
                    <span class="fl" v-for="(item , index) in addGrade" :key="index" @click="gradePull(item)" >{{item}}</span>
                </div>
                <!-- 考试类型分类选择 -->
                <div class="jhf_edit_test" v-show="testShow" >
                    <span class="fl" v-for="(item , index) in addTest" :key="index" @click="testPull(item)" >{{item}}</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name : "edit",
    props : ["editClose"],
    data(){
        return{
            edittext : "",
            // 添加试卷显示与隐藏
            editShow : true,
            // 内容数组
            editTitle : {conter : "标题"},
            editGrade : {content : "请选择年级",conter : "年级"},
            // editSubject : {content : "请选择学科",conter : "学科"},
            editTest : {content : "请选择考试类型",conter : "考试类型"},
            // 年级分类显示隐藏
            gradeShow : false,
            // 年级分类数组
            addGrade : ["初一年级上" , "初一年级下" , "初二年级上" , "初二年级下" , "初三年级上" , "初三年级下"],
            // 考试类型显示隐藏
            testShow : false,
            // 考试类型数组
            addTest : ["入学考试" , "摸底考试" , "模拟考试" , "月考考试" , "期中考试" , "期末考试" , "毕业考试"]
        }
    },
    methods : {
        // 关闭添加试卷
        closeAddtest(){
            this.editClose.fangfa();
            this.gradeShow = false;
            this.subjectShow = false;
            this.testShow = false;
            this.editGrade.content = "请选择年级";
            this.editTest.content = "请选择考试类型";
            this.edittext = "";
        },
        // 点击取消
        callOff(){
            this.editClose.fangfa();
            this.gradeShow = false;
            this.subjectShow = false;
            this.testShow = false;
            this.editGrade.content = "请选择年级";
            this.editTest.content = "请选择考试类型";
            this.edittext = "";
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
            this.editGrade.content = item;
        },
        // 考试类型分类下拉
        TestShow(){
            this.testShow = !this.testShow;
        },
        // 考试类型分类显示隐藏
        testPull(item){
            this.testShow = false;
            this.editTest.content = item;
        },
        // 点击确定
        confirm(){
            if(this.edittext == ""){
                alert("请输入标题！");
            }else if(this.editGrade.content == "请选择年级"){
                alert("请选择年级！");
            }else if(this.editTest.content == "请选择考试类型"){
                alert("请选择考试类型！")
            }else{
                this.editClose.fangfa();
                let obj = {
                    homework:this.edittext,
                    grade:this.editGrade.content,
                    exam:this.editTest.content
                }
                this.$emit("send",obj)
                this.editGrade.content = "请选择年级";
                // this.editSubject.content = "请选择学科";
                this.editTest.content = "请选择考试类型";
                this.edittext = "";
            }
        },
        edittextclick(){
            this.testShow = false;
            this.gradeShow = false;
        },
    },
    watch:{
        editClose(nval,oval){
            this.edittext = nval.neirong.homework;
            this.editGrade.content = nval.neirong.grade;
            this.editTest.content = nval.neirong.exam;

        }
    },
}
</script>
<style>
    /* 最外层遮罩层样式 */
    .jhf_public_edit .jhf_edit_content{
        width: 400px;
        height: 292px;
        padding: 0;
        text-align: left;
    }


    /* 添加试卷 */
    .jhf_edit{
        width: 400px;
        height: 292px;
    }


    /* 头部 */
    .jhf_edit_header{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #DDD;
    }
    .jhf_edit_header span{
        line-height: 45px;
        margin-left: 29px;
        font-size: 16px;
        color: #5093e1;
    }
    .jhf_edit_close{
        line-height: 45px;
        margin-right: 20px;
        cursor: pointer;
    }


    /* 内容 */
    .jhf_edit_conter{
        width: 100%;
        padding-bottom: 40px;
    }
    .jhf_edit_conter ul li{
        margin: 20px 0 0 64px;
    }
    .jhf_edit_conter ul li:last-child{
        margin-bottom: 20px;
    }
    .jhf_edit_conter span{
        width: 56px;
        text-align: right;
        margin: 4px 19px 0 0;
    }
    .jhf_edit_conter .jhf_opt{
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
    .jhf_edit_conter input{
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
    .jhf_edit_conter .jhf_pull{
        border-color: #000 transparent transparent transparent;
        border-style: solid;
        border-width: 6px;
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-20%);
    }


    /* 底部 */
    .jhf_edit_footer{
        width: 100%;
    }
    .jhf_edit_footer span{
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
    .jhf_edit_footer em{
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
    .jhf_edit_grade{
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
    .jhf_edit_grade span{
        cursor: pointer;
        width: 187px;
        padding-top: 4px;
    }




    /* 考试类型选择 */
    .jhf_edit_test{
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
    .jhf_edit_test span{
        cursor: pointer;
        width: 187px;
        padding-top: 4px;
    }
</style>