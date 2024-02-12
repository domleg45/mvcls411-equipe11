import './manette.css';
import Press from './press';
import Mute from './mute';
import Up from './up';
import VolumeController from './volumeController';
import Down from './down';
import Left from './left';
import Right from './right';
import Home from './home';
import Back from './back';


function remote() {
  return (
    <div className="container">
      <div className='row'>
        <VolumeController className='col'/>
        <Up className='col'/>
        <Mute className='col'/>
      </div>
      <div className='row'>
        <Left className='col'/>
        <Press className='col'/>
        <Right className='col'/>
      </div>
      <div className='row'>
        <Back className='col'/>
        <Down className='col'/>
        <Home className='col'/>
      </div>
    </div>
  );
}

export default remote;