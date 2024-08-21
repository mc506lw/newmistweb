// 初始化滚动参数
let scrollParams = {
    currentScrollY: window.scrollY,
    currentScrollX: window.scrollX,
    velocityY: 0,
    velocityX: 0,
    lastDeltaY: 0,
    isAnimating: false
};

// 滚动阻尼函数
function applyDampingAndScroll() {
    if (!scrollParams.isAnimating) return;

    // 应用垂直和水平方向的阻尼效果
    scrollParams.velocityY *= 0.97;
    scrollParams.velocityX *= 0.97;

    // 根据当前速度滚动窗口
    window.scrollBy(scrollParams.velocityX, scrollParams.velocityY);

    // 判断速度是否足够小，如果是，则停止动画
    if (Math.abs(scrollParams.velocityY) < 0.1 && Math.abs(scrollParams.velocityX) < 0.1) {
        scrollParams.isAnimating = false;
    } else {
        requestAnimationFrame(applyDampingAndScroll);
    }
}

// 处理滚动事件
function handleScroll(event) {
    event.preventDefault();

    // 计算滚动方向变化
    const directionChange = event.deltaY * scrollParams.lastDeltaY < 0;

    // 方向变化时调整速度
    if (directionChange) {
        scrollParams.velocityY = -scrollParams.velocityY * 0.5;
        scrollParams.velocityX = -scrollParams.velocityX * 0.5;
    }

    // 更新滚动速度
    scrollParams.velocityY += event.deltaY * 0.04;
    scrollParams.velocityX += event.deltaX * 0.04;

    // 记录上一次滚动的方向
    scrollParams.lastDeltaY = event.deltaY;

    // 开始或继续滚动动画
    if (!scrollParams.isAnimating) {
        scrollParams.isAnimating = true;
        applyDampingAndScroll();
    }
}

// 监听滚动事件
window.addEventListener('wheel', handleScroll);

// 停止滚动动画的事件
['mouseup', 'touchend'].forEach(eventType =>
    window.addEventListener(eventType, () => {
        scrollParams.isAnimating = false;
    })
);