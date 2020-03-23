<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="(item,index) in infor.title"  :key="index">{{item}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in infor.arr" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.paperMarkingName}}</td>
                    <td>{{item.subjectName}}</td>
                    <td>{{item.answerSheetSectionGroupNames}}</td>
                    <td>{{item.answerSheetSectionGroupScore}}</td>
                    <td>{{item.totalReadOver}}</td>
                    <td>{{item.readOver}}</td>
                    <td>{{item.unReadOver}}</td>
                    <td>
                        <span @click="checkAnswer">查看题目和答案</span>
                        <span @click="startMarking(item)">开始阅卷</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="wd_page" v-if="infor.pageInfo" >
            <div class="wd_pageBn">
                <i
                    class="iconfont iconxiangzuo wd_left1"
                    :class="infor.pageInfo.prePage=='disabled'?'disabledBn':''"
                    @click="pageChange(infor.pageInfo.prePage)"
                ></i>
                <span
                    
                    v-for="(item,index) in infor.pageInfo.middlePageInfoLists"
                    :key="index"
                    class="pageNum"
                    :class="item.state=='active'?'activePageBn':''"
                    @click="pageChange(item)"
                >{{item.text}}</span>
                <i
                    class="iconfont iconicon03 wd_right1"
                    :class="infor.pageInfo.nextPage=='disabled'?'disabledBn':''"
                    @click="pageChange(infor.pageInfo.nextPage)"
                ></i>
            </div> 
        </div>
    </div>
</template>

<script>
import { wordRelevant } from "@/api";
export default {
    name:"settingList",
    data() {
        return {
            infor:{
                title:["序号","考试名称","学科","题号","满分值","总批阅数","已批阅数","待批阅数","操作"],
                arr:[]
            }
        }
    },
    methods:{
        // 查看答案与解析
        checkAnswer(){
            let routeUrl = this.$router.resolve({
                path: "/index/readPaper/setting/testAnalysis",//新页面地址
            });
            window.open(routeUrl.href, "/path");
        },
        // 开始阅卷
        startMarking(item){
            this.$router.push({path:"/index/readPaper/setting/startMarking",query:{paperMarkingTaskId:item.paperMarkingTaskId,teacherMarkingBy:"0f6c9d4dd13a4da9bcf7635054a9fde1",answerSheetSectionGroupQuzIds:item.answerSheetSectionGroupQuzIds}});
        },
        pageChange(item){
            wordRelevant.queryMarkingTaskList({
                teacherMarkingBy:"0f6c9d4dd13a4da9bcf7635054a9fde1",
                pageSize:item.pageSize,
                pageNo:item.pageNo
            }).then(res=>{
                this.infor.arr = res.data.data.list;
                this.infor.pageInfo = res.data.data.pageInfo;
            })
        }
    },
    created(){
        wordRelevant.queryMarkingTaskList({
            teacherMarkingBy:"0f6c9d4dd13a4da9bcf7635054a9fde1",
            pageSize:10,
            pageNo:1
        }).then(res=>{
            this.infor.arr = res.data.data.list;
            this.infor.pageInfo = res.data.data.pageInfo;
            console.log(res)
        })
    }
}
</script>
<style lang="" scoped>
table{
    width: 100%;
}
th{
    border: 1px solid #fff;
    text-align: center;
    padding: 10px 10px;
    color: #fff;
}
td{
    border: 1px solid #666;
    text-align: center;
    padding: 10px 10px;
    color: #666;
}
thead{
    background: #155ABB;
}
tbody{
    background: #fff;
}
tbody span{
    margin-left: 10px;
    color: #155ABB;
    cursor: pointer;
}

.wd_page {
    margin-top: 25px;
    width: 100%;
    position: relative;
}
.wd_page .wd_pageBn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
}
.wd_page .wd_pageInfo {
  float: right;
  margin-right: 31px;
}
.wd_page .wd_left1,
.wd_page .wd_right1 {
  color: #65a0e5;
  cursor: pointer;
}

.wd_page .pageNum {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  margin: 0 8px 0 8px;
}
.wd_page .activePageBn {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}

.wd_page .disabledBn {
  cursor: not-allowed;
}
</style>