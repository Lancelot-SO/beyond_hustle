/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'

const ArtSale = () => {
    return (
        <div>
            <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/30">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block mb-6 text-sm font-medium bg-muted px-3 py-1 rounded-full text-secondary">
                        From the bestselling book{" "}
                        <span className="text-[#D95B24]">"Beyond the Hustle"</span>
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
                        Transform Your Office with
                        <span className="text-accent"> Inspirational Art</span>
                    </h1>

                    <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto text-pretty">
                        Beautifully designed excerpts from{" "}
                        <span className="text-[#D95B24]">"Beyond the Hustle"</span> that inspire
                        success, motivate teams, and elevate your workspace atmosphere.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-2xl bg-[#D95B24] text-white hover:bg-[#A34115] transition"
                        >
                            Shop Art Pieces
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>

                        <p className="text-secondary text-sm">
                            Starting at <span className="font-semibold text-[#D95B24]">200 GHS</span> per piece
                        </p>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ArtSale