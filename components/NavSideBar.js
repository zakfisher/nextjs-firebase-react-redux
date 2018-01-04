import { Component } from 'react'
import Link from 'next/link'
// import { TweenMax } from 'gsap'
const { color1 } = require('../styles/colors')

const userLinks = [
  { href: '/home', title: 'Home' },
  // { href: '/billing', title: 'Billing' },
  { href: ['/products', '/product-detail'], title: 'Products' },
  // { href: '/profile', title: 'Profile' },
  // { href: '/integrations', title: 'Integrations' },
  // { href: '/account', title: 'Account' },
  // { href: '/features', title: 'Features' },
  { href: '/settings', title: 'Settings' },
  { href: '/help', title: 'Help' },
]

const adminLinks = [
  { href: ['/users', '/user-detail'], title: 'Users' },
  { href: ['/new-user'], title: 'New User' },
  { href: ['/new-product'], title: 'New Product' },
]

class NavSideBar extends Component {
  render() {
    return (
      <nav>
        { Links(userLinks, this) }
        {
          this.props.user.customClaims.admin
          ? (
              <div className="admin-links">
                { Links(adminLinks, this) }
              </div>
            )
          : null
        }
        <style jsx>{`
          nav {
            display: flex;
            flex-direction: column;
          }

          .admin-links {
            background: #333;
          }
        `}</style>
      </nav>
    )
  }
}

const Links = (links, nav) => {
  return links.map((link, i) => <NavLink key={i} link={link} nav={nav} />)
}

const NavLink = ({ link, nav }) => {
  const { href, title } = link

  const { pathname } = nav.props.url
  const isActive = href.includes(pathname)

  let url = href
  if (Array.isArray(href)) url = href[0]

  return (
    <Link href={url}>
      <a className={isActive ? 'active' : ''}>
        {title}
        <style jsx>{`
          a {
            align-items: center;
            color: #ccc;
            display: flex;
            font-size: 1.4rem;
            height: 4rem;
            padding-left: 1rem;
            transition: all 300ms ease;
          }

          a.active,
          a:hover {
            background: ${color1};
            color: white;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default NavSideBar