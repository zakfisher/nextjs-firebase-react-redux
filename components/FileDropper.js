import { Component } from 'react'
import dynamic from 'next/dynamic'
import { getImageBase64 } from '../helpers/files'
// import FileDrop from 'react-file-drop'

let FileDrop = () => null

class FileDropper extends Component {
  constructor() {
    super()

    this.state = {
      showOverlay: false,
      style: {
        background: '#eee',
        height: '100%',
        width: '100%'
      }
    }

    this.onDrop = this.onDrop.bind(this)
    this.onOver = this.onOver.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }

  onDrop(files, event) {
    this.onLeave()
    this.props.onDrop({ files, event })
  }

  onOver() {
    const style = {
      ...this.state.style,
      background: '#ccc'
    }
    this.setState({ style, showOverlay: true })
  }

  onLeave() {
    const style = {
      ...this.state.style,
      background: '#eee'
    }
    this.setState({ style, showOverlay: false })
  }

  componentWillMount() {
    // Only load FileDrop dep on client
    FileDrop = dynamic(import('react-file-drop'), {
      ssr: false
    })
  }

  render() {
    return (
      <div ref='uploader' style={{...this.state.style, ...this.props.style}}>
        <span>
          <FileDrop
            frame={this.refs.uploader}
            onDrop={this.onDrop}
            onFrameDragEnter={this.onOver}
            onFrameDragLeave={this.onLeave} />
        </span>
        {this.props.children}
        {
          this.state.showOverlay
          ? <div className="overlay" />
          : null
        }
        <style jsx>{`
          .overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.25);
          }
          span { opacity: 0; }
        `}</style>
      </div>
    )
  }
}

export default FileDropper
