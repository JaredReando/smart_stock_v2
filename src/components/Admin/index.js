import React, { Component } from 'react';
import { withFirebase } from "../Firebase";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
        }
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <h2>Users:</h2>
                {this.state.users.map(user => (
                    <h3 key={user.uid}>{user.username}</h3>
                ))}
            </div>
        )
    }
}

export default withFirebase(Admin);