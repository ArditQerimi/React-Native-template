import React from 'react';
import {View, FlatList, Text, TouchableOpacity, ScrollView} from 'react-native';

const initColumns = [
  {
    id: 'name',
    disablePadding: true,
    label: 'Name',
    type: 'text',
    show: true,
    isSearchable: true,
    width: 150,
  },
  {
    id: 'capacity',
    disablePadding: true,
    label: 'Capacity',
    type: 'text',
    show: true,
    isSearchable: true,
    width: 130,
  },
  {
    id: 'price',
    disablePadding: true,
    label: 'Price',
    type: 'text',
    show: true,
    isSearchable: true,
    width: 110,
  },
  {
    id: 'numberOfRooms',
    disablePadding: true,
    label: 'Number of Rooms',
    type: 'text',
    show: true,
    isSearchable: true,
    width: 100,
  },
  {
    id: 'description',
    disablePadding: true,
    label: 'Description',
    type: 'text',
    show: true,
    isSearchable: true,
    width: 170,
  },
  {
    id: 'action',
    disablePadding: false,
    label: 'Action',
    type: 'actions',
    show: true,
    align: 'right',
    minWidth: 20,
    excludeFromExport: true,
    width: 180,
  },
];

const dummyData = [
  {
    id: 1,
    name: 'Apartment 1',
    capacity: 3,
    price: 150,
    numberOfRooms: 2,
    description: 'Description for Apartment 1',
  },
  {
    id: 2,
    name: 'Apartment 2',
    capacity: 4,
    price: 180,
    numberOfRooms: 3,
    description: 'Description for Apartment 2',
  },
  {
    id: 3,
    name: 'Apartment 3',
    capacity: 2,
    price: 130,
    numberOfRooms: 1,
    description: 'Description for Apartment 3',
  },
  {
    id: 4,
    name: 'Apartment 4',
    capacity: 5,
    price: 200,
    numberOfRooms: 4,
    description: 'Description for Apartment 4',
  },
];

const formatRows = apartments => {
  let result = apartments.map(apartment => {
    return {
      key: 'apartment_' + apartment.id,
      id: apartment.id,
      data: [
        {
          key: 'name_' + apartment.id,
          value: apartment.name,
          columnId: 'name',
        },
        {
          key: 'capacity_' + apartment.id,
          value: apartment.capacity,
          columnId: 'capacity',
        },
        {
          key: 'price_' + apartment.id,
          value: apartment.price,
          columnId: 'price',
        },
        {
          key: 'numberOfRooms_' + apartment.id,
          value: apartment.numberOfRooms,
          columnId: 'numberOfRooms',
        },
        {
          key: 'description_' + apartment.id,
          value: apartment.description,
          columnId: 'description',
        },
        {
          key: 'action_' + apartment.id,
          value: ['delete', 'edit'],
          type: 'actions',
          align: 'right',
          minWidth: 20,
          columnId: 'action',
        },
      ],
    };
  });

  return result;
};

const TableActions = props => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      {props.item?.value?.map(action => (
        <TouchableOpacity
          key={action}
          style={{marginHorizontal: 5}}
          onPress={() => {
            if (action === 'edit') {
              props.onEditClick(props.rowId);
            } else if (action === 'delete') {
              props.onDeleteClick(props.rowId);
            }
          }}>
          <Text>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

function TableRow({data, onEditClick, onDeleteClick, rowId}) {
  return (
    <View
      style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc'}}>
      {data.map(item => (
        <View
          key={item.key}
          style={{
            flex: 1,
            padding: 10,
            width: item.width,
            alignItems:
              item?.column?.align === 'right' ? 'flex-end' : 'flex-start',
          }}>
          {item?.type === 'actions' && (
            <TableActions
              rowId={rowId}
              item={item}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          )}
          {item?.type !== 'actions' && <Text> {item.value}</Text>}
        </View>
      ))}
    </View>
  );
}

function Table({columns, data, onEditClick, onDeleteClick}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#ccc',
        }}>
        {columns.map(column => (
          <View
            key={column.id}
            style={{flex: 1, padding: 10, width: column.width}}>
            <Text>{column.label}</Text>
          </View>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const newItemData = item.data.map(d => {
            const matchingColumn = columns.find(c => d.columnId === c.id);

            if (matchingColumn) {
              const newD = {...d, width: matchingColumn.width};
              return newD;
            }

            return d;
          });

          return (
            <TableRow
              rowId={item.id}
              data={newItemData}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          );
        }}
      />
    </View>
  );
}

export default function App() {
  const rows = formatRows(dummyData);

  const handleEditClick = rowId => {
    const foundedData = dummyData.find(dd => dd.id === rowId);
    console.log(foundedData);
  };

  const handleDeleteClick = rowId => {
    console.log(rowId);
  };

  return (
    <ScrollView horizontal={true} style={{flex: 1, padding: 16}}>
      <Table
        columns={initColumns}
        data={rows}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </ScrollView>
  );
}
