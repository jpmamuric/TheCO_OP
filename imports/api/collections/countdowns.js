import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const Countdowns = new Mongo.Collection('countdowns');

Meteor.methods({
  changeDate({ countdownId }){
    
  }
});
