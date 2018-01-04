import Loader from './Loader'
import NavBar from './NavBar'
import NavSideBar from './NavSideBar'
import LogOutButton from './LogOutButton'

const DashboardLayout = props => {
  if (!props.user) return <Loader />

  return (
    <div className="dashboard-layout">
      <NavBar {...props} />

      <div className="sidebar">
        <NavSideBar {...props} />
        <LogOutButton {...props} />
      </div>

      <div className="content">
        <div className="inner">
          {props.children}
        </div>
      </div>

      <style jsx>{`
        .dashboard-layout {
          width: 100%;
        }

        .sidebar {
          background: #222;
          height: 100vh;
          padding-top: 6rem;
          position: fixed;
          top: 0;
          width: 20rem;
          z-index: 1;
        }

        h1 {
          color: white;
        }

        .content {
          padding-left: 20rem;
        }

        .inner {
          background: white;
          margin: 7.5rem 1.5rem 1.5rem;
          padding: 1.5rem;
          min-height: calc(100vh - 9rem);
        }
      `}</style>
    </div>
  )
}

export default DashboardLayout