import ListItem from "./ListItem";

export interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class Fullist implements List {

    static instance: Fullist = new Fullist();

    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if(typeof storedList !== "string") return;

        // We create new type just like ListItem instead 
        // of using 'ListItem[]' directly as type of 'parsedList' because
        // the properties: _id, _item, _checked are private
        // and can only be accessed from within ListItem class.
        // This way we can access those properties later
        // within the 'parsedList.forEach()' method
        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList);

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            Fullist.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(itemObj => itemObj.id !== id);
    }
}