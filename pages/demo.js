import Layout from "@/components/layout/Layout";
import { useState, useEffect, useRef } from 'react';
import Waveform from "@/components/elements/Waveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Switch from "react-switch";
import { useRouter } from 'next/router';
import WaveSurfer from 'wavesurfer.js';
import { Chart } from 'chart.js';

export default function Job() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(1);
    const [isImageVisible, setImageVisible] = useState(true);
    const [files, setFiles] = useState([]); // Initially empty, to be populated after upload
    const [isChecked, setIsChecked] = useState(true);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [recordingChunks, setRecordingChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("assets/img/voice/upload.png");
    const [uploadResult, setUploadResult] = useState(null);

    const sampleRate = 16000;
    const recordingDurationMs = 2000;
    const numSamples = sampleRate * (recordingDurationMs / 1000);
    const audioContextRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordingTimeoutRef = useRef(null);
    const chunkCounterRef = useRef(0);

    useEffect(() => {
        const tok = localStorage.getItem("token");
        if (tok) {
            setToken(tok);
        }
    }, []);

    useEffect(() => {
        return () => {
            // Cleanup function
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const handleFileChange = (event) => {
        const tok = localStorage.getItem("token");
        if (!tok) {
            router.push("/login");
        }

        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        let token = localStorage.getItem("token");

        const response = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.status === 401) {
            // Token might be expired, try refreshing it
            const refresh = localStorage.getItem('refresh');
            const refreshResponse = await fetch('http://127.0.0.1:8000/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh })
            });

            const refreshData = await refreshResponse.json();

            if (refreshData.access) {
                // Update token in localStorage
                localStorage.setItem('token', refreshData.access);
                token = refreshData.access;

                // Retry the upload with the new token
                const retryResponse = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (retryResponse.ok) {
                    const result = await retryResponse.json();
                    setUploadResult(result);
                    updateFiles(result); // Update files with the response
                } else {
                    console.error('Error uploading file after token refresh:', await retryResponse.json());
                }
            } else {
                console.error('Failed to refresh token:', refreshData);
                // Redirect to login or handle token refresh failure
            }
        } else if (response.ok) {
            const result = await response.json();
            setUploadResult(result);
            updateFiles(result); // Update files with the response
        } else {
            console.error('Error uploading file:', await response.json());
        }
    };

    const updateFiles = (result) => {
        // Add the uploaded file to the audio files list
        const newFile = {
            id: files.length + 1, // Incremental ID
            url: preview, // Use the preview URL for the uploaded file
            waveColor: '#FFFFFF',
            progressColor: result.result === 'real' ? 'green' : 'red', // Green for real, red for fake
            size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
            filename: file.name,
            isReal: result.result === 'real' // True for real, false for fake
        };
        setFiles([...files, newFile]); // Add the new file to the list
    };

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const handleChange = (checked) => {
        setIsChecked(!checked);
    };

    const openFileInput = () => {
        document.getElementById('file-upload').click();
    };

    const handlePlay = (id) => {
        if (currentPlaying && currentPlaying !== id) {
            document.querySelector(`button[data-id="${currentPlaying}"]`).click();
        }
        setCurrentPlaying(id);
    };

    const handleDelete = (id) => {
        // Filter out the file with the specified ID from the files list
        setFiles(files.filter(file => file.id !== id));
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new AudioContext({ sampleRate: sampleRate });
            const source = audioContextRef.current.createMediaStreamSource(stream);
            const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);

            processor.onaudioprocess = (event) => {
                const input = event.inputBuffer.getChannelData(0);
                const buffer = new Float32Array(input.length);
                buffer.set(input);
                setRecordingChunks(prevChunks => [...prevChunks, buffer]);
            };

            source.connect(processor);
            processor.connect(audioContextRef.current.destination);

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = async (event) => {
                if (event.data.size > 0) {
                    const arrayBuffer = await event.data.arrayBuffer();
                    const float32Array = new Float32Array(arrayBuffer);
                    setRecordingChunks(prevChunks => [...prevChunks, float32Array]);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                processRecordingChunks(recordingChunks);
                setRecordingChunks([]);
            };

            setIsRecording(true);
            const recordInterval = () => {
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
                    mediaRecorderRef.current.start();
                }
                recordingTimeoutRef.current = setTimeout(() => {
                    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                        mediaRecorderRef.current.stop();
                        setTimeout(recordInterval, 0);
                    }
                }, recordingDurationMs);
            };
            recordInterval();
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        clearTimeout(recordingTimeoutRef.current);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    const processRecordingChunks = (audioChunks) => {
        const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
        if (totalLength >= numSamples) {
            const audioBuffer = mergeBuffers(audioChunks, numSamples);
            uploadChunk(audioBuffer, `file-part${chunkCounterRef.current}`, true);
            chunkCounterRef.current++;
        } else {
            console.warn(`Recorded length (${totalLength}) less than expected (${numSamples}).`);
        }
    };

    const mergeBuffers = (bufferArray, length) => {
        const result = new Float32Array(length);
        let offset = 0;
        bufferArray.forEach(buffer => {
            if (offset + buffer.length <= length) {
                result.set(buffer, offset);
                offset += buffer.length;
            } else {
                result.set(buffer.subarray(0, length - offset), offset);
                offset = length;
            }
        });
        return result;
    };

    const uploadChunk = (chunk, fileName, isRecording) => {
        const wavBuffer = encodeWAV(chunk, sampleRate, 1);
        const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
        const audioFile = new File([wavBlob], `${fileName}.wav`, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('file', audioFile);

        fetch('http://127.0.0.1:8000/api/upload/', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Server Response:', data);
                // Additional logic for processing the response can be added here.
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    const encodeWAV = (samples, sampleRate, numChannels) => {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * 2, true);
        view.setUint16(32, numChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);

        floatTo16BitPCM(view, 44, samples);

        return buffer;
    };

    const writeString = (view, offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    const floatTo16BitPCM = (view, offset, input) => {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>Try a <span>Demo</span></>}>
                <div>
                    <section className="help-area pb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="responds-wrap uploadarea">
                                        <div className="icon">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="audio/*"
                                                style={{ display: 'none' }}
                                                id="file-upload"
                                            />
                                            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Image Preview"
                                                        style={{ width: '120px', height: 'auto', marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    <div style={{ width: '120px', height: '120px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span>Upload Audio</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                        <div className="content pb-40">
                                            <a onClick={openFileInput}>Upload File</a>
                                        </div>
                                        <div className="content pb-40">
                                            <p>Frame Length 2</p>
                                            <RangeSlider
                                                className="single-thumb"
                                                defaultValue={[0, 50]}
                                                thumbsDisabled={[true, false]}
                                                rangeSlideDisabled={true}
                                            />
                                        </div>
                                        <div className="content pb-40">
                                            <p>Sensitivity 50%</p>
                                            <RangeSlider
                                                className="single-thumb"
                                                defaultValue={[0, 50]}
                                                thumbsDisabled={[true, false]}
                                                rangeSlideDisabled={true}
                                            />
                                        </div>
                                        <div className="content pb-40">
                                            <p>Isolate Voice</p>
                                            <label>
                                                <Switch onChange={() => handleChange(isChecked)} checked={isChecked} />
                                            </label>
                                        </div>
                                        <div className="content">
                                            <div className="pricing-btn">
                                                <button onClick={handleUpload} className="btn btn-two">Upload</button>
                                            </div>
                                        </div>
                                        {uploadResult && (
                                            <div className="content pb-40">
                                                <p>Result: {uploadResult.result}</p>
                                                <p>Confidence: {uploadResult.confidence}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                            {files.map((audio, index) => (
                                                <div className="job-item" key={index}>
                                                    <Waveform
                                                        key={audio.id}
                                                        audioUrl={audio.url}
                                                        waveColor={audio.waveColor}
                                                        progressColor={audio.progressColor}
                                                        size={audio.size}
                                                        filename={audio.filename}
                                                        IsReal={audio.isReal}
                                                        onPlay={() => handlePlay(audio.id)}
                                                        audioId={audio.id}
                                                        handleDelete={handleDelete} // Pass the delete handler here
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="controls">
                                        <button onClick={startRecording} disabled={isRecording} className="btn btn-primary">Start Recording</button>
                                        <button onClick={stopRecording} disabled={!isRecording} className="btn btn-secondary">Stop Recording</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
