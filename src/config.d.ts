import 'react-redux';
// TODO Girts - perhaps decide whether you want to use " or '?
import {RootState} from "./state/store";

declare module 'react-redux' {
    // TODO Girts - why an interface which does not do anything specific?
    interface DefaultRootState extends RootState {
    }
}
