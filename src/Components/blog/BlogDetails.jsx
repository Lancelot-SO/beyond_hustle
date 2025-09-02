import { Link, useParams } from "react-router-dom";
import blog1 from "../../assets/blog/blog1.png"
import blog2 from "../../assets/blog/blog2.png"
import blog3 from "../../assets/blog/blog3.png"
import blog4 from "../../assets/blog/blog4.png"
import blog5 from "../../assets/blog/blog5.png"
import blog6 from "../../assets/blog/blog6.png"
import { useEffect } from "react";

import gallerybg from "../../assets/gallery/gallerybg.png"


import AOS from 'aos'
import 'aos/dist/aos.css'
import BottomSection from "../herosection/BottomSection";

// Example posts data (replace with your actual data or import)
const posts = [
    { id: 1, imageSrc: blog1, altText: 'Medical staff at work', title: 'How To Differentiate Between Your Thoughts' },
    { id: 2, imageSrc: blog2, altText: 'Show Your Work sign', title: 'How To Differentiate Between Your Thoughts' },
    { id: 3, imageSrc: blog3, altText: 'Close-up of print media', title: 'How To Differentiate Between Your Thoughts' },
    { id: 4, imageSrc: blog4, altText: 'Lantern on table', title: 'How To Differentiate Between Your Thoughts' },
    { id: 5, imageSrc: blog5, altText: 'Bible on a shelf', title: 'How To Differentiate Between Your Thoughts' },
    { id: 6, imageSrc: blog6, altText: 'Laptop with news site', title: 'How To Differentiate Between Your Thoughts' },
];

// Blog detail page
export function BlogDetails() {
    const { id } = useParams();
    const relatedPosts = posts.filter(p => p.id !== parseInt(id, 10)).slice(0, 3);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <div className="bg-white py-12 md:py-24 lg:py-32">
            <div className="">
                <div className="relative">
                    {/* hero image shrinks height on smaller breakpoints */}
                    <img
                        src={gallerybg}
                        alt="Hero Image"
                        className="w-full h-[300px] lg:h-full object-cover"
                    />

                    {/* headline container */}
                    <div
                        className="
                                                              absolute
                                                              top-[50%] md:top-16 lg:top-48
                                                              left-4 lg:left-[20%] 4xl:left-32
                                                              w-[340px] md:w-[500px] lg:w-[815px]
                                                              h-auto md:h-auto lg:h-[216px]
                                                            "
                    >
                        <h1
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="
                                                                font-playfair text-white
                                                                text-[32px] md:text-[48px] lg:text-[64px]
                                                                leading-[24px] md:leading-[36px] lg:leading-[72px]
                                                                font-normal tracking-[-5%]
                                                              "
                        >
                            Are you been Held back by This
                        </h1>
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-semibold italic text-white">By Elizabeth Gilbert</span>
                            <br />
                            <span className="text-sm text-[#D95B24]">April 5, 2025</span>
                        </div>

                    </div>


                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 max-w-3xl pt-10">
                {/* Main content */}
                <div className="mb-12">
                    <div className="prose prose-lg text-[16px] flex flex-col gap-4 text-center mx-auto font-playfair text-gray-800 leading-relaxed">
                        <p>
                            This is big. I want you to step to the edge with me and let go, really let go, of the expert thing.
                        </p>
                        <p>
                            I’ve traveled far and wide talking to brilliant women, and again and again I saw us staying away from sharing our voice.
                            We are convinced we aren’t “expert” enough on the topics that we long to speak or write or teach about.
                        </p>
                        <p>
                            Maybe you want to write or teach about surviving trauma, but you didn’t study trauma survival.
                            You only lived it. Or you want to speak about parenting special needs children,
                            but those other people are the experts. You only did it once.
                            Maybe you’d like to teach about reinventing yourself after divorce,
                            but you have no formal training in “reinvention” — you just did it yourself
                            and have been helping some friends do the same.
                            So you are not talking, not teaching, not speaking. We’ve got to change that.
                        </p>
                        <p>
                            Of course, I have tremendous respect for expertise. I think we are blessed — absolutely blessed —
                            to live in an era when information is produced and distributed with greater volume and accessibility than ever before.
                            We are blessed to have diverse, specialized educational programs that allow us to develop expertise on pretty much any topic you can name.
                            As a society, we need our experts. They are incredibly important.
                        </p>
                        <p>
                            And yet. Somehow, many women convince themselves of the internalized idea
                            that because they aren’t an expert (in journalism – diet, climate change, child abuse, art, local politics, etc.)
                            they can’t really speak up. They don’t have much to offer.
                            They shouldn’t be the one to write the op-ed, launch the campaign, start the business.
                        </p>
                        <p>
                            As a child, you may have been shamed for not knowing enough, told you didn’t know enough to speak up.
                            I’ll never forget the time, when I was a child, I was talking to a grown-up about how war was insane
                            and one day we could evolve beyond it. “Well dear, that’s very nice, but war will always be with us.
                            It’s the way the world works.” What was really being told in that moment?
                            “Let the status quo win; we all agree out here in the world; displace what you know to be true in your heart.”
                            Ah, got it. Message received.
                        </p>
                        <p>
                            I want to ask you to change this in yourself, to drag any form of the “well, I’m not an expert” thing rumbling around in your head,
                            out of the well. Why?
                        </p>
                        <p>
                            I’ve come to believe that, within the context of this culture, it is a rite of passage,
                            an implicit duty to plunge into empowerment, to speak out on the topics where we don’t have formal expertise.
                            It is a reclaiming of voice, of citizenship, of conscience.
                        </p>
                        <p>
                            It’s a particularly important rite of passage for women because, whatever the topic,
                            the body of knowledge that makes up “formal expertise” tends to be shaped by a male perspective —
                            either because the field is still dominantly male,
                            or because the foundations and backdrops of knowledge fields were developed before women had access to speak in them.
                        </p>
                        <p>
                            So the things that move your heart. Speak about those things.
                            Write about those things. Speak about the things you’ve experienced and what you’ve learned.
                            Speak about the wisdom as a result of those experiences.
                            Speak about your vision for how some part of our world could be different.
                        </p>
                        <p>
                            I’ll be writing more about this “expert” topic, because I believe it’s part of what sits at the center of the knot —
                            the knot we feel in our throats, in our chests, when we lean towards speaking up.
                            But then we must unravel it.
                        </p>
                        <p className="mt-8 text-right">
                            I love all of you.<br />
                            Thanks for reading.<br />
                            Dr.Roohiemen.com
                        </p>
                    </div>
                </div>


            </div>
            {/* You May Also Like */}
            <div className="mt-20 px-4 lg:px-14 4xl:px-32">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand">You May Also Like</h2>
                    <Link to="/blog" className="text-sm hover:underline text-[#D95B24] font-playfair">View All</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map(post => (
                        <Link key={post.id} to={`/blog/${post.id}`} className="relative group overflow-hidden rounded-lg">
                            <img
                                src={post.imageSrc}
                                alt={post.altText}
                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-colors duration-300" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-white text-lg md:text-xl font-medium">{post.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <BottomSection />
        </div>
    );
}