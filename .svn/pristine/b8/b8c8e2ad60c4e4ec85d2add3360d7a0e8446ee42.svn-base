<template>
  <div>
    <!-- 学科选择以及添加试卷 -->
    <div class="jhf_subject">
      <select name="" id="" class="jhf_pulldown">
        <option value="" v-for="(item , index) in option" :key="index" >{{item}}</option>
      </select>
      <span class="fr" @click="ind()">添加试卷</span>
    </div>

    <!-- 年级选择 -->
    <ul class="jhf_grade">
      <li class="jhf_grade_header fl">
        <p>年级：</p>
      </li>
      <li class="jhf_grade_content fl">
        <span
          v-for="(item, index) in grade"
          :key="index"
          :class="activeGrade == index ? 'active' : ''"
          @click="styleGrade(index)"
          >{{ item }}</span
        >
      </li>
    </ul>

    <!-- 考试分类 -->
    <ul class="jhf_exam">
      <li class="jhf_exam_header fl">
        <p>分类：</p>
      </li>
      <li class="jhf_exam_content fl">
        <span
          v-for="(item, index) in exam"
          :key="index"
          :class="activeExam == index ? 'active' : ''"
          @click="styleExam(index)"
          >{{ item }}</span
        >
      </li>
    </ul>

    <!-- 全选、公开、删除、下载 -->
    <div class="jhf_action">
      <input
        type="checkbox"
        name=""
        id="jhf_checkall"
        class="fl"
        @click="checkAll(allCheck)"
        v-model="allCheck"
      />
      <label class="fl" for="jhf_checkall">全选</label>
      <b class="fl" @click="openBank()">公开至卷库</b>
      <em class="fl" @click="delMatter()">删除</em>
      <strong class="fl" @click="downLoad()">下载</strong>
    </div>

    <!-- 以下内容为表格、页码 -->
    <div class="jhf_content">
      <!-- 表格 -->
      <table class="jhf_table">
        <!-- 表格头部 -->
        <thead>
          <tr v-for="(item, index) in table_header" :key="index" class="jhf_tr">
            <th v-for="(item1, index1) in item" :key="index1" class="jhf_th">
              {{ item1.content }}
            </th>
          </tr>
        </thead>
        <!-- 表格内容 -->
        <tbody>
          <tr
            v-for="(item, index) in table_content_current"
            :key="index"
            class="jhf_tr"
          >
            <td v-for="(item1, index1) in item" :key="index1" class="jhf_td">
              <input
                type="checkbox"
                v-if="index1 == 'input'"
                v-model="item.input"
              />
              <span
                v-if="index1 != 'input'"
                :class="{
                  jhf_answer: index1 == 'answer',
                  jhf_reset: index1 == 'reset'
                }"
                @click="scite(item1,index)"
              >
                <i
                  class="iconfont iconshezhi fl jhf_answer"
                  v-if="index1 == 'answer'"
                ></i>
                <i
                  class="iconfont iconk-i-rese fl jhf_reset"
                  v-if="index1 == 'reset'"
                ></i>
                {{ item1 }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 页码 -->
      <div class="jhf_page clearfix">
        <div class="jhf_num clearfix">
          <i
            class="iconfont iconxiangzuo jhf_left fl"
            @click="leftStyle()"
            ref="leftBan"
            :class="activePage == 0 ? 'jhf_left_b' : 'jhf_left'"
          ></i>
          <span
            v-for="(item, index) in page"
            :key="index"
            @click="stylePage(index)"
            :class="activePage == index ? 'active' : ''"
            class="fl"
            >{{ item }}</span
          >
          <i
            class="iconfont iconicon03 jhf_right fl"
            @click="rightStyle()"
            ref="rightBan"
            :class="
              activePage == this.page.length - 1 ? 'jhf_right_b' : 'jhf_right'
            "
          ></i>
        </div>
        <div class="jhf_write fr">
          <span>
            显示1到8项，共<b>{{ _content }}</b
            >项
          </span>
        </div>
      </div>
    </div>

    <!-- 选题、习题篮 -->
    <div
      class="jhf_location"
      :class="{ jhf_location_style: display }"
      ref="location"
    >
      <div class="jhf_select">
        <i class="iconfont icontiku jhf_questionbank fl"></i>
        <span class="fl">去选题</span>
      </div>
      <div class="jhf_bask" @click="reveal()">
        <strong class="fl">{{ exercisesNumber }}</strong>
        <span class="fl">习题篮</span>
      </div>
    </div>

    <!-- 习题篮 -->
    <Bask v-show="bask" :btnClick="reveal" @func="getExercisesNumber"></Bask>

    <!-- 添加试卷 -->
    <addTest v-show="addtest" :btnClose="ind" ></addTest>

    <!-- 编辑 -->
    <Edit v-show="edit" @send="fuzhi" :editClose="{fangfa:scite1,neirong:obj}" ></Edit>
  </div>
</template>
<script>
import bask from "../part/bask";
import addtest from "../part/addtest"
import edit from "../part/edit"
export default {
  name: "testList",
  data() {
    return {
      option : ["语文","数学","英语","物理","化学","生物"],
      // 编辑内容显示
      edit : false,
      // 添加试卷显示
      addtest : false,
      // 习题篮数量
      exercisesNumber: 0,
      // 习题篮显示
      bask: false,
      // 年级选择数组
      activeGrade: 0, // 年级选择样式切换，默认为第一个
      grade: [
        "全部",
        "初一年级上",
        "初一年级下",
        "初二年级上",
        "初二年级下",
        "初三年级上",
        "初三年级下"
      ],
      // 考试分类数组
      activeExam: 0, // 考试分类样式切换，默认为第一个
      exam: [
        "全部",
        "入学考试",
        "摸底考试",
        "模拟考试",
        "月考考试",
        "期中考试",
        "期末考试",
        "毕业考试"
      ],
      // 表格头部数组
      table_header: [
        [
          { content: "" },
          { content: "作业名称" },
          { content: "年级" },
          { content: "考试类型" },
          { content: "作者" },
          { content: "创建/编辑时间" },
          { content: "试题数量" },
          { content: "答题卡" },
          { content : "编辑内容" }
        ]
      ],
      // 表格内容数组
      table_content: [
        {
          input: false,
          homework: "2018--2019学年期中考试组卷第一单元1",
          grade: "六年级",
          exam: "入学考试",
          author: "王翠兰",
          time: "2017-08-20",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷2",
          grade: "八年级",
          exam: "摸底考试",
          author: "高伟",
          time: "2017-08-20",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷3",
          grade: "六年级",
          exam: "期末考试",
          author: "赵安安",
          time: "2017-08-20",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷4",
          grade: "七年级",
          exam: "升学考试",
          author: "关爽",
          time: "2017-08-20",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷5",
          grade: "八年级",
          exam: "摸底考试",
          author: "王翠兰",
          time: "2017-08-20",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级上学期期中考试",
          grade: "七年级",
          exam: "升学考试",
          author: "关爽",
          time: "2017-08-20",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级语文期中考试",
          grade: "六年级",
          exam: "摸底考试",
          author: "赵安安",
          time: "2017-08-20",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "期中考试-七年级上学期语文",
          grade: "九年级",
          exam: "摸底考试",
          author: "高伟",
          time: "2017-08-20",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级语文期中考试",
          grade: "八年级",
          exam: "入学考试",
          author: "赵安安",
          time: "2017-08-19",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "期中考试-七年级上学期语文",
          grade: "六年级",
          exam: "升学考试",
          author: "高伟",
          time: "2017-08-19",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级上学期期中考试",
          grade: "八年级",
          exam: "月考考试",
          author: "关爽",
          time: "2017-08-19",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级上学期期中考试",
          grade: "九年级",
          exam: "期中考试",
          author: "关爽",
          time: "2017-08-19",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "期中考试-七年级上学期语文",
          grade: "六年级",
          exam: "入学考试",
          author: "高伟",
          time: "2017-08-19",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷2",
          grade: "九年级",
          exam: "摸底考试",
          author: "高伟",
          time: "2017-08-19",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018--2019学年期中考试组卷第一单元1",
          grade: "六年级",
          exam: "月考考试",
          author: "王翠兰",
          time: "2017-08-19",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷2",
          grade: "七年级",
          exam: "期末考试",
          author: "高伟",
          time: "2017-08-19",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018--2019学年期中考试组卷第一单元1",
          grade: "七年级",
          exam: "毕业考试",
          author: "王翠兰",
          time: "2017-08-18",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷2",
          grade: "六年级",
          exam: "月考考试",
          author: "高伟",
          time: "2017-08-18",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷4",
          grade: "七年级",
          exam: "摸底考试",
          author: "关爽",
          time: "2017-08-18",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷5",
          grade: "九年级",
          exam: "入学考试",
          author: "王翠兰",
          time: "2017-08-18",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级上学期期中考试",
          grade: "八年级",
          exam: "摸底考试",
          author: "关爽",
          time: "2017-08-18",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷5",
          grade: "七年级",
          exam: "期末考试",
          author: "王翠兰",
          time: "2017-08-18",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级上学期期中考试",
          grade: "六年级",
          exam: "月考考试",
          author: "关爽",
          time: "2017-08-18",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷5",
          grade: "九年级",
          exam: "摸底考试",
          author: "王翠兰",
          time: "2017-08-18",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018--2019学年期中考试组卷第一单元1",
          grade: "七年级",
          exam: "摸底考试",
          author: "王翠兰",
          time: "2017-08-17",
          number: "45",
          answer: "设置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷2",
          grade: "六年级",
          exam: "月考考试",
          author: "高伟",
          time: "2017-08-17",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "七年级上学期期中考试",
          grade: "七年级",
          exam: "期末考试",
          author: "关爽",
          time: "2017-08-17",
          number: "45",
          reset: "重置",
          readct: "编辑"
        },
        {
          input: false,
          homework: "2018-2019学年期中考试组卷5",
          grade: "九年级",
          exam: "摸底考试",
          author: "王翠兰",
          time: "2017-08-17",
          number: "45",
          answer: "设置",
          readct: "编辑"
        }
      ],
      table_content_current: [],
      // 页码数组
      activePage: 0, // 页码样式切换，默认为第一个
      page: [],
      // 监听浏览器窗口变化，值是默认值
      screenWidth: document.body.clientWidth,
      // 浏览器窗口变化后，定位图片的位置
      display: false,
      // 全选绑定
      allCheck: false,
      // 编辑传值
      obj:{},
      num:""
    };
  },
  methods: {
    fuzhi(a){
        this.table_content_current[this.num].homework = a.homework;
        this.table_content_current[this.num].grade = a.grade;
        this.table_content_current[this.num].exam = a.exam;
    },
    // 点击编辑显示弹窗
    scite(item,index){
      if(item == "编辑"){
        this.edit = !this.edit;
        this.obj = this.table_content_current[index];
        this.num = index;
      }
    },
    // 编辑弹窗显示
    scite1(){
      this.edit = !this.edit
    },
    // 年级选择样式切换
    styleGrade(index) {
      this.activeGrade = index;
    },
    // 考试分类样式切换
    styleExam(index) {
      this.activeExam = index;
    },
    // 页码样式切换
    stylePage(index) {
      this.activePage = index;
      this._changePage(this.activePage);
      this._initInput(index);
      this.$refs.leftBan.style.color = "#65A0E5";
      this.$refs.leftBan.style.cursor = "pointer";
      this.$refs.rightBan.style.color = "#65A0E5";
      this.$refs.rightBan.style.cursor = "pointer";
      this.table_content.forEach(item => {
        item.input = false;
      });
      if (index == 0) {
        this.$refs.leftBan.style.color = "#A3A3A3";
        this.$refs.leftBan.style.cursor = "not-allowed";
      }
      if (index == this.page.length - 1) {
        this.$refs.rightBan.style.color = "#A3A3A3";
        this.$refs.rightBan.style.cursor = "not-allowed";
      }
    },
    // 全选
    checkAll(data) {
      var _this = this;
      let nowPage = this.activePage;
      let stopIndex =
        (nowPage + 1) * 8 > this.table_content.length
          ? this.table_content.length
          : (nowPage + 1) * 8;
      for (let i = nowPage * 8; i < stopIndex; i++) {
        _this.table_content[i].input = true;
      }
      if (!data) {
        _this.table_content_current.forEach(item => {
          item.input = true;
        });
      } else {
        _this.table_content_current.forEach(item => {
          item.input = false;
        });
      }
    },
    // 公开至卷库
    openBank() {
      var _this = this;
      let bol = _this.table_content.some(item => {
        return item.input == true;
      });
      if (bol) {
        _this.$parent.timingFn("success" , "公开成功！");
        _this.table_content.forEach(item => {
          return (item.input = false);
        });
      } else {
        _this.$parent.timingFn("warning" , "请选择公开内容");
      }
    },
    // 删除
    delMatter() {
      var _this = this;
      let bol = _this.table_content.some(item => {
        return item.input == true;
      });
      if (bol) {
        _this.$parent.confirmFn('确认要删除吗？',function (state){
          if(state == 'sure'){
            _this.$parent.timingFn('success','删除成功！');
            _this.table_content = _this.table_content.filter(item => {
              return item.input == false;
            });
            _this._initPage();
            if (_this.page.indexOf(Number(_this.activePage) + 1) == -1) {
              _this.activePage -= 1;
              _this._changePage(_this.activePage);
            } else {
              _this._changePage(_this.activePage);
            }
          }
        });
      } else {
        _this.$parent.timingFn("warning" , "请选择删除内容");
      }
    },
    // 下载
    downLoad() {
      var _this = this;
      let bol = _this.table_content.some(item => {
        return item.input == true;
      });
      if (bol) {
        _this.$parent.timingFn("success" , "下载成功");
        _this.table_content.forEach(item => {
          return (item.input = false);
        });
      } else {
        _this.$parent.timingFn("warning" , "请选择下载内容");
      }
    },
    // 页码左箭头点击
    leftStyle(index) {
      this.table_content.forEach(item => {
        item.input = false;
      });
      if (this.activePage == 0) {
        this.$refs.leftBan.style.color = "#A3A3A3";
        this.$refs.leftBan.style.cursor = "not-allowed"; 
      } else {
        this.activePage = this.activePage - 1;
        this.$refs.rightBan.style.color = "#65A0E5";
        this.$refs.rightBan.style.cursor = "pointer";
      }
      this._changePage(this.activePage);
    },
    // 页码右箭头点击
    rightStyle(index) {
      this.table_content.forEach(item => {
        item.input = false;
      });
      if (this.activePage == this.page.length - 1) {
        this.$refs.rightBan.style.color = "#A3A3A3";
        this.$refs.rightBan.style.cursor = "not-allowed";
      } else {
        this.activePage = this.activePage + 1;
        this.$refs.leftBan.style.color = "#65A0E5";
        this.$refs.leftBan.style.cursor = "pointer";
      }
      this._changePage(this.activePage);
    },
    // 习题篮显示
    reveal() {
      this.bask = !this.bask;
    },
    // 添加试卷显示
    ind(){
      this.addtest = !this.addtest;
    },
    // 初始化页码
    _initPage() {
      let count = this.table_content.length;
      let totalpage = Math.ceil(count / 8);
      this.page = [];
      for (let i = 0; i < totalpage; i++) {
        this.page.push(i + 1);
      }
    },
    _changePage(index) {
      this.table_content_current = this.table_content.slice(
        index * 8,
        (index + 1) * 8
      );
    },
    //得到习题篮习题数量
    getExercisesNumber(data) {
      this.exercisesNumber = data;
    },
    _initInput(index) {
      let nowPage = index * 8;
      let stopIndex =
        (nowPage + 1) * 8 > this.table_content.length
          ? this.table_content.length
          : (nowPage + 1) * 8;
      for (let i = nowPage; i < stopIndex; i++) {
        this.table_content[i].input = false;
      }
    },
    // 监听浏览器滚动
    handleScroll(e) {
      if (this.screenWidth>1200){
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        this.$refs.location.style.position = "absolute";
        this.$refs.location.style.right = "-56px";
        this.$refs.location.style.top = scrollTop + 280 + "px";
      }
    },
    // 监听浏览器窗口变化
    _screenWidth(val) {
      this.screenWidth = val;
      if (val < 1200) {
        this.$refs.location.style.position = "fixed";
        this.$refs.location.style.top = "350px";
        this.$refs.location.style.right = "0px";
      } else {
        this.handleScroll();
      }
    }
  },
  computed: {
    // 表格内容数据个数
    _content() {
      return this.table_content_current.length;
    }
  },
  mounted() {
    // 监听浏览器窗口变化
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    // 监听浏览器滚动
    window.addEventListener("scroll", this.handleScroll, true);
    // 监听浏览器刷新
    this._screenWidth(this.screenWidth);
  },
  destroyed() {
    window.removeEventListener("beforeunload", this.beforeunloadFn, true);
  },
  watch: {
    // 监听浏览器窗口变化改变图片定位
    screenWidth(val) {
      this._screenWidth(val);
    },
    // 监听input的选中状态
    table_content_current: {
      handler(value) {
        var _this = this;
        var count = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i].input == true) {
            count++;
          }
        }
        if (count == value.length && count != 0) {
          _this.allCheck = true;
        } else {
          _this.allCheck = false;
        }
      },
      deep: true
    }
  },
  created() {
    this._initPage();
    this._changePage(0);
  },
  components: {
    Bask: bask,
    addTest: addtest,
    Edit : edit
  }
};
</script>

<style>
/* 学科选择以及添加试卷 */
.jhf_subject {
  width: 100%;
  height: 51px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  border-radius: 5px 5px 0 0;
}
.jhf_pulldown {
  width: 138px;
  height: 28px;
  outline: none;
  border-radius: 5px;
  border-color: #ddd;
  margin: 11px 0 0 30px;
  padding-left: 10px;
  color: #333;
  cursor: pointer;
}
.jhf_subject span {
  width: 81px;
  height: 28px;
  background: #5093e1;
  color: #fff;
  border-radius: 5px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  margin: 11px 30px 0 0;
}

/* 年级选择 */
.jhf_grade {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding-bottom: 6px;
}
.jhf_grade_header {
  margin: 28px 0 0 31px;
}
.jhf_grade_content {
  width: 90%;
  margin: 24px 0 0 12px;
}
.jhf_grade span {
  display: inline-block;
  padding: 0 14px;
  height: 28px;
  line-height: 28px;
  margin-left: 15px;
  cursor: pointer;
}
.jhf_grade .active {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}

/* 考试分类 */
.jhf_exam {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding-bottom: 6px;
}
.jhf_exam_header {
  margin: 18px 0 0 31px;
}
.jhf_exam_content {
  width: 90%;
  margin: 13px 0 0 12px;
}
.jhf_exam span {
  display: inline-block;
  padding: 0 14px;
  height: 28px;
  line-height: 28px;
  margin-left: 15px;
  cursor: pointer;
}
.jhf_exam .active {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}

/* 全选、公开、删除、下载 */
.jhf_action {
  width: 100%;
  height: 45px;
  background: #fff;
}
.jhf_action input {
  margin: 14px 0 0 30px;
  cursor: pointer;
}
.jhf_action label {
  cursor: pointer;
  margin: 10px 0 0 5px;
}
.jhf_action b {
  font-weight: 500;
  color: #50c14e;
  margin: 10px 0 0 21px;
  cursor: pointer;
  border-right: 1px solid #4f5355;
  padding-right: 17px;
}
.jhf_action em {
  font-style: normal;
  color: #4f5355;
  cursor: pointer;
  margin: 10px 0 0 23px;
  border-right: 1px solid #4f5355;
  padding-right: 24px;
}
.jhf_action strong {
  font-weight: 500;
  color: #4f5355;
  cursor: pointer;
  margin: 10px 0 0 24px;
}

/* 以下内容为表格、页码 */
.jhf_content {
  background: #fff;
}

/* 表格 */
.jhf_table {
  margin: 0 30px 0 30px;
}
/* 表格头部 */
.jhf_table thead .jhf_tr {
  background: #f6f7fa;
}
.jhf_th {
  width: 135px;
  height: 34px;
  text-align: center;
  border: 1px solid #e5e5e5;
}
.jhf_th:nth-child(2) {
  width: 316px;
}
.jhf_th:nth-child(1) {
  width: 40px;
}
/* 表格内容 */
.jhf_table tr:nth-of-type(even) {
  background: #f6f7fa;
}
.jhf_td {
  width: 153px;
  text-align: center;
  border: 1px solid #e5e5e5;
}
.jhf_td:nth-child(1) {
  width: 39px;
}
.jhf_td:nth-child(2) span {
  display: block;
  width: 170px;
  margin: 0 50px 0 74px;
  color: #5093e1;
  font-size: 12px;
  padding: 8px 0 8px 0;
  cursor: pointer;
}
.jhf_td:nth-child(8) span {
  display: block;
  font-size: 12px;
  width: 40px;
  margin-left: 32px;
  cursor: pointer;
}
.jhf_td:nth-child(8) {
  width: 110px;
}
.jhf_td:last-child span{
  font-size: 12px;
  color: #5093e1;
  cursor: pointer;
}
/* 设置、重置颜色变化 */
.jhf_reset {
  color: #50c14e;
  margin-top: -1px;
}
.jhf_answer {
  color: #5fa3ff;
  margin-top: -1px;
}
/* 表格内容隔行变色 */
.jhf_item_on {
  background: #f6f7fa;
}
.jhf_item_off {
  background: #fff;
}

/* 页码 */
.jhf_page {
  width: 100%;
  margin-top: 191px;
  background: #fff;
  padding-bottom: 36px;
  position: relative;
}
.jhf_page .active {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}
.jhf_num {
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.jhf_num span {
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  margin: 0 8px 0 8px;
}
.jhf_left {
  color: #65a0e5;
  cursor: pointer;
}
.jhf_right {
  color: #65a0e5;
  cursor: pointer;
}
.jhf_left_b {
  color: #a3a3a3;
  cursor: not-allowed;
}
.jhf_right_b {
  color: #a3a3a3;
  cursor: not-allowed;
}
.jhf_write {
  margin-right: 31px;
}
.jhf_write b {
  font-weight: 500;
}

/* 选题、习题篮 */
.jhf_location {
  width: 50px;
  height: 106px;
  position: absolute;
  top: 280px;
  right: -56px;
}
.jhf_select {
  width: 50px;
  height: 50px;
  background: #0169df;
  border-radius: 5px;
  cursor: pointer;
}
.jhf_bask {
  width: 50px;
  height: 50px;
  background: #4a4a4a;
  margin-top: 6px;
  border-radius: 5px;
  cursor: pointer;
}
.jhf_questionbank {
  font-size: 24px;
  color: #fff;
  margin: 5px 0 0 13px;
}
.jhf_select span {
  color: #fff;
  font-size: 12px;
  margin: 0 0 0 7px;
}
.jhf_bask strong {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  margin: 6px 0 0 20px;
}
.jhf_bask span {
  color: #fff;
  font-size: 12px;
  margin: 4px 0 0 7px;
}
.jhf_location_style {
  width: 50px;
  height: 106px;
  position: fixed;
  top: 350px;
  right: 0px;
}
</style>
