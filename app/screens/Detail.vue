<template>
  <Page>
    <ActionBar title="Detail Page" />
    <StackLayout>
      <FlexboxLayout
        class="m-20"
        flexDirection="row"
        justifyContent="space-between"
      >
        <TextField
          v-model="todo.text"
          width="90%"
          :hint="todo.text"
        ></TextField>
        <Switch
          :checked="todo.isDone"
          @checkedChange="todo.isDone = !todo.isDone"
        ></Switch>
      </FlexboxLayout>
      <Button
        class="btn btn-primary"
        id="update"
        :isEnabled="!isLoading"
        text="Update"
        @tap="onSubmit"
      ></Button>
      <Button id="cancel" text="Cancel" @tap="onCancel"></Button>
    </StackLayout>
  </Page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "../store/types";

export default {
  props: ["todo"], // Getting the todo object passed from the previous page
  name: "Detail",

  computed: {
    ...mapGetters({
      isLoading: types.GETTERS_ISLOADING
    })
  },
  methods: {
    ...mapActions({
      initTodo: types.ACTION_GET_TODO,
      updateTodo: types.ACTION_UPDATE_TODO
    }),
    async onSubmit() {
      try {
        await this.updateTodo(this.todo);
        this.$modal.close();
      } catch (e) {
        alert(`${e.message}: Please try again.`);
      }
    },
    onCancel() {
      this.$modal.close();
    }
  }
};
</script>
<style scoped></style>
