<template>

  <my-dialog :api="model.api" :dialog="model.dialog" :content="model.content"></my-dialog>
</template>
<script>
  import MyDialog from '../dialog/my-dialog.vue'
  export default {
    components: {
      MyDialog,                      //内容
    },
    computed:{
      model(){                        // 数据
        return this.$store.state.modules.special_user;
      },
    },
  }
</script>
