import Name from './Name'
import BasicData from './BasicData'

const Countries = (props) => {
      if (props.mapValue.length === 1) {
        return(
          <div>
            <BasicData basicData={props.mapValue[0]}/>
          </div>
        )
      } else {
        return(
          <div>
          {props.mapValue.map(country => 
            <Name key={country.name.cioc} 
                  name={country.name.common} 
                  buttonBehaviour={props.buttonBehaviour}/>)}
          </div>
        )
      }
  }

export default Countries