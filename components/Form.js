import { Component } from 'react'
import { color1 } from '../styles/colors'

class Form extends Component {
  constructor() {
    super()
    this.onEnterKeyDown = this.onEnterKeyDown.bind(this)
  }

  componentDidMount() {
    this.refs.form.addEventListener('keydown', this.onEnterKeyDown)
  }

  onEnterKeyDown(e) {
    if (e.keyCode !== 13) return
    e.preventDefault()
    this.props.submit()
  }

  render() {
    const { title, desc, children } = this.props
    return (
      <form onSubmit={e => e.preventDefault()} ref='form'>
        {
          title
          ? <h1>{title}</h1>
          : null
        }
        {
          desc
          ? <p dangerouslySetInnerHTML={{ __html: desc }} />
          : null
        }
        {children}
        <style jsx>{`
          h1 {
            color: ${color1};
            font-size: 2.4rem;
            padding-bottom: 1rem;
          }
          p {
            color: #999;
            font-size: 1.4rem;
            padding-bottom: 2rem;
          }
        `}</style>
      </form>
    )
  }
}

export default Form
