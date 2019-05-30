import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {fetchPosts, fetchUsersItems, logout} from '../actions';

class TodoIndex extends Component {
  constructor(props) {
  super(props);
}

  componentDidMount() {
    const {_id} = this.props.profile.user;
    if (_id) {
      this.props.fetchUsersItems(_id);
    }
  }

  renderPosts() {
    return _.map(this.props.items, item => {
      return  (
        <li className="list-group-item" key={item._id}>
          <Link to={`/items/${item._id}`} >
            {item.title}
          </Link>
        </li>
      );
    });
  }

  renderSignUpBtn() {
    const {username} = this.props.profile.user;
    if (!username) {
      return (
        <div className="text-xs-right ph15">
          <Link className="btn btn-success" to="/user/signup">Sign Up</Link>
        </div>
      );
    }
  }

  renderLoginBtn() {
    const {username} = this.props.profile.user;
    if (!username) {
      return (
        <div className="text-xs-right ph15">
          <Link className="btn btn-success" to="/user/login">Log In</Link>
        </div>
      );
    }
  }

  renderSignOutBtn() {
    const {username} = this.props.profile.user;
    if (username) {
      return (
        <div className="text-xs-right ph15">
          <Link className="btn btn-danger" onClick={() => this.props.logout()} to="#">
            Sign Out
          </Link>
        </div>
      );
    }
  }

  renderAddPostBtn() {
    const {username} = this.props.profile.user;
    const isDisabled = username ? '' : 'disabled';
    return (
      <div className="text-xs-right ph15">
        <Link className={`btn btn-primary ${isDisabled}`} to="/items/new">New Item</Link>
      </div>
    );
  }

  render() {
    const {username} = this.props.profile.user;
    const listHeader = username ? `${username}'s Todo Items` : "Todo Items";

    return (
      <div>
        <div className="text-sm-center pt50">
          <h1>Welcome To THE Todo List!!</h1>
          <div className="text-sm-left pt10">
            <h6>You can view all your items on the list below.</h6>
            <h6>To create an item for the list, you must be signed in first!</h6>
            <h6>You can edit/delete your items, after you click to view them :)</h6>
          </div>
        </div>
        <div style={{
          display: "flex", flexDirection: "row", textAlign: "center",
          alignItems: "center", justifyContent: "flex-end"
        }} className="pt50">
          {this.renderSignUpBtn()}
          {this.renderLoginBtn()}
          {this.renderAddPostBtn()}
          {this.renderSignOutBtn()}
        </div>

        <h3>{listHeader}</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <div className="pt50" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    profile: state.profile,
  };
}

export default withRouter(connect(mapStateToProps, {fetchPosts, fetchUsersItems, logout})(TodoIndex));
