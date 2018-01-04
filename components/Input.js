import { Component } from 'react'
import Button from './Button'
import { color1 } from '../styles/colors'

class Input extends Component {
  constructor() {
    super()

    this.state = {
      showSelectOptions: false
    }

    this.onChange = this.onChange.bind(this)
  }

  static getInitialProps() {
    return {
      className: '',
      disabled: false,
      float: 'none',
      formatValue: () => {},
      hasLabel: true,
      field: {},
      id: '',
      onClick: () => {},
      labelWidth: '20rem',
      options: [],
      parent: {},
      placeholder: '',
      stateKey: '',
      type: '',
    }
  }

  onChange(e) {
    const { parent, disabled, field, stateKey, formatValue } = this.props
    if (disabled) return

    let value = e.target.value

    // Display formatted value
    if (formatValue) {
      const oldValue = parent.state[stateKey][field.name]
      value = formatValue(oldValue, value)
    }

    parent.setState({
      [stateKey]: {
        ...parent.state[stateKey],
        [field.name]: value
      }
    })
  }

  get Text() {
    const { disabled, field, id, type, placeholder, maxLength } = this.props
    return (
      <span>
      <input
        value={field.value}
        disabled={disabled}
        id={id}
        name={field.name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={this.onChange}
        />
        <style jsx>{`
          input {
            background: #eee;
            height: 4rem;
            font-size: 1.6rem;
            padding: 1rem;
            transition: background 300ms ease;
            width: 100%;
          }
          input::placeholder {
            color: #aaa;
          }
          input:focus::placeholder {
            color: #ccc;
          }
          input:hover:not(:focus):not([disabled]) {
            background: #ccc;
          }
          input:focus {
            background: ${color1};
            color: white;
          }
          input[disabled] {
            background: none;
            cursor: default;
          }
        `}</style>
      </span>
    )
  }

  get Checkbox() {
    const { disabled, field, Text } = this.props

    const onClick = value => {
      this.onChange({
        target: { value: !field.value }
      })
    }

    let className = 'checkbox'
    if (disabled) className += ' disabled'
    if (field.value) className += ' active'

    return (
      <div className={className}>
        <div className='box' onClick={onClick.bind(this)}>
          {
            field.value
            ? <div className="check" />
            : null
          }
        </div>
        <Text />
        <style jsx>{`
          .checkbox {
            display: flex;
            align-items: center;
          }
          .box {
            cursor: pointer;
            background: #eee;
            height: 3rem;
            width: 3rem;
            margin-right: 1rem;
            transition: background 300ms ease;
          }
          .box:hover {
            background: #ccc;
          }
          .check {
            position: absolute;
            height: 100%;
            width: 100%;
            background: url(/static/checkbox.svg);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 80% 80%;
          }
        `}</style>
      </div>
    )
  }

  get Radio() {
    const { disabled, field, options } = this.props

    const onClick = value => {
      this.onChange({
        target: { value }
      })
    }

    const Option = option => {
      const { key, value } = option
      let className = 'option'
      if (disabled) className += ' disabled'
      if (value.toString() === field.value.toString()) className += ' active'
      return (
        <div key={key}
          className={className}
          onClick={() => onClick(value)}>
          <div className='indicator' />
          <p>{value}</p>
          <style jsx>{`
            .option {
              background: white;
              cursor: pointer;
              height: 4rem;
              width: 12rem;
              float: left;
              display: flex;
              align-items: center;
              transition: background 300ms ease;
            }
            .option:hover {
              background: #eee;
            }
            .indicator {
              background: #ccc;
              border-radius: 100%;
              float: left;
              height: 3rem;
              width: 3rem;
              margin: 0 1rem;
            }
            .option.active .indicator {
              background: ${color1};
              border: 7px solid #ccc;
            }
            .option.disabled {
              pointer-events: none;
            }
            .option.active.disabled .indicator {
              background: #999;
            }
            p {
              font-size: 1.4rem;
              word-wrap: break-word;
              white-space: normal;
              width: 50%;
            }
          `}</style>
        </div>
      )
    }

    return (
      <div className="radio-container">
        {options.map(Option)}
        <style jsx>{`
          .radio-container {
            min-height: 4rem;
          }
        `}</style>
      </div>
    )
  }

  get Select() {
    const { disabled, field, options } = this.props

    const onClick = value => {
      this.onChange({
        target: { value }
      })
      this.setState({
        showSelectOptions: false
      })
    }

    const Option = option => {
      const { key, value } = option
      let className = 'option'
      if (disabled) className += ' disabled'
      if (value === field.value) className += ' active'
      return (
        <div key={key}
          className={className}
          onClick={() => onClick(value)}>
          <p>{value}</p>
          <style jsx>{`
            .option {
              background: white;
              border-bottom: 1px solid #eee;
              height: 4rem;
              display: flex;
              align-items: center;
              cursor: pointer;
              padding-left: 1rem;
            }
            .option:last-child {
              border-bottom: none;
            }
            .option:not(.active):hover {
              background: #eee;
            }
            .option.active {
              background: ${color1};
            }
            .option.active p {
              color: white;
            }
            p {
              font-size: 1.4rem;
              word-wrap: break-word;
              white-space: normal;
              cursor: pointer;
            }
          `}</style>
        </div>
      )
    }

    const currentValue = field.value || (<span style={{ color: '#aaa' }}>{this.props.placeholder}</span>)
    return (
      <div className="select-container">
        <div className={`current-value ${this.state.showSelectOptions ? 'open' : ''}`} onClick={() => {
          this.setState({ showSelectOptions: !this.state.showSelectOptions })
        }}>
          <p>{currentValue}</p>
        </div>
        {
          this.state.showSelectOptions
          ? <div className="options">{options.map(Option)}</div>
          : null
        }
        <style jsx>{`
          .select-container {
            z-index: 2;
          }
          .select-container,
          .select-container > div {
            min-height: 4rem;
          }
          .current-value {
            display: flex;
            align-items: center;
            padding-left: 1rem;
            background: #eee;
            cursor: pointer;
            transition: background 300ms ease;
          }
          .current-value:hover {
            background: #ccc;
          }
          .current-value::after {
            content: '';
            border-right: 0.75rem solid transparent;
            border-left: 0.75rem solid transparent;
            border-top: 1rem solid #999;
            border-bottom: 0.75rem solid transparent;
            position: absolute;
            height: 0;
            width: 0;
            right: 0.75rem;
            top: 0.75rem;
            bottom: 0;
            margin: auto;
          }
          .current-value.open::after {
            border-right: 0.75rem solid transparent;
            border-left: 0.75rem solid transparent;
            border-bottom: 1rem solid #999;
            border-top: 0.75rem solid transparent;
            top: -0.75rem;
          }
          .options {
            border: 1px solid #eee;
            border-top: none;
            height: 18rem;
            overflow: scroll;
            position: absolute;
            top: 4rem;
            right: 0;
            width: 100%;
            cursor: pointer;
          }
          p {
            cursor: pointer;
            font-size: 1.6rem;
          }
        `}</style>
      </div>
    )
  }

  get Submit() {
    const { field, className, float, onClick} = this.props
    return (
      <div className="submit" style={{ float }}>
        <Button
          className={className}
          onClick={onClick}>{field.value}</Button>
      </div>
    )
  }

  render() {
    const { type, hasLabel, labelWidth } = this.props

    const style = {
      float: hasLabel ? 'right' : 'none',
      width: hasLabel ? `calc(100% - ${ labelWidth })` : '100%'
    }

    const getInput = () => {
      switch (type) {
        case 'text':
        case 'email':
        case 'password':
          return this.Text

        case 'textarea':
          return null

        case 'checkbox':
          return this.Checkbox

        case 'radio':
          return this.Radio

        case 'select':
          return this.Select

        case 'submit':
          return this.Submit
      }
    }

    return (
      <div className="input-wrapper" style={style}>
        {getInput()}
        <style jsx>{`
          .input-wrapper {
            display: inline-block;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default Input