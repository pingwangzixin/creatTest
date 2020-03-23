<template>
    <div>
        <div class="wd_reviewMonitoring">
            <div class="wd_head">
                <h3>
                    <span class="goBack" @click="goBack">
                        <i class="iconfont iconfanhui1"></i>
                        返回
                    </span>
                    <span class="title"  v-text="infor.paperMarkingName"></span>
                </h3>
                <div>
                    <span>任务筛选：</span>
                    <select name="" id="">
                        <option value="">全部</option>
                    </select>
                    <span>教师筛选：</span>
                    <select name="" id="">
                        <option value="">全部</option>
                    </select>
                    <span>试卷属性：</span>
                    <select name="" id="">
                        <option value="">全部</option>
                    </select>
                    <button >确认筛选</button>
                </div>
            </div>
            <div class="wd_main clearfix">
                 <div class="wd_left fl">
                     <h3>共452份试卷</h3>
                     <p>
                        <i @click="chooseTestpaper('减')" class="iconfont iconxiangzuoyuanjiantouzuojiantouxiangzuomianxing" :class="{btnDisabled:leftInfor.num ==1 }"></i>
                        <span v-text="leftInfor.num"></span>/452
                        <i @click="chooseTestpaper('加')" class="iconfont iconright" :class="{btnDisabled:leftInfor.num == 452}"></i>
                        <input type="text" name="" id="" v-model="leftInfor.destination" @input="verification">
                        <button @click="jumpTo">跳转</button>
                     </p>
                     <ul class="list">
                         <li @click="chooseTestpaper(null,index)" v-for="(item,index) in 452" :key="index" :class="{active:index == leftInfor.num-1}">{{item}}</li>
                     </ul>
                 </div>
                 <div class="wd_right fl">
                     <h3>得分：6</h3>
                     <table>
                         <tr>
                             <td>教师</td>
                             <td>得分</td>
                             <td>题目</td>
                         </tr>
                         <tr>
                             <td>1</td>
                             <td>1</td>
                             <td>1</td>
                         </tr>
                     </table>
                     <img src="http://img3.51youpu.com/data/image/split/1073907775_15101_858942.jpg" alt="">
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"reviewMonitoring",
    data() {
        return {
            infor:{},
            // 左侧信息
            leftInfor:{
                // 左侧列表
                paperList:[],
                // 跳转绑定字段
                destination:"",
                // 当前第几个
                num:1
            }
        }
    },
    methods:{
        // 返回
        goBack(){
            this.$router.back(-1);
        },
        // 跳转
        jumpTo(){
            this.leftInfor.num = Number(this.leftInfor.destination);
            let ul = document.getElementsByClassName("list")[0];
            let lis = ul.getElementsByTagName("li");
            ul.scrollTop = lis[this.leftInfor.num-1].offsetTop - ul.offsetTop;
        },
        // 验证正整数
        verification(){
            let pattern = /[1-9]\d*/;
            if(!pattern.test(this.leftInfor.destination)){
                this.leftInfor.destination = "";
            }else  if(this.leftInfor.destination > 452){
                this.leftInfor.destination = "";
            }
        },
        // 选择第几
        chooseTestpaper(type,index){
            if(type == "加"){
                this.leftInfor.num += 1;
                let ul = document.getElementsByClassName("list")[0];
                let lis = ul.getElementsByTagName("li");
                ul.scrollTop = lis[this.leftInfor.num-1].offsetTop - ul.offsetTop;
            }else if(type == "减"){
                this.leftInfor.num -= 1;
                let ul = document.getElementsByClassName("list")[0];
                let lis = ul.getElementsByTagName("li");
                ul.scrollTop = lis[this.leftInfor.num-1].offsetTop - ul.offsetTop;
            }else{
                this.leftInfor.num= index+1;
            }
        }
    },
    created(){
        this.infor = this.$route.query;
    },
    
}
</script>

<style lang="" scoped>
.wd_reviewMonitoring{
    width: 100%;
}
.wd_reviewMonitoring .wd_head{
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    padding: 20px;
}
.wd_reviewMonitoring .wd_head h3{
    position: relative;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
}
.wd_reviewMonitoring .wd_head h3 .goBack{
    position: absolute;
    left: 0;
    top: 0;
    color: #4884DC;
    font-size: 14px;
    cursor: pointer;
}
.wd_reviewMonitoring .wd_head h3 .title{
    font-size: 16px;
    font-weight: 700;
    color: #333;
}
.wd_reviewMonitoring .wd_head div{
    padding-top: 20px;
}
.wd_reviewMonitoring .wd_head div select{
    width: 200px;
    height: 30px;
    border-radius: 5px;
    margin-right: 30px;
    vertical-align: middle;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
}
.wd_reviewMonitoring .wd_head div button{
    width: 140px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: #4884DC;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-left: 70px;
    cursor: pointer;
}
.wd_reviewMonitoring .wd_main{
    width: 100%;
    margin-top: 20px;
}
.wd_reviewMonitoring .wd_main .wd_left{
    padding-top: 20px;
    width: 340px;
    border-radius: 5px;
    background: #fff;
}
.wd_reviewMonitoring .wd_main .wd_left h3{
    padding:  0  20px;
    color: #999;
    font-size: 14px;
}
.wd_reviewMonitoring .wd_main .wd_left p{
    margin-top: 10px;
    padding: 0 20px 20px;
}
.wd_reviewMonitoring .wd_main .wd_left p .iconxiangzuoyuanjiantouzuojiantouxiangzuomianxing{
    font-size: 20px;
    color: #4884DC;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
}
.wd_reviewMonitoring .wd_main .wd_left p .iconright{
    font-size: 20px;
    color: #4884DC;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 5px;
}
.wd_reviewMonitoring .wd_main .wd_left p .btnDisabled{
    pointer-events:none;
    color: #A4C2EE;
}
.wd_reviewMonitoring .wd_main .wd_left p span{
    color: 4884DC;
}
.wd_reviewMonitoring .wd_main .wd_left input{
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-left: 10px;
}
.wd_reviewMonitoring .wd_main .wd_left button{
    width: 60px;
    height: 30;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background: #4884DC;
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    outline: none;
}
.wd_reviewMonitoring .wd_main .wd_left .list{
    max-height: 600px;
    overflow: auto;
    width: 100%;
}
.wd_reviewMonitoring .wd_main .wd_left .list li{
    height: 30px;
    text-align: left;
    line-height: 30px;
    color: #333;
    box-sizing: border-box;
    padding-left: 20px;
    cursor: pointer;

}
.wd_reviewMonitoring .wd_main .wd_left .list li.active{
    color: #fff;
    background: #4884DC;
}
.wd_reviewMonitoring .wd_right{
    width: 860px;
    box-sizing: border-box;
    padding:10px 20px;
}
.wd_reviewMonitoring .wd_right h3{
    font-size: 14px;
    font-weight: 700;
    color: red;
}
.wd_reviewMonitoring .wd_right table{
    width: 500px;
    margin-top: 20px;
}
.wd_reviewMonitoring .wd_right table tr{
    background: #fff;
}
.wd_reviewMonitoring .wd_right table tr:nth-child(1){
    background: #D9E2EF;
}
.wd_reviewMonitoring .wd_right table td{
    border: 1px solid #ccc;
    text-align: center;
    padding: 5px;
}
.wd_reviewMonitoring .wd_right img{
    width: 100%;
    margin-top: 20px;
}
</style>