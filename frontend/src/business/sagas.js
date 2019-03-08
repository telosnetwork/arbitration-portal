import claimsSaga from './cases/saga';
import casesSaga from './cases/saga';
import arbitrators from './arbitrators/saga';

export default function* rootSaga() {

  yield claimsSaga();
  yield casesSaga();
  yield arbitrators();

}
