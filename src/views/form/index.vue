<template>
<avue-form ref="form" v-model="obj" :option="option" /></template>

<script>
export default {
  data() {
    return {
      obj: {}
    }
  },
  computed: {
    option() {
      return {
        column: [
          {
            label: '姓名',
            prop: 'name',
            mock: {
              type: 'name'
            },
            span: 8
          },
          {
            label: '密码',
            prop: 'password',
            type: 'password',
            mock: {
              type: 'name'
            },
            span: 8
          }
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>

