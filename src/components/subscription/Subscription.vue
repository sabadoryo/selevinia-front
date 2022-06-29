<template>
    <div >
        <span></span>
        <v-btn class="delete" @click="deleteSub">Удалить</v-btn>
    </div>
</template>

<script>
    export default {
        name: "SubscriptionComponent",
        data() {
            return {}
        },
        methods: {
            deleteSub(){
              this.$http.post(`/api/subscriptions/${this.$route.params.id}/delete`).then(() => {
                this.$router.push('/subscriptions')   
              })
            }
        }
    }
</script>