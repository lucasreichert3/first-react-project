import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TasksTable = props => {
  const { className, tasks, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                    tasks.map(({ id, descricao, categoria, done }) => {
                      return (
                        <TableRow key={id}>
                          <TableCell>{id}</TableCell>
                          <TableCell>{descricao}</TableCell>
                          <TableCell>{categoria}</TableCell>
                          <TableCell>{done ? 'Feito' : 'Pendente'}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => props.updateTask(id)} color="secondary">
                              {
                                done ? <DoneAllIcon/> : <TimerIcon />
                              }
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => props.deleteTask(id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

TasksTable.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array.isRequired
};

export default TasksTable;
