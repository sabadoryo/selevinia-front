<!-- eslint-disable no-undef -->
<template>
 <textarea :name="uniqueId"></textarea>
</template>

<script>
export default {
    name: "EditorComponent",
    props: {
        content: String,
        uniqueId: {
            default: 'editor111'
        }
    },
    mounted() {
        // eslint-disable-next-line no-undef
        CKEDITOR.config.language = 'ru'
        // eslint-disable-next-line no-undef
        CKEDITOR.config.height = '500px'
        // eslint-disable-next-line no-undef
        CKEDITOR.config.extraPlugins = 'uploadimage'
        // eslint-disable-next-line no-undef
        CKEDITOR.config.imageUploadUrl = `${this.$http.defaults.baseURL}/api/posts/upload-temp-image`
        // eslint-disable-next-line no-undef
        CKEDITOR.replace( this.uniqueId );
        console.log(this.content)
        // eslint-disable-next-line no-undef
        CKEDITOR.instances[this.uniqueId].setData(this.content)
    },
    methods: {
      getData() {
        // eslint-disable-next-line no-undef
        return CKEDITOR.instances[this.uniqueId].getData()
      }
    }
}
</script>

<style scoped>
</style>