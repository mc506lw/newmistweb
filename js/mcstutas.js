async function fetchServerStatus() {
    try {
        const response = await fetch('https://list.mczfw.cn/api/mc.mistmc.top');
        if (!response.ok) {
            throw new Error(`网络请求失败，状态码: ${response.status}`);
        }
        const data = await response.json();
        updateCard(data);
    } catch (error) {
        console.error('获取服务器状态时发生错误:', error.message);
        updateCard({ p: 0, mp: 0 });
    }
}

function updateCard(data) {
    const statusIndicator = document.getElementById('statusIndicator');
    const playersElement = document.getElementById('playerCount').querySelector('span');
    const pingElement = document.getElementById('ping').querySelector('span');

    // 根据在线玩家数量来设定在线或离线状态
    if (data.mp > 0) {
        // 如果有玩家在线，显示绿色圆点
        statusIndicator.className = 'status-indicator online';
    } else {
        // 否则，显示红色圆点表示离线
        statusIndicator.className = 'status-indicator offline';
    }

    playersElement.textContent = `👨‍💻x${data.p}`;
    // 更新延迟
    pingElement.textContent = `📶${data.ping}ms`;
}

fetchServerStatus();