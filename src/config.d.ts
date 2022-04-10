import 'react-redux';
import {RootState} from './state/store';

declare module 'react-redux' {
    interface DefaultRootState extends RootState {
    }
}
