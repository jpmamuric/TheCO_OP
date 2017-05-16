import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Countdowns = new Mongo.Collection('countdowns');

Meteor.methods({
  changeCountdownDate({ countdownId, countdownDate }) {
    const username = Meteor.user().username;
    check(countdownId, String);
    check(countdownDate, String);

    new SimpleSchema({
      countdownId : { type: String },
      countdownDate : { type: String }
    }).validate({ countdownId, countdownDate });

    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Countdowns.update(countdownId, { $set: { date: countdownDate }})
  }
});
