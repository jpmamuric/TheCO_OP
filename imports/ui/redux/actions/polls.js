import * as types         from './types';

// Change state of email and password
export const titleInputChange = text => ({ type: types.POLL_TITLE_INPUT_CHANGE, title: text });
export const descriptionInputChange = text => ({ type: types.POLL_DESCRIPTION_INPUT_CHANGE, description: text });
