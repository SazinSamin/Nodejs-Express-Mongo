// utilities

// object for export
const utilities = {};

// getCurrent DateTime String representation
utilities.getDateTime = () => {
        const dateTime = new Date();

        const date  = dateTime.toLocaleTimeString();
        const time  = dateTime.toLocaleDateString();  

        const currentDateTime = `DateTime: ${date}, ${time}`;
        return currentDateTime;
}

export default utilities;
