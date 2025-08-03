/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import defaultPoster from "../../assets/events/past3.png";  // fallback poster image
import { FaPlay, FaTimes } from 'react-icons/fa';

/**
 * A simple video player component that shows a poster with a play button overlay.
 * On click, it replaces the poster with the playing video and a close button.
 *
 * Props:
 * - src: string (video URL)
 * - poster: string (thumbnail image URL)
 * - width: string or number (e.g. '100%' or 640)
 * - height: string or number (e.g. 'auto' or 360)
 */
export default function EventVideo({ src, poster = defaultPoster, width = '100%', height = 'auto' }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlay = () => {
        setIsPlaying(true);
        setTimeout(() => {
            if (videoRef.current) videoRef.current.play();
        }, 0);
    };

    const handleClose = () => {
        if (videoRef.current) videoRef.current.pause();
        setIsPlaying(false);
    };

    return (
        <div className="relative w-full h-[400px] md:h-[700px]" style={{ width }}>
            {!isPlaying ? (
                <>
                    <img
                        src={poster}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover opacity-80"
                        loading='lazy'

                    />
                    <button
                        onClick={handlePlay}
                        className="absolute inset-0 flex items-center justify-center focus:outline-none"
                    >
                        <FaPlay className="text-white text-6xl opacity-90 hover:opacity-100 transition-opacity" />
                    </button>
                </>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        src={src}
                        className="w-full h-full object-cover"
                        controls
                        loading='lazy'
                    />
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 focus:outline-none"
                    >
                        <FaTimes className="text-white text-xl" />
                    </button>
                </>
            )}
        </div>
    );
}

EventVideo.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
