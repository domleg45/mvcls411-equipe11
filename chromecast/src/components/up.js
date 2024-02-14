
import './manette.css';

function up(props) {
  return (
    <button className="btn btn-primary up" onClick={props.click}><i class="bi bi-caret-up-fill"></i></button>
  );
}

export default up;