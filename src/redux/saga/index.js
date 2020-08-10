import {call, put, takeEvery, take, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {TIME_TICK, FINISH_ITEM, PICKUP_ITEM} from '../actions';

import {
  getCurTime,
  getQue,
  getFinishedLine,
  getBaristaFinishedTime,
} from '../selector';

import {getFinishedItem, getPickedUpItem} from '../../utils';

function emitTick() {
  return eventChannel((emitter) => {
    const timerId = setInterval(() => {
      emitter('tick');
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  });
}

function* tick(action) {
  const que = yield select(getQue);
  const finished = yield select(getFinishedLine);
  const curTime = yield select(getCurTime);
  const baristaFinishedTime = yield select(getBaristaFinishedTime);

  const finishedItem = getFinishedItem(que, curTime, baristaFinishedTime);
  if (finishedItem) {
    yield put({type: FINISH_ITEM, payload: {id: finishedItem, time: curTime}});
  }
  const pickedUpItem = getPickedUpItem(finished, curTime);
  if (pickedUpItem) {
    yield put({type: PICKUP_ITEM, payload: {id: pickedUpItem, time: curTime}});
  }
}

function* mainSaga() {
  const channel = yield call(emitTick);
  yield takeEvery(TIME_TICK, tick);
  while (true) {
    yield take(channel);
    yield put({type: TIME_TICK});
  }
}

export default mainSaga;
