const eventStyling = {};

eventStyling.mouseEnterEvent = (target) => {
        const targetStyle = target.style;
        targetStyle.backgroundColor = "#103b82";
        targetStyle.border = "10px outset rgb(2, 1, 216)";
};

eventStyling.mouseLeaveEvent = (target) => {
        const targetStyle = target.style;
        targetStyle.backgroundColor = "#00203FFF";
        targetStyle.border = "5px outset rgb(2, 1, 216)";
};


export default eventStyling;