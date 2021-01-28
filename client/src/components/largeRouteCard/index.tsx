import { route } from 'preact-router'
import { h, FunctionComponent } from 'preact';
import { Picture } from '../'
import { gradeColor, gradeBckgColor } from '../../utils/routes'
import style from './style.css';

type LargeRouteCardProps = {
  data: {
    picture: string;
    name: string;
    grade: string;
    _id: string;
    type: string;
  }
}

const LargeRouteCard: FunctionComponent<LargeRouteCardProps> = ({ data: { picture, name, grade, _id, type } }) =>
  <div class={style.split} onClick={() => route(`route/${_id}`)}>
    <Picture
      profile={false}
      picture={picture}
      type={type}
      routename={name}
      pictureStyle={style.picture}
      imageStyle={style.image}
    />
    <div class={style.routeData}>
      <h2 class={style.routeName}>{name}</h2>
      <div class={style.details}>
        <h3 class={style.routeType}>{type[0].toUpperCase() + type.slice(1)}</h3>
        <h3
          class={style.routeGrade}
          style={{
            backgroundColor: gradeBckgColor(grade),
            color: gradeColor(grade)
          }}
        >
          {grade}</h3>
      </div>
    </div>
  </div>

export default LargeRouteCard
