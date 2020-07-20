import axios from 'axios';
import { newMessage } from './messagesReducer';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

const ACTIONS = {
    LIST: 'TASK_LIST',
    ADD: 'ADD_TASK',
    REMOVE: 'REMOVE_TASK',
    UPDATE_STATUS: 'TASK_UPDATE_STATUS'
}

const INIT_STATE = {
    tasks: [],
    tasksCount: 0
}

export const taskReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case ACTIONS.LIST:
            return {...state, tasks: action.tasks, tasksCount: action.tasks.length}
        case ACTIONS.ADD: 
            const addList = [...state.tasks, action.task];
            return {...state, tasks: addList, tasksCount: addList.length}      
        case ACTIONS.REMOVE: 
            const removeList = state.tasks.filter(({id}) => action.id !== id);
            return { ...state, tasks: removeList, tasksCount: removeList.length }      
        case ACTIONS.UPDATE_STATUS:
            const tasks = state.tasks.map(task => {
                if (task.id === action.id) {
                  task.done = !task.done;
                }
                return task;
              });
              return {...state, tasks}
        default:
            return state 
    }
};

export function list() {
    return dispatch  => {
        http.get('/tarefas', {headers: { 'x-tenant-id': localStorage.getItem('user_email') }}).then(({data}) => {
            dispatch({
                type: ACTIONS.LIST,
                tasks: data
            })
        });
    }
}

export function save(task) {
    return dispatch  => {
        http.post('/tarefas', task, {headers: { 'x-tenant-id': localStorage.getItem('user_email') }}).then(({data}) => {
            dispatch([{
                type: ACTIONS.ADD,
                task: data
            }, newMessage('Tarefa salva com sucesso!')])
        });
    }
} 

export function remove(id) {
    return dispatch  => {
        http.delete(`/tarefas/${id}`, {headers: { 'x-tenant-id': localStorage.getItem('user_email') }}).then(() => {
            dispatch([{
                type: ACTIONS.REMOVE,
                id
            }, newMessage('Tarefa removida com sucesso!')])
        });
    }
} 

export function updateStatus(id) {
    return dispatch  => {
        http.patch(`/tarefas/${id}`, null, {headers: { 'x-tenant-id': localStorage.getItem('user_email') }}).then(() => {
            dispatch([{
                type: ACTIONS.UPDATE_STATUS,
                id
            }, newMessage('Tarefa atualizada com sucesso!')])
        });
    }
}