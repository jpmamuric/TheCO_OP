import * as types  from './types';
import YTSearch    from 'youtube-api-search';

const API_KEY = 'AIzaSyCntcqK95YCwYHnDt6QpULvwvuznIgbSYA';

export function fetchVideos(term) {
  return dispatch => {
    YTSearch({ key: API_KEY, term: term },
      data => {
          dispatch({ type: types.FETCH_YOUTUBE_VIDEOS, payload: data });
          dispatch({ type: types.FETCH_YOUTUBE_VIDEO, payload: data[0] });
      });
  }
}

export function fetchVideo(video) {
  return {
    type: types.FETCH_VIDEO,
    payload: video
  };
}
