import base from './base';
import _ from 'lodash'

const myModule = {
  type:'upload',
  url:'/api/upload/defaultUpload',
  fileList:[],
  checkTypeName:'defaultUpload',
  focus:{                             //是否有焦点
    select:false,                       //焦点状态（同一组控件有一个状态默认第一个为true的为焦点）
    effective:false,                     //
    skip:false,                           //
  },
  checkType:{
    defaultUpload:function (file){
      return true;
    },
    img:function(file){
      console.log("当前上传的文件格式为:"+file.type)
      const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式和PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
export default _.merge({}, base,myModule)
