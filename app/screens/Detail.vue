<template>
  <Page>
    <ActionBar title="Detail Page" />
    <StackLayout>
      <TextField v-model="todo.text" :hint="todo.text" class="m-20"></TextField>
      <Button
        class="btn btn-primary"
        id="button"
        :isEnabled="!isLoading"
        text="Update"
        @tap="onSubmit"
      ></Button>
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
        this.$emit("updatedTodo", this.todo);
        this.back();
      } catch (e) {}
    },
    back() {
      this.$navigateBack();
    }
  }
};
</script>
<style scoped></style>
