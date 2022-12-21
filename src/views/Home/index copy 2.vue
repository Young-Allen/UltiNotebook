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
                      @click="moveup()"><img src="@/assets/up.png" /></button>
              <button title="下移"
                      @click="movedown()"><img src="@/assets/down.png" /></button>
              <button title="上方新建"
                      @click="addUp()"><img src="@/assets/new-up.png" /></button>
              <button title="下方新建"
                      @click="addDown()"><img src="@/assets/new-down.png" /></button>
              <button title="删除"
                      @click="remove()"><img src="@/assets/delete.png" /></button>
              <button title="新建"
                      @click="newNote()"><img src="@/assets/newfile.png" /></button>
              <button title="保存"
                      @click="saveNote()"><img src="@/assets/save.png" /></button>
            </div>
          </div>

          <!-- 编辑区 -->
          <div class="edit-space">
            <div class="markdown-box">
              <div :class="{selectCellBorder: currentCellId === index}"
                   @click="currentCellId = index"
                   v-for="(item, index) in cellList"
                   :key="index">
                <markdonwComVue ref="markdownBox"
                                @getContent="fn"
                                :content=item></markdonwComVue>
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

<script>
import axios from 'axios'
import Vue from "vue"
import markdonwComVue from '@/components/markdonwCom.vue';

export default {
  components: {
    "markdonwComVue": markdonwComVue
  },
  watch: {
  },
  data () {
    return {
      currentCellId: "",
      isShow: false,
      noteId: JSON.parse(this.$route.query.userInfo).noteList[0].id,
      userInfo: JSON.parse(this.$route.query.userInfo),
      noteList: JSON.parse(this.$route.query.userInfo).noteList,
      cellList: JSON.parse(this.$route.query.userInfo).noteList[0].cellList,
    };
  },
  methods: {
    compare (property) {
      return function (a, b) {
        return a[property] - b[property];
      }
    },
    fn (cellid, value, render) {
    },
    moveup () {
      if (this.currentCellId != 0) {
        let temp = this.cellList[this.currentCellId]
        this.$set(this.cellList, this.currentCellId, this.cellList[this.currentCellId - 1])
        this.$set(this.cellList, this.currentCellId - 1, temp)

        this.currentCellId--
      };
      console.log(this.cellList);
    },
    saveNote () {
      console.log(this.cellList);
      // let markdownBox = this.$refs.markdownBox
      // for (let i = 0; i < markdownBox.length; i++) {
      //   this.cellList[i].valueContent = markdownBox[i].saveContent()
      // }
      // console.log(this.cellList);
      // this.cellList.sort(this.compare("cellId"))
      // console.log(this.cellList);
      // let index = this.noteList.find(item => item.id === this.noteId)
      // this.noteList[index.id].cellList = this.cellList
      // this.userInfo.noteList = this.noteList

      // axios({
      //   url: "http://localhost:3000/users/" + this.userInfo.id,
      //   method: "PATCH",
      //   data: {
      //     noteList: this.noteList,
      //   }
      // }).then(res => {
      //   this.cellList = res.data.noteList[this.noteId].cellList
      //   console.log(res.data);
      // })
    }
  }
};
</script>

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