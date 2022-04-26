<template>
  <data-table
      :headers="headers"
      loading-text="Загрузка категорий"
      api-url="/api/feedbacks"
      ref="categories"
      modelName="categories"
      :showSelect="false"
      :redirectToEditPageOnRowClick="true"
    />
</template>

<script>
import DataTable from '../reusable/DataTable.vue'
export default {
  components: {
    DataTable
  },
  name: 'FeedbacksComponent',
  data () {
    return {
      name: '',
      dialog: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          type: 'text'
        },
        {
          text: 'ФИО',
          value: 'full_name',
          type: 'text'
        },
        {
          text: 'email',
          value: 'email',
          type: 'text'
        },
        {
          text: 'Тип',
          value: 'type',
          type: 'text'
        },
        {
          text: 'Текст',
          value: 'content',
          type: 'text'
        }
      ]
    }
  }
}
</script>
