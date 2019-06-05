<template>
  <StackLayout height="20%">
    <TextField
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
      @tap="onTap"
    ></Button>
  </StackLayout>
</template>

<script>
export default {
  name: "NewTodo"
};
</script>

<style scoped></style>
