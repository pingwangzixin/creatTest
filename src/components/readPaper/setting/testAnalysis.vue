<template>
    <div class="wd_testAnalysis">
        <div class="wd_header">
            <h3>试题解析</h3>
        </div>
        <div class="wd_main">
            <p>
                <span style="color: #00cccc;" class="ng-binding">26-2、</span>
                <span ng-bind-html="trustAsHtml(analyse.title)" class="ng-binding">
                    <span>认真阅读下面关于三角形的内、外角平分线所夹的角的探究过程，完成下列问题.
                        <p></p>
                        <p>探究1：如图（1），在△ABC中，O是∠ABC与∠ACB的平分线的交点，通过推理发现∠BOC=90°+<img src="http://img2.51youpu.com/Public2/pic/d882b5a5106d4cec9c3a6fd402397968.png" border="0">∠A。理由如下：</p>
                        <p>∵BO和CO分别是∠ABC和∠ACB的平分线，</p>
                        <p>∴∠1=<img src="http://img2.51youpu.com/Public2/pic/4f3256911ae243b3b9f6f6b36a806e7c.png" border="0">∠ABC，∠2=<img src="http://img2.51youpu.com/Public2/pic/c9f82295d80d47d0b54d832049c53e40.png" border="0">∠ACB, ∴∠1+∠2=<img src="http://img2.51youpu.com/Public2/pic/f6f24506d4f54c1f97d96b4e3e8a33b8.png" border="0">（∠ABC+∠ACB）</p>
                        <p>又∵∠ABC+∠ACB=180°－∠A，∴∠1+∠2=<img src="http://img2.51youpu.com/Public2/pic/e61a4a6cd45e4ec6abe0658ad7876ffb.png" border="0">（180°－∠A）=90°－<img src="http://img2.51youpu.com/Public2/pic/5786467a9e764a9886cf0de00cc01ea0.png" border="0">∠A</p>
                        <p>∴∠BOC=180°－（∠1+∠2）=180°－（90°－<img src="http://img2.51youpu.com/Public2/pic/01aa20d470b642de9fed13fdb7ae7d02.png" border="0">∠A）=90°+<img src="http://img2.51youpu.com/Public2/pic/20ce500a4f014e41ae00c180af8674c9.png" border="0">∠A<br><span style="color: #333333; font-family: JyeMath, 'Times New Roman', 微软雅黑, Arial, 宋体; font-size: 14px; letter-spacing: 1px;">探究2：如图2中，O是∠ABC与外角∠ACD的平分线BO和CO的交点，试分析∠BOC与∠A有怎样的关系？请说明理由．</span><br>探究3：如图（3），O是∠DBC与∠ECB的平分线的交点，则∠BOC与∠A有怎样的关系？（只写结论，不需证明）</p>
                        <p><img src="http://img2.51youpu.com/Public2/pic/3ec1f891cf86486fb70241272987ffa1.png" border="0"></p>
                    </span>
                </span>
            </p>
        </div>
        <div class="wd_center">
            <p><span style="font-size: 20px;color: #00cccc">题目解析</span></p>
            <p style="margin:10px 0;"><span style="font-size: 20px;">[分析]</span></p>
            <p><span ng-bind-html="trustAsHtml(analyse.analysis)" class="ng-binding"><div><font color="0000FF"></font>根据三角形的一个外角等于与它不相邻的两个内角的和表示出∠DBC和∠BCE，再根据角平分线的定义求出∠OBC+∠OCB，然后根据三角形内角和定理列式整理即可得解．</div></span></p>
            <p style="margin:10px 0;"><span style="font-size: 20px;margin:10px 0;">[解答]</span></p>
            <p><span ng-bind-html="trustAsHtml(analyse.content)" class="ng-binding"><div><p><img class="defaultImageStyle" src="http://img2.51youpu.com/uploads/5bd1648b686cb.png" border="0"></p>
            <p>探究3的结论：<img src="http://img2.51youpu.com/Public2/pic/16c1c703039b49fe8c9eea9092b95e30.png" border="0"></p>
            <p><img src="http://img2.51youpu.com/Public2/pic/02089eb510694993b70e9ab5815192b3.png" border="0"></p></div></span></p>
            <p style="margin:10px 0;"><span style="font-size: 20px;margin:10px 0;">[注释]</span></p>
            <p><span ng-bind-html="trustAsHtml(analyse.comments)" class="ng-binding"><div><font color="0000FF"></font>本题考查了三角形的一个外角等于与它不相邻的两个内角的和的性质，三角形的内角和定理，角平分线的定义，整体思想的利用是解题的关键．</div></span></p>
        </div>
    </div>
</template>
<script>
export default {
    name:"testAnalysis"
}
</script>
<style lang="" scoped>
.wd_testAnalysis{
    width: 1200px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    margin: 20px auto;
}
.wd_header{
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    padding-left: 25px;
    border-bottom: 1px solid #ccc;
}
.wd_header h3{
    font-weight: 700;
    color: #155ABB;
    font-size: 16px;
}
.wd_main{
    width: 100%;
    box-sizing: border-box;
    padding:20px;
    border-bottom: 1px solid #ccc;
}
.wd_center{
    width: 100%;
    box-sizing: border-box;
    padding:20px;
}
img{
    vertical-align: middle;
}
</style>