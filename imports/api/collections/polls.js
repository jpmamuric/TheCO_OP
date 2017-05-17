import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Polls = new Mongo.Collection('polls');

Meteor.methods({
  //*** ADD POLL
  addPoll({ title, description }){
    const username = Meteor.user().username;
    // console.log(username)
    // Checkpoint 1 Validate using built in Meteor validation tools
      // console.log( 'attempting to save', title);
    check(title, String);
    check(description, String);

    //Checkpoint 2 Validate using 3rd-party Schema
      // console.log('passed validation test 1, moving to test 2');
      new SimpleSchema({
        title: { type: String },
        description: { type: String }
      }).validate({ title, description });

    //Checkpoint 3 Check if user is Logged in
      // console.log('passed validation test 2, checking authorizations...');
      // Make sure the user is logged
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }

    //Checkpoint 4 Check if user is Admin
      // console.log('passed authorizations, checking to see if you\'re an admin')
      if ( username !== Meteor.settings.public.username) {
        console.log('sorry admin only');
        throw new Meteor.Error('not-authorized');
      }

    //Save poll to Database
      // console.log('saving to Polls Database')
    Polls.insert({
      title,
      description,
      createdAt: new Date(),
      owner: this.userId,
      username: username,
      totalVotes: 0
    });

    //Confirm Client side Save
      // console.log( title, 'saved!')

  },

  //*** REMOVE POLL
  removePoll(pollId){
    const username = Meteor.user().username;
    check(pollId, String);

    new SimpleSchema({
      pollId : { type: String }
    }).validate({pollId});

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if ( username !== Meteor.settings.public.username) {
      console.log('sorry admin only');
      throw new Meteor.Error('not-authorized');
    }

    Polls.remove(pollId)
  },

  //*** FETCH USER IP ADDRESS
  fetchIpAddress(ip) {
    console.log(ip)
  }

});
