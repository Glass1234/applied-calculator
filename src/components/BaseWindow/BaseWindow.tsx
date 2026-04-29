import {TextField} from "@radix-ui/themes";
import styles from "./BaseWindow.module.scss";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

type BaseWindowProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
    value?: string;
    onChange?: (value: string) => void;
};

export default function BaseWindow({children, header, value, onChange}: BaseWindowProps) {
    return <div className={styles.main}>
        <div className="flex justify-between items-center gap-x-4 min-h-9">
            {header && <div className={styles.title}>{header}</div>}
            {onChange && <TextField.Root value={value}
                                         onChange={(e) => onChange?.(e.target.value)} className={styles.input}
                                         placeholder="Search...">
                <TextField.Slot>
                    <MagnifyingGlassIcon color="white" height="16" width="16"/>
                </TextField.Slot>
            </TextField.Root>}
        </div>
        <div className={styles.content}>{children}</div>
    </div>;
}