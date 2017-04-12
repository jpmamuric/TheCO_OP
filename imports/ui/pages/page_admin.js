import React from 'react'

import './pages.css'

import AdminPollListContainer from '../containers/admin/AdminPollListContainer'
import AdminPollForm from '../containers/admin/AdminPollForm'

const AdminPage = () => {
  return (
    <div className='page_admin flex_me'>
      <AdminPollForm />
      <AdminPollListContainer />
    </div>
  );
}

export default AdminPage;
