<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        myEditor: ''
      }
    },
    watch: {
      editor: {
        handler: function (val, oldVal) {
          this.myEditor = val
        },
      },
      disabled: {
        handler: function (val, oldVal) {
          if(val){
            UE.getEditor('editor').setDisabled('fullscreen');
          }else{
            UE.getEditor('editor').setEnabled();
          }
        },
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      name: {
        type: String
      },
      config: {
        type: Object
      },
      editor: {
        type: Object
      },
      disabled: {
        type: Boolean
      }
    },
    mounted() {
      const _this = this;
      this.myEditor = UE.getEditor('editor', this.config); // 初始化UE
    },

    methods: {
      getUEContent() { // 获取内容方法
        return {"name":this.name,"content":UE.getEditor('editor').getContent()}
      },
      init(){
        const _this = this;
        this.$nextTick(() => {
          UE.getEditor('editor').ready( function(editor) {
            if(_this.defaultMsg){
              UE.getEditor('editor').setContent(_this.defaultMsg);
            }else{
              UE.getEditor('editor').setContent("");
            }
            if(_this.disabled){
              UE.getEditor('editor').setDisabled('fullscreen');
            }else{
              UE.getEditor('editor').setEnabled();
            }
          });

        });
      },
    },
  }
</script>
