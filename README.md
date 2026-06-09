# 🎮 Pong Game

一个经典的 Pong 游戏实现，使用纯 HTML5、CSS3 和 JavaScript 开发。在这个游戏中，玩家需要与计算机 AI 对战，通过控制球拍来击球得分。

![GitHub last commit](https://img.shields.io/github/last-commit/7PHW/pong-game)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 在线游玩

**[点击这里立即开始游戏 >>](https://7phw.github.io/pong-game/)**

或者访问：https://7phw.github.io/pong-game/

## ✨ 游戏特性

### 核心功能
- 🎯 **对战模式**：与智能 AI 计算机对手竞技
- 🎨 **现代美观的界面**：渐变背景与流畅的动画效果
- 📊 **实时计分**：清晰显示玩家和计算机的得分
- ⚙️ **AI 智能算法**：计算机对手会追踪球的位置自动移动

### 游戏机制
- 🎪 **球的物理效应**：
  - 碰撞墙壁时反弹
  - 击中球拍时会产生"旋转"效果
  - 球速逐渐加快以增加难度
  
- 🕹️ **灵活的控制方式**：
  - **鼠标控制**：在游戏区域移动鼠标控制左侧球拍
  - **键盘控制**：
    - `↑` / `↓` 箭头键移动球拍
    - `W` / `S` 键快速移动球拍

- 🎮 **游戏控制**：
  - **Start/Pause** 按钮：开始游戏或暂停游戏
  - **Reset Score** 按钮：重置计分并重新开始

## 📋 游戏规则

1. 球从画面中央开始移动
2. 玩家控制左侧球拍，计算机控制右侧球拍
3. 当球穿过对手时，对方得 1 分
4. 第一个达到设定分数的玩家获胜（可持续游玩）
5. 点击 "Reset Score" 重置游戏状态

## 💻 技术栈

- **HTML5**：游戏结构和画布渲染
- **CSS3**：现代化界面设计和动画效果
- **JavaScript (Vanilla)**：游戏逻辑和物理引擎
- **Canvas API**：图形绘制和动画

## 📁 项目结构

```
pong-game/
├── index.html      # 主 HTML 文件，包含游戏画布和按钮
├── style.css       # 样式文件，包含布局和动画
├── script.js       # 游戏逻辑文件，包含游戏循环和碰撞检测
└── README.md       # 项目说明文档
```

## 🎮 快速开始

### 方式 1：在线游玩（推荐）
直接访问：https://7phw.github.io/pong-game/

### 方式 2：本地运行

1. **克隆仓库**
```bash
git clone https://github.com/7PHW/pong-game.git
cd pong-game
```

2. **打开游戏**
   - 方式 A：直接在浏览器中打开 `index.html` 文件
   - 方式 B：使用本地服务器（推荐）
   ```bash
   # 如果安装了 Python 3
   python -m http.server 8000
   
   # 如果安装了 Node.js
   npx http-server
   ```
   然后在浏览器中访问 `http://localhost:8000`

3. **开始游戏**
   - 点击 "Start Game" 按钮开始游戏
   - 使用鼠标或键盘控制球拍
   - 尽力击败计算机对手！

## 🎯 游戏攻略

- 🎪 **反弹技巧**：球击中球拍的不同位置会产生不同的旋转效果
- ⚡ **位置预判**：提前移动球拍到球将要到达的位置
- 🛡️ **防守策略**：保持球拍在画面中央可以提高防守效率
- 🎪 **连击得分**：尽量连续保持对战，积累更高的分数

## 🔧 自定义设置

您可以在 `script.js` 文件中修改以下参数来自定义游戏：

```javascript
// 游戏参数
const paddleWidth = 10;           // 球拍宽度
const paddleHeight = 80;          // 球拍高度
const ballSize = 8;               // 球的大小
const paddleSpeed = 6;            // 玩家球拍速度
const computerAISpeed = 5;        // 计算机球拍速度
```

## 📝 改进计划

- [ ] 添加难度等级选择（简单/中等/困难）
- [ ] 支持两人对战模式
- [ ] 添加音效和背景音乐
- [ ] 保存最高分记录
- [ ] 添加移动端适配
- [ ] 实现分数目标模式（先得到 X 分获胜）

## 💡 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证

## 👨‍💻 开发者

- [@7PHW](https://github.com/7PHW)

---

**祝你游戏愉快！** 🎮✨

如有任何问题或建议，欢迎提交 Issue！
