<template>
  <div>
    <v-row align-content="center">
      <v-col cols="5">
         <v-btn
          color="primary"
          dark
          to="/posts/new/post"
          class="mb-3"
        >
          Создать пост
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
      api-url="/api/posts"
      ref="posts"
      modelName="posts"
      :showSelect="false"
      :redirectToEditPageOnRowClick="true"
      apiIncludes="category"
    />
  </div>
</template>

<script>
import DataTable from '../reusable/DataTable.vue'
import _ from 'lodash'
export default {
  components: { DataTable },
  name: 'PostsComponent',
  data : () => ({
    headers: [
      {
          text: 'ID',
          value: 'id',
          type: 'text'
      },
      {
          text: 'Название',
          value: 'name',
          type: 'text'
      },
      {
          text: 'Категория',
          value: 'category.name',
          type: 'text',
          sortable: false
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
    ],
    search: ''
  }),
  mounted() {
    this.$store.commit('changeHeaderTitle', 'Статьи')
  },
  methods: {
    doSearch: _.debounce(function () {
            this.$refs.posts.getDataFromApi(this.search)
        }, 500),
  }
}
</script>

<style>

</style>