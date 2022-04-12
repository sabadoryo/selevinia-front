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
                            Вы уверены что хотите удалить этот архив?
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
                                @click="deleteArchive"
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
                          <v-btn @click="download" 
                            :disabled="archive.document === null">
                            скачать
                          </v-btn>
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

        this.$http.post(`/api/archives/${this.archive.id}?_method=PUT`, formData)
            .then(res => {
                console.log(res)
                this.$store.commit('triggerOverlay')
                this.$store.commit('triggerSnackbar', {message: 'Архив обновлен', color: 'green'})

            }).catch(err => {
                this.$store.commit('triggerOverlay')
                console.log(err)
            })
    },
    async getArchive() {
      const archiveResponse = await this.$http.get(`/api/archives/${this.$route.params.id}`)
      this.archive = archiveResponse.data.data;
      await this.$http.get(`/api/archives/${this.archive.id}/download-document`, {responseType: 'arraybuffer'})
        .then(response => {
          let blob = new Blob([response.data], { type: 'application/pdf' })
          this.archive.document = new File([blob], this.archive.original_document_name);
         
        })
      this.tab = 2;
    },
    async getBlob(url) {
      this.$http.get(url, {responseType: 'arraybuffer'})
        .then(response => {
            let blob = new Blob([response.data], { type: 'application/csv' })
            console.log(blob);
            })
        .catch(err => {
            console.log(err);
        })
    },
    download() {
      this.$http.get(`/api/archives/${this.archive.id}/download-document`, {responseType: 'arraybuffer'})
          .then(response => {
              let blob = new Blob([response.data], { type: 'application/pdf' })
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = this.archive.original_document_name;
              link.click()
              this.downloadLoader = false;
              this.$store.commit('triggerSnackbar', {message: 'Успех!', color: 'green'})
          })
          .catch(err => {
              this.downloadLoader = false;
              this.$store.commit('triggerSnackbar', {message: 'Ошибка', color: 'red'})
              console.log(err);
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
    deleteArchive() {
        this.$store.commit('triggerOverlay');

        this.$http.delete(`/api/archives/${this.archive.id}`)
            .then(() => {
                this.$store.commit('triggerOverlay');
                this.$store.commit('triggerSnackbar', {message:"Удалено", color: "green"})
                this.$router.push('/archives')
            })
            .catch(err => {
                this.$store.commit('triggerSnackbar', {message:err.message, color: "red"})
                console.log(err)
            })
    }
  },
  async mounted() {
    this.$store.commit('triggerOverlay')
    await this.getArchive();
    this.$store.commit('triggerOverlay')
  }
}
</script>

<style>

</style>