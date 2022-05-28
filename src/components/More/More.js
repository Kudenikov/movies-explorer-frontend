function More(props) {
    return (
        <section className={`more ${props.isButtonMoreVisible ? "more__visible" : ""}`}>
            <button type="button" className="more__button" onClick={props.onButtonMoreClick}>Ещё</button>
        </section>
    );
  }
  
export default More;