import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [searchText, setSearchText] = useState('');

  const onChange = e => {
    setSearchText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (searchText === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(searchText);
      setSearchText('');
    }
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="searchText"
          placeholder="Search Users..."
          value={searchText}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;