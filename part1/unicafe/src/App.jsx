const Header = (props) =>{
  return(
    <div>
      <h1>{props.course} </h1>
    </div>
  ) 
}

const Content = (props) => {
return(
  <div>
    <Part part= {props.part1} exercises= {props.exercises1} />
    <Part part= {props.part2} exercises= {props.exercises2} />
    <Part part= {props.part3} exercises= {props.exercises3} />
  </div>
)
} 

const Part = (props) => {
  return(
    <div>
      <p> {props.part} {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Ejercicio Unicafe'
  const part1 = 'Fundamentos de React'
  const exercises1 = 10
  const part2 = 'Usando props para pasar datos'
  const exercises2 = 7
  const part3 = 'Estado de un componente'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1= {part1} exercises1={exercises1} part2= {part2} exercises2={exercises2} part3= {part3} exercises3={exercises3} />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App