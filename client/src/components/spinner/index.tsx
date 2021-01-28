import {h, FunctionComponent} from 'preact';
import style from './style.css'

const Spinner:FunctionComponent = () =>
  <div class={style.spinner_wrapper}>
    <div class={style.spinner} />
  </div>

export default Spinner
