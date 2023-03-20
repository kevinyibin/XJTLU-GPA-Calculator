// 获取按钮元素
const surpriseBtn = document.getElementById("surpriseBtn")

// 记录用户双击次数
let clicks = 0

// 双击事件处理函数
const onDoubleClick = () => {
  clicks++
  console.log(clicks)

  // 如果双击次数达到3次，则显示按钮
  if (clicks === 3) {
    surpriseBtn.classList.remove("hidden")
  }
}

// 单击事件处理函数
const onClick = () => {
  // 如果按钮已经显示，则触发惊喜
  if (!surpriseBtn.classList.contains("hidden")) {
    alert("恭喜您，发现了一个彩蛋！\nCongratulations, you found a surprise!")
    location.reload()
  }
}

// 给页面添加事件监听器
document.addEventListener("dblclick", onDoubleClick)
surpriseBtn.addEventListener("click", onClick)

// 鼠标悬停彩蛋
var myElement = document.getElementById("my-element")
var timeout

myElement.addEventListener("mouseover", function () {
  timeout = setTimeout(function () {
    alert("恭喜您，发现了一个彩蛋！\nCongratulations, you found a surprise!")
    location.reload()
  }, 5000)
})

myElement.addEventListener("mouseout", function () {
  clearTimeout(timeout)
})
