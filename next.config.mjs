/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};

module.exports = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

export default nextConfig;
