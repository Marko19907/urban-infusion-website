import styled from '@emotion/styled';
import {NavLink, NavLinkProps} from 'react-router-dom';

const UnstyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: inherit;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: inherit;
  }
`;

export default (props: NavLinkProps) => <UnstyledLink {...props} />;
