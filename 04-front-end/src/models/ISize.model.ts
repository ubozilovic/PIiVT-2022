export default interface ISize {
    size: {
        sizeId: number;
        name: string;
    };
    price: number;
    kcal: number;
    isActive: boolean;
}

export interface ISizeModel {
    sizeId: number;
    name: string;
}