<template>
    <div>
        <div class="wd_scanAnswerSheet">
            <div class="wd_header">
                <p>2019学年初一下学期语文期末考试</p>
                <div class="return1" @click="goBack">
                    <i class="iconfont iconfanhui1"></i>
                    返回 
                </div>
            </div>
            <div class="wd_main">
                <h3 class="clearfix">
                    <a  class="fl dakai" :href="'aClient://'+infor.answerSheetId + '~' +infor.id">上传答题卡</a>
                    <span class="fl"><i class="iconfont icontishi"></i>上传完成后，如【上传总数】与【上传成功数】上时间不一致，请导出表格查看或联系管理员。</span>
                    <a class="fr dakai" @click="uploadCompleted">上传完成</a>
                    <a class="fr dakai dakai1" @click="uploadCompleted1">清空答卷</a>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>班级</th>
                            <th>参考人数（人）</th>
                            <th>上传总数（份）</th>
                            <th>上传成功数（份）</th>
                            <th>
                                <select name="" id="" v-model="blankAnswerCount" @change="send">
                                    <option value="3">≥3</option>
                                    <option value="2">≥2</option>
                                    <option value="1">≥1</option>
                                </select>
                                题无选项答卷数（份） <i class="g_star">*</i>
                            </th>
                            <th>未上传学生数（份）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in classInfor" :key="index">
                            <td>{{item.className}}{{index==0?'':'班'}}</td>
                            <td v-text="item.memberCount"></td>
                            <td v-text="item.uploadTotalCount"></td>
                            <td v-text="item.uploadSuccessTotalCount">-</td>
                            <td v-text="item.blankAnswerObjQuzTotalCount">-</td>
                            <td v-text="item.notUploadedTotalCount">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { wordRelevant } from "@/api";
export default {
    name:"scanAnswerSheet",
    data() {
        return {
            infor:null,
            classInfor:[],
            blankAnswerCount:3
        }
    },
    methods:{
        goBack(){
            this.$router.back(-1);
        },
        send(){
            wordRelevant.scanAnswersheet({
                paperMarkingTaskId:this.infor.id,
                blankAnswerCount:this.blankAnswerCount
            }).then(res=>{
                this.classInfor = res.data.data;
            })
        },
        // 上传完成
        uploadCompleted(){
            wordRelevant.scanAnswerSheetCompleted({
                paperMarkingTaskId:this.infor.id
            }).then(res=>{
                console.log(res)
            })
        },
        uploadCompleted1(){
            wordRelevant.clearStudentUploadAnswerCard({
                paperMarkingTaskId:this.infor
            }).then(res=>{
                console.log(res)
            })
        }
    },
    created(){
        this.infor = this.$route.query;
        wordRelevant.scanAnswersheet({
            paperMarkingTaskId:this.infor.id,
            blankAnswerCount:this.blankAnswerCount
        }).then(res=>{
            this.classInfor = res.data.data;
        })
    }
}
</script>

<style lang="" scoped>
.wd_scanAnswerSheet{
    width: 100%;
}
.wd_scanAnswerSheet .wd_header{
    position: relative;
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
}
.wd_scanAnswerSheet .wd_header p{
    font-size: 16px;
    font-weight: 700;
    line-height: 50px;
}
.wd_scanAnswerSheet .wd_header .return1{
    position: absolute;
    top: 15px;
    left:25px;
    cursor: pointer;
    color: #2d8cf0;
}
.wd_scanAnswerSheet .wd_main{
    width: 100%;
    border-radius: 5px;
    background: #fff;
    margin-top: 10px;
}
.wd_scanAnswerSheet .wd_main h3{
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 40px;
}
.wd_scanAnswerSheet .wd_main h3 .dakai{
    display: block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #2d8cf0;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    
}
.wd_scanAnswerSheet .wd_main h3 .dakai1{
    margin-right: 20px;
}
.wd_scanAnswerSheet .wd_main h3 span{
    margin-left: 20px;
}
.wd_scanAnswerSheet .wd_main h3 span .iconfont{
    color: #f3d131;
}
.wd_scanAnswerSheet .wd_main h3 .abiaodian{
    color: #2d8cf0;
    cursor: pointer;
}
.wd_scanAnswerSheet .wd_main table{
    width: 100%;
}
.wd_scanAnswerSheet .wd_main table thead{
    background: #eef1f6;

}
.wd_scanAnswerSheet .wd_main table th{
    border: 1px solid #ccc;
    text-align: center;
    padding:10px;
}
.wd_scanAnswerSheet .wd_main table td{
    border: 1px solid #ccc;
    text-align: left;
    padding:10px;
}
.wd_scanAnswerSheet .wd_main table span{
    color: #2d8cf0;
    cursor: pointer;
}
.wd_scanAnswerSheet .wd_main table select{
    background: #eef1f6;
    border:none;
    outline: none;
    color: red;
    cursor: pointer;
}
</style>