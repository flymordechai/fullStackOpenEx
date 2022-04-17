import Button from './Button'

const Name = (props) => {
    return(
      <div key={props.key}>
        {props.name} <Button key={props.key} value={props.name} buttonBehaviour={props.buttonBehaviour}/>
      </div>
    )
  }



export default Name