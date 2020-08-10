export const ORDER_ITEM = 'ORDER_ITEM';
export const FINISH_ITEM = 'FINISH_ITEM';
export const PICKUP_ITEM = 'PICKUP_ITEM';
export const TIME_TICK = 'TIME_TICK';

export const orderItem = (item) => ({type: ORDER_ITEM, payload: item});
export const finishItem = (id, time) => ({
  type: FINISH_ITEM,
  payload: {id, time},
});
export const pickupItem = (id, time) => ({
  type: PICKUP_ITEM,
  payload: {id, time},
});
export const timeTick = () => ({type: TIME_TICK});
