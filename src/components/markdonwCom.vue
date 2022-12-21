<template>
  <mavon-editor :toolbars=toolbars
                :subfield="false"
                :ishljs="true"
                :autofocus="false"
                v-model="newContent"
                @save="$save"
                @change="$change" />
</template>

<script>

export default {
  props: ['id', 'content'],
  data () {
    return {
      cellid: this.id,
      newContent: this.content,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        code: true, // code
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        preview: true, // 预览
      }
    }
  },
  methods: {
    $save (value, render) {
      this.$emit('getContent', this.cellid, value, render) // 子向父
      this.saveContent()
    },
    $change (value, render) {
      console.log(value);
    },
    saveContent () {
      return this.newContent
    }
  }
};
</script>

<style scoped>
</style>