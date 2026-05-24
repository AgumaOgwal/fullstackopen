const SearchFilter = (props) => 

        <div>
          <form>
          <input value={props.filterBy} onChange={props.filterNames} />
          </form>
        </div>

export default SearchFilter