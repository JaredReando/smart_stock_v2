import React, { Component } from 'react';
import { withFirebase } from "../Firebase"

interface Props {
    firebase: any;
}

interface State {
    loading: boolean;
    users: any;
}
class ActiveUsers extends Component<Props, State> {
    state = {
        loading: false,
        users: [],
    };

    componentDidMount() {
        const Firebase = this.props.firebase;
        this.setState({loading: true});

        Firebase.users().on('value', (snapshot: any) => {
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
        const { users, loading } = this.state;
        return (
            <div>
                {loading && <div>Loading ...</div>}
                {!loading && <UserList users={users} />}
            </div>
        );
    }
}

interface User {
    uid: string;
    email: string;
    username: string;
}
const UserList = (props: any) => (
    <ul>
        {props.users.map((user: User) => (
            <li key={user.uid}>
        <span>
          <strong>ID: </strong> {user.uid }
        </span>
                <span>
          <strong> E-Mail:</strong> {user.email }
        </span>
                <span>
          <strong> Username:</strong> {user.username }
        </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(ActiveUsers);