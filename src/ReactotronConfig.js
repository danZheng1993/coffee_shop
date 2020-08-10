import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron.configure({
  name: 'coffee_shop',
})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

export default reactotron;
