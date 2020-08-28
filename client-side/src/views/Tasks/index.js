import React, { useEffect } from 'react';
import { forwardRef } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../../actions/taskActions';
import DashboardLayout from '../../layouts/DashboardLayout';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function validateEmail(email) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const TasksTable = ({ tasks, loadTasks, newTask, modifyTask, removeTask }) => {
  var columns = [
    { title: 'id', field: 'id', hidden: true },
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Deadline', field: 'deadline' },
    { title: 'Project Id', field: 'project_id', hidden: true },
    { title: 'Assignee', field: 'assignee' },
    { title: 'Last Assignee', field: 'last_assignee' },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  }));

  const classes = useStyles();

  const handleRowDelete = (oldData, resolve) => {
    // api
    //   .delete('/users/' + oldData.id)
    //   .then((res) => {
    //     const dataDelete = [...data];
    //     const index = oldData.tableData.id;
    //     dataDelete.splice(index, 1);
    //     setData([...dataDelete]);
    //     resolve();
    //   })
    //   .catch((error) => {
    //     setErrorMessages(['Delete failed! Server error']);
    //     setIserror(true);
    //     resolve();
    //   });
  };

  return (
    <DashboardLayout>
      <Grid className={classes.root}>
        {/* <div>
              {iserror && (
                <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>;
                  })}
                </Alert>
              )}
            </div> */}
        <MaterialTable
          title="Tasks of project "
          columns={columns}
          data={tasks}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                modifyTask(newData, oldData, tasks, resolve);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                newTask(newData, tasks, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                removeTask(oldData, tasks, resolve);
              }),
          }}
        />
      </Grid>
    </DashboardLayout>
  );
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTasks: () => dispatch(fetchTasks()),
    newTask: (newTask, originalTasks, resolve) => dispatch(addTask(newTask, originalTasks, resolve)),
    modifyTask: (updatedTask, oldTask, originalTasks, resolve) =>
      dispatch(updateTask(updatedTask, oldTask, originalTasks, resolve)),
    removeTask: (oldTask, originalTasks, resolve) => dispatch(deleteTask(oldTask, originalTasks, resolve)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksTable);
