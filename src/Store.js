import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reactotron from './ReactotronConfig.js';
import reducers from './redux/reducer';
import mainSaga from './redux/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(Reactotron.createEnhancer(), applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(mainSaga);

export default store;
