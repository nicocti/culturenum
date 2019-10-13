function line(particle, particle2) {
    context.beginPath();
    context.moveTo(particle.x, particle.y);
    context.lineTo(particle2.x, particle2.y);
    context.stroke();
}

function animate() {
    // Clear the canvas:
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Iterate over particles
    for (let i = 0; i < maxParticles; i++) {

        // Select particle:
        let particle = particles[i];

        // Display particle:
        context.fillRect(
            particle.x - particleSize / 2,
            particle.y - particleSize / 2,
            particleSize,
            particleSize
        );

        // Iterate over particles:
        for (let j = 0; j < maxParticles; j++) {
            // Ignore twins:
            if (i != j) {
                let particle2 = particles[j];
                let distanceX = Math.abs(particle.x - particle2.x);
                let distanceY = Math.abs(particle.y - particle2.y);
                // Check if particles must be linked:
                if (distanceX < threshold && distanceY < threshold) {
                    context.lineWidth = ((2 * threshold) - (distanceX + distanceY)) / (2 * threshold);
                    // Link particles:
                    line(particle, particle2);
                }
            }
        }

        // Move particle:
        particle.x = particle.x + particle.vx;
        particle.y = particle.y + particle.vy;

        // Bounce particle:
        if (particle.x > canvas.width - particleSize || particle.x < particleSize) {
            particle.vx = -particle.vx;
        }
        if (particle.y > canvas.height - particleSize || particle.y < particleSize) {
            particle.vy = -particle.vy;
        }
    }
    // Toogle next frame:
    window.requestAnimationFrame(animate);
}

let canvas = document.getElementById('my-canvas');
let context = canvas.getContext('2d');

let particles = [];
let particleSize = 2;
let maxParticles = 150;
let threshold = 100;

for (let i = 0; i < maxParticles; i++) {
    let particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random(),
        vy: Math.random()
    }
    particles.push(particle);
}

context.fillStyle = 'black';
context.strokeStyle = 'black'
animate();
