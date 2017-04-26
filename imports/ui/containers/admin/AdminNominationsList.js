import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Nominations } from '../../../api/collections/nominations';
import AdminNominationsItem  from './AdminNominationsItem';

const AdminNominationsList = (props) => {
  const { nominationsAll } = props;
  return (
    <div>
      <h3> All Nominations </h3>
      {
        nominationsAll.map( nomination => <AdminNominationsItem  key={nomination._id} nomination={ nomination }/> )
      }
    </div>
  );
}

export default createContainer( () => {
  Meteor.subscribe('nominationsAll');
  return { nominationsAll: Nominations.find({}).fetch() };
}, AdminNominationsList);
