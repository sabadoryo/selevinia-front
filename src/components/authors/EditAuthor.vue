<template>
  <div>
    <v-toolbar
            class="elevation-10">

            <v-banner>После того как вы внесли все изменения, пожалуйста сохраните их</v-banner>
            <v-spacer></v-spacer>
            <v-row class="flex-column mt-5 float-left" dense align-content="end">

                <div>
                    <v-btn color="primary" @click="saveAuthor">
                        Сохранить
                    </v-btn>
                </div>
                <div class="mt-2">
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
                            Вы уверены что хотите удалить этого автора?
                            </v-card-title>
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
                                @click="deleteAuthor"
                            >
                                Удалить
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                </div>
            </v-row>
            <template v-slot:extension>

                <v-tabs
                    v-model="tab"
                    centered
                >
                    <v-tab
                        v-for="n in tabs"
                        :key="n.name"
                    >
                        {{ n.title }}
                        <v-icon>{{ n.icon }}</v-icon>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="tab" class="mt-5">
            <v-form ref="form"
                    v-model="validForm"
                    lazy-validation>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-text-field
                                v-model="author.full_name"
                                label="Название"
                                :rules="notEmptyRule"
                                counter="255"
                                clearable
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-textarea
                                v-model="author.about"
                                label="Об авторе"
                                :rules="notEmptyRule"
                                clearable
                            ></v-textarea>
                        </v-row>
                        <v-row>
                            <v-textarea
                                v-model="author.articles"
                                label="Статьи автора"
                                :rules="notEmptyRule"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
            </v-form>
        </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'EditAuthorComponent',
  data: () => ({
    author: {},
    dialog: null,
    validForm: null,
    tab: 0,
    tabs: [
        {
            title: 'Основная информация',
            name: 'general-info',
            icon: 'mdi-collage'
        }
    ],
    notEmptyRule: [
              v => !!v || 'Обязательное поле',
    ],
  }),
  methods: {
    getAuthor() {
      this.$store.commit('triggerOverlay')
      this.$http.get(`/api/authors/${this.$route.params.id}`)
        .then(res => {
          this.author = res.data.data;
          this.$store.commit('triggerOverlay')      
        })
        .catch(err => {
          console.log(err)
        })
    },
    saveAuthor() {
      this.$store.commit('triggerOverlay')

      this.$http.put(`/api/authors/${this.$route.params.id}`, {
        full_name: this.author.full_name,
        about: this.author.about,
        articles: this.author.articles,
        id: this.author.id
      }).then(() => {
        this.$store.commit('triggerSnackbar', {message:"Автор изменен", color:"green"})
        this.$store.commit('triggerOverlay')
      }).catch(err => {
        console.log(err)
        this.$store.commit('triggerOverlay')
      })
    },
    deleteAuthor() {
      this.$store.commit('triggerOverlay')
      this.$http.delete(`/api/authors/${this.$route.params.id}`)
      .then(() => {
        this.$store.commit('triggerSnackbar', {message:"Автор удален", color:"green"})
        this.$store.commit('triggerOverlay')
        this.$router.push('/authors');
      }).catch(err => {
        console.log(err)
        this.$store.commit('triggerOverlay')
        this.$store.commit('triggerSnackbar', {message:err.message, color:"red"})
      })
    }
  },
  mounted() {
    this.getAuthor();
    this.$store.commit('changeHeaderTitle', 'Изменить автора')
  }
}
</script>

<style>

</style>