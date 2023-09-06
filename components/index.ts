export const initColumns = [
  {
    id: 'name',
    disablePadding: true,
    label: 'Name',
    type: 'text',
    show: true,
    isSearchable: true,
  },
  {
    id: 'capacity',
    disablePadding: true,
    label: 'Capacity',
    type: 'text',
    show: true,
    isSearchable: true,
  },
  {
    id: 'price',
    disablePadding: true,
    label: 'Price',
    type: 'text',
    show: true,
    isSearchable: true,
  },
  {
    id: 'numberOfRooms',
    disablePadding: true,
    label: 'NumberOfRooms',
    type: 'text',
    show: true,
    isSearchable: true,
  },

  {
    id: 'description',
    disablePadding: true,
    label: 'Description',
    type: 'text',
    show: true,
    isSearchable: true,
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
  },
];

export let formatRows = apartments => {
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
