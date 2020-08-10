import React, {useCallback} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {orderItem} from '../../redux/actions';
import {MENU} from '../../constants';
import {PickUpItems, Que, FinishedItems} from '../../components';

const MenuItem = ({item, onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={() => onPress(item)}>
    <Text style={styles.menuLabel}>{item.name}</Text>
  </TouchableOpacity>
);

export default () => {
  const dispatch = useDispatch();
  const onAddItem = useCallback(
    (item) => {
      dispatch(orderItem(item));
    },
    [dispatch],
  );
  const renderItem = useCallback(
    ({item}) => <MenuItem item={item} onPress={onAddItem} />,
    [onAddItem],
  );
  const keyExtractor = useCallback((item) => item.sku, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.menuWrapper}>
        <Text style={styles.menuSectionTitle}>Please select one to order:</Text>
        <FlatList
          data={MENU}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
      <Que />
      <FinishedItems />
      <PickUpItems />
    </SafeAreaView>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuWrapper: {
    padding: 16,
  },
  menuSectionTitle: {
    fontSize: 16,
    paddingBottom: 16,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#F3F3F3',
  },
  menuLabel: {
    color: '#D33FEF',
  },
};
