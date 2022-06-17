const dayFormat = (getDate) => {
    const month = getDate.getMonth();
    const day = getDate.getDate();
    const result = `${month}월 ${day}일`;
    return result;
} // n월 n일 식으로 변환

export { dayFormat }