function FilterCheckbox(props) {

    return (
        <label className="switch">
            <input 
                type="checkbox" 
                checked={props.checked} 
                onChange={props.changeCheckbox}
            />
            <span className="slider round" />
        </label>
    );
  }
  
export default FilterCheckbox;