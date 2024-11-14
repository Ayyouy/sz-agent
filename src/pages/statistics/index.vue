<template>
  <el-container>
    <el-main>
      <Container1 v-if="panel === '1'"></Container1>
      <Container2 v-if="panel === '2'"></Container2>
      <Container3 v-if="panel === '3'"></Container3>
    </el-main>
  </el-container>
</template>
<script>
import Container1 from './components/content.vue'
import Container2 from './components/index-content.vue'
import Container3 from './components/futures-content.vue'

export default {
  components: {
    Container1,
    Container2,
    Container3
  },
  props: {},
  data () {
    return {
      panel: this.$route.query.type
    }
  },
  watch: {
    $route () {
      this.panel = this.$route.query.type
    }
  },
  created () {
    this.$store.state.activeIndex = 'statistics'
    console.log(this.$route.query.type)
  }
}
</script>
<style>

</style>
