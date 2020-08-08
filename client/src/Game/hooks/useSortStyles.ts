const useSortStyles = (sortOrder: string, config: any) => {
  const styleSort = {
    display: "block",
    padding: 10,
    border: `1px solid ${config.sortColor}`,
    fontSize: 18,
  };
  return {
    styleSortSuit: {
      ...styleSort,
      backgroundColor: "#D3D3D3",
      color: "#000",
    },
    styleSortRank: {
      ...styleSort,
      marginBottom: 8,
      backgroundColor: "#D3D3D3",
      color: "#000",
    },
  };
};

export default useSortStyles;
