<template>
  <el-container>
    <el-main>
      <div class="content-wrapper">
        <Container1 v-if="panel=== '1'"></Container1>
        <Container2 v-if="panel=== '2'"></Container2>
        <Container3 v-if="panel=== '3'"></Container3>
        <Container4 v-if="panel=== '4'"></Container4>
        <Container5 v-if="panel=== '5'"></Container5>
        <Container6 v-if="panel=== '6'"></Container6>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Container1 from './components/table-hold.vue'
import Container2 from './components/table-sell.vue'
import Container3 from './components/indextable-hold.vue'
import Container4 from './components/indextable-sell.vue'
import Container5 from './components/futurestable-hold.vue'
import Container6 from './components/futurestable-sell.vue'

export default {
  components: {
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6
  },
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
    this.$store.state.activeIndex = 'holdPositions'
  }
}
</script>
<style scoped>
.content-wrapper {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border: 1px solid #ebeef5;
  padding: 20px;
}
</style>
