// components/Waveform.js
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause } from 'react-icons/fa';

const Waveform = ({ audioUrl, waveColor, progressColor, size, filename,IsReal,forHome,onPlay,audioId }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: waveColor || '#ffffff',
      progressColor: progressColor || '#ADFF2F',
      url: audioUrl,
      dragToSeek: true,
      width: '100%',
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: size.height || 80,
      barHeight: size.barHeight || 20,
      barRadius: size.barRadius || 5,
      barWidth: size.barWidth || 3,
    });

    // Cleanup on component unmount
    return () => wavesurferRef.current?.destroy();
  }, [audioUrl, waveColor, progressColor, size]);

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      } else {
        wavesurferRef.current.play();
        setIsPlaying(true);
        if (onPlay) onPlay(); // Notify parent component
      }
    }
  };
  return (
    <div className='wafeformmainclass'>
        <button 
        onClick={togglePlayPause} 
        data-id={audioId}
        style={{ display: 'flex', alignItems: 'center', marginTop: '0px 10px', border: 'none', background: 'none' }}
      >
        <img 
          src={isPlaying ? (IsReal?"/assets/img/voice/RealPauseIcon.png":"/assets/img/voice/FakePauseIcon.png") : (IsReal?"/assets/img/voice/RealPlayIcon.png":"/assets/img/voice/FakePlayIcon.png")} 
          alt={isPlaying ? "Pause" : "Play"} 
          style={{ width: '50px', height: 'auto' }}
        />
      </button>
      <div style={{ width: '80%', height: size.height || '80px' }}>
                  <p>{filename}</p>                               
                  <div ref={waveformRef}></div>
      </div>
     
      <button 
        onClick={togglePlayPause} 
        style={{ display: 'flex', alignItems: 'center', marginTop: '0px 10px', border: 'none', background: 'none' }}
      >

<img 
         src={forHome ?"" : "/assets/img/voice/reportIcon.png"}  
          style={{ width: '30px', height: 'auto',margin:'10px 10px' }}
        />

          <span className={IsReal? "realspan" : "fakespan"}>{!forHome?(IsReal?"Real":"Fake"):""}</span>
        <img 
         src={forHome ?"" : "/assets/img/voice/deleteicon.png"}  
          style={{ width: '30px', height: 'auto',margin:'10px 10px' }}
        />
      </button>
    </div>
  );
};

export default Waveform;
