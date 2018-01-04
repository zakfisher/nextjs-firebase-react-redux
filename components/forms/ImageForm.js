import { Component } from 'react'
import generateId from 'password-generator'
import { getBase64DataURL, uploadToCloudStorage } from '../../helpers/files'
import { color1 } from '../../styles/colors'
import Button from '../Button'
import FileDropper  from '../FileDropper'

class ImageForm extends Component {
  constructor() {
    super()

    this.state = {
      dataURL: null,
      msg: null
    }

    this.uploadImage = this.uploadImage.bind(this)
  }

  uploadImage(file) {
    const { parent, stateKey, bucket } = this.props
    const maxKb = 300

    // Check file type
    const fileType = file.type.split('/')[1]
    if (!['png', 'jpg', 'jpeg'].includes(fileType)) {
      return this.setState({
        dataURL: null,
        msg: 'File type not supported.\<br/>Please use png, jpg, jpeg only.'
      })
    }

    const size = Math.round(file.size / 1024) + 'kb'
    if (parseInt(size) > maxKb) {
      return this.setState({
        dataURL: null,
        msg: `File size is too large.\<br/>Max file size: ${maxKb}kb\<br/>Actual file size: ${size}`
      })
    }

    const path = `${bucket}/${generateId()}.${fileType}`

    getBase64DataURL(file, result => {
      // Display local image immediately
      this.setState({
        dataURL: result,
        msg: null
      })

      // Upload image to cloud storage
      uploadToCloudStorage({
        asset: {
          file,
          path,
          metadata: {}
        },
        onUpdate: snapshot => {
          const { bytesTransferred, totalBytes, state } = snapshot

          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (bytesTransferred / totalBytes) * 100
          this.setState({
            msg: `${progress}%`
          })

          switch (state) {
            case 'paused':
              // console.log('Upload is paused')
              break

            case 'running':
              // console.log('Upload is running')
              break
          }
        },
        onError: error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break

            case 'storage/canceled':
              // User canceled the upload
              break

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        onSuccess: photoURL => {
          this.setState({ msg: `Image uploaded successfully!` })
          // Send `photoURL` back to parent state
          parent.setState({
            [stateKey]: {
              ...parent.state[stateKey],
              photoURL
            }
          })
        }
      })
    })
  }

  render() {
    return (
      <div className='image-container'>

        {/* DROP FILE */}
        <div className='file-dropper'>
          <FileDropper
            onDrop={res => this.uploadImage(res.files[0])}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {
              this.state.dataURL
              ? (
                  <div className='current-image' style={{
                    backgroundImage: `url(${this.state.dataURL})`
                  }}></div>
                )
              : <p>Drop image here</p>
            }
          </FileDropper>
        </div>

        {/* SELECT FILE BUTTON */}
        <div className='button-container'>
          <Button onClick={() => this.refs.file.click()}>Select Image</Button>
          <input type="file" ref="file" onChange={() => {
            this.uploadImage(this.refs.file.files[0])
          }} />
        </div>

        {
          this.state.msg
          ? <p className="image-info" dangerouslySetInnerHTML={{ __html: this.state.msg }} />
          : null
        }

        <style jsx>{`
          .image-container,
          .file-dropper,
          .button-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .image-container {
            justify-content: flex-start;
          }
          .file-dropper {
            height: 20rem;
            width: 20rem;
            margin-right: 2rem;
          }
          .file-dropper p {
            text-align: center;
            width: 100%;
          }
          .current-image {
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            height: 100%;
            width: 100%;
          }
          .button-container {
            margin-right: 2rem;
          }
          p {
            font-size: 1.4rem;
          }
          input[type='file'] {
            display: none;
          }
        `}</style>
      </div>
    )
  }
}

export default ImageForm
