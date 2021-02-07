import React, { useState } from 'react';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';
import { actionCreator } from '../store';

function Home({ toDos, addToDo }) {
    // props : react-router로부터 받은 props, redux로부터 받은 props
    const [text, setText] = useState("");
    function onChange(e) {
        setText(e.target.value);
    };
    function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText("");
    };

    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>{toDos.map(toDo => <ToDo {...toDo} key={toDo.id} />)}</ul>
        </>
    );
}

// redux store로부터 home에 props로써 전달한다.
function mapStateToProps(state) {
    // state: redux로부터 온 state
    // ownProps : component의 props
    // mapStateToProps()를 사용한다는 것은 네가 무엇인가를 redux store로부터 가져와서 component의 props에 넣는걸 의미
    return { toDos: state };
}

function mapDispatchToProps(dispatch) {
    return {
        addToDo: (text) => dispatch(actionCreator.addToDo(text))
    };
}

// connect()는 components를 store에 연결시켜 준다.
// getCurrentState()를 사용해서 store로부터 state를 가져다 준다. Home 에다가.
// connect()는 Home으로 보내는 props에 추가될 수 있도록 허용해 준다.
// 두 번째 인자로 dispatch를 위한 함수를 전달
export default connect(mapStateToProps, mapDispatchToProps)(Home);