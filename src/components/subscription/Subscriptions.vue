<template>
  <data-table api-url="/api/subscriptions"
                      loading-text="Загружаю почтовые адреса"
                      :headers="headers"
                      ref="mailings"
                      :showSelect="false"
        >
  </data-table>
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