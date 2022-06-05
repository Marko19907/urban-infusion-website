import {AddProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Button, Divider, InputAdornment, Paper, Stack, TextField} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {useState} from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {CategoriesDto} from '../../../api/urbaninfusion/dto/categories-dto';

interface Props {
    onAdd: (data: AddProductDto) => void;
    onCancel: () => void;
    categories?: CategoriesDto;
}

export default function CreatableProductCard(props: Props) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

    const handleAdd = () => {
        if (title && category) {
            props.onAdd({
                title,
                description,
                price,
                discount: discount / 100,
                weight: `${weight}oz`,
                category: category.toUpperCase()
            });
        }
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <>
            <Paper
                variant={'outlined'}
                sx={{width: 387.5, background: 'transparent', border: 'none'}}
            >
                <form onSubmit={(e) => e.preventDefault()}>

                    <Stack textAlign={'center'} alignItems={'center'} justifyContent={'center'}>
                        <Stack spacing={4} px={4} pb={2} width={'100%'}>

                            <TextField
                                size={'small'}
                                fullWidth
                                required
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                label={'Title'}
                            />
                            <TextField
                                required
                                size={'small'}
                                fullWidth
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                label={'Category'}
                            />
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                type={'number'}
                                size={'small'}
                                label={'Description'}
                            />
                            <TextField
                                fullWidth
                                value={price}
                                type={'number'}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                                size={'small'}
                                InputProps={{
                                    startAdornment: <InputAdornment position={'start'}>$</InputAdornment>,
                                }}
                                label={'Price'}
                            />
                            <TextField
                                fullWidth
                                value={discount}
                                onChange={(e) =>
                                    setDiscount(Number(e.target.value))
                                }
                                type={'number'}
                                size={'small'}
                                InputProps={{
                                    startAdornment: <InputAdornment position={'start'}>%</InputAdornment>,
                                }}
                                label={'Discount'}
                            />
                            <TextField
                                fullWidth
                                value={weight}
                                onChange={(e) =>
                                    setWeight(Number(e.target.value))
                                }
                                type={'number'}
                                size={'small'}
                                InputProps={{
                                    startAdornment: <InputAdornment position={'start'}>oz</InputAdornment>,
                                }}
                                label={'Weight'}
                            />
                        </Stack>
                        <Divider flexItem/>
                        <Stack alignSelf={'end'} direction={'row'} spacing={2} p={2}>
                            <Button
                                startIcon={<CancelOutlinedIcon/>}
                                color={'error'}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={'contained'}
                                startIcon={<AddOutlinedIcon/>}
                                onClick={handleAdd}
                                type={'submit'}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </>
    );
}
