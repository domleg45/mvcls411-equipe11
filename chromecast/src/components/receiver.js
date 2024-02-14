import React from 'react';
import GoogleCast from 'react-native-google-cast'

function receiver() {
    return (
        <div className='container'>
            <div className='head' src={}/>
            <div className='body'>
                <cast-media-player></cast-media-player>
            </div>
        </div>
    );
  }
  
  export default receiver;