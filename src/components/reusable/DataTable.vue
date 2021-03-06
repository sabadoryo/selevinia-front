<!--eslint-disable vue/valid-v-model-->
<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            :options.sync="options"
            :server-items-length="totalItems"
            :loading="loading"
            :show-select="showSelect"
            v-model="selected"
            class="elevation-5"
            :loading-text="loadingText"
            item-key="id"
            no-results-text="Нету данных"
            no-data-text="Пока нету данных"
            :footer-props="{'items-per-page-options': [15, 30, 50, 100]}"
        >
            <template v-slot:body="props">
                <tbody>
                <tr v-for="it in props.items" v-bind:key="it.id" @click="handleRowClick(it)">
                    <td v-if="showSelect">
                        <v-simple-checkbox
                            v-model="props.isSelected(it)"
                            @input="props.select(it,!props.isSelected(it))"
                        ></v-simple-checkbox>
                    </td>
                    <td v-for="header in headers" v-bind:key="header.text">
                        <v-simple-checkbox
                            v-if="header.type==='checkbox'"
                            v-model="it[header.value]"
                        ></v-simple-checkbox>
                        <v-edit-dialog
                            v-if="header.type==='edit-number-field'"
                            :return-value.sync="it[header.value]"
                        >
                            {{ it[header.value] }}
                            <template v-slot:input>
                                <v-text-field
                                    type="number"
                                    v-model="it[header.value]"
                                    label="Проставить очередность"
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>

                        <v-edit-dialog
                            v-if="header.type==='edit-text-field'"
                            :return-value.sync="it[header.value]"
                        >
                            {{ it[header.value] }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="it[header.value]"
                                    label="Новое название"
                                    :counter="254"
                                    error-count="Не должно превышать 254"
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>

                        <v-edit-dialog
                            v-if="header.type==='edit-select-field'"
                            :return-value.sync="it[header.value]"
                            large
                            save-text="Сохранить"
                            cancel-text="Отмена"
                        >
                            {{ it[header.value] }}
                            <template v-slot:input>
                                <v-select
                                    v-model="it[header.value]"
                                    :items="header.selectItems"
                                    :label="header.selectLabel"
                                    single-line
                                    return-object
                                ></v-select>
                            </template>
                        </v-edit-dialog>

                        <v-tooltip bottom v-if="header.type==='text'">
                            <template v-slot:activator="{ on, attrs }">
                                <span v-on="on" v-bind="attrs" class="text-cut" v-if="!header.translation">
                                    {{ txt(it, header.value) }}
                                </span>
                                <span v-else>
                                    {{translation(txt(it,header.value))}}
                                </span>
                            </template>
                            <span>{{txt(it,header.value)}}</span>
                        </v-tooltip>
                        <span v-if="header.type==='date'">
                          {{txt(it,header.value) | moment('YYYY-MM-DD hh:m:s')}}
                        </span>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: "ApiDataTable",
    props: {
        headers: Array,
        loadingText: String,
        apiUrl: String,
        apiIncludes: String,
        showSelect: {
            default: true,
            type: Boolean
        },
        redirectToEditPageOnRowClick: {
            default: false,
            type: Boolean
        },
        modelName: String,
    },
    data() {
        return {
            snack: false,
            snackColor: '',
            snackText: '',
            loading: true,
            items: [],
            options: {},
            totalItems: 0,
            parentName: '',
            selected: [],
            translations: {
              "App\\Models\\Article" : "Артикль",
              "App\\Models\\Author" : "Автор",
              "App\\Models\\Rubric" : "Рубрика",
              "App\\Models\\RedBook" : "Красная книга",
              "created" : 'создан',
              "updated" : 'изменен',
              "deleted" : "удален"
            }
        }
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true,
        }
    },
    methods: {
        translation(value) {
          return this.translations[value] ? this.translations[value] : value;
        },
        getDataFromApi(search) {
            this.loading = true;
            this.apiCall(search)
                .then(res => {
                  console.log(res)
                    this.loading = false;
                    this.items = res.data.data.data;
                    this.totalItems = res.data.data.total;
                })
        },
        apiCall(search) {
            const {sortBy, sortDesc, page, itemsPerPage} = this.options
            return this.$http.get(this.apiUrl, {
                params: {
                    sort: sortBy[0] ? `${sortDesc[0] ? '-' : ''}${sortBy[0]}` : 'id',
                    sortDesc,
                    page,
                    itemsPerPage,
                    include: this.apiIncludes,
                    'filter[search]': search
                }
            });
        },
        txt(obj, key) {
            return _.get(obj, key);
        },
        handleRowClick(value) {
            if (this.redirectToEditPageOnRowClick) {
                this.$router.push(`/${this.modelName}/${value.id}`)
            }
        }
    }
}
</script>

<style scoped>
.text-cut {
    height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>