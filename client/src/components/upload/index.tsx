import { useState } from 'preact/hooks';
import {h, FunctionComponent} from 'preact';
import style from './style.css';
const upload = '/assets/images/upload.svg';
const selected = '/assets/images/done.svg';

type UploadProps ={
name:string
}
const Upload:FunctionComponent<UploadProps> = ({ name }) => {
  const [fileSelected, setFileSelected] = useState(null)

  const handleChange = (e) => {
    if (e.target.validity.valid && e.target.files.length) {
      setFileSelected(e.target.files[0].name)
      return
    }
    setFileSelected(null)
  }

  return (
    <div class={style.upload}>
      <div class={style.main}>
        <h2>Picture</h2>
        <label onChange={handleChange} class={fileSelected ? style.selected : style.select}>
          <input
            type='file'
            name={name}
            accept='.png, .jpg, .jpeg'
          />
          <img src={fileSelected ? selected : upload} alt='upload' />
          {fileSelected ? 'Selected' : 'Select a file'}
        </label>
      </div>
      {fileSelected
        ? <span class={style.filename}>{fileSelected}</span>
        : null}
    </div >
  )
}

export default Upload
