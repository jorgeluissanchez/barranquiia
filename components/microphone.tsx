"use client";

import { useEffect, useState, useRef } from "react";
import { Mic, Pause } from "lucide-react";
import { Button } from "./ui/button";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function Microphone() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      console.log(event.results);
      setTranscript(transcript);
    };

    recognitionRef.current.start();
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
      
        <div className="flex items-center">
          {isRecording ? (
            <Button variant="ghost" className="w-10 px-0"
            onClick={handleToggleRecording}>
            <Pause className="w-4 h-4" />
            </Button>
          ) : (
            // Button for starting recording
            <Button variant="ghost" className="w-10 px-0" onClick={handleToggleRecording}>
            <Mic className="w-4 h-4" />
            </Button>
          )}
        </div>
  );
}