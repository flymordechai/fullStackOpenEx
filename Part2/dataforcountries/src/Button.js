const Button= (props) => {
    return(
        <button key={props.key} value={props.value} onClick={props.buttonBehaviour}>
          show
        </button>
    )
  }

export default Button