const NavBar = props => {
  if (!props.user) return null
  return (
    <div className="nav-bar">
      <div className="logo" />
      <div className="title" />
      <h1>{props.user.displayName}</h1>
      <style jsx>{`
        .nav-bar {
          background: #101010;
          padding: 1rem 0.5rem;
          position: fixed;
          top: 0;
          height: 6rem;
          width: 100%;
          z-index: 10;
        }

        .logo {
          background: #333;
          border-radius: 100%;
          height: 3.5rem;
          width: 3.5rem;
          position: absolute;
          left: 0.5rem;
          top: 1.25rem;
        }

        .title {
          background: #333;
          height: 1rem;
          width: 20rem;
          position: absolute;
          left: 5rem;
          top: 2.5rem;
        }

        h1 {
          color: white;
          display: flex;
          align-items: center;
          font-weight: normal;
          position: absolute;
          height: 100%;
          right: 2rem;
          top: 0;
        }
      `}</style>
    </div>
  )
}

export default NavBar