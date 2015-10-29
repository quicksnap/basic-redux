import 'babel/polyfill';
import React, { Component, PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

////////////////////////////////////////
/// Main Component
///
/// At this point in the app, you would not directly have access to
/// `store`. We use @connect to link up `store` to components that need
/// application state.
///
/// @connect has shortcuts for frequent patterns:
///
/// @connect(state => ({ count: state.count }))
///   -- This will automatcialluy bind `dispatch` to props
///
/// @connect(
///   state => (...),
///   { actionCreator1, actionCreator2 }
/// )
///   -  This form will pass actionCreators through to `bindActionCreators`,
///      which creats a function of the same name that calls dispatch with
///      the result of your action creator:
///
///        this.props.actionCreator1() === dispatch( actionCreator1() )
///
///////////////////////////////////////
@connect(
  // mapStateToProps
  (state) => {
    return { count: state.count };
  },
  // mapDispatchToProps - As mentioned, this could be omitted and dispatch is
  //                      passed anyway.
  (dispatch) => {
    return { dispatch: dispatch };
  }
)
class Main extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    count: PropTypes.number
  }

  increment() {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  render() {
    return (
      <div>
        <div>
          Welcome! The count is currently {this.props.count}.
        </div>

        <button onClick={::this.increment}>
          Well, increment!
        </button>
      </div>
    );
  }
}

///////////////////////////////////////
/// Reducer and Store
///
///////////////////////////////////////
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='H'
               changePositionKey='Q'
               defaultIsVisible={true}>
    <LogMonitor />
  </DockMonitor>
);

// We enhance `createStore` with DevTools. You can disable this and simply use
// `createStore` instead of `finalCreateStore`
const finalCreateStore = DevTools.instrument()(createStore);
const store = finalCreateStore(reducer);

///////////////////////////////////////
/// Finally, we mount!
///
///////////////////////////////////////

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Main />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('content')
);
