import { SET_TRACKERS_DATA } from "../actions/trackers";

const initialState = {
	trackersData: [],
};

export default function (state = initialState, { payload, type }) {
	switch (type) {
		case SET_TRACKERS_DATA: 
			return {
				...state,
				trackersData: payload.trackersData,
			}
		
		default:
			return state;
	}
}
