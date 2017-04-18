import axios              from 'axios';
import { Meteor }         from 'meteor/meteor'
import * as types         from './types';

// Change state of email and password
export const titleInputChange = text => ({ type: types.POLL_TITLE_INPUT_CHANGE, title: text });
export const descriptionInputChange = text => ({ type: types.POLL_DESCRIPTION_INPUT_CHANGE, description: text });

export const fetchIpAddress = () => {
  return dispatch => {
    axios.get('https://jsonip.com/')
      .then(res => {
        const ip = res.data.ip
        Meteor.call( 'fetchIpAddress', { ip }, error => {
          if (error) {
            console.log(error);
          } else {
            console.log('success');
          }
        });
      })
      .catch( err=>{
        console.log(err);
      });
  }
}
