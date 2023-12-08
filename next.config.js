/** @type {import('next').NextConfig} */
// we need to add either the image or the domain to the next.config.js file for the image to work
const nextConfig = {
    images:{
        domains: ['cloud.appwrite.io']
    }
};

module.exports = nextConfig
