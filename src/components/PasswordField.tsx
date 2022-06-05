import {useState} from 'react';
import {IconButton, InputAdornment, TextField, TextFieldProps} from '@mui/material';
import ToggleIcon from './ToggleIcon';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {defaultOptions, passwordStrength} from 'check-password-strength';
import {omit} from 'lodash-es';

type Props = {
    verifyPassword?: boolean;
    value: any;
} & TextFieldProps;

PasswordField.defaultProps = {
    verifyPassword: false,
};

export default function PasswordField(props: Props) {
    const textFieldProps = omit(props, ['verifyPassword']);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    function checkPassword(input: string): string | undefined {
        if (input == null) {
            return 'Password is invalid';
        }
        if (input.length === 0) {
            return undefined;
        }
        if (input.length < 8) {
            return 'Password is too short';
        }
        if (input.length > 20) {
            return 'Password is too long';
        }
        return undefined;
    }

    function getPasswordStrength(input: string): string {
        if (input == null) {
            return '';
        }
        return input.length !== 0
            ? passwordStrength(input, [...defaultOptions, {
                id: 0,
                value: 'Very weak',
                minDiversity: 0,
                minLength: 0
            }]).value
            : '';
    }

    return (
        <>
            <TextField
                {...textFieldProps}
                required={true}
                type={showPassword ? 'text' : 'password'}
                error={props.verifyPassword && (checkPassword(textFieldProps.value) !== undefined)}
                helperText={props.verifyPassword && (checkPassword(textFieldProps.value) || getPasswordStrength(textFieldProps.value))}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={'end'}>
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <ToggleIcon
                                    on={showPassword}
                                    onIcon={<Visibility/>}
                                    offIcon={<VisibilityOff/>}
                                />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </>
    );
}
