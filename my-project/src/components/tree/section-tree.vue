<!--主题内容table-->
<template>
  <transition name="transitionDelete">
    <div class="row" >
      <div class="col-sm-12">
        <section class="panel">
          <!--头部开始-->
          <header class="panel-heading">
            树
          </header>
          <!--头部结束-->
          <transition name="transitionShow">
            <div class="panel-body" id='tree_api' style="height: 300px; overflow: auto;">
              <el-tree
                :data="data"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
              </el-tree>
            </div>
          </transition>
        </section>
      </div>
    </div>
  </transition>
</template>


<script>
  let id = 1000;

  export default {
    data() {
      return {
        data4:[{
          id: 1,
          label: '一级 1',
          checked:true,
          children: [{
            id: 4,
            label: '二级 1-1',
            checked:true,
            children: [{
              id: 9,
              label: '三级 1-1-1',
              checked:false,
            }, {
              id: 10,
              label: '三级 1-1-2',
              checked:false,
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
    },
    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        console.log(node)
        console.log(data)
        console.log(store)
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span> <el-checkbox v-model="data.checked">{node.label +'_'+data.checked}</el-checkbox></span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>
