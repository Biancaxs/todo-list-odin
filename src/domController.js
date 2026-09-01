import './appLogic.js'
import { getProjects, newProjects, addTask, getCurrentTodos, deleteTask, deleteProject, toggleTaskStatus, editTask, getCurrentProjectName, selectProject, getCurrentProjectIndex } from './appLogic.js'

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

const taskDetailsDialog = document.getElementById("taskDetailsDialog")

const modalTaskTitle = document.getElementById("modalTaskTitle")
const modalTaskDesc = document.getElementById("modalTaskDesc")
const modalTaskDate = document.getElementById("modalTaskDate")
const modalTaskPriority = document.getElementById("modalTaskPriority")
const modalTaskNotes = document.getElementById("modalTaskNotes")

const modalEditBtn = document.getElementById("modalEditBtn")
const modalDeleteBtn = document.getElementById("modalDeleteBtn")
const modalCloseBtn = document.getElementById("modalCloseBtn")

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
    if(newProjectName.trim() === "") return
    newProjects(newProjectName)
    projectName.value = ""
    projectDialog.close()
    renderProjects()
    renderProjectOptions()
    renderTodos()
})

modalCloseBtn.addEventListener("click", () => {
    taskDetailsDialog.close()
})

export function renderProjects(){
    const projectList = document.getElementById("projects")
    projectList.innerHTML = ""

    const activeProjectIndex = getCurrentProjectIndex()

    getProjects().forEach((project, index) => {
        const newProjectLi = document.createElement("li")
        newProjectLi.className = "projects-li"
        newProjectLi.textContent = project.name
        
        if (index === activeProjectIndex) {
            newProjectLi.classList.add("active")
        }

        newProjectLi.addEventListener("click", () => {
            selectProject(index)
            renderTodos()
            renderProjects()
        })

        if (project.name !== "Standard"){
            const deleteProjectBtn = document.createElement("button")
            deleteProjectBtn.className = "delete-project-btn"
            deleteProjectBtn.textContent = "Delete"
            deleteProjectBtn.dataset.index = index

            deleteProjectBtn.addEventListener("click", (e) => {
                const projectIndex = e.target.dataset.index
                
                deleteProject(projectIndex)
                selectProject(0) 
                
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
        
        const toggleBtn = document.createElement("input")
        toggleBtn.type = "checkbox"
        toggleBtn.className = "todo-checkbox"
        toggleBtn.checked = todo.isComplete

        if (todo.isComplete) {
            newTodo.classList.add("completed")
        }

        toggleBtn.addEventListener("change", () => {
            toggleTaskStatus(index)
            renderTodos()
        })

        const taskText = document.createElement("span")
        taskText.textContent = todo.title
        
        newTodo.addEventListener("click", (e) => {
            if (e.target.type === "checkbox") return;

            modalTaskTitle.textContent = todo.title
            modalTaskDesc.textContent = todo.description
            modalTaskDate.textContent = todo.dueDate
            modalTaskPriority.textContent = todo.priority
            modalTaskNotes.textContent = todo.notes

            modalDeleteBtn.dataset.index = index
            modalEditBtn.dataset.index = index

            taskDetailsDialog.showModal()
        })

        newTodo.appendChild(toggleBtn)
        newTodo.appendChild(taskText)
        todoList.appendChild(newTodo)
    })
}

modalDeleteBtn.addEventListener("click", (e) => {
    const taskIndex = e.target.dataset.index
    deleteTask(taskIndex)
    taskDetailsDialog.close() 
    renderTodos()
})

modalEditBtn.addEventListener("click", (e) => {
    const taskIndex = e.target.dataset.index
    currentlyEditingIndex = taskIndex
    
    const currentTodos = getCurrentTodos()
    const todo = currentTodos[taskIndex]

    taskTitle.value = todo.title
    taskDescription.value = todo.description
    taskDueDate.value = todo.dueDate
    taskPriority.value = todo.priority
    taskProject.value = getCurrentProjectName()
    taskNotes.value = todo.notes

    taskDetailsDialog.close()
    taskDialog.showModal()
})

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