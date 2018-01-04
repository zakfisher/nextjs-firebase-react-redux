import axios from 'axios'
import firebase from './firebase'

export const getBase64DataURL = (file, callback) => {
  const reader = new window.FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => callback(e.target.result)
}

export const uploadToCloudStorage = ({ asset, onUpdate, onError, onSuccess }) => {
  const storage = firebase.storage().ref()
  const { file, path, metadata } = asset
  const uploadTask = storage.child(path).put(file, metadata)
  return uploadTask.on('state_changed',
    onUpdate,
    onError,
    () => onSuccess(uploadTask.snapshot.downloadURL)
  )
}