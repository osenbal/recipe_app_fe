import React from 'react';

const HomeViewModel = () => {
  const [filterActive, setFilterActive] = React.useState('alll');
  const [filters, setFilters] = React.useState([
    'alll',
    'breakfast',
    'lunch',
    'shakes',
    'dinner',
  ]);

  const handleFilter = (filter: string) => {
    setFilterActive(filter);
  };

  return {
    filterActive,
    filters,
    handleFilter,
  };
};

export default HomeViewModel;
