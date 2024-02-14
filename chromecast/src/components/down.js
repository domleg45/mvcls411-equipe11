
import './manette.css';

function down(props) {
  return (
    <button className="btn btn-primary down" onClick={props.click}><i class="bi bi-caret-down-fill"></i></button>
  );
}

export default down;