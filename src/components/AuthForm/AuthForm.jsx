import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { registerThunk } from './../../redux/users-thunk';

const initialArg = {
  name: '',
  email: '',
  password: '',
};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'name':
      return { ...state, name: payload };
    case 'email':
      return { ...state, email: payload };
    case 'password':
      return { ...state, password: payload };
    case 'reset':
      return initialArg;
    default:
      return state;
  }
}
export const AuthForm = () => {
  const dispatch = useDispatch();
  const [state, dispatchChange] = useReducer(reducer, initialArg);

  const handleChange = e => {
    const { name, value } = e.target;
    dispatchChange({ type: name, payload: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerThunk(state));
    dispatchChange({ type: 'reset' });
  };

  const { name, email, password } = state;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={name}
          type="text"
          placeholder="Enter name"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
