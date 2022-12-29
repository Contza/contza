import useContentField from "./useContentField";
import { ContzaContentFieldType } from "../types";

const useContzaField = (name: string, type: ContzaContentFieldType) => {
    const { value } = useContentField(name, type);
    return value;
};

export default useContzaField;
