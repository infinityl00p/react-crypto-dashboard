import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import '../../assets/css/Sidebar.css';

class Sidebar extends Component {
  render() {
    const SidebarItems = [{
      name: 'Current Rates',
      acronym: 'CR',
      href: '/',
      active: true
    },
    {
      name: 'BTC Hindsight Tool',
      acronym: 'HT',
      href: '/hindsight',
      active: false
    },
    {
      name: 'Currency Conversion',
      acronym: 'CC',
      href: '/conversion',
      active: false
    }];

    return (
      <aside>
        <header>
          <h1>Crypto Dashboard</h1>
        </header>
        <ul className="sidebar-list">
            {
              SidebarItems.map((item, i) => {
                const active = this.props.activeComponent === item.name ? true : false;
                const { name, acronym, href } = item;

                return (
                  <SidebarItem
                    key={i}
                    onClick={this.props.handleClick}
                    href={href}
                    name={name}
                    acronym={acronym}
                    active={active}
                  />
                );
              })
            }
        </ul>
      </aside>
    );
  }
}

export default Sidebar;