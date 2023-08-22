// ** Reducers Imports
import FundersList from '../views/pages/allfunders/store/index'
import Auth from './authentication'

const rootReducer = {
  FundersList,
  auth: Auth
}

export default rootReducer
