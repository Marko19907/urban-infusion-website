import Page from '../../../components/Wrappers/Page';
import React, {ReactElement} from 'react';
import OrdersList from '../../../components/Pages/Account/OrdersList';
import useUserOrders from '../../../hooks/orders/useUserOrders';
import useMe from '../../../hooks/users/useMe';
import {RootState} from '../../../state/store';
import {connect} from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

function Orders(props: Props) {
    const {isLoading: isLoadingMe, data: user} = useMe(props.isAuthenticated);
    const {isLoading: isLoadingUserOrders, data: userOrders} = useUserOrders(user?.id);

    const isLoading = isLoadingMe || isLoadingUserOrders;

    return (
        <>
            <Page isLoading={isLoading}>
                <OrdersList orders={userOrders || []}/>
            </Page>
        </>
    );
}
