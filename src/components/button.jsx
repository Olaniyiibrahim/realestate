import { FC, ReactNode } from "react"



// export default function Button({children}) {
//   return (
//     <div className="h-9 p-1.5 px-2 w-[100px] space-x-1 bg-slate-200 rounded-xl flex ">
//       {children}
//     </div>
//   )

// }

const Button = ({children, onClick, className, type, color, disabled, txtColor}) => {
    return (
        <button disabled={disabled} type={type} onClick={onClick} className={`w-full disabled:cursor-not-allowed font-medium py-2 enabled:active:scale-[0.97] transition-transform rounded-lg ${txtColor ? txtColor : "text-white"} text-[0.9em] ${color ? `bg-[${color}]` : "bg-[#013A12]"} ${className} `}>
            {children}
        </button>
    )
}

export default Button