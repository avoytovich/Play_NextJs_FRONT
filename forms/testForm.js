import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form } from 'formik';
import { withRouter } from 'next/router';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { setData } from '../actions/updateData';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit(values, { setErrors, props }) {
    console.log(values);
    props.setData(values, 'testExample');
    setErrors({
      first: 'Тест',
    });
    props.router.push('/');
  },
})
export default class TestForm extends React.Component {
  handleClick = () => {
    console.log('handleClick');
    this.props.router.push('/');
  };

  render() {
    const { handleChange, errors } = this.props;
    return (
      <Form>
        <TextField
          label={errors.first || 'None'}
          name="first"
          error={!!errors.first}
          id="margin-none"
          onChange={handleChange}
          helperText="Some important text"
        />
        <TextField
          label="None"
          name="second"
          id="margin-none"
          error={!!errors.second}
          onChange={handleChange}
          helperText="Some important text"
        />
        <Button type="submit">SUBMIT</Button>
      </Form>
    );
  }
}
