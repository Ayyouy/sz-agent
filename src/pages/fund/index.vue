<template>
  <el-container>
    <el-main>
      <div class="content-wrapper">
        <Container1 v-if="panel=== '1'"></Container1>
        <Container2 v-if="panel=== '2'"></Container2>
        <Container3 v-if="panel=== '3'"></Container3>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Container1 from './positions-index.vue'
import Container2 from './ransoms-index.vue'
import Container3 from './performance-index.vue'

export default {
  components: {
    Container1,
    Container2,
    Container3
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
    this.$store.state.activeIndex = 'fund'
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
