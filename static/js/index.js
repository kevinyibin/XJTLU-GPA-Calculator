
// 遍历dom
function ergodic () {
  let arr = []
  const tbody = document.getElementsByTagName("tbody")
  for (let tbodyIndex = 0; tbodyIndex < tbody.length; tbodyIndex++) {
    const tr = tbody[tbodyIndex].getElementsByTagName("tr")
    if (tr.length == 0) {
      const viewBtn = document.querySelector(".view-modal"),
        popup = document.querySelector(".popup")
      popup.classList.toggle("show")
      windowFun()
    }
    for (let i = 0; i < tr.length; i++) {
      if (tr[i].getElementsByTagName("td").length === 0) {
        continue
      }
      arr.push({
        credit: parseFloat(tr[i].getElementsByTagName("td")[3].innerHTML),
        mark: parseInt(tr[i].getElementsByTagName("td")[4].innerHTML.split("%")[0])
      })
      if (tbodyIndex == 0) {
        yearFourArr.push({
          credit: parseFloat(tr[i].getElementsByTagName("td")[3].innerHTML),
          mark: parseInt(tr[i].getElementsByTagName("td")[4].innerHTML.split("%")[0])
        })
      }
      if (tbodyIndex == 1) {
        yearThreeArr.push({
          credit: parseFloat(tr[i].getElementsByTagName("td")[3].innerHTML),
          mark: parseInt(tr[i].getElementsByTagName("td")[4].innerHTML.split("%")[0])
        })
      }
    }
  }
  resultArr = arr
}

// GPA 转换
function transform (num) {
  let mark = resultArr[num].mark
  if (mark >= 70) gpa = 4.0
  if (mark >= 65 && mark <= 69.99) gpa = 3.6
  if (mark >= 60 && mark <= 64.99) gpa = 3.3
  if (mark >= 55 && mark <= 59.99) gpa = 3.0
  if (mark >= 50 && mark <= 54.99) gpa = 2.6
  if (mark >= 45 && mark <= 49.99) gpa = 2.3
  if (mark >= 43 && mark <= 44.99) gpa = 2.0
  if (mark >= 40 && mark <= 42.99) gpa = 1.0
  if (mark >= 0 && mark <= 39.99) gpa = 0.0
  return gpa
}

function getGPA () {
  const result_dom = document.getElementsByClassName("gpa")[0]
  let finalGPA = 0
  let num1 = 0, num2 = 0
  for (let i = 0; i < resultArr.length; i++) {
    num1 += resultArr[i].credit * transform(i)
    num2 += resultArr[i].credit
  }
  finalGPA = num1 / num2
  console.log(finalGPA)
  if (Number.isNaN(finalGPA)) {
    document.getElementById("gpa").style.display = "none"
  } else {
    result_dom.innerHTML = "您的GPA为：" + finalGPA.toFixed(2)
  }
  document.getElementById("gpa").style.display = "block"
  document.getElementById("avg").style.display = "none"
}


// 富文本粘贴
let index = 0
let resultArr = []

let yearFourArr = []
let yearThreeArr = []

function checkKey (div, e) {
  document.getElementsByTagName('div')[0].innerHTML = '<center>' + document.getElementsByTagName('div')[0].innerHTML + '</center>'
  ergodic()
}



function getAvgFromResultArr (arr) {
  let average = 0
  let num1 = 0, num2 = 0
  for (let i = 0; i < arr.length; i++) {
    num1 += arr[i].credit * arr[i].mark
    num2 += arr[i].credit
  }
  average = num1 / num2
  return average
}

// 学位均分
function getDegreeAvg () {
  if (resultArr.length === 0) return
  const result_dom = document.getElementsByClassName("result")[0]
  let yearFourAvg = getAvgFromResultArr(yearFourArr)
  let yearThreeAvg = getAvgFromResultArr(yearThreeArr)
  let average = yearThreeAvg * 0.3 + yearFourAvg * 0.7
  result_dom.innerHTML = `您的学位平均分为: ${average.toFixed(2)} 分`
  document.getElementById("avg1").style.display = "block"
  document.getElementById("gpa").style.display = "none"
  if (isNaN(average)) {
    alert("错误：未检测到大三与大四两年的成绩！")
    location.reload()
  }
  console.log(average)
  if (average > 70) {
    document.getElementById("firework-button").click()
    document.getElementById("text").style.display = "flex"
  }
  return average
}

// 普通均分
function getResult () {
  if (resultArr.length === 0) return
  const result_dom = document.getElementsByClassName("result-wrapper")[0]
  let average = 0
  let num1 = 0, num2 = 0
  for (let i = 0; i < resultArr.length; i++) {
    num1 += resultArr[i].credit * resultArr[i].mark
    num2 += resultArr[i].credit
  }
  average = num1 / num2
  result_dom.innerHTML = `您的平均分为: ${average.toFixed(2)} 分`
  document.getElementById("avg").style.display = "block"
  document.getElementById("gpa").style.display = "none"
  console.log(average)

  if (average > 70) {
    document.getElementById("firework-button").click()
    document.getElementById("text").style.display = "flex"
  }
  return average
}


