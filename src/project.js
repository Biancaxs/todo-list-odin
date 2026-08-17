export function project(name){
    return{
        name: name,
        todos: [],

        addTodo(todo){
            this.todos.push(todo)
        },

        removeTodo(index){
            this.todos.splice(index, 1)
        }
    }
}