<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-select
                v-model="post"
                :items="posts"
                item-text="name"
                item-value="id"
                persistent-hint
                return-object
                @change="postSelected"
                single-line
                :rules="[v => !!v || 'Выберите статью']"
                label="Пост"
                required
            ></v-select>

            <v-text-field
                v-model="title"
                :counter="100"
                label="Заголовок"
                required
            ></v-text-field>

            <v-text-field
                v-model="body"
                :counter="254"
                :rules="[v => !!v || 'Обязательное поле']"
                label="Описание"
                required
            ></v-text-field>

            <v-text-field
                v-model="subject"
                :counter="100"
                :rules="[v => !!v || 'Обязательное поле']"
                label="Титул"
                required
            ></v-text-field>

            <v-btn v-if="!loading" class="success" text @click="submitMailing">
                Отправить рассылку
            </v-btn>
            <v-progress-circular
                v-if="loading"
                :width="3"
                color="green"
                indeterminate
            ></v-progress-circular>
        </v-form>
    </div>
</template>

<script>
export default {
    name: "SubmitMailing",
    mounted() {
        this.$store.commit('changeHeaderTitle', 'Отправка рассылки')
        this.getPosts()
    },
    data() {
        return {
            valid: null,
            loading: false,
            title: '',
            body: '',
            post: '',
            posts: [],
            subject: 'Selevenia рекомендует к чтению'
        }
    },
    methods: {
        getPosts() {
            this.$http.get('/api/posts?itemsPerPage=10000000')
                .then(res => {
                    this.posts = res.data.data.data;
                })
        },
        submitMailing() {
            this.$refs.form.validate()
            if (!this.valid) return;

            this.loading = true;

            this.$http.post('/api/subscriptions/send-mailing', {
                post: this.post,
                body: this.body,
                title: this.title,
                subject: this.subject
            }).then(() => {
                this.loading = false;
                this.$store.commit('triggerSnackbar', {text: 'Рассылка отправлена успешно!', color: 'green'})
            })
        },
        postSelected() {
            this.title = this.post.title;
        }
    }
}
</script>

<style scoped>

</style>
