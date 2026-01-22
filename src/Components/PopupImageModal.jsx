/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import webinar from "../assets/webinar/webinar.jpg"

const PopupImageModal = () => {
    const [isOpen, setIsOpen] = useState(false) // start hidden
    const navigate = useNavigate()

    // Show only once per session. this pops up every time the page is refreshed so we don't need it now
    // useEffect(() => {
    //     const hasSeenPopup = sessionStorage.getItem("hasSeenPopup")
    //     if (!hasSeenPopup) {
    //         setIsOpen(true)
    //         sessionStorage.setItem("hasSeenPopup", "true")
    //     }
    // }, [])

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)} // click outside to close
        >
            <div
                className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full text-center relative"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-1 text-gray-600 hover:text-[#D95B24]"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image */}
                <img
                    src={webinar}
                    alt="Promo"
                    className="rounded-lg mx-auto mb-4"
                />

                {/* Register Button */}
                <button
                    onClick={() => {
                        setIsOpen(false)
                        navigate("/webinar-register")
                    }}
                    className="bg-[#D95B24] hover:bg-[#A34115] text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Register Now
                </button>
            </div>
        </div>
    )
}

export default PopupImageModal
