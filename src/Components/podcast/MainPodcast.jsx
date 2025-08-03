/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import pod1 from "../../assets/podcast/pod1.png"
import pod2 from "../../assets/podcast/pod2.png"
import pod3 from "../../assets/podcast/pod3.png"
import pod4 from "../../assets/podcast/pod4.png"
import pod5 from "../../assets/podcast/pod5.png"
import pod6 from "../../assets/podcast/pod6.png"
import pod7 from "../../assets/podcast/pod7.png"
import pod8 from "../../assets/podcast/pod8.png"
import pod9 from "../../assets/podcast/pod9.png"
import PropTypes from 'prop-types'

const episodes = [
    {
        id: 1,
        imageSrc: pod1,
        alt: '52 Real Life Lessons book',
        title: 'Ep. 12 — “Designing For Impact In West Africa” Feat. Kwame Opoku',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/2LP8KwtvzUx1onvXKQCoKR?utm_source=generator',
    },
    {
        id: 2,
        imageSrc: pod2,
        alt: 'Woman in orange shirt and black vest',
        title: 'Ep. 12 — “A Deep Dive Into Leadership Beyond Loud Voices.”',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000002?utm_source=generator',
    },
    {
        id: 3,
        imageSrc: pod3,
        alt: 'Woman in orange shirt and black vest speaking',
        title:
            'Ep. 14 — Kwame Shares His Journey Building Tech Solutions In Underserved Communities.',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000003?utm_source=generator',
    },
    {
        id: 4,
        imageSrc: pod4,
        alt: '52 Real Life Lessons orange background',
        title:
            'Ep. 14 — Kwame Shares His Journey Building Tech Solutions In Underserved Communities.',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000004?utm_source=generator',
    },
    {
        id: 5,
        imageSrc: pod5,
        alt: 'Lesson 40 with butterflies and quote',
        title: 'Ep. 12 — “Designing For Impact In West Africa” Feat. Kwame Opoku',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000005?utm_source=generator',
    },
    {
        id: 6,
        imageSrc: pod6,
        alt: '52 Real Life Lessons physical book',
        title: 'Ep. 12 — “A Deep Dive Into Leadership Beyond Loud Voices.”',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000006?utm_source=generator',
    },
    {
        id: 7,
        imageSrc: pod7,
        alt: '52 Real Life Lessons physical book',
        title: 'Ep. 12 — “A Deep Dive Into Leadership Beyond Loud Voices.”',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000006?utm_source=generator',
    },
    {
        id: 8,
        imageSrc: pod8,
        alt: '52 Real Life Lessons physical book',
        title: 'Ep. 12 — “Designing For Impact In West Africa” Feat. Kwame Opoku',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000006?utm_source=generator',
    },
    {
        id: 9,
        imageSrc: pod9,
        alt: '52 Real Life Lessons physical book',
        title: 'Ep. 12 — “A Deep Dive Into Leadership Beyond Loud Voices.”',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/track/512SnwJdZ0y0X000000006?utm_source=generator',
    },
]

// Define the animation variants
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export default function MainPodcast() {
    const [visibleEpisodes, setVisibleEpisodes] = useState(6)
    const [searchQuery, setSearchQuery] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentEpisode, setCurrentEpisode] = useState({ url: null, title: '' })

    const filtered = useMemo(() => {
        if (!searchQuery) return episodes
        return episodes.filter((e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const loadMore = () =>
        setVisibleEpisodes((v) => Math.min(v + 3, filtered.length))
    const showLess = () =>
        setVisibleEpisodes((v) => Math.max(v - 3, 6))
    const onSearch = (e) => {
        setSearchQuery(e.target.value)
        setVisibleEpisodes(6)
    }
    const openModal = (url, title) => {
        setCurrentEpisode({ url, title })
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentEpisode({ url: null, title: '' })
    }

    return (
        <div className="min-h-screen bg-[#FBF8F4] p-4 md:p-8 lg:p-12">
            <div className="flex items-center justify-center my-8">
                <div className="flex-grow border-t border-[#D4C7B7] mx-4" />
                <h1 className="text-3xl font-playfair text-[#333333] whitespace-nowrap">
                    Embedded <span className="text-[#D95B24] font-playfair">Episodes</span>
                </h1>
                <div className="flex-grow border-t border-[#D4C7B7] mx-4" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 px-4">
                <input
                    type="text"
                    placeholder="Search For Latest And Past Episodes"
                    className="w-full md:w-auto max-w-md border border-[#D4C7B7] focus:border-[#D95B24] focus:ring-0 p-2 rounded"
                    value={searchQuery}
                    onChange={onSearch}
                />
                <select className="w-full font-playfair md:w-[180px] border border-[#D4C7B7] focus:border-[#D95B24] focus:ring-0 p-2 rounded">
                    <option value="most-popular">Most Popular</option>
                    <option value="most-recent">Most Recent</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {filtered.slice(0, visibleEpisodes).map((ep, index) => (
                    <motion.div
                        key={ep.id}
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="flex flex-col items-start h-[677px]"
                    >
                        <img
                            src={ep.imageSrc}
                            alt={ep.alt}
                            className="w-full h-[479px] object-cover rounded-lg mb-4"
                            loading='lazy'

                        />
                        <h2 className="text-lg font-semibold text-[#D95B24] mb-2">
                            {ep.title}
                        </h2>
                        <button
                            onClick={() => openModal(ep.spotifyEmbedUrl, ep.title)}
                            className="flex items-center text-[#D95B24] text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-[#D95B24]"
                        >
                            <Play className="w-4 h-4 mr-1" />
                            Listen Now
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-8 gap-4">
                <button
                    onClick={loadMore}
                    disabled={visibleEpisodes >= filtered.length}
                    className={
                        `bg-[#D95B24] text-white px-6 py-3 rounded-md transition-colors ` +
                        (visibleEpisodes >= filtered.length
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-opacity-90')
                    }
                >
                    Load More
                </button>
                {visibleEpisodes > 6 && (
                    <button
                        onClick={showLess}
                        className="bg-[#333333] text-white px-6 py-3 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Show Less
                    </button>
                )}
            </div>

            <AudioPlayerModal
                isOpen={isModalOpen}
                onClose={closeModal}
                spotifyEmbedUrl={currentEpisode.url}
                episodeTitle={currentEpisode.title}
            />
        </div>
    )
}

export function AudioPlayerModal({
    isOpen,
    onClose,
    spotifyEmbedUrl,
    episodeTitle,
}) {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-2">
                    Now Playing: <span className="text-[#D95B24]">{episodeTitle}</span>
                </h2>
                <p className="mb-4">Listen to the episode on Spotify below.</p>
                {spotifyEmbedUrl ? (
                    <iframe
                        src={spotifyEmbedUrl}
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`Spotify Player for ${episodeTitle}`}
                    ></iframe>
                ) : (
                    <p>No Spotify embed available for this episode.</p>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-[#D95B24] text-white rounded hover:bg-[#c2643b]"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

AudioPlayerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    spotifyEmbedUrl: PropTypes.string,
    episodeTitle: PropTypes.string,
}
