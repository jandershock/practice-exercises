const dataSourceURL = "https://gist.githubusercontent.com/brendalong/ab2424b0069ed0dd56b01951462a109d/raw/716c0776c45adea089644cffa7eadab139f9f47c/womensday.json"
const dataSourceURL2 = "https://type.fit/api/quotes"

// Function using Promise.all approach
const fetchData = (sourceString1, sourceString2) => {
    return Promise.all([
        fetch(sourceString1),
        fetch(sourceString2)
    ])
    .then(values => {
        return Promise.all(values.map(element => element.json()))
    })
}

// Function using Promise.all approach with inline .json()
const fetchDataInline = (sourceString1, sourceString2) => {
    return Promise.all([
        fetch(sourceString1).then(data => data.json()),
        fetch(sourceString2).then(data => data.json())
    ])
}

// Function using chaining of promises approach
const promiseChain = (sourceString1, sourceString2) => {
    return fetch(sourceString1)
    .then(data1 => data1.json())
    .then( data1Parsed => {
        let secondFetch = fetch(sourceString2)
        .then(data2 => data2.json())
        .then(data2Parsed => {
            console.log(`Approach Three------------\n${data1Parsed.length + data2Parsed.length}\n `);
        })
    })
}


// First approach
fetchData(dataSourceURL, dataSourceURL2)
.then(jsonData => {
    let num1 = jsonData[0].length;
    let num2 = jsonData[1].length;
    console.log(`Approach One--------------\nSource 1 returned ${num1} items.\nSource 2 returned ${num2} items.\nThe total number of items from both is ${num1 + num2}\n `);
})

// Second approach, essentially inline version of first approachj
fetchDataInline(dataSourceURL, dataSourceURL2)
.then(jsonData => {
    let num1 = jsonData[0].length;
    let num2 = jsonData[1].length;
    console.log(`Approach Two--------------\nSource 1 returned ${num1} items.\nSource 2 returned ${num2} items.\nThe total number of items from both is ${num1 + num2}\n `);
})

// Third approach
promiseChain(dataSourceURL, dataSourceURL2)