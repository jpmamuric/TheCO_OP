import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Nominations } from '../../../api/collections/nominations';
import AdminNominationsItem  from './AdminNominationsItem';

const AdminNominationsList = (props) => {
  const { nominationsAll } = props;
  console.log(nominationsAll)
  return (
    <div>
      Admin Nomination List
      <AdminNominationsItem />
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('nominationsAll');
  return { nominationsAll: Nominations.find({}).fetch() };
}, AdminNominationsList);
