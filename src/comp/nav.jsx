import { useState,useEffect } from "react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);

        window.addEventListener('scroll', handleScroll, { passive: true });


        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-neutral-800' : 'bg-transparent'}`}>
            <div className="max-w-[90rem] mx-auto px-6 sm:px-8 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold tracking-widest text-white uppercase">RAYAAAN PASHA</a>
                <nav className="hidden md:flex items-center gap-8">
                    <a href="/#skills" className="text-neutral-300 hover:text-white transition-colors duration-300">Skills</a>
                    <a href="/#experience" className="text-neutral-300 hover:text-white transition-colors duration-300">Experience</a>
                    <a href="/#projects" className="text-neutral-300 hover:text-white transition-colors duration-300">Projects</a>
                 
                </nav>
<button
  type="button"
  className="px-6 py-2 border border-neutral-700 bg-neutral-900/50 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
  onClick={() => (window.location.href = "mailto:mdrayaanpasha@gmail.com")}
>
  Contact
</button>
            </div>
        </header>
    );
};

export default Header;