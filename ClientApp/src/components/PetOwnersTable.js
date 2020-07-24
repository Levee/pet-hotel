import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class PetOwnersTable extends Component {
  state = {
    errors: [],
    successMessage: null,
    loading: true,
    newPetOwner: {
      name: "",
      emailAddress: "",
    },
  };

  componentDidMount = async () => {
    await this.props.fetchPetOwners();
    this.setState({ loading: false });
  };

  renderMessages = () => {
    /*
            Look into the local state to see if we have any errors
            that are derived from the backend validation, and display them
        */
    const errors = [];
    if (this.state.errors) {
      for (let err in this.state.errors) {
        errors.push(<li>{this.state.errors[err]}</li>);
      }
    }

    if (errors.length > 0) {
      return (
        <div className={"alert alert-danger"}>
          <p>The following errors prevented a successful save:</p>
          <ul>{errors}</ul>
        </div>
      );
    }

    if (this.state.successMessage !== null) {
      return (
        <p className={"alert alert-success"}>{this.state.successMessage}</p>
      );
    }

    return null;
  };

  renderTable = () => {
    return (
      <div className="table-responsive">
        <table
          className="table table-striped table-bordered table-hover"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner Name</th>
              <th>Email</th>
              <th>Pets</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.petOwners.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  There are no registered pet owners.
                </td>
              </tr>
            )}
            {this.props.petOwners.map((petOwner) => (
              <tr key={`petOwner-row-${petOwner.id}`}>
                <td>{petOwner.id}</td>
                <td>{petOwner.name}</td>
                <td>{petOwner.emailAddress}</td>
                <td>{petOwner.petCount}</td>
                <td>
                  <button
                    onClick={() => this.deletePetOwner(petOwner.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Execute
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderTable()
    );

    return (
      <>
        <h2 id="tableLabel">Pet Owners</h2>
        {this.renderMessages()}
        <div className="form-group row ml-0">
          <input
            placeholder="Pet Owner Name"
            value={this.state.newPetOwner.name}
            onChange={(event) =>
              this.setState({
                newPetOwner: {
                  ...this.state.newPetOwner,
                  name: event.target.value,
                },
              })
            }
            className={"form-control col-md-3 mr-2"}
          />
          <input
            placeholder="Email Address"
            value={this.state.newPetOwner.emailAddress}
            onChange={(event) =>
              this.setState({
                newPetOwner: {
                  ...this.state.newPetOwner,
                  emailAddress: event.target.value,
                },
              })
            }
            className={"form-control col-md-3 mr-2"}
          />
          <button
            onClick={this.submitPetOwner}
            className={"btn btn-primary col-md-2"}
          >
            Add Pet Owner
          </button>
        </div>
        {contents}
      </>
    );
  }

  editPet = async () => {
    try {
      await axios.put(`api/pets/${this.state.updateId}`, this.state.newPet);
      await axios.post(`api/transactions/`, {
        title: `edited pet ${this.state.newPet.name}`,
      });
      this.fetchData();
      this.setState({
        errors: [],
        successMessage: null,
        loading: true,
        newPetOwner: {
          name: "",
          emailAddress: "",
        },
      });
    } catch (err) {
      console.log(err);
      // if (err.response.status === 400) {
      //    // validation errors
      //    this.setState({ errors: err.response.data.errors, successMessage: null });
      // }
    }
  };

  deletePetOwner = async (id) => {
    Swal.fire({
      title: "Warning!",
      text: "You are about to execute this pet owner. Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#96c882",
      cancelButtonColor: "#d33",
      confirmButtonText: "Execute!",
    }).then(async (result) => {
      if (result.value) {
        await axios.delete(`api/petOwners/${id}`);
        await axios.post(`api/transactions/`, {
          title: `eliminated the pet owner with id ${id}`,
        });
        this.props.fetchPetOwners();
        this.setState({
          errors: [],
          successMessage: "Successfully executed pet owner!",
        });
        Swal.fire("Executed!", "Successfully executed pet owner.", "success");
      }
    });
  };

  submitPetOwner = async () => {
    try {
      await axios.post("api/petOwners", this.state.newPetOwner);
      await axios.post(`api/transactions/`, {
        title: `added pet owner ${this.state.newPetOwner.name}`,
      });
      this.setState({
        newPetOwner: { ...this.state.newPetOwner, name: "", emailAddress: "" },
      });
      this.props.fetchPetOwners();
      this.setState({
        errors: [],
        successMessage: "Successfully added pet Owner",
      });
    } catch (err) {
      if (err.response.status === 400) {
        // validation errors
        this.setState({
          errors: err.response.data.errors,
          successMessage: null,
        });
      }
    }
  };
}

const mapStateToProps = (state) => ({ petOwners: state.petOwners });
export default connect(mapStateToProps)(PetOwnersTable);
