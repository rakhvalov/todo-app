<template>
  <div :class="['todo-item', { active: todo.active }]">
    <div class="checkbox">
      <input
        type="checkbox"
        :id="`todo-${todo.id}`"
        :checked="todo.active"
        @change="update({ active: $event.target.checked })"
      />
      <label :for="`todo-${todo.id}`"></label>
    </div>

    <input
      ref="inputTitle"
      type="text"
      :value="todo.title"
      @keypress.enter="
        update({
          title: $event.target.value,
        })
      "
    />

    <button
      class="remove-button"
      @click="$store.dispatch('removeTodo', todo)"
    />
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    update(variable) {
      this.$emit("updateTodo", {
        id: this.todo.id,
        ...variable,
      });
      this.$refs.inputTitle.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  position: relative;
  background: #ffffff;
  box-shadow: 4px 0 16px rgba(178, 178, 178, 0.08),
    1px 0 2px rgba(178, 178, 178, 0.05);
  border-radius: 4px;
  padding: 13px 24px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #191b1d;

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    background: rgba(0, 164, 157, 0.05);
    box-shadow: 4px 0px 16px rgba(178, 178, 178, 0.08),
      1px 0px 2px rgba(178, 178, 178, 0.05);
  }

  input {
    background: transparent;
    border: 0;
    outline: 0;
    width: 100%;
    max-width: 500px;
    font-size: 20px;
    color: inherit;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color 0.2s ease-in-out;
    padding-right: 20px;
    &:focus {
      border-bottom-color: rgba(#00a49d, 0.5);
      transition: border-bottom-color 0.2s ease-in-out;
    }
  }

  &:hover {
    & > .remove-button {
      display: block;
      transition: all 0.2s ease-in-out;
    }
  }
}

.remove-button {
  display: none;
  background-image: url("~@/assets/images/close-icon.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 15px;
  top: 14px;
  transition: all 0.2s ease-in-out;
}

.checkbox {
  margin-right: 50px;
}

// checkbox
input[type="checkbox"]:checked,
input[type="checkbox"]:not(:checked),
input[type="radio"]:checked,
input[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}

input[type="checkbox"]:checked + label,
input[type="checkbox"]:not(:checked) + label,
input[type="radio"]:checked + label,
input[type="radio"]:not(:checked) + label {
  display: inline-block;
  position: relative;
  padding-left: 0px;
  line-height: 16px;
  cursor: pointer;
}

input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before,
input[type="radio"]:checked + label:before,
input[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: -22px;
  width: 34px;
  height: 34px;
  background-image: url("~@/assets/images/cb-not-active.svg");
  background-repeat: no-repeat;
  background-size: contain;
}

input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before {
  border-radius: 2px;
}

input[type="radio"]:checked + label:before,
input[type="radio"]:not(:checked) + label:before {
  border-radius: 100%;
}

input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after,
input[type="radio"]:checked + label:after,
input[type="radio"]:not(:checked) + label:after {
  content: "";
  position: absolute;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after {
  left: 0;
  top: -22px;
  width: 34px;
  height: 34px;
  background-image: url("~@/assets/images/cb-active.svg");
  background-repeat: no-repeat;
  background-size: contain;
}

input[type="radio"]:checked + label:after,
input[type="radio"]:not(:checked) + label:after {
  left: 5px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #e145a3;
}

input[type="checkbox"]:not(:checked) + label:after,
input[type="radio"]:not(:checked) + label:after {
  opacity: 0;
}

input[type="checkbox"]:checked + label:after,
input[type="radio"]:checked + label:after {
  opacity: 1;
}
</style>
