function calculatePolygonArea(arr) {
  let result1 = arr[arr.length-1][0]*arr[0][1] //xn*y1
  for (let i = 0; i < arr.length - 1; i++) {
      result1+=(arr[i][0]*arr[i+1][1])
  }
  let result2 = arr[arr.length-1][1]*arr[0][0] //yn*x1
  for (let i = 0; i < arr.length - 1; i++) {
      result2+=(arr[i][1]*arr[i+1][0])
  }
  return 0.5*Math.abs(result1 - result2)
}

function checkLocation(point,arr){
  const epsilon = 1e-6;
  let num1 = calculatePolygonArea([arr[0],arr[arr.length-1],point])
  for (let i = 0; i < arr.length - 1; i++) {
      num1+=(calculatePolygonArea([arr[i],arr[i+1],point]))
  }
  const num2 = calculatePolygonArea(arr)
  const difference = Math.abs(num1 - num2);
  if(difference < epsilon){
      return true
  }
  return false
}