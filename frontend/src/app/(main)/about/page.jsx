import React from 'react';

const About = () => {
    return (
        <main className="min-h-screen bg-[#1A2E40] text-white py-12 px-4">
            <section className="max-w-4xl mx-auto bg-[#23395d] rounded-3xl shadow-xl p-8 md:p-14 border border-[#4B5563]">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center tracking-tight">About <span className="text-[#F97316]">ScrapHub</span></h1>
                <p className="text-lg mb-8 text-center max-w-2xl mx-auto text-white">
                    ScrapHub is your trusted platform for scraping, comparing, and managing car data from across the web. We empower car buyers, sellers, and enthusiasts with real-time, comprehensive information to make smarter automotive decisions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white rounded-2xl p-6 shadow border border-[#4B5563]">
                        <h2 className="text-2xl font-bold text-[#F97316] mb-2">Our Mission</h2>
                        <p className="text-[#1A2E40]">
                            To simplify the car search and comparison process by providing a powerful, user-friendly platform that aggregates and analyzes car data from multiple sources.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow border border-[#4B5563]">
                        <h2 className="text-2xl font-bold text-[#22C55E] mb-2">Why Choose Us?</h2>
                        <ul className="list-disc list-inside text-[#1A2E40] text-base space-y-2">
                            <li>Real-time car data scraping from trusted sources</li>
                            <li>Advanced comparison tools for specs, prices, and features</li>
                            <li>Modern, intuitive dashboard for managing your car lists</li>
                            <li>Secure and privacy-focused platform</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Meet the Team</h3>
                    <p className="mb-4 text-white">We are a passionate group of developers, designers, and car enthusiasts dedicated to making car research effortless and enjoyable for everyone.</p>
                    <div className="flex flex-wrap justify-center gap-6 mt-4">
                        <div className="bg-[#23395d] rounded-xl p-4 w-48 shadow-md border border-[#4B5563]">
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#F97316] mb-2"></div>
                            <div className="font-bold text-lg text-white">Avinash Tripathi</div>
                            <div className="text-[#22C55E] text-sm">Full Stack Developer</div>
                        </div>
                        {/* Add more team members here if needed */}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;