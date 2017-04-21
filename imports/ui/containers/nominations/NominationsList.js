import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Nominations } from '../../../api/collections/nominations';
import NominationsItem  from './NominationsItem';

const NominationList = (props) => {
  const { nominations } = props;
  console.log(nominations)
  return (
    <div>
      NominationList
      <NominationsItem />
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('nominations');
  return { nominations: Nominations.find({}).fetch() };
}, NominationList);
