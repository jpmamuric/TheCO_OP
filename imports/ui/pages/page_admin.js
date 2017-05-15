import React          from 'react'

import './pages.css'

import AdminPollListContainer   from '../containers/admin/AdminPollListContainer'
import AdminPollForm            from '../containers/admin/AdminPollForm'
import AdminCountdownContainer  from '../containers/admin/AdminCountDown'
import AdminNominationsList     from '../containers/admin/AdminNominationsList';

const AdminPage = (props) => {
  return (
    <div className='page_admin flex_me'>
      <div className='page_admin_poll_container flex_me'>
        <AdminPollForm />
        <AdminCountdownContainer />
        <AdminPollListContainer />
      </div>
      <div className='page_admin_nominations_container'>
        <AdminNominationsList />
      </div>
    </div>
  );
}

export default AdminPage;
