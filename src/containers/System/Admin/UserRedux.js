import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import _ from 'lodash';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import { LANGUAGES } from '../../../utils/constant';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUsers: [],
            isShowModalUser: false, isShowModalDelete: false, isShowModalUpdate: false,
            userDelete: {}, userUpdate: {}
        }
    }

    componentDidMount() {
        this.props.fetchUsersRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                listUsers: this.props.users
            })
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
    render() { // component luôn Render lần đầu trước khi vào DidMount() và DidUpdate()
        return (
            <>
                <div className="user-redux-container">
                    <ModalUpdate isShow={this.state.isShowModalUpdate} userUpdate={this.state.userUpdate} toggleFromParrent={this.toggleUserUpdate} />
                    <ModalDelete isShow={this.state.isShowModalDelete} userDelete={this.state.userDelete} toggleFromParrent={this.toggleModalDelete} />
                    <ModalCreate isShow={this.state.isShowModalUser} toggleFromParrent={this.toggleUserModal} />
                    <div className='title'>Manage users using Redux</div>
                    <div className='mx-2'>
                        <button onClick={() => this.handleAddNewUser()} className='btn btn-primary px-3'> <i className='fas fa-plus'></i>  <FormattedMessage id="admin.manage-user.add" /></button>
                    </div>

                    <div className='users-table mt-3 mx-2'>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th scope='col'>No</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>FullName</th>
                                    <th scope='col'>CompanyName</th>
                                    <th scope='col'>Role</th>
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
                                                    <td>{user.fullName}</td>
                                                    <td>{user.companyName}</td>
                                                    <td>{this.props.language === LANGUAGES.VI ? user.roleData.valueVi : user.roleData.valueEn}</td>
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
