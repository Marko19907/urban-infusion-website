import {Button, Divider, Paper, PaperProps, Stack, useTheme} from '@mui/material';
import {capitalize, omit} from 'lodash-es';
import {ProductDto, UpdateProductPictureDto} from '../../../api/urbaninfusion/dto/product-dto';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {useState} from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Input from '../../Input';

const acceptedFormats = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'].toString();

type Props = {
    data: ProductDto;
    img?: string;
    onUpdateProduct: (data: Partial<ProductDto>) => void;
    onDeleteProduct: (id: number) => void;
    onUpdateProductPicture: (data: UpdateProductPictureDto) => void;
    isLoading?: boolean;
} & PaperProps;

export default function EditableProductCard(props: Props) {
    const paperProps = omit(props, ['data', 'img', 'onUpdateProduct', 'onDeleteProduct', 'onUpdateProductPicture', 'isLoading']);

    const [title, setTitle] = useState<string>(props.data.title || '');
    const [description, setDescription] = useState<string>(props.data.description || '');
    const [price, setPrice] = useState<number>(props.data.price || 0);
    const [discount, setDiscount] = useState<number>(props.data.discount * 100 || 0);
    const [weight, setWeight] = useState<number>(Number(props.data.weight.replace('oz', '')) || 0);
    const [category, setCategory] = useState<string>(capitalize(props.data.category) || '');

    const [editing, setEditing] = useState<boolean>(false);

    const theme = useTheme();

    const handleUpdateProduct = () => {
        props.onUpdateProduct({
            id: props.data.id || -1,
            title,
            description,
            price,
            discount: discount / 100,
            weight: `${weight}oz`,
            category: category.toUpperCase()
        });
    };

    const handleDeleteProduct = () => {
        props.onDeleteProduct(props.data.id);
    };

    const handleUpdateProductPicture = (event: any) => {
        props.onUpdateProductPicture({
            id: props.data.id,
            file: event.target.files[0]
        });
    };

    const limitDiscountRange = (e: any) => {
        if (!(0 <= e.target.value && e.target.value <= 100)) {
            e.target.value = Math.max(Math.min(100, e.target.value), 0);
        }
    };

    return (
        <>
            <Paper
                variant={'outlined'}
                {...paperProps}
            >
                <Stack
                    textAlign={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    height={'100%'}
                >
                    <Stack
                        position={'relative'}
                        p={4}
                        alignItems={'center'}
                        justifyContent={'center'}
                        width={'100%'}
                    >
                        <img
                            loading={'lazy'}
                            src={props.img}
                            style={{width: 'auto', height: 175, padding: 8}}
                            alt={''}
                        />
                        <Stack
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                            }}
                        >
                            <Stack alignItems={'center'} justifyContent={'center'}>
                                <label>
                                    <input
                                        hidden
                                        style={{
                                            position: 'absolute',
                                        }}
                                        type={'file'}
                                        multiple={false}
                                        accept={acceptedFormats}
                                        onChange={handleUpdateProductPicture}
                                    />
                                    <AddPhotoAlternateOutlinedIcon
                                        style={{
                                            height: 32,
                                            width: 32,
                                            background: theme.palette.primary.light,
                                            borderRadius: '50%',
                                            padding: 4,
                                            cursor: 'pointer',
                                            color: theme.palette.primary.main
                                        }}
                                    />
                                </label>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider flexItem/>
                    <Stack flex={1} alignItems={'start'} width={'100%'}>
                        <Input
                            editing={editing}
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            size={'small'}
                            label={'Title'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            multiline
                            rows={6}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            type={'number'}
                            size={'small'}
                            label={'Description'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={price}
                            type={'number'}
                            onChange={(e) =>
                                setPrice(Number(e.target.value))
                            }
                            size={'small'}
                            adornment={'$'}
                            label={'Price'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={discount}
                            onChange={(e) =>
                                setDiscount(Number(e.target.value))
                            }
                            onInput={(e) => limitDiscountRange(e) }
                            type={'number'}
                            size={'small'}
                            adornment={'%'}
                            label={'Discount'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={weight}
                            onChange={(e) =>
                                setWeight(Number(e.target.value))
                            }
                            type={'number'}
                            size={'small'}
                            adornment={'oz'}
                            label={'Weight'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            size={'small'}
                            label={'Category'}
                        />
                        <Divider flexItem/>
                        <Stack alignSelf={'end'} direction={'row'} spacing={2} p={2}>
                            <Button
                                startIcon={editing
                                    ? <CancelOutlinedIcon/>
                                    : <DeleteForeverOutlinedIcon/>
                                }
                                onClick={editing
                                    ? () => setEditing(false)
                                    : handleDeleteProduct
                                }
                                color={'error'}
                                disabled={props.isLoading}
                            >
                                {editing ? 'Cancel' : 'Delete'}
                            </Button>
                            <Button
                                variant={'contained'}
                                onClick={editing
                                    ? handleUpdateProduct
                                    : () => setEditing(true)
                                }
                                startIcon={editing
                                    ? <SaveOutlinedIcon/>
                                    : <EditOutlinedIcon/>
                                }
                                disabled={props.isLoading}
                            >
                                {editing ? 'Save' : 'Edit'}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
