const Error = ({ children, style = {} }) => {
  return (
    <div className="error" style={style}>
      {children}
      <style jsx>{`
        color: red;
        font-size: 1.2rem;
        padding: 1rem 0.5rem;
        text-align: center;
      `}</style>
    </div>
  )
}

export default Error
