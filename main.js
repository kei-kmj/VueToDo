const todos = [
  {
    id: '',
    done: false,
    title: '',
    content: ''
  }
]

const todoData = {
  appName: 'TODOアプリ',
  todos,
  done: false,
  edit: 0,
  title: '',
  content: ''
}

const app = Vue.createApp({
  data() {
    return todoData
  },
  created() {
    this.loadTodos()
  },

  methods: {
    switchTodo: function () {
      this.done = !this.done
      this.saveTodos()
    },

    createTodo: function () {
      this.done = false
      const today = Date.now()
      const todo = {
        id: today,
        done: false,
        title: this.title.trim() === "" ? '(未入力)' : this.title,
        content: this.content
      }
      if (!this.content) {
        window.alert('内容を入力してください')
      } else {
        this.todos.push(todo)
        this.saveTodos()
      }
    },

    loadTodos: function () {
      const json = localStorage.getItem('todo')
      if (json != null) this.todos = JSON.parse(json)
    },

    saveTodos: function () {
      const json = JSON.stringify(this.todos)
      localStorage.setItem('todo', json)
      this.dataReset()
    },

    changeTodo: function (id) {
      console.log('changeTodo:' + id)
      this.todos.forEach(todo => {
        if (todo.id === id) todo.done = !todo.done
        this.saveTodos()
      })
    },
    editTodo: function (id) {
      this.edit = id
    },

    deleteTodo: function (id) {
      this.todos = this.todos.filter(todo => {
        return todo.id !== id
      })
      this.saveTodos()
    },

    dataReset: function () {
      this.title = null
      this.content = null
    }

  },
  computed: {
    getTodos() {
      const extractTodos = this.todos.filter(todo => {
        return this.done === todo.done
      })
      extractTodos.sort(function (a, b) {
        return b.id - a.id
      })
      return extractTodos
    }
  }
})
app.mount('#app')
