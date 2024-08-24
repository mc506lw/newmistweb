document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.querySelector('.join-copy-button');
    const ipElement = document.getElementById('server-ip');
    const joinContainer = document.getElementById('ip-container');

    copyButton.addEventListener('click', async function (event) {
        try {
            const textToCopy = ipElement.getAttribute('data-copy-content');
            await navigator.clipboard.writeText(textToCopy);
            showNotification("成功", "服务器IP已复制到剪贴板！");
            createRippleEffect(event, joinContainer);
        } catch (err) {
            showNotification("错误", "复制失败，请稍后再试。");
            console.error('无法复制文本: ', err);
        }
    });
});

function createRippleEffect(event, container) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    container.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.classList.add('toast');
    notification.innerHTML = `<strong>${title}:</strong> ${message}`;
    document.body.appendChild(notification);
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 1000);
}

document.getElementById('mc-game-licensed').addEventListener('click', function () {
    expandOption('mc-game-licensed', 'https://ltcat.lanzoum.com/ipFqY0itprkf');
});

document.getElementById('mc-game-unlicensed').addEventListener('click', function () {
    expandOption('mc-game-unlicensed', 'https://ltcat.lanzoum.com/ipFqY0itprkf');
});

document.getElementById('mc-game-reset').addEventListener('click', function () {
    resetOptions();
});

function expandOption(id, downloadLink) {
    const container = document.querySelector('.mc-game-container');
    const selectedOption = document.getElementById(id);
    const otherOption = id === 'mc-game-licensed' ? document.getElementById('mc-game-unlicensed') : document.getElementById('mc-game-licensed');
    const resetButton = document.getElementById('mc-game-reset');

    selectedOption.classList.add('mc-game-option-expanded');
    selectedOption.innerHTML = `推荐下载PCL2启动器进行游玩 <a href="${downloadLink}" class="mc-game-download-link" target="_blank">下载启动器</a>`;

    otherOption.style.display = 'none';
    container.style.height = 'auto';
    resetButton.style.display = 'block';
}

function resetOptions() {
    const licensedOption = document.getElementById('mc-game-licensed');
    const unlicensedOption = document.getElementById('mc-game-unlicensed');
    const resetButton = document.getElementById('mc-game-reset');

    licensedOption.style.display = 'block';
    unlicensedOption.style.display = 'block';

    licensedOption.classList.remove('mc-game-option-expanded');
    unlicensedOption.classList.remove('mc-game-option-expanded');

    licensedOption.innerHTML = '我有正版';
    unlicensedOption.innerHTML = '我没有正版';

    resetButton.style.display = 'none';
}