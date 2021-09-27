<template>
    <div>
        <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
            <v-toolbar height="100px" dark color="primary">
                <v-toolbar-title>View {{entity}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark v-on:click="cancel()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card>
                <v-card-text>
                    <v-content class="mx-auto pa-0">
                        <v-col cols="12">
                            <div v-if="loading">
                                <v-skeleton-loader ref="skeleton" type="article" class="mx-auto"></v-skeleton-loader>
                            </div>

                            <div v-if="!loading">
                                <slot name="view" :item="item">

                                    <slot name="_prepend" :item="item"></slot>

                                    <v-row v-for="group in groups" :key="group" no-gutters>

                                        <slot :name="'group.'+ group.toLowerCase().replace(' ', '-')">
                                            <v-col cols="12">
                                                <h3 class="display-1 primary--text py-6 font-weight-bold">{{group}}</h3>
                                            </v-col>
                                        </slot>
                                        <v-col v-for="field in model.fields" :key="field.value" class="pr-sm-2" cols="12" sm="6" lg="4" xl="3">
                                            <slot v-if="field.group.toLowerCase() == group.toLowerCase() || (field.group == '' && group == entity)" :name="field.value" :item="item" :field="field" :group="group">
                                                <v-text-field
                                                    :value="item[field.value]"
                                                    filled
                                                    readonly
                                                    :label="trimPrefix(field.text, group + ' ')"
                                                ></v-text-field>
                                            </slot>
                                        </v-col>

                                    </v-row>

                                    <slot name="_append" :item="item">
                                        <div class="pa-12">
                                            <hr>
                                        </div>
                                    </slot>

                                    <slot name="actions.edit" :item="item">
                                        <v-row no-gutters>
                                            <v-col cols="12" class="text-center" md="3" lg="4">
                                            </v-col>
                                            <v-col cols="12" class="text-center" md="6" lg="4">
                                                <v-btn
                                                    class="my-2"
                                                    x-large
                                                    v-if="editCallback"
                                                    color="accent"
                                                    @click="edit(item)"
                                                    block
                                                >
                                                    <v-icon class="mr-1">mdi-pencil</v-icon>
                                                    <span>Edit</span>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="12" class="text-center" md="3" lg="4">
                                            </v-col>
                                        </v-row>
                                    </slot>
                                    <slot name="actions.delete" :item="item">
                                        <v-row no-gutters>
                                            <v-col cols="12" md="3" lg="4">
                                            </v-col>
                                            <v-col cols="12" md="6" lg="4">
                                                <v-btn
                                                    class="my-2"
                                                    x-large
                                                    v-if="editCallback"
                                                    color="error"
                                                    @click="remove(item)"
                                                    block
                                                >
                                                    <v-icon class="mr-1">mdi-delete</v-icon>
                                                    <span>Delete</span>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="12" md="3" lg="4">
                                            </v-col>
                                        </v-row>
                                    </slot>

                                </slot>
                            </div>
                        </v-col>
                    </v-content>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { bus } from "@/main";

export default {
    props: {
        entity: String,
    },
    data: () => ({
        dialog: false,
        loading: true,
        resolve: null,
        model: null,
        item: {},
        editCallback: null,
    }),
    methods: {
        trimPrefix(text, prefix) {
            if (text.toLowerCase().startsWith(prefix.toLowerCase())) {
                return text.substr(prefix.length);
            }
            return text;
        },
        async open(model, item, editCallback) {
            if (!item) {
                return;
            }
            this.loading = true;
            this.dialog = true;
            this.model = model;
            this.editCallback = editCallback;

            model
                .read(item.id)
                .then((res) => {
                    if (res.status === 401) {
                        this.$router.push("/login");
                        return;
                    }
                    else if (res.status !== 200) {
                        bus.$emit("alert.error", res.headers.get("Message"));
                        return;
                    }
                    return res.json();
                })
                .then((body) => {
                    this.item = body;

                    // todo: make grouping more efficient (this feels very dirty)
                    this.groups = [];
                    if (this.model.fields.length <= 0) {
                        this.groups = [this.entity];
                    }
                    for (let i = 0; i < this.model.fields.length; i++) {

                        let group = this.model.fields[i].group;
                        if (group.length <= 0) {
                            group = this.entity;
                        }
                        if (group !== null && group !== undefined && group.length > 0 && !this.groups.includes(group)) {
                            this.groups.push(group);
                        }
                    }

                    if (item.id == null) {
                        this.item = { id: null }
                    }

                    Object.keys(item).forEach(key => {
                        this.item[key] = item[key];
                    });

                    this.loading = false;
                })
                .catch(() => {
                    bus.$emit("alert.error", "Server unreachable");
                })
                .finally(() => {
                    this.loading = false;
                });
            return new Promise((resolve) => {
                this.resolve = resolve;
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
        cancel() {
            if (this.resolve) {
                this.resolve(true);
            }
            this.dialog = false;
        },
    },
};
</script>
