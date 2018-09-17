import React, { Component } from 'react';
import '../../assets/css/SidebarItem.css';

class SidebarItem extends Component {
  render() {
    const anchorClass = `${this.props.active ? 'active' : 'inactive'}`;

    return (
      <li className='sidebar-item'>
        <a className={anchorClass}>
          <span className="acronym">
            {this.props.acronym}
          </span>
          <span className="name">
            {this.props.name}
          </span>
        </a>
      </li>
    )
  }
}

export default SidebarItem;