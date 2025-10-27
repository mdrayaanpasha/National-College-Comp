import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, ChevronDown } from 'lucide-react';
import Lenis from '@studio-freight/lenis';


import rayaan from "../assets/imgs/Rayaan.jpeg"
import gaugeroimg from "../assets/imgs/Gaugero.jpeg"
import Royalcoimg from "../assets/imgs/royal.jpeg"
import Skills from "../assets/imgs/Skills.jpeg"
import Friends from "../assets/imgs/Friends.png"
import Quantiva from "../assets/imgs/Quantiva.png";

const heroBg =  rayaan;





const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [ref, options]);
    return [ref, isVisible];
};

const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);
};



const AnimatedComponent = ({ children, className = "", delay = 0, threshold = 0.1 }) => {
    const [ref, isVisible] = useOnScreen({ threshold, triggerOnce: true });
    return (
        <div 
            ref={ref} 
            className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const CustomCursor = () => {
    const cursorRef = useRef(null);
    useEffect(() => {
        const onMouseMove = (e) => {
            if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };
        const onInteractionStart = (e) => {
            if (e.target.closest('a, button, details, [data-hover]')) cursorRef.current?.classList.add('cursor-hover');
        };
        const onInteractionEnd = (e) => {
             if (e.target.closest('a, button, details, [data-hover]')) cursorRef.current?.classList.remove('cursor-hover');
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onInteractionStart);
        document.addEventListener('mouseout', onInteractionEnd);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onInteractionStart);
            document.removeEventListener('mouseout', onInteractionEnd);
        };
    }, []);
    return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"></div>;
};

import Header from '../comp/nav';

const HeroSection = () => (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
<div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img src={heroBg} alt="hero" className="w-full h-full object-cover animate-kenburns" />
        </div>


        <div className="relative z-10 flex flex-col items-center px-4">
            <AnimatedComponent>
                <h1 className="text-5xl md:text-8xl font-serif-display font-bold tracking-tighter leading-tight">Full Stack Developer.</h1>
            </AnimatedComponent>
            <AnimatedComponent delay={200}>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 leading-relaxed"> ~year of experience in full stack devlopment with focus on distributed systems.</p>
            </AnimatedComponent>
            <AnimatedComponent delay={400} className="mt-10">
                <a  onClick={e=>window.location.href="https://drive.google.com/file/d/19WTlZ0dz4bZdF_dVQ35qaZ41f384nM9q/view?usp=sharing"} className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-full overflow-hidden transition-all duration-300 hover:text-black">
                    <span className="absolute inset-0 w-full h-full bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                    <span className="relative z-10 flex items-center gap-2">Grab My Resume!! <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></span>
                </a>
            </AnimatedComponent>
        </div>
    </section>
);


const ExpGaugeCardSection = () => {
    const containerRef = useRef(null);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollY = window.innerHeight - rect.top;
                if (scrollY > 0 && rect.bottom > 0) {
                     setTranslateY((scrollY - window.innerHeight / 2) * 0.1);
                }
            }
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="experience" ref={containerRef} className="py-28 px-6 sm:px-8 bg-neutral-950 overflow-hidden">
            <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative h-[120vh] hidden lg:block">
                    <div className="sticky top-0 h-screen flex items-center">
                         <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden">
                            <img src={gaugeroimg} alt="gauge" className="w-full h-full object-cover" style={{transform: `scale(1.2) translateY(${translateY}px)`}} />
                        </div>
                    </div>
                </div>
                <AnimatedComponent>
                    <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-white">Full-Stack Dev Intern @ Gauge.ro</h2>
                    <div className="mt-12 space-y-8">
                        {["Created a CRM from scratch with some GEN AI Automation","Optimized Client Side Performance By 20%","Replaced Strapi CMS With Custom Server Reducing ~20% Cost"].map(item => (
                            <div key={item}>
                                <h3 className="font-bold text-gray-300 text-xl">{item}</h3>
                            </div>
                        ))}
                    </div>
                </AnimatedComponent>
            </div>
        </section>
    );
};

const SkilledInSection = () => (
    <div className="py-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimatedComponent>
                <p className="text-sm uppercase tracking-widest text-neutral-500">SKILLED IN &nbsp;·&nbsp; DSA &nbsp;·&nbsp; FULL STACK DEVELOPEMENT &nbsp;·&nbsp; ALGORITHM DESIGN</p>
            </AnimatedComponent>
        </div>
    </div>
);

const ExpRoyalCoCardSection = () => {
    const containerRef = useRef(null);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollY = window.innerHeight - rect.top;
                if (scrollY > 0 && rect.bottom > 0) {
                     setTranslateY((scrollY - window.innerHeight / 2) * 0.1);
                }
            }
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={containerRef} className="py-28 px-6 sm:px-8 bg-neutral-950 overflow-hidden">
            <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
                <AnimatedComponent>
                    <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-white">Full-Stack Dev Intern @ Royal & Co</h2>
                    <div className="mt-12 space-y-8">
                        {["Optimized DB Improving Query Perfomance By 20%","Created An LLM Wrapper That Talks To DB In Human Langauge","Created Automated Billing Tool Reducing Manual Entires By 30%"].map(item => (
                            <div key={item}>
                                <h3 className="font-bold text-gray-300 text-xl">{item}</h3>
                            </div>
                        ))}
                    </div>
                </AnimatedComponent>

                  <div className="relative h-[120vh] hidden lg:block">
                    <div className="sticky top-0 h-screen flex items-center">
                         <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden">
                            <img src={Royalcoimg} alt="royal" className="w-full h-full object-cover" style={{transform: `scale(1.2) translateY(${translateY}px)`}} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const SkillsSection = () => {
    const containerRef = useRef(null);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollY = window.innerHeight - rect.top;
                if (scrollY > 0 && rect.bottom > 0) {
                     setTranslateY((scrollY - window.innerHeight / 2) * 0.1);
                }
            }
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="skills" ref={containerRef} className="py-28 px-6 sm:px-8 bg-neutral-950 overflow-hidden">
            <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="relative h-[120vh] hidden lg:block">
                    <div className="sticky top-0 h-screen flex items-center">
                         <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden">
                            <img src={Skills} alt="exp" className="w-full h-full object-cover" style={{transform: `scale(1.2) translateY(${translateY}px)`}} />
                        </div>
                    </div>
                </div>
                <AnimatedComponent>
                    <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-white">My Skills</h2>
                    <div className="mt-12 space-y-8">
                        {["MERN STACK","PostgreSQL","Docker","Algorithms","Data Structures"].map(item => (
                            <>
                           <div key={item}>
                                <h3 className="font-bold text-gray-300 text-xl">{item}</h3>
                            </div>
                            <hr className='text-gray-400'/>
                            </>
                        ))}
                    </div>
                </AnimatedComponent>

               
            </div>
        </section>
    );
};





const ProjectsSection = () => (
    <section id="projects" className="py-28 px-6 sm:px-8">
        <div className="max-w-[90rem] mx-auto">
            <AnimatedComponent className="max-w-3xl mb-20">
                <h2 className="text-5xl md:text-7xl font-serif-display font-bold text-white">My Projects</h2>
            </AnimatedComponent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {[
                    {img: Friends, title: "Distibuted Sitcom Simulation",  hr:"./#gi"},
                    {img: Quantiva, title: "Distributed Portfolio Management System", hr:"./#gi"}
                ].map((col, i) => (
                    <AnimatedComponent key={col.title} delay={i * 150}>
                        <a href={col.hr} className="group block relative aspect-[4/3] rounded-3xl overflow-hidden">
                            <img src={col.img} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white">
                                <h3 className="text-4xl font-serif-display font-bold">{col.title}</h3>
                                
                            </div>
                        </a>
                    </AnimatedComponent>
                ))}
            </div>
        </div>
    </section>
);


// --- MAIN APP COMPONENT ---
export default function App() {
    useSmoothScroll();
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');
                
                :root { --background: #0f0f0f; --text: #f3f3f3; }
                html { scroll-behavior: smooth; }
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: var(--background);
                    color: var(--text);
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    cursor: none;
                }
                .font-serif-display { font-family: 'Playfair Display', serif; }
                a, button, summary { cursor: none; }
                ::selection { background-color: #ca8a04; color: #000; }

                .custom-cursor {
                    position: fixed; top: -5px; left: -5px; width: 10px; height: 10px; background-color: white; border-radius: 50%;
                    pointer-events: none; z-index: 9999; mix-blend-mode: difference;
                    transition: transform 0.2s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
                    display: none;
                }
                 @media (pointer: fine) { .custom-cursor { display: block; } }
                .custom-cursor.cursor-hover { width: 50px; height: 50px; background-color: rgba(255,255,255,0.2); }
                
                ::-webkit-scrollbar { 
                width: 8px;
                 }

                ::-webkit-scrollbar-track {
                 background: #1a1a1a; 
                }
                ::-webkit-scrollbar-thumb {
                background: #444; border-radius: 4px;
                 }
                ::-webkit-scrollbar-thumb:hover {
                 background: #555; 
                 }
                
                @keyframes kenburns {
                    0% { transform: scale(1.0) translate(0, 0); }
                    100% { transform: scale(1.15) translate(-2%, 2%); }
                }
                .animate-kenburns { animation: kenburns 40s ease-out infinite alternate; }

                .scrolling-wrapper { -ms-overflow-style: none; scrollbar-width: none; }
                .scrolling-wrapper::-webkit-scrollbar { display: none; }
                .scrolling-wrapper > div { -webkit-overflow-scrolling: touch; overflow-x: auto; padding-bottom: 2rem; }
            `}</style>
            
            <CustomCursor />
           <Header />
            <main>
                <HeroSection />
                <SkilledInSection ></SkilledInSection>
                <ExpGaugeCardSection />
                <ExpRoyalCoCardSection />
                <SkillsSection />
                <ProjectsSection />
            </main>

        </>
    );
}

