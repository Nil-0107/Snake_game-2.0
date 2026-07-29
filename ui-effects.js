document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const heroPanel = document.querySelector('.hero-panel');
    const modalCards = document.querySelectorAll('.modal-card');

    if (board) {
        board.style.setProperty('--glow-opacity', '1');
    }

    if (heroPanel) {
        heroPanel.addEventListener('mousemove', (event) => {
            const bounds = heroPanel.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width) * 100;
            const y = ((event.clientY - bounds.top) / bounds.height) * 100;
            heroPanel.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(46, 252, 255, 0.16), transparent 36%), linear-gradient(180deg, rgba(17, 25, 56, 0.88), rgba(6, 11, 28, 0.72))`;
        });

        heroPanel.addEventListener('mouseleave', () => {
            heroPanel.style.background = '';
        });
    }

    modalCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 80}ms`;
    });
});
