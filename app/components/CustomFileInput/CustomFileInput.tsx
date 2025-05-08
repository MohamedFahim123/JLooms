import { CustomeInputProps } from "@/app/utils/interfaces";
import { FaCheck, FaPlus } from "react-icons/fa";
import styles from "../CustomInput/customeInput.module.css";

export default function CustomFileInput({
  name,
  placeHolder,
  register,
  error,
  type,
  lable,
  id,
  validation,
  fileUploaded,
}: CustomeInputProps) {
  return (
    <div className={`mb-1 ${styles.inputContainer}`}>
      <label
        htmlFor={id}
        className={`${
          error?.[name] && styles.errorInput
        } flex items-center justify-between w-full px-4 py-4 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors`}
      >
        <span className="text-lg font-semibold text-gray-700">{lable}</span>
        <span className="text-2xl text-gray-500">
          {fileUploaded ? <FaCheck className="text-green-500" /> : <FaPlus />}
        </span>
      </label>
      <input
        id={id}
        placeholder={placeHolder}
        type={type}
        {...register(name, validation)}
        className="hidden"
      />
      {error?.[name] && (
        <p className={`${styles.error} text-start text-red-500 text-xs`}>
          {error[name]?.message as string}
        </p>
      )}
    </div>
  );
}
