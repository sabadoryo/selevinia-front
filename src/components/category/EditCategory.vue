<template>
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Название"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      style="float:right"
      @click="save"
    >
      Сохранить
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Удалить
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Вы уверены что хотите удалить эту категорию?
        </v-card-title>
        <v-card-text>Если вы удалите эту категорию связанные с ней статьи также будут удалены, это действие невозмжно обратить!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteCategory"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 </v-form>
</template>

<script>
export default {
  name : 'EditCategory',
  data : () => ({
    dialog: false,
    name : '',
    nameRules: [
        v => !!v || 'Название не может быть пустым'
    ],
    valid:null
  }),
  mounted() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      this.$store.commit('triggerOverlay')
      this.$http.get(`/api/categories/${this.$route.params.id}`)
        .then(res => {
          this.name = res.data.data.name;
          this.$store.commit('changeHeaderTitle', res.data.data.name)
          this.$store.commit('triggerOverlay')
        })
    },
    save() {
      this.$refs.form.validate()
      this.$store.commit('triggerOverlay')
      this.$http.put(`/api/categories/${this.$route.params.id}`, {
        name : this.name
      }).then(() => {
        this.$store.commit('triggerOverlay')
        this.$store.commit('triggerSnackbar', {message: 'Категория обновлена', color: 'green'})
      }).catch(err => {
        this.$store.commit('triggerOverlay')
        console.log(err)  
      })
    },
    deleteCategory() {
      this.$store.commit('triggerOverlay')
      this.$http.delete(`/api/categories/${this.$route.params.id}`)
        .then(() => {
          this.$store.commit('triggerOverlay')
          this.$store.commit('triggerSnackbar', {message: 'Категория удалена', color: 'green'})
          this.dialog = false;
          this.$router.push('/categories')
        })
    }
  }
}
</script>

<style>

</style>