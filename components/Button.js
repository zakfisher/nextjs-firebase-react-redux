const { color1 } = require('../styles/colors')

const Button = ({ onClick, children, className, style = {} }) => {
  return (
    <button className={className} onClick={onClick} style={style}>
      {children}
      <style jsx>{`
        button {
          background: ${color1};
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
          height: 4rem;
          padding: 0 2rem;
          transition: all 300ms ease;
          text-transform: uppercase;
          display: flex;
          margin: auto;
        }

        button:hover {
          background: #333;
          color: white;
        }

        button.black {
          background: #111;
          color: #aaa;
        }

        button.black:hover {
          background: ${color1};
          color: white;
        }
      `}</style>
    </button>
  )
}

export default Button
