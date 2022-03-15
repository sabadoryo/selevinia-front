<template>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Selevinia
          </v-list-item-title>
          <v-list-item-subtitle>
            
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
                 <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppSidebar',
  data () {
    return {
      items : [
        {
          title: 'Главная',
          icon : 'mdi-view-dashboard',
          link : '/'
        },
        {
          title : 'Категории',
          icon: 'mdi-format-list-bulleted',
          link :'/categories'
        },
        {
          title: 'Статья',
          icon: 'mdi-post-outline',
          link: '/posts'
        },
        {
          title: 'Архив',
          icon: 'mdi-archive-outline',
          link: '/archives'  
        },
        {
          title: 'Другие публикации',
          icon: 'mdi-archive-outline',
          link: '/publications'  
        },
        {
          title: 'Авторы',
          icon: 'mdi-human-edit',
          link: '/authors',
        },
        {
          title: 'Рассылка',
          icon: 'mdi-email',
          link: '/subscriptions',
        },
        {
          title: 'Страницы',
          icon: 'mdi-newspaper-variant-outline',
          link: '/pages',
        }
      ]
    }
  }

}
</script>
