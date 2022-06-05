import Page from '../../../components/Wrappers/Page';
import OrdersList from '../../../components/Pages/Account/OrdersList';
import React from 'react';
import useOrders from '../../../hooks/orders/useOrders';
import {OrderStatusUpdateDto} from '../../../api/urbaninfusion/dto/order-dto';
import {useUpdateOrderStatus} from '../../../hooks/orders/useUpdateOrderStatus';

export default function ManageOrders() {
    const {isLoading: isLoadingOrders, data: orders} = useOrders();

    const updateOrderStatusMutation = useUpdateOrderStatus();

    const onOrderStatusChange = (newOrder: OrderStatusUpdateDto) => {
        updateOrderStatusMutation.mutate(newOrder);
    };

    return (
        <>
            <Page isLoading={isLoadingOrders}>
                <OrdersList
                    admin
                    orders={orders}
                    onChangeStatus={onOrderStatusChange}
                />
            </Page>
        </>
    );
}
