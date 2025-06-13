document.addEventListener('DOMContentLoaded', function() {
    // Remove loader after 3 seconds
    setTimeout(function() {
        const loader = document.querySelector('.terminal-loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
        
        // Start matrix effect after loader is gone
        createMatrixEffect();
    }, 3000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Typing effect for the hero text
    const typingText = document.querySelector('.typing-text');
    const text = typingText.getAttribute('data-text');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 100 + 50);
        }
    }
    
    setTimeout(typeWriter, 3500);

    // Hack button effect
    const hackBtn = document.getElementById('hack-btn');
    if (hackBtn) {
        hackBtn.addEventListener('click', function() {
            this.textContent = 'Hacking in progress...';
            this.disabled = true;
            
            // Simulate hacking process
            setTimeout(() => {
                this.textContent = 'System vulnerable!';
                this.style.backgroundColor = 'var(--error)';
                this.style.borderColor = 'var(--error)';
                
                // Create fake terminal output
                const terminalOutput = [
                    "Scanning network...",
                    "Found 3 vulnerable endpoints",
                    "Exploiting weakness in port 443...",
                    "Injecting payload...",
                    "Root access granted!",
                    "System compromised!"
                ];
                
                const terminalBody = document.createElement('div');
                terminalBody.className = 'terminal-body';
                terminalBody.style.marginTop = '20px';
                
                terminalOutput.forEach((line, index) => {
                    setTimeout(() => {
                        const p = document.createElement('p');
                        p.innerHTML = `<span class="prompt">></span> ${line}`;
                        p.style.color = index === terminalOutput.length - 1 ? 'var(--error)' : 'var(--primary)';
                        terminalBody.appendChild(p);
                        
                        if (index === 0) {
                            this.parentNode.insertBefore(terminalBody, this.nextSibling);
                        }
                        
                        // Scroll to bottom
                        terminalBody.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, index * 800);
                });
                
                // Reset button after 8 seconds
                setTimeout(() => {
                    this.textContent = 'Execute System Scan';
                    this.style.backgroundColor = '';
                    this.style.borderColor = '';
                    this.disabled = false;
                    terminalBody.remove();
                }, 8000);
            }, 1000);
        });
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = 'var(--primary)';
                submitBtn.style.color = 'var(--background)';
                
                // Create success message
                const successMsg = document.createElement('p');
                successMsg.textContent = 'Message transmitted securely. Expect response within 24-48 hours.';
                successMsg.style.color = 'var(--primary)';
                successMsg.style.marginTop = '15px';
                this.appendChild(successMsg);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                    successMsg.remove();
                }, 5000);
            }, 1500);
        });
    }

    // Terminal window drag effect
    const terminalWindows = document.querySelectorAll('.terminal-window');
    terminalWindows.forEach(window => {
        const header = window.querySelector('.terminal-header');
        let isDragging = false;
        let offsetX, offsetY;
        
        header.addEventListener('mousedown', function(e) {
            if (e.target === this || e.target.classList.contains('terminal-title')) {
                isDragging = true;
                offsetX = e.clientX - window.getBoundingClientRect().left;
                offsetY = e.clientY - window.getBoundingClientRect().top;
                window.style.cursor = 'grabbing';
                window.style.position = 'absolute';
                window.style.zIndex = '1000';
            }
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                window.style.left = (e.clientX - offsetX) + 'px';
                window.style.top = (e.clientY - offsetY) + 'px';
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            window.style.cursor = '';
        });
    });
});

// Matrix effect
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-text';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    const alphabet = katakana + latin + nums + symbols;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    setInterval(draw, 30);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
