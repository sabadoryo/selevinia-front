<template>
  <div>
    <v-row align-content="center">
      <v-col cols="5">
         <v-btn
          color="primary"
          dark
          to="/archives/new/archive"
          class="mb-3"
        >
          Создать архив
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
      loading-text="Загрузка архивов"
      api-url="/api/archives"
      ref="archives"
      modelName="archives"
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
  name: 'ArchivesComponent',
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
          text: 'Год',
          value: 'year',
          type: 'text'
        },
        {
          text: 'Том',
          value: 'tome',
          type: 'text',
          sortable: false,
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
    this.$store.commit('changeHeaderTitle', 'Архивы')
  },
  methods: {
    doSearch: _.debounce(function () {
            this.$refs.archives.getDataFromApi(this.search)
        }, 500),
  }
}
</script>

<style>

</style>