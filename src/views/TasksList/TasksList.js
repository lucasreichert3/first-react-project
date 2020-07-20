import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { list, save, remove, updateStatus } from '../../store/tasksReducer';
import { closeMessage } from '../../store/messagesReducer';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';

import { TasksTable, TasksToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';

const TasksList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.list();
  }, []);

  return (
    <div className={classes.root}>
      <TasksToolbar saveTask={props.save} />
      <div className={classes.content}>
        <TasksTable
          tasks={props.tasks}
          updateTask={props.updateStatus}
          deleteTask={props.remove}
        />
      </div>
      <Dialog open={props.showMessage} onClose={() => props.closeMessage()}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>{props.message}</DialogContent>
        <DialogActions>
          <Button onClick={() => props.closeMessage()}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  showMessage: state.messages.showMessage,
  message: state.messages.message
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({ list, save, remove, updateStatus, closeMessage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
