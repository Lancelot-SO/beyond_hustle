/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'
import mobilebg from "../assets/mobilebg.jpg"

const MobileApp = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])
    return (
        <main>
            <div>
                {/* adjust top‑margin per screen size */}
                <div className="mt-[150px] md:mt-[80px] lg:mt-[100px]">
                    <div className="relative">
                        {/* hero image shrinks height on smaller breakpoints */}
                        <img
                            src={mobilebg}
                            alt="Hero Image"
                            className="w-full h-[200px] lg:h-[70vh] object-cover"
                            loading='lazy'

                        />
                        <div className="bg-black/40 absolute inset-0"></div>

                        {/* headline container */}
                        <div
                            className="
                          absolute
                          top-12 md:top-16 lg:top-24
                          left-4 lg:left-14 4xl:left-32
                          w-[340px] md:w-[500px] lg:w-[900px]
                          h-auto md:h-auto lg:h-[216px]
                        "
                        >
                            <h1
                                data-aos="fade-up"
                                data-aos-delay="200"
                                className="
                            font-playfair text-white
                            text-[32px] md:text-[48px] lg:text-[64px]
                            leading-[28px] md:leading-[36px] lg:leading-[72px]
                            font-normal tracking-[-5%]
                          "
                            >
                                Choose between <b className="text-[#D95B24]">Android & IOS</b> <br /> Beyond The Hustle Mobile App is here.
                            </h1>
                        </div>


                    </div>
                </div>
            </div>
            <div className="w-full min-h-screen bg-white text-gray-800 font-openSans">
                {/* Hero Section */}
                <section className="w-full flex flex-col items-center justify-center px-6 py-20 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#D95B24]">
                        Download the Beyond The Hustle Mobile App
                    </h1>
                    <p className="max-w-2xl text-base md:text-lg text-muted-foreground">
                        Experience seamless access to Blacksmith Africa’s BTH platform on the go. Manage your activities, stay updated, and enjoy a smooth mobile experience anytime, anywhere.
                    </p>
                </section>

                {/* App Download Section */}
                <section className="w-full px-6 py-16 bg-gray-50">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Google Play */}
                        <div className="flex flex-col items-center text-center p-8 rounded-2xl
      bg-[#1C2237] backdrop-blur-xl
      border border-white/10 shadow-lg">

                            <h2 className="text-xl font-semibold mb-3 text-white">
                                Android Users
                            </h2>

                            <p className="text-sm text-gray-300 mb-6">
                                Download the BTH app from Google Play Store and enjoy full access on your Android device.
                            </p>

                            <a
                                href="https://play.google.com/store/apps/details?id=com.selasi_godfred.beyondTheHustleApp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3
          bg-[#D95B24] text-white rounded-lg
          hover:opacity-90 transition"
                            >
                                Get it on Play Store
                            </a>
                        </div>

                        {/* App Store */}
                        <div className="flex flex-col items-center text-center p-8 rounded-2xl
      bg-[#1C2237] backdrop-blur-md
      border border-white/10 shadow-lg">

                            <h2 className="text-xl font-semibold mb-3 text-white">
                                iOS Users
                            </h2>

                            <p className="text-sm text-gray-300 mb-6">
                                Download the BTH app from the Apple App Store and stay connected wherever you are.
                            </p>

                            <a
                                href="https://apps.apple.com/us/app/beyondthehustleapp/id6757446450"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3
          bg-[#D95B24] text-white rounded-lg
          hover:opacity-90 transition"
                            >
                                Download on App Store
                            </a>
                        </div>

                    </div>
                </section>


                {/* Footer Note */}
                <section className="w-full px-6 py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Beyond The Hustle mobile app is designed to give you the best experience across all devices. It’s exciting, fast, and empowering—bringing ideas, opportunities, and growth right to your fingertips                </p>
                </section>
            </div>
        </main>
    );
};

export default MobileApp;
