import { Component } from 'react'
import Input from './Input'
import generateId from 'password-generator'

class FormFields extends Component {
  constructor() {
    super()
    this.getFields = this.getFields.bind(this)
  }

  static getInitialProps() {
    return {
      fields: {},
      labelWidth: '',
      parent: {},
      stateKey: ''
    }
  }

  getFields() {
    const { fields, parent, stateKey } = this.props
    return Object.keys(fields).map(name => {
      const input = fields[name]
      const label = input.label || name
      let value = input.defaultValue || ''

      // Set the value to the model's current value
      const model = parent.state[stateKey]
      value = model[name] || value

      // Dig into the model if data is nested
      if (name.includes('.')) {
        let tempValue = model
        name.split('.').map(key => {
          tempValue = tempValue[key] || value
        })
        value = tempValue
      }

      // Return field object
      return {
        name,
        label,
        value,
        input
      }
    })
  }

  render() {
    const Field = (field, i) => {
      const labelWidth = this.props.labelWidth || '8rem'
      const { label, input } = field
      const { noLabel } = input

      let className = ''
      if (field.input.noMargin) className += 'no-margin'

      const id = generateId()

      return (
        <fieldset key={i} className={className}>
          {noLabel ? null : <label htmlFor={id} style={{ width: labelWidth }}>{label}</label>}
          <Input
            id={id}
            field={field}
            hasLabel={!noLabel}
            labelWidth={labelWidth}
            parent={this.props.parent}
            stateKey={this.props.stateKey}
            {...input} />
          <style jsx>{`
            fieldset {
              margin-bottom: 1rem;
              width: 100%;
            }
            fieldset.no-margin {
              margin-bottom: 0;
            }
            label {
              background: #333;
              color: white;
              display: inline-block;
              height: 4rem;
              font-size: 1.2rem;
              font-weight: bold;
              display: flex;
              align-items: center;
              justify-content: center;
              float: left;
            }
          `}</style>
        </fieldset>
      )
    }

    return (
      <div className="field-wrapper">
        {this.getFields().map(Field)}
        <style jsx>{`
          .field-wrapper {
            clear: both;
            margin-bottom: 1.5rem;
            width: 100%;
          }
          .field-wrapper:last-child {
            margin-bottom: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default FormFields