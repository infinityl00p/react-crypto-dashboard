import React, { Component } from 'react';
import SidebarItem from './SidebarItem';
import '../../assets/css/Sidebar.css';

class Sidebar extends Component {
  render() {
    const SidebarItems = [{
      name: 'Current Rates',
      acronym: 'CR',
      active: true
    },
    {
      name: 'Hindsight Tool',
      acronym: 'HT',
      active: false
    },
    {
      name: 'Currency Conversion',
      acronym: 'CC',
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
                return (
                  <SidebarItem
                    key={i}
                    name={item.name}
                    acronym={item.acronym}
                    active={item.active}
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