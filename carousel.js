document.addEventListener('DOMContentLoaded', function () {
    let index = 0;
    const images = document.querySelectorAll('.carouselcard img');
    const totalImages = images.length;
    let autoPlayTimer;

    images[0].classList.add('show');
    function slideTo(nextIndex) {
        const currentImg = images[index];
        const nextImg = images[nextIndex];

        // 确保所有图片先隐藏
        images.forEach(img => img.classList.remove('show'));

        // 立即隐藏当前图片，避免在动画开始时看到不应该显示的图片
        currentImg.classList.remove('show');

        // 为下一张图片添加 show 类，开始显示动画
        setTimeout(() => { // 延迟一点点确保当前图片隐藏后再开始显示动画
            nextImg.classList.add('show');
            index = nextIndex; // 在动画开始后更新索引
        }, 0); // 这里的延迟设置为0，实际上是为了在事件队列中稍后执行，确保隐藏操作已完成
    }

    function nextSlide() {
        clearInterval(autoPlayTimer);
        const nextIndex = (index + 1) % totalImages;
        slideTo(nextIndex);
        resetAutoPlay();
    }

    function prevSlide() {
        clearInterval(autoPlayTimer);
        const prevIndex = (index - 1 + totalImages) % totalImages;
        slideTo(prevIndex);
        resetAutoPlay();
    }

    function resetAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000); // 重新设置自动播放计时器
    }

    // 为按钮绑定事件监听器
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // 初始化自动播放逻辑
    resetAutoPlay();
});