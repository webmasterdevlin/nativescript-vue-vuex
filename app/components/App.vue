<template>
  <Page>
    <ActionBar title="NativeScript-Vue and Vuex" />
    <GridLayout columns="*" rows="*">
      <ListView ~mainContent for="todo in todos">
        <v-template>
          <Label :text="todo.text"></Label>
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types";

export default {
  computed: {
    ...mapGetters({
      todos: types.GETTERS_INIT_TODOS
    })
  },
  methods: {
    ...mapActions({
      initTodos: types.ACTION_GET_TODOS
    })
  },

  mounted() {
    this.initTodos();
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
