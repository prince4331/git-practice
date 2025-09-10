document.addEventListener('DOMContentLoaded', () => {
    const windowEl = document.getElementById('mainWindow');
    const titleBar = windowEl.querySelector('.title-bar');
    const dockItems = document.querySelectorAll('.dock-item');
    const timeEl = document.querySelector('.time');

    // Make window draggable
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;
        windowEl.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Constrain window within the desktop
        const desktop = document.querySelector('.desktop');
        const maxX = desktop.clientWidth - windowEl.clientWidth;
        const maxY = desktop.clientHeight - windowEl.clientHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        windowEl.style.left = `${newX}px`;
        windowEl.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        windowEl.style.cursor = 'default';
    });

    // Dock hover effect
    dockItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const itemRect = item.getBoundingClientRect();
            const dockRect = item.parentElement.getBoundingClientRect();
            const offset = (e.clientX - itemRect.left) / itemRect.width;

            // Reset all items
            dockItems.forEach(i => {
                i.style.transform = 'translateY(0)';
                i.style.transition = 'transform 0.2s';
            });

            // Animate current and adjacent items
            const index = Array.from(dockItems).indexOf(item);

            const scale = Math.sin(offset * Math.PI) * 20;
            item.style.transform = `translateY(-${scale}px)`;

            if (index > 0) {
                const prevItem = dockItems[index - 1];
                const prevScale = (Math.sin(offset * Math.PI) * 10);
                prevItem.style.transform = `translateY(-${prevScale}px)`;
            }
            if (index < dockItems.length - 1) {
                const nextItem = dockItems[index + 1];
                const nextScale = (Math.sin(offset * Math.PI) * 10);
                nextItem.style.transform = `translateY(-${nextScale}px)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            dockItems.forEach(i => {
                i.style.transform = 'translateY(0)';
            });
        });
    });

    // Time in menu bar
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}`;
    }

    setInterval(updateTime, 1000);
    updateTime();
});
