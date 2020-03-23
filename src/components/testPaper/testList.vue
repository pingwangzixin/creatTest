<template>
  <div class="clearfix">
    <div class="g_border fl">
      <div class="zy_paper_list">
        <!--学科选择-->
        <div class="tit_line clearfix">
          <select
            class="fl question_type_select"
            name
            v-model="pageData.selected"
            @change="subjectChange"
          >
            <option
              v-for="(subOption,subOptionI) in pageData.selectSub"
              :value="subOption.id"
              v-text="subOption.name"
              :key="subOptionI"
            ></option>
          </select>
          <span class="add_paper fr" @click="addModuleChange">添加试卷</span>
        </div>
        <!--年级分类-->
        <div class="cont_line">
          <!--年级-->
          <div class="filter_item clearfix">
            <span class="fl">年级：</span>
            <ul class="fl clearfix">
              <li
                class="fl"
                :class="pageData.gradeSelected==gradeI?'active':''"
                v-for="(grade,gradeI) in pageData.gradeList"
                v-text="grade.gradeName"
                @click="changeGrade(gradeI)"
                :key="gradeI"
              ></li>
            </ul>
          </div>
          <!--分类-->
          <div class="filter_item clearfix">
            <span class="fl">分类：</span>
            <ul class="fl clearfix">
              <li
                class="fl"
                :class="pageData.examTypeSelected==examTypeI?'active':''"
                v-for="(examType,examTypeI) in pageData.examTypeList"
                v-text="examType.name"
                @click="changeExamType(examTypeI)"
                :key="examTypeI"
              ></li>
            </ul>
          </div>

          <!--表格-->

          <div class="zk_tableHandle">
            <input
              type="checkbox"
              name
              id="zk_allchecked"
              class="fl zk_cursor"
              @click="checkedAll"
              v-model="tableData.allChecked"
            />
            <label class="fl" for="zk_allchecked">全选</label>
            <span class="zk_cursor">公开至卷库</span>
            <span class="zk_cursor" @click="delTableList">删除</span>
            <span class="zk_cursor">下载</span>
          </div>
          <table class="zk_table">
            <thead>
              <tr>
                <td v-for="(item, index) in tableData.thead" :key="index" class="thead_dtd">{{item}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData.tableList" :key="index" class="list_tr">
                <td>
                  <input
                    type="checkbox"
                    :checked="item.isChecked"
                    @click="checkedChange(index)"
                    class="zk_cursor"
                  />
                </td>
                <td @click="pushToPaper(item,'editVolume')">
                  <span>{{item.paperName}}</span>
                </td>
                <td>
                  <span>{{item.termName}}</span>
                </td>
                <td>
                  <span>{{item.typeName}}</span>
                </td>
                <td>
                  <span>{{item.createBy}}</span>
                </td>
                <td>
                  <span>{{item.createDate}}</span>
                </td>
                <td>
                  <span>{{item.quzCount}}</span>
                </td>
                <td>
                  <span class="updateIcon zk_cursor" @click="titleUpdate(item)">
                    <i class="iconfont iconshezhi"></i>
                    修改
                  </span>
                  <span v-if="item.set" class="setIcon zk_cursor">
                    <i class="iconfont iconshezhi"></i>
                    设置
                  </span>
                  <span v-if="!item.set" class="resetIcon zk_cursor" @click="tableReset(item.id)">
                    <i class="iconfont iconk-i-rese"></i>
                    重置
                  </span>
                  <span v-if="item.quzCount > 0" class="knowledgeIcon zk_cursor" @click="pushToPaper(item,'knowledgePoint')">
                    <i class="iconfont iconzhishidian"></i>知识点
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 灰色背景板 -->
        <div class="addExamHide" v-show="bgFlag" @click="bgFlagChange"></div>
        <!-- 添加试卷 -->
        <div class="addExam" v-show="addExamData.addModuleFlag">
          <p class="addTitle" v-text="addExamData.SubjectFlag?'添加试卷':'修改试卷'">
            添加试卷
            <i class="iconfont iconguanbi1 fr jhf_addtest_close" @click="addExamClose"></i>
          </p>

          <div class="addGradeDiv">
            <div>
              <p class="titleP fl">试卷名称</p>
              <input type="text" class="examTitle" v-model="addExamData.addExamTitle" />
            </div>
            <p class="fl titleP">年级</p>
            <div class="f1 zk_hidden">
              <div v-for="(item) in  addExamData.gradeList" :key="item.id" class="fl">
                <input
                  type="radio"
                  :id="item.id"
                  class="radioChange zk_cursor"
                  v-model="addExamData.addGrade"
                  :value="item.id"
                />
                <label :for="item.id" class="zk_cursor">{{item.gradeName}}</label>
              </div>
            </div>
          </div>
          <div class="addSubject" v-show="addExamData.SubjectFlag">
            <p class="fl titleP">学科</p>
            <div class="f1 zk_hidden">
              <div v-for="(item) in  addExamData.subject" :key="item.id" class="fl">
                <input
                  type="radio"
                  :id="item.id"
                  class="radioChange zk_cursor"
                  v-model="addExamData.addSubject"
                  :value="item.id"
                />
                <label :for="item.id" class="zk_cursor">{{item.name}}</label>
              </div>
            </div>
          </div>
          <div class="addType">
            <p class="fl titleP">考试类型</p>
            <div class="f1 zk_hidden">
              <div v-for="(item) in  addExamData.type" :key="item.id" class="fl zk_cursor">
                <input
                  type="radio"
                  :id="item.id"
                  class="radioChange zk_cursor"
                  v-model="addExamData.addType"
                  :value="item.id"
                />
                <label :for="item.id" class="zk_cursor">{{item.name}}</label>
              </div>
            </div>
          </div>
          <div class="submitDiv">
            <div @click="submitExam">确定</div>
            <div @click="addExamClose">取消</div>
          </div>
        </div>
        <!-- 页码 -->
        <div class="zk_page">
          <div class="zk_pageBn">
            <i
              class="iconfont iconxiangzuo jhf_left"
              :class="tableData.preInfo=='disabled'?'disabledBn':''"
              @click="prePageBn(tableData.preInfo)"
            ></i>
            <span
              v-for="(item,index) in tableData.pageInfo.middlePageInfoLists"
              :key="index"
              class="pageNum"
              :class="item.state=='active'?'activePageBn':''"
              @click="pageChange(item.text)"
            >{{item.text}}</span>
            <i
              class="iconfont iconicon03 jhf_right"
              :class="tableData.nextInfo=='disabled'?'disabledBn':''"
              @click="nextPageBn(tableData.nextInfo)"
            ></i>
          </div>
          <div class="zk_pageInfo">
            <p>
              显示
              <span>{{tableData.pageInfo.currentPage}}</span> 到
              <span>{{tableData.pageInfo.pageSize}}</span>项，共
              <span>{{tableData.pageInfo.totalPage}}</span>页
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--右边浮框-->
    <!--<div class="fr">
      <div class="zy_float">
        <div class="selected_topic toSelect"  @click="toQuestionlist">
          <i class="iconfont icontiku toSelectIcon"></i>
          <span>去选题</span>
        </div>
        <div class="selected_topic examBasket" @click="expandExerciseBar">{{$store.state.arr.length}}
          <br/>
          习题篮</div>
      </div>
    </div>-->
  </div>
</template>
<script>
//接口汇总
import { wordRelevant } from "@/api";
export default {
  name: "testList",
  data() {
    return {
      bgFlag: false, //添加试卷背景板
      pageNum: 1, //当前页数  默认为1
      pageData: {
        selected: null, //学科默认项
        selectSub: [], //学科列表
        gradeSelected: 0, //年级选中项
        gradeList: [], //年级列表
        gradeId: "", // 年级默认id
        examTypeSelected: 0, //考试类型选中项
        examTypeSelectedId: "", //考试类型默认选择id
        examTypeList: [] //考试类型列表
      },
      //  添加试卷所需数据
      addExamData: {
        addModuleFlag: false, //是否显示添加试卷
        SubjectFlag: true, //点击添加还是修改（默认添加）
        gradeList: [], //年级列表
        subject: [], //学科列表
        type: [], //考试类型列表
        addGrade: "", //年级单选框
        addSubject: "", //学科单选框
        addType: "", //考试类型单选框
        addExamTitle: "", //试卷名称输入框
        changeItem: {} //点击修改之后的几个数据
      },
      //表格模拟数据
      tableData: {
        allChecked: false, //是否全选
        thead: [
          "",
          "作业名称",
          "年级",
          "考试类型",
          "作者",
          "创建/编辑时间",
          "试题数量",
          "答题卡"
        ], //表头数据
        tableList: [], //表格中试卷信息
        pageInfo: [], //分页信息
        activeInfo: "" //当前页码数
      }
    };
  },
  //函数
  methods: {
    // 去选题
    toQuestionlist(){
      this.$router.push("/index/questionBank/questionlist")
    },
    // 展开习题栏
    expandExerciseBar(){
        this.$parent.exerciseBar();
    },
    //年级切换
    changeGrade(gradeI) {
      this.pageData.gradeSelected = gradeI;
      this.pageData.gradeId = this.pageData.gradeList[gradeI].id;
      this.getTableInfo();
    },
    //考试类型切换
    changeExamType(examTypeI) {
      this.pageData.examTypeSelected = examTypeI;
      this.pageData.examTypeSelectedId = this.pageData.examTypeList[
        examTypeI
      ].id;
      this.getTableInfo();
    },
    //学科类型切换
    subjectChange() {
      this.getTableInfo();
    },
    //全选按钮
    checkedAll() {
      this.tableData.allChecked = !this.tableData.allChecked;
      this.tableData.tableList.forEach((item, index) => {
        this.tableData.tableList[index].isChecked = this.tableData.allChecked;
      });
    },
    // 单选按钮
    checkedChange(index) {
      this.tableData.tableList[index].isChecked = !this.tableData.tableList[
        index
      ].isChecked;
      this.tableData.allChecked = this.tableData.tableList.every(
        (item, index) => {
          return this.tableData.tableList[index].isChecked == true;
        }
      );
    },
    //背景点击事件
    bgFlagChange() {
      this.bgFlag = false;
      this.addExamData.addModuleFlag = false;
    },
    //点击添加试卷按钮
    addModuleChange() {
      this.addExamData.addModuleFlag = !this.addExamData.addModuleFlag;
      this.addExamData.SubjectFlag = true;
      this.bgFlag = true;
      this.addExamData.addExamTitle = "";
      this.addExamData.addGrade = "";
      this.addExamData.addType = "";
    },
    //取消添加事件
    addExamClose() {
      this.addExamData.addModuleFlag = false;
      this.bgFlag = false;
    },
    //  确定添加试卷
    submitExam() {
      var _this = this;
      if (this.addExamData.SubjectFlag) {
        //点击的添加按钮
        if (
          this.addExamData.addExamTitle &&
          this.addExamData.addGrade &&
          this.addExamData.addType &&
          this.addExamData.addSubject
        ) {
          //如果每一项都不为空  那么发送...
          _this.$parent.confirmFn("确认要添加吗？", function(state) {
            if (state == "sure") {
              wordRelevant
                .addTestListData({
                  levelId: "level_2",
                  paperName: _this.addExamData.addExamTitle,
                  subjectId: _this.addExamData.addSubject,
                  type: _this.addExamData.addType,
                  gradeId: _this.addExamData.addGrade
                })
                .then(res => {
                  if (res.status == 200) {
                    _this.$parent.timingFn("success", "添加成功！");
                    _this.getTableInfo();
                  }
                })
                .catch(e => {});
              _this.addExamData.addExamTitle = "";
              _this.addExamData.addGrade = "";
              _this.addExamData.addType = "";
              _this.addExamData.addSubject = "";
              _this.addExamClose();
            }
          });
        }else{
          _this.$parent.timingFn("warning", "请确保每项不为空！");
        }
      } else if (
        this.addExamData.addExamTitle &&
        this.addExamData.addGrade &&
        this.addExamData.addType
      ) {
        //点击的修改按钮 levelId=level_2&paperName=%E8%80%83%E8%AF%95%E6%B5%8B%E8%AF%951&subjectId=subject_2_2&type=6&gradeId=term_7_1
        _this.$parent.confirmFn("确认要修改吗？", function(state) {
          if (state == "sure") {
            wordRelevant
              .updateTestListData({
                id: _this.addExamData.changeItem.id,
                levelId: _this.addExamData.changeItem.levelId,
                paperName: _this.addExamData.addExamTitle,
                subjectId: _this.addExamData.changeItem.subjectId,
                type: _this.addExamData.addType,
                gradeId: _this.addExamData.addGrade
              })
              .then(res => {
                if (res.status == 200) {
                    _this.$parent.timingFn("success", "修改成功！");
                  _this.getTableInfo();
                }
              })
              .catch(e => {});
            _this.addExamData.addExamTitle = "";
            _this.addExamData.addGrade = "";
            _this.addExamData.addType = "";
            _this.addExamData.addSubject = "";
            _this.addExamClose();
          }
        });
      }
    },
    //修改按钮点击事件
    titleUpdate(item) {
      this.addExamData.addModuleFlag = !this.addExamData.addModuleFlag;
      this.addExamData.SubjectFlag = false;
      this.addExamData.changeItem = item;
      this.bgFlag = true;
      this.addExamData.addExamTitle = item.paperName;
      this.addExamData.addGrade = item.gradeId;
      this.addExamData.addType = item.type;
    },
    //点击删除按钮
    delTableList() {
      var _this = this;
      var flag = false;
      let arr = this.tableData.tableList.filter((item, index) => {
        return item.isChecked == true;
      });

      if (arr.length !== 0) {
        arr.forEach(item => {
          wordRelevant
            .delTestListData({ id: item.id })
            .then(res => {})
            .catch(e => {});
        });
        _this.$parent.confirmFn("确认要删除吗", function(state) {
          if (state == "sure") {
            _this.$parent.timingFn("success", "删除成功！");
            _this.getTableInfo();
          }
        });
      } else {
        _this.$parent.timingFn("warning", "请选择删除内容");
      }
    },
    //获取表格中试卷列表
    getTableInfo() {
      wordRelevant
        .getTestListData({
          pageNo: this.pageNum,
          subjectId: this.pageData.selected || "",
          gradeId: this.pageData.gradeId || "",
          type: this.pageData.examTypeSelectedId || ""
        })
        .then(res => {
          if (res.status == 200) {
            this.tableData.tableList = res.data.data.list;
            this.tableData.tableList.forEach((item, index) => {
              this.$set(this.tableData.tableList[index], "isChecked", false);
              this.pageData.examTypeList.forEach(listChild => {
                if (item.type === listChild.id) {
                  this.tableData.tableList[index].typeName = listChild.name;
                  
                }
              });
            });
            this.tableData.pageInfo = res.data.data.pageInfo;
            this.tableData.nextInfo = res.data.data.pageInfo.nextPage.state;
            this.tableData.preInfo = res.data.data.pageInfo.prePage.state;
          }
        })
        .catch(e => {});
    },
    //点击页码按钮
    pageChange(num) {
      this.pageNum = num;
      this.getTableInfo();
    },
    //点击下一页按钮
    nextPageBn(info) {
      if (info == "disabled") return;
      this.pageNum++;
      this.getTableInfo();
    },
    //点击上一页按钮
    prePageBn(info) {
      if (info == "disabled") return;
      this.pageNum--;
      this.getTableInfo();
    },
    //点击试题跳转至编辑或者上传页面
    pushToPaper(item,state) {
      let headInfo = {};
      headInfo.name = item.paperName;
      headInfo.termName = item.termName;
      headInfo.gradeNo = item.gradeId;
      headInfo.gradeName = item.gradeName;
      headInfo.levelId = item.levelId;
      headInfo.levelName = item.levelName;
      headInfo.subjectId = item.subjectId;
      headInfo.subjectName = item.subjectName;
      headInfo.type = item.type;
      let examInfo = {};
      examInfo.id = item.id;
      examInfo.headInfo = headInfo;
      sessionStorage.setItem("examInfo", JSON.stringify(examInfo));
      if (item.quzCount == 0) {
        this.$router.push("/index/testPaper/process/uploadFile");
      } else {		//编辑卷面editVolume  添加知识点knowledgePoint
        this.$router.push({
        	path : "/index/testPaper/process/examPaperEdit",
        	query : {pageOperation : state}
        });
      }
    },
    //点击重置按钮
    tableReset(id) {
      var _this = this;
      _this.$parent.confirmFn("确认要重置吗？", function(state) {
        if (state == "sure") {
          wordRelevant
            .resetTestListData({ id: id })
            .then(res => {
              if (res.data.ret == 200) {
                _this.getTableInfo();
                _this.$parent.timingFn("success", "重置成功！");
              }
            })
            .catch(e => {});
        }
      });
    }
  },
  //结构加载之后
  mounted() {},
  //架构加载之前
  created() {
    //获取学科下拉
    wordRelevant
      .getSubjectData({ levelId: "level_2" })
      .then(res => {
        if (res.status == 200) {
          this.pageData.selectSub = res.data.data.list;
          this.addExamData.subject = JSON.parse(
            JSON.stringify(res.data.data.list)
          );
          this.pageData.selectSub.unshift({ name: "请选择学科", id: null });
          this.pageData.selected = this.pageData.selectSub[0].id;
        }
      })
      .catch(e => {});
    //获取年级列表
    wordRelevant
      .getGradeData({ levelId: "level_2" })
      .then(res => {
        if (res.status == 200) {
          this.pageData.gradeList = res.data.data.list;
          this.addExamData.gradeList = JSON.parse(
            JSON.stringify(res.data.data.list)
          );
          this.pageData.gradeList.unshift({ gradeName: "全部" });
        }
      })
      .catch(e => {});
    //获取考试类型列表
    wordRelevant
      .getExamTypeData({})
      .then(res => {
        if (res.status == 200) { 
          this.pageData.examTypeList = res.data.data.list;
          this.getTableInfo();
          this.addExamData.type = JSON.parse(
            JSON.stringify(res.data.data.list)
          );
          this.pageData.examTypeList.unshift({ name: "全部" });
        }
      })
      .catch(e => {});

    //获取表格信息
   
  },
  watch: {},
  components: {}
};
</script>

<style scoped>
.zy_paper_list {
  padding-bottom: 34px;
  position: relative;
}
.zy_paper_list .tit_line {
  height: 50px;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
}
.zy_paper_list .tit_line select {
  height: 30px;
  padding: 0 10px;
  margin-top: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
.zy_paper_list .tit_line .add_paper {
  height: 28px;
  line-height: 28px;
  padding: 0 12px;
  margin-top: 11px;
  background: #5093e1;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.zy_paper_list .cont_line {
  padding: 16px 30px 190px;
}

.zy_paper_list .cont_line .filter_item span {
  width: 42px;
  height: 28px;
  line-height: 28px;
}
.zy_paper_list .cont_line .filter_item ul {
  width: 1090px;
}
.zy_paper_list .cont_line .filter_item ul li {
  height: 28px;
  line-height: 28px;
  padding: 0 12px;
  margin: 0 4px 4px 0;
  border-radius: 5px;
  cursor: pointer;
}
.zy_paper_list .cont_line .filter_item ul li.active {
  color: #fff;
  background: #399fdf;
}
/* 表格上的操作栏 */
.zk_tableHandle {
  line-height: 50px;
}

.zk_tableHandle label {
  margin-left: 8px;
}
.zk_tableHandle input {
  margin-top: 18px;
}
.zk_tableHandle span:nth-of-type(1) {
  color: #50c14e;
  cursor: pointer;
  border-right: 1px solid #4f5355;
  padding-right: 17px;
  margin-left: 20px;
}
.zk_tableHandle span:nth-of-type(2) {
  padding: 0 23px;
  border-right: 1px solid #4f5355;
}
.zk_tableHandle span:nth-of-type(3) {
  padding: 0 23px;
}
/* 表格样式设置 */
.zk_table {
  border: 1px solid #e4e4e6;
  text-align: center;
  line-height: 34px;
}
.zk_table td {
  border: 1px solid #e5e5e5;
}
.zk_table tr:nth-child(2n) {
  background: #f6f7fa;
}
.zk_table thead tr {
  font-weight: bold;
  background: #f6f7fa;
}
.zk_table thead tr td:nth-of-type(1) {
  width: 39px;
}
.zk_table thead tr td:nth-of-type(2) {
  width: 316px;
}
.zk_table thead tr td:nth-of-type(3) {
  width: 100px;
}
.zk_table thead tr td:nth-of-type(4) {
  width: 121px;
}
.zk_table thead tr td:nth-of-type(5) {
  width: 104px;
}
.zk_table thead tr td:nth-of-type(6) {
  width: 187px;
}
.zk_table thead tr td:nth-of-type(7) {
  width: 114px;
}
.zk_table thead tr td:nth-of-type(8) {
  width: 230px;
}
.list_tr td:nth-child(2) span {
  font-size: 12px;
  line-height: 18px;
  width: 170px;
  display: block;
  margin: 8px auto;
  color: #5093e1;
  cursor: pointer;
}
.updateIcon {
  margin-right: 10px;
}
.updateIcon,
.setIcon {
  color: #649de4;
}
.resetIcon {
  color: #5fbb64;
  margin-right: 10px;
}
.knowledgeIcon{
	color: #d68593;
}
.knowledgeIcon i{
	margin-right: 2px;
	vertical-align: -1px;
}
/* 页码 */
.zk_page {
  position: relative;
  margin-bottom: 36px;
}
.zk_pageBn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
}
.zk_pageInfo {
  float: right;
  margin-right: 31px;
}
.jhf_left,
.jhf_right {
  color: #65a0e5;
  cursor: pointer;
}

.pageNum {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  margin: 0 8px 0 8px;
}
.activePageBn {
  background: #399fdf;
  color: #fff;
  border-radius: 5px;
}

.disabledBn {
  cursor: not-allowed;
}

/* 添加试卷 */
.addExamHide {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.3);
}
.addExam {
  width: 600px;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 360px;
  z-index: 10;
  font-size: 16px;
}
.examTitle {
  width: 450px;
}
.addGradeDiv,
.addSubject,
.addType {
  overflow: hidden;
  line-height: 30px;
}
.addType {
  margin-bottom: 10px;
}
.addTitle {
  height: 45px;
  border-bottom: 1px solid #ddd;
  line-height: 45px;
  text-indent: 29px;
  font-size: 16px;
  color: #5093e1;
  margin-bottom: 20px;
}
.radioChange {
  margin-left: 8px;
}
.submitDiv div:nth-child(1) {
  float: left;
  margin-left: 120px;
  width: 110px;
  height: 30px;
  background: #dbeef9;
  color: #5093e1;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.submitDiv div:nth-child(2) {
  float: right;
  margin-right: 120px;
  font-style: normal;
  width: 108px;
  height: 28px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.jhf_addtest_close {
  margin-right: 15px;
}
.titleP {
  width: 80px;
  text-align: right;
  margin-right: 10px;
}
.zk_hidden {
  overflow: hidden;
}
.zk_cursor {
  cursor: pointer;
}

/* 确定删除提示框 */
.delConfirm {
  width: 400px;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 245px;
  z-index: 10;
}
.delConfirm .topP {
  padding: 14px 20px 13px 29px;
  font-size: 15px;
  border-bottom: 1px solid #ddd;
}
.delConfirm .topP span {
  color: #1379c1;
  font-weight: 700;
}
.imgConfirm {
  width: 50px;
  height: 50px;
  border: 1px solid #f65277;
  border-radius: 50%;
  margin: 7px auto;
}
.imgConfirm img {
  margin-left: 4px;
  margin-top: 4px;
}
.confirmP {
  text-align: center;
}
.confirmBn {
  width: 110px;
  height: 30px;
  border: 1px solid #eee;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
}
.Bndiv {
  overflow: hidden;
  width: 275px;
  margin: 50px auto 0;
}
.sureBn {
  color: #f87793;
  background: #fccad6;
}
.delSuccss {
  width: 400px;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 160px;
  z-index: 10;
  font-size: 18px;
}
.delSuccss p {
  text-align: center;
}
.imgWrapper {
  width: 50px;
  height: 50px;
  border: 1px solid #1bbc9b;
  border-radius: 50%;
  margin: 34px auto 10px;
}
.imgWrapper img {
  width: 42px;
  height: 42px;
  margin-left: 4px;
  margin-top: 4px;
}
</style>