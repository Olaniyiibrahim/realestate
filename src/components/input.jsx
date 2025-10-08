// import React, { FC, ReactNode, useState } from "react"
// // import LockIcon from "../../../public/svgs/lock_icon.svg"
// import useClickOutside from "/src/utilities/hooks/useClickOutside";

// // const Styles {
// //   onChange: () => void
// // }

// const Input = React.memo(({ label, placeholder, type = "text", disabled, inputClassname, name, value, onChange, options, select, className, horizontal, helperText }) => {
//   const isPassword = type === "password";
//   const [showPassword, setShowPassword] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(""); // State for search input
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls dropdown visibility

//   const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsDropdownOpen(false));

//   const handleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Filter options based on search term
//   const filteredOptions = options?.filter((option) =>
//     option.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen((prev) => !prev);) => {
//     if (Styles.onChange) {
//       onChange({ target: { value: optionValue, name } });
//     }
//     setIsDropdownOpen(false);
//   };

//   return (
//         <div className={`flex w-full ${horizontal ? "flex-row items-center gap-4" : "flex-col"} items-start mb-5 ${className}`}>
//         {label}
//         <div className="relative w-full">
//             {select ? (
//             <div className="relative" ref={dropdownRef} >
//                 <div
//                 className={`w-full mt-1 border border-[#D0D5DD] rounded-md cursor-pointer ${inputClassname ? inputClassname : "p-2"}`}
//                 onClick={handleDropdownToggle}
//                 >
//                 {options?.find(item => item.value === value)?.name || placeholder}
//                 </div>

//                 {isDropdownOpen && (
//                 <div className="absolute top-[-5px] z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//                     {/* Search input within the dropdown */}
//                     <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full p-2 border-b border-gray-200"
//                     />

//                     {/* Options */}
//                     {filteredOptions?.length ? (
//                     filteredOptions.map((option, index) => (
//                         <div
//                         key={index}
//                         onClick={() => handleOptionSelect(option?.value)}
//                         className="p-2 hover:bg-gray-200 cursor-pointer"
//                         >
//                         {option.name}
//                         </div>
//                     ))
//                     ) : (
//                     <div className="p-2 text-gray-500">No options found</div>
//                     )}
//                 </div>
//                 )}
//             </div>
//             ) : (
//             <>
//                 {isPassword && <div onClick={handleShowPassword}><img src="/svgs/lock-icon.svg" className=" cursor-pointer absolute bottom-[25%] right-4" /></div>}
//                 {type !== "textarea" ? (
//                 <input
//                     disabled={disabled}
//                     value={value}
//                     onChange={onChange}
//                     className={`w-full mt-1 border border-[#D0D5DD] rounded-md text-[15px] ${inputClassname ? inputClassname : "p-2"}`}
//                     type={!isPassword ? type : showPassword ? "text" : "password"}
//                     placeholder={placeholder}
//                     name={name}
//                 />
//                 ) : (
//                 <textarea
//                     disabled={disabled}
//                     value={value}
//                     // @ts-ignore
//                     onChange={onChange}
//                     className="w-full mt-1 min-h-[10em] max-h-[10em] p-2 border border-[#D0D5DD] rounded-md"
//                     placeholder={placeholder}
//                     name={name}
//                 />
//                 )}
//             </>
//             )}
//             <p className="absolute text-[12px] italic text-red-500">{helperText}</p>
//         </div>
//     </div>
// );
// });

// export default Input