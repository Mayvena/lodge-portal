const MessageLabel = (msgKey) => {

    const key = msgKey.children;

    const getMessageKey = () => {

        return key;

    }

    return (
        getMessageKey()        
    );
};
  
export default MessageLabel;