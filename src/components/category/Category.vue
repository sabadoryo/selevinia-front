<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="mb-3"
        >
          Создать категорию
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Новая категория</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
          
                <v-text-field
                  label="Название"
                  required
                  v-model="name"
                ></v-text-field>
      
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialogue"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!name"
            @click="save"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <data-table
      :headers="headers"
      loading-text="Загрузка категорий"
      api-url="/api/categories"
      ref="categories"
      modelName="categories"
      :showSelect="false"
      :api-includes="apiIncludes"
      :redirectToEditPageOnRowClick="true"
    />
  </div>
</template>

<script>
import DataTable from '../reusable/DataTable.vue'

export default {
  components: { DataTable },
  name: 'CategoryComponent',
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
          text: 'Название',
          value: 'name',
          type: 'text'
        },
        {
          text: 'Количество статей редактора',
          value: 'posts_count',
          type: 'text'
        }
      ],
      apiIncludes: 'postsCount'
    }
  },
  mounted() {
    this.$store.commit('changeHeaderTitle', 'Категории')
  },
  methods: {
    closeDialogue() {
      this.dialog = false;
      this.name = ''
    },
    save() {
      this.$http.post('/api/categories', {
        name: this.name
      }).then(() => {
        this.$store.commit('triggerSnackbar', {message: "Категория создана успешно", color : "green"})
        this.$refs.categories.getDataFromApi()
        this.closeDialogue()

      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>