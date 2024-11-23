import { InputProps } from "@/types";

export default function Input({icon, classname, type, name, id, placeholder, minlength, maxlength, required, onchange, disabled}: InputProps) {

    return (
        <div className="relative">
            <div className={`${icon} bg-no-repeat h-6 w-6 absolute top-1/2 left-[5%] -translate-y-1/2 box-border z-10`}></div>
            <input className={classname} type={type} name={name} id={id} placeholder={placeholder} minLength={minlength} maxLength={maxlength} required={required} onChange={onchange} disabled={disabled}></input>
        </div>
    );
}