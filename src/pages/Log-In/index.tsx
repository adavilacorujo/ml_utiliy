import React, { ReactElement, useState } from 'react';
import {
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiButton,
  EuiSpacer,
  EuiIcon,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiFieldText,
  EuiFieldPassword,
} from '@elastic/eui';
export default function MyComponent({
  panelled,
  offset,
  grow,
  restrictWidth,
  bottomBorder,
}: {
  panelled?: EuiPageTemplateProps['panelled'];
  offset?: EuiPageTemplateProps['offset'];
  grow?: EuiPageTemplateProps['grow'];
  restrictWidth?: EuiPageTemplateProps['restrictWidth'];
  bottomBorder?: EuiPageTemplateProps['bottomBorder'];
}): ReactElement {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    emailLogin: '',
    passwordLogin: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const [isModalOpenL, setIsModalOpenL] = useState(false);
  const [isModalOpenR, setIsModalOpenR] = useState(false);
  const closeModalL = () => {
    setIsModalOpenL(false);
  };
  const openModalL = () => {
    setIsModalOpenL(true);
  };
  const closeModalR = () => {
    setIsModalOpenR(false);
  };
  const openModalR = () => {
    setIsModalOpenR(true);
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <EuiFlexGroup
        // justifyContent="center" 
        alignItems="center" 
        style={{ height: '200vh' }}
    >
      <EuiFlexItem>
        <EuiPageTemplate panelled={panelled} restrictWidth={restrictWidth} bottomBorder={bottomBorder} offset={offset} grow={grow}>
          <EuiPageTemplate.Section grow={true} color="subdued">
            <EuiFlexGroup direction="column" alignItems="center">
              <EuiFlexItem>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <EuiIcon
                    type="logoComp"
                    size="xl"
                    src="https://i.imgur.com/IrqFnsI.png"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <EuiIcon
                    type="logoComp"
                    size="xl"
                    src="https://i.imgur.com/IrqFnsI.png"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText textAlign="center">
                  <h1>Welcome to Perceptor</h1>
                  <strong>A cyber analytical threat hunting application</strong>
                  <EuiSpacer size="s" />
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiFlexGroup justifyContent="center">
                    <EuiFlexItem>
                      <EuiButton fill color="success" size="s" onClick={openModalL}>
                        <strong>Login</strong>
                      </EuiButton>
                      <EuiSpacer size="m" />
                      <EuiButton fill color="danger" size="s" onClick={openModalR}>
                        <strong>Sign Up</strong>
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiSpacer size="s" />
                <EuiButton iconType="questionInCircle">
                  <strong>Help desk</strong>
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageTemplate.Section>
        </EuiPageTemplate>
      </EuiFlexItem>
      {isModalOpenL && (
        <EuiFlexItem>
          <EuiModal onClose={closeModalL}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Login</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>Please Enter your Username and Password.</p>
              </EuiText>
              <EuiFieldText
                placeholder="Email"
                name="emailLogin"
                value={formValues.emailLogin}
                onChange={onChange}
                aria-label="Use aria labels when no actual label is in use"
              />
              <EuiSpacer size="s" />
              <EuiFieldPassword
                placeholder="Password"
                type="dual"
                name="passwordLogin"
                value={formValues.passwordLogin}
                onChange={onChange}
              />
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButtonEmpty onClick={closeModalL}>Cancel</EuiButtonEmpty>
              <EuiButton fill onClick={closeModalL}>
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiFlexItem>
      )}
      {isModalOpenR && (
        <EuiFlexItem>
          <EuiModal onClose={closeModalR}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Register</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>Please Enter your information when prompted.</p>
              </EuiText>
              <EuiFieldText
                placeholder="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={onChange}
                aria-label="Use aria labels when no actual label is in use"
              />
              <EuiSpacer size="s" />
              <EuiFieldText
                placeholder="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={onChange}
                aria-label="Use aria labels when no actual label is in use"
              />
              <EuiSpacer size="s" />
              <EuiFieldText
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={onChange}
                aria-label="Use aria labels when no actual label is in use"
              />
              <EuiSpacer size="s" />
              <EuiFieldText
                placeholder="Username"
                name="username"
                value={formValues.username}
                onChange={onChange}
                aria-label="Use aria labels when no actual label is in use"
              />
              <EuiSpacer size="s" />
              <EuiFieldPassword
                placeholder="Password"
                type="dual"
                name="password"
                value={formValues.password}
                onChange={onChange}
              />
              <EuiSpacer size="s" />
              <EuiFieldPassword
                placeholder="Confirm Password"
                type="dual"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                isInvalid={confirmPassword !== formValues.password}
              />
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButtonEmpty onClick={closeModalR}>Cancel</EuiButtonEmpty>
              <EuiButton fill onClick={closeModalR}>
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
}