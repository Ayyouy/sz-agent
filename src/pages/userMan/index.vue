<template>
  <el-container>
    <el-main>
      <Container></Container>
    </el-main>
  </el-container>
</template>
<script>
import Container from './components/table'

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
    this.$store.state.activeIndex = 'userMan'
  },
  mounted () {
  }
}
</script>
<style>
</style>
