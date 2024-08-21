document.addEventListener('DOMContentLoaded', () => {
    // 找到页面上的元素
    const recommendButton = document.querySelector('.recommend-button');
    const alcStatusTextElement = document.getElementById('alc-status-text');
    const progressBarElement = document.querySelector('.progress-bar');
    const progressTextElement = document.querySelector('.progress-text');
    const alcContentElement = document.getElementById('resultContent'); // 用于显示推荐结果的元素

    // 更新状态信息
    function updateStatus(text) {
        alcStatusTextElement.textContent = text;
    }

    // 控制进度条和状态文本模拟推荐过程
    function simulateProgressAndUpdateStatus(currentStep) {
        let statusText;
        switch (currentStep) {
            case 1:
                statusText = "正在获取您的位置...";
                break;
            case 2:
                statusText = "分析距离，为您推荐服务器...";
                break;
            case 3:
                statusText = "推荐完成，计算最佳线路...";
                break;
            case 4:
                statusText = "推荐结果已就绪";
                alcContentElement.style.display = 'block'; // 准备显示结果
                break;
            default:
                statusText = "";
                progressBarElement.style.width = '0%';
                progressTextElement.textContent = statusText;
                break;
        }

        progressTextElement.textContent = statusText;
        progressBarElement.style.width = `${currentStep * 25}%`; // 每个阶段25%

        if (currentStep < 4) {
            setTimeout(() => simulateProgressAndUpdateStatus(currentStep + 1), 1000);
        }
    }

    // 服务器位置数组
    const servers = [
        { name: "内蒙古", latitude: 40.8537, longitude: 111.2942, ip: "mc.mistmc.top" },
        { name: "北京", latitude: 39.9042, longitude: 116.4074, ip: "bj.mc.mistmc.top" },
        { name: "江苏南京", latitude: 32.0603, longitude: 118.7969, ip: "nf.mc.mistmc.top" }
    ];

    // Haversine公式计算两点间距离
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 地球半径，单位为公里
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }
    // 获取用户位置并推荐最近服务器
    function getUserLocationAndRecommend() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                let closestServer = null;
                let minDistance = Infinity;

                servers.forEach(server => {
                    const distance = calculateDistance(userLatitude, userLongitude, server.latitude, server.longitude);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestServer = server.name;
                        closestServerIp = server.ip;
                    }
                });

                const formattedDistance = Math.round(minDistance).toLocaleString();

                // 一次性更新推荐结果
                alcContentElement.innerHTML = `
                    <h3>收好结果</h3>
                    <p>最适合您玩的路线为 <strong>${closestServer}</strong> 线路</p>
                    <p>距离该服务器约 <strong>${formattedDistance} 公里</strong></p>
                    <p>服务器IP地址 <strong>${closestServerIp}</strong></p>
                `;
                updateStatus("位置信息已获取");
            }, error => {
                console.error("Error getting location:", error.message);
                updateStatus("无法获取位置信息，请手动选择服务器。");
            });
        } else {
            updateStatus("您的浏览器不支持地理位置服务。");
        }
    }

    // 绑定点击事件到推荐按钮
    recommendButton.addEventListener('click', () => {
        alcContentElement.style.display = 'none'; // 初始时隐藏结果内容
        updateStatus("分析数据中...");
        simulateProgressAndUpdateStatus(1);
        getUserLocationAndRecommend(); // 调用获取用户位置并推荐服务器的函数
    });
});