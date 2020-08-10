import uuid from 'react-native-uuid';

import {ORDER_ITEM, FINISH_ITEM, PICKUP_ITEM, TIME_TICK} from '../actions';

const initialState = {
  que: [],
  finished: [],
  pickedUp: [],
  curTime: 0,
  baristaFinishedTime: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ITEM: {
      const id = uuid.v4();
      const item = action.payload;
      return {
        ...state,
        que: [...state.que, {id, ...item, startTime: state.curTime}],
      };
    }
    case FINISH_ITEM: {
      const {id, time} = action.payload;
      const item = state.que.find((_item) => _item.id === id);
      return {
        ...state,
        finished: [...state.finished, {...item, endTime: time}],
        que: state.que.filter((_item) => _item.id !== id),
        baristaFinishedTime: time,
      };
    }
    case PICKUP_ITEM: {
      const {id, time} = action.payload;
      const item = state.finished.find((_item) => _item.id === id);
      return {
        ...state,
        pickedUp: [...state.pickedUp, {...item, pickUpTime: time}],
        finished: state.finished.filter((_item) => _item.id !== id),
      };
    }
    case TIME_TICK: {
      return {
        ...state,
        curTime: state.curTime + 1,
      };
    }
    default:
      return state;
  }
};
