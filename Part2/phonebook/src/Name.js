import DeleteButton from './DeleteButton'

const Name = (props) => {
    return(
      <div key={props.id}>
        {props.name} {props.number} <DeleteButton 
            id={props.id} 
            name={props.name}
            buttonFunction={props.buttonFunction}/>
      </div>
    )
  }

export default Name