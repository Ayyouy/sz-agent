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
import Container from './components/table-rebate.vue'

export default {
  components: {
    Container
  },
  created () {
    this.$store.state.activeIndex = 'rebate'
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
