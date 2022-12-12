<template>
  <el-container style="height: 100vh;">
    <el-aside width="250px"
              style="background-color: rgb(238, 241, 246)"
              v-show="isShow">
    </el-aside>

    <el-container>
      <el-header style="font-size: 20px">
        <el-button type="primary"
                   icon="el-icon-s-fold"
                   @click="isShow = !isShow">
        </el-button>

        <el-dropdown style="position: absolute; right: 0px;">
          <el-button type="primary">
            <i class="el-icon-setting"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>字体大小</el-dropdown-item>
            <el-dropdown-item>主体模式</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main style="padding: 0px">
        <!-- 主体部分 -->
        <div class="edit-container">
          <!-- 标题栏 -->
          <div class="title-nav">
            <h1 id="title"><strong>点击修改标题</strong></h1>
            <div class="button-cont">
              <button title="上移"
                      class="moveUp"
                      @click="moveup()"><img src="@/assets/up.png" /></button>
              <button title="下移"
                      class="moveDwon"
                      @click="movedown()"><img src="@/assets/down.png" /></button>
              <button title="上方新建"
                      class="CreateUp"
                      @click="addUp()"><img src="@/assets/new-up.png" /></button>
              <button title="下方新建"
                      class="CreateDown"
                      @click="addDown()"><img src="@/assets/new-down.png" /></button>
              <button title="删除"
                      class="delete"
                      @click="remove()"><img src="@/assets/delete.png" /></button>
              <button title="新建"
                      class="delete"><img src="@/assets/newfile.png" /></button>
              <button title="保存"
                      class="delete"><img src="@/assets/save.png" /></button>
            </div>
          </div>

          <!-- 编辑区 -->
          <div class="edit-space">
            <div class="markdown-box"
                 ref="markdownBox">
              <div :class="{selectCellBorder: currentCellId === index}"
                   @click="currentCellId = index"
                   v-for="(item, index) in cellList"
                   :key="item.cellId">
                <markdonwComVue @getContent="fn"
                                :id=item.cellId></markdonwComVue>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧边栏：显示cell信息 -->
        <div class="showDetail"
             v-show="!isShow">
          <div class="detail"
               id="asdad">Cell: [<span class="activeNum">{{currentCellId}}</span>]</div>
          <div class="detail">创建时间：<span class="createTime">2022年10月3日20:36:48</span></div>
          <div class="detail">作者：<span class="author">XXXTENTX</span></div>
          <div class="detail">备注：
            <div class="remarks">单击此处，输入备注信息</div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.selectCellBorder {
  border: 3px solid skyblue;
}
.v-note-wrapper {
  z-index: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import Vue from "vue"
import markdonwComVue from '@/components/markdonwCom.vue';

export default {
  components: {
    "markdonwComVue": markdonwComVue
  },
  data () {
    return {
      currentCellId: "",
      isShow: false,
      cellList: [
        {
          cellId: "1",
          valueContent: "#111111",
          renderContent: "111111"
        },
        {
          cellId: "2",
          valueContent: "#222222",
          renderContent: "222222"
        },
        {
          cellId: "3",
          valueContent: "#333333",
          renderContent: "33333"
        },
        {
          cellId: "4",
          valueContent: "#44444",
          renderContent: "44444"
        },
      ]
    };
  },
  computed: {
    maxcellsize () {
      return this.cellList.length;
    }
  },
  methods: {
    fn (value, render) {
      this.cellList.push({ "cellId": "", "valueContent": value, "renderContent": render })
      console.log(this.cellList);
    },
    moveup () {
      if (this.currentCellId != 0) {
        let temp = this.cellList[this.currentCellId]
        Vue.set(this.cellList, this.currentCellId, this.cellList[this.currentCellId - 1])
        Vue.set(this.cellList, this.currentCellId - 1, temp)
        this.currentCellId--
      }
    },
    movedown () {
      if (this.currentCellId != this.maxcellsize - 1) {
        let temp = this.cellList[this.currentCellId]
        Vue.set(this.cellList, this.currentCellId, this.cellList[this.currentCellId + 1])
        Vue.set(this.cellList, this.currentCellId + 1, temp)
        this.currentCellId++
      }
    },
    addUp () {
      this.cellList.splice(this.currentCellId - 1, 0, { "cellId": "", "valueContent": "", "renderContent": "" })
      this.maxcellsize++
      this.currentCellId++
    },
    addDown () {
      this.cellList.splice(this.currentCellId + 1, 0, { "cellId": "", "valueContent": "", "renderContent": "" })
      this.maxcellsize++
    },
    remove () {
      this.cellList.splice(this.currentCellId, 1)
      this.currentCellId = ""
    }
  }
};
</script>