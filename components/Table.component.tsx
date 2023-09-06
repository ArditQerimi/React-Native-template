import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PanResponder,
  UIManager,
} from 'react-native';

// Enable layout animation for smooth item reordering
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const VerticalTable = () => {
  const [tableData, setTableData] = useState(data);
  const [draggedItem, setDraggedItem] = useState(null);
  const cellHeight = useRef({});

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      const index = findTouchedItemIndex(gestureState.y0);
      if (index >= 0 && index < tableData.length) {
        setDraggedItem(tableData[index]);
      }
    },
    onPanResponderMove: (_, gestureState) => {},
    onPanResponderRelease: (_, gestureState) => {
      if (draggedItem) {
        const targetIndex = findTouchedItemIndex(gestureState.moveY);
        if (targetIndex >= 0 && targetIndex < tableData.length) {
          const updatedData = [...tableData];
          const draggedIndex = updatedData.findIndex(
            item => item.key === draggedItem.key,
          );
          updatedData.splice(draggedIndex, 1);
          updatedData.splice(targetIndex, 0, draggedItem);
          setTableData(updatedData);
        }
        setDraggedItem(null);
      }
    },
  });

  const findTouchedItemIndex = y => {
    let cumulativeHeight = 0;
    for (let i = 0; i < tableData.length; i++) {
      const itemHeight = cellHeight.current[i] || 0;
      cumulativeHeight += itemHeight;
      if (y <= cumulativeHeight) {
        return i;
      }
    }
    return -1; // No item found
  };

  const handleLayout = (index, height) => {
    cellHeight.current[index] = height;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        {...panResponder.panHandlers}>
        {tableData.map((item, index) => (
          <View
            key={item.key}
            style={styles.row}
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              handleLayout(index, height);
            }}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.age}</Text>
            <Text style={styles.cell}>{item.address}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default VerticalTable;
