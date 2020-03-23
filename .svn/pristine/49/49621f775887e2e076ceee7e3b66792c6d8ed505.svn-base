<template>
    <div>
        <div class="wd_examination ">
            <div class="wd_header">
                <p>2019学年初一下学期语文期末考试<span>共452个考生</span></p>
                <div class="return1" @click="send1">
                    <i class="iconfont iconfanhui1"></i>
                    返回
                </div>
            </div>
            <div class="wd_main">
                <p class="title">
                    <ul class="clearfix">
                        <li class="fl" :class="{active:index==0}" @click="send(0)">随机分配</li>
                        <li class="fl" :class="{active:index==1}" @click="send(1)">导入考场</li>
                    </ul>
                </p>
                <div class="randomAllocation" v-if="index==0">
                    <div>所有考生按照考场顺序随机分配，考生数量为空的考场保存后系统将自动清除。</div>
                    <p>已分配452个考生，未分配0个</p>
                    <div>
                        <ul class="clearfix">
                            <li class="fl"> 
                                <h3>单个考场人数</h3>
                                <input type="text">
                            </li>
                            <li class="fl">
                                <h3>考场数量</h3>
                                <p class="numberExamination clearfix">
                                    <button class="fl">-</button>
                                    <input type="text" class="fl">
                                    <button class="fr">+</button>
                                </p>
                            </li>
                            <li class="fl" >
                                <h3>总人数</h3>
                                <p class="numberExamination">455</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="importExamination" v-if="index==1">
                    <button>浏览文件</button>
                    <button>样表下载</button>
                    <span>（空白表，只包含格式，用于导入新数据）</span>
                </div>
            </div>
            <div class="wd_footer">
                <button class="active" disabled>保存设置</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"examinationSettings",
    data() {
        return {
            index:0
        }
    },
    methods:{
        send(index){
            this.index =index;
        },
        send1(){
            this.$router.push({path:"/index/readPaper/admin/readList"})
        },
    }
}
</script>
<style lang="" scoped>
    .wd_examination{
        width: 100%;
        border-radius:5px;
        background: #fff; 
    }  
    .wd_examination .wd_header{
        position: relative;
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
    .wd_examination .wd_header p{
        font-size: 16px;
        font-weight: 700;
        line-height: 50px;
    }
    .wd_examination .wd_header span{
        font-size: 14px;
        margin-left: 15px;
        font-weight: 400;
        color: #999;
    }
    .wd_examination .wd_header .return1{
        position: absolute;
        top: 15px;
        left:25px;
        color: #ccc;
        cursor: pointer;
        color: #2d8cf0;
    }
    .wd_examination .wd_main .title li{
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #666;
        cursor: pointer;
    }
    .wd_examination .wd_main .title li.active{
        font-weight: 700;
        color: #2d8cf0;
        border-bottom: 3px solid #2d8cf0;
    }
    .wd_examination .wd_main .randomAllocation{
        width: 100%;
        box-sizing: border-box;
        padding:0 2% 20px;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(1){
        width: 100%;
        margin:10px auto;
        height: 40px;
        line-height: 40px;
        text-align: left;
        box-sizing: border-box;
        padding-left: 20px;
        border: 1px solid #2ECC71;
        font-size: 14px;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(3) li{
        width: 150px;
        margin-top: 15px;
        margin-right: 25px;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(3) li h3{
        font-size: 14px;
        font-weight: 700;
        text-align: center;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(3) li>input[type="text"]{
        width: 100%;
        height: 30px;
        margin-top: 10px; 
        text-align: center;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(3) li .numberExamination{
        width: 100%;
        height: 30px;
        margin-top: 10px;
        text-align: center;
        line-height: 30px;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(3) li .numberExamination button{
        width: 30px;
        height: 30px;
    }
    .wd_examination .wd_main .randomAllocation div:nth-child(3) li .numberExamination input{
        width: 88px;
        height: 26px;
        text-align: center;
        margin-left: -1px;
        margin-right: -1px;
    }
    .wd_examination .importExamination{
        width: 100%;
        height: 120px;
        text-align: center;
        line-height: 120px;
    }
    .wd_examination .importExamination button{
        width: 130px;
        height:40px;
        text-align: center;
        line-height: 40px;
        border: none;
        background: #2d8cf0;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        outline: none;
    }
    .wd_examination .importExamination button:nth-child(2){
        border:1px solid #ccc;
        color: #2d8cf0;
        background: #fff;
        margin-left: 10px;
    }




    .wd_examination .wd_footer{
        width: 100%;
        position: relative;
    }
    .wd_examination .wd_footer button{
        width: 300px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: 20px;
        transform: translate(-50%);
        border-radius: 5px;
    }
    .wd_examination .wd_footer button.active{
        border: none;
        background:#3498DB;
        color:#fff;
        font-size: 14px;
   }
</style>