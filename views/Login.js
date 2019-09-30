import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHook";
import mediaAPI from "../hooks/ApiHooks";

const validate = require("validate.js");

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body
} from "native-base";

const Login = props => {
  const { signInAsync, registerAsync, checkUser } = mediaAPI();
  const {
    handleUsernameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
    inputs,
    handleEmailChange,
    handleFullnameChange,
    handleFormChange
  } = useSignUpForm();

  const regValidation = (inputs, props) => {
    const constraints = {
      email: {
        presence: {
          message: "^Please enter an Email address",
        },
        email: {
          message: "^Please enter a valid email address",
        },
      },
      password: {
        presence: {
          message: "^You must enter a password!",
        },
        length: {
          minimum: 5,
          message: "^Password must be atleast 5 characters",
        },
      },
      confirmPassword: {
        equality: "password"
      },
      username: {
        presence: {
          message: "^You must enter an username",
        },
        length: {
          minimum: 3,
          maximum: 20,
          message: "^Please enter a valid username",
        },
      },
    };

    const emailError = validate({ email: inputs.email }, constraints);
    const passwordError = validate({ password: inputs.password }, constraints);
    const confirmPasswordError = validate(
      { password: inputs.password, confirmPassword: inputs.confirmPassword },
      constraints
    );
    const usernameError = validate(
      { username: inputs.username },
      constraints
    );
    //console.log("ERRORS LOG:",emailError,passwordError,confirmPasswordError,usernameError)
    //console.log("2ND ERRORS:",emailError.email,passwordError.password,confirmPasswordError.confirmPassword,usernameError.username)

    if (
      !emailError.email &&
      !passwordError.password &&
      !confirmPasswordError.confirmPassword &&
      !usernameError.username
    ) {
      registerAsync(inputs, props);
      console.log("Reg Done!");
    } else {
      const errorArray = [
        usernameError.username,
        passwordError.password,
        confirmPasswordError.confirmPassword,

        emailError.email,
      ];

      for (let i = 0; i < errorArray.length; i++) {
        //console.log("Array item:", errorArray[i][0]);
        if (errorArray[i]) {
          console.log("alert:",errorArray[i][0])
          alert(errorArray[i][0]);
        }
      }
    }
  };

  const LoginForm = () => {
    const {
      handleUsernameChange,
      handlePasswordChange,
      inputs,
      handleEmailChange,
      handleFullnameChange
    } = useSignUpForm();
    return (
      <Content>
        <Form>
          <Body>
            <Text>Login</Text>
          </Body>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="username"
              onChangeText={handleUsernameChange}
              value={inputs.username}
              required
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              value={inputs.password}
              required
            />
          </Item>
          <Button
            title="Sign in!"
            onPress={() => {
              signInAsync(inputs, props);
            }}
          />
          <Button
            title="Sign up instead!"
            onPress={() => handleFormChange(<RegisterForm />)}
          />
        </Form>
      </Content>
    );
  };

  const RegisterForm = () => {
    const {
      handleUsernameChange,
      handlePasswordChange,
      inputs,
      handleEmailChange,
      handleFullnameChange,
      handlePasswordConfirmChange
    } = useSignUpForm();

    return (
      <Content>
        <Form>
          <Body>
            <Text>Register!</Text>
          </Body>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="username"
              onChangeText={handleUsernameChange}
              value={inputs.username}
              required
              onEndEditing={evt => {
                const uname = evt.nativeEvent.text;
                console.log("Uname in input", uname);
                checkUser(uname);
              }}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              value={inputs.password}
              required
              onEndEditing={evt => {
                const pwd = evt.nativeEvent.text;
              }}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="confirm password"
              secureTextEntry={true}
              onChangeText={handlePasswordConfirmChange}
              value={inputs.confirmPassword}
              required
              onEndEditing={evt => {
                const validPwd = evt.nativeEvent.text;
              }}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="email"
              onChangeText={handleEmailChange}
              value={inputs.email}
              required
              onEndEditing={evt => {
                const validEmail = evt.nativeEvent.text;
              }}
            />
          </Item>
          <Item>
            <FormTextInput
              autoCapitalize="none"
              placeholder="fullname (not required)"
              onChangeText={handleFullnameChange}
              value={inputs.fullname}
            />
          </Item>
          <Button
            title="Register!"
            onPress={() => {
              regValidation(inputs, props);
            }}
          />
          <Button
            title="Login Instead!"
            onPress={() => handleFormChange(<LoginForm />)}
          />
        </Form>
      </Content>
    );
  };

  useEffect(() => {
    handleFormChange(<LoginForm />);
  }, []);

  return <Container>{inputs.form}</Container>;
};

export default Login;
