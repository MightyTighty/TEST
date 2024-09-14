// components/Waveform.js
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause } from 'react-icons/fa';

const Waveform = ({ audioUrl, waveColor, progressColor, size, filename }) => {
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
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className='wafeformmainclass'>
        <button 
        onClick={togglePlayPause} 
        style={{ display: 'flex', alignItems: 'center', marginTop: '0px 10px', border: 'none', background: 'none' }}
      >
        <img 
          src={isPlaying ? "/assets/img/voice/pauseicon.png" : "/assets/img/voice/playicon.png"} 
          alt={isPlaying ? "Pause" : "Play"} 
          style={{ width: '50px', height: 'auto' }}
        />
      </button>
      <div ref={waveformRef} style={{ width: '100%', height: size.height || '80px' }}></div>
      <button 
        onClick={togglePlayPause} 
        style={{ display: 'flex', alignItems: 'center', marginTop: '0px 10px', border: 'none', background: 'none' }}
      >
        <img 
          src="/assets/img/voice/deleteicon.png"
          style={{ width: '40px', height: 'auto' }}
        />
      </button>
    </div>
  );
};

export default Waveform;
