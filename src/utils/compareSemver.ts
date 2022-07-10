export default (first: string, second: string) => {
    const [firstMajor, firstMinor, firstPatch] = first.split('.')
    const [secondMajor, secondMinor, secondPatch] = second.split('.')

    if (firstMajor > secondMajor) return 1
    if (firstMajor < secondMajor) return -1
    if (firstMinor > secondMinor) return 1
    if (firstMinor < secondMinor) return -1
    if (firstPatch > secondPatch) return 1
    if (firstPatch < secondPatch) return -1
    return 0
}
