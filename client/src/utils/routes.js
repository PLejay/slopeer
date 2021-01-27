import { routePicturesUrl } from '../config'



const gradeColors = {
  1: ['#EAE2B7', 'black'],
  2: ['#EAE2B7', 'black'],
  3: ['#EAE2B7', 'black'],
  '4a': ['#EAE2B7', 'black'],
  '4b': ['#EAE2B7', 'black'],
  '4c': ['#EAE2B7', 'black'],
  '5a': ['#FCBF49', 'black'],
  '5b': ['#FCBF49', 'black'],
  '5c': ['#FCBF49', 'black'],
  '6a': ['#F77F00', 'white'],
  '6a+': ['#F77F00', 'white'],
  '6b': ['#F77F00', 'white'],
  '6b+': ['#F77F00', 'white'],
  '6c': ['#F77F00', 'white'],
  '6c+': ['#F77F00', 'white'],
  '7a': ['#D62828', 'white'],
  '7a+': ['#D62828', 'white'],
  '7b': ['#D62828', 'white'],
  '7b+': ['#D62828', 'white'],
  '7c': ['#D62828', 'white'],
  '7c+': ['#D62828', 'white'],
  '8a': ['#003049', 'white'],
  '8a+': ['#003049', 'white'],
  '8b': ['#003049', 'white'],
  '8b+': ['#003049', 'white'],
  '8c': ['#003049', 'white'],
  '8c+': ['#003049', 'white'],
  '9a': ['black', 'white'],
  '9a+': ['black', 'white'],
  '9b': ['black', 'white'],
  '9b+': ['black', 'white'],
  '9c': ['black', 'white'],
  '9c+': ['black', 'white']
}

const grades = [
  '1',
  '2',
  '3',
  '4a',
  '4b',
  '4c',
  '5a',
  '5b',
  '5c',
  '6a',
  '6a+',
  '6b',
  '6b+',
  '6c',
  '6c+',
  '7a',
  '7a+',
  '7b',
  '7b+',
  '7c',
  '7c+',
  '8a',
  '8a+',
  '8b',
  '8b+',
  '8c',
  '8c+',
  '9a',
  '9a+',
  '9b',
  '9b+',
  '9c',
  '9c+'
]

const gradeBckgColor = grade => gradeColors[grade][0]
const gradeColor = grade => gradeColors[grade][1]

const selectPlaceholder = (type) => {
  switch (type) {
    case 'boulder':
      return '/assets/images/boulder.png'
    case 'psicobloc':
      return '/assets/images/psicobloc.png'
    default:
      return '/assets/images/sport.png'
  }
}

const routePicture = (picture, type) => picture ? routePicturesUrl + picture : selectPlaceholder(type)

export { gradeBckgColor, gradeColor, routePicture, grades, selectPlaceholder }
