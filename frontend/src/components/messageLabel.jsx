import { Messages } from "./translation_provider";

const MessageLabel = (msgKey) => {

    const key = msgKey.children;

    const getMessageKey = () => {
        return Messages[key] || key;
    }

    return (
        getMessageKey()        
    );
};
  
export default MessageLabel;