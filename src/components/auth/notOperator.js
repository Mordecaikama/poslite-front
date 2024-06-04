import { useContext } from 'react'
import { Context } from '../../context'

function NotOperator({ Component }) {
  const { opTyp } = useContext(Context)

  return opTyp?.permission !== 'operator' && <Component />
}

export default NotOperator
