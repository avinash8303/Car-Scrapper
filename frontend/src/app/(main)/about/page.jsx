import React from 'react';

const About = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-gray-100 py-12 px-4">
            <section className="max-w-4xl mx-auto bg-gray-900/80 rounded-3xl shadow-2xl p-8 md:p-14 border border-blue-800">
                <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 mb-4 text-center drop-shadow-lg tracking-tight">About ScrapHub</h1>
                <p className="text-lg text-cyan-100 mb-8 text-center max-w-2xl mx-auto">
                    ScrapHub is your trusted platform for scraping, comparing, and managing car data from across the web. We empower car buyers, sellers, and enthusiasts with real-time, comprehensive information to make smarter automotive decisions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 rounded-2xl p-6 shadow-lg border border-blue-700">
                        <h2 className="text-2xl font-bold text-yellow-200 mb-2">Our Mission</h2>
                        <p className="text-cyan-100">
                            To simplify the car search and comparison process by providing a powerful, user-friendly platform that aggregates and analyzes car data from multiple sources.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 via-yellow-700 to-gray-900 rounded-2xl p-6 shadow-lg border border-yellow-400">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Us?</h2>
                        <ul className="list-disc list-inside text-gray-900 text-base space-y-2">
                            <li>Real-time car data scraping from trusted sources</li>
                            <li>Advanced comparison tools for specs, prices, and features</li>
                            <li>Modern, intuitive dashboard for managing your car lists</li>
                            <li>Secure and privacy-focused platform</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">Meet the Team</h3>
                    <p className="text-cyan-100 mb-4">We are a passionate group of developers, designers, and car enthusiasts dedicated to making car research effortless and enjoyable for everyone.</p>
                    <div className="flex flex-wrap justify-center gap-6 mt-4">
                        <div className="bg-gray-800 rounded-xl p-4 w-48 shadow-md border border-blue-700">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-900 mb-2"></div>
                            <div className="font-bold text-lg text-yellow-200">Avinash Tripathi</div>
                            <div className="text-cyan-200 text-sm">Full Stack Developer</div>
                        </div>
                        
                        {/* Add more team members here if needed */}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;