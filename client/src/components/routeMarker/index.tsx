import { gradeColor, gradeBckgColor } from '../../utils/routes'

const RouteMarker = (grade:string) => {
  const el = document.createElement('button')
  el.innerHTML = grade
  el.style.backgroundColor = gradeBckgColor(grade)
  el.style.color = gradeColor(grade)
  return el
}

export default RouteMarker
