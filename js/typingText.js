// 获取要应用打字效果的元素
var typingText = document.getElementById('typingText');
// 预设的句子数组，可以根据需要添加更多句子
var sentences = ["你想要的一切都在岚域", "探索无限可能", "欢迎来到岚域"];
// 当前显示的句子索引
var currentSentenceIndex = 0;
// 当前句子的字符索引
var charIndex = 0;

// 打字效果函数
function type() {
    // 清除当前文本内容，模拟删除效果
    typingText.textContent = sentences[currentSentenceIndex].substring(0, charIndex);
    // 如果没有到达当前句子的末尾，则继续添加字符
    if (charIndex < sentences[currentSentenceIndex].length) {
        setTimeout(type, 100); // 调整数字可以改变打字速度
        charIndex++;
    } else { // 到达末尾后，等待一段时间开始删除
        setTimeout(erase, 3000); // 在句子完全显示后等待2秒开始删除
    }
}

// 删除效果函数
function erase() {
    // 清除当前文本内容，模拟删除效果，但确保至少保留一个空格
    typingText.textContent = sentences[currentSentenceIndex].substring(0, charIndex) || ' ';
    // 如果字符索引不为0，则继续删除字符
    if (charIndex > 0) {
        setTimeout(erase, 50); // 调整数字可以改变删除速度
        charIndex--;
    } else { // 完全删除后，切换到下一句（如果有的话）
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length; // 循环到下一个句子
        setTimeout(type, 1000); // 等待一段时间后开始打下一句
    }
}

// 启动打字效果
type();