<template>
  <div>
    <v-file-input
      accept=".xlsx, .xls, .csv"
      v-model="file"
      label="Выберита excel файл"
    >
    </v-file-input>

    <v-btn small @click="uploadAuthorsExcel" :disabled="!file" color="primary">
      Загрузить
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ImportAuthorsComponent',
  data: () => ({
    file:null,
  }),
  mounted() {
    this.$store.commit('changeHeaderTitle', 'Импортировать авторов через эксель')
  },
  methods: {
    uploadAuthorsExcel() {
      this.$store.commit('triggerOverlay')

      let formData = new FormData;

      formData.append('file', this.file);

      this.$http.post('/api/authors/import/excel', formData).then(res => {
        console.log(res);
        this.$store.commit('triggerOverlay')

      }).catch(err => {
        console.log(err);
        this.$store.commit('triggerOverlay')

      })
    }
  }
}
</script>

<style>

</style>