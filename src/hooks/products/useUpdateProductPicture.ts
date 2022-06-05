import {useMutation, useQueryClient} from 'react-query';
import {UpdateProductPictureDto} from '../../api/urbaninfusion/dto/product-dto';
import {updateProductPicture} from '../../api/urbaninfusion/public/products';

export const useUpdateProductPicture = () => {
    const query = useQueryClient();

    return useMutation(
        (data: UpdateProductPictureDto) => updateProductPicture(data), {
            onSuccess: () => query.invalidateQueries(['products'])
        }
    );
};
