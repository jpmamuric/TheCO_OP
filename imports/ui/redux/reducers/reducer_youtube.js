import * as types from '../actions/types';

const initialState = {
  videos: [],
  selectedVideo: null
};

export default (state = initialState, action ) => {
  switch (action.type) {
    case types.FETCH_YOUTUBE_VIDEOS:
      return { ...state, videos: action.payload };
    case types.FETCH_YOUTUBE_VIDEO:
      return { ...state, selectedVideo: action.payload };
    default:
      return state;
  }
}
