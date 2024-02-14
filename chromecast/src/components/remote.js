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
    <div className="container btn-group btn-matrix">
        <VolumeController/>
        <Up/>
        <Mute/>
        <Left />
        <Press />
        <Right />
        <Back />
        <Down />
        <Home />
    </div>
  );
}

export default remote;