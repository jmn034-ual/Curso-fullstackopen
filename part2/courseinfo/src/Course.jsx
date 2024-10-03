/* eslint-disable react/prop-types */
const Header = (props) =>{
    return(
      <div>
        <h2>{props.name} </h2>
      </div>
    ) 
  }
  
  const Content = (props) => {
    const total = props.parts.reduce((total, part) => total + part.exercises, 0)
  return(
    <div>
        {props.parts.map(part => 
            <Part key={part.id} name= {part.name} exercises= {part.exercises} />
        )}
        <Total total={total}/>
    </div>
  )
  } 
  
  const Part = (props) => {
    return(
      <div>
        <p> {props.name} {props.exercises}</p>
      </div>
    )
  }

  const Total = (props) => {
    return(
        <p><strong>Total of {props.total} exercises</strong></p>
    )
  }

const Course = (props) => {

    return(
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    )

}

export default Course
