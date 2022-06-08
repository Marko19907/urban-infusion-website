import {Avatar, AvatarProps} from '@mui/material';
import {omit} from 'lodash-es';
import {useEffect, useState} from 'react';
import {doesImageExist, stringToColor} from '../utils/utils';

type Props = {
    name?: string;
} & AvatarProps;

export function UserAvatar(props: Props) {
    const avatarProps = omit(props, 'name');
    const [hasImage, setHasImage] = useState<boolean>(false);

    useEffect(() => {
        void (async () => {
            if (props.src) {
                const imageExists = await doesImageExist(props.src);
                setHasImage(imageExists);
            }
        })();
    }, [props.src]);

    return (
        <>
            <Avatar
                style={{
                    backgroundColor: hasImage
                        ? 'transparent'
                        : stringToColor(props.name || '')
                }}
                {...avatarProps}
            >
                {props.name?.[0]}
            </Avatar>
        </>
    );
}
