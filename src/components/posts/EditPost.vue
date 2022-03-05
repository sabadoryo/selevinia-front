<template>
  <div>
    <v-toolbar
            class="elevation-10">

            <v-banner>После того как вы внесли все изменения, пожалуйста сохраните их</v-banner>
            <v-spacer></v-spacer>
            <v-row class="flex-column mt-5 float-left" dense align-content="end">

                <div>
                    <v-btn color="primary" @click="savePost">
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
                            Вы уверены что хотите удалить этот пост?
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
                                @click="deletePost"
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
                                v-model="post.name"
                                label="Название"
                                :rules="notEmptyRule"
                                counter="255"
                                clearable
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-select v-model="post.category_id"
                                      :items="categories"
                                      item-text="name"
                                      item-value="id"
                                      label="Категория"
                                      required
                            >
                            </v-select>
                        </v-row>
                        <v-row>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <crop-image class="mb-10"
                                ref="cropperBig"
                                :value="post.preview_big_image_url"
                                key="big"
                                :min-crop-box-height="456"
                                :min-crop-box-width="658"
                                :dialog-max-width="1300"
                                :aspect-ratio="658/456"
                                label="Выберите картинку"
                                :rules="notEmptyRule"
                    />
                </v-tab-item>
                <v-tab-item>
                        <editor ref="editor" :content="post.content"></editor>
                </v-tab-item>
            </v-form>
        </v-tabs-items>
  </div>
</template>

<script>
import Editor from "../reusable/Editor.vue"
import cropImage from "../reusable/CropImage.vue"

export default {
  name: 'EditPostComponent',
  components: {
      Editor,
      cropImage
  },
  data: () => ({
    dialog:null,
    post: {},
    categories: [],
    tab: 0,
    tabs: [
        {
            title: 'Основная информация',
            name: 'general-info',
            icon: 'mdi-collage'
        },
        {
            title: 'Обложка поста',
            name: 'upload-image',
            icon: 'mdi-image-plus'
        },
        {
            title: 'Контент',
            name: 'content',
            icon: 'mdi-content-copy'
        }
    ],
    notEmptyRule: [
              v => !!v || 'Обязательное поле',
    ],
    validForm: false,
  }),
  methods: {
    savePost() {
        this.$store.commit('triggerOverlay')

        var formData = new FormData();
        this.buildFormData(formData, this.post)
        if (this.$refs.cropperBig && this.$refs.cropperBig.croppedBlob) {
            formData.append('preview_big_image', this.$refs.cropperBig.croppedBlob)
        }

        if (this.$refs.editor.getData()) {
                formData.append('content', this.$refs.editor.getData())
        } else {
                this.$store.commit('triggerSnackbar', {
                    message: 'Заполните контент, хотя бы одним символом',
                    color: 'orange'
                })
                return;
        }

        this.$http.post(`/api/posts/${this.post.id}?_method=PUT`, formData)
            .then(res => {
                console.log(res)
                this.$store.commit('triggerOverlay')
            }).catch(err => {
                this.$store.commit('triggerOverlay')
                console.log(err)
            })
    },
    async getPost() {
      const postResponse = await this.$http.get(`/api/posts/${this.$route.params.id}`)

      this.post = postResponse.data.data;
      this.tab = 2;
    },
    async getCategories() {
      const categoriesResponse = await this.$http.get(`/api/categories?itemsPerPage=100000`)
      
      this.categories = categoriesResponse.data.data.data;
    },
    buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;
                formData.append(parentKey, value);
            }
        },
    deletePost() {
        this.$store.commit('triggerOverlay');

        this.$http.delete(`/api/posts/${this.post.id}`)
            .then(() => {
                this.$store.commit('triggerOverlay');
                this.$store.commit('triggerSnackbar', {message:"Удалено", color: "green"})
                this.$router.push('/posts')
            })
            .catch(err => {
                this.$store.commit('triggerSnackbar', {message:err.message, color: "red"})
                console.log(err)
            })
    }
  },
  async mounted() {
    this.$store.commit('triggerOverlay')
    await this.getPost();
    await this.getCategories();
    this.$store.commit('triggerOverlay')
  }
}
</script>

<style>

</style>