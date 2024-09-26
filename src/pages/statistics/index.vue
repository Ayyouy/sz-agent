<template>
  <el-container>
    <el-main>
      <Container v-if="panel === '1'" :type="1"></Container>
      <Container2 v-if="panel === '2'" :type="0"></Container2>
      <Container3 v-if="panel === '3'" :type="0"></Container3>
    </el-main>
  </el-container>
</template>
<script>
import Container from './components/content.vue'
import Container2 from './components/index-content.vue'
import Container3 from './components/futures-content.vue'

export default {
  components: {
    Container,
    Container2,
    Container3
  },
  props: {},
  data () {
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
  methods: {},
  created () {
    this.$store.state.activeIndex = 'statistics'
    console.log(this.$route.query.type)



  },
  mounted () {

  }
}
</script>
<style>

</style>
