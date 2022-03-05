<template>
  <div>
     <v-toolbar
            class="elevation-10">

            <v-banner>После того как вы внесли все изменения, пожалуйста сохраните их</v-banner>
            <v-spacer></v-spacer>
            <v-row class="flex-column mt-5 float-left" dense align-content="end">

                <div>
                    <v-btn color="primary" @click="save">
                        Сохранить
                    </v-btn>
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
                                v-model="mainPageText"
                                label="Текст на главной странице"
                                clearable
                            ></v-text-field>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="authorsBlogText"
                                label="Текст на странице блога редактора"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="archiveText"
                                label="Текст на странице архивов"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="authorsText"
                                label="Текст на странице авторов"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="authorsRulesDescription"
                                label="Правила для авторов описание"
                                clearable
                            ></v-textarea>
                        </v-row>
                         <v-row>
                            <v-textarea
                                v-model="authorsRulesText"
                                label="Правила для авторов главный текст"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
                 <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="othersText"
                                label="Другие публикации"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="englishVersionDescription"
                                label="English version description"
                                clearable
                            ></v-textarea>
                        </v-row>
                         <v-row>
                            <v-textarea
                                v-model="englishVersionText"
                                label="English version content"
                                clearable
                            ></v-textarea>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <v-textarea
                                v-model="kazakhVersionDescription"
                                label="Kazakh Version Description"
                                clearable
                            ></v-textarea>
                        </v-row>
                         <v-row>
                            <v-textarea
                                v-model="kazakhVersionText"
                                label="Kazakh Version Content"
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
  name: 'PagesComponent',
  data: () => ({
    dialog: null,
    validForm: null,
    tab: 0,
    tabs: [
        {
            title: 'Главная страница',
            name: 'general-info',
            icon: 'mdi-collage'
        },
        {
            title: 'Блог редактора',
            name: 'blog',
            icon: 'mdi-collage'
        },
        {
            title: 'Архив',
            name: 'archive',
            icon: 'mdi-collage'
        },
        {
            title: 'Авторы',
            name: 'authors',
            icon: 'mdi-collage'
        },
        {
            title: 'Правила для авторов',
            name: 'authors-rules',
            icon: 'mdi-collage'
        },
        {
            title: 'Другие публикации',
            name: 'others',
            icon: 'mdi-collage'
        },
        {
            title: 'English Version',
            name: 'eng',
            icon: 'mdi-collage'
        },
        {
            title: 'KazakhVersion',
            name: 'kazakh',
            icon: 'mdi-collage'
        },
    ],
    notEmptyRule: [
              v => !!v || 'Обязательное поле',
    ],
        mainPageText: "",
    authorsText: "",
    authorsBlogText: "",
    archiveText: "",
    authorsRulesDescription: "",
    authorsRulesText : "",
    othersText: "",
    englishVersionDescription: "",
    englishVersionText: "",
    kazakhVersionDescription: "",
    kazakhVersionText: "",
  }),
  mounted(){
    this.$store.commit('changeHeaderTitle', 'Настройка текстов страниц сайта')
    this.$store.commit('triggerOverlay')
    this.getPages();
    setTimeout(function() {
      this.$store.commit('triggerOverlay')

    }.bind(this),2000)
  },
  methods: {
    save() {
      this.$store.commit('triggerOverlay');

      this.$http.post('/api/pages/store-pages', {
        mainPageText: this.mainPageText,
        authorsText: this.authorsText,
        authorsBlogText: this.authorsBlogText,
        archiveText:this.archiveText,
        authorsRulesDescription: this.authorsRulesDescription,
        authorsRulesText : this.authorsRulesText,
        othersText: this.othersText,
        englishVersionDescription: this.englishVersionDescription,
        englishVersionText: this.englishVersionText,
        kazakhVersionDescription: this.kazakhVersionDescription,
        kazakhVersionText: this.kazakhVersionText,
      }).then(() => {
        this.$store.commit('triggerOverlay');
        this.$store.commit('triggerSnackbar', {message: "Сохранено", color:"green"})
      }).catch(err => {
        console.log(err);
        this.$store.commit('triggerOverlay');
        this.$store.commit('triggerSnackbar', {message: err.message, color:"red"})
      })
    },
    getPages() {
      this.$http.get(`/api/pages?filter[key]=mainPageText`)
        .then(res => {
          this.mainPageText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=authorsText`)
        .then(res => {
          this.authorsText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=authorsBlogText`)
        .then(res => {
          this.authorsBlogText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=archiveText`)
        .then(res => {
          this.archiveText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=authorsRulesDescription`)
        .then(res => {
          this.authorsRulesDescription = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=authorsRulesText`)
        .then(res => {
          this.authorsRulesText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=othersText`)
        .then(res => {
          this.othersText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=englishVersionDescription`)
        .then(res => {
          this.englishVersionDescription = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=englishVersionText`)
        .then(res => {
          this.englishVersionText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=kazakhVersionDescription`)
        .then(res => {
          this.kazakhVersionDescription = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
      this.$http.get(`/api/pages?filter[key]=kazakhVersionText`)
        .then(res => {
          this.kazakhVersionText = res.data.data[0]?.value ?? ''
        }).catch(err=> {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>