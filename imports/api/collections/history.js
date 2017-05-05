import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import  { Polls }  from './polls';

export const VotingHistory = new Mongo.Collection('votingHistory');

Meteor.methods({
  //*** ADD POLL
  addVoteHistory({ title }){
    const username = Meteor.user().username;
    console.log(username)
    // Checkpoint 1 Validate using built in Meteor validation tools
    console.log( 'attempting to save', title);
    check(title, String);

    //Checkpoint 2 Validate using 3rd-party Schema
    console.log('passed validation test 1, moving to test 2');
      new SimpleSchema({
        title: { type: String }
      }).validate({ title });

    //Checkpoint 3 Check if user is Logged in
    console.log('passed validation test 2, checking authorizations...');
      // Make sure the user is logged
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

    //Save poll to Database
    console.log('saving to Polls Database')
    VotingHistory.insert({
      title,
      createdAt: new Date(),
      owner: this.userId
    });

    //Confirm Client side Save
    console.log( title, 'saved!')

  },

  //*** VOTE POLL
  votePoll({ pollId }) {
    const username = Meteor.user().username;
    check(pollId, String);

    new SimpleSchema({
      pollId : { type: String }
    }).validate({pollId});

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Polls.update(pollId, { $inc: { totalVotes: 1 }})
  }
});
