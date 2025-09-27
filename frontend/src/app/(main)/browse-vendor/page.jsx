"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// const vendors = [
// 	{
// 		id: 1,
// 		name: "Mahindra Aassosiates",
// 		description: "Car Manufacturer.",
// 		location: "Mumbai, India",
// 	},
// 	{
// 		id: 2,
// 		name: "Tata Motors Parts",
// 		description: "Car Manufacturer.",
// 		location: "Delhi, India",
// 	},
// 	{
// 		id: 3,
// 		name: "Toyota Dealers",
// 		description: "Car Manufacturer.",
// 		location: "Lucknow, India",
// 	},
// ];

const BrowseVendor = () => {

	const [vendorList, setVendorList] = useState([]);

	const fetchVendor = async () => {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/getall`)
		console.table(res.data);
		setVendorList(res.data);
	};

	// Use effect code.
	useEffect(() => {
		fetchVendor();
	}, []);

	const [searchTerm, setSearchTerm] = useState("");

	const filteredVendors = vendorList.filter(vendor =>
		vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
		vendor.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center py-12 px-4">
			<h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 mb-8 text-center drop-shadow-lg">Browse Vendors</h1>
			<p className="text-lg text-purple-700 mb-10 text-center max-w-2xl font-medium">
				Discover trusted vendors and explore their unique collections.
			</p>
			<form className="mb-10 w-full max-w-md flex items-center gap-3">
				<input
					type="text"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder="Search vendors..."
					className="w-full px-5 py-3 rounded-xl border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold text-pink-700 bg-white placeholder-pink-400 shadow-lg"
				/>
			</form>
			<div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
				{filteredVendors.length === 0 ? (
					<div className="col-span-full flex justify-center items-center min-h-[200px]">
						<span className="text-pink-500 text-2xl font-bold">No vendors found.</span>
					</div>
				) : (
					filteredVendors.map(vendor => (
						<div key={vendor.id} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200 border-2 border-pink-100">
							<img src={vendor.image} alt={vendor.name} className="h-24 w-24 object-cover rounded-xl mb-4 border-2 border-yellow-100" />
							<h2 className="text-2xl font-bold text-pink-800 mb-2 text-center">{vendor.name}</h2>
							<p className="text-gray-600 mb-2 text-center">{vendor.description}</p>
							<span className="text-sm text-purple-500 font-semibold mb-2">{vendor.location}</span>
							<Link href={'/vendor-details/'+ vendor._id} className="mt-3 px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-bold rounded-xl shadow transition">
								View Details
							</Link>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default BrowseVendor;