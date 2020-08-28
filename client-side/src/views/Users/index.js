import React, { useEffect } from 'react';
import { forwardRef } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Avatar from 'react-avatar';

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

import { connect } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../actions/userActions';
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

const Users = ({ users, loadUsers, newUser, modifyUser, removeUser }) => {
  var columns = [
    { title: 'id', field: 'id', hidden: true },
    {
      title: 'Avatar',
      render: (rowData) => (
        <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? ' ' : rowData.fname} />
      ),
    },
    { title: 'First Name', field: 'fname' },
    { title: 'Last Name', field: 'lname' },
    { title: 'Email', field: 'email' },
    { title: 'Username', field: 'username' },
  ];

  useEffect(() => {
    loadUsers();
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

  return (
    <DashboardLayout>
      <Grid className={classes.root}>
        <MaterialTable
          title={'List of Users in the system'}
          columns={columns}
          data={users}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                modifyUser(newData, oldData, users, resolve);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                newUser(newData, users, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                removeUser(oldData, users, resolve);
              }),
          }}
        />
      </Grid>
    </DashboardLayout>
  );
};

function mapStateToProps(state) {
  return {
    users: state.users.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    newUser: (newUser, originalUsers, resolve) => dispatch(addUser(newUser, originalUsers, resolve)),
    modifyUser: (updatedUser, oldUser, originalUsers, resolve) =>
      dispatch(updateUser(updatedUser, oldUser, originalUsers, resolve)),
    removeUser: (oldUser, originalUsers, resolve) => dispatch(deleteUser(oldUser, originalUsers, resolve)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
