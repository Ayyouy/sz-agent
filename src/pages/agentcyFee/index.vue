<template>
  <el-container>
     <el-main>
       <div class="content-wrapper">
          <Container></Container>
       </div>
      </el-main>
  </el-container>
</template>
<script>
import Container from './components/table.vue'

export default {
  components: {
    Container
  },
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () {
    this.$store.state.activeIndex = 'agentcyFee'
  },
  mounted () {

  }
}
</script>
<style scoped>
  .content-wrapper{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border: 1px solid #ebeef5;
    padding: 20px;
  }
</style>
