import { EuiButton, EuiButtonEmpty, EuiFieldPassword, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiModal, EuiModalBody, EuiModalFooter, EuiModalHeader, EuiModalHeaderTitle, EuiPanel, EuiSpacer, EuiText } from "@elastic/eui";
import React from "react";
import { FunctionComponent, useState } from "react";

const LoginModal: FunctionComponent=()=>{
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
        setConfirmPassword(e.target.value);}
        
    return(
        <EuiFlexGroup direction="column" alignItems="center">
                    <><EuiPanel>
                     <EuiFlexItem>
                      <EuiButton fill color="success" size="s" onClick={openModalL}>
                        <strong>Login</strong>
                      </EuiButton>
                      <EuiSpacer size="m" />
                      <EuiButton fill color="danger" size="s" onClick={openModalR}>
                        <strong>Sign Up</strong>
                      </EuiButton>
                    </EuiFlexItem>
            </EuiPanel>
            <EuiFlexItem>
            {isModalOpenL && (<EuiFlexItem>
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
                            aria-label="Use aria labels when no actual label is in use" />
                        <EuiSpacer size="s" />
                        <EuiFieldPassword
                            placeholder="Password"
                            type="dual"
                            name="passwordLogin"
                            value={formValues.passwordLogin}
                            onChange={onChange} />
                    </EuiModalBody>
                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={closeModalL}>Cancel</EuiButtonEmpty>
                        <EuiButton fill onClick={closeModalL}>
                            Save
                        </EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            </EuiFlexItem>)}
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
                                aria-label="Use aria labels when no actual label is in use" />
                            <EuiSpacer size="s" />
                            <EuiFieldText
                                placeholder="Last Name"
                                name="lastName"
                                value={formValues.lastName}
                                onChange={onChange}
                                aria-label="Use aria labels when no actual label is in use" />
                            <EuiSpacer size="s" />
                            <EuiFieldText
                                placeholder="Email"
                                name="email"
                                value={formValues.email}
                                onChange={onChange}
                                aria-label="Use aria labels when no actual label is in use" />
                            <EuiSpacer size="s" />
                            <EuiFieldText
                                placeholder="Username"
                                name="username"
                                value={formValues.username}
                                onChange={onChange}
                                aria-label="Use aria labels when no actual label is in use" />
                            <EuiSpacer size="s" />
                            <EuiFieldPassword
                                placeholder="Password"
                                type="dual"
                                name="password"
                                value={formValues.password}
                                onChange={onChange} />
                            <EuiSpacer size="s" />
                            <EuiFieldPassword
                                placeholder="Confirm Password"
                                type="dual"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword}
                                isInvalid={confirmPassword !== formValues.password} />
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
        </EuiFlexItem></>
        </EuiFlexGroup>
    );
};

export default LoginModal