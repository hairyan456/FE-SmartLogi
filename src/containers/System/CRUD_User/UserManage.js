import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../../services/userService';
import ModalUser from './ModalUser';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUsers: [],
            isShowModalUser: false, isShowModalDelete: false, isShowModalUpdate: false,
            userDelete: {}, userUpdate: {}
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        let response = await getAllUsers();
        if (response && response.EC === 0)
            this.setState({ listUsers: response.DT }); // mỗi lần gọi setState() sẽ tự render() lại giao diện
        else {
            console.log('check err getAllUsers():', response)
        }
    }

    // Modal CREATE user
    handleAddNewUser = () => {
        this.setState({ isShowModalUser: true })
    }
    toggleUserModal = () => {
        this.setState({ isShowModalUser: !this.state.isShowModalUser })
    }

    //Modal DELETE User
    handleDeleteUser = (user) => {
        this.setState({
            userDelete: user, isShowModalDelete: true
        });
    }
    toggleModalDelete = () => {
        this.setState({
            userDelete: {}, isShowModalDelete: !this.state.isShowModalDelete
        });
    }

    //Modal UPDATE User
    handleUpdateUser = (user) => {
        this.setState({ userUpdate: user, isShowModalUpdate: true })
    }
    toggleUserUpdate = () => {
        this.setState({ userUpdate: {}, isShowModalUpdate: !this.state.isShowModalUpdate })
    }
    render() {
        return (
            <div className="users-container">
                <ModalUpdate isShow={this.state.isShowModalUpdate} userUpdate={this.state.userUpdate} fetchUsers={this.fetchUsers} toggleFromParrent={this.toggleUserUpdate} />
                <ModalDelete isShow={this.state.isShowModalDelete} userDelete={this.state.userDelete} toggleFromParrent={this.toggleModalDelete}
                    fetchUsers={this.fetchUsers}
                />
                <ModalUser isShow={this.state.isShowModalUser} fetchUsers={this.fetchUsers} toggleFromParrent={this.toggleUserModal} />
                <div className='title'>Manage users</div>
                <div className='mx-2'>
                    <button onClick={() => this.handleAddNewUser()} className='btn btn-primary px-3'> <i className='fas fa-plus'></i>  Add new users</button>
                </div>

                <div className='users-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th scope='col'>No</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>FirstName</th>
                                <th scope='col'>LastName</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listUsers && this.state.listUsers.length > 0 ?
                                <>
                                    {this.state.listUsers.map((user, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{user.email}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    <button onClick={() => this.handleUpdateUser(user)} style={{ marginRight: '15px' }} title='Edit' className='btn btn-warning' ><i className='fas fa-pencil-alt'></i></button>
                                                    <button onClick={() => this.handleDeleteUser(user)} className='btn btn-danger' title='Delete'><i className='fas fa-trash'></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <tr style={{ color: 'red' }}><td>Not found users</td></tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
