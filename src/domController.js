import './appLogic.js'
import { getProjects, newProjects, addTask, getCurrentTodos } from './appLogic.js'

const openTaskDialog = document.getElementById("openTaskDialog")
const openProjectDialog = document.getElementById("openProjectDialog")

const cancelTaskBtn = document.getElementById("cancelTaskBtn") 
const cancelProjectBtn = document.getElementById("cancelProjectBtn")

const taskDialog = document.getElementById("taskDialog")
const projectDialog = document.getElementById("projectDialog")

const createTaskBtn = document.getElementById("createTaskBtn")
const createProjectBtn = document.getElementById("createProjectBtn")

const taskTitle = document.getElementById("taskTitle")
const taskDescription = document.getElementById("taskDescription")
const taskDueDate = document.getElementById("taskDueDate")
const taskPriority = document.getElementById("taskPriority")
const taskProject = document.getElementById("taskProject")
const taskNotes = document.getElementById("taskNotes")

const projectName = document.getElementById("projectName")

openTaskDialog.addEventListener("click", () => {
    taskDialog.showModal()
    renderProjectOptions()
})

openProjectDialog.addEventListener("click", () => {
    projectDialog.showModal()
})

cancelTaskBtn.addEventListener("click", () => {
    taskDialog.close()
})

cancelProjectBtn.addEventListener("click", () => {
    projectDialog.close()
})

createTaskBtn.addEventListener("click", () => {
    const newTaskTitle = taskTitle.value
    const newTaskDescription = taskDescription.value
    const newTaskDueDate = taskDueDate.value
    const newTaskPriority = taskPriority.value
    const newTaskProject = taskProject.value
    const newTaskNotes = taskNotes.value
    addTask(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, newTaskProject, newTaskNotes)
    renderTodos()
    renderProjectOptions()
})

createProjectBtn.addEventListener("click", () => {
    const newProjectName = projectName.value
    newProjects(newProjectName)
    renderProjects()
    renderProjectOptions()
})

export function renderProjects(){
    const projectList = document.getElementById("projects")
    projectList.innerHTML = ""
    getProjects().forEach((project) => {
        const newProjectLi = document.createElement("li")
        newProjectLi.className = "projects-li"
        newProjectLi.textContent = project.name

        projectList.appendChild(newProjectLi)
    })
}

export function renderTodos(){
    const todoList = document.getElementById("todo")
    todoList.innerHTML = ""
    getCurrentTodos().forEach((todo) => {
        const newTodo = document.createElement("li")
        newTodo.className = "todo-li"
        newTodo.textContent = todo.title

        todoList.appendChild(newTodo)
    })
}

export function renderProjectOptions(){
    const projectOptions = document.getElementById("taskProject")
    projectOptions.innerHTML = ""
    getProjects().forEach((project) => {
        const newProjectOption = document.createElement("option")
        newProjectOption.className = "projects-option"
        newProjectOption.textContent = project.name
        newProjectOption.value = project.name

        projectOptions.appendChild(newProjectOption)
    })
}

