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
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created () {
    this.$store.state.activeIndex = 'exit'
  },
  mounted () {

  }
}
</script>
<style>

</style>
