import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/SidebarItem.css';

class SidebarItem extends Component {
  render() {
    const anchorClass = `${this.props.active ? 'active' : 'inactive'}`;

    return (
      <li className='sidebar-item' onClick={() => { this.props.onClick(this.props.name) }}>
        <Link className={anchorClass} to={this.props.href}>
          <span className="acronym">
            {this.props.acronym}
          </span>
          <span className="name">
            {this.props.name}
          </span>
        </Link>
      </li>
    )
  }
}

export default SidebarItem;