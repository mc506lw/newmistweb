function shakeImage(imageElement) {
    // 直接操作传入的图片元素
    imageElement.classList.add('shake');
    // 移除shake类以准备下一次动画
    setTimeout(function () {
        imageElement.classList.remove('shake');
    }, 510); // 与动画持续时间同步
}

document.addEventListener('DOMContentLoaded', () => {
    const copyTargets = document.querySelectorAll('.line');

    copyTargets.forEach(target => {
        target.addEventListener('click', async function () {
            try {
                // 从data-copy-content属性获取实际要复制的文本
                const textToCopy = this.getAttribute('data-copy-content');
                await navigator.clipboard.writeText(textToCopy);
                showNotification("成功", "文本已复制到剪贴板！");
            } catch (err) {
                showNotification("错误", "复制失败，请稍后再试。");
                console.error('无法复制文本: ', err);
            }
        });
    });
});

function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.classList.add('toast');
    notification.innerHTML = `<strong>${title}:</strong> ${message}`;
    document.body.appendChild(notification);
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500); // 等待过渡效果结束后移除元素
    }, 1000); // 3秒后隐藏
}

document.getElementById('scrollButton').addEventListener('click', function() {
    // 直接滚动到目标像素位置
    const targetPosition = 900; // 请根据实际情况替换为您的目标像素值
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // 确保只滚动到目标位置，避免过度滚动
    const scrollToPosition = Math.min(targetPosition, document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
    });
});

// 为箭头添加点击时的动画效果
document.querySelector('.down-arrow').addEventListener('mousedown', function() {
    this.classList.add('animate');
});

document.querySelector('.down-arrow').addEventListener('mouseup', function() {
    this.classList.remove('animate');
});