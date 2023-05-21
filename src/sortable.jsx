import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function Sortable({id}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    style.display = "inline"
    style.padding = "5vh"
    style.margin = "1vh"
    style.backgroundColor = "green"

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}>
        {id}</div>
    )
}