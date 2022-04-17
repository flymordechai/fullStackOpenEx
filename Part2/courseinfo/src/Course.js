import React from 'react'

const Course = (props) => {
    return(
      <div>
        <Header header={'Web development curriculum'}/> 
        {props.courses.map(c => 
          <div key={c.id}>
            <Title course={c.name}/> 
            <Content parts={c.parts}/>
            <Total parts={c.parts}/>
          </div>)}     
      </div>
    )
  }

const Header = ({ header }) => 
    <h1>
        {header}
    </h1>

const Title = ({ course }) => 
    <h2>
        {course}
    </h2>

const Total = ({ parts }) => {
    const sum = parts.map(part => 
        part.exercises).reduce(function (previousValue, currentValue) {
            return previousValue + currentValue}, 0)
        return(
            <p>Number of exercises {sum}</p>
        )
    }

const Part = (props) => 
    <p>
        {props.name} {props.exercises}
    </p>

const Content = ({ parts }) => 
    <>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}     
    </>

export default Course