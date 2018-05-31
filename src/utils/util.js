function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function convertToStarsArray (stars) {
  var num = stars.toString().substring(0, 1)
  var array = []
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}// 3=>[1,1,1,0,0]

export function convertToCastString (casts) {  // 演员名字用斜杠拼接
  var castsjoin = ''
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + ' / '
  }
  return castsjoin.substring(0, castsjoin.length - 2)
}

export function convertToCastInfos (casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : '',
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}
