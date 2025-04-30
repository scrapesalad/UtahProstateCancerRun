const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageSizes = {
    mobile: { width: 640, height: 360 },
    tablet: { width: 1024, height: 576 },
    desktop: { width: 1920, height: 1080 }
};

const images = [
    {
        input: 'images/hero-bg.jpg',
        output: 'images/hero-bg-{size}.jpg'
    },
    {
        input: 'images/course-map.jpg',
        output: 'images/course-map-{size}.jpg'
    }
];

async function optimizeImages() {
    for (const image of images) {
        for (const [size, dimensions] of Object.entries(imageSizes)) {
            const outputPath = image.output.replace('{size}', size);
            
            await sharp(image.input)
                .resize(dimensions.width, dimensions.height, {
                    fit: 'cover',
                    position: 'center'
                })
                .jpeg({
                    quality: 80,
                    progressive: true,
                    optimizeCoding: true
                })
                .toFile(outputPath);
            
            console.log(`Created ${outputPath}`);
        }
    }
}

optimizeImages().catch(console.error); 