import React, { Component }   from 'react'
import { connect }            from 'react-redux';

import './AdminPoll.css';

class NominationItem extends Component {
  render() {
    const { name, websiteUrl, vetted } = this.props.nomination;
    return (
      <div>
        {
          vetted
          ? (
            <div className='admin_nomination_list_item flex_me admin_nomination_vetted'>
              <div>
                <p>{ name }</p>
                <p>{ websiteUrl }</p>
              </div>

            </div>
          )
          : (
            <div className='admin_nomination_list_item flex_me'>
              <div>
                <p>{ name }</p>
                <p>{ websiteUrl }</p>
              </div>

            </div>
          )
        }
      </div>


    );
  }
}

export default NominationItem;

// <div className='admin_nomination_remove_list_item flex_me'> X </div>

// <div className='admin_nomination_remove_list_item flex_me'> X </div>
