function ResultBlock(props) {

    return (
        <h2 className={`result-block__text ${props.isResultBlockVisible ? "result-block__visible" : ""}`}>{props.resultText}</h2>
    );
  }
  
export default ResultBlock;