import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App           from '../imports/ui/App';
import HomePage      from '../imports/ui/pages/page_home';
import MyAccountPage from '../imports/ui/pages/page_myaccount';
import AdminPage     from '../imports/ui/pages/page_admin';
import PollsPage     from '../imports/ui/pages/page_polls';
import SignInPage    from '../imports/ui/pages/page_signin';
import NotFoundPage  from '../imports/ui/pages/page_not_found';

import requireAuth  from '../imports/ui/components/hoc/require_authentication';
import requireAdminAuth from '../imports/ui/components/hoc/require_admin_authentication';

export default (
  <Route path="/" component={App}>
  <IndexRoute  component={HomePage}/>
  <Route path='/polls'          component={requireAuth(PollsPage)}      />
  <Route path="/admin"          component={requireAdminAuth(AdminPage)} />
  <Route path='/signin'         component={SignInPage}                  />
  <Route path="/myaccount"      component={requireAuth(MyAccountPage)}      />
  <Route path="/*"              component={requireAuth(NotFoundPage)}   />
</Route>
)
