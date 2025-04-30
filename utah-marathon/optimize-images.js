const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageSizes = {
    mobile: { width: 640, height: null },
    tablet: { width: 1024, height: null },
    desktop: { width: 1920, height: null }
};

const images = [
    {
        input: 'images/hero-bg.jpg',
        output: 'images/hero-bg-{size}.jpg'
    },
    {
        input: 'images/course-map.jpg',
        output: 'images/course-map-{size}.jpg'
    },
    {
        input: 'images/new-course-map.jpg',
        output: 'images/new-course-map-{size}.jpg'
    }
];

async function optimizeImages() {
    for (const image of images) {
        try {
            const metadata = await sharp(image.input).metadata();
            
            for (const [size, dimensions] of Object.entries(imageSizes)) {
                const outputPath = image.output.replace('{size}', size);
                
                // Calculate height maintaining aspect ratio
                const height = dimensions.height || Math.round(dimensions.width * (metadata.height / metadata.width));
                
                await sharp(image.input)
                    .resize(dimensions.width, height, {
                        fit: 'contain',
                        position: 'center'
                    })
                    .jpeg({
                        quality: 85,
                        progressive: true
                    })
                    .toFile(outputPath);
                
                console.log(`Created ${outputPath}`);
            }
        } catch (error) {
            console.error(`Error processing ${image.input}:`, error);
        }
    }
}

optimizeImages().catch(console.error); 