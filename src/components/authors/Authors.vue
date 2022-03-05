<template>
  <div>
    <v-row align-content="center">
      <v-col>
        <v-btn
          color="primary"
          dark
          small
          to="/authors/new/author"
          class="mb-3"
        >
          Добавить Автора
        </v-btn>
        <v-btn
        small
          color="secondary"
          dark
          to="/authors/new/authors-excel"
          class="mb-3 ml-5"
        >
          Добавить Авторов Через Эксель
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск по любому параметру"
            @input="doSearch"
            single-line
            hide-details
            class="mb-3"
        ></v-text-field>
      </v-col>
    </v-row>
    <data-table
      :headers="headers"
      loading-text="Загрузка артиклей"
      api-url="/api/authors"
      ref="authors"
      modelName="authors"
      :showSelect="false"
      :redirectToEditPageOnRowClick="true"
    />
  </div>
</template>

<script>
import DataTable from '../reusable/DataTable.vue'
import _ from 'lodash'

export default {
  name: 'AuthorsComponent',
  components: {
    DataTable
  },
  data: () => ({
    search: '',
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
          text: 'Создано',
          value: 'created_at',
          type: 'date'
      },
      {
          text: 'Обновлено',
          value: 'updated_at',
          type: 'date'
      }
    ]
  }),
  mounted() {
    this.$store.commit('changeHeaderTitle', 'Авторы')
  },
  methods: {
    doSearch: _.debounce(function () {
            this.$refs.authors.getDataFromApi(this.search)
        }, 500),
  }
}
</script>

<style>

</style>