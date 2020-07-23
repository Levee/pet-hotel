import React, { Component } from 'react';
import { 
  Collapse, Container, Navbar, 
  NavbarBrand, NavbarToggler, 
  NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  state = {
    collapsed: true
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 p-0" light>
          <Container>
            <NavbarBrand className='p-0' tag={Link} to="/" ><h3 style={{'color':'navy', 'fontWeight':'bolder', 'font-family':'Times New Roman'}}>Pet Hotel</h3></NavbarBrand>
            <img src='https://rule34.xxx/images/topb.png' border="0" alt="9"/>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse 
              className="d-sm-inline-flex flex-sm-row-reverse" 
              isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/activity"
                    style={{'color':'navy', 'fontWeight':'bolder', 'font-family':'Times New Roman'}}
                  >
                    Activity
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/"
                    style={{'color':'navy', 'fontWeight':'bolder', 'font-family':'Times New Roman'}}
                  >
                    Home
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
