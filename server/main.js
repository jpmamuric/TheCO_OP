import { Meteor } from 'meteor/meteor';

import { Polls }    from '../imports/api/collections/polls';




if(Meteor.isServer) {
  Meteor.startup(() => {
    BrowserPolicy.content.allowOriginForAll("*.stripe.com/")
    BrowserPolicy.content.allowFontOrigin("data:");
    BrowserPolicy.content.allowOriginForAll( '*.typekit.net' );
    BrowserPolicy.content.allowFontDataUrl( '*.typekit.net' );
    BrowserPolicy.content.disallowInlineScripts();
    // const adminId = Meteor.settings.private.adminId;
    // const stripeSk = Meteor.settings.private.stripeSecretKey;
    // console.log(adminId, stripeSk)

    // 1 SETUP PUBLICATION FOR POLLS (do not use fat arrow function)

    Meteor.publish('nominations', function(){
      return Polls.find({});
    });

    Meteor.publish('polls', function(){
      return Polls.find({});
    });

    Meteor.publish('userData', function (){
      if (this.userId) {
        return Meteor.users.find({ _id: this.userId });
      } else {
        this.ready();
      }
    });
  });
}
