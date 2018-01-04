import Button from './Button'

const LogOutButton = props => {
  return (
    <div className="log-out-button">
      <Button className='black' onClick={props.logOut}>Log out</Button>
      <style jsx>{`
        .log-out-button {
          padding: 1rem;
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default LogOutButton