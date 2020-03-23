<template>
  <div>
    <div class="prompt_box public_box waiting_box jhf_public_box" >	
      <div class="hide"></div>
      <div class='con jhf_con_content' >
          <div class="jhf_basket" v-show="basketShow">
            <!-- 习题篮头部 -->
            <div class="jhf_basket_header">
              <span class="fl">习题篮（<b>{{ _amount }}</b>题）</span>
              <em class="fl" @click="basketEmpty()">清空</em>
              <i class="iconfont iconguanbi1 fr jhf_shut" @click="close()"></i>
            </div>

            <!-- 习题篮内容 -->
            <div class="jhf_basket_content">
              <div
                class="jhf_basket_stem "
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="clearfix">
                  <input type="checkbox" v-model="item.input" class="fl" />
                  <span class="fl">{{ index + 1 }}.{{ item.content }}</span>
                </div>
                <div class="jhf_basket_option">
                  <p v-for="(ele, index1) in item.option" :key="index1">{{ ele }}</p>
                </div>
                <em @click="del(index)">删除</em>
              </div>
            </div>

            <!-- 习题篮底部 -->
            <div class="jhf_basket_footer">
              <input
                type="checkbox"
                class="fl"
                id="jhf_basket_input"
                @click="basketcheckAll(basketallCheck)"
                v-model="basketallCheck"
              />
              <label class="fl" for="jhf_basket_input">全选</label>
              <span class="fr">去组卷</span>
              <em class="fr"
                ><b>{{ _sum }}</b
                >题</em
              >
              <strong class="fr">已选：</strong>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bask",
  props: ["btnClick"],
  data() {
    return {
      // 习题篮显示与隐藏
      basketShow: true,
      // 全选与反选
      basketallCheck: false,
      // 习题篮内容数组
      list: [
        {
          input: "",
          content:
            "已知（x）是定义在R上的奇函数，当x≥0时，f（x）=x2-x3，则函数g（x）=（x）-x+3的零点的集合为（）123",
          option: ["A.{1,3}", "B.{-3,-1,1,3}", "C.{2,-7,1,3}", "D.{-2,-7,1,3}"]
        },
        {
          input: "",
          content:
            "已知（x）是定义在R上的奇函数，当x≥0时，f（x）=x2-x3，则函数g（x）=（x）-x+3的零点的集合为（）456",
          option: ["A.{1,3}", "B.{-3,-1,1,3}", "C.{2,-7,1,3}", "D.{-2,-7,1,3}"]
        },
        {
          input: "",
          content:
            "已知（x）是定义在R上的奇函数，当x≥0时，f（x）=x2-x3，则函数g（x）=（x）-x+3的零点的集合为（）789",
          option: ["A.{1,3}", "B.{-3,-1,1,3}", "C.{2,-7,1,3}", "D.{-2,-7,1,3}"]
        },
        {
          input: "",
          content:
            "已知（x）是定义在R上的奇函数，当x≥0时，f（x）=x2-x3，则函数g（x）=（x）-x+3的零点的集合为（）abc",
          option: ["A.{1,3}", "B.{-3,-1,1,3}", "C.{2,-7,1,3}", "D.{-2,-7,1,3}"]
        },
        {
          input: "",
          content:
            "已知（x）是定义在R上的奇函数，当x≥0时，f（x）=x2-x3，则函数g（x）=（x）-x+3的零点的集合为（）def",
          option: ["A.{1,3}", "B.{-3,-1,1,3}", "C.{2,-7,1,3}", "D.{-2,-7,1,3}"]
        },
      ]
    };
  },
  methods: {
    // 点击关闭习题篮
    close() {
      this.btnClick();
    },
    // 全选与反选
    basketcheckAll(data) {
      var _this = this;
      if (!data) {
        _this.list.forEach(item => {
          item.input = true;
        });
      } else {
        _this.list.forEach(item => {
          item.input = false;
        });
      }
    },
    // 清空
    basketEmpty() {
      var _this = this;
      _this.list = [];
      if (!(_this.list.length)) {
        _this.basketallCheck = false; 
      }
    },
    // 删除
    del(a) {
      this.list.splice(a, 1);
    },
    // 向父组件传值(习题篮数量)
    sendNumber() {
      this.$emit('func',this._amount)
    }
  },
  computed: {
    // 习题篮中习题的总数
    _amount() {
      return this.list.length;
    },
    // 习题篮中已经题的数量
    _sum() {
      var _this = this;
      var num = 0;
      _this.list.forEach(item => {
        if (item.input == true) {
          num += 1;
        }
      });
      return num;
    }
  },
  watch: {
    // 监听input的选中状态
    list: {
      handler(value) {
        var _this = this;
        var count = 0;
        _this.sendNumber();//list发生变化，更新父组件习题篮数量
        for (let i = 0; i < value.length; i++) {
          if (value[i].input == true) {
            count++;
          }
        }
        if (count == value.length && count != 0) {
          _this.basketallCheck = true;
        } else {
          _this.basketallCheck = false;
        }
      },
      deep: true
    }
  },
  created() {
    this.sendNumber();//初始化父组件习题篮数量
  }
};
</script>

<style>
.jhf_public_box .jhf_con_content{
  width: 800px;
  height: 829px;
  padding: 0;
  text-align: left;
}

.jhf_basket {
  width: 800px;
  height: 829px;
  background: #fff;
  border-radius: 5px;
}

/* 习题篮头部 */
.jhf_basket_header {
  height: 46px;
  background: #f4fbff;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #ddd;
}
.jhf_basket_header span {
  font-size: 16px;
  color: #5093e1;
  line-height: 46px;
  margin-left: 24px;
}
.jhf_basket_header b {
  font-weight: 500;
}
.jhf_basket_header em {
  font-style: normal;
  line-height: 46px;
  margin-left: 25px;
  cursor: pointer;
}
.jhf_shut {
  line-height: 46px;
  margin-right: 16px;
  cursor: pointer;
}

/* 习题篮内容 */
.jhf_basket_content {
  height: 726px;
  overflow: auto;
}
.jhf_basket_stem {
  border-bottom: 1px solid #ddd;
  margin: 0 20px 0 20px;
  padding-bottom: 20px;
  position: relative;
  padding-top: 22px;
}
.jhf_basket_stem input {
  margin-top: 4px;
}
.jhf_basket_stem span {
  width: 550px;
  margin-left: 12px;
}
.jhf_basket_option {
  margin-left: 47px;
}
.jhf_basket_option p {
  margin-top: 16px;
}
.jhf_basket_stem em {
  font-style: normal;
  position: absolute;
  top: 50%;
  right: 0;
  cursor: pointer;
  color: #666666;
  transform: translateY(-50%);
}

/* 习题篮底部 */
.jhf_basket_footer {
  height: 54px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.jhf_basket_footer input {
  margin: 20px 0 0 23px;
}
.jhf_basket_footer label {
  line-height: 54px;
  color: #666666;
  margin-left: 8px;
  cursor: pointer;
}
.jhf_basket_footer span {
  width: 92px;
  height: 54px;
  background: #5093e1;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  line-height: 54px;
  cursor: pointer;
}
.jhf_basket_footer em {
  color: #f65177;
  font-style: normal;
  line-height: 54px;
  margin: 0 24px 0 12px;
}
.jhf_basket_footer b {
  font-weight: 500;
}
.jhf_basket_footer strong {
  font-weight: 500;
  line-height: 54px;
}
</style>
