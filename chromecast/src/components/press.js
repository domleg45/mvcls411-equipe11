
import './manette.css';

function press(props) {
  return (
    <button className="btn btn-warning press connect" onClick={props.click}><i class="bi bi-dash-circle-fill"></i></button>
  );
}

export default press;