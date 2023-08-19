// ** Reducers Imports
import Auth from './authentication'
import contractData from './commonStore'

const rootReducer = {
  auth: Auth,
  contractData: contractData

}

export default rootReducer
