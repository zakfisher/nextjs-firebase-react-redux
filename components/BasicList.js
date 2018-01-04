import Link from 'next/link'

const BasicList = ({ list, as, href, idKey, nameKey }) => {
  return (
    <ul className="basic-list">
      {
        list.map((item, i) => (
          <Link key={i}
            as={`${as}/${item[idKey]}`}
            href={`${href}?${idKey}=${item[idKey]}`}>
            <li><a>{item[nameKey]}</a></li>
          </Link>
        ))
      }

      <style jsx>{`
        li {
          background: #eee;
          color: #333;
          cursor: pointer;
          font-size: 1.4rem;
          height: 4rem;
          width: 100%;
          display: flex;
          align-items: center;
          height: 5rem;
          font-size: 1.6rem;
          padding: 1rem 1.5rem;
          transition: background 300ms ease;
          margin-bottom: 1rem;
        }

        li:last-child {
          margin-bottom: 0;
        }

        li:hover {
          background: #ccc;
        }
      `}</style>
    </ul>
  )
}

export default BasicList
