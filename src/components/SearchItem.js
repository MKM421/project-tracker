// PACKAGE IMPORTS
import React, { useContext } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Controls from "./controls/Controls";
import Search from "@material-ui/icons/Search";
// FILE IMPORTS
import FiltersContext from '../context/filters-context';

const SearchItem = () => {
  const { filtersDispatch } = useContext(FiltersContext);

  return (
    <>
      <Controls.Input
        label="Search"
        placeholder="Name"
        margin="dense"
        className="search-box"
        InputProps={{
          startAdornment: (<InputAdornment position="start">
            <Search />
          </InputAdornment>)
        }}
        onChange={(e) => filtersDispatch({ type: 'SET_TEXT_FILTER', text: e.target.value })}
      />
    </>
  )
}

export default SearchItem
