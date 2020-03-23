<template>
    <div>
        <div class="wd_markingControl">
            <div class="wd_head ">
                <p class="goBack" @click="goBack">
                    <i class="iconfont iconfanhui1"></i>
                    返回
                </p>
                <span class="title" v-text="infor.paperMarkingName"></span>
                <!-- <span class="subheading">共{{num}}份试卷</span> -->
                <span class="subheading" @click="markingCompletion">阅卷完成</span>
            </div>
            <div class="wd_main">
                <ul class="title clearfix"> 
                    <li class="fl" @click="selectStatisticsType(index)" :class="{active:item.state}" v-for="(item,index) in statisticalInfor" :key="index" v-text="item.name"></li>
                </ul>
                <div class="generalReview" v-show="statisticalInfor.generalReview.state">
                    <div id="chart"></div>
                    <p class="enlarge" @click="enlarge"><i class="iconfont iconfangda2"></i> 放大查看</p>
                    <div class="footer">
                        <h3 class="clearfix">
                            <span class="fl">共{{generalReviewInfor.tableData.length}}个任务</span>  
                            <span class="fr">导出老师</span>
                            <span class="fr" @click="hideShow" v-if="!generalReviewInfor.state1">显示老师</span>
                            <span class="fr" @click="hideShow" v-if="generalReviewInfor.state1">收起老师</span>
                        </h3>
                        <table v-if="generalReviewInfor.tableData">
                            <tr>
                                <td>任务</td>
                                <td>满分(分)</td>
                                <td>均分(分)</td>
                                <td>评卷教师(人)</td>
                                <td>题组长(人)</td>
                                <td>总阅数(份)</td>
                                <td>已阅数(份)</td>
                                <td>进度比例</td>                                
                            </tr>
                            <tbody v-for="(item,index) in generalReviewInfor.tableData" :key="index">
                                <tr>
                                    <td class="lefttd" v-text="item.answerSheetSectionGroupNames"></td>
                                    <td v-text="item.fullMarksScore"></td>
                                    <td>{{item.memberAvgScore!=null?item.memberAvgScore:'-'}}</td>
                                    <td>{{JSON.parse(item.teacherMarkingByArr).length}}</td>
                                    <td>{{JSON.parse(item.teacherLeaderByArr).length}}</td>
                                    <td v-text="item.totalReadOverCount"></td>
                                    <td v-text="item.readOverCount"></td>
                                    <td >{{item.progressRatio}}%</td>
                                </tr>
                                <tr v-show="generalReviewInfor.state1">
                                    <td class="left" colspan="8" >
                                        阅卷人：<span v-for="(item1,index1) in JSON.parse(item.teacherMarkingByArr)" :key="index1">{{item1.teacherName}}</span><br>
                                        题组长：<span v-for="(item1,index1) in JSON.parse(item.teacherLeaderByArr)" :key="index1+'a'">{{item1.teacherName}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="writingWorkshops" v-show="statisticalInfor.writingWorkshops.state">
                    <h3>
                        <button @click="approvalSelection(index)" v-for="(item,index) in writingWorkshopsInfor" :key="index" :class="{active:item.state}">{{item.name}}</button>
                    </h3>
                    <div v-show="writingWorkshopsInfor[0].state">
                        <h4 class="clearfix">
                            <p class="fl">评卷老师批阅总数=有效评卷数</p>
                            <a class="fr">导出表格</a>
                        </h4>
                        <table v-if="writingWorkshopsInfor[0].arr">
                            <tr>
                                <td>任务/教师</td>
                                <td>批阅总数（份）</td>
                                <td>已批阅数（份）</td>
                                <td>未批阅数（份）</td>
                            </tr>
                            <tbody v-for="(item,index) in writingWorkshopsInfor[0].arr" :key="index">
                                <tr>
                                    <td class="lefttd">{{item.subResult[0].answerSheetSectionGroupNames}}</td>
                                    <td>{{item.totalReadOverCount}}</td>
                                    <td>已阅{{item.readOverCount}}份</td>
                                    <td>{{item.unReadOverCount}}</td>
                                </tr>
                                <tr  v-for="(item1,index1) in item.subResult" :key="index1">
                                    <td class="lefttd">{{item1.teacherMarkingByName}}</td>
                                    <td>{{item1.totalReadOverCount}}</td>
                                    <td>{{item1.readOverCount}}</td>
                                    <td>{{item1.unReadOverCount}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-show="writingWorkshopsInfor[1].state">
                        <h4 class="clearfix">
                            <p class="fl">题组长批阅总数=有效评卷数</p>
                            <a class="fr">导出表格</a>
                        </h4>
                        <table v-if="writingWorkshopsInfor[1].arr">
                            <tr>
                                <td>任务/教师</td>
                                <td>批阅总数（份）</td>
                                <td>已批阅数（份）</td>
                                <td>未批阅数（份）</td>
                            </tr>
                            <tbody v-for="(item,index) in writingWorkshopsInfor[1].arr" :key="index">
                                <tr>
                                    <td class="lefttd">{{item.subResult[0].answerSheetSectionGroupNames}}</td>
                                    <td>{{item.totalReadOverCount}}</td>
                                    <td>已处理{{item.readOverCount}}份</td>
                                    <td>{{item.unReadOverCount}}</td>
                                </tr>
                                <tr  v-for="(item1,index1) in JSON.parse(item.teacherLeaderByArr)" :key="index1">
                                    <td class="lefttd">{{item1.teacherName}}</td>
                                    <td>{{item.totalReadOverCount}}</td>
                                    <td>{{item.readOverCount}}</td>
                                    <td>{{item.unReadOverCount}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="teacherGivePoints" v-show="statisticalInfor.teacherGivePoints.state">
                    <h3 class="clearfix">
                        <a class="fr" href="">导出表格</a>
                    </h3>
                    <table v-if="teacherGivePoints">
                        <tr>
                            <td>任务/教师</td>
                            <td>给分均分（分）</td>
                            <td>0分（份）</td>
                            <td>满分（份）</td>
                        </tr>
                        <tbody v-for="(item,index) in teacherGivePoints" :key="index">
                            <tr>
                                <td class="lefttd">{{item.subResult[0].answerSheetSectionGroupNames}}</td>
                                <td>{{item.memberAvgScore!=null?item.memberAvgScore:'-'}}</td>
                                <td class="clickable" @click="toReviewMonitoring">{{item.zeroScoreCount}}</td>
                                <td class="clickable" @click="toReviewMonitoring">{{item.fullMarksCount}}</td>
                            </tr>
                            <tr  v-for="(item1,index1) in item.subResult" :key="index1">
                                <td class="lefttd">{{item1.teacherMarkingByName}}</td>
                                <td>{{item1.memberAvgScore!=null?item1.memberAvgScore:'-'}}</td>
                                <td class="clickable" @click="toReviewMonitoring">{{item1.zeroScoreCount}}</td>
                                <td class="clickable" @click="toReviewMonitoring">{{item1.fullMarksCount}}</td>
                            </tr>
                            <tr   v-for="(item1,index1) in JSON.parse(item.teacherLeaderByArr)" :key="index1+'b'">
                                <td class="lefttd">{{item1.teacherName}} <span>题组长</span></td>
                                <td>{{item.memberAvgScore!=null?item.memberAvgScore:'-'}}</td>
                                <td class="clickable" @click="toReviewMonitoring">{{item.zeroScoreCount}}</td>
                                <td class="clickable" @click="toReviewMonitoring">{{item.fullMarksCount}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="wd_frame" v-show="generalReviewInfor.state">
            <div class="hide"></div>
            <div id="chart1"></div>
            <i class="iconfont iconguanbi1" @click="enlarge"></i>
        </div>
    </div>
</template>

<script>
import HighCharts from 'highcharts';
import { wordRelevant } from "@/api";
export default {
    name:"markingControl",
    data() {
        return {
            infor:{},
            statisticalInfor:{
                generalReview:{
                    name:"总体批阅统计",
                    state:true
                },
                writingWorkshops:{
                    name:"教师批阅统计",
                    state:false
                },
                teacherGivePoints:{
                    name:"教师给分统计",
                    state:false
                }
            },
            num:0,
            generalReviewInfor:{
                 // 弹框状态
                state:false,
                // 老师显示隐藏
                state1:false,
                tableData:[],
            },
            writingWorkshopsInfor:[
                {
                    name:"评卷教师阅卷统计",
                    state:true,
                    arr:[]
                },
                {
                    name:"题组长阅卷统计",
                    state:false,
                    arr:[]
                }
            ],
            teacherGivePoints:[]

        }
    },
    methods:{
        // 导航栏选择
        selectStatisticsType(index){
            for(let i in this.statisticalInfor){
                this.statisticalInfor[i].state = false;
            }
           this.statisticalInfor[index].state = true;
        },
        // 放大显示隐藏、
        enlarge(){
            this.generalReviewInfor.state = !this.generalReviewInfor.state;
        },
        // 显示隐藏老师
        hideShow(){
            this.generalReviewInfor.state1 = !this.generalReviewInfor.state1;
        },
        approvalSelection(index){
            this.writingWorkshopsInfor.forEach((e,i)=>{
                e.state = false;
                if(i == index){
                    e.state = true; 
                }
            })
        },
        // 返回
        goBack(){
            this.$router.back(-1);
        },
        // 去阅卷监控查看页面
        toReviewMonitoring(){
            this.$router.push({path:"/index/readPaper/admin/reviewMonitoring",query:this.infor})
        },
        markingCompletion(){
            wordRelevant.markingCompletion({
                paperMarkingTaskId:this.infor.id
            }).then(res=>{
                console.log(res)
            })
        }
    },
    created(){
        this.infor = this.$route.query;
        wordRelevant.queryOverallReviewProgress({
            paperMarkingTaskId:this.infor.id
        }).then(res=>{
            this.generalReviewInfor.tableData = res.data.data;
            this.generalReviewInfor.tableData.forEach(ele=>{
                if(ele.memberAvgScore != null){
                    ele.memberAvgScore = ele.memberAvgScore.toFixed(2);
                }
                ele.progressRatio =  (ele.readOverCount*100/ele.totalReadOverCount).toFixed(2); 
            })
            this.num = this.generalReviewInfor.tableData[0].totalReadOverCount;
            wordRelevant.teachersScoresStatistics({
                paperMarkingTaskId:this.infor.id
            }).then(res=>{
                res.data.data.forEach((ele,index)=>{
                    ele.totalReadOverCount = 0;
                    ele.readOverCount = 0;
                    ele.unReadOverCount = 0;
                    ele.fullMarksCount = 0;
                    ele.zeroScoreCount = 0;
                    ele.memberAvgScore = this.generalReviewInfor.tableData[index].memberAvgScore;
                    ele.subResult.forEach(ele1=>{
                        ele.totalReadOverCount += ele1.totalReadOverCount;
                        ele.readOverCount += ele1.readOverCount;
                        ele.unReadOverCount += ele1.unReadOverCount;
                        ele.fullMarksCount += ele1.fullMarksCount;
                        ele.zeroScoreCount += ele1.zeroScoreCount;
                        if(ele1.memberAvgScore != null){
                            ele1.memberAvgScore = ele1.memberAvgScore.toFixed(2);
                        }
                    })
                })
                this.writingWorkshopsInfor[0].arr = res.data.data;
                this.writingWorkshopsInfor[1].arr = res.data.data;
                this.teacherGivePoints = res.data.data;
            })
        })
        

    },
    
    watch:{
        'generalReviewInfor':{
            handler:function(newValue,oldValue){
                let  arr = [];
                let  arr1 = [];
                let  arr2 = [];
                newValue.tableData.forEach(ele=>{
                    arr.push(ele.answerSheetSectionGroupNames);
                    arr1.push(ele.readOverCount);
                    arr2.push(ele.totalReadOverCount - ele.readOverCount);
                })
                var chart = {
                    type: 'column'
                };
                var title = {
                    text: '各题批阅进度汇总',
                    align:"center",
                    style:{ "color": "#333333", "fontSize": "16px"," font-weight":700 }  
                };    
                var xAxis = {
                    categories: arr
                };
                var yAxis ={
                    min: 0,
                    title: {
                        text: '试卷数量',
                        style:{"fontSize": "16px"," font-weight":700},

                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color:'gray'
                        }
                    }
                };
                var legend = {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor:'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                };   
                var tooltip = {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            '总批阅数: ' + this.point.stackTotal;
                    }
                };
                var plotOptions = {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                };
                var credits = {
                    enabled: false
                };
                var series= [
                    {
                        name: '未批阅',
                        data: arr2,
                        color:"#F2F2F2",
                        states:{
                            hover:{
                                color: "#F2F2F2"
                            }
                        }
                    
                    },{   
                        color:"#66CC99",
                        name: '已批阅',
                        data: arr1,
                        states:{
                            hover:{
                                color: "#66CC99",
                            }
                        }
                    }
                ];     
                var json = {};   
                json.chart = chart; 
                json.title = title;   
                json.xAxis = xAxis;
                json.yAxis = yAxis;
                json.legend = legend;
                json.tooltip = tooltip;
                json.plotOptions = plotOptions;
                json.credits = credits;
                json.series = series;
                HighCharts.chart("chart",json);       
                HighCharts.chart("chart1",json);
            },
            deep:true,
        }
    },
}
</script>

<style lang="" scoped>
.wd_markingControl{
    width: 100%;
    border-radius: 5px;
    background: #fff;
}
.wd_head{
    width: 100%;
    padding: 20px;
    text-align: center;
    position: relative;
    box-sizing: border-box;
}
.wd_head .goBack{
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
    color: #2d8cf0;
}
.wd_head .title{
    font-size: 16px;
    font-weight: 700;
}
.wd_head .subheading{
    position: absolute;
    right: 20px;
    top: 20px;
    display: block;
    width: 100px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    background: #2d8cf0;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;

}
.wd_main{
    width: 100%;
    box-sizing: border-box;
}
.wd_main .title{
    background: #E4EDFA;
}
.wd_main .title li{
    width: 180px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    box-sizing: border-box;
    border-top: 2px solid #E4EDFA;
    color: #333;
    cursor: pointer;
}
.wd_main .title li.active{
    background: #fff;
    border-top: 2px solid #4884DC;
    color: #4884E1;
}
.wd_main .generalReview{
    position: relative;
}
.wd_main .generalReview .enlarge{
    position: absolute;
    right: 40px;
    top: 3px;
    cursor: pointer;
}
.wd_main .generalReview .enlarge .iconfont{
    font-size: 14px;
    vertical-align: middle;
}
.wd_main .generalReview #chart{
    width: 1200px;
    height: 500px;
    margin-top: 20px;
}
.wd_main .generalReview .footer{
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-top: 1px solid #D7D7D7;
}
.wd_main .generalReview .footer h3{
    box-sizing: border-box;
    width: 100%;
}
.wd_main .generalReview .footer h3 span:nth-child(2),
.wd_main .generalReview .footer h3 span:nth-child(3){
    color: #4884E1;
    margin-left: 15px;
    cursor: pointer;
    font-size: 14px;
}
.wd_main .generalReview .footer table{
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
}
.wd_main .generalReview .footer table>tr:nth-child(1){
    background: #DAE6F8;
}
.wd_main .generalReview .footer td{
    border: 1px solid #ccc;
    text-align: center;
    padding: 5px;
    box-sizing: border-box;
}
.wd_main .generalReview .footer td.left{
    text-align: left;
    margin-left: 20px;
}
.wd_main .generalReview .footer td.left span{
    margin-right: 10px;
}
.wd_main .writingWorkshops{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.wd_main .writingWorkshops h3{
    text-align: center;
}
.wd_main .writingWorkshops h3 button{
    width: 180px;
    height: 40px;
    background: #fff;
    border-radius:5px;
    border: 1px solid #ccc;
    color: #cccccc;
    margin-left: 20px;
    font-size: 14px; 
    line-height: 40px;
    cursor: pointer;
    outline: none;
}
.wd_main .writingWorkshops h4{
    font-size: 14px;
    margin-top: 20px;
}
.wd_main .writingWorkshops h4 a{
    color: #199ED8;
    cursor: pointer;
}
.wd_main .writingWorkshops h3 button.active{
    color: #fff;
    background: #4884DC;
    border: 1px solid #4884DC;
}
.wd_main .writingWorkshops table{
    width: 100%;
    margin-top: 20px;
}
.wd_main .writingWorkshops table tbody tr:nth-child(1){
    background: #F0FAF5;
}
.wd_main .writingWorkshops table>tr:nth-child(1){
    background: #DAE6F8;
}
.wd_main .writingWorkshops td{
    text-align: center;
    padding: 5px;
    border: 1px solid #ccc;
}
.wd_main .teacherGivePoints{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.wd_main .teacherGivePoints h3 a{
    color: #199ED8;
    cursor: pointer;
    font-size: 14px;
}
.wd_main .teacherGivePoints table{
    width: 100%;
    margin-top: 20px;
}
.wd_main .teacherGivePoints table tbody tr:nth-child(1){
    background: #F0FAF5;
}
.wd_main .teacherGivePoints table>tr:nth-child(1){
    background: #DAE6F8;
}
.wd_main .teacherGivePoints td{
    text-align: center;
    padding: 5px;
    border: 1px solid #ccc;
}
.wd_main .teacherGivePoints .clickable{
    cursor: pointer;
}
.wd_main .lefttd{
    text-align: left !important;
}
.wd_main .lefttd span{
    color: #ccc;
}
.wd_frame .hide{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: block;
    left:0;
    top:0;
}
.wd_frame #chart1{
    position: fixed;
    width: 100%;
    height: 70%;
    z-index: 1001;
    left:0;
    top:15%;
    background: #fff;
}
.wd_frame .iconfont{
    position: fixed;
    z-index: 1002;
    right: 20px;
    top:16%;
    cursor: pointer;
}
</style>