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
        title: 'WITHOUT THIS YOUR BUSINESS WILL FAIL. Premieres JuLY 5.',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/74JquzEaDtbwPzQLvASgqW?si=0a79f970b6254d81?utm_source=generator',
    },
    {
        id: 2,
        imageSrc: pod2,
        alt: 'Woman in orange shirt and black vest',
        title: 'Fuelled by Belief: Building Sustainable Impact with Clara Pinkrah-Sam | Beyond The Hustle Episode 1',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/42aLOmPwJcWeV3WIk1Gw8f?si=1a54df5117ae43f8?utm_source=generator'
    },
    {
        id: 3,
        imageSrc: pod3,
        alt: 'Woman in orange shirt and black vest speaking',
        title:
            'More Than a Hustle: David Amoo-Osae on Legacy, Leadership & Letdowns | Beyond The Hustle Episode 2',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/5b8uiyMvkt5ayrQxgIoY42?si=4f1c98db476345bc?utm_source=generator',
    },
    {
        id: 4,
        imageSrc: pod4,
        alt: '52 Real Life Lessons orange background',
        title:
            'Brand It, Build It: Christine Avah on Growth, Branding & Strategy | Beyond The Hustle GH',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/09H5rMU4iyxW0dmwgIs7Yz?si=6903f2bdd5864804?utm_source=generator',
    },
    {
        id: 5,
        imageSrc: pod5,
        alt: 'Lesson 40 with butterflies and quote',
        title: 'From Prison to Profit: Bazal Darko on Scaling Creativity into a Brand | Beyond The Hustle Episode 4',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/2A39483QBB3f3RSjGYy7hD?si=95e11b62eebc44ad?utm_source=generator',
    },
    {
        id: 6,
        imageSrc: pod6,
        alt: '52 Real Life Lessons physical book',
        title: 'Masterclass 1: Start With the Problem, Not the Product | Beyond The Hustle Episode 5',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/5b8uiyMvkt5ayrQxgIoY42?si=ff4ea55efefc4ab0?utm_source=generator',
    },
    {
        id: 7,
        imageSrc: pod7,
        alt: '52 Real Life Lessons physical book',
        title: 'Build First, Brand Later: Akosua Koranteng Adayi on Getting It Wrong | Beyond The Hustle Episode 6',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/1uGxWASEtXrJQSZ4oL7GWc?si=a5e90b4a0f9e4778?utm_source=generator',
    },
    {
        id: 8,
        imageSrc: pod8,
        alt: '52 Real Life Lessons physical book',
        title: 'Build, Not Bought: Dr.Padi Ayertey on Turning Frustration into Success | Beyond The Hustle Episode 7',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/0ij6kPpgrWxF0jOxz25pUB?si=e6e71a4c9c184b53?utm_source=generator',
    },
    {
        id: 9,
        imageSrc: pod9,
        alt: '52 Real Life Lessons physical book',
        title: 'Beyond Repairs: Victor Elorm Morgah on Breaking Screens, and Breaking Even | Beyond The Hustle Episode 8',
        spotifyEmbedUrl:
            'https://open.spotify.com/embed/episode/74JquzEaDtbwPzQLvASgqW?si=e49c2698e2004eca?utm_source=generator',
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
