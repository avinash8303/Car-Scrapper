"use client";
import React, { useState } from "react";

const PriceCalculator = () => {
	const [form, setForm] = useState({
		brand: "",
		model: "",
		year: "",
		mileage: "",
		condition: "Good",
	});
	const [price, setPrice] = useState(null);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Simple price calculation logic for demo
		const basePrice = 500000;
		const yearFactor = (new Date().getFullYear() - Number(form.year)) * 20000;
		const mileageFactor = Number(form.mileage) * 2;
		const conditionFactor = form.condition === "Excellent" ? 1.1 : form.condition === "Fair" ? 0.85 : 1;
		const calculatedPrice = Math.max(50000, Math.round((basePrice - yearFactor - mileageFactor) * conditionFactor));
		setPrice(calculatedPrice);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black py-10">
			<div className="max-w-lg w-full bg-white dark:bg-neutral-900 rounded-xl shadow-2xl p-8">
				<h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">Car Price Calculator</h1>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label className="block mb-2 font-semibold text-gray-700 dark:text-neutral-300">Brand</label>
						<input type="text" name="brand" value={form.brand} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:text-white" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700 dark:text-neutral-300">Model</label>
						<input type="text" name="model" value={form.model} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:text-white" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700 dark:text-neutral-300">Year</label>
						<input type="number" name="year" value={form.year} onChange={handleChange} required min="1980" max={new Date().getFullYear()} className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:text-white" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700 dark:text-neutral-300">Mileage (km)</label>
						<input type="number" name="mileage" value={form.mileage} onChange={handleChange} required min="0" className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:text-white" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700 dark:text-neutral-300">Condition</label>
						<select name="condition" value={form.condition} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:text-white">
							<option value="Excellent">Excellent</option>
							<option value="Good">Good</option>
							<option value="Fair">Fair</option>
						</select>
					</div>
					<button type="submit" className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Calculate Price</button>
				</form>
				{price !== null && (
					<div className="mt-8 text-center">
						<h2 className="text-xl font-bold text-green-600 dark:text-green-400">Estimated Price:</h2>
						<p className="text-3xl font-extrabold mt-2">₹ {price.toLocaleString()}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PriceCalculator;
