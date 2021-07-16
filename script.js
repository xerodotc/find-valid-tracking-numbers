function validateUPUTrackingNumber(tracking) {
    if (tracking.length != 13) {
        return false
    }

    let weight = [8, 6, 4, 2, 3, 5, 9, 7]
    let sum = 0

    for (let i = 0; i < weight.length; i++) {
        let num = parseInt(tracking[2 + i])
        if (isNaN(num)) {
            return false
        }
        sum += num * weight[i]
    }

    sum = 11 - (sum % 11)
    if (sum == 10) {
        sum = 0
    } else if (sum == 11) {
        sum = 5
    }

    let check = parseInt(tracking[10])
    if (isNaN(check)) {
        return false
    }

    return check === sum
}

function generateUPUTrackingNumbersFrom12(partialTracking) {
    if (partialTracking.length != 12) {
        return []
    }

    let output = []

    for (let i = 2; i <= 10; i++) {
        let head = partialTracking.substring(0, i)
        let tail = partialTracking.substring(i, 12)
        for (let j = 0; j < 10; j++) {
            let num = head + j.toString() + tail
            if (validateUPUTrackingNumber(num)) {
                output.push(num)
            }
        }
    }

    return filterDuplicates(output)
}

function generateUPUTrackingNumbersFrom13(tracking) {
    if (tracking.length != 13) {
        return []
    }

    let genInputs = generatePartialUPUTrackingNumbers12(tracking)
    let output = []
    
    for (let input of genInputs) {
        output = output.concat(generateUPUTrackingNumbersFrom12(input))
    }

    return filterDuplicates(output)
}

function generatePartialUPUTrackingNumbers12(tracking) {
    if (tracking.length != 13) {
        return []
    }

    let output = []

    for (let i = 2; i <= 10; i++) {
        let head = tracking.substring(0, i)
        let tail = tracking.substring(i+1, 13)
        output.push(head + tail)
    }

    return filterDuplicates(output)
}

function filterDuplicates(array) {
    return array.filter((num, i, self) => self.indexOf(num) === i)
}
