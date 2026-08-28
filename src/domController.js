import './appLogic.js'
import { getProjects, newProjects, addTask, getCurrentTodos, deleteTask, deleteProject, toggleTaskStatus, editTask, getCurrentProjectName } from './appLogic.js'

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

let currentlyEditingIndex = null

openTaskDialog.addEventListener("click", () => {
    currentlyEditingIndex = null

    taskTitle.value = ""
    taskDescription.value = ""
    taskNotes.value = ""
    taskPriority.value = "low"

    taskDialog.showModal()
    renderProjectOptions()
    setDefaultDate()
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

    if (currentlyEditingIndex === null) {
        addTask(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, newTaskProject, newTaskNotes)
    } else {
        editTask(currentlyEditingIndex, newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, newTaskNotes)
        currentlyEditingIndex = null
    }

    taskDialog.close()
    renderTodos()
})

createProjectBtn.addEventListener("click", () => {
    const newProjectName = projectName.value
    newProjects(newProjectName)
    projectName.value = ""
    projectDialog.close()
    renderProjects()
    renderProjectOptions()
    renderTodos()
})

export function renderProjects(){
    const projectList = document.getElementById("projects")
    projectList.innerHTML = ""
    getProjects().forEach((project, index) => {
        const newProjectLi = document.createElement("li")
        newProjectLi.className = "projects-li"
        newProjectLi.textContent = project.name

        if (project.name !== "Standard"){
            const deleteProjectBtn = document.createElement("button")
            deleteProjectBtn.className = "delete-project-btn"
            deleteProjectBtn.textContent = "Delete"
            deleteProjectBtn.dataset.index = index

            deleteProjectBtn.addEventListener("click", (e) => {
                const projectIndex = e.target.dataset.index
                
                deleteProject(projectIndex)
                renderTodos()
                renderProjects()
                renderProjectOptions()
            })
            newProjectLi.appendChild(deleteProjectBtn)
        }

        projectList.appendChild(newProjectLi)
    })
}

export function renderTodos(){
    const todoList = document.getElementById("todo")
    todoList.innerHTML = ""
    getCurrentTodos().forEach((todo, index) => {
        const newTodo = document.createElement("li")
        newTodo.className = "todo-li"
        const taskText = document.createElement("span")
        taskText.textContent = todo.title
        newTodo.appendChild(taskText)

        const deleteTaskBtn = document.createElement("button")
        deleteTaskBtn.className = "delete-task-btn"
        deleteTaskBtn.textContent = "Delete"
        deleteTaskBtn.dataset.index = index

        deleteTaskBtn.addEventListener("click", (e) => {
            const taskIndex = e.target.dataset.index
            
            deleteTask(taskIndex)
            renderTodos()
        })

        const toggleBtn = document.createElement("input")
        toggleBtn.type = "checkbox"
        toggleBtn.classList = "todo-checkbox"

        toggleBtn.checked = todo.isComplete

        if (todo.isComplete) {
            newTodo.classList.add("completed")
        }

        toggleBtn.addEventListener("change", () => {
            toggleTaskStatus(index)
            renderTodos()
        })

        const editTaskBtn = document.createElement("button")
        editTaskBtn.className = "edit-task-btn"
        editTaskBtn.textContent = "Edit"

        editTaskBtn.addEventListener("click", () => {
            currentlyEditingIndex = index
            
            taskTitle.value = todo.title
            taskDescription.value = todo.description
            taskDueDate.value = todo.dueDate
            taskPriority.value = todo.priority
            taskProject.value = getCurrentProjectName()
            taskNotes.value = todo.notes

            taskDialog.showModal()
            renderTodos()
        })

        newTodo.appendChild(toggleBtn)
        newTodo.appendChild(editTaskBtn)
        newTodo.appendChild(deleteTaskBtn)
        todoList.appendChild(newTodo)
    })
}

export function renderProjectOptions(){
    const projectOptions = document.getElementById("taskProject")
    projectOptions.innerHTML = ""
    getProjects().forEach((project, index) => {
        const newProjectOption = document.createElement("option")
        newProjectOption.className = "projects-option"
        newProjectOption.textContent = project.name
        newProjectOption.value = project.name

        projectOptions.appendChild(newProjectOption)
    })
}

export function setDefaultDate(){
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")

    taskDueDate.value = `${year}-${month}-${day}`
}