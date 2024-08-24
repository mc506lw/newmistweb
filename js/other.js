function shakeImage(imageElement) {
    // 直接操作传入的图片元素
    imageElement.classList.add('shake');
    // 移除shake类以准备下一次动画
    setTimeout(function () {
        imageElement.classList.remove('shake');
    }, 510); // 与动画持续时间同步
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