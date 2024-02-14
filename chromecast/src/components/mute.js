
import './manette.css';

function mute(props) {
  return (
    <button className="btn btn-dark mute" onClick={props.click}><i class="bi bi-volume-mute-fill"></i></button>
  );
}

export default mute;