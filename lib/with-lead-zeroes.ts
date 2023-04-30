const withLeadZeroes = (twoDigitumber :number | null): String => {
    if (!twoDigitumber) {
        return "00"
    } else if (twoDigitumber < 10) {
        return "0" + twoDigitumber
    } else {
        return twoDigitumber.toString()
    } 
}

export default withLeadZeroes;