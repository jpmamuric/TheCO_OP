import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App           from '../imports/ui/App';
import MyAccountPage from '../imports/ui/pages/page_myaccount';
import HomePage      from '../imports/ui/pages/page_home';
import AdminPage     from '../imports/ui/pages/page_admin';
import VotePage      from '../imports/ui/pages/page_polls';
import NominatePage  from '../imports/ui/pages/page_nominate';
import SignInPage    from '../imports/ui/pages/page_signin';
import NotFoundPage  from '../imports/ui/pages/page_not_found';
import requireAuth   from '../imports/ui/components/hoc/require_authentication';
import requireAdminAuth from '../imports/ui/components/hoc/require_admin_authentication';

export default (
  <Route path="/" component={App}>
  <IndexRoute     component={requireAuth(MyAccountPage)}    />
  <Route path='/signin'         component={(SignInPage)}    />
  <Route path='/vote'           component={requireAuth(VotePage)}        />
  <Route path='/nominate'       component={requireAuth(NominatePage)}    />
  <Route path="/admin"          component={requireAdminAuth(AdminPage)} />
  <Route path="/myaccount"      component={requireAuth(MyAccountPage)}  />
  <Route path="/*"              component={requireAuth(NotFoundPage)}   />
</Route>
)
