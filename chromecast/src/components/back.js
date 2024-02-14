
import './manette.css';

function back(props) {
  return (
    <button className="btn btn-danger back" onClick={props.click}><i class="bi bi-arrow-return-left"></i></button>
  );
}

export default back;