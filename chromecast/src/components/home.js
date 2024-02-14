
import './manette.css';

function home(props) {
  return (
    <button className="btn btn-success home" onClick={props.click}><i class="bi bi-house-door-fill"></i></button>
  );
}

export default home;