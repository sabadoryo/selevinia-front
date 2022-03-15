<template>
  <div>
    <v-row align-content="center">
      <v-col cols="5">
         <v-btn
          color="primary"
          dark
          to="/publications/new/publication"
          class="mb-3"
        >
          Создать новую публикацию
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
      loading-text="Загрузка публикации"
      api-url="/api/publications"
      ref="publications"
      modelName="publications"
      :showSelect="false"
      :api-includes="apiIncludes"
      :redirectToEditPageOnRowClick="true"
    />
  </div>
</template>

<script>
import DataTable from '../reusable/DataTable.vue'
import _ from 'lodash'

export default {
  name: 'PublicationsComponent',
  data: () => ({
    search: '',
    headers: [
       {
          text: 'ID',
          value: 'id',
          type: 'text'
        },
        {
          text: 'Название',
          value: 'title',
          type: 'text'
        },
        {
          text: 'Создано',
          value: 'created_at',
          type: 'date'
        },
        {
          text: 'Изменено',
          value: 'updated_at',
          type: 'date'
        },
    ],
    apiIncludes: ""
  }),
  components: {
    DataTable 
  },
  mounted() {
    this.$store.commit('changeHeaderTitle', 'Публикации')
  },
  methods: {
    doSearch: _.debounce(function () {
            this.$refs.publications.getDataFromApi(this.search)
        }, 500),
  }
}
</script>

<style>

</style>