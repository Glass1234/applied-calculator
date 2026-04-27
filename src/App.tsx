import "./App.scss";
import items from "./schemas/items.json"
import BaseWindow from "./components/BaseWindow/BaseWindow.tsx";
import ItemSlot from "./components/ItemSlot/ItemSlot.tsx";
import {v4 as uuidv4} from "uuid";
import {useEffect, useMemo, useState} from "react";
import type {ItemBase, ItemOnJSON} from "./schemas/types.ts";

function App() {
    const [ITEMS, setITEMS] = useState<(ItemOnJSON | ItemBase)[]>([]);
    const [search, setSearch] = useState("");
    const filteredItems = useMemo<ItemBase[]>(() => {
        const SearchTrim = search.trim();
        if (!SearchTrim) return ITEMS;

        return ITEMS.filter(item =>
            item.displayName.toLowerCase().includes(SearchTrim.toLowerCase())
        ) as ItemBase[];
    }, [ITEMS, search]);

    useEffect(() => {
        async function load() {
            const result: ItemBase[] = (
                await Promise.all(
                    items.slice(0, 100).map(async (item) => {
                        const blockPath = `/minecraft/block/${item.name}.png`;
                        const itemPath = `/minecraft/item/${item.name}.png`;

                        const blockRes = await fetch(blockPath, {method: 'HEAD'});
                        let contentType = blockRes.headers.get("content-type");
                        if (contentType?.startsWith("image/")) {
                            return {...item, path: blockPath, type: 'block'};
                        }

                        const itemRes = await fetch(itemPath, {method: 'HEAD'});
                        contentType = itemRes.headers.get("content-type");
                        if (contentType?.startsWith("image/")) {
                            return {...item, path: itemPath, type: 'item'};
                        }

                        return null;
                    })
                )
            ).filter(Boolean) as ItemBase[];
            setITEMS(result);
        }

        load();
    }, []);

    return (
        <div className="App min-h-screen">
            <BaseWindow value={search} onChange={setSearch}
                        header={<h3>Interface Terminal</h3>}>
                <div className="grid grid-cols-9 gap-[9px]">
                    {filteredItems.map(item => (
                        <ItemSlot className="item-slot" key={item.id} cellId={item.id}>
                            <div className="item-left">
                                <img
                                    src={item.path}
                                    alt={item.name}
                                />
                            </div>
                            <div className="item-top">
                                <img
                                    src={item.path}
                                    alt={item.name}
                                />
                            </div>
                            <div className="item-right">
                                <img
                                    src={item.path}
                                    alt={item.name}
                                />
                            </div>
                        </ItemSlot>
                    ))}
                </div>
                <div className="mt-7 flex gap-x-[9px]">
                    {Array.from({length: 9}).map((_, index) => (
                        <ItemSlot key={index} cellId={uuidv4()}/>
                    ))}
                </div>
            </BaseWindow>
        </div>
    );
}

export default App;
