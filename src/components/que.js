import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {getQue, getCurTime} from '../redux/selector';

const QueItem = ({item, curTime}) => (
  <View style={styles.itemWrapper}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemName}>
      Ordered {curTime - item.startTime} sec(s) ago
    </Text>
  </View>
);

export const Que = () => {
  const que = useSelector(getQue);
  const curTime = useSelector(getCurTime);
  const lastOrderedTimeDiff = que[0] ? curTime - que[0].startTime : 0;
  const keyExtractor = useCallback((item) => `que_${item.id}`, []);
  const renderItem = useCallback(
    ({item}) => <QueItem item={item} curTime={curTime} />,
    [curTime],
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {que.length > 0
          ? `Items in waiting list: last order(${lastOrderedTimeDiff} secs ago)`
          : 'No items in que'}
      </Text>
      <FlatList
        data={que}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={curTime}
      />
    </View>
  );
};

const styles = {
  wrapper: {
    padding: 16,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemName: {
    marginRight: 8,
  },
};
