const DeleteButton = (props) => {
    return(
      <button key={props.id} 
              id={props.id}
              name={props.name} 
              onClick={props.buttonFunction}>
        Delete
      </button>
    )
  }

export default DeleteButton