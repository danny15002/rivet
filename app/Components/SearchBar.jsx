class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBy: '',
      searchInput:  ''
    }

    this.setSearchBy = this.setSearchBy.bind(this);
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.filter = this.filter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

  }

  setSearchBy(event) {
    this.setState({ searchBy: event.target.value });
  }

  updateSearchInput(event) {
    this.setState({ searchInput: event.target.value });
  }

  filter() {
    this.props.filter(this.state.searchBy, this.state.searchInput)
  }

  clearFilter() {
    this.setState({
      searchBy: '',
      searchInput:  ''
    })
    this.props.filter(null);
  }

  render() {
    return <div className="search-bar">
      <div>
        <select onChange={this.setSearchBy} value={this.state.searchBy}>
          <option disabled selected>Search By:</option>
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="genre">Genre</option>
          <option value="rating">Rating</option>
          <option value="actors">Actor</option>
        </select>
        <input
          id="search-input"
          placeholder="Choose a category and type here to search."
          onChange={this.updateSearchInput}
          value={this.state.searchInput}/>
        <input type="button" value="SEARCH" onClick={this.filter}/>
      </div>
      <input type="button" value="CLEAR SEARCH" onClick={this.clearFilter}/>
    </div>;
  }
}
