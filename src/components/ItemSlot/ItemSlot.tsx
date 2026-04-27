import './main.scss'

type BaseWindowProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    cellId: string | number;
};

export default function ItemSlot({children, cellId}: BaseWindowProps) {
    const handleDragStart = (e: MouseEvent) => {
        e.dataTransfer.setData("sourceCellId", cellId);
        console.log(`---> Взяли из ячейки:`);
    };

    const handleDragOver = (e: MouseEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: MouseEvent) => {
        e.preventDefault();
        const fromId = e.dataTransfer.getData("sourceCellId");

        if (fromId === cellId.toString()) {
            console.log(`---  Вернули обратно в ячейку: ${cellId}`);
        } else {
            console.log(`<--- Положили в ячейку: ${cellId} (пришло из: ${fromId})`);
        }
    };

    return (
        <div draggable
             onDragStart={handleDragStart}
             onDragOver={handleDragOver}
             onDrop={handleDrop}
             className="item-slot">
            {children && <div className="content">{children}</div>}
        </div>
    )
}