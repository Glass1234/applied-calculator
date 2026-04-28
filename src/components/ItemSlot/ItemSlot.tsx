import styles from './ItemSlot.module.scss';
import * as React from "react";
import type {DragEvent} from "react";

type BaseWindowProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    cellId: string | number;
};

export default function ItemSlot({children, cellId}: BaseWindowProps) {
    const handleDragStart = (e: DragEvent) => {
        // Записываем, из какой ячейки взяли предмет
        e.dataTransfer.setData("sourceCellId", `${cellId}`);
        console.log(`---> Взяли из ячейки:`);
    };

    const handleDragOver = (e: DragEvent) => {
        // Разрешаем сброс в эту ячейку
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const fromId = e.dataTransfer.getData("sourceCellId");

        // Если id совпадают, значит уронили туда же, откуда взяли
        if (fromId === cellId.toString()) {
            console.log(`---  Вернули обратно в ячейку: ${cellId}`);
        } else {
            console.log(`<--- Положили в ячейку: ${cellId} (пришло из: ${fromId})`);
        }
    };

    return (
        <div draggable={!!children}
             onDragStart={handleDragStart}
             onDragOver={handleDragOver}
             onDrop={handleDrop}
             className={styles.main}>
            {children && <div className={styles.main__content}>{children}</div>}
        </div>
    )
}