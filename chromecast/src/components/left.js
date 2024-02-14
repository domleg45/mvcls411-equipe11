
import './manette.css';

function left(props) {
  return (
    <button className="btn btn-primary left" onClick={props.click}><i class="bi bi-caret-left-fill"></i></button>
  );
}

export default left;