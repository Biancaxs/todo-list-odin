const openTaskDialog = document.getElementById("openTaskDialog")
const openProjectDialog = document.getElementById("openProjectDialog")

const taskDialog = document.getElementById("taskDialog")
const projectDialog = document.getElementById("projectDialog")

const createTaskBtn = document.getElementById("createTaskBtn")
const createProjectBtn = document.getElementById("createProjectBtn")

openTaskDialog.addEventListener("click", () => {
    taskDialog.showModal()
})

openProjectDialog.addEventListener("click", () => {
    projectDialog.showModal()
})