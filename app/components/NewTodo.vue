<template>
  <StackLayout height="20%">
    <TextField
      v-model="newTodo.text"
      hint="write a task here"
      returnKeyType="done"
      autocorrect="false"
      maxLength="55"
      class="input input-border m-20"
    ></TextField>

    <Button
      class="btn btn-primary"
      id="button"
      text="Add"
      @tap="onSave"
    ></Button>
  </StackLayout>
</template>

<script>
export default {
  name: "NewTodo",
  props: {
    newTodo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSave() {
      this.$emit("handleOnSave"); // triggers the method of the container (parent)
    }
  }
};
</script>

<style scoped></style>
