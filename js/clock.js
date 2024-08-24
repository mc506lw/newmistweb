function updateClock() {
    // 获取当前时间
    const now = new Date();
    
    // 获取月份、日期、星期、小时、分钟
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以需要+1
    const day = String(now.getDate()).padStart(2, '0');
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // 更新div的内容
    document.getElementById('clock').innerText = `${year}年${month}月${day}日 ${weekDay} ${hours}:${minutes}`;
}

// 立即更新一次时间
updateClock();

// 每秒更新一次时间
setInterval(updateClock, 1000);