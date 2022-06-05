import Page from '../../../components/Wrappers/Page';
import React, {useEffect, useMemo, useState} from 'react';
import useProducts from '../../../hooks/products/useProducts';
import {useDeleteProduct} from '../../../hooks/products/useDeleteProduct';
import {useUpdateProduct} from '../../../hooks/products/useUpdateProduct';
import {useUpdateProductPicture} from '../../../hooks/products/useUpdateProductPicture';
import {
    Alert,
    Dialog,
    DialogTitle,
    Fab,
    Grid,
    InputAdornment,
    Snackbar,
    Stack,
    TextField,
    Tooltip
} from '@mui/material';
import EditableProductCard from '../../../components/Cards/product-card/EditableProductCard';
import {AddProductDto, ProductDto, UpdateProductPictureDto} from '../../../api/urbaninfusion/dto/product-dto';
import {useAddProduct} from '../../../hooks/products/useAddProduct';
import AddIcon from '@mui/icons-material/Add';
import CreatableProductCard from '../../../components/Cards/product-card/CreatableProductCard';
import useCategories from '../../../hooks/categories/useCategories';
import {getProductImageURL} from '../../../api/urbaninfusion/public/products';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function ManageProducts() {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const {isLoading: isLoadingProducts, data: products} = useProducts();
    const {isLoading: isLoadingCategories, data: categories} = useCategories();

    const isLoading = isLoadingProducts || isLoadingCategories;

    const addProductMutation = useAddProduct();
    const deleteProductMutation = useDeleteProduct();
    const updateProductMutation = useUpdateProduct();
    const updateProductPictureMutation = useUpdateProductPicture();

    const mutations = [
        addProductMutation,
        deleteProductMutation,
        updateProductMutation,
        updateProductPictureMutation
    ];

    const isError = mutations.filter(m => m.isError).length > 0;
    const isSuccess = mutations.filter(m => m.isSuccess).length > 0;
    const isMutating = mutations.filter(m => m.isLoading).length > 0;

    const filteredProducts = useMemo(() => {
        if (products) {
            return products.filter(e => e.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        }
        return [];
    }, [search, products]);

    useEffect(() => {
            if (isError) {
                const err: any = mutations.find((m: any) => m.error)?.error;
                const msg = err?.response?.data.error || err?.response?.data || 'Unknown error occured, please try again...';
                setErrorMessage(msg);
                setError(true);
            }
        }, [isError]
    );

    useEffect(() => {
            if (isSuccess) {
                if (updateProductMutation.isSuccess) {
                    setSuccessMessage('Successfully updated the product!');
                }
                if (deleteProductMutation.isSuccess) {
                    setSuccessMessage('Successfully deleted the product!');
                }
                if (updateProductPictureMutation.isSuccess) {
                    setSuccessMessage('Successfully updated the product image!');
                }
                if (addProductMutation.isSuccess) {
                    setSuccessMessage('Successfully added the product!');
                    setAddingProduct(false);
                }
                setSuccess(true);
            }
        }, [isSuccess]
    );

    const handleAddProduct = (data: AddProductDto) => {
        addProductMutation.mutate(data);
    };

    const handleOpenAddProduct = () => {
        setAddingProduct(true);
    };

    const handleCloseAddProduct = () => {
        setAddingProduct(false);
    };

    const handleDeleteProduct = (id: number) => {
        deleteProductMutation.mutate(id);
    };

    const handleUpdateProduct = (data: Partial<ProductDto>) => {
        updateProductMutation.mutate(data);
    };

    const handleUpdateProductPicture = (data: UpdateProductPictureDto) => {
        updateProductPictureMutation.mutate(data);
    };

    return (
        <>
            <Snackbar
                open={success}
                onClose={() => setSuccess(false)}
                autoHideDuration={5000}
                anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            >
                <Alert severity={'success'}>{successMessage}</Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={5000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
            <Dialog open={addingProduct} onClose={handleCloseAddProduct}>
                <DialogTitle>Add a product</DialogTitle>
                <CreatableProductCard
                    onCancel={handleCloseAddProduct}
                    onAdd={handleAddProduct}
                    categories={categories}
                />
            </Dialog>
            <Tooltip title={'Add product'} placement={'left'}>
                <Fab
                    color={'secondary'}
                    sx={{
                        position: 'fixed',
                        bottom: 25, right: 25,
                    }}
                    onClick={handleOpenAddProduct}
                >
                    <AddIcon/>
                </Fab>
            </Tooltip>
            <Page isLoading={isLoading}>
                <Stack py={2}>
                    <TextField
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position={'start'}><SearchOutlinedIcon/></InputAdornment>,
                        }}
                        placeholder={'Type here...'}
                        size={'small'}
                        label={'Search'}
                    />
                </Stack>
                <Grid container spacing={4}>
                    {
                        filteredProducts.map(product => (
                            <Grid item md={3} xs={12} key={product.id}>
                                <EditableProductCard
                                    sx={{height: '100%'}}
                                    data={product}
                                    isLoading={isMutating}
                                    onDeleteProduct={handleDeleteProduct}
                                    onUpdateProduct={handleUpdateProduct}
                                    onUpdateProductPicture={handleUpdateProductPicture}
                                    img={`${getProductImageURL(product.imageId)}#${Math.random()}`}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Page>
        </>
    );
}
