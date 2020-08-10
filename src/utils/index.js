import {PICKUP_INTERVAL} from '../constants';

export const getFinishedItem = (que, time, finishedTime) => {
  for (let i = 0; i < que.length; i += 1) {
    if (que[i]) {
      const {startTime, prepTime, id} = que[i];
      if (Math.max(finishedTime, startTime) + prepTime === time) {
        return id;
      }
      return false;
    }
  }
  return false;
};

export const getPickedUpItem = (finished, time) => {
  for (let i = 0; i < finished.length; i += 1) {
    if (finished[i]) {
      const {endTime, id} = finished[i];
      if (endTime + PICKUP_INTERVAL === time) {
        return id;
      }
    }
  }
  return false;
};
