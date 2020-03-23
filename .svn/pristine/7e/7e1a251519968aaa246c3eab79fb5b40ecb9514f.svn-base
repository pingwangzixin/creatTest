<template>
    <div>
        <div class="wd_header clearfix">
            <img src="../../../assets/image/wrong.png" alt="" style="display:none;" id="dui">
            <img src="../../../assets/image/right.png" alt="" style="display:none;" id="cuo">
            <img src="../../../assets/image/check/cuo_black.png" alt="" style="display:none;" id="cuo1">
            <img src="../../../assets/image/check/you_black.png" alt="" style="display:none;" id="dui1">
            <img src="../../../assets/image/check/aaa.png" alt="" style="display:none;" id="dui2">
            <p class="fl">
                批阅进度<span>{{infor.num-0+1}}</span>/{{arr.length}}
            </p>
            <p class="fl">
                当前为第<span>{{infor.num-0+1}}</span>号学生
            </p>
            <p class="fr right">
                <button @click="checkAnswer">查看题目和答案</button>
                <button @click="return1">返回</button>
            </p>
            <p class="fr main" >
                <button @click="jump">跳转</button>
                <button @click="send">下一位未批阅学生</button>
            </p>
            <p class="fr">
                跳转到
                <input type="number" v-model="infor.num1">
                号
            </p>
        </div>
        <div class="wd_main clearfix ">
            <!-- <div v-if="bol" class="clearfix fl">
                <div class="left fl" >
                    <img  alt="此处为上传的作业答案图片" ng-src="http://img3.51youpu.com/data/image/split/1073907775_15101_858942.jpg" src="http://img3.51youpu.com/data/image/split/1073907775_15101_858942.jpg">
                </div>
                <div class="right fl" >
                    <div>
                        <div class="title clearfix">
                            <p class="fl"><span class="tu"></span> 本题第26题<span class="man">满分4分</span></p>
                        </div>
                        <div class="fen">
                            <ul >
                                <li @click="send1(0)" :class="{active:(arr[infor.num].score === 0 && arr[infor.num].score !== '')}" >0</li>
                                <li @click="send1(item)" v-for="(item,index) in infor.score" :key="index" :class="{active:arr[infor.num].score == item}">{{item}}</li>
                            </ul>
                            <p>
                                <i class="iconfont iconbianji"></i>
                                <input type="number" v-model="infor.score1">
                                <span>分</span>
                            </p>
                            <button :class="{disable_button:infor.score1 === ''}" @click="confirm">确定</button>
                            <p>
                                <label>
                                    <input type="checkbox" name="" id="" v-model="infor.bol">
                                    <span>自动跳转到下一位</span>
                                </label>
                            </p>
                        </div>
                        <div class="control clearfix">
                            <p class="fl" @click="choice('减')">
                                <i class="iconfont iconshangyige"></i><br>
                                <span>上一位</span>
                            </p>
                            <p class="fr" @click="choice('加')">
                                <i class="iconfont iconxiayige"></i><br>
                                <span>下一位</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div> -->
            <p class="clolorRegion clearfix">
                <span class="fl" @click="selectColor(item)" :style="'background:'+item+';'" v-for="(item,index) in colors" :key="index"></span>
                           
            </p>
            <div class="quan fl clearfix" v-if="!bol">
                <div class="fl">
                    <div style="width:50px;float:left;">
                        <ul id="toolsul" class="tools">
                            <li id="toolsPencil" data-type="pen" class="active">
                                <i class="icon-tools icon-pen-select" data-default='icon-tools icon-pen-black'></i>
                            </li>
                            <li data-type="text">
                                <i class="icon-tools icon-text-black" data-default='icon-tools icon-text-black'></i>
                            </li>
                            <li data-type="arrow">
                                <i class="icon-wrong-black" data-default="icon-wrong-black"></i>
                            </li>
                            <li data-type="line">
                                <i class="icon-right-black" data-default="icon-right-black"></i>
                            </li>
                            <li data-type="line1">
                                <i class="icon-right1-black" data-default="icon-right1-black"></i>
                            </li>
                            <li data-type="smallwrong">
                                <i class="icon-wrong-small-black" data-default="icon-wrong-small-black"></i>
                            </li>
                            <li data-type="smallright">
                                <i class="icon-right-small-black" data-default="icon-right-small-black"></i>
                            </li>
                            
                            <li data-type="square">
                                <i class="icon-tools icon-square-black" data-default="icon-tools icon-square-black"></i>
                            </li>
                            <li data-type="remove">
                                <i class="icon-tools icon-remove-black" data-default='icon-tools icon-remove-black'></i>
                            </li>
                        </ul>
                        
                    </div>
                    <div id="canvasDiv" class="canvasDiv" style="width:95%;">
                        <canvas  ref="aaa" id="c" :width="width" :height="height">请使用支持HTML5的浏览器</canvas>
                    </div>
                    <!-- <img  alt="此处为上传的作业答案图片" ng-src="http://img3.51youpu.com/data/image/split/1073907775_15101_858942.jpg" src="http://img3.51youpu.com/data/image/split/1073907775_15101_858942.jpg"> -->
                </div>
                <i class="iconfont iconjia " v-if="bol1" @click="conceal"></i>
                <div class="frame" v-if="!bol1 &&  arr.length>0" > 
                    <div class="title clearfix">
                        
                        <p class="fl"><span class="tu"></span> 本题{{arr[infor.num].answerSheetSectionGroupNames}}<span class="man">满分{{arr[infor.num].answerSheetSectionGroupScore}}分</span></p>
                        <i class="iconfont iconjianshao "  @click="conceal"></i>
                    </div>
                    <div class="fen">
                        <ul >
                            <li @click="send1(0)" :class="{active:(arr[infor.num].teacherMarkingScore === 0 && arr[infor.num].teacherMarkingScore !== '')}" >0</li>
                            <li @click="send1(item)" v-for="(item,index) in arr[infor.num].answerSheetSectionGroupScore" :key="index" :class="{active:arr[infor.num].teacherMarkingScore == item}">{{item}}</li>
                        </ul>
                        <p>
                            <i class="iconfont iconbianji"></i>
                            <input type="number" v-model="infor.score1">
                            <span>分</span>
                        </p>
                        <button :class="{disable_button:infor.score1 === ''}" @click="confirm">确定</button>
                        <p>
                            <label>
                                <input type="checkbox" name="" id="" v-model="infor.bol">
                                <span>自动跳转到下一位</span>
                            </label>
                        </p>
                    </div>
                    <div class="control clearfix">
                        <p class="fl" @click="choice('减')">
                            <i class="iconfont iconshangyige"></i><br>
                            <span>上一位</span>
                        </p>
                        <p class="fr" @click="choice('加')">
                            <i class="iconfont iconxiayige"></i><br>
                            <span>下一位</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { wordRelevant } from "@/api";
export default {
    name:"startMarking",
    data() {
        return {
            width:1100,
            height:1900,
            target:null,
            arr:[],
            infor:{
                // 是否自动跳转
                bol:true,
                num:0,
                score1:"",
                num1:""
            },
            colors:["#f00","#f0f","#ff0","#0f0","#0ff","#00f",],
            bol:false,
            bol1:false,
            canvas:"",
            // canvas保存的
            mouseFrom:{x:"",y:""},
            mouseTo:{x:"",y:""},
            drawType:null,
            textbox:null,
            drawWidth:2, //笔触宽度
            color:"#f00" //画笔颜色
        // var drawingObject = null; //当前绘制对象
        // var moveCount = 1; //绘制移动计数器
        // var doDrawing = false; // 绘制状态
        }
    },
    methods:{
        // 上一位，下一位
        choice(e){
            this.canvas.clear();
            if(e == "加"){
                if(this.infor.num>=this.arr.length-1){
                    this.infor.num =this.arr.length-1;
                }else{
                    this.infor.num += 1;
                }
            }else{
                if(this.infor.num<=0){
                    this.infor.num =0;
                }else{
                    this.infor.num -= 1;
                }
            }
            wordRelevant.queryMarkingTaskDetailed(this.$route.query).then(res=>{
                this.arr = res.data.data;
                let _this = this;
                fabric.Image.fromURL(this.arr[this.infor.num].memberGroupUploadPath+"?"+new Date().getTime(), (img) => {
                    _this.canvas.setWidth(img.width);
                    _this.canvas.setHeight(img.height);
                    _this.canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                    _this.canvas.renderAll();
                });
                this.infor.score1 = this.arr[this.infor.num].teacherMarkingScore;
            })
        },
        // 跳转到几号
        jump(){
            if(this.infor.num1 > this.arr.length){
                this.infor.num1 = this.arr.length;
            }else if(this.infor.num1<1){
                this.infor.num1  =1;
            }
            this.infor.num = this.infor.num1-1;
            wordRelevant.queryMarkingTaskDetailed(this.$route.query).then(res=>{
                this.arr = res.data.data;
                let _this = this;
                fabric.Image.fromURL(this.arr[this.infor.num].memberGroupUploadPath+"?"+new Date().getTime(), (img) => {
                    _this.canvas.setWidth(img.width);
                    _this.canvas.setHeight(img.height);
                    _this.canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                    _this.canvas.renderAll();
                });
                this.infor.score1 = this.arr[this.infor.num].teacherMarkingScore;
            })
        },
        // 跳转到下一个未批阅学生
        send(){
            this.arr.some((e,index)=>{
                if(index>this.infor.num){
                    if(e.teacherMarkingScore == null){
                        this.infor.num = index;
                        return true;
                    }
                }
            })
            wordRelevant.queryMarkingTaskDetailed(this.$route.query).then(res=>{
                this.arr = res.data.data;
                let _this = this;
                fabric.Image.fromURL(this.arr[this.infor.num].memberGroupUploadPath+"?"+new Date().getTime(), (img) => {
                    _this.canvas.setWidth(img.width);
                    _this.canvas.setHeight(img.height);
                    _this.canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                    _this.canvas.renderAll();
                });
                this.infor.score1 = this.arr[this.infor.num].teacherMarkingScore;
            })
        },
        // 学则分数
        send1(num){
            this.arr[this.infor.num].teacherMarkingScore = num;
            this.infor.score1 = this.arr[this.infor.num].teacherMarkingScore;
            if(this.infor.bol){
                let formData = new window.FormData();
	            formData.append('teacherMarkingScore', this.arr[this.infor.num].teacherMarkingScore);
	            formData.append('id', this.arr[this.infor.num].id);
                if(this.canvas.getObjects().length>0){
	                formData.append('fileBase64Content', this.canvas.toDataURL().substring(22));
                }else{
                    formData.append('fileBase64Content', "");
                }
                wordRelevant.teacherExaminationQuestions(formData).then(res=>{
                    this.choice("加");
                })
            }
        },
        // 确认
        confirm(){
            this.arr[this.infor.num].teacherMarkingScore = this.infor.score1;
            let formData = new window.FormData();
            formData.append('teacherMarkingScore', this.arr[this.infor.num].teacherMarkingScore);
            formData.append('id', this.arr[this.infor.num].id);
            if(this.canvas.getObjects().length>0){
                formData.append('fileBase64Content', this.canvas.toDataURL().substring(22));
            }else{
                formData.append('fileBase64Content', "");
            }
            wordRelevant.teacherExaminationQuestions(formData).then(res=>{
                this.choice("加");
            })
        },
        // 查看答案与解析
        checkAnswer(){
            let routeUrl = this.$router.resolve({
                path: "/index/readPaper/setting/testAnalysis",//新页面地址
            });
            window.open(routeUrl.href, "/path");
        },
        // 返回
        return1(){
            this.$router.push({path:"/index/readPaper/setting/settingList"})
        },
        // 弹框显示与隐藏
        conceal(){
            this.bol1 = !this.bol1;
        },
        // 选择颜色
        selectColor(item){
            this.color = item;
            this.canvas.freeDrawingBrush.color = this.color;
        },
        // 选择宽度
        drawWidth1(){
            this.canvas.freeDrawingBrush.width = this.drawWidth;
            console.log(this.canvas.freeDrawingBrush.width)
        }
    },
    created(){
        wordRelevant.queryMarkingTaskDetailed(this.$route.query).then(res=>{
            this.arr = res.data.data;
            let _this = this;
            fabric.Image.fromURL(this.arr[this.infor.num].memberGroupUploadPath+"?"+new Date().getTime(), (img) => {
                _this.canvas.setWidth(img.width);
                _this.canvas.setHeight(img.height);
                _this.canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                _this.canvas.renderAll();
            });
            this.infor.score1 = this.arr[this.infor.num].teacherMarkingScore;
        })

    },
    mounted(){
         
        let _this = this;
         //变量声明
        var drawingObject = null; //当前绘制对象
        var moveCount = 1; //绘制移动计数器
        var doDrawing = false; // 绘制状态

        //初始化画板
        this.canvas = new fabric.Canvas("c", {
            isDrawingMode: false,
            skipTargetFind: true,
            selectable: false,
            selection: false
        });

        
        
        window.canvas = _this.canvas;
        window.zoom = window.zoom ? window.zoom : 1;

        _this.canvas.freeDrawingBrush.color = _this.colors[0]; //设置自由绘颜色
        _this.canvas.freeDrawingBrush.width = _this.drawWidth;

        //绑定画板事件
        _this.canvas.on("mouse:down", function (options) {
            var xy = transformMouse(options.e.offsetX, options.e.offsetY);
            _this.mouseFrom.x = xy.x;
            _this.mouseFrom.y = xy.y;
            doDrawing = true;
            drawing();
        });
        _this.canvas.on("mouse:up", function (options) {
            var xy = transformMouse(options.e.offsetX, options.e.offsetY);
            _this.mouseTo.x = xy.x;
            _this.mouseTo.y = xy.y;
            drawingObject = null;
            moveCount = 1;
            doDrawing = false;
        });
        _this.canvas.on("mouse:move", function (options) {
            if (moveCount % 2 && !doDrawing) {
                //减少绘制频率
                return;
            }
            moveCount++;
            var xy = transformMouse(options.e.offsetX, options.e.offsetY);
            _this.mouseTo.x = xy.x;
            _this.mouseTo.y = xy.y;
            
        });

        _this.canvas.on("selection:created", function (e) {
            _this.target = e.target;
            console.log(_this.target)

            // if (e.target._objects) {
            //     //多选删除
            //     var etCount = e.target._objects.length;
            //     for (var etindex = 0; etindex < etCount; etindex++) {
            //         _this.canvas.remove(e.target._objects[etindex]);
            //     }
            // } else {
            // //单选删除
            // _this.canvas.remove(e.target);
            // }
            // _this.canvas.discardActiveObject(); //清楚选中框
        });
         //坐标转换
        function transformMouse(mouseX, mouseY) {
            return { x: mouseX / window.zoom, y: mouseY / window.zoom };
        }
        //绑定工具事件
        jQuery("#toolsul")
            .find("li")
            .on("click", function () {
                //设置样式
                _this.drawType = jQuery(this).attr("data-type");
                if(_this.drawType == "remove"){
                    if (_this.target._objects) {
                        //多选删除
                        var etCount = _this.target._objects.length;
                        for (var etindex = 0; etindex < etCount; etindex++) {
                            _this.canvas.remove(_this.target._objects[etindex]);
                        }
                    } else {
                    //单选删除
                    _this.canvas.remove(_this.target);
                    }
                }else{
                    _this.target = null;
                    jQuery("#toolsul")
                        .find("li>i")
                        .each(function () {
                            jQuery(this).attr("class", jQuery(this).attr("data-default"));
                        });
                    jQuery(this)
                        .addClass("active")
                        .siblings()
                        .removeClass("active");
                    jQuery(this)
                        .find("i")
                        .attr(
                        "class",
                        jQuery(this)
                            .find("i")
                            .attr("class")
                            .replace("black", "select")
                        );
                    
                    _this.canvas.isDrawingMode = false;
                    if (_this.textbox) {
                        //退出文本编辑状态
                        _this.textbox.exitEditing();
                        _this.textbox = null;
                    }
                    if (_this.drawType == "pen") {
                        _this.canvas.isDrawingMode = true;
                    } else if (_this.drawType == "square") {
                        _this.canvas.selection = true;
                        _this.canvas.skipTargetFind = false;
                        _this.canvas.selectable = true;
                    } else {
                        _this.canvas.skipTargetFind = true; //画板元素不能被选中
                        _this.canvas.selection = false; //画板不显示选中
                    }
                }
                
            });
        //绘画方法
        function drawing() {
            if (drawingObject) {
                _this.canvas.remove(drawingObject);
            }
            var canvasObject = null;
            switch (_this.drawType) {
            case "arrow": //错
                let img1 = document.getElementById("dui");
                var imgInstance = new fabric.Image(img1, {
                    left: _this.mouseFrom.x-25,
                    top: _this.mouseFrom.y-25,
                    width:50,
                    height:50
                });
                canvas.add(imgInstance);
                break;
            case "line": //对
                let img2 = document.getElementById("cuo");
                var imgInstance1 = new fabric.Image(img2, {
                    left: _this.mouseFrom.x-25,
                    top: _this.mouseFrom.y-25,
                    width:50,
                    height:50
                });
                canvas.add(imgInstance1);
                break;
            case "text":
                _this.textbox = new fabric.Textbox("", {
                    left: _this.mouseFrom.x,
                    top: _this.mouseFrom.y,
                    width: 150,
                    fontSize: 50,
                    borderColor: "#2c2c2c",
                    fill: _this.color,
                    hasControls: false
                });
                _this.canvas.add(_this.textbox);
                _this.textbox.enterEditing();
                _this.textbox.hiddenTextarea.focus();
                break;
            case "square":
                break;
            case "smallright": //错
                let img3 = document.getElementById("dui1");
                var imgInstance = new fabric.Image(img3, {
                    left: _this.mouseFrom.x-25,
                    top: _this.mouseFrom.y-25,
                    width:50,
                    height:50
                });
                canvas.add(imgInstance);
                break;
            case "smallwrong": //对
                let img4 = document.getElementById("cuo1");
                var imgInstance1 = new fabric.Image(img4, {
                    left: _this.mouseFrom.x-25,
                    top: _this.mouseFrom.y-25,
                    width:50,
                    height:50
                });
                canvas.add(imgInstance1);
                break;
            case "line1": //对
                let img5 = document.getElementById("dui2");
                var imgInstance1 = new fabric.Image(img5, {
                    left: _this.mouseFrom.x-25,
                    top: _this.mouseFrom.y-25,
                    width:50,
                    height:50
                });
                canvas.add(imgInstance1);
                break;
            default:
                break;
            }
            if (canvasObject) {
                _this.canvas.add(canvasObject); //.setActiveObject(canvasObject)
                drawingObject = canvasObject;
            }
        }
    }
}
</script>

<style lang="" scoped>
.wd_header{
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    height: 70px;
    background: #fff;
    line-height: 70px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
}
.wd_header p{
    font-size: 14px;
    margin-left:15px; 
}
.wd_header p span{
    color: #3399ff;
    font-size: 18px;
}
.wd_header p input{
    width: 50px;
    height: 25px;
    vertical-align: middle;
    outline:none;
    text-align: center;
}
.wd_header p button{
    padding: 5px 15px;
    cursor: pointer;
    color: #fff;
    border: none;
    outline: none;
    background: #155abb;
    border-radius: 5px;
    margin-right: 15px;
}
.wd_header .right{
    margin-right: 20px;
}
.wd_header .main{
    margin-right:140px; 
}
.wd_main{
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    background: #fff;
    padding: 20px;
    margin-top:20px; 
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
}
.wd_main .left{
    width: 750px;
}
.wd_main .left img{
    /* width:100%; */
}
.wd_main .right{
    width: 390px;
    box-sizing: border-box;
    margin-left:20px; 
}
.wd_main .right>div{
    width: 390px;
    position: fixed;
    top: 187px;
}
.wd_main .right .title{
    width: 100%;
    background: #e1eeff;
    box-sizing: border-box;
    padding: 10px 20px;
    text-align: center;
    position: relative;
}
.wd_main .right .title p .tu{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background: #f00;
}
.wd_main .right .title p{
    font-size: 16px;
    text-align: center;
    width: 100%;
}
.wd_main .right .title p .man{
    display: inline-block;
    border-radius: 5px;
    border: solid #fff 1px;
    background-color: #8fc31f;
    color: white;
    margin: 15px;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    font-size: 16px;
} 
.wd_main .right .fen{
    box-sizing: border-box;
    width: 100%;
    padding:0 20px 20px;
    text-align: center;
    border: 1px solid #ccc;
    background: #fff;
}
.wd_main .right .fen ul{
    padding: 20px 0 20px;
}
.wd_main .right .fen ul .active{
    background: #f00;
}
.wd_main .right .fen li{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    border: 1px solid #999;
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
}
.wd_main .right .fen p:nth-child(2) .iconbianji{
    font-size: 16px;
    vertical-align: middle;
    color: #ccc;
}
.wd_main .right .fen p:nth-child(2) input{
    width: 80px;
    height: 25px;
    text-align: center;
    outline: none;
    border-radius: 5px;
    margin: 0 10px;
}
.wd_main .right .fen p:nth-child(2) span{
    font-size: 14px;
    vertical-align: middle;
    color: #ccc;
}
.wd_main .right .fen button{
    width: 90px;
    height: 25px;
    margin: 20px;
    line-height: 25px;
    border-radius: 20px;
    background: #155abb;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}
.wd_main .right .fen button.disable_button{
    border: 1px solid #ccc;
    background: #eee;
    color: #ccc;
    pointer-events:none;
    cursor: no-drop;
}
.wd_main .right .fen p:nth-child(4){
    text-align: right ;
} 
.wd_main .right .fen p:nth-child(4) label{
    cursor: pointer;
}
.wd_main .right .fen p:nth-child(4) input{
    vertical-align: middle;
}
.wd_main .right .control{
    width: 100%;
    background: #fff;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    padding: 30px 50px;
}
.wd_main .right .control p{
    width: 100px;
    cursor: pointer;
    text-align: center;
    color: #155abb;
}
.wd_main .right .control p .iconfont{
    font-size: 40px;
}
.wd_main  img{
    width: 100%;
}
.wd_main .clolorRegion span{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
    border: 1px solid #fff;
}
.wd_main .clolorRegion span.active{
    border: 1px solid #000;
}
.wd_main .quan{
    width: 100%;
}
.wd_main .quan>div:nth-child(1){
    width: 100%;
}
.wd_main .frame{
    width: 320px;
    box-sizing: border-box;
    position: fixed;
    top: 150px;
    right: 0;
}

.wd_main .frame .iconjianshao{
    font-size: 30px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.wd_main .iconjia{
    font-size: 30px;
    position: fixed;
    top: 150px;
    right: 0;
    cursor: pointer;
}
.wd_main .frame .title{
    width: 100%;
    background: #e1eeff;
    box-sizing: border-box;
    padding: 10px 20px;
    text-align: center;
    position: relative;
}
.wd_main .frame .title p .tu{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background: #f00;
}
.wd_main .frame .title p{
    font-size: 16px;
    text-align: center;
    width: 100%;
}
.wd_main .frame .title p .man{
    display: inline-block;
    border-radius: 5px;
    border: solid #fff 1px;
    background-color: #8fc31f;
    color: white;
    margin: 15px;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    font-size: 16px;
} 
.wd_main .frame .fen{
    box-sizing: border-box;
    width: 100%;
    padding:0 20px 20px;
    text-align: center;
    border: 1px solid #ccc;
    background: #fff;
}
.wd_main .frame .fen ul{
    padding: 20px 0 20px;
}
.wd_main .frame .fen ul .active{
    background: #f00;
}
.wd_main .frame .fen li{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    border: 1px solid #999;
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
}
.wd_main .frame .fen p:nth-child(2) .iconbianji{
    font-size: 16px;
    vertical-align: middle;
    color: #ccc;
}
.wd_main .frame .fen p:nth-child(2) input{
    width: 80px;
    height: 25px;
    text-align: center;
    outline: none;
    border-radius: 5px;
    margin: 0 10px;
}
.wd_main .frame .fen p:nth-child(2) span{
    font-size: 14px;
    vertical-align: middle;
    color: #ccc;
}
.wd_main .frame .fen button{
    width: 90px;
    height: 25px;
    margin: 20px;
    line-height: 25px;
    border-radius: 20px;
    background: #155abb;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}
.wd_main .frame .fen button.disable_button{
    border: 1px solid #ccc;
    background: #eee;
    color: #ccc;
    pointer-events:none;
    cursor: no-drop;
}
.wd_main .frame .fen p:nth-child(4){
    text-align: right ;
} 
.wd_main .frame .fen p:nth-child(4) label{
    cursor: pointer;
}
.wd_main .frame .fen p:nth-child(4) input{
    vertical-align: middle;
}
.wd_main .frame .control{
    width: 100%;
    background: #fff;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    padding: 30px 50px;
}
.wd_main .frame .control p{
    width: 100px;
    cursor: pointer;
    text-align: center;
    color: #155abb;
}
.wd_main .frame .control p .iconfont{
    font-size: 40px;
}

</style>