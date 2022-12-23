<template>
  <el-container style="height: 100vh;">
    <el-aside width="250px"
              style="background-color: rgb(238, 241, 246)"
              v-show="isShow">
      <el-input placeholder="查找笔记"
                v-model="filterText">
      </el-input>
      <el-tree class="filter-tree"
               :data="titleList"
               :props="defaultProps"
               default-expand-all
               :filter-node-method="filterNode"
               @node-click="handleNodeClick"
               ref="tree">
      </el-tree>

      <div class="delnote"
           @click="delNote()">
        <img src="@/assets/delete.png"
             width="30px"
             height="30px" />
      </div>
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
            <el-dropdown-item>
              <el-button type="text"
                         @click="dialogVisible1 = true">个人信息</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text"
                         @click="dialogVisible = true">字体大小</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text"
                         @click="logout()">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-dialog title="设置字体大小"
                 :visible.sync="dialogVisible"
                 width="30%">
        <div class="block">
          <el-slider v-model="mdfontSize"
                     show-input>
          </el-slider>
        </div>
      </el-dialog>

      <el-dialog title="设置个人信息"
                 :visible.sync="dialogVisible1"
                 width="50%">
        <reg :userId="userId"></reg>
      </el-dialog>

      <el-main style="padding: 0px">
        <!-- 主体部分 -->
        <div class="edit-container">
          <!-- 标题栏 -->
          <div class="title-nav">
            <span>
              <h1 id="title"
                  @dblclick="isShowTitle = false"
                  v-show="isShowTitle">
                <strong>{{noteTitle}}</strong>
              </h1>
              <el-input v-model=noteTitle
                        style="width:300px;line-height: 80px;font-size: 20px;"
                        v-show="!isShowTitle"
                        @blur="saveTitle()"></el-input>
            </span>
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
                      @click="saveContent()"><img src="@/assets/save.png" /></button>
            </div>
          </div>

          <!-- 编辑区 -->
          <div class="edit-space">
            <div class="markdown-box">
              <div :class="{selectCellBorder: currentCellId === index}"
                   @click="currentCellId = index"
                   v-for="(item, index) in cellList"
                   :key="item.cellId">
                <mavon-editor :toolbars=toolbars
                              :fontSize=markdownFontSize
                              :subfield="false"
                              :ishljs="true"
                              :autofocus="false"
                              v-model="item.cellContent"
                              :key="item.cellId"
                              @save="$save" />
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧边栏：显示cell信息 -->
        <div class="showDetail"
             v-show="!isShow">
          <div class="detail"
               id="asdad">Cell: [<span class="activeNum">{{currentCellId}}</span>]</div>
          <div class="detail">创建时间：<span class="createTime">{{createTime}}</span></div>
          <div class="detail">作者：<span class="author">{{userInfo.name}}</span></div>
          <div class="detail">备注：
            <div class="remarks"
                 @click="isShowRemarks = false"
                 v-show="isShowRemarks">{{ remarks }}</div>
            <el-input type="textarea"
                      v-model="remarks"
                      v-show="!isShowRemarks"
                      style="min-height: 100px;"
                      @blur="saveRemarks()"></el-input>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import Vue from "vue"
import reg from "@/components/changeinfo.vue"

export default {
  created () {
    axios({
      url: "https://db-api.amarea.cn/users/" + this.$route.query.userInfo,
      method: "GET",
    }).then(res => {
      this.userInfo = res.data
      this.noteList = res.data.noteList;
      this.userId = this.$route.query.userInfo,
        this.noteList.forEach(element => {
          this.titleList.push({ "label": element.title })
        });
    })
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  components: {
    "reg": reg,
  },
  computed: {
    markdownFontSize () {
      return this.mdfontSize + "px"
    }
  },
  data () {
    return {
      dialogVisible1: false,
      dialogVisible: false,
      filterText: '',
      isShow: false,
      isShowTitle: true,
      isShowRemarks: true,
      noteId: "",
      currentCellId: "",
      userInfo: "",
      userId: "",
      noteList: [],
      cellList: [],
      titleList: [],
      noteTitle: "",
      createTime: "",
      remarks: "",
      mdfontSize: 25,
      toolbars: {
        fullscreen: true, // 全屏编辑
        preview: true, // 预览
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick (data) {
      this.noteList.forEach(note => {
        if (note.title === data.label) {
          this.cellList = note.cellList
          this.noteTitle = note.title
          this.noteId = note.id
          this.createTime = note.createTime
          this.remarks = note.remarks
        }
      })
    },
    $save (value, render) {
      this.cellList[this.currentCellId].cellContent = value
      axios({
        url: "https://db-api.amarea.cn/users/" + this.userInfo.id,
        method: "PATCH",
        data: {
          noteList: this.noteList,
        }
      }).then(res => {
      })
    },
    saveContent () {
      axios({
        url: "https://db-api.amarea.cn/users/" + this.userInfo.id,
        method: "PATCH",
        data: {
          noteList: this.noteList,
        }
      }).then(res => {
      })
    },
    saveTitle () {
      this.isShowTitle = true
      this.noteList.find(item => {
        if (item.id === this.noteId) {
          item.title = this.noteTitle
        }
      })
      this.saveContent()
    },
    saveRemarks () {
      this.isShowRemarks = true
      this.noteList.find(item => {
        if (item.id === this.noteId) {
          item.remarks = this.remarks
        }
      })
      this.saveContent()
    },
    moveup () {
      if (this.currentCellId != 0) {
        let temp = this.cellList[this.currentCellId]
        this.$set(this.cellList, this.currentCellId, this.cellList[this.currentCellId - 1])
        this.$set(this.cellList, this.currentCellId - 1, temp)
        this.currentCellId--
      };
      this.saveContent()
    },
    movedown () {
      if (this.currentCellId != this.cellList.length - 1) {
        let temp = this.cellList[this.currentCellId]
        Vue.set(this.cellList, this.currentCellId, this.cellList[this.currentCellId + 1])
        Vue.set(this.cellList, this.currentCellId + 1, temp)
        this.currentCellId++
      }
      this.saveContent()
    },
    addUp () {
      this.cellList.splice(this.currentCellId, 0, { "cellId": (this.cellList.length).toString(), "cellContent": "" })
      if (this.currentCellId.length === 0) {
        this.currentCellId = 0
      } else {
        this.currentCellId++
      }
      this.saveContent()
    },
    addDown () {
      this.cellList.splice(this.currentCellId + 1, 0, { "cellId": (this.cellList.length).toString(), "cellContent": "" })
      this.saveContent()
    },
    remove () {
      if (this.currentCellId.length != 0) {
        this.cellList.splice(this.currentCellId, 1)
        this.currentCellId = ""
      }
      this.saveContent()
    },
    newNote () {
      let that = this
      var id = uuidv4()
      this.noteList.push({
        "id": id,
        "title": "新建文件",
        "createTime": this.getCurrentTime(),
        "remarks": "输入标签信息",
        "cellList": [{
          "cellId": "0",
          "cellContent": ""
        }],
      })
      let temp = []
      this.noteList.forEach(note => {
        temp.push({ "label": note.title })
        if (note.id === id) {
          that.cellList = note.cellList
          that.noteTitle = note.title
          that.noteId = id
          that.createTime = note.createTime
        }
      });
      this.titleList = temp
      this.saveContent()
    },
    getCurrentTime () {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy + '年' + mm + '月' + dd + '日 ' + hh + ':' + mf + ':' + ss;
      return _this.gettime
    },
    delNote () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.noteId != "") {
          this.noteList.splice(this.noteList.findIndex(item => item.id === this.noteId), 1)
          this.saveContent()

          let temp = []
          this.noteList.forEach(item => {
            temp.push({ "label": item.title })
          })
          this.titleList = temp
          this.cellList = []
          this.noteTitle = ""
          this.cellId = ""
          this.createTime = ""

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    logout () {
      this.$router.push({
        path: "/login",
        query: {
          userInfo: ""
        }
      })
    },
  }
};
</script>

<style>
.delnote {
  position: absolute;
  width: 250px;
  background-color: rgb(255, 255, 255);
  text-align: center;
  bottom: 0px;
}
.delnote:hover {
  background-color: rgb(157, 157, 158);
}
body {
  margin: 0;
  -moz-user-select: none;
  /*火狐*/
  /*选中文字时避免出现蓝色背景*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  /*选中文字时避免出现蓝色背景*/
  -ms-user-select: none;
  /*IE10*/
  /*选中文字时避免出现蓝色背景*/
  user-select: none;
  /*选中文字时避免出现蓝色背景*/
}
.el-tree-node .el-tree-node__content {
  height: 40px;
}
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