import axios from 'axios';
import AuthService from '../services/AuthService';

// dd

//When moving to to Azure and connecting the sites to each other we have to change the url
const USER_API_URL = 'https://fullstackrestapi.azurewebsites.net/';
//const USER_API_URL = 'https://kwapinotes2024.azurewebsites.net/'

// The decision about should we have BOTH the management of users AND notes in this service i probably something we would need to think about.
// Here the aggregate is the user, ie a user has notes!
class UserService {
  async fetchTasksForUser(todoId) {
    return await axios.get(USER_API_URL + `api/todos/${todoId}/task`, { headers: AuthService.authHeader() });
  }

  async fetchTodosForUser() {
    return await axios.get(USER_API_URL + 'api/todos', { headers: AuthService.authHeader() });
  }

  async addTaskForUser(task, todoId) {
    return await axios.post(USER_API_URL + `api/todos/${todoId}/task`, task, { headers: AuthService.authHeader() });
  }

  async addTodoForUser(todo) {
    return await axios.post(USER_API_URL + 'api/todos', todo, { headers: AuthService.authHeader() });
  }

  async changeTaskForUser(task, todoId, taskId) {
    try {
    return await axios.put(USER_API_URL + `api/todos/${todoId}/task/${taskId}`, task, { headers: AuthService.authHeader() });
  } catch (e) {
    console.error(e)
  }
  }

  async changeTodoForUser(todoId, todo) {
    return await axios.put(USER_API_URL + `api/todos/${todoId}`, todo, { headers: AuthService.authHeader() });
  }

  async removeTask(todoId, taskId) {
    try {
      return await axios.delete(USER_API_URL + `api/todos/${todoId}/task/${taskId}`, { headers: AuthService.authHeader() });
    } catch (e) {
      console.error('Error deleting todo:', e)
      throw error;
    }
  }
  
  async removeTodo(todoId) {
    try {
      return await axios.delete(USER_API_URL + `api/todos/${todoId}`, { headers: AuthService.authHeader() });
    } catch (e) {
      console.error('Error deleting todo:', e)
      throw error;
    }
  }
}

export default new UserService();