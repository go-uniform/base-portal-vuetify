<template>
    <div>
        <v-container fluid>
            <confirm ref="confirm"></confirm>

            <v-content class="mx-auto pa-0">
                <v-col cols="12">
                  <v-btn fixed dark fab bottom right color="green" @click="edit()" v-if="$vuetify.breakpoint.smAndDown && !hideCreate && editCallback && mayCreate">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>

                    <v-form class="ma-auto pb-12">
                        <slot
                          v-if="!loading"
                          name="metrics"
                          :search="{search}"
                        ></slot>

                      <div v-if="!hideFilters">
                        <v-card tile outlined class="elevation-2 fill-height">
                          <v-card-text class="text-left">
                            <v-row @click="showFilter = !showFilter" dense style="cursor: pointer">
                              <v-col class="text-left" cols="9">
                                <div class="font-weight-bold text--black" style="font-size:25px; margin-top:10px;">
                                  Filter
                                </div>
                              </v-col>
                              <v-col class="text-right text-md-right" cols="3">
                                <v-btn icon v-if="!showFilter">
                                  <v-icon
                                    class="text-right text-md-right"
                                    style="margin-top:10px;"
                                    @click="showFilter = false"
                                  >
                                    mdi-menu-down
                                  </v-icon>
                                </v-btn>
                                <v-btn icon v-if="showFilter">
                                  <v-icon
                                    class="text-right text-md-right"
                                    style="margin-top:10px;"
                                    @click="showFilter = true"
                                  >
                                    mdi-menu-up
                                  </v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-text v-if="showFilter">
                            <div class="container container--fluid">
                              <slot
                                v-if="!loading"
                                name="filters"
                                :search="{search}"
                              ></slot>
                            </div>
                          </v-card-text>
                        </v-card>
                      </div>

                        <div class="container container--fluid">
                          <v-row dense>
                            <v-col class="text-center" :cols="12" sm="12" md="3">
                              <slot
                                v-if="!loading"
                                name="bulk"
                              >
                              </slot>
                            </v-col>
                            <v-col class="text-right text-md-right" :cols="12" sm="12" md="9">
                              <slot
                                v-if="!loading"
                                name="buttons"
                              >
                              </slot>
                              <v-btn
                                v-if="$vuetify.breakpoint.mdAndUp && !hideCreate && editCallback && mayCreate"
                                class="white--text mx-2"
                                color="green"
                                large
                                @click="edit()"
                              >
                                <v-icon class="mr-1">mdi-plus</v-icon>
                                <span>Add</span>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </div>

                        <slot
                            v-if="!loading"
                            name="data-table"
                            :table="{refreshing,headers,records,options,totalCount,editCallback,edit,remove}"
                        >
                            <v-data-table
                                item-key="id"
                                class="elevation-2"
                                :show-select="bulkEdit"
                                :loading="refreshing"
                                :headers="headers"
                                :items="records"
                                :options.sync="options"
                                :server-items-length="totalCount"
                                :footer-props="{'items-per-page-options': [20, 50, 100, 500, -1]}"
                                v-model="selected"
                                mobile-breakpoint="1000"
                            >
                                <template v-for="column in columns()" v-slot:[column]="{header, item, isMobile}">
                                    <slot v-if="column !== 'item.actions'" :name="column" :item="item">
                                        {{doFormat(header, item)}}
                                    </slot>
                                    <slot v-else-if="column === 'item.actions'">
                                        <slot name="actions.wrapper" :item="item" class="text-no-wrap">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn
                                                        color="primary"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        <v-icon class="mr-1">mdi-dots-vertical</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item style="display: block">
                                                        <slot name="actions" :item="item"></slot>
                                                        <slot name="actions.delete" :item="item">
                                                            <v-btn
                                                                class="ma-2"
                                                                v-if="editCallback && mayDelete"
                                                                color="error"
                                                                @click="remove(item)"
                                                                :block="isMobile"
                                                            >
                                                                <v-icon class="mr-1">mdi-delete</v-icon>
                                                                <span>Delete</span>
                                                            </v-btn>
                                                        </slot>
                                                        <slot name="actions.edit" :item="item">
                                                            <v-btn
                                                                class="ma-2"
                                                                v-if="editCallback && !hideEdit && mayEdit"
                                                                color="accent"
                                                                @click="edit(item)"
                                                                :block="isMobile"
                                                            >
                                                                <v-icon class="mr-1">mdi-pencil</v-icon>
                                                                <span>Edit</span>
                                                            </v-btn>
                                                        </slot>
                                                        <slot name="actions.view" :item="item">
                                                            <v-btn
                                                                class="ma-2"
                                                                v-if="viewCallback && mayView"
                                                                color="primary"
                                                                @click="view(item)"
                                                                :block="isMobile"
                                                            >
                                                                <v-icon class="mr-1">mdi-eye</v-icon>
                                                                <span>View</span>
                                                            </v-btn>
                                                        </slot>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </slot>
                                    </slot>
                                </template>
                            </v-data-table>
                        </slot>
                    </v-form>
                </v-col>
            </v-content>
        </v-container>
    </div>
</template>

<script>
import Confirm from "./confirm.vue";
import {bus,hasPermission} from "../main";
import moment from "moment";

export default {
    props: {
        hideActions: Boolean,
        hideCreate: Boolean,
        hideView: Boolean,
        hideEdit: Boolean,
        hideDelete: Boolean,
        hideFilters: Boolean,
        bulkEdit: Boolean,
        value: Array,
    },
    components: {
        Confirm,
    },
    watch: {
        options: {
            handler() {
                this.loadTableData();
            },
            deep: true,
        },
    },
    computed: {
        selected: {
            // getter
            get: function () {
                return this.value;
            },
            // setter
            set: function (newValue) {
                this.value = newValue;
                this.$emit('input', this.value);
            }
        }
    },
    data: () => ({
        mayCreate: true,
        mayView: true,
        mayEdit: true,
        mayDelete: true,
        showFilter: false,

        searchText: "",
        loading: true,
        refreshing: false,
        totalCount: 0,
        options: {
            itemsPerPage: 20,
            page: 1,
            sortBy: [],
            sortDesc: [],
        },
        headers: [],
        records: [],
        refreshTimer: null,
        parentId: null,
        item: {},
        viewCallback: null,
        editCallback: null,
        rootId: null,
        filters: {},
    }),
    methods: {
        doFormat(header, item) {
            let value = item[header.value];
            if (header.type === 'boolean') {
                if (value) {
                    return "Yes";
                }
                return "No";
            } else if (header.type === 'string' && header.format === 'date-time') {
                if (value) {
                    return moment(String(value)).format('YYYY-MM-DD HH:mm');
                }
            } else if (header.type === 'string' && header.format === 'date') {
                if (value) {
                    return moment(String(value)).format('YYYY-MM-DD');
                }
            } else if (header.type === 'link') {
                value = item[header.value + "_display"];
                if (!value) {
                    value = item[header.value] ? 'Unknown' : '';
                }
                return value;
            }
            return value;
        },
        columns() {
            return this.headers.map(x => {
                return 'item.'+ x.value;
            });
        },
        loadX(parentKey, parentId, model, viewCallback, editCallback, rootId, filters, hideHeaders) {
            this.viewCallback = viewCallback;
            this.load(parentKey, parentId, model, editCallback, rootId, filters, hideHeaders);
        },
        load(parentKey, parentId, model, editCallback, rootId, filters, hideHeaders) {
            this.mayCreate = hasPermission('my.'+ model.key +'.create') || hasPermission('all.'+ model.key +'.create');
            this.mayView = hasPermission('my.'+ model.key +'.read') || hasPermission('all.'+ model.key +'.read');
            this.mayEdit = hasPermission('my.'+ model.key +'.update') || hasPermission('all.'+ model.key +'.update');
            this.mayDelete = hasPermission('my.'+ model.key +'.delete') || hasPermission('all.'+ model.key +'.delete');

            if (this.value && this.value.length > 0) {
                this.selectedRows = this.value;
            } else {
                this.selectedRows = [];
            }
            this.loading = true;

            this.parentKey = parentKey;
            this.parentId = parentId;
            this.model = model;
            this.editCallback = editCallback;
            this.rootId = rootId;
            this.filters = filters;

            if (this.model.defaultSortOrder.startsWith("-")) {
                this.options.sortBy = [this.model.defaultSortOrder.substr(1)];
                this.options.sortDesc = [1];
            } else if (this.model.defaultSortOrder.startsWith("+")) {
                this.options.sortBy = [this.model.defaultSortOrder.substr(1)];
                this.options.sortDesc = [0];
            } else {
                this.options.sortBy = [this.defaultSortOrder];
                this.options.sortDesc = [0];
            }

            if (!hideHeaders) {
                hideHeaders = [];
            }
            if (this.hideActions) {
                hideHeaders.push("actions")
            }
            this.headers = JSON.parse(JSON.stringify(this.model.headers));
            this.headers.push({text: "Actions", align: "end", value: "actions", sortable: false});
            this.headers = this.headers.filter(function (header) {
                return !hideHeaders.includes(header.value);
            });

            this.loadTableData();
        },
        search() {
            this.loadTableData();
        },
        view(row) {
            if (!row) {
                row = {
                    id: null,
                };
                row[this.parentKey] = this.parentId;
            }
            this.viewCallback(row, this.rootId, this.editCallback).then((refresh) => {
                if (refresh) {
                    this.loadTableData();
                }
            });
        },
        edit(row) {
            if (!row) {
                row = {
                    id: null,
                };
                row[this.parentKey] = this.parentId;
            }
            this.editCallback(row, this.rootId).then((refresh) => {
                if (refresh) {
                    this.loadTableData();
                }
            });
        },
        remove(row) {
            this.$refs.confirm
                .open("Delete", "Are you sure?", {color: "red"})
                .then((confirm) => {
                    if (confirm) {
                        this.model.delete(row.id).then((res) => {
                            if (res.status === 401) {
                                this.$router.push("/login");
                                return;
                            } else if (res.status !== 200) {
                                bus.$emit("alert.error", res.headers.get("Message"));
                                return;
                            }
                            this.loadTableData();
                        });
                    }
                });
        },
        convertSortByToOrder(sortBy, sortDesc) {
            let orders = [];
            for (let i = 0; i < sortBy.length; i++) {
                if (sortDesc[i]) {
                    orders.push("-" + sortBy[i]);
                } else {
                    orders.push(sortBy[i]);
                }
            }
            return orders.join(",");
        },
        loadTableData() {
            bus.$emit("refresh.clear");

            if (!this.loading) {
                this.refreshing = true;
            }

            if (this.filters == null) {
                this.filters = {};
            }
            let filters = this.filters;
            filters["-text"] = this.searchText;
            filters["-show-deleted"] = false;
            if (this.parentKey != null) {
                filters[this.parentKey] = this.parentId;
            }

            this.model
                .list(
                    this.options.itemsPerPage,
                    this.options.page,
                    this.convertSortByToOrder(this.options.sortBy, this.options.sortDesc),
                    filters
                )
                .then((res) => {
                    if (res.status === 401) {
                        this.$router.push("/login");
                        return;
                    } else if (res.status !== 200) {
                        bus.$emit("alert.error", res.headers.get("Message"));
                        return;
                    }
                    this.totalCount = parseInt(res.headers.get("Record-Total-Count"));
                    return res.json();
                })
                .then((body) => {
                    this.records = body;
                })
                .finally(() => {
                    this.refreshing = false;
                    this.loading = false;
                });
        },
    },
};
</script>
