import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import Stripe from 'stripe';

import { Polls }          from '../imports/api/collections/polls';
import { VotingHistory }  from '../imports/api/collections/history';
import { Nominations }    from '../imports/api/collections/nominations';
import { Countdowns }     from '../imports/api/collections/countdowns';

if(Meteor.isServer) {
  Meteor.startup(() => {
    BrowserPolicy.content.allowOriginForAll("*.stripe.com/")
    BrowserPolicy.content.allowOriginForAll( '*.youtube.com' );
    BrowserPolicy.content.allowFontOrigin("data:");
    BrowserPolicy.content.allowOriginForAll( '*.typekit.net' );
    BrowserPolicy.content.allowFontDataUrl( '*.typekit.net' );
    BrowserPolicy.content.disallowInlineScripts();

    // const adminId = Meteor.settings.private.adminId;
    const stripeSk = Meteor.settings.private.stripeSecretKey;
    const stripe = StripeAPI(stripeSk);

    // Charge Card
    Meteor.methods({
      // Add Stripe token to Meteor User Object
      addCard(token, email){
        check(token, String);
        check(email, String);

        console.log('card being saved', token, email);
        if( Meteor.user().stripeCustomer === undefined ){
          stripe.customers.create({
            email: email,
            description: `Cust added For ${email}`,
            source: token // obtained with Stripe.js
          }, function(err, customer) {
            // asynchronously called
            if(err) {
              console.log(err);
            } else {
              Meteor.users.update(Meteor.user()._id, { $set: { stripeCustomer: customer.id } });
            }
          });
        } else {
          console.log( 'customer was updated' );
          stripe.customers.update( Meteor.user().stripeCustomer, {
            description: `Customer updated for ${email}`
          }, function(err, customer) {
              // asynchronously called
              if(err) {
                console.log(err);
              } else {
                console.log( customer, 'successfully added to stripe ' );
              }
          });
        }
      },

      // Charge card
      chargeCard(token, email) {
        check(token, String);
        check(email, String);

        console.log('card charged', token, email)
        stripe.charges.create({
          amount: 100,
          currency: "usd",
          source: token,
          description: `Charge for ${email}`
        }, function(err, charge) {
          if(err) {
            console.log(err)
          } else {
            console.log( 'successfully charged')
          }
        });
      }
    });

    // 1 SETUP PUBLICATION FOR POLLS (do not use fat arrow function)
    Meteor.publish('countdowns', function(){
      return Countdowns.find({});
    });

    Meteor.publish('nominationsAll', function(){
      return Nominations.find({});
    });

    Meteor.publish('nominationsVetted', function(){
      return Nominations.find({ owner: this.userId });
    });

    Meteor.publish('nominations',function(){
      return Nominations.find({ owner: this.userId });
    });

    Meteor.publish('polls', function(){
      return Polls.find({});
    });

    Meteor.publish('votingHistory', function(){
      return VotingHistory.find({ owner: this.userId });
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
