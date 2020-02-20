import { setTrackersData } from '../actions/trackers';

export const getTrackers = () => (dispatch) => {
  let trackersData = JSON.parse(localStorage.getItem('trackersData'));
  if(trackersData === null) {
    trackersData = [];
  }
  dispatch(setTrackersData(trackersData));
}
export const setTrackers = (trackersData) => (dispatch) => {
  localStorage.setItem('trackersData', JSON.stringify(trackersData));
  dispatch(setTrackersData(trackersData));
}