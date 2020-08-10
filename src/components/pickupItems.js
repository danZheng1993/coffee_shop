import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {getCurTime, getPickedUp} from '../redux/selector';

const PickUpItem = ({item, curTime}) => (
  <View style={styles.itemWrapper}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemDetail}>
      Picked up {curTime - item.pickUpTime} sec(s) ago
    </Text>
  </View>
);

export const PickUpItems = () => {
  const items = useSelector(getPickedUp);
  const curTime = useSelector(getCurTime);
  const keyExtractor = useCallback((item) => `que_${item.id}`, []);
  const renderItem = useCallback(
    ({item}) => <PickUpItem item={item} curTime={curTime} />,
    [curTime],
  );
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {items.length > 0
          ? 'Items waiting for customers pickup'
          : 'All items picked up by customers'}
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
