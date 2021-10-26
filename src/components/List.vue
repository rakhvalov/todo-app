<template>
  <div class="todo-area">
    <div class="main-title">
      <input
        type="text"
        :value="documentTitle"
        @keyup="changeDocumentTitle($event.target.value)"
        @keypress.enter="$event.target.blur()"
      />
    </div>
    <div class="todo-area__header">
      <div class="filter-area">
        <button class="filter-btn" @click="filterVisible = !filterVisible">
          Фильтр
        </button>
        <ul class="filter-by-status" v-if="filterVisible">
          <li
            :class="{ active: filterStatus === 'all' }"
            @click="selectStatus('all')"
          >
            Все
          </li>
          <li
            :class="{ active: filterStatus === 'done' }"
            @click="selectStatus('done')"
          >
            Выполненные
          </li>
          <li
            :class="{ active: filterStatus === 'not' }"
            @click="selectStatus('not')"
          >
            Невыполненные
          </li>
        </ul>
      </div>
      <Search @search="searchValue = $event" />
    </div>

    <div class="todo-list">
      <Todo
        v-for="todo in filteredList"
        :todo="todo"
        :key="todo.id + todo.active"
        @updateTodo="updateTodo"
      />
    </div>

    <div class="todo-list__bottom">
      <input
        autofocus
        type="text"
        placeholder="Попробуй что-нибудь написать..."
        ref="mainInput"
        v-model="value"
        @keypress.enter="createNewTask"
      />
      <button class="plus-button" @click="createNewTask" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "./Todo";
import Search from "./Search";
import global from "../../mixins/global";

export default {
  components: { Todo, Search },

  computed: {
    ...mapGetters({
      todoList: "getTodos",
    }),

    filteredList() {
      if (!this.searchValue.length) return this.filterByStatus(this.todoList);

      return this.filterByStatus(this.filter(this.todoList, this.searchValue));
    },

    documentTitle() {
      return window.document.title;
    },
  },

  data: () => ({
    value: "",
    searchValue: "",
    filterStatus: "all",
    filterVisible: false,
  }),

  mixins: [global],

  methods: {
    createNewTask() {
      if (!this.value.length) {
        this.$refs.mainInput.focus();
        return;
      }

      this.$store.dispatch("createTodo", {
        id: this.generateID(),
        title: this.value,
        timestamp: new Date().toLocaleString(),
        active: false,
      });

      this.value = "";
    },

    updateTodo(data) {
      this.$store.dispatch("updateTodo", data);
      this.$forceUpdate();
    },

    filter(array, keyword) {
      return array.filter((el) => {
        if (el.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
          return el;
        else return false;
      });
    },

    selectStatus(status) {
      this.filterStatus = status;
      localStorage.setItem("filterStatus", status);
    },

    filterByStatus(array) {
      if (this.filterStatus === "all") return array;

      const status = this.filterStatus === "done";

      return array.filter((el) => el.active === status);
    },
  },

  mounted() {
    const status = localStorage.getItem("filterStatus");
    if (status) this.filterStatus = status;
    this.$store.dispatch("loadTodo");
  },

  created() {
    this.getTitle();
  },
};
</script>

<style lang="scss" scoped>
.todo-area {
  margin-top: 46px;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    z-index: 2;
  }
}

.todo-list {
  overflow: auto;
  height: 50vh;

  &__bottom {
    position: relative;
    background: #09333d;
    box-shadow: 4px 0 16px rgba(178, 178, 178, 0.08),
      1px 0 2px rgba(178, 178, 178, 0.05);
    border-radius: 4px;
    font-size: 14px;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #ffffff;
    margin-top: 10px;

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
}

.plus-button {
  width: 32px;
  height: 32px;
  background-color: transparent;
  background-image: url("~@/assets/images/plus.svg");
  background-repeat: no-repeat;
  background-size: contain;
  outline: 0;
  border: 0;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.6;

  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 1;
  }

  &:active {
    transition: all 0.2s ease-in-out;
    opacity: 0.85;
  }
}

.filter-btn {
  background: rgba(#00a49d, 0.9);
  border-radius: 4px;
  outline: none;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  padding: 10px 48px 10px 14px;
  position: absolute;
  right: 15px;
  top: 8px;
  z-index: 2;
  transition: background 0.2s ease-in-out;

  &:active {
    transition: background 0.2s ease-in-out;
    opacity: 0.9;
  }

  &::after {
    content: "";
    mask-image: url("~@/assets/images/filter-icon.svg");
    background-color: rgba(#fff, 0.8);
    position: absolute;
    right: 10px;
    top: 8px;
    width: 20px;
    height: 20px;
  }
}

.filter-by-status {
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  bottom: -82px;
  z-index: 3;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 4px 0 16px rgba(178, 178, 178, 0.08),
    1px 0 2px rgba(178, 178, 178, 0.05);

  li {
    list-style: none;
    padding: 5px 10px;
    font-size: 15px;
    color: #191b1d;
    cursor: pointer;

    &:first-child {
      border-radius: 4px 4px 0 0;
    }

    &:last-child {
      border-radius: 0 0 4px 4px;
    }

    &:hover {
      background: rgba(0, 140, 221, 0.1);
    }

    &.active {
      background: rgba(0, 140, 221, 0.1);
    }
  }
}

.main-title {
  input {
    font-size: 24px;
    font-weight: bold;
    background-color: transparent;
    border: 0;
    outline: none;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
