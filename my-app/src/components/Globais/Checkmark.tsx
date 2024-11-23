import { CheckmarkProps } from "@/types";


export default function Checkmark({name, id, required, value}: CheckmarkProps) {

    return (
        <label className="checkbox">{value}
            <input type="checkbox" id={id} name={name} required={required}/>
            <span className="checkmark"></span>
        </label>
    );
}