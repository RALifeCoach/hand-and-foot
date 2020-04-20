const useSortStyles = (sortOrder, config) => {
  const styleSort = {
    display: 'block',
    padding: 10,
    border: `1px solid ${config.sortColor}`,
    fontSize: 18,
  }
  return {
    styleSortSuit: {
      ...styleSort,
      ...sortOrder === 'suit'
        ? {
          backgroundColor: '#3D3D3D',
          color: '#FFF',
        }
        : {
          backgroundColor: '#D3D3D3',
          color: '#000',
        }
    },
    styleSortRank: {
      ...styleSort,
      marginBottom: 8,
      ...sortOrder === 'rank'
        ? {
          backgroundColor: '#3D3D3D',
          color: '#FFF',
        }
        : {
          backgroundColor: '#D3D3D3',
          color: '#000',
        }
    }
  }
};

export default useSortStyles;
