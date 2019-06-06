<template>
  <Page>
    <ActionBar title="NativeScript-Vue and Vuex" />
    <FlexboxLayout flexDirection="column" justifyContent="space-between">
      <ListView ~mainContent for="todo in todos" height="80%">
        <v-template>
          <Label
            :text="todo.text"
            @doubletap="onEdit(todo)"
            @longpress="onRemove(todo)"
            :class="todo.isDone === true ? 'is-done m-20' : 'not-done m-20'"
          ></Label>
        </v-template>
      </ListView>
      <NewTodo :newTodo="newTodo" @handleOnSave="onSave"></NewTodo>
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

  data() {
    return {
      newTodo: {
        text: "",
        isDone: false
      }
    };
  },
  computed: {
    ...mapGetters({
      todos: types.GETTERS_INIT_TODOS,
      isLoading: types.GETTERS_ISLOADING
    })
  },
  methods: {
    ...mapActions({
      initTodos: types.ACTION_GET_TODOS,
      saveTodo: types.ACTION_ADD_TODO,
      removeTodo: types.ACTION_REMOVE_TODO
    }),
    onRemove: function(todo) {
      this.removeTodo(todo);
    },
    onEdit: function(todo) {
      this.$showModal(Detail, {
        props: {
          todo
        }
      });
    },
    async onSave() {
      if (!this.newTodo.text) {
        alert("Please name your task");
        return;
      }
      await this.saveTodo(this.newTodo);
    }
  },

  async mounted() {
    await this.initTodos();
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}
.not-done {
  font-style: italic;
}
.is-done {
  text-decoration: line-through;
}
</style>
