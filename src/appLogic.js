import { project } from './project.js'
import { todo } from './todo.js'
import { saveData, loadData } from './storage.js'

let projects = loadData() || []

let currentProject

export function initializeApp(){
    if(projects.length === 0){
        let standardProject = project("Standard")
        projects.push(standardProject)
        currentProject = standardProject
    } else{
        projects = projects.map(p => {
            const realProject = project(p.name)
            realProject.todos = p.todos
            return realProject
        })

        currentProject = projects[0]
    }
}

export function newProjects(name){
    let newProject = project(name)
    projects.push(newProject)
    saveData(projects)
}

export function selectProject(index){
    currentProject = projects[index]
}

export function addTask(title, description, date, priority, project, notes){
    const newTodo = todo(title, description, date, priority, notes)
    const targetProject = projects.find(p => p.name === project)
    targetProject.addTodo(newTodo)
    currentProject = targetProject
    saveData(projects)
}

export function getProjects(){
    return projects
}

export function getCurrentTodos(){
    return currentProject.todos
}

export function deleteTask(taskIndex){
    currentProject.todos.splice(taskIndex, 1)
    saveData(projects)
}

export function deleteProject(projectIndex){
    projects.splice(projectIndex, 1)

    if (projects.length > 0){
        currentProject = projects[0]
    } else{
        currentProject = null
    }

    saveData(projects)
}

export function toggleTaskStatus(taskIndex){
    const toggleTask = currentProject.todos[taskIndex]
    toggleTask.isComplete = !toggleTask.isComplete
    saveData(projects)
}

export function editTask(taskIndex, newTitle, newDescription, newDate, newPriority, newNotes){
    const editTodo = currentProject.todos[taskIndex]
    editTodo.title = newTitle
    editTodo.description = newDescription
    editTodo.date = newDate
    editTodo.priority = newPriority
    editTodo.notes = newNotes
    saveData(projects)
}

export function getCurrentProjectName() {
    return currentProject.name;
}