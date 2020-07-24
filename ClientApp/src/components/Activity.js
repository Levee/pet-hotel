import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";

class Activity extends Component {
  componentDidMount() {
    this.fetchTransactions();
    this.fetchTotalTransactions();
  }
  fetchTransactions = async () => {
    const response = await axios.get("api/transactions");
    this.props.dispatch({ type: "SET_TRANSACTIONS", payload: response.data });
  };
  fetchTotalTransactions = async () => {
    const response = await axios.get("api/transactions/total");
    this.props.dispatch({
      type: "SET_TOTAL_TRANSACTIONS",
      payload: response.data,
    });
  };

  render() {
    return (
      <div className="pt-5">
        This is the activity page!
        <h1>TOTAL TRANSACTIONS:</h1>
        {[...(this.props.totalTransactions + "")].map((n) => {
          return (
            <img
              style={{ display: "inline" }}
              src={`https://rule34.xxx/counter/${n}.gif`}
              border="0"
              alt="6"
            />
          );
        })}
        <table className="table table-bordered my-5">
          <thead>
            <tr>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.transactions !== undefined ? (
              this.props.transactions.map((tr, i) => (
                <tr key={i}>
                  <td>{tr.title}</td>
                  <td>{moment(tr.timestamp).format("MMMM DD YYYY LTS")}</td>
                </tr>
              ))
            ) : (
              <tr>Nothing to see here</tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  totalTransactions: state.totalTransactions,
});
export default connect(mapStateToProps)(Activity);
