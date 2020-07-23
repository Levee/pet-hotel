import React, { Component } from 'react';
import PetsTable from './PetsTable';
import PetOwnersTable from './PetOwnersTable';
import axios from 'axios';
import { connect } from 'react-redux';

class Home extends Component {
  static displayName = Home.name;

  fetchPetOwners = async () => {
    const response = await axios.get('api/petOwners');
    this.props.dispatch({ type: 'SET_PETOWNERS', payload: response.data });
  }


  render() {
    return (
      <>
        <img style={{display: 'inline'}} src="https://rule34.xxx/counter/6.gif" border="0" alt="6" className='mt-5'/>
        <h1 style={{display: 'inline'}}>Welcome To The Pet Hotel!</h1>
        <img style={{display: 'inline'}} src="https://rule34.xxx/counter/9.gif" border="0" alt="9"/>
        <p>At our Pet Hotel, we take care of your pet while you are away. </p>
        <PetsTable fetchPetOwners={this.fetchPetOwners} />
        <br />
        <PetOwnersTable fetchPetOwners={this.fetchPetOwners} />
      </>
    );
  }
}

export default connect()(Home);