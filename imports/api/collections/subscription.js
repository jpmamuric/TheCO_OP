import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Subscriptions = new Mongo.Collection('Subscriptions');
