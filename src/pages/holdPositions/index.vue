<template>
  <el-container>
    <el-main>
      <div class="content-wrapper">
        <Container v-if="panel=== '1'" :type="1"></Container>
        <Container2 v-if="panel=== '2'" :type="0"></Container2>
        <Container3 v-if="panel=== '3'" :type="1"></Container3>
        <Container4 v-if="panel=== '4'" :type="0"></Container4>
        <Container5 v-if="panel=== '5'" :type="1"></Container5>
        <Container6 v-if="panel=== '6'" :type="0"></Container6>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Container from './components/table-hold.vue'
import Container2 from './components/table-sell.vue'
import Container3 from './components/indextable-hold.vue'
import Container4 from './components/indextable-sell.vue'
import Container5 from './components/futurestable-hold.vue'
import Container6 from './components/futurestable-sell.vue'

export default {
  components: {
    Container,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6
  },
  props: {},
  data() {
    return {
      activetype: 'first',
      panel: '1'
    }
  },
  watch: {
    $route(val) {
      if (val.query.type) {
        this.panel = val.query.type
      }
    }
  },
  computed: {},
  methods: {
    handleClick() {

    }
  },
  created() {
    this.$store.state.activeIndex = 'holdPositions'
  },
  mounted() {

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
