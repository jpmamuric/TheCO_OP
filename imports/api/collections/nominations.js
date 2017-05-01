import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Nominations = new Mongo.Collection('nominations');


Meteor.methods({
  addNomination({ name, websiteUrl, fullName, description }){

    // Checkpoint 1 Validate using built in Meteor validation tools
    console.log( 'attempting to save', name, websiteUrl, fullName, description )
    check(name, String);
    check(websiteUrl, String);
    check(description, String);
    check(fullName, String );

    //Checkpoint 2 Validate using 3rd-party Schema
    console.log('passed validation test 1, moving to test 2');
      new SimpleSchema({
        name: { type: String },
        websiteUrl: { type: String },
        description: { type: String },
        fullName: { type: String },
      }).validate({ name, websiteUrl, fullName, description });

    //Checkpoint 3 Check if user is Logged in
    console.log('passed validation test 2, checking authorizations...');
      // Make sure the user is logged
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

    //Save poll to Database
    console.log('saving to Nomination to Database')
    Nominations.insert({
      name,
      websiteUrl,
      fullName,
      description,
      createdAt: new Date(),
      owner: this.userId,
      vetted: false,
      totalVotes: 0
    });

    //Confirm Client side Save
    console.log( name, 'saved!')

  },
  removeNomination({ nominationId }){
    const username = Meteor.user().username;
    check(nominationId, String);

    new SimpleSchema({
      nominationId : { type: String }
    }).validate({nominationId});

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Nominations.remove(nominationId)
  },

  vetNomination({ nominationId }) {
    const username = Meteor.user().username;
    check(nominationId, String);

    new SimpleSchema({
      nominationId : { type: String }
    }).validate({nominationId});

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Nominations.update(nominationId, { $set: {vetted: true }})
  },

  unvetNomination({ nominationId }) {
    const username = Meteor.user().username;
    check(nominationId, String);

    new SimpleSchema({
      nominationId : { type: String }
    }).validate({nominationId});

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Nominations.update(nominationId, { $set: {vetted: false }})
  }
});
