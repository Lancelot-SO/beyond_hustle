/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import amazonLogo from '../../assets/hero/spon1.png'
import bamLogo from '../../assets/hero/spon2.png'
import bnLogo from '../../assets/hero/spon3.png'
import indieLogo from '../../assets/hero/spon4.png'

export default function PurchaseSection() {
    return (
        <section className="bg-[#FCF8F1] py-12">
            <div className="mx-auto text-center px-4 lg:px-14 4xl:px-32">
                <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1C2230] mb-6">
                    <span className="text-[#F3732D]">Purchase</span> Your Copy Here:
                </h2>

                <div className="bg-[#1C2230] flex flex-wrap justify-around items-center gap-6 py-4 rounded">
                    <Link
                        to="https://amazon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={amazonLogo}
                            alt="Amazon"
                            className="h-8 md:h-10 object-contain" loading='lazy'

                        />
                    </Link>

                    <Link
                        to="https://booksamillion.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={bamLogo}
                            alt="Books‑A‑Million"
                            className="h-8 md:h-10 object-contain" loading='lazy'

                        />
                    </Link>

                    <Link
                        to="https://barnesandnoble.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={bnLogo}
                            alt="Barnes & Noble"
                            className="h-8 md:h-10 object-contain" loading='lazy'

                        />
                    </Link>

                    <Link
                        to="https://indiebound.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={indieLogo}
                            alt="IndieBound"
                            className="h-8 md:h-10 object-contain" loading='lazy'

                        />
                    </Link>
                    <Link
                        to="https://indiebound.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={indieLogo}
                            alt="IndieBound"
                            className="h-8 md:h-10 object-contain" loading='lazy'

                        />
                    </Link>
                    <Link
                        to="https://indiebound.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={indieLogo}
                            alt="IndieBound"
                            className="h-8 md:h-10 object-contain" loading='lazy'

                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}
