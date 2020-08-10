import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {getCurTime, getFinishedLine} from '../redux/selector';

const FinishedItem = ({item, curTime}) => (
  <View style={styles.itemWrapper}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemDetail}>
      Finished {curTime - item.endTime} sec(s) ago
    </Text>
  </View>
);

export const FinishedItems = () => {
  const items = useSelector(getFinishedLine);
  const curTime = useSelector(getCurTime);
  const keyExtractor = useCallback((item) => `que_${item.id}`, []);
  const renderItem = useCallback(
    ({item}) => <FinishedItem item={item} curTime={curTime} />,
    [curTime],
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {items.length > 0
          ? 'Items in finished list:'
          : 'No items in finish list'}
      </Text>
      <FlatList
        data={items}
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
