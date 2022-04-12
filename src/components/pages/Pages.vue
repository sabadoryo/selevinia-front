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
                  Редактирование страниц сайта
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                            <editor ref="mainPageText" :content="mainPageText" uniqueId="mainPageText"></editor>
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
                            <editor ref="authorsRulesDescription" :content="authorsRulesDescription" uniqueId="authorsRulesDescription"></editor>
                        </v-row>
                         <v-row>
                           <p>kek</p>
                            <editor ref="authorsRulesText" :content="authorsRulesText" uniqueId="authorsRulesText"></editor>
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
                          <editor ref="englishVersionDescription" :content="englishVersionDescription" uniqueId="englishVersionDescription"></editor>
                        </v-row>
                         <v-row>
                            <editor ref="englishVersionText" :content="englishVersionText" uniqueId="englishVersionText"></editor>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat max-width="700px" max-height="2000px" class="ml-auto mr-auto mt-5 mb-10">
                        <v-row>
                          <editor ref="kazakhVersionDescription" :content="kazakhVersionDescription" uniqueId="kazakhVersionDescription"></editor>
                        </v-row>
                         <v-row>
                            <editor ref="kazakhVersionText" :content="kazakhVersionText" uniqueId="kazakhVersionText"></editor>
                        </v-row>
                    </v-card>
                </v-tab-item>
            </v-form>
        </v-tabs-items>
  </div>
</template>

<script>
import Editor from "../reusable/Editor.vue"
export default {
  name: 'PagesComponent',
  components: {
      Editor
  },
  data: () => ({
    dialog: null,
    validForm: null,
    tab: 0,
    tabs: [
        {
            title: '',
            name: 'temp'
        },
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
        mainPageText: this.$refs.mainPageText.getData(),
        authorsText: this.authorsText,
        authorsBlogText: this.authorsBlogText,
        archiveText:this.archiveText,
        authorsRulesDescription: this.$refs.authorsRulesDescription.getData(),
        authorsRulesText : this.$refs.authorsRulesText.getData(),
        othersText: this.othersText,
        englishVersionDescription: this.$refs.englishVersionDescription.getData(),
        englishVersionText: this.$refs.englishVersionText.getData(),
        kazakhVersionDescription: this.$refs.kazakhVersionDescription.getData(),
        kazakhVersionText: this.$refs.kazakhVersionText.getData(),
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