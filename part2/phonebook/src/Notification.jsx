// eslint-disable-next-line react/prop-types
const Notification = ({ message, isError }) => {

    const added =  {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const error = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }
    const styleNotification = isError ? error : added

    if (message === null) {
      return null
    }
  
    return (
      <div style={styleNotification}>
        {message}
      </div>
    )
  }

  export default Notification