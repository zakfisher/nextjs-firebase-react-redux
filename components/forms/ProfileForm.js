import FormFields from '../FormFields'

const ProfileForm = props => {
  const { parent, stateKey } = props
  return (
    <div className="profile">
      <div className="name">
        <FormFields
          {...props}
          fields={{
            'displayName': {
              type: 'text',
              label: 'name',
              placeholder: 'Joe Smith'
            }
          }} />
      </div>

      <div className="contact-info">
        <div className="email">
          <FormFields
            {...props}
            fields={{
              'email': {
                type: 'text',
                label: 'email',
                placeholder: 'joe@smith.com'
              },
            }} />
        </div>
        <div className="phone">
          <FormFields
            {...props}
            fields={{
              'phoneNumber': {
                type: 'text',
                label: 'phone',
                placeholder: '(123) 456-7890',
                defaultValue: parent.state[stateKey].phoneNumber,
                maxLength: 14,
                formatValue: (oldValue, val) => {
                  // Format phone number
                  // TODO: Use international number input
                  val = val.replace(/\D/g, '')
                  if (oldValue) oldValue = oldValue.replace(/\D/g, '')

                  // If values match, we are removing a character
                  if (oldValue === val) {
                    val = val.substr(0, val.length - 1)
                  }

                  const LENGTH_MAP = [0, 2, 3, 5, 7, 8, 9, 11]
                  const fullNumber = `(${val.substr(0, 3)}) ${val.substr(3, 3)}-${val.substr(6)}`
                  const formattedNumber = fullNumber.substr(0, LENGTH_MAP[val.length])

                  return formattedNumber
                }
              }
            }} />
        </div>
      </div>

      <div className="password">
        <div className="pw">
          <FormFields
            {...props}
            fields={{
              'password': {
                type: 'password',
                placeholder: 'password'
              }
            }} />
        </div>
        <div className="confirm-pw">
          <FormFields
            {...props}
            fields={{
              'confirmPassword': {
                type: 'password',
                label: 'confirm pw',
                placeholder: 'confirm password'
              }
            }} />
        </div>
      </div>

      <style jsx>{`
        .contact-info::after {
          content: ' ';
        }
        .password > div,
        .contact-info > div {
          width: calc(50% - 0.75rem);
        }
        .pw,
        .email {
          float: left;
        }
        .confirm-pw,
        .phone {
          float: right;
        }
        @media screen and (max-width: 800px) {
          .password > div,
          .contact-info > div {
            clear: left;
            float: left;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default ProfileForm
