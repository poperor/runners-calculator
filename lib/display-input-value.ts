const displayInputValue = (stateValue: number | null) : number | string => {
    return stateValue !== null ? stateValue : ""
}

export default displayInputValue;