import "./style.css"
import { initializeApp } from './appLogic.js'
import { renderProjects, renderProjectOptions } from './domController.js'

initializeApp()
renderProjects()
renderTodos()
renderProjectOptions()