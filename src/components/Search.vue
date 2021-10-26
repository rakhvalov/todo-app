<template>
  <div class="search">
    <input
      type="text"
      placeholder="Кто ищет, тот найдёт..."
      @keyup="$emit('search', $event.target.value)"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  background: #09333d;
  box-shadow: 4px 0px 16px rgba(178, 178, 178, 0.08),
    1px 0px 2px rgba(178, 178, 178, 0.05);
  border-radius: 4px;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #ffffff;
  width: 100%;
  input {
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    outline: 0;
    color: #fff;
    padding: 0 15px;
    min-height: 51px;

    &::placeholder {
      color: rgba(#fff, 0.7);
      transition: color 0.2s ease-in-out;
    }

    &:focus {
      &::placeholder {
        transition: color 0.2s ease-in-out;
        color: rgba(#fff, 0.3);
      }
    }
  }
}
</style>
