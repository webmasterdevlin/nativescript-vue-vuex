<template>
  <Page>
    <ActionBar title="NativeScript-Vue and Vuex" />
    <FlexboxLayout flexDirection="column" justifyContent="space-between">
      <ListView ~mainContent for="todo in todos" height="80%">
        <v-template>
          <Label
            :text="todo.text"
            @doubletap="onDoubleTap(todo)"
            @longpress="onLongPress(todo)"
            class="m-20"
          ></Label>
        </v-template>
      </ListView>
      <NewTodo></NewTodo>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types";
import Detail from "./Detail";
import NewTodo from "../components/NewTodo";

export default {
  name: "App",
  components: { NewTodo },
  computed: {
    ...mapGetters({
      todos: types.GETTERS_INIT_TODOS,
      isLoading: types.GETTERS_ISLOADING
    })
  },
  methods: {
    ...mapActions({
      initTodos: types.ACTION_GET_TODOS,
      removeTodo: types.ACTION_REMOVE_TODO
    }),
    onLongPress: function(todo) {
      this.removeTodo(todo);
    },
    onDoubleTap: function(todo) {
      this.$navigateTo(Detail, {
        animated: true,
        transition: {
          name: "slideLeft",
          duration: 250,
          curve: "easeIn"
        },
        props: {
          todo
        }
      });
    },
    onTap() {}
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
</style>
