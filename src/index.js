import "./style.css"
import { initializeApp } from './appLogic.js'
import { renderProjects, renderProjectOptions, renderTodos } from './domController.js'

initializeApp()
renderProjects()
renderTodos()
renderProjectOptions()