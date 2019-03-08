import usersSaga from './cases/saga';

export default function* rootSaga() {

  yield usersSaga();

}
