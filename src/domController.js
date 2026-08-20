import './appLogic.js'
import { getProjects, newProjects, addTask } from './appLogic.js'

const openTaskDialog = document.getElementById("openTaskDialog")
const openProjectDialog = document.getElementById("openProjectDialog")

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
})

openProjectDialog.addEventListener("click", () => {
    projectDialog.showModal()
})

createTaskBtn.addEventListener("click", () => {
    const newTaskTitle = taskTitle.value
    const newTaskDescription = taskDescription.value
    const newTaskDueDate = taskDueDate.value
    const newTaskPriority = taskPriority.value
    const newTaskProject = taskProject.value
    const newTaskNotes = taskNotes.value
    addTask(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, newTaskProject, newTaskNotes)
})

createProjectBtn.addEventListener("click", () => {
    const newProjectName = projectName.value
    newProjects(newProjectName)
    renderProjects()
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