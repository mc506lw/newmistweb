document.addEventListener('DOMContentLoaded', function() {
    var closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 阻止事件冒泡，如果有需要的话
        this.parentElement.parentElement.style.display = 'none'; // 点击时隐藏按钮父元素的父元素
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cmdContainer = document.querySelector('.cmd-container');
    const bottomInput = cmdContainer.querySelector('.cmd-input');
    const bottomCursor = cmdContainer.querySelector('.cmd-cursor');

    // 初始聚焦到底部输入框
    bottomInput.focus();

    // 初始键盘输入处理
    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
        if (isServerStarting) {
            // 服务器正在启动，忽略所有按键事件
            e.preventDefault();
            return;
        }

        const isPrintableCharacter = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
        if (e.key === 'Backspace') {
            // 退格键
            backspace();
        } else if (e.key === 'Enter') {
            // 回车键
            enter();
        } else if (isPrintableCharacter) {
            // 可打印字符
            printCharacter(e.key);
        }
    }

    function printCharacter(character) {
        bottomInput.textContent += character;
    }

    function backspace() {
        if (bottomInput.textContent.length > 0) {
            bottomInput.textContent = bottomInput.textContent.slice(0, -1);
        }
    }

    function enter() {
        const inputText = bottomInput.textContent.trim();
        if (inputText) {
            handleCommand(inputText);
        }
        bottomInput.textContent = '';
    }

    function scrollToBottom() {
        cmdContainer.scrollTop = cmdContainer.scrollHeight;
    }
    function handleCommand(inputText) {
        console.log('Command input:', inputText);

        // 新增命令处理逻辑
        let outputLines; // 用来存储新增的输出行（可能有多行，如help信息）
        switch (inputText.toLowerCase().trim()) {
            case 'help':
                outputLines = displayHelp(); // 修改为接收返回的行集合
                break;
            case 'version':
                outputLines = [createOutputLine('version: MistMC v2.2', 'cmd-output-help')];
                break;
            default:
                outputLines = [createOutputLine(`未知命令: ${inputText}`, 'cmd-output-error')];
                break;
        }

        // 在底部输入框之前添加用户输入的新命令行
        const newCmdLine = document.createElement('div');
        newCmdLine.className = 'cmd-line';

        const prompt = document.createElement('span');
        prompt.className = 'cmd-prompt';
        prompt.textContent = '(Mist server) C:\\Mist\\MistMC> ';
        newCmdLine.appendChild(prompt);

        const commandText = document.createElement('span');
        commandText.textContent = inputText;
        newCmdLine.appendChild(commandText);

        cmdContainer.insertBefore(newCmdLine, bottomInput.parentNode);

        // 将帮助信息或错误信息行插入到新命令行之后
        if (outputLines && outputLines.length > 0) {
            outputLines.forEach(line => {
                cmdContainer.insertBefore(line, bottomInput.parentNode);
            });
        }
        scrollToBottom(); // 添加这一行来自动滚动到底部
    }
    
    // 新增帮助信息显示函数，现在它返回一个包含帮助信息的元素数组
    function displayHelp() {
        const helpLines = [
            "可用命令：",
            "- help: 显示此帮助信息",
            "- version: 显示服务器版本信息",
        ].map(line => createOutputLine(line, 'cmd-output-help'));

        return helpLines; // 直接返回所有帮助信息行
    }

    // 辅助函数，用于创建带有特定类名的输出行元素，保持不变
    function createOutputLine(text, className) {
        const outputLine = document.createElement('div');
        outputLine.className = className;
        outputLine.textContent = text;
        return outputLine;
    }

    // 处理未知命令的函数
    function unknownCommand(command) {
        const outputLine = document.createElement('div');
        outputLine.className = 'cmd-output-error';
        outputLine.textContent = `未知命令: ${command}`;
        cmdContainer.insertBefore(outputLine, bottomInput.parentNode);
    }
    let isServerStarting = false; // 服务器启动状态标志

    // 创建Intersection Observer来观察cmdContainer
    const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isServerStarting) {
            // 如果cmdContainer可见并且服务器尚未启动，开始服务器启动模拟
            simulateServerStart();
            observer.unobserve(cmdContainer); // 停止观察
        }
    }, {
        root: null, // 相对于视口进行观察
        rootMargin: '0px',
        threshold: 0.1 // 至少10%的cmdContainer可见时触发
    });

    // 开始观察cmdContainer
    observer.observe(cmdContainer);

    function simulateServerStart() {
        isServerStarting = true; // 开始服务器启动过程

        const serverOutput = [
            "(Mist 服务器) 正在启动 MistMC...",
            "加载运行库中, 请等待...",
            "准备加载插件...",
            "已加载插件: 73/73",
            "使用时间: 321 ms",
            "已加载MistAPI...",
            "使用时间: 303 ms",
            "已加载玩家数据...",
            "使用时间: 127 ms",
            "启动完成 (0.873s)!使用'help'已获取帮助信息",
            ""
        ];

        serverOutput.forEach((line, index) => {
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.className = 'cmd-output';
                outputLine.textContent = line;
                cmdContainer.insertBefore(outputLine, bottomInput.parentNode);
            }, index * 100); // 3秒的延迟
        });

        // 服务器启动完成后，重新启用输入框
        setTimeout(() => {
            isServerStarting = false; // 结束服务器启动过程
            bottomInput.disabled = false; // 重新启用输入框
        }, serverOutput.length * 100);
    }
});
