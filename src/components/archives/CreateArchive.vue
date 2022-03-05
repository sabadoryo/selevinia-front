<template>
  <div>
    <v-toolbar
            class="elevation-10">

            <v-banner>После того как вы внесли все изменения, пожалуйста сохраните их</v-banner>
            <v-spacer></v-spacer>
            <v-row class="flex-column mt-5 float-left" dense align-content="end">

                <div>
                    <v-btn color="primary" @click="saveArchive">
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
                                v-model="archive.title"
                                label="Название"
                                :rules="notEmptyRule"
                                counter="255"
                                clearable
                            ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                                v-model="archive.year"
                                label="Год"
                                :rules="notEmptyRule"
                                type="number"
                            ></v-text-field>
                        </v-row>
                        <v-row>
                             <v-text-field
                                v-model="archive.tome"
                                label="Том"
                                :rules="notEmptyRule"
                                type="number"
                            ></v-text-field>
                        </v-row>
                        <v-row>
                           <v-file-input
                            show-size
                            required
                            accept="pdf"
                            v-model="archive.document"
                            label="Докмуент"
                          ></v-file-input>
                        </v-row>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <crop-image class="mb-10"
                                ref="cropperBig"
                                :value="archive.preview_big_image_url"
                                key="big"
                                :min-crop-box-height="327"
                                :min-crop-box-width="253"
                                :dialog-max-width="1300"
                                :aspect-ratio="253/327"
                                label="Выберите картинку"
                                :rules="notEmptyRule"
                    />
                </v-tab-item>
                <v-tab-item>
                        <editor ref="editor" :content="archive.description"></editor>
                </v-tab-item>
            </v-form>
        </v-tabs-items>
  </div>
</template>

<script>
import Editor from "../reusable/Editor.vue"
import cropImage from "../reusable/CropImage.vue"

export default {
  name: 'EditArchiveComponent',
  components: {
      Editor,
      cropImage
  },
  data: () => ({
    dialog:null,
    archive: {},
    tab: 0,
    tabs: [
        {
            title: 'Основная информация',
            name: 'general-info',
            icon: 'mdi-collage'
        },
        {
            title: 'Обложка архива',
            name: 'upload-image',
            icon: 'mdi-image-plus'
        },
        {
            title: 'Описание',
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
    saveArchive() {
        console.log(this.archive)
        this.$store.commit('triggerOverlay')

        var formData = new FormData();
        this.buildFormData(formData, this.archive)
        if (this.$refs.cropperBig && this.$refs.cropperBig.croppedBlob) {
            formData.append('preview_big_image', this.$refs.cropperBig.croppedBlob)
        }

        if (this.$refs.editor.getData()) {
                formData.append('description', this.$refs.editor.getData())
        } else {
                this.$store.commit('triggerSnackbar', {
                    message: 'Заполните контент, хотя бы одним символом',
                    color: 'orange'
                })
                return;
        }

        this.$http.post(`/api/archives`, formData)
            .then(res => {
                console.log(res)
                this.$store.commit('triggerOverlay')
                this.$store.commit('triggerSnackbar', {message: 'Архив добавлен', color: 'green'})

            }).catch(err => {
                this.$store.commit('triggerOverlay')
                console.log(err)
            })
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
  },
  mounted() {
    this.$store.commit('changeHeaderTitle', 'Новый архив')
  }
}
</script>

<style>

</style>