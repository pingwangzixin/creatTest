<template>
    <div class="wd_assignMarkingTasks">
        <div class="wd_header">
            <p>2019学年初一下学期语文期末考试·分配阅卷任务</p>
            <div class="return1" @click="return1">
                <i class="iconfont iconfanhui1"></i>
                返回
            </div>
            <button @click="preservation">保存设置</button>
        </div>
        <div class="wd_main">
            <div class="wd_left">
                <div class="title clearfix">
                    <p class="fl">主观题  共{{assignmentTask.quzInfoArr.length}}个题组</p>
                    <!-- <p  class="fr">给分默认值
                        <label><input type="radio" name="score" id="">全部满分</label>
                        <label><input type="radio" name="score" id="">全部0分</label>
                    </p> -->
                </div>
                <ul class="center">
                    <li v-for="(item,index) in assignmentTask.quzInfoArr" :key="index">
                        <div class="clearfix">
                            <p class="fl questionGroup">{{item.answerSheetSectionGroupNames}}</p>
                            <!-- <p class="fl clearfix">
                                <span class="fl" :class="{active:item.singleComment}" @click="comment(item,true)">单评</span>
                                <span class="fl" :class="{active:!item.singleComment}" @click="comment(item,false)">双评</span>
                            </p><br> -->
                        </div>
                        <p>
                            <span v-for="(item1,index1) in JSON.parse(item.answerSheetSectionGroupScoreArr)" :key="index1">
                                {{item1.quzLabel}}.满分{{item1.score}}分
                            </span>
                        </p>
                        <div class="choice">
                            <p >
                                <label >
                                    <input type="checkbox" name="" id="" v-model="item.markingPeopleBol" @click="marking(index)">
                                    阅卷人
                                </label>
                                <span  v-if="item.teacherMarkingByArr.length==0">
                                    勾选后从右侧选择老师
                                </span>
                                <span class="ren " v-for="(item1,index1) in item.teacherMarkingByArr" :key="index1">
                                    {{item1.teacherName}}
                                    <i class="iconfont iconguanbi1" @click="delete1('teacherMarkingByArr',index,index1)"></i>
                                </span>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" name="" id="" v-model="item.teamLeaderBol" @click="leader(index)">
                                    题组长
                                </label>
                                <span v-if="item.teacherLeaderByArr.length==0">
                                    勾选后从右侧选择老师
                                </span>
                                 <span class="ren " v-for="(item1,index1) in item.teacherLeaderByArr" :key="index1">
                                    {{item1.teacherName}}
                                    <i class="iconfont iconguanbi1" @click="delete1('teacherLeaderByArr',index,index1)"></i>
                                </span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="wd_right ">
                <p class="choice">
                    <label>
                        <input type="checkbox" name="" id="" v-model="markingPeopleBol" @click="markingPeople">
                        阅卷人全选
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" v-model="teamLeaderBol" @click="teamLeader">
                        题组长全选
                    </label>
                </p>
                <div class="title clearfix">
                    <p class="fl">阅卷老师名单</p>
                    <p  class="fr">管理</p>
                </div>
                <ul class="clearfix">
                    <li @click="choiceTeacher(item)"  class="fl" v-for="(item,index) in teacherName" :key="index">{{item.realname}}</li>
                </ul>
                
            </div>
        </div>
    </div>
</template>
<script>
import { wordRelevant } from "@/api";
export default {
    name:"assignMarkingTasks",
    data() {
        return {

            infor:"",
            assignmentTask:{
                paperMarkingTaskId:"",
                quzInfoArr:[]
            },
            teacherName:[],
            // 阅卷人全选
            markingPeopleBol:false,
            // 题组长全选
            teamLeaderBol:false
        }
    },
    methods:{
        markingPeople(){
            this.markingPeopleBol = !this.markingPeopleBol;
            this.assignmentTask.quzInfoArr.forEach(ele=>{
                ele.markingPeopleBol = this.markingPeopleBol;
            })
            
        },
        teamLeader(){
            this.teamLeaderBol = !this.teamLeaderBol;
            this.assignmentTask.quzInfoArr.forEach(ele=>{
                ele.teamLeaderBol = this.teamLeaderBol;
            })
        },
        verification(){
            let  show = true;
            let  show1 = true;
            this.assignmentTask.quzInfoArr.forEach(ele=>{
                if(!ele.markingPeopleBol){
                    show = false;
                }
                if(!ele.teamLeaderBol){
                    show1 = false;
                }
            })
            this.markingPeopleBol = show;
            this.teamLeaderBol = show1;
        },
        marking(index){
            this.assignmentTask.quzInfoArr[index].markingPeopleBol  = !this.assignmentTask.quzInfoArr[index].markingPeopleBol;
            this.verification()
        },
        leader(index){
            this.assignmentTask.quzInfoArr[index].teamLeaderBol  = !this.assignmentTask.quzInfoArr[index].teamLeaderBol;
            this.verification()
        },
        // 单双评
        // comment(item,bol){
        //     item.singleComment=bol;
        // },
        // 选择老师
        choiceTeacher(item){
            console.log(item)
            this.assignmentTask.quzInfoArr.forEach((e,i)=>{
                if(e.markingPeopleBol){
                    let bol =  e.teacherMarkingByArr.some(ele=>{
                        if(ele.id == item.id){
                            return true
                        }else{
                            return false
                        }
                    })
                    if(!bol){
                        e.teacherMarkingByArr.push({
                            teacherName:item.realname,
                            teacherId:item.id
                        });
                    }
                   
                }
                if(e.teamLeaderBol){
                    let bol =  e.teacherLeaderByArr.some(ele=>{
                        if(ele.id == item.id){
                            return true
                        }else{
                            return false
                        }
                    })
                    if(!bol){
                        e.teacherLeaderByArr.push({
                            teacherName:item.realname,
                            teacherId:item.id
                        });
                    }
                }
            })
            this.assignmentTask = JSON.parse(JSON.stringify(this.assignmentTask ))
        },
        // 删除老师
        delete1(item,index,index1){
            this.assignmentTask.quzInfoArr[index][item].splice(index1,1)
        },
        return1(){
            this.$router.push({path:"/index/readPaper/admin/platform",query:this.infor})
        },
        // 保存
        preservation(){
            let str = "";
            let bol = this.assignmentTask.quzInfoArr.some(ele=>{
                if(ele.teacherLeaderByArr.length == 0){
                    str = ele.answerSheetSectionGroupNames + "的题组长为空";
                    return true;
                }
                if(ele.teacherMarkingByArr.length == 0){
                    str = ele.answerSheetSectionGroupNames + "的阅卷人为空";
                    return true;
                }
            })
            if(bol){
                this.$parent.$parent.timingFn("fail",str);
                return
            }
            let obj = {
                paperMarkingTaskId:this.assignmentTask.paperMarkingTaskId,
                quzInfoArr:[]
            }
            this.assignmentTask.quzInfoArr.forEach(ele=>{
                let obj1 = {
                    paperMarkingTaskSubQuzsId:ele.id,
                    leaderByteacherArr:ele.teacherLeaderByArr,
                    markingByteacherArr:ele.teacherMarkingByArr
                }
                obj.quzInfoArr.push(obj1);
            })
            wordRelevant.assignMarkingTaskSave(obj).then(res=>{
                if(res.data.ret == 200){
                    this.$parent.$parent.timingFn("success","保存成功")
                }
                
            })
        }
    },
    created(){
        this.infor= this.$route.query;
        this.assignmentTask.paperMarkingTaskId = this.infor.id;
        wordRelevant.markingTaskSubjective({id:this.infor.id}).then(res=>{
            this.assignmentTask.quzInfoArr =  res.data.data.list;
            this.assignmentTask.quzInfoArr.forEach(ele=>{
                if(ele.teacherLeaderByArr){
                    ele.teacherLeaderByArr = JSON.parse(ele.teacherLeaderByArr )
                }else{
                    ele.teacherLeaderByArr = [];
                }
                if(ele.teacherMarkingByArr){
                    ele.teacherMarkingByArr = JSON.parse(ele.teacherMarkingByArr )
                }else{
                    ele.teacherMarkingByArr = [];
                }
                ele.markingPeopleBol = false;
                ele.teamLeaderBol = false;
            })
            console.log(this.assignmentTask.quzInfoArr)
        })
        wordRelevant.teacherInformation({
            officeId:"office_9f32ab3748d64717a6601e0079e9c941",
            subjectId:this.infor.subjectId
        }).then(res=>{
            this.teacherName =res.data.data;
        })
    }
}
</script>
<style lang="" scoped>

.wd_assignMarkingTasks .wd_header{
    width: 100%;
    position: relative;
    background: #fff;
    height: 70px;
    text-align: center;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

}
.wd_assignMarkingTasks .wd_header p{
    font-size: 16px;
    font-weight: 700;
    line-height: 70px;
}
.wd_assignMarkingTasks .wd_header .iconfont{
    font-size: 14px;
}
.wd_assignMarkingTasks .wd_header .return1{
    position: absolute;
    top: 25px;
    left:25px;
    color:#2d8cf0;
    cursor: pointer;
}
.wd_assignMarkingTasks .wd_header  button{
    width: 110px;
    height: 40px;
    position:absolute;
    right: 20px;
    top: 15px;
    background: #3498DB;
    border: none;
    outline: none;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
}  
.wd_main{
    width: 100%;
    margin-top: 20px;
}
.wd_main .wd_left{
    width: 800px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    padding-bottom: 20px;
}
.wd_main .wd_left .title{
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
.wd_main .wd_left .title p:nth-child(1){
    font-size: 16xp;
    font-weight: 700;
}
.wd_main .wd_left .title p:nth-child(2) label{
    cursor: pointer;
    margin-left: 15px;
}
.wd_main .wd_left .title p:nth-child(2) label input{
    vertical-align: middle;
}
.wd_main .wd_left .center{
    width: 100%;
    padding: 0  30px;
    box-sizing: border-box;
}
.wd_main .wd_left .center li{
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
}
.wd_main .wd_left .center li  div:nth-child(1){
    box-sizing: border-box;
}
.wd_main .wd_left .center li  div:nth-child(1) p:nth-child(1){
    font-weight: 700;
    margin-right:20px; 
    line-height: 25px;
}
.wd_main .wd_left .center li  div:nth-child(1) p:nth-child(2){
    width: 130px;
    height: 25px;
    line-height: 25px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.wd_main .wd_left .center li  div:nth-child(1) p:nth-child(2) span{
    display: inline-block;
    margin: 0;
    text-align: center;
    width: 65px;
    border-radius: 5px;
    cursor: pointer;
}
.wd_main .wd_left .center li  div:nth-child(1) p:nth-child(2) span.active{
    background: #3498DB;
    color: #fff;
}
.wd_main .wd_left .center li>p{
    margin-top: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
}
.wd_main .wd_left .center li>p input{
    width: 40px;
    height: 25px;
    vertical-align:middle;
    line-height: 25px;
    outline: none;
    border-radius: 5px;
    margin:  0 10px;
    text-align:center;
}
.wd_main .wd_left .center li .choice{
    padding-bottom: 15px;
}
.wd_main .wd_left .center li .choice p{
    margin-top:15px; 
}
.wd_main .wd_left .center li .choice p label{
    cursor: pointer;
}
.wd_main .wd_left .center li .choice p label input{
    vertical-align: middle;
}
.wd_main .wd_left .center li .choice p span{
    color: #ccc;
    margin-left:10px; 
}
.wd_main .wd_left ul li .choice p .ren{
    height: 25px;
    padding: 2px 5px;
    display: inline-block;
    background: #eee;
    color: #333;
    border-radius: 5px;
    line-height: 25px;
    text-align: center;
    margin-top: 5px;
}
.wd_main .wd_left ul li .choice p .ren .iconfont{
    cursor: pointer;
    font-size: 14px;
}
.wd_main .wd_right{
    width: 375px;
    border-radius: 10px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 183px;
    right: 50px;
}
.wd_main .wd_right .choice{
    padding: 20px ;
    border-bottom: 1px solid #ccc;
}
.wd_main .wd_right .choice label{
    cursor: pointer;
    margin-right: 30px;
}
.wd_main .wd_right .title{
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    border-bottom: 1px solid #ccc;
}
.wd_main .wd_right .title p:nth-child(1){
    font-weight: 700;
    font-size: 16px;
}
.wd_main .wd_right .title p:nth-child(2){
    color: #3498DB;
    cursor: pointer;
}
.wd_main .wd_right ul{
    padding: 20px 0px;
}
.wd_main .wd_right ul li{
    width: 25%;
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin-bottom: 20px;
    cursor: pointer;

}

</style>