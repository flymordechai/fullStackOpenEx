import Name from './Name'

const Persons = (props) => {
    return(
      <div>
        {props.mapValue.map(person => 
          <Name key={person.id}
                id={person.id}
                name={person.name} 
                number={person.number} 
                buttonFunction={props.buttonFunction}/>)}
      </div>
    )
  }

export default Persons