import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Nominations }       from '../../../api/collections/nominations';
import NominationItem        from './NominationItem';
import NominationItemVetted  from './NominationItemVetted';

const NominationsList = (props) => {
  const { nominations, nominationsVetted } = props;
  // console.log(nominations)
  // console.log(nominationsVetted);

  return (
    <div className='nomination_list flex_me'>
      <div>
        <h3> My Nominations </h3>
        {
          nominations.map(nomination => <NominationItem key={nomination._id} nomination={nomination} />)
        }
      </div>
      <div>
        <h3> My Vetted Nominations </h3>
          {
            nominationsVetted.map(nominee => {
              if(nominee.vetted === true ) {
                return <NominationItemVetted key={nominee._id} nominee={nominee} />
              } else {
                return null;
              }
            })
          }
      </div>

    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('nominationsVetted');
  Meteor.subscribe('nominations');
  return {
    nominations: Nominations.find({}).fetch(),
    nominationsVetted: Nominations.find({}).fetch()
  };
}, NominationsList);
