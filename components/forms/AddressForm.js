import FormFields from '../FormFields'
import STATES from '../../fixtures/states'

const AddressForm = props => {
  return (
    <div className="address">
      <div className="line1">
        <FormFields
          {...props}
          fields={{
            'account.profile.address.line1': {
              type: 'text',
              label: 'street',
              placeholder: '123 Pleasant St'
            }
          }} />
      </div>
      <div className="line2">
        <FormFields
          {...props}
          fields={{
            'account.profile.address.line2': {
              type: 'text',
              label: 'apt',
              placeholder: '3'
            }
          }} />
      </div>
      <div className="city">
        <FormFields
          {...props}
          fields={{
            'account.profile.address.city': {
              type: 'text',
              label: 'city',
              placeholder: 'San Francisco'
            }
          }} />
      </div>
      <div className="state">
        <FormFields
          {...props}
          fields={{
            'account.profile.address.state': {
              type: 'select',
              label: 'state',
              placeholder: 'CA',
              options: Object.keys(STATES).map(abbr => {
                return {
                  key: abbr,
                  value: abbr
                }
              })
            },
          }} />
      </div>
      <div className="zip">
        <FormFields
          {...props}
          fields={{
            'account.profile.address.zip': {
              type: 'text',
              label: 'zip',
              placeholder: '12345'
            }
          }} />
      </div>
      <style jsx>{`
        .line1,
        .city {
          float: left;
          width: calc(75% - 0.75rem);
        }
        .line2,
        .state {
          float: right;
          width: calc(25% - 0.75rem);
        }
        .zip {
          clear: both;
          width: calc(50% - 0.75rem);
        }
        @media screen and (max-width: 800px) {
          .address > div {
            clear: left;
            float: left;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default AddressForm
