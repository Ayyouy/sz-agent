<template>
  <el-container>
    <el-main>
      <Container></Container>
    </el-main>
  </el-container>
</template>
<script>
import Container from './components/table.vue'

export default {
  components: {
    Container
  },
  created () {
    this.$store.state.activeIndex = 'capitalNote'
  }
}
</script>
<style>

</style>
