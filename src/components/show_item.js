import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deleteItem} from '../actions';

class ShowItem extends Component {
  onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deleteItem(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {item} = this.props;

    if (!item) {
      alert('could not find this item! try another one :)');
      this.props.history.push('/');
      return <Link to="/">Back Home</Link>;
    }

    return (
      <div style={{
        display: "flex", flexDirection: "column", textAlign: "left",
        alignItems: "center", justifyContent: "center"
      }} className="pt50">
      <div className="text-sm-center pt50">
        <h2>Wow. super important. this thing. do it!</h2>
        <div className="text-sm-center pt10">
          <Link className="btn btn-primary" to="/">
            Back to List
          </Link>
        </div>
      </div>
      <ul className="list-group pt100" style={{maxWidth: 350}}>
        <h3 className="list-group-item">{item.title}</h3>
        <p className="list-group-item">{item.description}</p>
      </ul>
      <div style={{
        display: "flex", flexDirection: "row", textAlign: "center",
        alignItems: "center", justifyContent: "center"
      }} className="pt25">
        <div className="text-xs-right ph5">
          <Link className="btn btn-success" to={`/items/edit/${item._id}`}>
            Edit Post
          </Link>
        </div>
        <div className="text-xs-right ph5">
          <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Item
          </button>
        </div>
      </div>

      </div>
    );
  }
}

function mapStateToProps({items}, ownProps) {
  return { item: items[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deleteItem})(ShowItem);
