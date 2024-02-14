
import './manette.css';

function right(props) {
  return (
    <button className="btn btn-primary right" onClick={props.click}><i class="bi bi-caret-right-fill"></i></button>
  );
}

export default right;