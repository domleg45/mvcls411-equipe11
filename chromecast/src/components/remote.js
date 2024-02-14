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
import { useState } from 'react';

const [volumeBool, setVolumeBool] = useState(false);
const [muteBool, setMuteBool] = useState(false);

const handleUp = () => {
  if(volumeBool){

  }
  else{

  }
}

const handleDown = () => {
  if(volumeBool){

  }
  else{
    
  }
}

const handleRight = () => {
  
}

const handleLeft = () => {
  
}

const handleHome = () => {
  
}

const handleBack = () => {
  
}

const handlePress = () => {
  
}

const handleMute = () => {
  setMuteBool(!muteBool)
  const muteChrome = new chrome.cast.Volume()
}

function remote() {
  return (
    <div className="container btn-group btn-matrix">
        <VolumeController click={setVolumeBool(!volumeBool)}/>
        <Up click={handleUp}/>
        <Mute click={handleMute}/>
        <Left click={handleLeft}/>
        <Press click={handlePress}/>
        <Right click={handleRight}/>
        <Back click={handleBack}/>
        <Down click={handleDown}/>
        <Home click={handleHome}/>
    </div>
  );
}

export default remote;