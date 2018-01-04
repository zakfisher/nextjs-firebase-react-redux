import { color1 } from '../../styles/colors'
import FormFields from '../FormFields'

const Text = () => (
  <p>
    I have read and agree to the <a href="/terms" target="_blank">Terms & Conditions</a>.
    <style jsx>{`
      p {
        font-size: 1.4rem;
      }
      a {
        color: ${color1};
        cursor: pointer;
        padding-bottom: 0.25rem;
      }
      a:hover {
        border-bottom: 1px solid #333;
      }
    `}</style>
  </p>
)

const TermsForm = props => {
  return (
    <div className="terms">
      <FormFields
        {...props}
        fields={{
          'terms': {
            type: 'checkbox',
            defaultValue: false,
            noLabel: true,
            noMargin: true,
            Text
          }
        }} />
    </div>
  )
}

export default TermsForm
