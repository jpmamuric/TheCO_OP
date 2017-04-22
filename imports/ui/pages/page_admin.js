import React from 'react'

import './pages.css'

import AdminPollListContainer from '../containers/admin/AdminPollListContainer'
import AdminPollForm from '../containers/admin/AdminPollForm'

import AdminNominationsList from '../containers/admin/AdminNominationsList';

const AdminPage = () => {
  return (
    <div className='page_admin flex_me'>
      <div className='page_admin_poll_container flex_me'>
        <AdminPollForm />
        <AdminPollListContainer />
      </div>
      <div className='page_admin_nominations_container'>
        <AdminNominationsList />
      </div>
    </div>
  );
}

export default AdminPage;
