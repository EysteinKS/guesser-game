import React, { Component } from 'react';
import "../css/DropdownMenu.css";

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showMenu: false,
    };
    
  }
  
  showMenu = (event) => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu = (event) => {
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    return (
      <div>
        <button className="showButton" onClick={this.showMenu}>
          
        </button>
        
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                {this.props.listitems}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default DropdownMenu;