<template>
  <div>
    <v-btn
      color="primary"
      class="mt-2"
      dark
      @click="$router.push({name:'submit-mailing'})"
    >
                        Совершить рассылку
    </v-btn>
    <data-table api-url="/api/subscriptions"
      loading-text="Загружаю почтовые адреса"
      :headers="headers"
      ref="mailings"
      modelName="subscription"
      :showSelect="false"
      :redirectToEditPageOnRowClick="true"
    >
    </data-table>
  </div>
</template>

<script>
import DataTable from '../reusable/DataTable.vue'
export default {
  name: 'SubscriptionsComponent',
  components: {
    DataTable
  },
  data: () => ({
  headers: [
      {
          text: 'ID',
          value: 'id',
          type: 'text'
      },
      {
          text: 'email',
          value: 'email',
          type: 'text'
      },
      {
          text: 'Добавлено',
          value: 'created_at',
          type: 'date'
      }
    ]
  }),
}
</script>

<style>

</style>