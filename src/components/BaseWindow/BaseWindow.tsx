import {TextField} from "@radix-ui/themes";
import "./main.scss";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

type BaseWindowProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
    value?: string;
    onChange?: (value: string) => void;
};

export default function BaseWindow({children, header, value, onChange}: BaseWindowProps) {
    return <div className="base-window text-white">
        <div className="flex justify-between items-center gap-x-4">
            {header && <div className="title font-sf">{header}</div>}
            <TextField.Root value={value}
                            onChange={(e) => onChange?.(e.target.value)} className='input' placeholder="Search...">
                <TextField.Slot>
                    <MagnifyingGlassIcon color="white" height="16" width="16"/>
                </TextField.Slot>
            </TextField.Root>
        </div>
        <div className="content">{children}</div>
    </div>;
}