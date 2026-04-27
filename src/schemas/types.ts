type TypeBlock = 'item' | 'block';

export interface ItemOnJSON {
    id: number;
    name: string;
    displayName: string;
    stackSize: number;
}

export interface ItemBase extends ItemOnJSON {
    path: string;
    type: TypeBlock;
}