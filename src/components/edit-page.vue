<template>
    <div>
        <v-dialog v-model="dialog" fullscreen hide-overlay persistent>
            <v-toolbar height="100px" dark color="primary">
                <v-toolbar-title>Add/Edit {{entity}}</v-toolbar-title>
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

                                <v-skeleton-loader
                                    ref="skeleton"
                                    type="article"
                                    class="mx-auto"
                                ></v-skeleton-loader>

                            </div>

                            <v-form ref="editForm" v-if="!loading">

                                <slot name="_prepend" :item="item">
                                </slot>

                                <div v-for="group in groups" :key="group">

                                    <slot :name="'group.'+ group.toLowerCase().replace(' ', '-')">
                                        <h3 class="display-1 primary--text py-6 font-weight-bold">{{group}}</h3>
                                    </slot>
                                    <div v-for="field in model.fields" :key="field.value">
                                        <slot v-if="field.group.toLowerCase() == group.toLowerCase() || (field.group == '' && group == entity)" :name="field.value" :item="item" :field="field" :group="group" :rules="compileRules(field.traits)" :errors="errors" :link-items="linkItems" :label="trimPrefix(field.text, group + ' ')">
                                            <template>
                                                <div v-if="field.type == 'string'">
                                                    <div v-if="field.format == 'password'">
                                                        <v-text-field
                                                            v-model="item[field.value]"
                                                            filled
                                                            :label="trimPrefix(field.text, group + ' ')"
                                                            type="password"
                                                            @input="loading = true; loading = false;"
                                                            :required="!field.traits.includes('optional')"
                                                            :rules="compileRules(field.traits)"
                                                            :error-messages="errors[field.value]"
                                                        ></v-text-field>
                                                    </div>
                                                    <div v-else-if="field.format == 'date-time'">
                                                        <v-menu
                                                            v-model="datePicker[field.value]"
                                                            :close-on-content-click="false"
                                                            transition="scale-transition"
                                                            offset-y
                                                            max-width="290px"
                                                            min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    :value="toDate(item[field.value])"
                                                                    :label="trimPrefix(field.text, group + ' ')"
                                                                    prepend-icon="event"
                                                                    readonly
                                                                    v-bind="attrs"
                                                                    v-on="on"

                                                                    @input="loading = true; loading = false;"
                                                                    :required="!field.traits.includes('optional')"
                                                                    :rules="compileRules(field.traits)"
                                                                    :error-messages="errors[field.value]"
                                                                ></v-text-field>
                                                            </template>
                                                            <v-date-picker
                                                                v-model="item[field.value]"
                                                                no-title
                                                                @input="datePicker[field.value] = false"
                                                                :error-messages="errors[field.value]"
                                                            ></v-date-picker>
                                                        </v-menu>
                                                    </div>
                                                    <div v-else>
                                                        <v-text-field
                                                            :name="field.value"
                                                            v-model="item[field.value]"
                                                            filled
                                                            :label="trimPrefix(field.text, group + ' ')"
                                                            @input="loading = true; loading = false;"
                                                            :required="!field.traits.includes('optional')"
                                                            :rules="compileRules(field.traits)"
                                                            :error-messages="errors[field.value]"
                                                        ></v-text-field>
                                                    </div>
                                                </div>
                                                <div v-else-if="field.type == 'integer' || field.type == 'number'">
                                                    <v-text-field
                                                        type="number"
                                                        v-model.number="item[field.value]"
                                                        filled
                                                        :label="trimPrefix(field.text, group + ' ')"
                                                        @input="loading = true; loading = false;"
                                                        :required="!field.traits.includes('optional')"
                                                        :rules="compileRules(field.traits)"
                                                        :error-messages="errors[field.value]"
                                                    ></v-text-field>
                                                </div>
                                                <div v-else-if="field.type == 'boolean'">
                                                    <v-checkbox
                                                        v-model="item[field.value]"
                                                        :label="trimPrefix(field.text, group + ' ')"
                                                        :error-messages="errors[field.value]"
                                                    ></v-checkbox>
                                                </div>
                                                <div v-else-if="field.type == 'link'">
                                                    <v-select
                                                        v-model="item[field.value]"
                                                        :items="linkItems[field.value]"
                                                        item-text="name"
                                                        :item-value="field.link.field"
                                                        filled
                                                        :label="trimPrefix(field.text, group + ' ')"
                                                        :required="!field.traits.includes('optional')"
                                                        :rules="compileRules(field.traits)"
                                                        :error-messages="errors[field.value]"
                                                    >
                                                    </v-select>
                                                </div>
                                            </template>
                                        </slot>
                                    </div>

                                </div>

                                <slot name="_append" :item="item">
                                </slot>

                                <div v-if="item.id != null">

                                    <slot :item="item">
                                    </slot>

                                </div>

                                <div class="mt-8">
                                    <v-btn
                                        x-large
                                        color="green"
                                        class="white--text"
                                        block
                                        @click="save()"
                                    >
                                        <v-icon left>save</v-icon>
                                        {{ item.id ? 'Update' : 'Create' }}
                                    </v-btn>
                                    <v-btn
                                        v-if="item.id != null"
                                        x-large
                                        color="grey"
                                        class="white--text mt-4"
                                        block
                                        @click="cancel()"
                                    >
                                        Cancel
                                    </v-btn>
                                </div>
                            </v-form>
                        </v-col>
                    </v-content>

                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import {Api} from '../services/client';
import {bus} from '../main';

export default {
    props: {
        entity: String,
        "stay-open": Boolean,
    },
    data: () => ({
        dialog: false,
        loading: true,
        resolve: null,
        reject: null,
        model: null,
        datePicker: {},
        orig: {},
        item: {},
        linkItemsFilter: {},
        errors: {},

        rules: {
            required: value => !!value || 'Field may not be empty',
        },

        linkItems: {
        }
    }),
    methods: {
        toDate(value) {
            if (value) {
                return new Date(value).toISOString().slice(0, 10)
            }
            return value;
        },
        trimPrefix(text, prefix) {
            if (text.toLowerCase().startsWith(prefix.toLowerCase())) {
                return text.substr(prefix.length);
            }
            return text;
        },
        camelize(str) {
            let arr = str.split('-');
            let capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
            return capital.join("");
        },
        async loadLinkItems(field) {
            // note: if you are getting "Cannot set property 'displayField' of undefined" error then your link field name does not match the actual link model name (currently a limitation of Fluid)
            // note: link display field is hardcode to name so your link model must contain a field called 'Name' in order for this to work (currently a limitation of Fluid)
            let modelKey = this.camelize(field.link.model);
            Api[modelKey].displayField = 'name'; // todo: generate in fluid cli
            return await Api[modelKey].list(null, null, 'name', this.linkItemsFilter).then((res) => {
                if (res.status === 401) {
                    this.$router.push("/login");
                    return;
                }
                else if (res.status !== 200) {
                    bus.$emit('alert.error', res.headers.get("Message"));
                    return;
                }
                return res.json();
            }).then((body) => {
                if (field.traits.includes('optional')) {
                    body.unshift({ 'id': '', 'name': '-- none --' });
                }
                return body;
            });
        },
        compileRules(traits) {
            let flags = {
                "optional": false,
            };

            let rules = [];
            traits.forEach(function(item) {
                switch (item) {
                    case "optional":
                        flags["optional"] = true;
                        break;
                }
            });

            if (!flags["optional"]) {
                rules.push(this.rules.required);
            }

            return rules;
        },
        async open(model, item, defaults, linkItemsFilter) {
            if (!item) {
                return;
            }
            this.loading = true;
            this.dialog = true;
            this.model = model;
            this.linkItems = {};
            this.linkItemsFilter = {};
            this.errors = {};

            if (linkItemsFilter) {
                this.linkItemsFilter = linkItemsFilter;
            }

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

                if (this.model.fields[i].type === 'link') {
                    this.linkItems[this.model.fields[i].value] = await this.loadLinkItems(this.model.fields[i]);
                }

            }

            if (item.id == null) {
                this.item = { id: null }
            }

            Object.keys(item).forEach(key => {
                this.item[key] = item[key];
            });

            Object.keys(defaults).forEach(key => {
                if (!this.item[key]) {
                    this.item[key] = defaults[key];
                }
            });

            this.orig = JSON.parse(JSON.stringify(this.item));

            this.loading = false;
            this.$nextTick().then(() => {
                this.$refs.editForm.resetValidation();
            });

            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        reset() {
            this.errors = {};
            this.item = JSON.parse(JSON.stringify(this.orig));
        },
        save() {
            this.errors = {};
            if (this.item.id != null) {
                this.model.update(this.item.id, this.item).then((res) => {
                    if (res.status === 401) {
                        this.$router.push("/login");
                        return;
                    }
                    else if (res.status !== 200) {
                        if (res.status === 400) {
                            res.json().then((body) => {
                                Object.keys(body).forEach(key => {
                                    body[key] = body[key].join(', ');
                                });
                                this.errors = body;
                                this.$nextTick(() => {
                                    this.$forceUpdate();
                                });
                            });
                        }
                        bus.$emit('alert.error', res.headers.get("Message"));
                        return;
                    }
                    this.orig = JSON.parse(JSON.stringify(this.item));

                    if (!this.stayOpen) {
                        this.resolve(true);
                        this.dialog = false;
                    }
                    bus.$emit('alert.success', (this.entity ? this.entity : "Record") + " updated successfully");
                });
            } else {
                this.model.create(this.item).then((res) => {
                    if (res.status === 401) {
                        this.$router.push("/login");
                        return;
                    }
                    else if (res.status !== 200) {
                        if (res.status === 400) {
                            res.json().then((body) => {
                                Object.keys(body).forEach(key => {
                                    body[key] = body[key].join(', ');
                                });
                                this.errors = body;
                                this.$nextTick(() => {
                                    this.$forceUpdate();
                                });
                            });
                        }
                        bus.$emit('alert.error', res.headers.get("Message"));
                        return;
                    }
                    return res.json().then((body) => {
                        this.item = body;
                        this.orig = JSON.parse(JSON.stringify(this.item));

                        if (!this.stayOpen) {
                            this.resolve(true);
                            this.dialog = false;
                        }
                        bus.$emit('alert.success', (this.entity ? this.entity : "Record") + " created successfully");
                    });
                });
            }
        },
        cancel() {
            if (this.resolve) {
                this.resolve(true);
            }
            this.dialog = false;
        }
    }
}
</script>
