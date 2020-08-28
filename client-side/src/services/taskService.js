import http, { getAuthenticationHeader } from '../utils/httpUtil';
import config from '../config';
class TaskService {
  getAllTasks() {
    return http.get(`${config.endpoints.tasks}?project=33`, { headers: getAuthenticationHeader() });
  }

  getSingleTask(id) {
    return http.get(`${config.endpoints.tasks}/${id}`, { headers: getAuthenticationHeader() });
  }

  createTask(data) {
    return http.post(`${config.endpoints.tasks}`, data, { headers: getAuthenticationHeader() });
  }

  updateTask(id, data) {
    return http.put(`${config.endpoints.tasks}/${id}`, data, { headers: getAuthenticationHeader() });
  }
  deleteTask(id) {
    return http.delete(`${config.endpoints.tasks}/${id}`, { headers: getAuthenticationHeader() });
  }
}
export default new TaskService();
