/**
 * 获取json文件
 */
function getJson(selectType, quzTypeTitle, callback) {
//	alert(123)
    var typeName;
    var type;
    var capitalLetterArr = [];
	var lowercaseLetterArr = [];
    $.ajax({
        type: "get", //请求方式
        url: "../../json/data.json", //地址，就是json文件的请求路径
        async: false, //同步请求
        dataType: "json", //数据类型可以为 text xml json  script  jsonp
        success: function(data) { //返回的参数就是 action里面所有的有get和set方法的参数
            if(selectType == "largeTitle") {
                for(var i = 0; i < data.largeTitle.length; i++) {
                    if(quzTypeTitle.indexOf(data.largeTitle[i].name) != -1) {
                        typeName = data.largeTitle[i].name;
                        type = data.largeTitle[i].type;
                    }
                }
            } else if(selectType == "quzType") {
                for(var i = 0; i < data.quzType.length; i++) {
                    if(quzTypeTitle.indexOf(data.quzType[i].name) != -1) {
                        type = data.quzType[i].type;
                        typeName = data.quzType[i].name;
                    }
                }
            }else if(selectType == "capitalLetter"){
            	capitalLetterArr = data.capitalLetter;
            }else if(selectType == "lowercaseLetters"){
            	lowercaseLetterArr = data.lowercaseLetters;
            }else if(selectType == "letter"){
            	capitalLetterArr = data.capitalLetter;
            	lowercaseLetterArr = data.lowercaseLetters;
            }
        }
    });
//  if(type != undefined) {
        return {
            typeName,
            type,
            capitalLetterArr,
            lowercaseLetterArr
        };
//  }
}



var data = `
        <div id="dd">
            <p>&#xa0;</p>
					<p><img src="../../imgs/111_html_b86036eb90104550.gif" width="65" height="59" />2017—2018学年度下学期7年级期末</p>
					<p>数学试卷（120分）</p>
					<p>一、单项选择题，共10道（每小题3分，共30分）</p>
					<ol>
						<li>下列调查中，适宜采用全面调查（普查）方式的是（　　）</li>
					</ol>
					<ol type="B" style="margin:0pt; padding-left:0pt">
//						<li style="font-family:Calibri; font-size:10.5pt; margin:0pt 0pt 0pt 13.73pt; orphans:0; padding-left:4.27pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:Calibri; font-size:10.5pt">1</span><span style="font-family:Calibri; font-size:10.5pt">-1</span><span style="font-family:Calibri; font-size:10.5pt">  </span></li>
//						<li style="font-family:Calibri; font-size:10.5pt; margin:0pt 0pt 0pt 13.36pt; orphans:0; padding-left:4.64pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:Calibri; font-size:10.5pt">1-</span><span style="font-family:Calibri; font-size:10.5pt">2  </span></li>
//						<li style="font-family:Calibri; font-size:10.5pt; margin:0pt 0pt 0pt 13.25pt; orphans:0; padding-left:4.75pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:Calibri; font-size:10.5pt">1-</span><span style="font-family:Calibri; font-size:10.5pt">3  </span></li>
//						<li style="font-family:Calibri; font-size:10.5pt; margin:0pt 0pt 0pt 14.11pt; orphans:0; padding-left:3.89pt; text-align:justify; text-indent:0pt; widows:0"><span style="font-family:Calibri; font-size:10.5pt">1-</span><span style="font-family:Calibri; font-size:10.5pt">4</span></li>
//					</ol>
//					
					<p>A、&#xa0;了解我国民众对乐天集团“萨德事件”的看法</p>
					<p>B、&#xa0;了解湖南卫视《人们的名义》反腐剧的收视率</p>
					<p>C、&#xa0;调查我校某班学生喜欢上数学课的情况</p>
					<p>D、&#xa0;调查某类烟花爆竹燃放的安全情况</p>
					<p>&#xa0;</p>
					<ol start="2" type="1">
						<li>满足﹣1＜x≤2的数在数轴上表示为（　　）</li>
					</ol>
					<p>A、&#xa0;<img src="002.png" width="106" height="43" />&#xa0;&#xa0;&#xa0; B、&#xa0;<img src="003.png" width="106" height="44" />&#xa0;&#xa0; C、&#xa0;<img src="004.png" width="106" height="42" />&#xa0;&#xa0;&#xa0; D、&#xa0;<img src="005.png" width="111" height="43" /></p>
					<p>&#xa0;</p>
					<ol start="3" type="1">
						<li>若m＜0，则点P（3，2m）所在的象限是（　　）</li>
					</ol>
					<p>A、&#xa0;第一象限&#xa0; &#xa0;B、&#xa0;第二象限&#xa0;&#xa0; &#xa0;C、&#xa0;第三象限&#xa0;&#xa0;&#xa0; &#xa0;D、&#xa0;第四象限</p>
					<p>&#xa0;</p>
					<ol start="4" type="1">
						<li>如图，直线AB，CD被直线EF所截，∠1=55°，下列条件中能判定AB∥CD的是（　　）</li>
					</ol>
					<p><img src="006.png" width="140" height="119" /></p>
					<p>A、&#xa0;∠2=35°&#xa0;&#xa0; B、&#xa0;∠2=45°&#xa0;&#xa0; C、&#xa0;∠2=55°&#xa0;&#xa0; D、&#xa0;∠2=125°</p>
					<p>&#xa0;</p>
					<ol start="5" type="1">
						<li>下列方程中，是二元一次方程的是（　　）</li>
					</ol>
					<p>A、&#xa0;x-5y=6z&#xa0;&#xa0; B、&#xa0;5xy+3=0&#xa0;&#xa0;&#xa0;&#xa0; C、 &#xa0;<img src="007.png" width="6" height="27" />+2y=3 &#xa0;&#xa0; &#xa0; D、&#xa0;x=<img src="008.png" width="24" height="27" /></p>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<p>&#xa0;</p>
							</td>
						</tr>
					</table>
					<ol start="6" type="1">
						<li>已知a＞b，则下列不等式中，正确的是（　　）</li>
					</ol>
					<p>A、﹣a＞﹣b&#xa0;&#xa0;&#xa0; &#xa0;B、2a﹣1＞3b﹣1&#xa0;&#xa0; &#xa0;C、&#xa0;a+3＞b+3&#xa0;&#xa0; &#xa0;D、&#xa0;4a＜4b</p>
					<p>&#xa0;</p>
					<ol start="7" type="1">
						<li>下列四组数中是方程3x+y=5解的是（　　）</li>
					</ol>
					<p>A、&#xa0;<img src="009.png" width="44" height="39" />&#xa0;&#xa0; &#xa0;&#xa0; B、&#xa0;<img src="010.png" width="44" height="39" />&#xa0; &#xa0;&#xa0; &#xa0;C、&#xa0;<img src="011.png" width="36" height="39" />&#xa0;&#xa0;&#xa0; &#xa0;&#xa0; D、&#xa0;<img src="012.png" width="44" height="39" /></p>
					<p>&#xa0;</p>
					<ol start="8" type="1">
						<li>某班组织了针对全班同学关于“你最喜欢的一项体育活动”的问卷调查后，绘制出频数分布直方图，由图可知，下列结论正确的是（　　）</li>
					</ol>
					<p>&#xa0;</p>
					<p><img src="013.png" width="200" height="189" />&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>A、&#xa0;最喜欢篮球的人数最多&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; &#xa0;&#xa0;&#xa0; B、&#xa0;最喜欢羽毛球的人数是最喜欢乒乓球人数的两倍C、&#xa0;全班共有50名学生&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; &#xa0;&#xa0;&#xa0;&#xa0;&#xa0; &#xa0;D、&#xa0;最喜欢田径的人数占总人数的10%</p>
					<p>&#xa0;</p>
					<ol start="9" type="1">
						<li>小明到商店购买“五四青年节”活动奖品，购买20只铅笔和10本笔记本共需110元，但购买30支铅笔和5本笔记本只需85元，设每支铅笔x元，每本笔记本y元，则可列方程组（　　）</li>
					</ol>
					<p>A、&#xa0;<img src="014.png" width="100" height="40" />&#xa0;&#xa0; &#xa0; B、&#xa0;<img src="015.png" width="100" height="40" />&#xa0;&#xa0; &#xa0; C、&#xa0;<img src="016.png" width="92" height="40" />&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; D、&#xa0;<img src="017.png" width="92" height="40" /></p>
					<p>&#xa0;</p>
					<ol start="10" type="1">
						<li>某次知识竞赛，共有20道题，每小题答对得10分，答错或不答都扣5分，小明得分要超过85分，他至少要答对（　　）道题．（3分）</li>
					</ol>
					<p>A、&#xa0;11&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; B、&#xa0;12&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; C、&#xa0;13&#xa0;&#xa0;&#xa0;&#xa0; D、&#xa0;14</p>
					<p>二、填空题，共8道（每题3分，共24分）</p>
					<ol start="11" type="1">
						<li><img src="018.png" width="13" height="35" />的立方根是__________，<img src="019.png" width="28" height="18" />的平方根是__________</li>
					</ol>
					<p>&#xa0;</p>
					<ol start="12" type="1">
						<li>如图，△ABC沿着由点B到点E的方向，平移到△DEF，已知BC=5，EC=3，那么平移的距离为__________________</li>
					</ol>
					<p><img src="020.png" width="164" height="96" /></p>
					<ol start="13" type="1">
						<li>若点P（2﹣m，3m+1）在y轴上，则点P的坐标是__________________</li>
					</ol>
					<p>&#xa0;</p>
					<ol start="14" type="1">
						<li>将方程2x+y=6写成用含x的代数式表示y，则y=___________________</li>
					</ol>
					<p>&#xa0;</p>
					<ol start="15" type="1">
						<li>在平面直角坐标系中有一点A（﹣2，1），将点A先向右平移3个单位，再向下平移2个单位，则平移后点A的坐标为　&#xa0;&#xa0;　__________</li>
					</ol>
					<p>&#xa0;</p>
					<ol start="16" type="1">
						<li>满足不等式组<img src="021.png" width="68" height="41" />的整数解是　&#xa0;&#xa0;　___________</li>
						<li>&#xa0;&#xa0;<img src="022.png" width="124" height="109" />如图，某校根据学生上学方式的一次抽样调查结果，绘制出一个未完成的扇形统计图，若该校共有学生700人，则据此估计步行的有______________人</li>
					</ol>
					<p>&#xa0;</p>
					<ol start="18" type="1">
						<li>在实数范围内定义一种新运算“⊕”，其运算规则为：a⊕b=2a+3b．如：1⊕5=2×1+3×5=17．则不等式﹣x⊕4＜0的解集为&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;</li>
					</ol>
					<p>三、解答题（8道题，共66分）</p>
					<ol start="19" type="1">
						<li>解下列方程组（每题5分，共10分）</li>
					</ol>
					<p>（1）<img src="023.png" width="76" height="40" />&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; （2）<img src="024.png" width="100" height="58" /></p>
					<p>&#xa0;</p>
					<ol start="20" type="1">
						<li>（6分）如图，若∠EFD=110°，∠FED=35°，ED平分∠BEF，那么AB与CD平行吗？请说明你的理由．</li>
					</ol>
					<p><img src="025.png" width="116" height="99" /></p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<ol start="21" type="1">
						<li>（6分）已知a，b满足&#xa0;<img src="026.png" width="59" height="21" />+|b-a+1|=0，求a+b的平方根.</li>
					</ol>
					<p>&#xa0;</p>
					<ol start="22" type="1">
						<li>（8分）求不等式组<img src="027.png" width="104" height="60" />的所有整数解．（8分）</li>
					</ol>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<ol start="23" type="1">
						<li>（8分）我国古代数学著作《孙子算经》中有“鸡兔同笼”问题：“今有鸡兔同笼，上有三十五头，下有九十四足．问鸡兔各几何．”其大意是：“有若干只鸡和兔关在同一笼子里，它们一共有35个头，94条腿．问笼中的鸡和兔各有多少只？”试用列方程（组）解应用题的方法求出问题的解。</li>
						<li>（8分）甲、乙两人同解方程组<img src="028.png" width="76" height="40" />时，甲看错了方程①中的a，解得<img src="029.png" width="44" height="39" />，乙看错了②中的b，解得<img src="030.png" width="36" height="39" />，试求<img src="031.png" width="123" height="35" />的值</li>
					</ol>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<ol start="25" type="1">
						<li>（10分）随着移动终端设备的升级换代，手机已经成为我们生活中不可缺少的一部分，为了解中学生在假期使用手机的情况（选项：A．和同学亲友聊天；B．学习；C．购物；D．游戏；E．其它），端午节后某中学在全校范围内随机抽取了若干名学生进行调查，得到图表（部分信息未给出）：</li>
					</ol>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<p>选项</p>
							</td>
							<td>
								<p>A</p>
							</td>
							<td>
								<p>B</p>
							</td>
							<td>
								<p>C</p>
							</td>
							<td>
								<p>D</p>
							</td>
							<td>
								<p>E</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>频数</p>
							</td>
							<td>
								<p>10</p>
							</td>
							<td>
								<p>n</p>
							</td>
							<td>
								<p>5</p>
							</td>
							<td>
								<p>p</p>
							</td>
							<td>
								<p>5</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>频率</p>
							</td>
							<td>
								<p>m</p>
							</td>
							<td>
								<p>0.2</p>
							</td>
							<td>
								<p>0.1</p>
							</td>
							<td>
								<p>0.4</p>
							</td>
							<td>
								<p>0.1</p>
							</td>
						</tr>
					</table>
					<p>&#xa0;</p>
					<p>根据以上信息解答下列问题：</p>
					<p>1)&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; 这次被调查的学生有多少人？</p>
					<p>2)&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; 求表中m，n，p的值，并补全条形统计图．</p>
					<p>3)&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; 若该中学约有800名学生，估计全校学生中利用手机购物或玩游戏的共有多少人？并根据以上调查结果，就中学生如何合理使用手机给出你的一条建议．</p>
					<p><img src="032.png" width="186" height="130" /></p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<p>&#xa0;</p>
					<ol start="26" type="1">
						<li>（10分）为积极响应政府提出的“绿色发展•低碳出行”号召，某社区决定购置一批共享单车．经市场调查得知，购买3辆男式单车与4辆女式单车费用相同，购买5辆男式单车与4辆女式单车共需16000元．</li>
					</ol>
					<p>1)&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; 求男式单车和女式单车的单价；</p>
					<p>2)&#xa0;&#xa0;&#xa0;&#xa0;&#xa0;&#xa0; 该社区要求男式单车比女式单车多4辆，两种单车至少需要22辆，购置两种单车的费用不超过50000元，该社区有几种购置方案？怎样购置才能使所需总费用最低，最低费用是多少？</p>
					<p>&#xa0;</p>
        </div>
    `;

//唯一的随机id
function Yrandom() {
    function S4() {
        return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function guid() {
        return(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    return myID = guid();
}


var bigQuestionTem = `
                    <li class="big_question_list">
                        <div class="head j_head clearfix">
                            <b class="tit_num fl">一、</b> 
                            <div class="tit_cont fl">是</div>
                            <div class="edit_big_tit fl clearfix">
                                <textarea name="" id="" class="fl"></textarea>
                                <div class="btn_group fl">
                                    <button class="sure j_sure">确认</button>
                                    <button class="cancel j_cancel">取消</button>
                                </div>
                            </div>
                            <span class="btn">
                                <b class="btn_">取消选择</b>
                                <b class="btn_edit j_btn_edit">编辑名称</b>
                                <b class="btn_add">添加小题</b>
                                <b class="btn_sort">设置起始题号</b>
                                <b class="btn_move">移动</b>
                                <b class="btn_split">拆分</b>
                                <b class="btn_delete">删除</b>
                            </span> 
                        </div>
                        <ul class="cont"></ul>
                    </li>   
                    `;
var smallQuestionNum = `
                    <li class="clearfix group j_group">
                    </li>   
                    `;
var smallQuestionTem = `
                    <div class="question j_question">
                        <span class="btn fr">
                            <b class="btn_edit j_btn_edit">编辑</b>
                            <b class="btn_move j_btn_move">移动</b>
                            <b class="btn_merge_group j_btn_merge_group">与上题合并为题目组</b>
                            <b class="btn_merge j_btn_merge">与上题合并</b>
                            <b class="btn_split j_btn_split">拆分</b>
                            <b class="btn_delete j_btn_delete">删除</b>
                        </span>
                        <span class="btn fr">
                            <b class="btn_sure j_btn_sure">确认</b>
                            <b class="btn_cancel j_btn_cancel">取消</b>
                        </span>
                        <div class="question_option">
                            <div class="question_type clearfix">
                                <b class="fl tit_num">1</b> 
                            </div>
                        </div>
                        <div class="qusetion_main">
                            <div class="normal_state">
                                <div class="echo_content stem_cont"></div>
                                <div class="analysis_cont clearfix">
                                    <span class="fl">解析：</span>
                                    <div class="echo_content fl"></div>
                                </div>
                            </div>
                            <div class="edit_state">
                                <div class="stem_cont">
                                    <div class="editor_unified" id=""></div>
                                </div>
                                <div class="analysis_cont">
                                    <span>解析：</span>
                                    <div class="editor_unified" id=""></div>
                                </div>
                            </div>
                        </div>
                        <div class="img_zoom">
                            <div class="img_zoom_btn clearfix">
                                <b class="narrow fl">－</b>
                                <b class="enlarge fl">＋</b>
                            </div>
                        </div>
                    </div>   
                    `;
var questionGroupTem = `
                    <div class="group_head j_group_head">
                        <span class="btn">
                            <b class="btn_edit j_btn_edit">编辑</b>
                            <b class="btn_split j_btn_split">拆分</b>
                            <b class="btn_delete j_btn_delete">删除</b>
                        </span> 
                        <span class="btn fr">
                            <b class="btn_sure j_btn_sure">确认</b>
                            <b class="btn_cancel j_btn_cancel">取消</b>
                        </span>
                        <div class="tit_cont echo_content">lao</div>
                        <div class="editor_unified" id=""></div>
                    </div>
                    `;

$(function (){
	//用来匹配每道题开始的各种点
	var reg1 = /(<[^>]*>)(\d*\.?．?)(.*)/
	//匹配每道题开始的各种点，但是保留img标签，为了防止有的两位数题号之间有图片，保留下来,并去掉点之前的题号
	var reg2 = /(<[^>]*>)(<img[^>]*>)(\d*\.?．?)(.*)/
	//匹配到原定义的题有给的分数，将分数，括号，匹配
	var reg3 = /(<[^>]*>)([（(]\d*分[)）])(.*)/
	//匹配到原定义的题有给的分数，将分数，括号，匹配，保留img标签，防止中间有img标签
	var reg4 = /(<[^>]*>)(<img[^>]*>)([（(]\d*分[)）])(.*)/
	//用来匹配题号中间有空格，去掉空格
	var reg_null = /<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig;
	// 用来去大题题号
	var importSection= /(^\s*<p(?:\s+[^>]*)?>(?:<[^>]+>)*)\s*([〇一二三四五六七八九十]+)((?:<\/[^>]+>)*\s*(?:<[^>]+>)*)[，。；,\.．;、]/i;
	//删除ol和li标签，后台没有去除的原因因为ol自动排序题号，后台删除以后就没有题号进行区分
	var filter_p = /<p[^>]*>[^<]*<\/p>/g;
	var filter_li = /<li[^>]*>/g;
	var filter_li_end = /<\/li>/g;
	var filter_ol = /<\/?ol[^>]*>/g;
	//去掉特殊字符,过滤两个，一种是p标签里只有特殊字符，那么过滤掉标签和特殊字符，如果内容中有部分特殊字符，那么只过滤特殊字符
	var filter_special_font1 = /<p>&#xa0;<\/p>/g;
	var filter_special_font2 = /&#xa0;/g;
	//去空格
	var filter_space = /\s*/g;
	//数字正则
	var filter_number = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
	//字母正则
	var filter_letter= /^[A-Za-z]+$/;
	//	匹配img标签，给该标签加样式
	var regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", "gmi");
	var regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)", "gmi");
	
	
    var htmlArr = [];
    // 最终集合
    var quzList = new Array();//创建list集合
    var ue = [];
	//点击识别试题
	function clickMethod() {
        //获取选定区域的内容
		var objF = $(data);
		//查找是否有ol标签
		var myObj = objF.children();
		var contentArr = [];
		//每一行的内容
		var lineContent;
		//li标签对象
		var li_Obj ;
		//li标签内容
		var liContent;
		//技术规则
		var num = 0;
		//正文内容
		var textContent;
		//截取部分内容
		var strContent;
		//大题题号集合
		var largeArr = [];
		//小题号
		var subtitleArr = [];
		//ol标签类型
		var ol_type;
		//下标		
		var thisIndex;
		//字母数组
 		var letterObj = [];
		//循环ol标签
		for (var i = 0; i < myObj.length; i++) {
			lineContent = myObj[i].outerHTML;
			//如果包含ol标签，那么进行循环去标签
			if(lineContent.indexOf("<ol") != -1){
				//获取ol标签下的li标签
				li_Obj = $(myObj[i]).children();
				//查看ol标签的type值，如果没有，默认是数字1
				if($(myObj[i]).context.type == "" || $(myObj[i]).context.type == null ){
					ol_type = 1;
				}else{
					ol_type = $(myObj[i]).context.type;
				}
				//查看类型是否是数字
				if(filter_number.test(ol_type)){
					num = ol_type-1;
					//循环li标签，将li标签替换为p标签并添加索引
					for (var j = 0; j < li_Obj.length; j++) {
						//因为存在一个ol标签下有多个题，所有，每个li进行+1进行题号赋值
						num = num + 1;
						liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+num+'.'+'').replace(filter_li_end,'</p>');
						contentArr.push(liContent)
					}		
				}else if(filter_letter.test(ol_type)){
					console.log(ol_type);
//					capitalLetterArr,lowercaseLetterArr
					letterObj = getJson("letter", null);
					if(letterObj.capitalLetterArr.indexOf(ol_type) != -1){//capitalLetterArr-大写
						thisIndex = letterObj.capitalLetterArr.indexOf(ol_type);
						//循环li标签，将li标签替换为p标签并添加索引
						for (var j = 0; j < li_Obj.length; j++) {
							//根据下标获取当前的排序类型
							num = thisIndex + j;
							liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+letterObj.capitalLetterArr[num]+'.'+'').replace(filter_li_end,'</p>');
							contentArr.push(liContent)
						}
					}else{//lowercaseLetterArr-小写
						thisIndex = letterObj.lowercaseLetterArr.indexOf(ol_type);
						//循环li标签，将li标签替换为p标签并添加索引
						for (var j = 0; j < li_Obj.length; j++) {
							//根据下标获取当前的排序类型
							num = thisIndex + j;
							liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+letterObj.lowercaseLetterArr[num]+'.'+'').replace(filter_li_end,'</p>');
							contentArr.push(liContent)
						}
					}
					
					
				}else{
					alert("发现新的排序类型，当前未支持……")
				}
			}else{
				contentArr.push(myObj[i].outerHTML)
			}
		}
		//最终的要处理的集合
//		console.log(contentArr)
		//处理正文内容
		for (var i = 0; i < contentArr.length; i++) {
			//正文内容
			textContent = contentArr[i];
			//如果长度大于5，截取前五位正文内容
			if(textContent.length > 6) {
				strContent = textContent.substring(0, 6);
				strContent = strContent.replace(filter_space,"");
			}
			//扫描出大题题号
			var largeObj = getJson("largeTitle", strContent);
			//大题题号
			if(largeObj != undefined) {
				var largeNum = largeObj.type;
				if(largeNum != null && largeNum != "") {
					largeArr.push(i);
				}
			}
			//循环小题题号
			var nums = sux(strContent);
			if(nums != undefined ){
				subtitleArr.push(i);
			}
		}
		console.log("大题开始下标" + largeArr)
		console.log("小题号开始下包集合：" + subtitleArr)
		
		
		//根据大题号循环，将数据进行重组，map方式存储展示
		for(var r = 0; r < largeArr.length; r++) {
			var quz_map = {};
			var smallContent = new Array();
			var smallSubscript = new Array();
			var ss = "";
			var strHtml = "";
			var bigTitle = "";
			//根据大题下标集合，获取大题内容
			bigTitle = contentArr[largeArr[r]];
			bigTitle = bigTitle.replace(importSection, '$1$3')
			
			//大题
			quz_map["topicNumber"] = bigTitle;
			ss = contentArr.slice(largeArr[r]+1 , largeArr[r + 1]);
			//循环每种试题的大集合
			for(var j = 0; j < ss.length; j++) {
				strHtml += ss[j];
			}
			//循环每道大题下的小题进行区分，保存坐标
			for(var f = 0; f < subtitleArr.length; f++) {
				if(largeArr[r+1] == undefined ){
					if(subtitleArr[f] > largeArr[r]){
						smallSubscript.push(subtitleArr[f]);
					}
				}else{
					if(subtitleArr[f] > largeArr[r] && subtitleArr[f] < largeArr[r+1]){
						smallSubscript.push(subtitleArr[f]);
					}
				}
			}
			//循环每道大题下的小题坐标，获取内容
			var rr = "";
			for (var g = 0; g < smallSubscript.length; g++) {
				// console.log(largeArr[r])
				var quzGroupAndContent = {};
				if(!isNaN(smallSubscript[g + 1])) {
					rr = contentArr.slice(smallSubscript[g], smallSubscript[g + 1]);
				} else {
					if(!isNaN(subtitleArr[g+1])){
						rr = contentArr.slice(smallSubscript[g], largeArr[r+1]);
					}else{
						rr = contentArr.slice(smallSubscript[g], smallSubscript[g + 1]);
					}
				}
				//去题号操作
				var str2 = rr[0].replace(reg1, '$1$3').replace(reg2, '$1$2$4').replace(reg3, '$1$3').replace(reg4, '$1$2$4');
				for(var y = 0; y < rr.length; y++) {
					ss[y] = ss[y].replace(regex1, "$2 style=\"\"$3");
					ss[y] = ss[y].replace(regex2, "$2width:auto;$3");
					ss[y] = ss[y];
				}
				str2 = str2.replace(regex1, "$2 style=\"\"$3");
				str2 = str2.replace(regex2, "$2width:auto;$3");
				rr[0] = str2;
				rr = rr.join('');
                rr = rr.replace(reg_null, "");
                //给所有表格加属性
//				$('table').attr('border','1');
//				$('table').attr('width','100%');
				quzGroupAndContent["group"] = "";
                // quzGroupAndContent["content"] = '<div>' + rr + '</div>';
				quzGroupAndContent["content"] = [];
				quzGroupAndContent["content"].push(['<div>' + rr + '</div>','<div></div>']);
                
				smallContent.push(quzGroupAndContent);
			}
			
//			quzGroup["quzContent"] = strHtml;
//			quzGroup["quzGroup"]  = "";
//			quzGroup["quzSubscript"] = smallContent;
			//小题
			quz_map["SmallTitle"] = smallContent;
            quzList.push(quz_map);
		}
		console.log(quzList)
       /*  quzList[1].SmallTitle[2].group = '<p>我是解析出来的题目组111</p>';
        quzList[1].SmallTitle[2].content.push(['<div><p>题目组111里面的小题22222</p><p>不重复计算）</p></div>','<div></div>']);
        quzList[1].SmallTitle[2].content.push(['<div><p>题目组111里面的小题33333</p><p>不重复计算）</p></div>','<div>题目组111里面的小题33333答案不知道答案不知道</div>']);
        quzList[2].SmallTitle[1].group = '<p>我是解析出来的题目组222</p>';
        quzList[2].SmallTitle[1].content.push(['<div><p>题目组222里面的小题22222</p><p>不重复计算）</p></div>','<div>题目组222里面的小题22222答案不知道答案不知道</div>']); */
        // quzList[1].SmallTitle[0].content = '<div>' + quzList[1].SmallTitle[0].content + '<p>2.计算线段AC从开始变换到A1C2的</p><p>过程中扫过区域的面积（重叠部分</p><p>不重复计算）</p></div>';
        // var pp = $(quzList[1].SmallTitle[0].content).find('p');
        // console.log(quzList)
	}

	// 截取指定字符或得题号
	function sux(strr) {
		var numbers;
		var numArr = [0,1,2,3,4,5,6,7,8,9];
		if(strr.indexOf(".") != -1) {
			numbers = strr.split(".")[0];
		} else if(strr.indexOf("．") != -1) {
			numbers = strr.split("．")[0];
		} else if(strr.indexOf("．") != -1) {
			numbers = strr.split("．")[0];
		} else if(strr.indexOf("、") != -1) {
			numbers = strr.split("、")[0];
		} else {
			console.log("识别异常---sux");
		}
		if(numbers != undefined) {
			numbers = numbers.replace(filter_space, "");
			var lastNum = parseInt(numbers.charAt(numbers.length-1));
			if(numArr.indexOf(lastNum) != -1){
				return lastNum;
			}else{
				return undefined;
			}
		}else{
			return undefined;
		}
	}

	function judgeTitle(strr) {
		var content;
		if(strr.indexOf(".") != -1) {
			content = strr.split(".");
		} else if(strr.indexOf("．") != -1) {
			content = strr.split("．");
		} else if(strr.indexOf("．") != -1) {
			content = strr.split("．");
		} else if(strr.indexOf("、") != -1) {
			content = strr.split("、");
		} else {
			console.log("识别异常---judgeTitle");
		}
		content.shift();
		return content.toString();
	}

	clickMethod();

    console.log(quzList)


     //解析数据插入页面结构
     for(var bJ = 0; bJ < quzList.length; bJ++){
        $('.j_task_list').append(bigQuestionTem);
        $('.big_question_list').eq(bJ).find('.j_head .tit_cont').html(quzList[bJ].topicNumber);
        for(var sJ = 0; sJ < quzList[bJ].SmallTitle.length; sJ++){
            $('.j_task_list .cont').eq(bJ).append(smallQuestionNum);
            if(quzList[bJ].SmallTitle[sJ].group != ''){
                $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).append(questionGroupTem);
                $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_group_head .echo_content').html(quzList[bJ].SmallTitle[sJ].group);
                var equivalentId = 'editor_' + Yrandom();
                $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_group_head .editor_unified').attr('id', equivalentId).siblings('.echo_content').attr('for-id', equivalentId);
                var ueNUm = $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_group_head .editor_unified').attr('id');
                // 实例化编辑器
                ue.push(UE.getEditor(ueNUm, {
                    initialFrameHeight: 100,
        //			initialFrameWidth : 400,
                    scaleEnabled: false
                })); 
            }
            for(var cJ = 0; cJ < quzList[bJ].SmallTitle[sJ].content.length; cJ++){
                $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).append(smallQuestionTem);
                for(var dJ = 0; dJ < quzList[bJ].SmallTitle[sJ].content[cJ].length; dJ++){
                    $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_question .normal_state').eq(cJ).find('.echo_content').eq(dJ).html(quzList[bJ].SmallTitle[sJ].content[cJ][dJ]);
                    var equivalentId = 'editor_' + Yrandom();
                    $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_question .normal_state').eq(cJ).find('.echo_content').eq(dJ).attr('for-id', equivalentId);
                    $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_question .edit_state').eq(cJ).find('.editor_unified').eq(dJ).attr('id', equivalentId);
                    var ueNUm =  $('.j_task_list .cont').eq(bJ).children('li').eq(sJ).find('.j_question .edit_state').eq(cJ).find('.editor_unified').eq(dJ).attr('id');
                    // 实例化编辑器
                    ue.push(UE.getEditor(ueNUm, {
                        initialFrameHeight: 100,
            //			initialFrameWidth : 400,
                        scaleEnabled: false
                    })); 
                }
            }
        }
        // $('.j_task_list').eq(bJ).find('.j_head .tit_cont').html(quzList[bJ].topicNumber);
    }
    // console.log(ue)
    //编辑器赋值
    $('.echo_content').each(function(index, ele) {
        // console.log($(ele).attr('for-id'))
        ue[index].ready(function () { 
            // console.log(this)
            if(this.key == $(ele).attr('for-id')){
                this.execCommand('insertHtml', $(ele).html(), true);
            } 
        });
    });

    // 头部调用
    $('.header').load("../../tpl/part/header.html",function (){});

    // 底部调用
    $('.footer').load("../../tpl/part/footer.html",function (){});

    // 组卷头部筛选调用
    $('.test_paper_screen').load("../../tpl/part/testPaperScreen.html",function (){});

    // 进度条
    $('.process').load("../../tpl/part/process.html",function(){
        //进度条调用
        window.variableGlobal.fn.urrentProcess(2);
    });

    //展开解析
	$(document).on('click', '.j_open_analysis', function() {
		$('.j_question .qusetion_main .normal_state .analysis_cont').slideToggle(400, function() {});
	});

    // 大题标题移入
    $(document).on('mouseover','.big_question_list .j_head',function(){
        if($(this).children('.edit_big_tit').css('display') == 'none'){
            $(this).children('.btn').show();
        }
    });

    // 大题标题移出
    $(document).on('mouseout','.big_question_list .j_head',function(){
        $(this).children('.btn').hide();
    });

    // 大题编辑名称
    $(document).on('click','.big_question_list .head .j_btn_edit',function(){
        $(this).parent().siblings('.edit_big_tit ').children('textarea').val($(this).parent().siblings('.tit_cont').text().replace(/\s+/g,""));
        $(this).parent('.btn').hide().siblings('.tit_cont').hide().siblings('.edit_big_tit').show();
        // $(this).parent('.btn').hide().siblings('.tit_cont').hide().siblings('.edit_big_tit').show();
    });

    // 大题编辑名称确认
    $(document).on('click','.big_question_list .head .j_sure',function (){
        $(this).parents('.edit_big_tit ').siblings('.tit_cont').text($(this).parent().siblings('textarea').val());
        $(this).parents('.edit_big_tit').hide().siblings('.tit_cont').show();
    });

    // 大题编辑名称取消
    $(document).on('click','.head .j_cancel',function (){
        $(this).parents('.edit_big_tit').hide().siblings('.tit_cont').show();
    });



    //题目组鼠标移入
	$(document).on('mouseover', '.zy_paper_main .task_list .cont>li.j_group', function (){
        if($(this).children('.j_question').length > 1){
            $(this).addClass('active');
            if($(this).find('span.btn').last().css('display') == 'none') {
                $(this).find('span.btn').first().show();
            }
        }
    });
     //题目组标移出
	$(document).on('mouseout', '.zy_paper_main .task_list .cont>li.j_group', function (){
        if($(this).children('.j_question').length > 1){
            if($(this).find('span.btn').last().css('display') == 'none') {
                $(this).removeClass('active');
            }
            $(this).find('span.btn').first().hide(); 
        }
    });

    // 题目组标题移入
    $(document).on('mouseover','.zy_paper_main .j_group_head',function (){
        if($(this).find('span.btn').last().css('display') == 'none'){
            console.log(1)
            $(this).find('span.btn').first().show();
        }else{
            console.log(2)
        }
    });

    // 题目组标题移出
    /* $(document).on('mouseout','.zy_paper_main .j_group_head',function (){
        // if($(this).find('span.btn').last().css('display') == 'none'){
            $(this).find('span.btn').first().hide();
        // }
    }); */

    // 题目组标题编辑
    $(document).on('click','.zy_paper_main .j_btn_edit',function (){
        $(this).parent('.btn').hide().siblings('.btn').show().siblings('.echo_content').hide().siblings('.editor_unified').show();
    });
    
    //小题鼠标移入
	$(document).on('mouseover', '.zy_paper_main .task_list .cont .j_question', function (){
        $(this).addClass('active');
		if($(this).find('span.btn').last().css('display') == 'none') {
			$(this).find('span.btn').first().show();
		}
    });
     //小题鼠标移出
	$(document).on('mouseout', '.zy_paper_main .task_list .cont .j_question', function (){
		if($(this).find('span.btn').last().css('display') == 'none') {
			$(this).removeClass('active');
		}
		$(this).find('span.btn').first().hide(); 
    });
    
    // 小题编辑
    $(document).on('click','.big_question_list .j_question .j_btn_edit',function ( ) {  
        //from_split
        $(this).parent('.btn').hide().siblings('.btn').show().children('.j_btn_sure').addClass('from_edit').parent('.btn').siblings('.qusetion_main').find('.normal_state').hide().siblings('.edit_state').show();
    });

    // 小题确认
    $(document).on('click','.big_question_list .j_question .j_btn_sure.from_edit',function ( ) {  
        // $(this).parents('.j_question')
        var showCont = $(this).parents('.j_question').find('.qusetion_main .echo_content');
        for(var i = 0; i < showCont.length; i++) {
            for(var j = 0; j < ue.length; j++) {
                if(showCont.eq(i).attr('for-id') == ue[j].key){
                    showCont.eq(i).html(ue[j].getContent());
                    $(this).removeClass('from_edit').parent('.btn').hide().siblings('.qusetion_main').find('.normal_state').show().siblings('.edit_state').hide();
                }
            }
        }
    });

    // 小题取消
    $(document).on('click','.big_question_list .j_question .j_btn_cancel',function ( ) { 
        $(this).parent('.btn').hide().siblings('.qusetion_main').find('.normal_state').show().siblings('.edit_state').hide();
    });


    // 保存
    $(document).on('click','.baocun',function () {
        var submitData = [];
        for(var i=0; i<$('.big_question_list').length; i++){
            submitData.push({'topicNumber' : $('.big_question_list').eq(i).find('.j_head .tit_cont').html(),'SmallTitle' : []});
            for(var j=0; j<$('.big_question_list').eq(i).find('.j_group').length; j++){
                submitData[i].SmallTitle.push({'group' : '' , 'content' : []});
                for(var k=0; k<$('.big_question_list').eq(i).find('.j_group').eq(j).find('.j_question').length; k++){
                    var stem = $('.big_question_list').eq(i).find('.j_group').eq(j).find('.j_question').eq(k).find('.qusetion_main .normal_state .echo_content').first().html();
                    var analysis = $('.big_question_list').eq(i).find('.j_group').eq(j).find('.j_question').eq(k).find('.qusetion_main .normal_state .echo_content').last().html();
                    var groupTit =  $('.big_question_list').eq(i).find('.j_group').eq(j).find('.j_group_head').find('.tit_cont').html() != undefined ? $('.big_question_list').eq(i).find('.j_group').eq(j).find('.j_group_head').find('.tit_cont').html() : '';
                    submitData[i].SmallTitle[j].group = groupTit;
                    submitData[i].SmallTitle[j].content.push(stem , analysis);
                }
            }
        } 
        console.log(submitData)
    });


}); 