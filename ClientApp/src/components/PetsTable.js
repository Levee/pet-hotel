import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";

class PetsTable extends Component {
  state = {
    loading: true,
    errors: [],
    successMessage: null,
    newPet: {
      name: "",
      breed: "",
      color: "",
      petOwnerid: "",
    },
    editPet: {
      name: "",
      breed: "",
      color: "",
      petOwnerid: "",
    },
    updateId: "",
  };

  componentDidMount = () => {
    this.fetchData();
  };

  update = (pet) => {
    this.setState({
      editPet: pet,
      updateId: pet.id,
    });
  };
  cancelPet = () => {
    this.setState({
      errors: [],
      successMessage: null,
      newPet: {
        name: "",
        breed: "",
        color: "",
        petOwnerid: "",
      },
      updateId: "",
    });
  };
  handleChange = (event, value) => {
    this.setState({
      [value]: event.target.value,
    });
  };
  renderTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered" aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Color</th>
              <th>Status</th>
              <th>Pet Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.pets.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  There are no pets currently in our system.
                </td>
              </tr>
            )}
            {this.props.pets.map((pet) =>
              this.state.updateId === pet.id ? (
                <tr>
                  <td className="p-2">
                    <input
                      placeholder="Name"
                      className="form-control col-12 mr-2"
                      value={this.state.editPet.name}
                      onChange={(e) =>
                        this.setState({
                          editPet: {
                            ...this.state.editPet,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </td>
                  <td className="p-2">
                    <select
                      className="form-control col-12 mr-2"
                      value={this.state.editPet.breed}
                      onChange={(e) =>
                        this.setState({
                          editPet: {
                            ...this.state.editPet,
                            breed: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="Shepherd">Shepherd</option>
                      <option value="Poodle">Poodle</option>
                      <option value="Beagle">Beagle</option>
                      <option value="Bulldog">Bulldog</option>
                      <option value="Terrier">Terrier</option>
                      <option value="Boxer">Boxer</option>
                      <option value="Labrador">Labrador</option>
                      <option value="Retriever">Retriever</option>
                    </select>
                  </td>

                  <td className="p-2">
                    <select
                      className="form-control col-12 mr-2"
                      value={this.state.editPet.color}
                      onChange={(e) =>
                        this.setState({
                          editPet: {
                            ...this.state.editPet,
                            color: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="Black">Black</option>
                      <option value="White">White</option>
                      <option value="Golden">Golden</option>
                      <option value="Tricolor">Tricolor</option>
                      <option value="Spotted">Spotted</option>
                    </select>
                  </td>
                  <td>
                    {pet.checkedInAt
                      ? moment.utc(pet.checkedInAt).local().calendar()
                      : "Not Checked In"}
                  </td>
                  <td>{pet.petOwner.name}</td>
                  <td>
                    <button
                      onClick={() => this.editPet()}
                      className="btn btn-sm btn-info ml-1 mr-1"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={`pet-row-${pet.id}`}>
                  <td>{pet.name}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.color}</td>
                  <td>
                    {pet.checkedInAt
                      ? moment.utc(pet.checkedInAt).local().calendar()
                      : "Not Checked In"}
                  </td>
                  <td>{pet.petOwner.name}</td>
                  <td>
                    {pet.checkedInAt ? (
                      <button
                        onClick={() => this.checkOut(pet.id)}
                        className="btn btn-sm btn-info ml-1 mr-1"
                      >
                        Check Out
                      </button>
                    ) : (
                      <button
                        onClick={() => this.checkIn(pet.id)}
                        className="btn btn-sm btn-info ml-1 mr-1"
                      >
                        Check In
                      </button>
                    )}
                    <button
                      onClick={() => this.update(pet)}
                      className="btn btn-sm btn-success ml-1 mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => this.delete(pet.id)}
                      className="btn btn-sm btn-danger ml-1 mr-1"
                    >
                      X
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  };

  editPet = async () => {
    try {
      await axios.put(`api/pets/${this.state.updateId}`, this.state.editPet);
      await axios.post(`api/transactions/`, {
        title: `Edited pet ${this.state.editPet.name}`,
      });
      this.fetchData();
      this.setState({
        errors: [],
        successMessage: "Successfully rebirthed pet!",
        editPet: {
          name: "",
          breed: "",
          color: "",
          petOwnerid: "",
        },
        updateId: "",
      });
    } catch (err) {
      console.log(err);
      // if (err.response.status === 400) {
      //    // validation errors
      //    this.setState({ errors: err.response.data.errors, successMessage: null });
      // }
    }
  };

  addPet = async () => {
    try {
      await axios.post("api/pets/", this.state.newPet);
      await axios.post(`api/transactions/`, {
        title: `Added pet ${this.state.newPet.name}`,
      });
      this.fetchData();
      this.setState({
        errors: [],
        successMessage: `Successfully added ${this.state.newPet.name}`,
      });
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        // validation errors
        this.setState({
          errors: err.response.data.errors,
          successMessage: null,
        });
      }
    }
  };

  renderMessages = () => {
    /*
      Look into the local state to see if we have any errors
      that are derived from the backend validation, and display them
    */
    const errors = [];
    if (this.state.errors) {
      for (let err in this.state.errors) {
        // check for special case errors for human readability
        // .NET throws a weird validation error for database foreign key
        // violations starting with $. for the field name... weird.
        if (err === "$.petOwnerId") {
          errors.push(<li>Invalid Pet Owner ID</li>);
        } else {
          errors.push(<li>{this.state.errors[err]}</li>);
        }
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
        <h2 id="tableLabel">Pets</h2>
        {this.renderMessages()}
        <div className="form-group row ml-0 mr-0">
          <input
            placeholder="Name"
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.name}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, name: e.target.value },
              })
            }
          />
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.breed}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, breed: e.target.value },
              })
            }
          >
            <option value="" disabled defaultValue>
              Breed
            </option>
            <option value="Shepherd">Shepherd</option>
            <option value="Poodle">Poodle</option>
            <option value="Beagle">Beagle</option>
            <option value="Bulldog">Bulldog</option>
            <option value="Terrier">Terrier</option>
            <option value="Boxer">Boxer</option>
            <option value="Labrador">Labrador</option>
            <option value="Retriever">Retriever</option>
          </select>
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.color}
            onChange={(e) =>
              this.setState({
                newPet: { ...this.state.newPet, color: e.target.value },
              })
            }
          >
            <option value="" disabled defaultValue>
              Coat
            </option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Golden">Golden</option>
            <option value="Tricolor">Tricolor</option>
            <option value="Spotted">Spotted</option>
          </select>
          <select
            className={"form-control col-md-2 mr-2"}
            value={this.state.newPet.petOwnerid}
            onChange={(e) =>
              this.setState({
                newPet: {
                  ...this.state.newPet,
                  petOwnerid: Number(e.target.value),
                },
              })
            }
          >
            <option>Owner</option>
            {this.props.petOwners.map((petOwner) => (
              <option
                value={petOwner.id}
                key={`select-petOwner=${petOwner.id}`}
              >
                {petOwner.name}
              </option>
            ))}
          </select>
          <button
            className={"form-control btn btn-primary col-md-2"}
            onClick={this.addPet}
          >
            Add Pet
          </button>
        </div>
        {contents}
      </>
    );
  }

  delete = (id) => {
    Swal.fire({
      title: "Warning!",
      text: "You are about to put down this pet. Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#96c882",
      cancelButtonColor: "#d33",
      confirmButtonText: "Put Down!",
    }).then(async (result) => {
      if (result.value) {
        await axios.delete(`api/pets/${id}`);
        await axios.post(`api/transactions/`, {
          title: `put down a pet: ${this.state.newPet.name}`,
        });
        this.fetchData();
        this.setState({
          errors: [],
          successMessage: `Successfully put down ${this.state.newPet.name}`,
        });
        Swal.fire("Bye Bye Doggy", "Successfully put down pet.", "success");
      }
    });
  };

  checkIn = async (id) => {
    try {
      await axios.put(`api/pets/${id}/checkin`);
      await axios.post(`api/transactions/`, {
        title: `Checked in pet ${this.state.newPet.name}`,
      });
      this.setState({
        errors: [],
        successMessage: `Successfully checked in ${this.state.newPet.name}`,
      });
      this.fetchData();
    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };

  checkOut = async (id) => {
    try {
      await axios.put(`api/pets/${id}/checkout`);
      await axios.post(`api/transactions/`, {
        title: `Checked out pet ${this.state.newPet.name}`,
      });
      this.setState({
        errors: [],
        successMessage: `Successfully checked out ${this.state.newPet.name}`,
      });
      this.fetchData();
    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };

  fetchData = async () => {
    try {
      const response = await axios.get("api/pets/");
      this.props.dispatch({ type: "SET_PETS", payload: response.data });
      this.props.fetchPetOwners();

      // stretch goal 1: grab a list of breeds from the backend
      // stretch goal 2: grab a list of colors from the backend

      this.setState({ loading: false });
    } catch (err) {
      this.setState({ errors: { error: [err.message] }, successMessage: null });
    }
  };
}

const mapStateToProps = (state) => ({
  pets: state.pets,
  petOwners: state.petOwners,
});
export default connect(mapStateToProps)(PetsTable);
