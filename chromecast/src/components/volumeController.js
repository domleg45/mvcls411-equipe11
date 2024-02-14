
import './manette.css';

function volumeController(props) {
  return (
    <button className="btn btn-secondary volume" onClick={props.click}><i class="bi bi-volume-up-fill"></i></button>
  );
}

export default volumeController;